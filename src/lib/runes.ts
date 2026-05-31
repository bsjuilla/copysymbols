// Elder Futhark runes — the 24-rune runic alphabet (c. 150–800 AD).
//
// CORRECTNESS: every rune GLYPH is DERIVED from its Unicode code point via
// String.fromCodePoint (Runic block U+16A0–U+16F0) — never typed/pasted — so it
// is corruption-proof. The transliteration map is likewise built from code
// points, not literal runes.

export interface Rune {
  rune: string;
  /** Reconstructed Proto-Germanic name, e.g. "Fehu". */
  name: string;
  /** Latin sound value, e.g. "f", "th". */
  latin: string;
}

// [codepoint, name, latin sound]
const RAW: ReadonlyArray<readonly [number, string, string]> = [
  [0x16A0, "Fehu", "f"],
  [0x16A2, "Uruz", "u"],
  [0x16A6, "Thurisaz", "th"],
  [0x16A8, "Ansuz", "a"],
  [0x16B1, "Raido", "r"],
  [0x16B2, "Kaunan", "k"],
  [0x16B7, "Gebo", "g"],
  [0x16B9, "Wunjo", "w"],
  [0x16BA, "Hagalaz", "h"],
  [0x16BE, "Naudiz", "n"],
  [0x16C1, "Isaz", "i"],
  [0x16C3, "Jera", "j"],
  [0x16C7, "Eihwaz", "ï"],
  [0x16C8, "Pertho", "p"],
  [0x16C9, "Algiz", "z"],
  [0x16CA, "Sowilo", "s"],
  [0x16CF, "Tiwaz", "t"],
  [0x16D2, "Berkanan", "b"],
  [0x16D6, "Ehwaz", "e"],
  [0x16D7, "Mannaz", "m"],
  [0x16DA, "Laguz", "l"],
  [0x16DC, "Ingwaz", "ng"],
  [0x16DE, "Dagaz", "d"],
  [0x16DF, "Othala", "o"],
];

export const RUNES: Rune[] = RAW.map(([cp, name, latin]) => ({
  rune: String.fromCodePoint(cp),
  name,
  latin,
}));

// English letter / digraph → rune code point (best-effort transliteration;
// runes are not a 1:1 match for English, so this is an approximation).
const DIGRAPHS: ReadonlyArray<readonly [string, number]> = [
  ["th", 0x16A6], ["ng", 0x16DC],
];
const LETTERS: Record<string, number> = {
  a: 0x16A8, b: 0x16D2, c: 0x16B2, d: 0x16DE, e: 0x16D6, f: 0x16A0, g: 0x16B7,
  h: 0x16BA, i: 0x16C1, j: 0x16C3, k: 0x16B2, l: 0x16DA, m: 0x16D7, n: 0x16BE,
  o: 0x16DF, p: 0x16C8, q: 0x16B2, r: 0x16B1, s: 0x16CA, t: 0x16CF, u: 0x16A2,
  v: 0x16A2, w: 0x16B9, x: 0x16B2, y: 0x16C3, z: 0x16C9,
};

/** Transliterate Latin text to Elder Futhark runes (approximate). */
export function toRunes(text: string): string {
  const s = text.toLowerCase();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    const dig = DIGRAPHS.find(([k]) => k === two);
    if (dig) {
      out += String.fromCodePoint(dig[1]);
      i++;
      continue;
    }
    const cp = LETTERS[s[i]];
    out += cp != null ? String.fromCodePoint(cp) : s[i]; // keep spaces/punctuation
  }
  return out;
}
