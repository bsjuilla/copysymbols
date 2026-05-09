// _audit/scripts/apply-greek-task-G.mjs
// Task G (Greek Alphas-that-are-Iotas fix). Idempotent.
//
// The bot misgenerated `category: "greek"` entries in
// src/data/generated-symbols.ts:
//   * Twenty consecutive cards in the Greek-Extended block (U+1F00–U+1F3F)
//     are all titled "Alpha" — twelve are actually Alpha variants but with
//     no breathing-mark disambiguation, eight are Iota glyphs entirely
//     mislabelled as "Alpha".
//   * The unicode/html/css/description fields for those 20 entries are
//     empty strings (the bot didn't fill them in).
//   * One entry (U+0390 ΐ "Lowercase Iota with Dialytika Tonos") has a
//     wrong unicode field of "U+03AD" — the name is right but the
//     codepoint metadata is wrong.
//
// This script rewrites `category: "greek"` entries in generated-symbols.ts:
//   * For Greek-Extended codepoints (U+1F00–U+1FFF): rewrite name from a
//     reference map built programmatically from the block's regular
//     structure. Backfill empty unicode/html/css/description fields.
//   * For basic Greek block codepoints (U+0370–U+03FF) that ALSO exist
//     in the curated src/data/symbols.ts: delete (duplicate). The
//     curated file currently owns lowercase α–ω, uppercase Γ and Ω.
//   * For non-Greek codepoints tagged greek: delete.
//   * Idempotent. Re-running is a no-op.
//
// Usage: `node _audit/scripts/apply-greek-task-G.mjs`

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const TARGET = resolve(REPO_ROOT, 'src/data/generated-symbols.ts');

// ─── REFERENCE MAP BUILDER ────────────────────────────────────────────────
// The Greek-Extended block (U+1F00–U+1FFF) has a regular structure based
// on letter+case+breathing-mark+accent. We construct names following the
// standard Unicode CLDR convention: `{Letter} With {Marks Joined By "And"}`.
//
// Common marks:
//   Psili        = smooth breathing (◌̓)
//   Dasia        = rough breathing (◌̔)
//   Varia        = grave accent (◌̀)
//   Oxia         = acute accent (◌́)
//   Perispomeni  = circumflex (◌͂)
//   Macron       = ◌̄
//   Breve        = ◌̆
//   Iota Subscript / Prosgegrammeni = ◌ͅ
//
// Block layout (U+1F00–U+1F4F). Each 16-cell row is one letter/case
// combination, with the low nibble encoding the breathing+accent combo:
//   0: psili          1: dasia
//   2: psili+varia    3: dasia+varia
//   4: psili+oxia     5: dasia+oxia
//   6: psili+perispomeni  7: dasia+perispomeni
//   8-F: same pattern but capital
//
// Rows:
//   1F0X = Alpha lowercase  (8-F = capital Alpha)
//   1F1X = Epsilon lowercase (8-F = capital Epsilon, only 0-5 + 8-D exist)
//   1F2X = Eta lowercase    (8-F = capital Eta)
//   1F3X = Iota lowercase   (8-F = capital Iota)   <-- 8 mislabeled as Alpha
//   1F4X = Omicron lowercase (8-F = capital Omicron, only 0-5 + 8-D exist)
//
// U+1F50–U+1F5F: Upsilon (only odd low-nibble for capital — capital
//   upsilon with smooth breathing doesn't exist in Greek; only 1F59,
//   1F5B, 1F5D, 1F5F exist for capitals. Lowercase 1F50-1F57 all exist.)
//
// U+1F60–U+1F6F: Omega lowercase (8-F = capital)
// U+1F70–U+1F7F: tonos-only / oxia-only / varia-only forms
// U+1F80–U+1F8F: Alpha with iota subscript (prosgegrammeni)
// U+1F90–U+1F9F: Eta with iota subscript
// U+1FA0–U+1FAF: Omega with iota subscript
// U+1FB0–U+1FBF: more Alpha (macron/breve/etc)
// U+1FC0–U+1FCF: more Eta (with prosgegrammeni)
// U+1FD0–U+1FDF: more Iota (macron/breve/etc)
// U+1FE0–U+1FEF: more Upsilon + Rho
// U+1FF0–U+1FFF: more Omega (with prosgegrammeni)

