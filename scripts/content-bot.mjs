#!/usr/bin/env node
/**
 * CopyChars Content Bot v4
 * Generates: Symbols, Kaomoji, Emoji Combos, Aesthetic Borders, Bio Templates
 * Primary API: Groq (free, 14,400 req/day)
 * Fallback: Gemini Flash (free, 1,500 req/day)
 *
 * v4 changes (Generator Overhaul, agent/generator-overhaul):
 *   1. Pre-insertion classifier (scripts/classifiers.mjs) — every candidate
 *      is scored against its target category's Unicode-block whitelist.
 *      Items below 70% are rejected before they touch the data files.
 *   2. Per-category saturation tracking in _generator-state.json. After 2
 *      consecutive zero-new runs OR count >= 250, the category is marked
 *      saturated and skipped on subsequent runs. Reset via
 *      `--reset-saturation [category]`.
 *   3. Deterministic IDs: `gen-<category>-<glyph-codepoints-hex>-<rand>`.
 *      Codepoint hex makes the id reproducible; short random handles the
 *      theoretical multi-glyph collision case. Uniqueness is verified
 *      against existing inventory before insertion.
 *   4. Dedupe against ALL data files including extra-symbols.ts.
 *   5. `--dry-run` — runs everything but never writes files. Reports what
 *      WOULD have been written.
 *   6. `--use-fixture` — loads candidate items from scripts/test-fixtures.json
 *      instead of calling the AI APIs. Lets us validate the classifier
 *      end-to-end without burning credits.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  passesCategory,
  scoreSymbol,
  bestCategory,
  isValidKaomoji,
  KNOWN_CATEGORIES,
  meaningfulCodepoints,
} from './classifiers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── CLI FLAGS ────────────────────────────────────────────────────────────────

const ARGS = process.argv.slice(2);
const DRY_RUN     = ARGS.includes('--dry-run');
const USE_FIXTURE = ARGS.includes('--use-fixture');
const RESET_FLAG_IDX = ARGS.indexOf('--reset-saturation');
const RESET_SATURATION = RESET_FLAG_IDX !== -1; // optional category arg follows
const RESET_SATURATION_CAT = RESET_SATURATION
  ? (ARGS[RESET_FLAG_IDX + 1] && !ARGS[RESET_FLAG_IDX + 1].startsWith('--')
      ? ARGS[RESET_FLAG_IDX + 1]
      : null)
  : null;

// ─── API CONFIG ───────────────────────────────────────────────────────────────

const GROQ_KEY   = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// In USE_FIXTURE mode we don't need API keys.
if (!USE_FIXTURE && !GROQ_KEY && !GEMINI_KEY) {
  console.error('No API keys. Add GROQ_API_KEY or GEMINI_API_KEY (or run with --use-fixture).');
  process.exit(1);
}

const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

const MAX_PER_MIN = 10;
const MAX_PER_DAY = 900;
const DELAY_MS    = USE_FIXTURE ? 0 : 7000;

let reqMin = 0, reqDay = 0, minStart = Date.now();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function rateCheck() {
  if (Date.now() - minStart >= 60000) { reqMin = 0; minStart = Date.now(); }
  if (reqMin >= MAX_PER_MIN) {
    const wait = 60000 - (Date.now() - minStart) + 2000;
    console.log(`  Rate limit — waiting ${Math.ceil(wait/1000)}s`);
    await sleep(wait);
    reqMin = 0; minStart = Date.now();
  }
}

async function callGroq(prompt) {
  await rateCheck();
  const r = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], max_tokens: 2048, temperature: 0.85 })
  });
  reqMin++; reqDay++;
  if (!r.ok) throw new Error(`Groq ${r.status}: ${(await r.text()).slice(0,100)}`);
  const d = await r.json();
  return d.choices?.[0]?.message?.content || '';
}

async function callGemini(prompt) {
  if (!GEMINI_KEY) throw new Error('No Gemini key');
  await rateCheck();
  const r = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.85, maxOutputTokens: 2048 } })
  });
  reqMin++; reqDay++;
  if (!r.ok) throw new Error(`Gemini ${r.status}`);
  const d = await r.json();
  return d.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function ai(prompt) {
  if (GROQ_KEY && reqDay < MAX_PER_DAY) {
    try { return await callGroq(prompt); } catch(e) { console.log(`  Groq failed: ${e.message}, trying Gemini...`); }
  }
  return await callGemini(prompt);
}

function parseJSON(text) {
  const m = text.match(/\[[\s\S]*\]/);
  if (!m) throw new Error('No JSON array in response');
  return JSON.parse(m[0]);
}

function esc(s) {
  return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'');
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

// Deterministic-ish ID. <prefix>-<codepoint hex of glyph>-<short random>.
// Random suffix is short (4 chars) — used only if a collision somehow exists.
function buildSymbolId(category, symbol, existingIds) {
  const cps = meaningfulCodepoints(symbol);
  const hex = cps.map(c => c.toString(16)).join('') || 'x';
  let id = `gen-${slug(category)}-${hex}`;
  if (!existingIds.has(id)) return id;
  // Add random suffix and retry up to 8 times
  for (let i = 0; i < 8; i++) {
    const rand = Math.random().toString(36).slice(2, 6);
    const trial = `${id}-${rand}`;
    if (!existingIds.has(trial)) return trial;
  }
  // Last-resort: append timestamp
  return `${id}-${Date.now().toString(36)}`;
}

function buildKaomojiId(mood, face, existingIds) {
  const cps = meaningfulCodepoints(face);
  const hex = cps.map(c => c.toString(16)).join('').slice(0, 16) || 'x';
  let id = `gen-${slug(mood)}-${hex}`;
  if (!existingIds.has(id)) return id;
  for (let i = 0; i < 8; i++) {
    const rand = Math.random().toString(36).slice(2, 6);
    const trial = `${id}-${rand}`;
    if (!existingIds.has(trial)) return trial;
  }
  return `${id}-${Date.now().toString(36)}`;
}

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────

const DAY = new Date().getUTCDay();
const SCHEDULE = {
  0: ['symbols-core', 'emoji-combos'],
  1: ['symbols-core', 'kaomoji'],
  2: ['symbols-alpha', 'borders'],
  3: ['symbols-misc', 'emoji-combos'],
  4: ['symbols-tech', 'kaomoji'],
  5: ['symbols-alpha', 'bio-templates'],
  6: ['symbols-misc', 'borders'],
};

const SYM_CATS = {
  'symbols-core':  ['arrows','currency','math'],
  'symbols-alpha': ['greek','legal','shapes','punctuation'],
  'symbols-misc':  ['music','chess','zodiac','weather'],
  'symbols-tech':  ['technical','superscript','ui'],
};

const CAT_DESC = {
  arrows:      'creative arrow variants beyond basic ↑↓←→, include diagonal, decorative, curved, triple-line',
  currency:    'less common world currency symbols from Africa, Asia, Middle East, South America',
  math:        'mathematical operators — set theory, calculus, topology, number theory',
  greek:       'Greek alphabet — uppercase, lowercase, variant letter forms',
  legal:       'legal, copyright, trademark, certification, official symbols',
  shapes:      'geometric shapes — polygons, stars, diamonds, triangles, decorative fills',
  punctuation: 'typographic punctuation — dashes, quotation variants, special marks',
  music:       'musical notation from U+2669-266F (♩♪♫♬♭♮♯) and U+1D100-1D1FF (musical symbols block) ONLY — clefs, notes, rests, dynamics in those blocks',
  chess:       'chess pieces (U+2654-265F), card suits (U+2660-2667), dice (U+2680-2685) — ONLY symbols in those blocks',
  zodiac:      'zodiac signs (U+2648-2653), planets (U+263F-2647), moon phases (U+1F311-1F31C) ONLY',
  weather:     'weather, sky, nature, seasonal symbols (U+2600-2614, U+1F324-1F32C)',
  technical:   'keyboard, interface, computer technical symbols from U+2300-23FF Misc Technical block',
  superscript: 'superscript and subscript numbers and letters from U+2070-209F',
  ui:          'UI icons and digital interface symbols from Misc Symbols U+2615-26FF and U+1F500-1F53F',
};

const KAOMOJI_MOODS = ['happy','love','sad','angry','surprised','shy','cool','silly','waving','bear'];
const MOOD_DESC = {
  happy:     'happy, joyful, excited, celebrating',
  love:      'love, romance, affection, hearts',
  sad:       'sadness, crying, tears, heartbreak',
  angry:     'anger, frustration, rage, tantrum',
  surprised: 'shock, amazement, wide-eyed reactions',
  shy:       'shyness, blushing, embarrassment',
  cool:      'coolness, confidence, swagger, sunglasses',
  silly:     'silliness, goofiness, mischief',
  waving:    'waving, greetings, hello, goodbye',
  bear:      'animal faces — bears, cats, dogs, rabbits, foxes',
};

// ─── SATURATION STATE ─────────────────────────────────────────────────────────

const STATE_FILE = path.join(ROOT, '_generator-state.json');
const SATURATION_LIMIT  = 250;
const ZERO_RUNS_LIMIT   = 2;

function loadState() {
  if (!fs.existsSync(STATE_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveState(state) {
  if (DRY_RUN) {
    console.log('  [dry-run] would update _generator-state.json');
    return;
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

function ensureCategoryState(state, category, currentCount) {
  if (!state[category]) {
    state[category] = {
      count: currentCount,
      consecutive_zero_runs: 0,
      saturated: false,
      last_run: null,
    };
  } else {
    // Keep count in sync with reality (in case manual edits happened)
    state[category].count = currentCount;
  }
  return state[category];
}

function isSaturated(state, category) {
  const s = state[category];
  if (!s) return false;
  return !!s.saturated;
}

function updateAfterRun(state, category, addedCount, currentCount) {
  const s = state[category];
  if (!s) return;
  s.count = currentCount;
  if (addedCount === 0) {
    s.consecutive_zero_runs = (s.consecutive_zero_runs || 0) + 1;
  } else {
    s.consecutive_zero_runs = 0;
  }
  if (s.consecutive_zero_runs >= ZERO_RUNS_LIMIT || s.count >= SATURATION_LIMIT) {
    s.saturated = true;
  }
  s.last_run = new Date().toISOString();
}

// ─── INVENTORY LOADING ────────────────────────────────────────────────────────

function loadSet(filePath, field) {
  if (!fs.existsSync(filePath)) return new Set();
  const content = fs.readFileSync(filePath, 'utf8');
  return new Set([...content.matchAll(new RegExp(`\\b${field}:\\s*"([^"]+)"`, 'g'))].map(m => m[1]));
}

function loadInventory() {
  return {
    // All three symbol files included for dedupe — Agent 1 caught that the
    // bot wasn't checking extra-symbols.ts.
    symbolChars: new Set([
      ...loadSet(path.join(ROOT,'src/data/symbols.ts'), 'symbol'),
      ...loadSet(path.join(ROOT,'src/data/generated-symbols.ts'), 'symbol'),
      ...loadSet(path.join(ROOT,'src/data/extra-symbols.ts'), 'symbol'),
    ]),
    symbolIds: new Set([
      ...loadSet(path.join(ROOT,'src/data/symbols.ts'), 'id'),
      ...loadSet(path.join(ROOT,'src/data/generated-symbols.ts'), 'id'),
      ...loadSet(path.join(ROOT,'src/data/extra-symbols.ts'), 'id'),
    ]),
    kaoFaces: new Set([
      ...loadSet(path.join(ROOT,'src/data/kaomoji.ts'), 'face'),
      ...loadSet(path.join(ROOT,'src/data/generated-kaomoji.ts'), 'face'),
    ]),
    kaoIds: new Set([
      ...loadSet(path.join(ROOT,'src/data/kaomoji.ts'), 'id'),
      ...loadSet(path.join(ROOT,'src/data/generated-kaomoji.ts'), 'id'),
    ]),
    combos: new Set([
      ...loadSet(path.join(ROOT,'src/data/generated-combos.ts'), 's'),
    ]),
    borders: new Set([
      ...loadSet(path.join(ROOT,'src/data/generated-borders.ts'), 's'),
    ]),
    bios: new Set([
      ...loadSet(path.join(ROOT,'src/data/generated-bios.ts'), 'name'),
    ]),
  };
}

function countByCategory(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const counts = {};
  const re = /category:\s*"([^"]+)"/g;
  for (const m of content.matchAll(re)) {
    counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  return counts;
}

function countMoods(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const counts = {};
  const re = /mood:\s*"([^"]+)"/g;
  for (const m of content.matchAll(re)) {
    counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  return counts;
}

function getCurrentCategoryCounts() {
  const merged = {};
  const a = countByCategory(path.join(ROOT, 'src/data/symbols.ts'));
  const b = countByCategory(path.join(ROOT, 'src/data/generated-symbols.ts'));
  const c = countByCategory(path.join(ROOT, 'src/data/extra-symbols.ts'));
  for (const obj of [a, b, c]) {
    for (const [k, v] of Object.entries(obj)) merged[k] = (merged[k] || 0) + v;
  }
  return merged;
}

function getCurrentMoodCounts() {
  const merged = {};
  const a = countMoods(path.join(ROOT, 'src/data/kaomoji.ts'));
  const b = countMoods(path.join(ROOT, 'src/data/generated-kaomoji.ts'));
  for (const obj of [a, b]) {
    for (const [k, v] of Object.entries(obj)) merged[k] = (merged[k] || 0) + v;
  }
  return merged;
}

// ─── FILE WRITERS ─────────────────────────────────────────────────────────────

function appendToFile(filePath, defaultContent, newLines) {
  if (DRY_RUN) {
    console.log(`  [dry-run] would append ${newLines.length} lines to ${path.basename(filePath)}`);
    return;
  }
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath,'utf8') : defaultContent;
  fs.writeFileSync(filePath, content.replace(/\n\];\s*$/, `\n${newLines.join('\n')}\n];\n`), 'utf8');
}

function appendSymbols(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-symbols.ts'),
    '// AUTO-GENERATED by scripts/content-bot.mjs — DO NOT EDIT MANUALLY\nimport type { Symbol } from \'./symbols\';\n\nexport const generatedSymbols: Symbol[] = [\n];\n',
    items.map(s => {
      const kw = s.keywords.map(k=>`"${esc(k)}"`).join(', ');
      return `  { id: "${esc(s.id)}", symbol: "${esc(s.symbol)}", name: "${esc(s.name)}", keywords: [${kw}], category: "${esc(s.category)}", unicode: "${esc(s.unicode)}", html: "${esc(s.html)}", css: "${esc(s.css)}", description: "${esc(s.description)}" },`;
    })
  );
}

function appendKaomoji(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-kaomoji.ts'),
    '// AUTO-GENERATED by scripts/content-bot.mjs — DO NOT EDIT MANUALLY\nimport type { Kaomoji } from \'./kaomoji\';\n\nexport const generatedKaomoji: Kaomoji[] = [\n];\n',
    items.map(k => {
      const kw = k.keywords.map(w=>`"${esc(w)}"`).join(', ');
      return `  { id: "${esc(k.id)}", face: "${esc(k.face)}", name: "${esc(k.name)}", mood: "${esc(k.mood)}", keywords: [${kw}] },`;
    })
  );
}

function appendCombos(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-combos.ts'),
    '// AUTO-GENERATED — import in EmojiCombosClient.tsx\nexport const generatedCombos: { category: string; combos: { s: string; n: string }[] }[] = [\n];\n',
    items.map(cat => {
      const combos = cat.combos.map(c => `{ s: "${esc(c.s)}", n: "${esc(c.n)}" }`).join(', ');
      return `  { category: "${esc(cat.category)}", combos: [${combos}] },`;
    })
  );
}

function appendBorders(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-borders.ts'),
    '// AUTO-GENERATED — import in BordersClient.tsx\nexport const generatedBorders: { category: string; items: { s: string; n: string }[] }[] = [\n];\n',
    items.map(cat => {
      const borders = cat.items.map(b => `{ s: "${esc(b.s)}", n: "${esc(b.n)}" }`).join(', ');
      return `  { category: "${esc(cat.category)}", items: [${borders}] },`;
    })
  );
}

function appendBios(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-bios.ts'),
    '// AUTO-GENERATED — import in BioClient.tsx\nexport const generatedBios: { platform: string; bios: { name: string; text: string }[] }[] = [\n];\n',
    items.map(p => {
      const bios = p.bios.map(b => `{ name: "${esc(b.name)}", text: "${esc(b.text)}" }`).join(', ');
      return `  { platform: "${esc(p.platform)}", bios: [${bios}] },`;
    })
  );
}

// ─── FIXTURE LOADER ───────────────────────────────────────────────────────────

let _fixtureCache = null;
function loadFixture() {
  if (_fixtureCache) return _fixtureCache;
  const fp = path.join(__dirname, 'test-fixtures.json');
  _fixtureCache = JSON.parse(fs.readFileSync(fp, 'utf8'));
  return _fixtureCache;
}

// ─── GENERATORS ───────────────────────────────────────────────────────────────

async function genSymbolCandidates(category, inv) {
  if (USE_FIXTURE) {
    const fx = loadFixture();
    return fx.symbols?.[category] || [];
  }

  const existing = [...inv.symbolChars].slice(0,60).join(' ');
  const text = await ai(`Generate 20 unique Unicode symbols for "${category}": ${CAT_DESC[category]}.
Do NOT include: ${existing}
Return ONLY valid JSON array, no markdown:
[{"symbol":"⟹","name":"Long Double Right Arrow","keywords":["long","double","implies"],"unicode":"U+27F9","html":"&#10233;","css":"\\\\27F9","description":"Long double arrow used in proofs."}]`);

  return parseJSON(text);
}

/**
 * Apply the per-category classifier, dedupe against inventory, build
 * deterministic ID. Items that fail the classifier are logged with their
 * score and the reason, then dropped.
 */
