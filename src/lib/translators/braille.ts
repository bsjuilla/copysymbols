import type { Translator } from "./index";

const MAP: Record<string, string> = {
  a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑", f: "⠋", g: "⠛", h: "⠓",
  i: "⠊", j: "⠚", k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕", p: "⠏",
  q: "⠟", r: "⠗", s: "⠎", t: "⠞", u: "⠥", v: "⠧", w: "⠺", x: "⠭",
  y: "⠽", z: "⠵",
  "1": "⠼⠁", "2": "⠼⠃", "3": "⠼⠉", "4": "⠼⠙", "5": "⠼⠑",
  "6": "⠼⠋", "7": "⠼⠛", "8": "⠼⠓", "9": "⠼⠊", "0": "⠼⠚",
  " ": " ",
};

function encode(input: string): string {
  return input.toLowerCase().split("").map(c => MAP[c] ?? c).join("");
}

const REVERSE = Object.fromEntries(Object.entries(MAP).map(([k, v]) => [v, k]));
function decode(input: string): string {
  let out = "";
  const chars = Array.from(input); // handle code points correctly
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c === "⠼" && i + 1 < chars.length) {
      const next = chars[i + 1];
      const numKey = "⠼" + next;
      if (REVERSE[numKey]) {
        out += REVERSE[numKey];
        i++; // consumed the digit
        continue;
      }
    }
    out += REVERSE[c] ?? c;
  }
  return out;
}

export const brailleTranslator: Translator = {
  id: "text-to-braille",
  pair: { from: "Text", to: "Braille" },
  description: "Translate English text into Unicode Braille (U+2800 block). Note: this is visual braille, not BANA-compliant grade-2 contracted braille — for accessibility-critical work use a certified transcriber.",
  encode,
  decode,
  faqs: [
    { q: "Is this real Braille?", a: "It's the standard 6-dot Braille Unicode mapping (English Grade 1, uncontracted). For Grade 2 (contractions like 'and' = ⠯) or accessibility-critical work, use a certified BANA transcriber." },
    { q: "Will screen readers read this aloud?", a: "Most screen readers read Unicode Braille as the underlying character names, not as words. Real Braille users use refreshable Braille displays which can render these characters tactilely." },
    { q: "Can I decode Braille back to text?", a: "Yes — paste any 6-dot Unicode Braille and the decoder will convert it back to lowercase Latin letters." },
  ],
};