const MARK_COMBOS = [
  'Psili',
  'Dasia',
  'Psili And Varia',
  'Dasia And Varia',
  'Psili And Oxia',
  'Dasia And Oxia',
  'Psili And Perispomeni',
  'Dasia And Perispomeni',
];

// Letter+case layout for U+1F00–U+1F6F. Each row of 16 codepoints is
// identified by the high nibble of the lower 16 bits.
// `lower` and `upper` are the letter names; `lowerExists` / `upperExists`
// indicate which low-nibble slots actually have an assigned codepoint.
const LETTER_ROWS_1F0_1F6 = {
  0x1F00: { letter: 'Alpha',   lowerSlots: 0xFF, upperSlots: 0xFF },
  0x1F10: { letter: 'Epsilon', lowerSlots: 0x3F, upperSlots: 0x3F }, // only 0-5 + 8-D
  0x1F20: { letter: 'Eta',     lowerSlots: 0xFF, upperSlots: 0xFF },
  0x1F30: { letter: 'Iota',    lowerSlots: 0xFF, upperSlots: 0xFF },
  0x1F40: { letter: 'Omicron', lowerSlots: 0x3F, upperSlots: 0x3F },
  0x1F50: { letter: 'Upsilon', lowerSlots: 0xFF, upperSlots: 0xAA }, // capital only with dasia (odd slots)
  0x1F60: { letter: 'Omega',   lowerSlots: 0xFF, upperSlots: 0xFF },
};

function mkName(letter, isCapital, marks) {
  const cap = isCapital ? 'Capital ' : '';
  if (!marks) return `${cap}${letter}`;
  return `${cap}${letter} With ${marks}`;
}