function processSymbolCandidates(category, raw, inv) {
  const results = [];
  const rejects = [];
  for (const item of raw) {
    const sym = item.symbol?.trim?.() ?? '';
    if (!sym) { rejects.push({ symbol: '<empty>', reason: 'empty' }); continue; }
    if (inv.symbolChars.has(sym)) { rejects.push({ symbol: sym, reason: 'duplicate' }); continue; }
    const score = scoreSymbol(sym, category);
    if (score < 0.7) {
      rejects.push({ symbol: sym, reason: `classifier-fail (${score.toFixed(2)} < 0.70)` });
      continue;
    }
    const id = buildSymbolId(category, sym, inv.symbolIds);
    inv.symbolIds.add(id);
    inv.symbolChars.add(sym);
    results.push({
      id,
      symbol: sym,
      name: String(item.name || '').trim(),
      keywords: Array.isArray(item.keywords) ? item.keywords.slice(0,6).map(String) : [category],
      category,
      unicode: String(item.unicode || ''),
      html: String(item.html || ''),
      css: String(item.css || ''),
      description: String(item.description || ''),
    });
  }
  return { results, rejects };
}

async function genKaomojiCandidates(mood, inv) {
  if (USE_FIXTURE) {
    const fx = loadFixture();
    return fx.kaomoji?.[mood] || [];
  }

  const existing = [...inv.kaoFaces].slice(0,30).join('  ');
  const text = await ai(`Generate 15 real Japanese-style kaomoji for mood "${mood}" (${MOOD_DESC[mood]}).

GOOD kaomoji examples:
Happy: (＾▽＾) ヽ(´▽\`)/  (◕‿◕) (*^▽^*) ٩(◕‿◕｡)۶
Love: (♡ω♡) (づ｡◕‿‿◕｡)づ (っ◔◡◔)っ♥
Sad: (╥_╥) (；﹏；) (T_T) (╯︵╰,)
Angry: (ノಠ益ಠ)ノ ヽ(\`Д´)ﾉ (≧ロ≦)
Animals: ʕ•ᴥ•ʔ (=^･ω･^=) U・ᴥ・U

STRICT RULES:
1. Use face chars ONLY: ◕ ω ≧ ≦ ^ o • ᴗ ᴥ ♡ ˘ ◡ ் ᵕ
2. Structure with: ( ) ヽ ノ ╯ ╰ ┻ 彡 ♥ ﾉ づ っ
3. NEVER use emoji (no 🌸✨💖) and NO math (no √ × ÷ → ← ↑ ↓ ≈ ∞ ∑)
4. Must look like a recognisable face, 4-30 chars
5. Avoid: ${existing}

Return ONLY valid JSON array:
[{"face":"(◕ᴗ◕✿)","name":"Flower Joy","keywords":["happy","flower","cute"]}]`);

  return parseJSON(text);
}

