// Render-safety verdict (build #1 of the demand-research action list).
//
// The category's #1 unmet need (both research clusters ranked it first): "will
// this character actually render where I paste it, or show as a ▯ box?" This
// turns the render-test's single age-based note into an HONEST per-platform
// verdict (iOS / Android / Windows / Discord-web) plus a "nearest-safe" swap for
// the characters that most often break — fancy fonts.
//
// IMPORTANT: this is a heuristic keyed off the Unicode block / known failure
// taxonomy, NOT a live device test. It is deliberately conservative and the UI
// frames it as guidance; the friend-test share link is the ground truth. Pure +
// deterministic so it can be unit-tested.

import { STYLES } from "./fancy-text-styles";

export type Platform = "ios" | "android" | "windows" | "discord";
export type Verdict = "safe" | "risky" | "box";

export interface RenderSafety {
  /** Worst verdict across the four platforms. */
  overall: Verdict;
  byPlatform: Record<Platform, Verdict>;
  /** Honest plain-English explanation. */
  reason: string;
  /**
   * A suggested universally-safe replacement grapheme, when the input is a
   * risky/boxy FANCY-FONT character (fraktur, double-struck, …). Undefined when
   * there is no clean safe swap (e.g. a brand-new emoji or a rare script char).
   */
  safer?: string;
}

const PLATFORMS: Platform[] = ["ios", "android", "windows", "discord"];

// ── Fancy-font reverse map ──────────────────────────────────────────────────
// The math-alphanumeric "fonts" are where most boxes happen. We detect the
// risky styles (and map them back to a base letter for the safe swap) by running
// the already-tested fancy-text transforms over the alphabet and inverting them.
// "bold" is the safe swap target: it is the most universally-supported fancy
// style (Mathematical Bold, in every modern system font).
const BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Styles that commonly show as a plain letter or a box on iPhone / Android /
// Discord-web. (Math-script, bold, italic, sans and monospace render widely and
// are intentionally NOT listed.)
const RISKY_FONT_SLUGS = new Set(["old-english", "bold-old-english", "double-struck"]);

const SAFE_FONT = STYLES.find((s) => s.slug === "bold");

// styledChar -> base letter, for the risky fonts only.
const RISKY_FONT_REVERSE: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const style of STYLES) {
    if (!RISKY_FONT_SLUGS.has(style.slug)) continue;
    for (const base of BASE_CHARS) {
      const styled = style.transform(base);
      if (styled !== base && [...styled].length === 1) map[styled] = base;
    }
  }
  return map;
})();

// Is this single grapheme one of the "common" (safe) math-alphanumeric letters
// like 𝐛𝐨𝐥𝐝 / 𝓼𝓬𝓻𝓲𝓹𝓽 — i.e. in the Math Alphanumeric block but NOT a risky font?
function isCommonFancy(cp: number): boolean {
  return cp >= 0x1d400 && cp <= 0x1d7ff;
}

function isCombiningMark(cp: number): boolean {
  return (cp >= 0x0300 && cp <= 0x036f) || (cp >= 0x1ab0 && cp <= 0x1aff) || (cp >= 0x1dc0 && cp <= 0x1dff);
}

// Brand-new emoji (Symbols & Pictographs Extended-A, 2020+, incl. the Unicode
// 17.0 set) — the ones most likely to box on devices that aren't fully updated.
function isNewEmoji(cp: number): boolean {
  return cp >= 0x1fa70 && cp <= 0x1faff;
}

// Established colour emoji — render on all modern devices (art just differs).
function isStandardEmoji(cp: number): boolean {
  return (cp >= 0x1f300 && cp <= 0x1fa6f) || (cp >= 0x1f000 && cp <= 0x1f0ff);
}

// Enclosed-alphanumeric SUPPLEMENT (🅰 🆎 …) — render inconsistently, often as
// emoji-style boxes on some platforms.
function isEnclosedSupplement(cp: number): boolean {
  return cp >= 0x1f100 && cp <= 0x1f1ff;
}

// BMP "exotic-script" decoratives popular in aesthetic bios (Tibetan, Yi, Lisu,
// Vai, Bamum, Cham brackets ꒰ ꒱ ꕥ …). They render on up-to-date phones but box
// on older devices.
function isExoticBmp(cp: number): boolean {
  return (
    (cp >= 0x0f00 && cp <= 0x0fff) || // Tibetan
    (cp >= 0xa000 && cp <= 0xa4cf) || // Yi
    (cp >= 0xa4d0 && cp <= 0xa4ff) || // Lisu
    (cp >= 0xa500 && cp <= 0xa63f) || // Vai
    (cp >= 0xa6a0 && cp <= 0xa6ff) || // Bamum
    (cp >= 0xaa00 && cp <= 0xaa5f) // Cham
  );
}

