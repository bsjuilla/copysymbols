// Test: Unicode code-point + block lookup (src/lib/unicode-blocks.ts).
//
// Each symbol/emoji detail page surfaces decimal + hex code point and the
// Unicode block name. This pins those three derived facts for a spread of
// glyphs across the curated block table, plus the empty-input (null) and
// out-of-table fallback ("Unicode") edge cases.
//
// No test framework is configured in this repo — plain imports, throw on
// failure, console.log on pass. Run with: npx tsx src/lib/unicode-blocks.test.ts
import { codePointInfo, type CodePointInfo } from "./unicode-blocks";

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

function assertInfo(glyph: string, expected: CodePointInfo): void {
  const got = codePointInfo(glyph);
  assert(got !== null, `codePointInfo("${glyph}") expected non-null, got null`);
  const g = got as CodePointInfo;
  assert(
    g.decimal === expected.decimal && g.hex === expected.hex && g.block === expected.block,
    `codePointInfo("${glyph}") expected ${JSON.stringify(expected)}, got ${JSON.stringify(g)}`,
  );
}

assertInfo("→", { decimal: 8594, hex: "U+2192", block: "Arrows" });
assertInfo("©", { decimal: 169, hex: "U+00A9", block: "Latin-1 Supplement" });
assertInfo("α", { decimal: 945, hex: "U+03B1", block: "Greek and Coptic" });
assertInfo("€", { decimal: 8364, hex: "U+20AC", block: "Currency Symbols" });
assertInfo("∞", { decimal: 8734, hex: "U+221E", block: "Mathematical Operators" });
assertInfo("😀", { decimal: 128512, hex: "U+1F600", block: "Emoticons" });

// Empty input → null so callers can skip the data-depth block.
assert(codePointInfo("") === null, `codePointInfo("") expected null`);

// Out-of-table code point falls back to "Unicode".
// U+F900 (CJK Compatibility Ideographs) is a block NOT in the curated table,
// so it must fall back rather than report a wrong block. Built from the code
// point directly — the U+F900 compatibility glyph is visually identical to the
// U+8C48 unified ideograph, so a pasted literal can silently be the wrong one.
assertInfo(String.fromCodePoint(0xf900), { decimal: 63744, hex: "U+F900", block: "Unicode" });

console.log("unicode-blocks.ts tests passed");
