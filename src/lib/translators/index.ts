export interface Translator {
  id: string;                // url slug e.g. "text-to-wingdings"
  pair: { from: string; to: string };  // e.g. { from: "Text", to: "Wingdings" }
  description: string;       // 1-2 sentences for the page intro
  encode: (input: string) => string;
  decode?: (input: string) => string;  // optional reverse
  faqs: { q: string; a: string }[];   // 3-5 entries
}

import { wingdingsTranslator } from "./wingdings";
import { brailleTranslator } from "./braille";
import { pigLatinTranslator } from "./pig-latin";

export const translators: Translator[] = [
  wingdingsTranslator,
  brailleTranslator,
  pigLatinTranslator,
];

export const translatorById = new Map(translators.map(t => [t.id, t]));
