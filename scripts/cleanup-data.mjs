#!/usr/bin/env node
/**
 * scripts/cleanup-data.mjs
 *
 * Audits and rewrites the symbol + kaomoji data files, applying the
 * classifier from scripts/classifiers.mjs.
 *
 * What it does (idempotent):
 *
 *   1. Parses every record from
 *        src/data/symbols.ts
 *        src/data/extra-symbols.ts
 *        src/data/generated-symbols.ts
 *        src/data/kaomoji.ts
 *        src/data/generated-kaomoji.ts
 *      into in-memory objects with their original line text preserved.
 *
 *   2. For each record, runs the classifier against its declared
 *      `category` (or kaomoji validator for kaomoji). If the score is
 *      below 0.70, tries every other category; if a different category
 *      scores >= 0.70 the record is rerouted; otherwise it is
 *      quarantined and dropped.
 *
 *   3. Cross-file deduplication on the `symbol` value. Precedence:
 *        symbols.ts (highest) > extra-symbols.ts > generated-symbols.ts
 *
 *   4. ID deduplication within generated-symbols.ts. If two records
 *      share an id but have different symbols, the second is renamed by
 *      regenerating from its glyph hex (deterministic). If they share
 *      both id and symbol, the second is dropped (cross-file dedupe will
 *      have caught most of these already).
 *
 *   5. Kaomoji: validates faces with `isValidKaomoji` and dedupes by face.
 *
 *   6. Writes rewritten files (preserving header / import / type decls)
 *      and `_quarantine.json` listing every removed or relocated item
 *      with reason.
 *
 *   7. Re-running with no changes is a no-op (the files re-parse to the
 *      same set, so the rewriter produces identical output).
 *
 * Categories not in CLASSIFIER_KNOWN (e.g. fractions, enclosed, roman from
 * extra-symbols.ts) are passed through unchanged — the curator declared
 * them, we trust them.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  scoreSymbol,
  bestCategory,
  isValidKaomoji,
  KNOWN_CATEGORIES,
  meaningfulCodepoints,
} from './classifiers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SYMBOLS_FILE     = path.join(ROOT, 'src/data/symbols.ts');
const EXTRA_FILE       = path.join(ROOT, 'src/data/extra-symbols.ts');
const GENERATED_FILE   = path.join(ROOT, 'src/data/generated-symbols.ts');
const KAOMOJI_FILE     = path.join(ROOT, 'src/data/kaomoji.ts');
const GEN_KAOMOJI_FILE = path.join(ROOT, 'src/data/generated-kaomoji.ts');
const QUARANTINE_FILE  = path.join(ROOT, '_quarantine.json');
const STATE_FILE       = path.join(ROOT, '_generator-state.json');

const KNOWN = new Set(KNOWN_CATEGORIES);
const CURATOR_PASSTHROUGH = new Set(['fractions', 'enclosed', 'roman']);

const ARGS = process.argv.slice(2);
const DRY = ARGS.includes('--dry-run');
const VERBOSE = ARGS.includes('-v') || ARGS.includes('--verbose');

// ─── PARSING ──────────────────────────────────────────────────────────────────

/**
 * Splits a TS file by finding the named export's array literal:
 *   export const <varName>... = [
 *     ...
 *   ];
 *
 * Auxiliary arrays before or after this block are left untouched in the
 * header / footer sections.
 */
function splitTSArrayFile(text, varName) {
  const lines = text.split('\n');
  const openRe = new RegExp(`^export\\s+const\\s+${varName}\\b[^=]*=\\s*\\[\\s*$`);
  let openIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (openRe.test(lines[i])) { openIdx = i; break; }
  }
  if (openIdx === -1) {
    throw new Error(`Cannot locate "export const ${varName} = [" in file`);
  }
  // Find the matching close: the next "];" line at top-level. Records use
  // single-line `{...}, ` form so we don't need a real bracket counter.
  let closeIdx = -1;
  for (let i = openIdx + 1; i < lines.length; i++) {
    if (/^\s*\];\s*$/.test(lines[i])) { closeIdx = i; break; }
  }
  if (closeIdx === -1) throw new Error(`Cannot locate close of array for ${varName}`);

  const header = lines.slice(0, openIdx + 1).join('\n');
  const footer = lines.slice(closeIdx).join('\n');
  const body   = lines.slice(openIdx + 1, closeIdx);
  return { header, footer, body };
}

