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

// Braille digit round-trip
const digitEnc = b.encode("hello 123");
const digitDec = b.decode!(digitEnc);
if (digitDec !== "hello 123") throw new Error(`Braille digit round-trip failed: "${digitDec}"`);

// Pig-latin edge cases
const pl = translatorById.get("english-to-pig-latin")!;
if (pl.encode("rhythm") !== "rhythm") throw new Error(`pig-latin vowel-less: got "${pl.encode("rhythm")}"`);
if (pl.encode("123 hello") !== "123 ellohay") throw new Error(`pig-latin mixed: got "${pl.encode("123 hello")}"`);
if (pl.encode("Apple") !== "Appleway") throw new Error(`pig-latin capitalized vowel-start: got "${pl.encode("Apple")}"`);

console.log("translators smoke test passed");