function nameForCodepoint(cp) {
  // Rows U+1F00–U+1F6F: regular pattern.
  if (cp >= 0x1F00 && cp <= 0x1F6F) {
    const rowBase = cp & 0xFFF0;
    const row = LETTER_ROWS_1F0_1F6[rowBase];
    if (!row) return null;
    const slot = cp & 0x0F;
    const isCapital = slot >= 8;
    const slotMask = 1 << (slot & 0x07); // bit position within lower-or-upper byte
    const slotsExist = isCapital ? row.upperSlots : row.lowerSlots;
    if ((slotsExist & slotMask) === 0) return null;
    const marks = MARK_COMBOS[slot & 0x07];
    return mkName(row.letter, isCapital, marks);
  }

  // U+1F70–U+1F7F: lowercase letter + Varia or Oxia (no breathing).
  // Layout: pairs of (varia, oxia) for each letter.
  //   1F70 ἀ→ὰ Alpha+Varia, 1F71 Alpha+Oxia
  //   1F72 Epsilon+Varia, 1F73 Epsilon+Oxia
  //   1F74 Eta+Varia, 1F75 Eta+Oxia
  //   1F76 Iota+Varia, 1F77 Iota+Oxia
  //   1F78 Omicron+Varia, 1F79 Omicron+Oxia
  //   1F7A Upsilon+Varia, 1F7B Upsilon+Oxia
  //   1F7C Omega+Varia, 1F7D Omega+Oxia
  //   1F7E, 1F7F not assigned
  if (cp >= 0x1F70 && cp <= 0x1F7D) {
    const lettersByPair = ['Alpha', 'Epsilon', 'Eta', 'Iota', 'Omicron', 'Upsilon', 'Omega'];
    const pairIdx = (cp - 0x1F70) >> 1;
    const isOxia = (cp & 1) === 1;
    return mkName(lettersByPair[pairIdx], false, isOxia ? 'Oxia' : 'Varia');
  }

  // U+1F80–U+1F8F: Alpha with iota subscript (prosgegrammeni)
  // Same layout as U+1F00 but every name gets " And Prosgegrammeni" appended.
  if (cp >= 0x1F80 && cp <= 0x1F8F) {
    const slot = cp & 0x0F;
    const isCapital = slot >= 8;
    const marks = MARK_COMBOS[slot & 0x07];
    return mkName('Alpha', isCapital, `${marks} And Prosgegrammeni`);
  }

  // U+1F90–U+1F9F: Eta with iota subscript
  if (cp >= 0x1F90 && cp <= 0x1F9F) {
    const slot = cp & 0x0F;
    const isCapital = slot >= 8;
    const marks = MARK_COMBOS[slot & 0x07];
    return mkName('Eta', isCapital, `${marks} And Prosgegrammeni`);
  }

  // U+1FA0–U+1FAF: Omega with iota subscript
  if (cp >= 0x1FA0 && cp <= 0x1FAF) {
    const slot = cp & 0x0F;
    const isCapital = slot >= 8;
    const marks = MARK_COMBOS[slot & 0x07];
    return mkName('Omega', isCapital, `${marks} And Prosgegrammeni`);
  }

  // U+1FB0–U+1FBF: more Alpha variants
  switch (cp) {
    case 0x1FB0: return 'Alpha With Vrachy'; // breve
    case 0x1FB1: return 'Alpha With Macron';
    case 0x1FB2: return 'Alpha With Varia And Prosgegrammeni';
    case 0x1FB3: return 'Alpha With Prosgegrammeni';
    case 0x1FB4: return 'Alpha With Oxia And Prosgegrammeni';
    case 0x1FB6: return 'Alpha With Perispomeni';
    case 0x1FB7: return 'Alpha With Perispomeni And Prosgegrammeni';
    case 0x1FB8: return 'Capital Alpha With Vrachy';
    case 0x1FB9: return 'Capital Alpha With Macron';
    case 0x1FBA: return 'Capital Alpha With Varia';
    case 0x1FBB: return 'Capital Alpha With Oxia';
    case 0x1FBC: return 'Capital Alpha With Prosgegrammeni';
    case 0x1FBD: return 'Greek Koronis';
    case 0x1FBE: return 'Greek Prosgegrammeni';
    case 0x1FBF: return 'Greek Psili';
  }

  // U+1FC0–U+1FCF: more Eta variants + accent marks
  switch (cp) {
    case 0x1FC0: return 'Greek Perispomeni';
    case 0x1FC1: return 'Greek Dialytika And Perispomeni';
    case 0x1FC2: return 'Eta With Varia And Prosgegrammeni';
    case 0x1FC3: return 'Eta With Prosgegrammeni';
    case 0x1FC4: return 'Eta With Oxia And Prosgegrammeni';
    case 0x1FC6: return 'Eta With Perispomeni';
    case 0x1FC7: return 'Eta With Perispomeni And Prosgegrammeni';
    case 0x1FC8: return 'Capital Epsilon With Varia';
    case 0x1FC9: return 'Capital Epsilon With Oxia';
    case 0x1FCA: return 'Capital Eta With Varia';
    case 0x1FCB: return 'Capital Eta With Oxia';
    case 0x1FCC: return 'Capital Eta With Prosgegrammeni';
    case 0x1FCD: return 'Greek Psili And Varia';
    case 0x1FCE: return 'Greek Psili And Oxia';
    case 0x1FCF: return 'Greek Psili And Perispomeni';
  }

  // U+1FD0–U+1FDF: more Iota variants
  switch (cp) {
    case 0x1FD0: return 'Iota With Vrachy';
    case 0x1FD1: return 'Iota With Macron';
    case 0x1FD2: return 'Iota With Dialytika And Varia';
    case 0x1FD3: return 'Iota With Dialytika And Oxia';
    case 0x1FD6: return 'Iota With Perispomeni';
    case 0x1FD7: return 'Iota With Dialytika And Perispomeni';
    case 0x1FD8: return 'Capital Iota With Vrachy';
    case 0x1FD9: return 'Capital Iota With Macron';
    case 0x1FDA: return 'Capital Iota With Varia';
    case 0x1FDB: return 'Capital Iota With Oxia';
    case 0x1FDD: return 'Greek Dasia And Varia';
    case 0x1FDE: return 'Greek Dasia And Oxia';
    case 0x1FDF: return 'Greek Dasia And Perispomeni';
  }

  // U+1FE0–U+1FEF: more Upsilon + Rho variants
  switch (cp) {
    case 0x1FE0: return 'Upsilon With Vrachy';
    case 0x1FE1: return 'Upsilon With Macron';
    case 0x1FE2: return 'Upsilon With Dialytika And Varia';
    case 0x1FE3: return 'Upsilon With Dialytika And Oxia';
    case 0x1FE4: return 'Rho With Psili';
    case 0x1FE5: return 'Rho With Dasia';
    case 0x1FE6: return 'Upsilon With Perispomeni';
    case 0x1FE7: return 'Upsilon With Dialytika And Perispomeni';
    case 0x1FE8: return 'Capital Upsilon With Vrachy';
    case 0x1FE9: return 'Capital Upsilon With Macron';
    case 0x1FEA: return 'Capital Upsilon With Varia';
    case 0x1FEB: return 'Capital Upsilon With Oxia';
    case 0x1FEC: return 'Capital Rho With Dasia';
    case 0x1FED: return 'Greek Dialytika And Varia';
    case 0x1FEE: return 'Greek Dialytika And Oxia';
    case 0x1FEF: return 'Greek Varia';
  }

  // U+1FF0–U+1FFF: more Omega variants
  switch (cp) {
    case 0x1FF2: return 'Omega With Varia And Prosgegrammeni';
    case 0x1FF3: return 'Omega With Prosgegrammeni';
    case 0x1FF4: return 'Omega With Oxia And Prosgegrammeni';
    case 0x1FF6: return 'Omega With Perispomeni';
    case 0x1FF7: return 'Omega With Perispomeni And Prosgegrammeni';
    case 0x1FF8: return 'Capital Omicron With Varia';
    case 0x1FF9: return 'Capital Omicron With Oxia';
    case 0x1FFA: return 'Capital Omega With Varia';
    case 0x1FFB: return 'Capital Omega With Oxia';
    case 0x1FFC: return 'Capital Omega With Prosgegrammeni';
    case 0x1FFD: return 'Greek Oxia';
    case 0x1FFE: return 'Greek Dasia';
  }

  return null;
}

