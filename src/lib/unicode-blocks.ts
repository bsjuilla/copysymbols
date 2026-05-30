// Unicode code-point + block lookup for per-page data depth (P0).
//
// Google's Helpful-Content fix for thin programmatic pages is "more unique
// DATA per page, not more boilerplate." Symbol detail pages already show the
// hex code point (U+XXXX), HTML entity and CSS value; this adds two genuinely
// unique facts per glyph — the decimal code point and the Unicode block name —
// without inventing filler copy.
//
// Pure + deterministic. Block table is a curated subset covering the blocks
// the site's symbol/emoji/kaomoji data actually live in, plus a safe fallback.

export interface CodePointInfo {
  /** Decimal code point of the first glyph, e.g. 8594 for "→". */
  decimal: number;
  /** Hex code point, formatted "U+2192". */
  hex: string;
  /** Human Unicode block name, e.g. "Arrows". Falls back to "Unicode". */
  block: string;
}

interface BlockRange {
  start: number;
  end: number;
  name: string;
}

// Ordered low→high. Curated to the ranges this site's glyphs occupy.
const BLOCKS: BlockRange[] = [
  { start: 0x0000, end: 0x007f, name: "Basic Latin" },
  { start: 0x0080, end: 0x00ff, name: "Latin-1 Supplement" },
  { start: 0x0100, end: 0x017f, name: "Latin Extended-A" },
  { start: 0x0250, end: 0x02af, name: "IPA Extensions" },
  { start: 0x02b0, end: 0x02ff, name: "Spacing Modifier Letters" },
  { start: 0x0300, end: 0x036f, name: "Combining Diacritical Marks" },
  { start: 0x0370, end: 0x03ff, name: "Greek and Coptic" },
  { start: 0x0400, end: 0x04ff, name: "Cyrillic" },
  { start: 0x2000, end: 0x206f, name: "General Punctuation" },
  { start: 0x2070, end: 0x209f, name: "Superscripts and Subscripts" },
  { start: 0x20a0, end: 0x20cf, name: "Currency Symbols" },
  { start: 0x20d0, end: 0x20ff, name: "Combining Diacritical Marks for Symbols" },
  { start: 0x2100, end: 0x214f, name: "Letterlike Symbols" },
  { start: 0x2150, end: 0x218f, name: "Number Forms" },
  { start: 0x2190, end: 0x21ff, name: "Arrows" },
  { start: 0x2200, end: 0x22ff, name: "Mathematical Operators" },
  { start: 0x2300, end: 0x23ff, name: "Miscellaneous Technical" },
  { start: 0x2400, end: 0x243f, name: "Control Pictures" },
  { start: 0x2460, end: 0x24ff, name: "Enclosed Alphanumerics" },
  { start: 0x2500, end: 0x257f, name: "Box Drawing" },
  { start: 0x2580, end: 0x259f, name: "Block Elements" },
  { start: 0x25a0, end: 0x25ff, name: "Geometric Shapes" },
  { start: 0x2600, end: 0x26ff, name: "Miscellaneous Symbols" },
  { start: 0x2700, end: 0x27bf, name: "Dingbats" },
  { start: 0x27c0, end: 0x27ef, name: "Miscellaneous Mathematical Symbols-A" },
  { start: 0x27f0, end: 0x27ff, name: "Supplemental Arrows-A" },
  { start: 0x2900, end: 0x297f, name: "Supplemental Arrows-B" },
  { start: 0x2980, end: 0x29ff, name: "Miscellaneous Mathematical Symbols-B" },
  { start: 0x2a00, end: 0x2aff, name: "Supplemental Mathematical Operators" },
  { start: 0x2b00, end: 0x2bff, name: "Miscellaneous Symbols and Arrows" },
  { start: 0x3000, end: 0x303f, name: "CJK Symbols and Punctuation" },
  { start: 0x3040, end: 0x309f, name: "Hiragana" },
  { start: 0x30a0, end: 0x30ff, name: "Katakana" },
  { start: 0x4e00, end: 0x9fff, name: "CJK Unified Ideographs" },
  { start: 0xff00, end: 0xffef, name: "Halfwidth and Fullwidth Forms" },
  { start: 0x1f000, end: 0x1f02f, name: "Mahjong Tiles" },
  { start: 0x1f300, end: 0x1f5ff, name: "Miscellaneous Symbols and Pictographs" },
  { start: 0x1f600, end: 0x1f64f, name: "Emoticons" },
  { start: 0x1f650, end: 0x1f67f, name: "Ornamental Dingbats" },
  { start: 0x1f680, end: 0x1f6ff, name: "Transport and Map Symbols" },
  { start: 0x1f700, end: 0x1f77f, name: "Alchemical Symbols" },
  { start: 0x1f780, end: 0x1f7ff, name: "Geometric Shapes Extended" },
  { start: 0x1f800, end: 0x1f8ff, name: "Supplemental Arrows-C" },
  { start: 0x1f900, end: 0x1f9ff, name: "Supplemental Symbols and Pictographs" },
  { start: 0x1fa00, end: 0x1fa6f, name: "Chess Symbols" },
  { start: 0x1fa70, end: 0x1faff, name: "Symbols and Pictographs Extended-A" },
];

function blockName(cp: number): string {
  // Linear scan over a small ordered table — fine for build-time use.
  for (const b of BLOCKS) {
    if (cp >= b.start && cp <= b.end) return b.name;
  }
  return "Unicode";
}

/**
 * Returns the decimal code point, formatted hex (U+XXXX), and Unicode block
 * name for the FIRST code point of `glyph`. Multi-code-point sequences
 * (e.g. emoji with variation selectors / ZWJ) are described by their leading
 * code point, which is the conventional way to label such a sequence.
 *
 * Returns null for empty input so callers can skip the data-depth block.
 */
export function codePointInfo(glyph: string): CodePointInfo | null {
  if (!glyph) return null;
  const cp = glyph.codePointAt(0);
  if (cp === undefined) return null;
  return {
    decimal: cp,
    hex: `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`,
    block: blockName(cp),
  };
}