// Supplementary-plane non-emoji, non-fancy characters (Old Turkic, Linear B,
// Egyptian hieroglyphs, Phoenician, …) — box on most mainstream devices.
function isExoticAstral(cp: number): boolean {
  if (cp < 0x10000) return false;
  if (isCommonFancy(cp)) return false;
  if (isNewEmoji(cp) || isStandardEmoji(cp) || isEnclosedSupplement(cp)) return false;
  return true;
}

function v(ios: Verdict, android: Verdict, windows: Verdict, discord: Verdict): Record<Platform, Verdict> {
  return { ios, android, windows, discord };
}

function worst(by: Record<Platform, Verdict>): Verdict {
  const rank: Record<Verdict, number> = { safe: 0, risky: 1, box: 2 };
  return PLATFORMS.reduce<Verdict>((acc, p) => (rank[by[p]] > rank[acc] ? by[p] : acc), "safe");
}

/**
 * Per-platform render-safety verdict for a single grapheme.
 * Keys off the FIRST code point (the one that decides the glyph's identity).
 */
export function renderSafety(grapheme: string): RenderSafety {
  if (!grapheme) {
    const by = v("safe", "safe", "safe", "safe");
    return { overall: "safe", byPlatform: by, reason: "" };
  }

  const safeAll = (reason: string): RenderSafety => {
    const by = v("safe", "safe", "safe", "safe");
    return { overall: worst(by), byPlatform: by, reason };
  };

  // 1. Risky fancy font (fraktur / double-struck) — detected + swapped via the
  //    reverse map. Highest-value case: we can offer a safe replacement.
  if (grapheme.length <= 2 && RISKY_FONT_REVERSE[grapheme] !== undefined) {
    const by = v("risky", "risky", "safe", "risky");
    const base = RISKY_FONT_REVERSE[grapheme];
    const safer = SAFE_FONT ? SAFE_FONT.transform(base) : base;
    return {
      overall: worst(by),
      byPlatform: by,
      reason:
        "Fancy font (blackletter / double-struck). Renders on Windows but often shows as a plain letter or a box on iPhone, Android and Discord on the web. Use the safer Bold version, or keep your name in normal letters.",
      safer,
    };
  }

  const cp = grapheme.codePointAt(0)!;

  // 2. Common math fonts (bold / italic / script / sans / mono) — widely safe.
  if (isCommonFancy(cp)) {
    return safeAll("Common fancy font — renders on essentially all modern devices and apps.");
  }

  // 3. Stacking / combining marks (zalgo) — render but may overlap or get stripped.
  if (isCombiningMark(cp)) {
    const by = v("risky", "risky", "risky", "risky");
    return { overall: worst(by), byPlatform: by, reason: "Stacking (combining) mark. It attaches to the previous letter and may overlap, clip, or be stripped — many apps limit how many stack." };
  }

  // 4. Brand-new emoji — box on devices that aren't fully updated.
  if (isNewEmoji(cp)) {
    const by = v("risky", "risky", "risky", "risky");
    return { overall: worst(by), byPlatform: by, reason: "Brand-new emoji (recent Unicode). It shows for people on fully-updated devices, but appears as a ▯ box for everyone whose phone or app hasn't shipped support yet." };
  }

  // 5. Enclosed-alphanumeric supplement (🅰 🆎) — inconsistent.
  if (isEnclosedSupplement(cp)) {
    const by = v("risky", "risky", "risky", "risky");
    return { overall: worst(by), byPlatform: by, reason: "Enclosed letter that some platforms draw as a coloured emoji-style tile and others as plain text — it looks different (or boxes) depending on the device." };
  }

  // 6. Established emoji — render everywhere modern, art differs by device.
  if (isStandardEmoji(cp)) {
    return safeAll("Standard emoji — renders on all modern devices. The exact picture differs between iPhone, Android and Windows, but it never boxes on an up-to-date device.");
  }

  // 7. Exotic supplementary-plane script char — boxes on most mainstream devices.
  if (isExoticAstral(cp)) {
    const by = v("box", "box", "risky", "box");
    return { overall: worst(by), byPlatform: by, reason: "Rare script character outside the common range. It shows as a ▯ box on most mainstream phones and apps — avoid it for anything other people need to read." };
  }

  // 8. BMP exotic-script decorative (aesthetic brackets etc.) — modern-only.
  if (isExoticBmp(cp)) {
    const by = v("risky", "risky", "safe", "risky");
    return { overall: worst(by), byPlatform: by, reason: "Decorative character from a rare script. It renders on up-to-date phones but can show as a box on older devices — test it before relying on it." };
  }

  // 9. Everything else (Basic Latin, punctuation, arrows, currency, math
  //    operators, geometric shapes, dingbats, enclosed alphanumerics, CJK,
  //    fullwidth, kana, superscripts) — universally safe.
  return safeAll("Standard character — renders on essentially every device and app.");
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  ios: "iPhone",
  android: "Android",
  windows: "Windows",
  discord: "Discord",
};