// Codepoints in the basic Greek block that the curated src/data/symbols.ts
// already owns. Generated entries with these codepoints are duplicates
// and must be deleted.
const CURATED_GREEK_CPS = new Set([
  0x03B1, // α  Alpha (lowercase)
  0x03B2, // β  Beta (lowercase)
  0x03B3, // γ  Gamma (lowercase)
  0x0393, // Γ  Gamma (uppercase)
  0x03B4, // δ  Delta (lowercase)
  0x03B5, // ε  Epsilon (lowercase)
  0x03B6, // ζ  Zeta (lowercase)
  0x03B7, // η  Eta (lowercase)
  0x03B8, // θ  Theta (lowercase)
  0x03B9, // ι  Iota (lowercase)
  0x03BA, // κ  Kappa (lowercase)
  0x03BB, // λ  Lambda (lowercase)
  0x03BC, // μ  Mu (lowercase)
  0x03BD, // ν  Nu (lowercase)
  0x03BE, // ξ  Xi (lowercase)
  0x03BF, // ο  Omicron (lowercase)
  0x03C1, // ρ  Rho (lowercase)
  0x03C3, // σ  Sigma (lowercase)
  0x03C4, // τ  Tau (lowercase)
  0x03C6, // φ  Phi (lowercase)
  0x03C7, // χ  Chi (lowercase)
  0x03C8, // ψ  Psi (lowercase)
  0x03C9, // ω  Omega (lowercase)
  0x03A9, // Ω  Omega (uppercase)
]);

function isBasicGreek(cp) {
  return cp >= 0x0370 && cp <= 0x03FF;
}

function isGreekExtended(cp) {
  return cp >= 0x1F00 && cp <= 0x1FFF;
}

