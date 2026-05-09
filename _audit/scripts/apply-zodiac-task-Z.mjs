// _audit/scripts/apply-zodiac-task-Z.mjs
// Task Z (Zodiac off-by-one fix). Idempotent.
//
// The bot misgenerated `category: "zodiac"` entries in
// src/data/generated-symbols.ts:
//   * Planet entries are systematically off-by-one (Uranus card shows ♄
//     Saturn glyph, Mars card shows ♃ Jupiter glyph, etc.).
//   * Some planets fabricated as VS-16 versions of unrelated glyphs
//     (e.g. ♀ "Uranus Symbol", ♇ "Venus Symbol").
//   * The 12 zodiac signs are duplicated with VS-16 — the bare
//     codepoint versions already exist in the curated src/data/symbols.ts,
//     so the bot's VS-16 dupes must go.
//   * Multi-glyph fabrications like "♀♂ Sun Sign" are pure noise.
//
// This script rewrites src/data/generated-symbols.ts so every remaining
// `category: "zodiac"` entry whose codepoint sits in the planet/zodiac
// range carries the authoritative name, unicode, html, css, and
// description. VS-16 duplicates of the 12 signs are deleted. Multi-glyph
// fabrications are deleted. Already-correct moon-phase emoji entries
// (U+1F311–U+1F318, plus U+1F319 crescent moon) are left alone.
//
// Re-running the script is a no-op once applied.
//
// Usage: `node _audit/scripts/apply-zodiac-task-Z.mjs`

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const TARGET = resolve(REPO_ROOT, 'src/data/generated-symbols.ts');