function processKaomojiCandidates(mood, raw, inv) {
  const results = [];
  const rejects = [];
  for (const item of raw) {
    const face = item.face?.trim?.() ?? '';
    if (!face) { rejects.push({ face: '<empty>', reason: 'empty' }); continue; }
    if (inv.kaoFaces.has(face)) { rejects.push({ face, reason: 'duplicate' }); continue; }
    if (!isValidKaomoji(face)) { rejects.push({ face, reason: 'invalid-shape' }); continue; }
    const id = buildKaomojiId(mood, face, inv.kaoIds);
    inv.kaoIds.add(id);
    inv.kaoFaces.add(face);
    results.push({
      id,
      face,
      name: String(item.name || '').trim(),
      mood,
      keywords: Array.isArray(item.keywords) ? item.keywords.slice(0,5).map(String) : [mood],
    });
  }
  return { results, rejects };
}

async function genEmojiCombos(inv) {
  if (USE_FIXTURE) return []; // fixtures don't cover combos
  const existing = [...inv.combos].slice(0,40).join(' ');
  const text = await ai(`Generate 30 popular emoji combinations people use on Instagram, TikTok, Twitter, Discord.
Group them into 3 categories. Each combo is 2-5 emoji.

Existing combos to avoid: ${existing}

Categories to use (pick 3): Aesthetic & Vibes, Mood & Emotion, Dark & Edgy, Soft & Cute, Goals & Motivation, Nature & Seasons, Food & Life, Flirty & Romantic, Summer Vibes, Night Owl

Return ONLY valid JSON array:
[{"category":"Aesthetic & Vibes","combos":[{"s":"🌙✨💫","n":"Moon magic"},{"s":"🌸🍵☁️","n":"Soft morning"}]}]`);

  const cats = parseJSON(text);
  const results = [];
  for (const cat of cats) {
    if (!cat.category || !Array.isArray(cat.combos)) continue;
    const newCombos = cat.combos.filter(c => c.s && !inv.combos.has(c.s));
    if (newCombos.length === 0) continue;
    newCombos.forEach(c => inv.combos.add(c.s));
    results.push({ category: cat.category, combos: newCombos });
  }
  return results;
}