// ─── PARSING ──────────────────────────────────────────────────────────────
// Same regex shape as Task Z's script — matches a flat one-entry-per-line
// object literal with id/symbol/name/keywords/category/unicode/html/css/
// description.
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

function firstCodePoint(s) {
  return s.codePointAt(0);
}

function describeFor(name) {
  // A short, generic description that is accurate for any named
  // Greek-Extended polytonic variant.
  return `${name} — a polytonic Greek letter from the Greek Extended block.`;
}

// Build the rebuilt object literal for one entry.
function rebuildLine(entry, cp, name) {
  const symbol = String.fromCodePoint(cp);
  const unicode = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
  const html = `&#${cp};`;
  const css = `\\${cp.toString(16).toUpperCase().padStart(4, '0')}`;
  const description = entry.description || describeFor(name);
  // Keep keywords if non-empty; otherwise seed with a useful default.
  let keywords;
  if (entry.keywordsRaw.trim().length > 0) {
    keywords = entry.keywordsRaw; // pass-through
  } else {
    const lower = name.toLowerCase();
    const tokens = ['greek'];
    for (const part of lower.split(/\s+/)) {
      if (part === 'with' || part === 'and' || part === 'capital') continue;
      if (!tokens.includes(part)) tokens.push(part);
    }
    keywords = tokens.map(t => `"${t}"`).join(', ');
  }
  return `${entry.indent}{ id: "${entry.id}", symbol: "${symbol}", name: "${escapeStr(name)}", keywords: [${keywords}], category: "greek", unicode: "${unicode}", html: "${html}", css: "${escapeStr(css)}", description: "${escapeStr(description)}" },`;
}

// ─── MAIN PASS ────────────────────────────────────────────────────────────
const source = readFileSync(TARGET, 'utf8');
const eol = source.includes('\r\n') ? '\r\n' : '\n';
const lines = source.split(/\r?\n/);

const stats = {
  renamed: 0,
  removedDuplicates: 0,
  removedNonGreek: 0,
  leftAlone: 0,
  examples: [],
  todoVerify: [],
};

