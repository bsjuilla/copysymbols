import type { Translator } from "./index";

const MAP: Record<string, string> = {
  a: "♋", b: "♌", c: "♍", d: "♎", e: "♏", f: "♐", g: "♑", h: "♒",
  i: "♓", j: "🙰", k: "🙵", l: "●", m: "❍", n: "■", o: "□", p: "◻",
  q: "❑", r: "❒", s: "⬥", t: "⬧", u: "⬨", v: "⊕", w: "✶", x: "✚",
  y: "✜", z: "✛",
  A: "✌", B: "👌", C: "👍", D: "👎", E: "☜", F: "☞", G: "☝", H: "☟",
  I: "✋", J: "😀", K: "😐", L: "☹", M: "💣", N: "☠", O: "🚩", P: "✈",
  Q: "☀", R: "💧", S: "❄", T: "✞", U: "✠", V: "✡", W: "☪", X: "☯",
  Y: "ॐ", Z: "☸",
  "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
  "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
};

function encode(input: string): string {
  return input.split("").map(c => MAP[c] ?? c).join("");
}

export const wingdingsTranslator: Translator = {
  id: "text-to-wingdings",
  pair: { from: "Text", to: "Wingdings" },
  description: "Convert plain text into Wingdings-equivalent Unicode symbols. Useful for puzzles, ARG-style messages, and aesthetic obfuscation.",
  encode,
  faqs: [
    { q: "Is Wingdings real Unicode?", a: "No — Wingdings is a font, not a Unicode block. This translator uses the closest visual Unicode equivalents from Microsoft's published mapping." },
    { q: "Will Wingdings text work on Instagram and Discord?", a: "Yes — the output is real Unicode and renders anywhere Unicode does. It will not look identical to the Wingdings font but the symbols carry the same meaning." },
    { q: "Can people decode my Wingdings text?", a: "Yes, with the same mapping table. It's reversible but only obvious to readers who know it's Wingdings." },
  ],
};
