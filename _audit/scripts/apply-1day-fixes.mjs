#!/usr/bin/env node
/**
 * One-shot script: apply the audit's 1-day data fixes.
 *
 * 1. Strip 2 ZWJ-polluted arrow records from generated-symbols.ts
 * 2. Fix 6 punctuation entries with the boilerplate "Reference mark..." name,
 *    delete 4 fake concatenated-symbol entries
 * 3. Add /symbol/heart and /symbol/star records to symbols.ts
 *
 * Idempotent — re-running is a no-op once changes have landed.
 */
import fs from 'node:fs';

const GEN = 'src/data/generated-symbols.ts';
const SYM = 'src/data/symbols.ts';

let gen = fs.readFileSync(GEN, 'utf8');
let sym = fs.readFileSync(SYM, 'utf8');

let changes = 0;

// === 1. Strip ZWJ-polluted arrow records ===
// Match the entire line for each by id (id is unique).
const arrowIds = [
  'gen-arrows-long-left-right-arrow-extender-1777816983326',
  'gen-arrows-long-left-right-arc-extender-1777816983326',
];
for (const id of arrowIds) {
  // Match the line containing this id (greedy across the ZWJ block, stop at trailing newline)
  const lineRe = new RegExp(`^\\s*\\{ id: "${id}".*\\r?\\n`, 'm');
  if (lineRe.test(gen)) {
    gen = gen.replace(lineRe, '');
    changes++;
    console.log(`OK removed ZWJ-polluted: ${id}`);
  } else {
    console.log(`SKIP ${id} (already removed)`);
  }
}

// === 2. Fix punctuation boilerplate names ===
// Map each id to its real Unicode name (or null = delete entirely)
const PUNCT_FIX = {
  'gen-punctuation-2042':       { name: 'Asterism', desc: 'Three asterisks arranged in a triangle, used to mark a section break.' },
  'gen-punctuation-2043':       { name: 'Hyphen Bullet', desc: 'A hyphen-shaped bullet used in lists and indices.' },
  'gen-punctuation-2041':       { name: 'Caret Insertion Point', desc: 'Editorial mark indicating where text should be inserted.' },
  'gen-punctuation-20412041':   null, // fake double-caret
  'gen-punctuation-20422042':   null, // fake double-asterism
  'gen-punctuation-2023':       { name: 'Triangular Bullet', desc: 'A small filled triangle used as a list bullet.' },
  'gen-punctuation-2040':       { name: 'Character Tie', desc: 'Linguistic mark joining two characters as one phonetic unit.' },
  'gen-punctuation-2025':       { name: 'Two Dot Leader', desc: 'Two dots used as leading punctuation in tables of contents.' },
  'gen-punctuation-20412022':   null, // fake concat
  'gen-punctuation-20422022':   null, // fake concat
};

for (const [id, fix] of Object.entries(PUNCT_FIX)) {
  const lineRe = new RegExp(`^\\s*\\{ id: "${id}".*\\r?\\n`, 'm');
  if (!lineRe.test(gen)) {
    console.log(`SKIP ${id} (already gone)`);
    continue;
  }
  if (fix === null) {
    gen = gen.replace(lineRe, '');
    changes++;
    console.log(`OK deleted fake-concat entry: ${id}`);
  } else {
    // Replace the name and description fields in this line only
    gen = gen.replace(lineRe, (line) => {
      let updated = line.replace(/name: "[^"]*"/, `name: "${fix.name}"`);
      updated = updated.replace(/description: "[^"]*"/, `description: "${fix.desc}"`);
      return updated;
    });
    changes++;
    console.log(`OK renamed ${id} -> "${fix.name}"`);
  }
}

// === 3. Add /symbol/heart and /symbol/star records ===
// Insert right after the existing heart-outline / star-outline lines.
const HEART_RECORD = `  { id: "heart", symbol: "❤", name: "Heart", keywords: ["heart","love","like","favorite","red"], category: "shapes", unicode: "U+2764", html: "&#10084;", css: "\\\\2764", description: "The classic red heart symbol used to express love, like, or favorite." },\n`;
const STAR_RECORD  = `  { id: "star", symbol: "★", name: "Star", keywords: ["star","favorite","rating","filled","bookmark"], category: "shapes", unicode: "U+2605", html: "&#9733;", css: "\\\\2605", description: "A solid star, used for ratings, favorites, and bookmarks." },\n`;

if (!sym.includes('id: "heart",')) {
  // Insert after the heart-outline line
  sym = sym.replace(/(\{ id: "heart-outline".*\n)/, `$1${HEART_RECORD}`);
  changes++;
  console.log('OK added id: "heart" record');
} else {
  console.log('SKIP id: "heart" already exists');
}
if (!sym.includes('id: "star",')) {
  sym = sym.replace(/(\{ id: "star-outline".*\n)/, `$1${STAR_RECORD}`);
  changes++;
  console.log('OK added id: "star" record');
} else {
  console.log('SKIP id: "star" already exists');
}

if (changes === 0) {
  console.log('No changes — already idempotent.');
  process.exit(0);
}

fs.writeFileSync(GEN, gen);
fs.writeFileSync(SYM, sym);
console.log(`\nApplied ${changes} changes total. Wrote ${GEN}, ${SYM}.`);