async function genBorders(inv) {
  if (USE_FIXTURE) return [];
  const existing = [...inv.borders].slice(0,30).join(' | ');
  const text = await ai(`Generate 20 unique aesthetic text borders and dividers people use in Discord bios, Instagram bios, TikTok.
Group them into 2-3 categories.

Existing borders to avoid: ${existing}

Category options: Simple Lines, Decorative Lines, Aesthetic Dividers, Corner Decorations, Sparkle Lines, Floral Borders, Star Lines, Heart Dividers

Use Unicode box-drawing, special symbols, spaces creatively. Each border is a single line (20-40 chars typically).

Return ONLY valid JSON array:
[{"category":"Sparkle Lines","items":[{"s":"✦ ─────────────── ✦","n":"Star ends"},{"s":"✧.*･ﾟ✧.*･ﾟ✧","n":"Sparkle wave"}]}]`);

  const cats = parseJSON(text);
  const results = [];
  for (const cat of cats) {
    if (!cat.category || !Array.isArray(cat.items)) continue;
    const newItems = cat.items.filter(b => b.s && !inv.borders.has(b.s));
    if (newItems.length === 0) continue;
    newItems.forEach(b => inv.borders.add(b.s));
    results.push({ category: cat.category, items: newItems });
  }
  return results;
}