const FILE_VAR_MAP = {
  'symbols.ts':            'symbols',
  'extra-symbols.ts':      'extraSymbols',
  'generated-symbols.ts':  'generatedSymbols',
  'kaomoji.ts':            'kaomoji',
  'generated-kaomoji.ts':  'generatedKaomoji',
};

function getVarForFile(filePath) {
  const base = path.basename(filePath);
  const v = FILE_VAR_MAP[base];
  if (!v) throw new Error(`No export-var mapping for ${base}`);
  return v;
}

/**
 * Parses a single body line into either:
 *   { kind: 'item', record: {...}, raw: 'original line text' }
 *   { kind: 'comment', raw: ... }
 *   { kind: 'blank' }
 *
 * Records use a tolerant single-line parser. We DON'T eval JS; we just
 * read field values via regex. Strings are double-quoted in this codebase.
 */
function parseBody(body) {
  const out = [];
  for (const raw of body) {
    if (/^\s*$/.test(raw)) { out.push({ kind: 'blank', raw }); continue; }
    if (/^\s*\/\//.test(raw)) { out.push({ kind: 'comment', raw }); continue; }
    if (/^\s*\{/.test(raw)) {
      const rec = parseRecord(raw);
      if (rec) out.push({ kind: 'item', record: rec, raw });
      else out.push({ kind: 'comment', raw }); // fallback: keep verbatim
      continue;
    }
    out.push({ kind: 'comment', raw }); // unknown line — keep verbatim
  }
  return out;
}

/**
 * Pulls field values from a single record line. Returns null if not
 * recognisable as a record.
 */
function parseRecord(line) {
  // Pull "fieldName": "value with escapes" pairs
  const stringField = (name) => {
    const m = line.match(new RegExp(`\\b${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? unescapeStr(m[1]) : null;
  };
  const id = stringField('id');
  if (!id) return null;
  const symbol = stringField('symbol');
  const face   = stringField('face');
  const name   = stringField('name');
  const category = stringField('category');
  const mood   = stringField('mood');
  const unicode = stringField('unicode');
  const html    = stringField('html');
  const css     = stringField('css');
  const description = stringField('description');

  // keywords array
  let keywords = [];
  const km = line.match(/keywords:\s*\[([^\]]*)\]/);
  if (km) {
    const inner = km[1];
    keywords = [...inner.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => unescapeStr(m[1]));
  }
  // shortcut object — preserved verbatim if present
  const sm = line.match(/shortcut:\s*\{[^}]*\}/);
  const shortcutRaw = sm ? sm[0] : null;

  return { id, symbol, face, name, category, mood, unicode, html, css, description, keywords, shortcutRaw };
}

function unescapeStr(s) {
  return s
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

function escStr(s) {
  if (s == null) return '';
  return String(s)
    .replace(/\\/g,'\\\\')
    .replace(/"/g,'\\"')
    .replace(/\n/g,'\\n')
    .replace(/\r/g,'');
}

// ─── ID HELPERS ───────────────────────────────────────────────────────────────

function buildSymbolId(category, symbol, existingIds) {
  const cps = meaningfulCodepoints(symbol);
  const hex = cps.map(c => c.toString(16)).join('') || 'x';
  const slug = (category || 'sym').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  let id = `gen-${slug}-${hex}`;
  if (!existingIds.has(id)) return id;
  for (let i = 0; i < 12; i++) {
    const trial = `${id}-${i + 2}`;
    if (!existingIds.has(trial)) return trial;
  }
  return `${id}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── RECORD SERIALISATION ─────────────────────────────────────────────────────

function serialiseSymbol(rec) {
  const kw = (rec.keywords || []).map(k => `"${escStr(k)}"`).join(', ');
  const tail = rec.shortcutRaw ? `, ${rec.shortcutRaw}` : '';
  return `  { id: "${escStr(rec.id)}", symbol: "${escStr(rec.symbol)}", name: "${escStr(rec.name)}", keywords: [${kw}], category: "${escStr(rec.category)}", unicode: "${escStr(rec.unicode)}", html: "${escStr(rec.html)}", css: "${escStr(rec.css)}", description: "${escStr(rec.description)}"${tail} },`;
}

function serialiseKaomoji(rec) {
  const kw = (rec.keywords || []).map(k => `"${escStr(k)}"`).join(', ');
  return `  { id: "${escStr(rec.id)}", face: "${escStr(rec.face)}", name: "${escStr(rec.name)}", mood: "${escStr(rec.mood)}", keywords: [${kw}] },`;
}

// ─── AUDIT ────────────────────────────────────────────────────────────────────

const quarantine = []; // { source, reason, record }

function auditSymbol(rec, sourceTag) {
  // Curator pass-through: not in our classifier vocabulary.
  if (!KNOWN.has(rec.category)) {
    return { action: 'keep' };
  }

  // Curated files: trust curator decisions, don't reroute.
  // Curator may legitimately put card suits under 'shapes', Greek letters
  // (π, Δ) as math, ⚙ as 'technical', etc. Only quarantine clear garbage:
  //   - empty / null symbols
  //   - "symbols" that are only zero-width / control chars (no meaningful cps)
  if (sourceTag === 'symbols' || sourceTag === 'extra') {
    const cps = meaningfulCodepoints(rec.symbol || '');
    if (cps.length === 0) {
      return { action: 'quarantine', reason: 'no meaningful codepoints (zero-width / control only)' };
    }
    return { action: 'keep' };
  }

  // Generated file: full audit with reroute or quarantine.
  const score = scoreSymbol(rec.symbol, rec.category);
  if (score >= 0.7) return { action: 'keep' };

  const best = bestCategory(rec.symbol);
  if (best) {
    return {
      action: 'reroute',
      newCategory: best.category,
      score: best.score,
      reason: `score ${score.toFixed(2)} in '${rec.category}', better fit '${best.category}' (${best.score.toFixed(2)})`,
    };
  }

  return {
    action: 'quarantine',
    reason: `score ${score.toFixed(2)} in '${rec.category}', no other category >= 0.70`,
  };
}

// ─── PROCESS A SYMBOL FILE ────────────────────────────────────────────────────

/**
 * @returns { rewritten: string, kept: number, removed: number, rerouted: number, idsRenamed: number, dupsDropped: number }
 */
function processSymbolFile(filePath, sourceTag, opts = {}) {
  const text = fs.readFileSync(filePath, 'utf8');
  const { header, footer, body } = splitTSArrayFile(text, getVarForFile(filePath));
  const items = parseBody(body);

  // First pass: collect records & route them
  let kept = 0, rerouted = 0, removed = 0;
  const seenSymbols  = opts.symbolsSeenAcrossFiles; // Map<symbol, sourceTag>
  const seenIds      = opts.idsSeenAcrossFiles;     // Set<id>
  const localIdsForRename = new Set(); // ids we've decided to keep in this file
  let idsRenamed = 0, dupsDropped = 0;

  // Build new body in two phases. Phase 1 passes through comments & blanks,
  // and runs each item through audit + cross-file dedupe.
  const newBody = [];

  for (const node of items) {
    if (node.kind === 'comment' || node.kind === 'blank') {
      newBody.push(node.raw);
      continue;
    }
    const rec = node.record;

    // 1. Cross-file dedupe on symbol value (precedence handled by ordering of calls)
    if (rec.symbol && seenSymbols.has(rec.symbol)) {
      const winner = seenSymbols.get(rec.symbol);
      // If we're a lower-precedence file, drop.
      if (precedence(sourceTag) < precedence(winner)) {
        quarantine.push({
          source: sourceTag,
          reason: `cross-file duplicate of glyph "${rec.symbol}" already in ${winner}`,
          record: { id: rec.id, symbol: rec.symbol, name: rec.name, category: rec.category },
        });
        dupsDropped++;
        removed++;
        continue;
      }
      // Same precedence and we're already in seenSymbols means an internal
      // dup within the same file (e.g. π appears twice in symbols.ts).
      if (winner === sourceTag) {
        quarantine.push({
          source: sourceTag,
          reason: `internal duplicate of glyph "${rec.symbol}" within ${sourceTag}`,
          record: { id: rec.id, symbol: rec.symbol, name: rec.name, category: rec.category },
        });
        dupsDropped++;
        removed++;
        continue;
      }
    }

    // 2. ID dedupe (within or across the same scope of generated files)
    if (seenIds.has(rec.id)) {
      // Two records with same id but different symbol — rename this one.
      // The "winner" is the one we saw first. We need to mint a fresh id.
      const newId = buildSymbolId(rec.category || 'sym', rec.symbol || rec.id, seenIds);
      if (VERBOSE) console.log(`  rename id: ${rec.id} -> ${newId} (${rec.symbol})`);
      rec.id = newId;
      idsRenamed++;
    }

    // 3. Classifier audit
    const audit = auditSymbol(rec, sourceTag);
    if (audit.action === 'reroute') {
      const oldCat = rec.category;
      rec.category = audit.newCategory;
      // For rerouted bot-generated items, the id prefix becomes wrong
      // (e.g. gen-music-... is now arrows). Fix it deterministically.
      if (rec.id.startsWith('gen-') && rec.symbol) {
        const newId = buildSymbolId(rec.category, rec.symbol, seenIds);
        if (newId !== rec.id) {
          rec.id = newId;
          idsRenamed++;
        }
      }
      quarantine.push({
        source: sourceTag,
        reason: `rerouted from '${oldCat}' to '${rec.category}': ${audit.reason}`,
        record: { id: rec.id, symbol: rec.symbol, name: rec.name, oldCategory: oldCat, newCategory: rec.category },
        relocated: true,
      });
      rerouted++;
    } else if (audit.action === 'quarantine') {
      quarantine.push({
        source: sourceTag,
        reason: audit.reason,
        record: { id: rec.id, symbol: rec.symbol, name: rec.name, category: rec.category },
      });
      removed++;
      continue;
    }

    // Accepted — record dedupe markers
    if (rec.symbol) seenSymbols.set(rec.symbol, sourceTag);
    seenIds.add(rec.id);
    localIdsForRename.add(rec.id);

    newBody.push(serialiseSymbol(rec));
    kept++;
  }

  const rewritten = header + '\n' + newBody.join('\n') + '\n' + footer;
  return { rewritten, kept, removed, rerouted, idsRenamed, dupsDropped };
}

function precedence(tag) {
  if (tag === 'symbols')  return 3;
  if (tag === 'extra')    return 2;
  if (tag === 'generated')return 1;
  return 0;
}

// ─── KAOMOJI ──────────────────────────────────────────────────────────────────

function processKaomojiFile(filePath, sourceTag, opts) {
  const text = fs.readFileSync(filePath, 'utf8');
  const { header, footer, body } = splitTSArrayFile(text, getVarForFile(filePath));
  const items = parseBody(body);

  let kept = 0, removed = 0, idsRenamed = 0;
  const seenFaces = opts.facesSeen;
  const seenIds = opts.kaoIdsSeen;

  const newBody = [];
  for (const node of items) {
    if (node.kind === 'comment' || node.kind === 'blank') { newBody.push(node.raw); continue; }
    const rec = node.record;
    if (!rec.face) {
      quarantine.push({ source: sourceTag, reason: 'no face field', record: rec });
      removed++; continue;
    }
    if (seenFaces.has(rec.face)) {
      quarantine.push({ source: sourceTag, reason: `duplicate face "${rec.face}"`, record: { id: rec.id, face: rec.face, mood: rec.mood } });
      removed++; continue;
    }
    if (sourceTag === 'gen-kaomoji' && !isValidKaomoji(rec.face)) {
      quarantine.push({ source: sourceTag, reason: 'fails kaomoji validator', record: { id: rec.id, face: rec.face, mood: rec.mood } });
      removed++; continue;
    }
    if (seenIds.has(rec.id)) {
      // rename
      const cps = meaningfulCodepoints(rec.face);
      const hex = cps.map(c => c.toString(16)).join('').slice(0, 16) || 'x';
      const slug = (rec.mood || 'kao').toLowerCase().replace(/[^a-z0-9]+/g,'-');
      let newId = `gen-${slug}-${hex}`;
      let n = 2;
      while (seenIds.has(newId)) { newId = `gen-${slug}-${hex}-${n++}`; }
      rec.id = newId;
      idsRenamed++;
    }
    seenFaces.add(rec.face);
    seenIds.add(rec.id);
    newBody.push(serialiseKaomoji(rec));
    kept++;
  }

  const rewritten = header + '\n' + newBody.join('\n') + '\n' + footer;
  return { rewritten, kept, removed, idsRenamed };
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('CopyChars Cleanup v1');
  console.log(`Mode: ${DRY ? 'DRY RUN' : 'WRITE'}`);

  // Symbols: process in precedence order so highest-precedence claims its
  // symbol/id first.
  const seenSymbols = new Map();
  const seenIds = new Set();

  const symbolsRes = processSymbolFile(SYMBOLS_FILE, 'symbols',
    { symbolsSeenAcrossFiles: seenSymbols, idsSeenAcrossFiles: seenIds });
  const extraRes = processSymbolFile(EXTRA_FILE, 'extra',
    { symbolsSeenAcrossFiles: seenSymbols, idsSeenAcrossFiles: seenIds });
  const genRes = processSymbolFile(GENERATED_FILE, 'generated',
    { symbolsSeenAcrossFiles: seenSymbols, idsSeenAcrossFiles: seenIds });

  // Kaomoji
  const seenFaces = new Set();
  const kaoIdsSeen = new Set();
  const kaoRes = processKaomojiFile(KAOMOJI_FILE, 'kaomoji',
    { facesSeen: seenFaces, kaoIdsSeen });
  const genKaoRes = processKaomojiFile(GEN_KAOMOJI_FILE, 'gen-kaomoji',
    { facesSeen: seenFaces, kaoIdsSeen });

  // Write
  const writes = [
    { path: SYMBOLS_FILE,     content: symbolsRes.rewritten,  res: symbolsRes,  label: 'symbols.ts' },
    { path: EXTRA_FILE,       content: extraRes.rewritten,    res: extraRes,    label: 'extra-symbols.ts' },
    { path: GENERATED_FILE,   content: genRes.rewritten,      res: genRes,      label: 'generated-symbols.ts' },
    { path: KAOMOJI_FILE,     content: kaoRes.rewritten,      res: kaoRes,      label: 'kaomoji.ts' },
    { path: GEN_KAOMOJI_FILE, content: genKaoRes.rewritten,   res: genKaoRes,   label: 'generated-kaomoji.ts' },
  ];

  for (const w of writes) {
    const removedAny = (w.res.removed || 0) + (w.res.rerouted || 0) + (w.res.idsRenamed || 0) + (w.res.dupsDropped || 0);
    const orig = fs.readFileSync(w.path, 'utf8');
    const textChanged = orig !== w.content;
    // Only rewrite when there's a substantive change. This keeps the
    // operation idempotent: re-running on a clean file produces no diff
    // (the splitter's line-ending normalisation alone shouldn't churn
    // the file).
    const willWrite = removedAny > 0;
    console.log(`  ${w.label.padEnd(26)} kept=${w.res.kept} removed=${w.res.removed || 0} rerouted=${w.res.rerouted || 0} idsRenamed=${w.res.idsRenamed || 0}${willWrite ? ' [WRITE]' : (textChanged ? ' [no-op]' : ' [no change]')}`);
    if (willWrite && !DRY) {
      fs.writeFileSync(w.path, w.content, 'utf8');
    }
  }

  // Quarantine file (write on every run; idempotent because the same items keep getting
  // flagged or — after rewriting — none are flagged)
  if (!DRY) {
    fs.writeFileSync(QUARANTINE_FILE, JSON.stringify({
      generated_at: new Date().toISOString(),
      total: quarantine.length,
      items: quarantine,
    }, null, 2) + '\n', 'utf8');
  }

  // Refresh _generator-state.json with post-cleanup counts.
  if (!DRY && fs.existsSync(STATE_FILE)) {
    refreshGeneratorState();
  }

  console.log(`\nQuarantine total: ${quarantine.length}`);
  if (quarantine.length) {
    const byReason = {};
    for (const q of quarantine) {
      const k = q.reason.split(':')[0].split(',')[0];
      byReason[k] = (byReason[k] || 0) + 1;
    }
    for (const [k, v] of Object.entries(byReason).sort((a,b)=>b[1]-a[1])) {
      console.log(`  ${v.toString().padStart(4)}  ${k}`);
    }
  }
}

function countByCategory(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const counts = {};
  for (const m of content.matchAll(/category:\s*"([^"]+)"/g)) counts[m[1]] = (counts[m[1]]||0)+1;
  return counts;
}
function countMoods(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const counts = {};
  for (const m of content.matchAll(/mood:\s*"([^"]+)"/g)) counts[m[1]] = (counts[m[1]]||0)+1;
  return counts;
}
function refreshGeneratorState() {
  const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  const merged = {};
  for (const f of [SYMBOLS_FILE, EXTRA_FILE, GENERATED_FILE]) {
    const c = countByCategory(f);
    for (const [k,v] of Object.entries(c)) merged[k]=(merged[k]||0)+v;
  }
  const moods = {};
  for (const f of [KAOMOJI_FILE, GEN_KAOMOJI_FILE]) {
    const c = countMoods(f);
    for (const [k,v] of Object.entries(c)) moods[k]=(moods[k]||0)+v;
  }
  for (const k of Object.keys(state)) {
    if (k.startsWith('kaomoji:')) {
      const mood = k.slice('kaomoji:'.length);
      state[k].count = moods[mood] || 0;
    } else {
      state[k].count = merged[k] || 0;
    }
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

main();
