// Emoji 17.0 — the new emoji introduced in Unicode 17.0 (released 9 Sep 2025)
// and shipped to Apple iOS 26.4 on 24 Mar 2026 (broad platform support H1 2026).
//
// CORRECTNESS: we store CODE POINTS, not pasted glyphs, and derive the glyph
// via String.fromCodePoint(). Brand-new characters are easy to paste wrong
// (a literal can silently resolve to a different, look-alike code point), so
// deriving from the verified code point is the only safe source of truth.
//
// Data verified 2026-05-29 across unicode.org (Emoji v17.0 "recently added"
// chart), Emojipedia, and corroborated on Emojiall / symbl.cc / unicodeplus.
// Excludes: the withdrawn "Apple Core", the ~156 skin-tone/gender sequence
// variants, and ALL Emoji 18.0 DRAFT characters (Jan 2026 draft, unreleased).

export interface NewEmoji {
  /** Official Unicode name. */
  name: string;
  /** Code point(s). Multiple = ZWJ / modifier sequence. Glyph is derived. */
  codePoints: number[];
  /** Display label for the code point(s), e.g. "U+1FAEA". */
  hexLabel: string;
  /** One factual sentence: what it depicts / how it's used. */
  desc: string;
  /** Likely search phrases (used for on-page copy + keyword targeting). */
  searchTerms: string[];
}

export const NEW_EMOJI_2026: NewEmoji[] = [
  {
    name: "Distorted Face",
    codePoints: [0x1faea],
    hexLabel: "U+1FAEA",
    desc: "A smiley with bulging, warped eyes resembling a fisheye-lens effect — used to convey shock, overwhelm, or a glitching/melting reaction.",
    searchTerms: ["distorted face emoji", "warped face emoji", "shocked distorted emoji"],
  },
  {
    name: "Fight Cloud",
    codePoints: [0x1faef],
    hexLabel: "U+1FAEF",
    desc: "A comic-book cloud of dust with swirls and stars, depicting a scuffle or brawl between two or more people.",
    searchTerms: ["fight cloud emoji", "brawl emoji", "cartoon fight emoji"],
  },
  {
    name: "Hairy Creature",
    codePoints: [0x1fac8],
    hexLabel: "U+1FAC8",
    desc: "A large ape-like cryptid shown mid-stride, inspired by Bigfoot / Sasquatch and Yeti legends.",
    searchTerms: ["bigfoot emoji", "sasquatch emoji", "yeti emoji", "hairy creature emoji"],
  },
  {
    name: "Orca",
    codePoints: [0x1facd],
    hexLabel: "U+1FACD",
    desc: "A black-and-white killer whale with a tall dorsal fin, representing marine life and the ocean.",
    searchTerms: ["orca emoji", "killer whale emoji", "new whale emoji"],
  },
  {
    name: "Landslide",
    codePoints: [0x1f6d8],
    hexLabel: "U+1F6D8",
    desc: "A cliff face with debris tumbling down its side, representing a landslide or falling-rock hazard.",
    searchTerms: ["landslide emoji", "rockslide emoji", "falling rocks emoji"],
  },
  {
    name: "Trombone",
    codePoints: [0x1fa8a],
    hexLabel: "U+1FA8A",
    desc: "A brass slide trombone, often used to reference the comedic 'sad trombone' sting.",
    searchTerms: ["trombone emoji", "sad trombone emoji", "brass instrument emoji"],
  },
  {
    name: "Treasure Chest",
    codePoints: [0x1fa8e],
    hexLabel: "U+1FA8E",
    desc: "A wooden chest with metal bands and a lock, associated with pirate treasure, gold, and loot.",
    searchTerms: ["treasure chest emoji", "pirate treasure emoji", "loot chest emoji"],
  },
  {
    name: "Ballet Dancer",
    codePoints: [0x1f9d1, 0x200d, 0x1fa70],
    hexLabel: "U+1F9D1 U+200D U+1FA70",
    desc: "A gender-neutral person in a ballet pose (a ZWJ sequence of Person + Ballet Shoes), offering a neutral alternative to the existing dancing emoji.",
    searchTerms: ["ballet dancer emoji", "ballerina emoji", "gender neutral ballet emoji"],
  },
];

/** Derives the actual glyph from the verified code point(s). */
export function glyphOf(e: NewEmoji): string {
  return String.fromCodePoint(...e.codePoints);
}

// ── Per-platform support tracker ─────────────────────────────────────────────
// "Can I use the new emoji yet?" is a recurring search through the staggered
// 2026 rollout. This is a dated, honest status table. Update the date + statuses
// as platforms ship. Conservative by design: only Apple is marked "shipped"
// (the verified iOS 26.4 date); everything else is "rolling out" or "expected"
// because exact ship dates aren't confirmed.
export type SupportStatus = "shipped" | "rolling" | "expected";

export interface PlatformSupport {
  platform: string;
  status: SupportStatus;
  detail: string;
}

/** When this support table was last reviewed. */
export const SUPPORT_LAST_CHECKED = "1 June 2026";

export const PLATFORM_SUPPORT: PlatformSupport[] = [
  { platform: "iPhone & iPad (iOS / iPadOS)", status: "shipped", detail: "Available in iOS 26.4 / iPadOS 26.4 (24 March 2026). Update, then the new emoji appear in the keyboard." },
  { platform: "Mac (macOS)", status: "shipped", detail: "Available in the macOS update released alongside iOS 26.4." },
  { platform: "Android (Google / Gboard)", status: "rolling", detail: "Rolling out across 2026 through system and Gboard font updates — keep both up to date." },
  { platform: "Samsung (One UI)", status: "expected", detail: "Expected later in 2026 in a One UI update; Samsung ships its own emoji designs." },
  { platform: "Windows", status: "rolling", detail: "Rolling out in 2026 with the Windows system emoji-font update." },
  { platform: "WhatsApp", status: "rolling", detail: "WhatsApp uses its own emoji font; the 2026 set is rolling out during 2026." },
  { platform: "Discord, X (Twitter), Slack", status: "rolling", detail: "These draw their own emoji images — the new emoji appear once each service updates its set; until then they show as a ▯ box in text." },
];

export const SUPPORT_STATUS_LABEL: Record<SupportStatus, string> = {
  shipped: "Available",
  rolling: "Rolling out",
  expected: "Expected",
};