async function genBios(inv) {
  if (USE_FIXTURE) return [];
  const existing = [...inv.bios].slice(0,20).join(', ');
  const text = await ai(`Generate 12 aesthetic bio templates for social media. Use Unicode symbols, dividers, and creative formatting.
Group into 3 platforms. Each bio uses [bracketed placeholders] for personal info.

Existing bio names to avoid: ${existing}

Platforms: Instagram, Discord, TikTok, Twitter / X, YouTube, Twitch

Return ONLY valid JSON array:
[{"platform":"Instagram","bios":[{"name":"Dark Aesthetic","text":"꧁ [NAME] ꧂\\n▸ born in chaos ◂\\n━━━━━━━━━━━━\\n🖤 not for the faint-hearted 🖤"},{"name":"Cottagecore","text":"🌿 [name] 🌿\\n─────────────\\n☁️ dreaming of meadows\\n🍄 soft & slow living\\n✿ [city] | [age]"}]}]

Make bios creative with symbols: ✦ ★ ━ ─ ═ ┊ ꧁ ꧂ 彡 ⊱ ⊰ 【 】 • ◦ ▸ ↳ and emoji. Use \\n for line breaks.`);

  const platforms = parseJSON(text);
  const results = [];
  for (const p of platforms) {
    if (!p.platform || !Array.isArray(p.bios)) continue;
    const newBios = p.bios.filter(b => b.name && !inv.bios.has(b.name));
    if (newBios.length === 0) continue;
    newBios.forEach(b => inv.bios.add(b.name));
    results.push({ platform: p.platform, bios: newBios });
  }
  return results;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const todayTasks = USE_FIXTURE
    ? ['symbols-misc', 'kaomoji']
    : (SCHEDULE[DAY] || ['symbols-core','kaomoji']);

  console.log('CopyChars Content Bot v4');
  console.log(`Date: ${new Date().toUTCString()}`);
  console.log(`API: ${USE_FIXTURE ? 'FIXTURE (no API)' : (GROQ_KEY ? 'Groq (primary)' : 'Gemini')}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITE'}${USE_FIXTURE ? ' + FIXTURE' : ''}`);
  console.log(`Tasks: ${todayTasks.join(', ')}`);

  // Load + initialise saturation state.
  const state = loadState();
  const catCounts = getCurrentCategoryCounts();
  const moodCounts = getCurrentMoodCounts();

  for (const cat of Object.keys(CAT_DESC)) {
    ensureCategoryState(state, cat, catCounts[cat] || 0);
  }
  for (const mood of KAOMOJI_MOODS) {
    ensureCategoryState(state, `kaomoji:${mood}`, moodCounts[mood] || 0);
  }

  // Reset-saturation flag handling
  if (RESET_SATURATION) {
    if (RESET_SATURATION_CAT) {
      const keys = [RESET_SATURATION_CAT, `kaomoji:${RESET_SATURATION_CAT}`];
      for (const k of keys) {
        if (state[k]) {
          state[k].saturated = false;
          state[k].consecutive_zero_runs = 0;
          console.log(`Reset saturation for ${k}`);
        }
      }
    } else {
      for (const k of Object.keys(state)) {
        state[k].saturated = false;
        state[k].consecutive_zero_runs = 0;
      }
      console.log('Reset saturation for ALL categories');
    }
    saveState(state);
    console.log('Done. Re-run without --reset-saturation to generate.');
    return;
  }

  const inv = loadInventory();
  console.log(`Inventory: ${inv.symbolChars.size} symbols (${inv.symbolIds.size} ids) · ${inv.kaoFaces.size} kaomoji · ${inv.combos.size} combos · ${inv.borders.size} borders · ${inv.bios.size} bios`);

  let totalNew = 0;
  let totalRejected = 0;

  for (const task of todayTasks) {
    if (!USE_FIXTURE && reqDay >= MAX_PER_DAY) { console.log('Daily limit reached'); break; }

    if (task in SYM_CATS) {
      const cats = SYM_CATS[task];
      console.log(`\nSymbols: ${cats.join(', ')}`);
      for (const cat of cats) {
        if (isSaturated(state, cat)) {
          console.log(`  ${cat.padEnd(14)} skipped (saturated, count=${state[cat].count})`);
          continue;
        }
        process.stdout.write(`  ${cat.padEnd(14)} `);
        try {
          const raw = await genSymbolCandidates(cat, inv);
          const { results, rejects } = processSymbolCandidates(cat, raw, inv);
          if (results.length) { appendSymbols(results); totalNew += results.length; }
          totalRejected += rejects.length;
          updateAfterRun(state, cat, results.length, (catCounts[cat] || 0) + results.length);
          catCounts[cat] = (catCounts[cat] || 0) + results.length;
          console.log(`+${results.length} accepted, -${rejects.length} rejected${state[cat].saturated ? ' [now saturated]' : ''}`);
          if (rejects.length) {
            for (const r of rejects.slice(0,3)) {
              console.log(`     reject: ${r.symbol} (${r.reason})`);
            }
          }
        } catch(e) { console.log(`error: ${e.message}`); }
        await sleep(DELAY_MS);
      }
    }

    if (task === 'kaomoji') {
      console.log(`\nKaomoji — all moods`);
      for (const mood of KAOMOJI_MOODS) {
        const stateKey = `kaomoji:${mood}`;
        if (isSaturated(state, stateKey)) {
          console.log(`  ${mood.padEnd(12)} skipped (saturated, count=${state[stateKey].count})`);
          continue;
        }
        process.stdout.write(`  ${mood.padEnd(12)} `);
        try {
          const raw = await genKaomojiCandidates(mood, inv);
          const { results, rejects } = processKaomojiCandidates(mood, raw, inv);
          if (results.length) { appendKaomoji(results); totalNew += results.length; }
          totalRejected += rejects.length;
          updateAfterRun(state, stateKey, results.length, (moodCounts[mood] || 0) + results.length);
          moodCounts[mood] = (moodCounts[mood] || 0) + results.length;
          console.log(`+${results.length} accepted, -${rejects.length} rejected${state[stateKey].saturated ? ' [now saturated]' : ''}`);
          if (rejects.length) {
            for (const r of rejects.slice(0,3)) {
              console.log(`     reject: ${r.face} (${r.reason})`);
            }
          }
        } catch(e) { console.log(`error: ${e.message}`); }
        await sleep(DELAY_MS);
      }
    }

    if (task === 'emoji-combos') {
      console.log(`\nEmoji Combos`);
      process.stdout.write(`  generating... `);
      try {
        const items = await genEmojiCombos(inv);
        const count = items.reduce((n,c) => n + c.combos.length, 0);
        if (count) { appendCombos(items); totalNew += count; console.log(`+${count}`); }
        else console.log('0 new');
      } catch(e) { console.log(`error: ${e.message}`); }
      await sleep(DELAY_MS);
    }

    if (task === 'borders') {
      console.log(`\nAesthetic Borders`);
      process.stdout.write(`  generating... `);
      try {
        const items = await genBorders(inv);
        const count = items.reduce((n,c) => n + c.items.length, 0);
        if (count) { appendBorders(items); totalNew += count; console.log(`+${count}`); }
        else console.log('0 new');
      } catch(e) { console.log(`error: ${e.message}`); }
      await sleep(DELAY_MS);
    }

    if (task === 'bio-templates') {
      console.log(`\nBio Templates`);
      process.stdout.write(`  generating... `);
      try {
        const items = await genBios(inv);
        const count = items.reduce((n,p) => n + p.bios.length, 0);
        if (count) { appendBios(items); totalNew += count; console.log(`+${count}`); }
        else console.log('0 new');
      } catch(e) { console.log(`error: ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  saveState(state);

  console.log(`\nDone. Added ${totalNew} new items, ${totalRejected} rejected. API calls used: ${reqDay}`);
  const saturated = Object.entries(state).filter(([_,s]) => s.saturated).map(([k]) => k);
  if (saturated.length) console.log(`Saturated: ${saturated.join(', ')}`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