const out = [];
const seenCps = new Set();

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

  if (entry.category !== 'greek') {
    out.push(rawLine);
    continue;
  }

  // Use the symbol field as the source of truth for codepoint — the
  // unicode field on broken entries is empty or wrong (e.g. line 355
  // claims U+03AD but the glyph ΐ is actually U+0390).
  if (entry.symbol.length === 0) {
    stats.removedNonGreek++;
    if (stats.examples.length < 5) {
      stats.examples.push({ kind: 'delete-empty', before: `(empty symbol) "${entry.name}"`, after: '(deleted)' });
    }
    continue;
  }
  const cp = firstCodePoint(entry.symbol);

  // Non-Greek codepoint shoved into the greek category — delete.
  if (!isBasicGreek(cp) && !isGreekExtended(cp)) {
    stats.removedNonGreek++;
    if (stats.examples.length < 5) {
      stats.examples.push({
        kind: 'delete-non-greek',
        before: `${entry.symbol} "${entry.name}" (U+${cp.toString(16).toUpperCase().padStart(4, '0')})`,
        after: '(deleted)',
      });
    }
    continue;
  }

  // Basic-Greek codepoint that the curated symbols.ts owns — delete dup.
  if (isBasicGreek(cp) && CURATED_GREEK_CPS.has(cp)) {
    stats.removedDuplicates++;
    if (stats.examples.length < 5) {
      stats.examples.push({
        kind: 'delete-curated-dup',
        before: `${entry.symbol} "${entry.name}" (curated owns U+${cp.toString(16).toUpperCase().padStart(4, '0')})`,
        after: '(deleted)',
      });
    }
    continue;
  }

  // Glyph-level dedup — if we already kept this exact codepoint, drop.
  if (seenCps.has(cp)) {
    stats.removedDuplicates++;
    if (stats.examples.length < 5) {
      stats.examples.push({
        kind: 'delete-glyph-dup',
        before: `${entry.symbol} "${entry.name}" (already kept)`,
        after: '(deleted)',
      });
    }
    continue;
  }
  seenCps.add(cp);

  // Basic-Greek codepoint NOT in the curated set — keep but make sure the
  // name and metadata are sane. We don't have a reference map for the
  // basic block here (the existing names like "Theta", "Iota" are mostly
  // fine), so we only normalize the metadata fields.
  if (isBasicGreek(cp)) {
    const expectedUnicode = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
    if (entry.unicode === expectedUnicode && entry.symbol === String.fromCodePoint(cp)) {
      // Already consistent — leave alone.
      stats.leftAlone++;
      out.push(rawLine);
      continue;
    }
    // Unicode field is wrong (e.g. line 355). Rebuild with correct fields,
    // keeping the existing name (it's curated-quality).
    const symbol = String.fromCodePoint(cp);
    const html = `&#${cp};`;
    const css = `\\${cp.toString(16).toUpperCase().padStart(4, '0')}`;
    const rebuilt = `${entry.indent}{ id: "${entry.id}", symbol: "${symbol}", name: "${escapeStr(entry.name)}", keywords: [${entry.keywordsRaw}], category: "greek", unicode: "${expectedUnicode}", html: "${html}", css: "${escapeStr(css)}", description: "${escapeStr(entry.description)}" },`;
    if (stats.examples.length < 5) {
      stats.examples.push({
        kind: 'fix-metadata',
        before: `${entry.symbol} "${entry.name}" (claimed ${entry.unicode || 'no-unicode'})`,
        after: `${symbol} "${entry.name}" (${expectedUnicode})`,
      });
    }
    stats.renamed++;
    out.push(rebuilt);
    continue;
  }

  // Greek-Extended block: the bug zone. Look up the canonical name.
  const refName = nameForCodepoint(cp);
  if (!refName) {
    // Codepoint we couldn't name. Don't delete a valid Greek glyph —
    // leave the entry in place but flag for manual review.
    stats.leftAlone++;
    stats.todoVerify.push(`U+${cp.toString(16).toUpperCase().padStart(4, '0')} ${entry.symbol} "${entry.name}" (no auto-name available)`);
    out.push(rawLine);
    continue;
  }

  const expectedUnicode = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
  const expectedSymbol = String.fromCodePoint(cp);
  const expectedHtml = `&#${cp};`;
  const expectedCss = `\\${cp.toString(16).toUpperCase().padStart(4, '0')}`;

  const isAlreadyCorrect =
    entry.symbol === expectedSymbol &&
    entry.name === refName &&
    entry.unicode === expectedUnicode &&
    entry.html === expectedHtml &&
    entry.css === expectedCss;

  if (isAlreadyCorrect) {
    stats.leftAlone++;
    out.push(rawLine);
    continue;
  }

  if (stats.examples.length < 5) {
    stats.examples.push({
      kind: 'rename',
      before: `${entry.symbol} "${entry.name}" (${entry.unicode || 'no-unicode'})`,
      after: `${expectedSymbol} "${refName}" (${expectedUnicode})`,
    });
  }
  stats.renamed++;
  out.push(rebuildLine(entry, cp, refName));
}

const newSource = out.join(eol);

if (newSource === source) {
  console.log('greek fix: nothing to change (idempotent).');
} else {
  writeFileSync(TARGET, newSource);
  console.log('greek fix applied:');
  console.log(`  renamed:                ${stats.renamed}`);
  console.log(`  removed (duplicates):   ${stats.removedDuplicates}`);
  console.log(`  removed (non-greek):    ${stats.removedNonGreek}`);
  console.log(`  left alone:             ${stats.leftAlone}`);
  console.log('');
  console.log('Sample changes:');
  for (const ex of stats.examples) {
    console.log(`  [${ex.kind}] ${ex.before} -> ${ex.after}`);
  }
  if (stats.todoVerify.length > 0) {
    console.log('');
    console.log('TODO: verify (no auto-name available, left as-is):');
    for (const t of stats.todoVerify) console.log(`  - ${t}`);
  }
}