// ─── AUTHORITATIVE MAPPING ────────────────────────────────────────────────
// codepoint → { name, html, css, description, keywords }.
// Codepoint is what we trust; we derive `unicode` and `symbol` from it.
const AUTH = {
  0x2600: { name: 'Sun', html: '&#9728;', css: '\\2600',
    description: 'Astronomical/astrological symbol for the Sun.',
    keywords: ['sun', 'astrology', 'planet', 'astronomy'] },
  0x263D: { name: 'First Quarter Moon', html: '&#9789;', css: '\\263D',
    description: 'Astrological symbol for the first quarter moon.',
    keywords: ['moon', 'first quarter', 'astrology', 'phases'] },
  0x263E: { name: 'Last Quarter Moon', html: '&#9790;', css: '\\263E',
    description: 'Astrological symbol for the last quarter moon.',
    keywords: ['moon', 'last quarter', 'astrology', 'phases'] },
  0x263F: { name: 'Mercury', html: '&#9791;', css: '\\263F',
    description: 'Astronomical/astrological symbol for the planet Mercury.',
    keywords: ['mercury', 'planet', 'astrology', 'astronomy'] },
  0x2640: { name: 'Venus', html: '&#9792;', css: '\\2640',
    description: 'Astronomical/astrological symbol for the planet Venus; also the female sign.',
    keywords: ['venus', 'planet', 'astrology', 'female', 'astronomy'] },
  0x2641: { name: 'Earth', html: '&#9793;', css: '\\2641',
    description: 'Astronomical/astrological symbol for the planet Earth.',
    keywords: ['earth', 'planet', 'astrology', 'astronomy'] },
  0x2642: { name: 'Mars', html: '&#9794;', css: '\\2642',
    description: 'Astronomical/astrological symbol for the planet Mars; also the male sign.',
    keywords: ['mars', 'planet', 'astrology', 'male', 'astronomy'] },
  0x2643: { name: 'Jupiter', html: '&#9795;', css: '\\2643',
    description: 'Astronomical/astrological symbol for the planet Jupiter.',
    keywords: ['jupiter', 'planet', 'astrology', 'astronomy'] },
  0x2644: { name: 'Saturn', html: '&#9796;', css: '\\2644',
    description: 'Astronomical/astrological symbol for the planet Saturn.',
    keywords: ['saturn', 'planet', 'astrology', 'astronomy'] },
  0x2645: { name: 'Uranus', html: '&#9797;', css: '\\2645',
    description: 'Astronomical/astrological symbol for the planet Uranus.',
    keywords: ['uranus', 'planet', 'astrology', 'astronomy'] },
  0x2646: { name: 'Neptune', html: '&#9798;', css: '\\2646',
    description: 'Astronomical/astrological symbol for the planet Neptune.',
    keywords: ['neptune', 'planet', 'astrology', 'astronomy'] },
  0x2647: { name: 'Pluto', html: '&#9799;', css: '\\2647',
    description: 'Astronomical/astrological symbol for the dwarf planet Pluto.',
    keywords: ['pluto', 'planet', 'astrology', 'astronomy'] },
  0x2648: { name: 'Aries', html: '&#9800;', css: '\\2648',
    description: 'Aries zodiac sign — The Ram, March 21 – April 19.',
    keywords: ['aries', 'zodiac', 'astrology', 'ram'] },
  0x2649: { name: 'Taurus', html: '&#9801;', css: '\\2649',
    description: 'Taurus zodiac sign — The Bull, April 20 – May 20.',
    keywords: ['taurus', 'zodiac', 'astrology', 'bull'] },
  0x264A: { name: 'Gemini', html: '&#9802;', css: '\\264A',
    description: 'Gemini zodiac sign — The Twins, May 21 – June 20.',
    keywords: ['gemini', 'zodiac', 'astrology', 'twins'] },
  0x264B: { name: 'Cancer', html: '&#9803;', css: '\\264B',
    description: 'Cancer zodiac sign — The Crab, June 21 – July 22.',
    keywords: ['cancer', 'zodiac', 'astrology', 'crab'] },
  0x264C: { name: 'Leo', html: '&#9804;', css: '\\264C',
    description: 'Leo zodiac sign — The Lion, July 23 – August 22.',
    keywords: ['leo', 'zodiac', 'astrology', 'lion'] },
  0x264D: { name: 'Virgo', html: '&#9805;', css: '\\264D',
    description: 'Virgo zodiac sign — The Maiden, August 23 – September 22.',
    keywords: ['virgo', 'zodiac', 'astrology', 'maiden'] },
  0x264E: { name: 'Libra', html: '&#9806;', css: '\\264E',
    description: 'Libra zodiac sign — The Scales, September 23 – October 22.',
    keywords: ['libra', 'zodiac', 'astrology', 'scales'] },
  0x264F: { name: 'Scorpio', html: '&#9807;', css: '\\264F',
    description: 'Scorpio zodiac sign — The Scorpion, October 23 – November 21.',
    keywords: ['scorpio', 'zodiac', 'astrology', 'scorpion'] },
  0x2650: { name: 'Sagittarius', html: '&#9808;', css: '\\2650',
    description: 'Sagittarius zodiac sign — The Archer, November 22 – December 21.',
    keywords: ['sagittarius', 'zodiac', 'astrology', 'archer'] },
  0x2651: { name: 'Capricorn', html: '&#9809;', css: '\\2651',
    description: 'Capricorn zodiac sign — The Goat, December 22 – January 19.',
    keywords: ['capricorn', 'zodiac', 'astrology', 'goat'] },
  0x2652: { name: 'Aquarius', html: '&#9810;', css: '\\2652',
    description: 'Aquarius zodiac sign — The Water Bearer, January 20 – February 18.',
    keywords: ['aquarius', 'zodiac', 'astrology', 'water bearer'] },
  0x2653: { name: 'Pisces', html: '&#9811;', css: '\\2653',
    description: 'Pisces zodiac sign — The Fish, February 19 – March 20.',
    keywords: ['pisces', 'zodiac', 'astrology', 'fish'] },
  0x26CE: { name: 'Ophiuchus', html: '&#9934;', css: '\\26CE',
    description: 'Ophiuchus — the thirteenth sign of the constellation-based zodiac, the Serpent Bearer.',
    keywords: ['ophiuchus', 'zodiac', 'astrology', 'serpent bearer'] },
  // Moon-phase emoji block (U+1F311–U+1F318) — official Unicode names.
  // The bot mislabelled several of these (e.g. 🌖 U+1F316 was "Waxing
  // Gibbous" — that's actually Waning Gibbous; the waxing one is 🌔).
  0x1F311: { name: 'New Moon', html: '&#127761;', css: '\\1F311',
    description: 'The new moon phase emoji.',
    keywords: ['moon', 'new moon', 'phases', 'astronomy'] },
  0x1F312: { name: 'Waxing Crescent Moon', html: '&#127762;', css: '\\1F312',
    description: 'The waxing crescent moon phase emoji.',
    keywords: ['moon', 'waxing crescent', 'phases', 'astronomy'] },
  0x1F313: { name: 'First Quarter Moon', html: '&#127763;', css: '\\1F313',
    description: 'The first quarter moon phase emoji.',
    keywords: ['moon', 'first quarter', 'phases', 'astronomy'] },
  0x1F314: { name: 'Waxing Gibbous Moon', html: '&#127764;', css: '\\1F314',
    description: 'The waxing gibbous moon phase emoji.',
    keywords: ['moon', 'waxing gibbous', 'phases', 'astronomy'] },
  0x1F315: { name: 'Full Moon', html: '&#127765;', css: '\\1F315',
    description: 'The full moon phase emoji.',
    keywords: ['moon', 'full moon', 'phases', 'astronomy'] },
  0x1F316: { name: 'Waning Gibbous Moon', html: '&#127766;', css: '\\1F316',
    description: 'The waning gibbous moon phase emoji.',
    keywords: ['moon', 'waning gibbous', 'phases', 'astronomy'] },
  0x1F317: { name: 'Last Quarter Moon', html: '&#127767;', css: '\\1F317',
    description: 'The last quarter moon phase emoji.',
    keywords: ['moon', 'last quarter', 'phases', 'astronomy'] },
  0x1F318: { name: 'Waning Crescent Moon', html: '&#127768;', css: '\\1F318',
    description: 'The waning crescent moon phase emoji.',
    keywords: ['moon', 'waning crescent', 'phases', 'astronomy'] },
  0x1F319: { name: 'Crescent Moon', html: '&#127769;', css: '\\1F319',
    description: 'The crescent moon emoji, used for night, sleep, and astronomy.',
    keywords: ['moon', 'crescent', 'night', 'astronomy'] },
  0x1F31C: { name: 'Last Quarter Moon Face', html: '&#127772;', css: '\\1F31C',
    description: 'The last-quarter moon with a face emoji.',
    keywords: ['moon', 'face', 'last quarter', 'astronomy'] },
};

