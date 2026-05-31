// uwu / owo text transform — pure & deterministic (no Math.random, so it is
// SSR/hydration-safe and produces the same output for the same input).
//
// Classic rules: r/l → w, n+vowel → ny+vowel, "love" → "wuv", and a rotating
// kaomoji face appended at each sentence end.

const FACES = [
  "(◕ᴥ◕)", "ʕ•ᴥ•ʔ", ">w<", "owo", "uwu", "(˘ω˘)", ":3", "(ᵘʷᵘ)", "(・`ω´・)", "^•ﻌ•^",
];

export function uwuify(text: string): string {
  if (!text) return "";
  let t = text;

  // r, l → w  (case-preserving)
  t = t.replace(/[rl]/g, "w").replace(/[RL]/g, "W");
  // n + vowel → ny + vowel  (case-preserving on the n)
  t = t.replace(/([nN])([aeiouAEIOU])/g, (_m, n: string, v: string) => n + (n === "N" ? "Y" : "y") + v);
  // "ove" → "uv"  (after l/r so "love" → "wove" → "wuv")
  t = t.replace(/ove/g, "uv").replace(/OVE/g, "UV");

  // Append a rotating face at each sentence end.
  let faceIdx = 0;
  t = t.replace(/([.!?]+)(\s|$)/g, (_m, punc: string, tail: string) => {
    const face = FACES[faceIdx % FACES.length];
    faceIdx++;
    return `${punc} ${face}${tail || " "}`;
  });

  // No sentence punctuation → append one face deterministically.
  if (faceIdx === 0) t = `${t} ${FACES[text.length % FACES.length]}`;

  return t;
}
