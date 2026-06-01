// Per-game name rules for the Game Name Checker (build #2).
//
// "Will my stylish name actually be accepted?" is a recurring, pre-paid-rename
// search (Free Fire charges 390 diamonds; Valorant/Roblox charge to rename). No
// competitor documents allow/block + char-limit per game. This is an HONEST,
// dated rule table — games change these per patch, so each entry carries a
// `verifiedAs` date and the UI states it's a guide, not a guarantee.
//
// Invisible-name code points are stored as NUMBERS and derived with
// String.fromCodePoint so the (invisible) characters are tamper-evident in
// source. U+3164 = Hangul Filler (the most reliable invisible name char,
// ~92% Android); U+2800 = Braille Pattern Blank (fallback when U+3164 is
// stripped). Verified June 2026.

export interface InvisibleName {
  /** Primary invisible code point (e.g. 0x3164 Hangul Filler). */
  primaryCp: number;
  primaryName: string;
  /** Fallback code point to try if the primary is rejected. */
  fallbackCp?: number;
  fallbackName?: string;
}

export interface GameNameRule {
  /** URL-friendly game id (e.g. "free-fire"). */
  slug: string;
  name: string;
  icon: string;
  /** Which name field these rules describe. */
  field: string;
  /** Minimum length (graphemes), or null if none. */
  minLen: number | null;
  /** Maximum length (graphemes). */
  maxLen: number;
  /** Does the name field KEEP colour emoji, or strip them? */
  allowsEmoji: boolean;
  /** Does it keep decorative Unicode symbols (★ ꧁ ༒ …)? */
  allowsSymbols: boolean;
  /** Characters that are explicitly rejected (e.g. Riot bans these). */
  bannedChars: string[];
  /** Tested invisible-name code point(s), or null if invisible names don't work. */
  invisible: InvisibleName | null;
  /** Honest, informational note about the rename cost. */
  renameCost: string;
  /** Plain-English rules / caveats shown in the rules box. */
  notes: string[];
  verifiedAs: string;
}

export const GAME_NAME_RULES: GameNameRule[] = [
  {
    slug: "free-fire",
    name: "Free Fire",
    icon: "🔥",
    field: "in-game display name",
    minLen: 3,
    maxLen: 12,
    allowsEmoji: false,
    allowsSymbols: true,
    bannedChars: [],
    invisible: { primaryCp: 0x3164, primaryName: "Hangul Filler (U+3164)", fallbackCp: 0x2800, fallbackName: "Braille Blank (U+2800)" },
    renameCost: "390 diamonds (the first change is free)",
    notes: [
      "12-character limit — every decorative symbol counts as one of those 12.",
      "Colour emoji (🔥💀) are stripped from the name field, but decorative symbols like ★ ♛ ꧁ ꧂ ༒ 彡 ᭄ and superscript work.",
      "An invisible name uses U+3164 (Hangul Filler). If a patch (e.g. OB-series) starts rejecting it, paste U+2800 (Braille Blank) instead.",
    ],
    verifiedAs: "June 2026",
  },
  {
    slug: "bgmi",
    name: "BGMI / PUBG Mobile",
    icon: "🎯",
    field: "in-game name",
    minLen: 1,
    maxLen: 14,
    allowsEmoji: false,
    allowsSymbols: true,
    bannedChars: [],
    invisible: { primaryCp: 0x3164, primaryName: "Hangul Filler (U+3164)", fallbackCp: 0x2800, fallbackName: "Braille Blank (U+2800)" },
    renameCost: "a Rename Card (the first change is free)",
    notes: [
      "Roughly a 14-character limit; colour emoji are stripped but many decorative symbols are kept.",
      "Symbol support changes between updates — test a new name before spending a Rename Card.",
      "Invisible names use U+3164; fall back to U+2800 if it's rejected after an update.",
    ],
    verifiedAs: "June 2026",
  },
  {
    slug: "discord",
    name: "Discord (display name)",
    icon: "🎮",
    field: "display name / server nickname",
    minLen: 1,
    maxLen: 32,
    allowsEmoji: true,
    allowsSymbols: true,
    bannedChars: [],
    invisible: { primaryCp: 0x3164, primaryName: "Hangul Filler (U+3164)" },
    renameCost: "free",
    notes: [
      "This checks the DISPLAY NAME / server nickname — they accept the full Unicode range (fonts, symbols, emoji).",
      "Your @username is different: it only allows a–z, 0–9, underscore and full stop, so styled text won't save there.",
      "An invisible display name works with U+3164, but an invisible @username does not.",
    ],
    verifiedAs: "June 2026",
  },
  {
    slug: "roblox",
    name: "Roblox (display name)",
    icon: "🧱",
    field: "display name",
    minLen: 3,
    maxLen: 20,
    allowsEmoji: false,
    allowsSymbols: false,
    bannedChars: [],
    invisible: null,
    renameCost: "free, but only once every 7 days",
    notes: [
      "Display names are 3–20 characters and can only be changed once every 7 days.",
      "Roblox runs a strict text filter: most symbols and fancy fonts are rejected or replaced, and the filter is updated often (characters that worked last month can stop working).",
      "Invisible / blank names are not reliable — the filter usually blocks them.",
    ],
    verifiedAs: "June 2026",
  },
  {
    slug: "valorant",
    name: "Valorant (Riot ID)",
    icon: "🔫",
    field: "Riot ID game name",
    minLen: 3,
    maxLen: 16,
    allowsEmoji: false,
    allowsSymbols: false,
    bannedChars: ["@", "#", "$", "%", "^", "&", "*", "_", "-", "+", "=", "/", "\\", "<", ">", "|"],
    invisible: null,
    renameCost: "free once every 30 days",
    notes: [
      "Your Riot ID is a Game Name (3–16 characters) plus a #tagline. This checks the Game Name part.",
      "Riot allows letters, numbers and single spaces only — most special characters and fancy fonts are rejected, and you can't start or end with a space.",
      "Invisible / blank names are blocked.",
    ],
    verifiedAs: "June 2026",
  },
  {
    slug: "fortnite",
    name: "Fortnite (Epic display name)",
    icon: "🛡️",
    field: "Epic display name",
    minLen: 3,
    maxLen: 16,
    allowsEmoji: false,
    allowsSymbols: false,
    bannedChars: [],
    invisible: null,
    renameCost: "free once every 2 weeks",
    notes: [
      "Epic display names are 3–16 characters and pass through a profanity + character filter.",
      "Colour emoji are stripped and most decorative symbols are rejected — stick close to letters and numbers.",
      "Invisible / blank names don't work.",
    ],
    verifiedAs: "June 2026",
  },
];

export function getGameRule(slug: string): GameNameRule | undefined {
  return GAME_NAME_RULES.find((g) => g.slug === slug);
}

/** Derives the invisible-name glyph(s) from the stored code points. */
export function invisibleGlyph(cp: number): string {
  return String.fromCodePoint(cp);
}
