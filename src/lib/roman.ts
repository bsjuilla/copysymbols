// Roman numeral conversion — pure, deterministic, dependency-free.
//
// Standard additive/subtractive notation over I V X L C D M, valid 1–3999
// (the classic range expressible without the vinculum/overline). fromRoman
// validates by round-trip, so only canonical forms are accepted (e.g. "IIII"
// and "IC" are rejected).

const TO_ROMAN_TABLE: ReadonlyArray<readonly [number, string]> = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

const ROMAN_VALUE: Record<string, number> = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
};

export const ROMAN_MIN = 1;
export const ROMAN_MAX = 3999;

/** Integer (1–3999) → Roman numeral string. Returns "" if out of range. */
export function toRoman(n: number): string {
  if (!Number.isInteger(n) || n < ROMAN_MIN || n > ROMAN_MAX) return "";
  let out = "";
  let rem = n;
  for (const [value, symbol] of TO_ROMAN_TABLE) {
    while (rem >= value) {
      out += symbol;
      rem -= value;
    }
  }
  return out;
}

/**
 * Roman numeral string → integer (1–3999), or null if invalid.
 * Case-insensitive; rejects non-canonical numerals via a round-trip check.
 */
export function fromRoman(input: string): number | null {
  const s = input.trim().toUpperCase();
  if (!s || !/^[IVXLCDM]+$/.test(s)) return null;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = ROMAN_VALUE[s[i]];
    const next = i + 1 < s.length ? ROMAN_VALUE[s[i + 1]] : 0;
    if (cur < next) total -= cur;
    else total += cur;
  }
  if (total < ROMAN_MIN || total > ROMAN_MAX) return null;
  // Canonical check: the only valid spelling of `total` must equal the input.
  return toRoman(total) === s ? total : null;
}

/** Formats a date as Roman numerals, e.g. "XXXI · V · MMXXVI" (D · M · Y). */
export function dateToRoman(year: number, month: number, day: number): string {
  const y = toRoman(year);
  const m = toRoman(month);
  const d = toRoman(day);
  if (!y || !m || !d) return "";
  return `${d} · ${m} · ${y}`;
}
