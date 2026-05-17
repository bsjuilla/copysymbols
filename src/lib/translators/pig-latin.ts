import type { Translator } from "./index";

const VOWELS = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

function encodeWord(word: string): string {
  if (!word) return word;
  const isUpper = word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();
  const lower = word.toLowerCase();
  if (VOWELS.has(lower[0])) {
    const result = lower + "way";
    return isUpper ? result[0].toUpperCase() + result.slice(1) : result;
  }
  let split = -1;
  for (let i = 0; i < lower.length; i++) {
    if (VOWELS.has(lower[i])) { split = i; break; }
  }
  if (split === -1) return word; // no vowel, leave unchanged
  const result = lower.slice(split) + lower.slice(0, split) + "ay";
  return isUpper ? result[0].toUpperCase() + result.slice(1) : result;
}

function encode(input: string): string {
  return input.split(/(\s+|[^\w'\s]+)/).map(token => {
    if (/^\s+$/.test(token) || /^[^\w'\s]+$/.test(token)) return token;
    if (!/^[A-Za-z]/.test(token)) return token; // skip numbers, non-Latin starts
    return encodeWord(token);
  }).join("");
}

export const pigLatinTranslator: Translator = {
  id: "english-to-pig-latin",
  pair: { from: "English", to: "Pig Latin" },
  description: "Translate English to Pig Latin: words starting with a consonant get the first letters (up to the first vowel) moved to the end and 'ay' appended (hello → ellohay). Vowel-initial words just get 'way' appended (apple → appleway).",
  encode,
  faqs: [
    { q: "Which Pig Latin variant is this?", a: "The 'ay' / 'way' variant common in North American English. For 'hay' or other variants, the rule is consistent enough that readers will understand either way." },
    { q: "Are punctuation and capitalization preserved?", a: "Yes — punctuation passes through unchanged and the first letter of a word stays capitalized after translation." },
    { q: "Can it translate back?", a: "Not reliably — Pig Latin is lossy (multiple original words can produce the same Pig Latin output)." },
    { q: "How does it handle words with accented letters?", a: "Pig Latin is only well-defined for ASCII English words. Accented letters (café, naïve, jalapeño) may produce unexpected output — translate the ASCII portion mentally or strip accents first." },
  ],
};
