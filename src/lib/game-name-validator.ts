// Game name validator (build #2). Pure + deterministic so it can be unit-tested.
//
// Given a game's rules and a proposed name, returns an honest verdict: does it
// fit the length limit, will colour emoji be stripped, and which characters the
// game is likely to reject. It is conservative on the strict games (Riot /
// Roblox / Fortnite reject most non-ASCII), which is the safe side to err on
// before a player spends a paid rename.

import type { GameNameRule } from "@/data/game-name-rules";

export type NameVerdict = "ok" | "warn" | "reject";

export interface NameIssue {
  level: "warn" | "reject";
  message: string;
}

export interface NameCheck {
  /** User-perceived character count (graphemes). */
  charCount: number;
  verdict: NameVerdict;
  tooShort: boolean;
  tooLong: boolean;
  /** Emoji that the game's name field would strip out. */
  strippedEmoji: string[];
  /** Characters the game is likely to reject outright. */
  rejectedChars: string[];
  issues: NameIssue[];
}

function toGraphemes(input: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(input), (s) => s.segment);
  }
  return Array.from(input);
}

const EMOJI_RE = /\p{Extended_Pictographic}/u;
// Allowed for the strict games: ASCII letters, digits and a single space.
const STRICT_ALLOWED_RE = /^[A-Za-z0-9 ]$/;

function isEmoji(grapheme: string): boolean {
  return EMOJI_RE.test(grapheme);
}

/** Validate `name` against a game's rules. */
export function validateName(rule: GameNameRule, name: string): NameCheck {
  const graphemes = toGraphemes(name);
  const charCount = graphemes.length;

  const tooShort = rule.minLen != null && charCount > 0 && charCount < rule.minLen;
  const tooLong = charCount > rule.maxLen;

  const strippedEmoji: string[] = [];
  const rejectedChars: string[] = [];

  for (const g of graphemes) {
    if (isEmoji(g)) {
      if (!rule.allowsEmoji) strippedEmoji.push(g);
      continue;
    }
    if (rule.bannedChars.includes(g)) {
      rejectedChars.push(g);
      continue;
    }
    // On strict games, anything beyond ASCII letters/digits/space is likely
    // rejected (this is where fancy fonts and decorative symbols fail).
    if (!rule.allowsSymbols && !STRICT_ALLOWED_RE.test(g)) {
      rejectedChars.push(g);
    }
  }

  const issues: NameIssue[] = [];
  if (tooShort) issues.push({ level: "reject", message: `Too short — ${rule.name} needs at least ${rule.minLen} characters.` });
  if (tooLong) issues.push({ level: "reject", message: `Too long — ${rule.name} allows up to ${rule.maxLen} characters (you have ${charCount}).` });
  if (rejectedChars.length > 0) {
    const uniq = [...new Set(rejectedChars)];
    issues.push({ level: "reject", message: `Likely rejected character${uniq.length > 1 ? "s" : ""}: ${uniq.join(" ")} — ${rule.name} only keeps basic letters, numbers and spaces.` });
  }
  if (strippedEmoji.length > 0) {
    const uniq = [...new Set(strippedEmoji)];
    issues.push({ level: "warn", message: `These emoji will be removed by ${rule.name}: ${uniq.join(" ")}. The rest of the name still works.` });
  }

  let verdict: NameVerdict = "ok";
  if (tooShort || tooLong || rejectedChars.length > 0) verdict = "reject";
  else if (strippedEmoji.length > 0) verdict = "warn";

  return { charCount, verdict, tooShort, tooLong, strippedEmoji, rejectedChars, issues };
}