// Ranges in scope for normalization. Anything outside these but tagged
// `category: "zodiac"` is left alone (e.g. crescent moon 🌙 U+1F319,
// moon-phase emojis 🌑–🌘 U+1F311–U+1F318).
function isInZodiacAuthRange(cp) {
  return AUTH[cp] !== undefined;
}

// Variation Selector-16 (U+FE0F) makes some glyphs render as emoji.
// For the precomposed astrological/zodiac codepoints we strip it.
const VS16 = 0xFE0F;

function firstCodePoint(s) {
  return s.codePointAt(0);
}

// Parse one entry line. The bot writes each entry on its own line in a
// flat ASCII format that we can match with one regex. Multi-line entries
// don't appear in this file, so a line-oriented pass is safe.
//
// Captures: id, symbol, name, keywords-raw, category, unicode, html,
// css, description.
const ENTRY_RE = /^(\s*)\{\s*id:\s*"([^"]+)",\s*symbol:\s*"((?:[^"\\]|\\.)*)",\s*name:\s*"((?:[^"\\]|\\.)*)",\s*keywords:\s*\[([^\]]*)\],\s*category:\s*"([^"]+)",\s*unicode:\s*"([^"]*)",\s*html:\s*"([^"]*)",\s*css:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)"\s*\},?\s*$/;

function unescapeStr(s) {
  return s.replace(/\\(.)/g, (_, ch) => {
    if (ch === 'n') return '\n';
    if (ch === 't') return '\t';
    if (ch === 'r') return '\r';
    return ch;
  });
}

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function fmtKeywords(arr) {
  return arr.map(k => `"${escapeStr(k)}"`).join(', ');
}

function rebuild(entry, cp, auth) {
  const symbol = String.fromCodePoint(cp);
  const unicode = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
  const id = entry.id; // keep id stable for downstream slug routes
  // css must be written as a TS string literal — every backslash needs to
  // appear in the file as `\\` so the parsed string keeps the leading
  // backslash (`"\\2640"` => string `\2640`). Using escapeStr here would
  // also handle that correctly.
  return `${entry.indent}{ id: "${id}", symbol: "${symbol}", name: "${escapeStr(auth.name)}", keywords: [${fmtKeywords(auth.keywords)}], category: "zodiac", unicode: "${unicode}", html: "${auth.html}", css: "${escapeStr(auth.css)}", description: "${escapeStr(auth.description)}" },`;
}

const source = readFileSync(TARGET, 'utf8');
// Preserve original line ending so the diff stays minimal on Windows.
const eol = source.includes('\r\n') ? '\r\n' : '\n';
const lines = source.split(/\r?\n/);

const stats = {
  renamed: 0,
  vs16DupesRemoved: 0,
  fabricationsDeleted: 0,
  glyphDupesRemoved: 0,
  movedOrSkipped: 0,
  examples: [], // up to 5 before/after pairs
};

// Track which authoritative codepoints we've already kept in the
// generated file. After Task Z normalizes glyph→name, multiple bot
// entries collapse onto the same codepoint (e.g. several broken planet
// rows that all turn into Saturn after fixing). Keep the first, drop
// the rest — the glyph-based de-dup the user asked for.
const seenCps = new Set();

// First pass: identify which bare-codepoint zodiac entries already exist
// in the curated src/data/symbols.ts so we know which VS-16 dupes to drop.
const CURATED_ZODIAC_BARE_CPS = new Set([
  0x2648, 0x2649, 0x264A, 0x264B, 0x264C, 0x264D,
  0x264E, 0x264F, 0x2650, 0x2651, 0x2652, 0x2653,
]);

const out = [];
for (const rawLine of lines) {
  const m = ENTRY_RE.exec(rawLine);
  if (!m) {
    out.push(rawLine);
    continue;
  }
  const entry = {
    indent: m[1],
    id: m[2],
    symbol: unescapeStr(m[3]),
    name: unescapeStr(m[4]),
    keywordsRaw: m[5],
    category: m[6],
    unicode: m[7],
    html: m[8],
    css: unescapeStr(m[9]),
    description: unescapeStr(m[10]),
  };

  if (entry.category !== 'zodiac') {
    out.push(rawLine);
    continue;
  }

  const sym = entry.symbol;

  // Multi-glyph fabrication: more than one base codepoint of meaningful
  // glyph content. We approximate by stripping VS16 then counting code
  // points. Anything > 1 is a fabrication.
  const codepoints = [];
  for (const ch of sym) codepoints.push(ch.codePointAt(0));
  const meaningful = codepoints.filter(cp => cp !== VS16);
  if (meaningful.length > 1) {
    stats.fabricationsDeleted++;
    if (stats.examples.length < 5) {
      stats.examples.push({ kind: 'delete-fabrication', before: `${sym} "${entry.name}"`, after: '(deleted)' });
    }
    continue;
  }

  if (meaningful.length === 0) {
    // No real glyph — drop.
    stats.fabricationsDeleted++;
    continue;
  }

  const cp = meaningful[0];

  // VS-16 duplicate of one of the 12 zodiac signs that already exists
  // in the curated symbols.ts (with bare codepoint). Drop it.
  if (codepoints.includes(VS16) && CURATED_ZODIAC_BARE_CPS.has(cp)) {
    stats.vs16DupesRemoved++;
    if (stats.examples.length < 5) {
      stats.examples.push({ kind: 'drop-vs16-dup', before: `${sym} "${entry.name}" (dup of curated)`, after: '(deleted)' });
    }
    continue;
  }

  // Outside the authoritative range — could be a stray emoji that
  // landed in zodiac. If we don't know what it is, leave it.
  if (!isInZodiacAuthRange(cp)) {
    stats.movedOrSkipped++;
    out.push(rawLine);
    continue;
  }

  const auth = AUTH[cp];
  const expectedSymbol = String.fromCodePoint(cp);
  const expectedUnicode = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;

  // Glyph-level de-dup. Multiple bot rows collapse to the same
  // codepoint after correction (e.g. the off-by-one planet rows all
  // resolve to a planet that another row already represents). Keep the
  // first; drop the rest. We also drop bare-codepoint copies of the
  // 12 curated zodiac signs to avoid the curated/generated duplicate
  // pair on the rendered page.
  if (CURATED_ZODIAC_BARE_CPS.has(cp)) {
    stats.vs16DupesRemoved++;
    if (stats.examples.length < 5) {
      stats.examples.push({ kind: 'drop-curated-dup', before: `${expectedSymbol} "${auth.name}" (curated has it)`, after: '(deleted)' });
    }
    continue;
  }
  if (seenCps.has(cp)) {
    stats.glyphDupesRemoved++;
    if (stats.examples.length < 5) {
      stats.examples.push({ kind: 'drop-glyph-dup', before: `${expectedSymbol} "${entry.name}" (already kept)`, after: '(deleted)' });
    }
    continue;
  }
  seenCps.add(cp);

  const isAlreadyCorrect =
    entry.symbol === expectedSymbol &&
    entry.name === auth.name &&
    entry.unicode === expectedUnicode &&
    entry.html === auth.html &&
    entry.css === auth.css &&
    entry.description === auth.description;

  if (isAlreadyCorrect) {
    out.push(rawLine);
    continue;
  }

  const rebuilt = rebuild(entry, cp, auth);
  if (stats.examples.length < 5) {
    stats.examples.push({
      kind: 'rename',
      before: `${entry.symbol} "${entry.name}" (${entry.unicode})`,
      after: `${expectedSymbol} "${auth.name}" (${expectedUnicode})`,
    });
  }
  stats.renamed++;
  out.push(rebuilt);
}

// After the main pass, the broken planet rows have been collapsed onto
// whatever planet they were *actually* showing — so the page is now
// missing several planets that were never represented in the bot file
// (e.g. Uranus ♅ U+2645 — the bot only ever had Saturn ♄ mislabelled
// as Uranus). The curated src/data/symbols.ts has zero planet entries.
// Without backfill, a user looking for Uranus ♅ on /symbols/zodiac
// would find nothing. Backfill the canonical planets/Sun/quarter-moons
// /Ophiuchus that aren't already represented in the generated file.
//
// Insert backfill entries just before the closing `];` of the array so
// they live with the rest of the bot data. IDs are deterministic
// (`gen-zodiac-{name-slug}-canonical`) so re-running stays a no-op.
const BACKFILL_CPS = [
  0x2600, // Sun
  0x263D, // First Quarter Moon
  0x263E, // Last Quarter Moon
  0x2645, // Uranus  <-- the audit-named "Uranus card shows ♅" fix lives here
  0x26CE, // Ophiuchus
];

const newAuth = [];
for (const cp of BACKFILL_CPS) {
  if (seenCps.has(cp)) continue;
  if (!AUTH[cp]) continue;
  const auth = AUTH[cp];
  const symbol = String.fromCodePoint(cp);
  const slug = auth.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const id = `gen-zodiac-${slug}-canonical`;
  // Skip if id already present (idempotency guard against any prior run)
  if (out.some(line => line.includes(`id: "${id}"`))) continue;
  newAuth.push({ cp, auth, symbol, id });
}

if (newAuth.length > 0) {
  // Find the closing `];` of the generatedSymbols array. Last `];` line
  // in the file is the array close.
  let closeIdx = -1;
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i].trim() === '];') { closeIdx = i; break; }
  }
  if (closeIdx === -1) {
    console.error('FATAL: could not find closing `];` of generatedSymbols');
    process.exit(1);
  }
  const indent = '  ';
  const inserted = newAuth.map(({ cp, auth, symbol, id }) => {
    const unicode = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
    return `${indent}{ id: "${id}", symbol: "${symbol}", name: "${escapeStr(auth.name)}", keywords: [${fmtKeywords(auth.keywords)}], category: "zodiac", unicode: "${unicode}", html: "${auth.html}", css: "${escapeStr(auth.css)}", description: "${escapeStr(auth.description)}" },`;
  });
  out.splice(closeIdx, 0, ...inserted);
  stats.backfilled = newAuth.length;
  for (const { symbol, auth } of newAuth) {
    if (stats.examples.length < 5) {
      stats.examples.push({ kind: 'backfill-canonical', before: '(missing)', after: `${symbol} "${auth.name}"` });
    }
  }
} else {
  stats.backfilled = 0;
}

const newSource = out.join(eol);

if (newSource === source) {
  console.log('zodiac fix: nothing to change (idempotent).');
} else {
  writeFileSync(TARGET, newSource);
  console.log('zodiac fix applied:');
  console.log(`  renamed:                 ${stats.renamed}`);
  console.log(`  VS-16 / curated dupes:   ${stats.vs16DupesRemoved}`);
  console.log(`  glyph-collision dupes:   ${stats.glyphDupesRemoved}`);
  console.log(`  fabrications deleted:    ${stats.fabricationsDeleted}`);
  console.log(`  backfilled (missing):    ${stats.backfilled}`);
  console.log(`  out-of-range untouched:  ${stats.movedOrSkipped}`);
  console.log('');
  console.log('Sample changes:');
  for (const ex of stats.examples) {
    console.log(`  [${ex.kind}] ${ex.before} -> ${ex.after}`);
  }
}
