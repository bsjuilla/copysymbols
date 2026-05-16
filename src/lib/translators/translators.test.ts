import { translators, translatorById } from "./index";

if (translators.length !== 3) throw new Error(`Expected 3 translators, got ${translators.length}`);
if (translatorById.size !== 3) throw new Error(`Map size mismatch: ${translatorById.size}`);

const cases: { id: string; input: string; mustContain: string }[] = [
  { id: "text-to-wingdings", input: "hi", mustContain: "" },
  { id: "text-to-braille", input: "hello", mustContain: "⠓" },
  { id: "english-to-pig-latin", input: "hello world", mustContain: "ellohay" },
];

for (const c of cases) {
  const t = translatorById.get(c.id);
  if (!t) throw new Error(`Missing translator ${c.id}`);
  const out = t.encode(c.input);
  if (c.mustContain && !out.includes(c.mustContain)) {
    throw new Error(`${c.id}: expected output to contain "${c.mustContain}", got "${out}"`);
  }
}

// Braille round-trip
const b = translatorById.get("text-to-braille")!;
const encoded = b.encode("hello");
const decoded = b.decode!(encoded);
if (decoded !== "hello") throw new Error(`Braille round-trip failed: "${decoded}"`);

console.log("translators smoke test passed");
