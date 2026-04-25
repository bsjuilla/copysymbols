#!/usr/bin/env node
/**
 * CopyChars Content Bot — Fixed kaomoji generation
 * Primary: Groq (14,400 req/day free) | Fallback: Gemini (1,500 req/day free)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const GROQ_API_KEY   = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GROQ_API_KEY && !GEMINI_API_KEY) {
  console.error('❌  No API keys set.');
  process.exit(1);
}

const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const MAX_PER_MINUTE = 10;
const MAX_PER_DAY    = 800;
const ITEMS_PER_CALL = 15;
const DELAY_MS       = 7000;

// ─── SCHEDULE ────────────────────────────────────────────────────────────────

const DAY = new Date().getDay();
const SCHEDULE = {
  0: { type: 'mixed',         label: 'Sunday — Mixed top-up' },
  1: { type: 'symbols-core',  label: 'Monday — Core symbols' },
  2: { type: 'kaomoji',       label: 'Tuesday — Kaomoji' },
  3: { type: 'symbols-alpha', label: 'Wednesday — Alpha symbols' },
  4: { type: 'symbols-misc',  label: 'Thursday — Misc symbols' },
  5: { type: 'kaomoji',       label: 'Friday — Kaomoji fresh batch' },
  6: { type: 'symbols-tech',  label: 'Saturday — Tech symbols' },
};

const SYMBOL_CATS = {
  'symbols-core':  ['arrows', 'currency', 'math'],
  'symbols-alpha': ['greek', 'legal', 'shapes', 'punctuation'],
  'symbols-misc':  ['music', 'chess', 'zodiac', 'weather'],
  'symbols-tech':  ['technical', 'superscript', 'ui', 'arrows', 'currency'],
  'mixed':         ['arrows', 'math', 'shapes'],
};

const KAOMOJI_MOODS = ['happy', 'love', 'sad', 'angry', 'surprised', 'shy', 'cool', 'silly', 'waving', 'bear'];

const CAT_DESCRIPTIONS = {
  arrows:      'arrow symbols — creative variants beyond basic ↑↓←→',
  currency:    'world currency symbols — less common ones',
  math:        'mathematical operators — set theory, calculus, statistics',
  greek:       'Greek alphabet letters — uppercase, lowercase, variants',
  legal:       'legal, copyright, trademark, professional symbols',
  shapes:      'geometric shapes — polygons, stars, diamonds, circles',
  punctuation: 'typographic punctuation — dashes, quotation variants',
  music:       'musical notes, clefs, rests, notation symbols',
  chess:       'chess pieces, card suits, dice, game symbols',
  zodiac:      'zodiac signs, astrological, planet symbols',
  weather:     'weather, moon phases, nature, seasonal symbols',
  technical:   'computer keyboard, interface, technical symbols',
  superscript: 'superscript and subscript numbers/letters',
  ui:          'UI icons and interface symbols',
};

// ─── KAOMOJI VALIDATION ──────────────────────────────────────────────────────
// This is the key fix — rejects garbage that isn't real kaomoji

// Characters that commonly appear in REAL kaomoji eyes/faces
const EYE_CHARS = /[◕◔ωΩ≧≦^oO●◉ᴗ_▽△▿◡◠ᵕᴥ•ᵒᵘ°˘νηπψ♥♡。・ʕʔ]/;

// Characters that should NOT dominate a kaomoji (math/arrows used as filler)
const INVALID_PATTERN = /[√÷×→←↑↓↗↘≈≠≤≥∞∑∏∫∂∇]/;

// Must contain at least one bracket/paren structure (face container)
const HAS_BRACKETS = /[\(\)\[\]｀´＾ヽノ╯╰┻━┳彡]/;

function isValidKaomoji(face) {
  if (!face || typeof face !== 'string') return false;
  const f = face.trim();

  // Length check — real kaomoji are 3-30 chars typically
  if (f.length < 3 || f.length > 40) return false;

  // Must not be dominated by math/arrow symbols (the garbage pattern)
  const invalidMatches = (f.match(/[√÷×→←↑↓≈≠∞∑]/g) || []).length;
  if (invalidMatches >= 2) return false;

  // Must contain either brackets/parens or Japanese characters (face structure)
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(f);
  const hasFaceStructure = HAS_BRACKETS.test(f) || hasJapanese;
  if (!hasFaceStructure) return false;

  // Must not be just a random string of arrows/math
  if (/^[→←↑↓⇒⇐√×÷±≤≥≈∞\s]+$/.test(f)) return false;

  return true;
}

// ─── RATE LIMITING ───────────────────────────────────────────────────────────

let reqMin = 0, reqDay = 0, minStart = Date.now();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function rateCheck() {
  const now = Date.now();
  if (now - minStart >= 60000) { reqMin = 0; minStart = now; }
  if (reqMin >= MAX_PER_MINUTE) {
    const wait = 60000 - (Date.now() - minStart) + 2000;
    console.log(`  ⏳ Rate limit — waiting ${Math.ceil(wait/1000)}s`);
    await sleep(wait);
    reqMin = 0; minStart = Date.now();
  }
}

async function callGroq(prompt) {
  await rateCheck();
  const resp = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048, temperature: 0.8,
    }),
  });
  reqMin++; reqDay++;
  if (!resp.ok) throw new Error(`Groq ${resp.status}`);
  const d = await resp.json();
  return d.choices?.[0]?.message?.content || '';
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) throw new Error('No Gemini key');
  await rateCheck();
  const resp = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 2048 } }),
  });
  reqMin++; reqDay++;
  if (!resp.ok) throw new Error(`Gemini ${resp.status}`);
  const d = await resp.json();
  return d.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callAI(prompt) {
  if (GROQ_API_KEY && reqDay < MAX_PER_DAY) {
    try { return await callGroq(prompt); } catch(e) { console.log(`  ⚠️ Groq failed, using Gemini`); }
  }
  return await callGemini(prompt);
}

function parseJsonArray(text) {
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('No JSON array in response');
  return JSON.parse(match[0]);
}

function escapeForTs(str) {
  return String(str).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'');
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

// ─── INVENTORY ───────────────────────────────────────────────────────────────

function extractFromFile(filePath, field) {
  if (!fs.existsSync(filePath)) return { ids: new Set(), chars: new Set() };
  const content = fs.readFileSync(filePath, 'utf8');
  const ids   = new Set([...content.matchAll(/\bid:\s*"([^"]+)"/g)].map(m=>m[1]));
  const chars = new Set([...content.matchAll(new RegExp(`\\b${field}:\\s*"([^"]+)"`, 'g'))].map(m=>m[1]));
  return { ids, chars };
}

function loadInventory() {
  const ms = extractFromFile(path.join(ROOT,'src/data/symbols.ts'), 'symbol');
  const gs = extractFromFile(path.join(ROOT,'src/data/generated-symbols.ts'), 'symbol');
  const mk = extractFromFile(path.join(ROOT,'src/data/kaomoji.ts'), 'face');
  const gk = extractFromFile(path.join(ROOT,'src/data/generated-kaomoji.ts'), 'face');
  return {
    symbolIds:   new Set([...ms.ids,...gs.ids]),
    symbolChars: new Set([...ms.chars,...gs.chars]),
    kaoIds:      new Set([...mk.ids,...gk.ids]),
    kaoFaces:    new Set([...mk.chars,...gk.chars]),
  };
}

// ─── WRITERS ─────────────────────────────────────────────────────────────────

function appendSymbols(items) {
  const p = path.join(ROOT,'src/data/generated-symbols.ts');
  let c = fs.existsSync(p) ? fs.readFileSync(p,'utf8')
    : `// AUTO-GENERATED — DO NOT EDIT MANUALLY\nexport const generatedSymbols = [\n];\n`;
  const lines = items.map(s => {
    const kw = s.keywords.map(k=>`"${escapeForTs(k)}"`).join(', ');
    return `  { id: "${escapeForTs(s.id)}", symbol: "${escapeForTs(s.symbol)}", name: "${escapeForTs(s.name)}", keywords: [${kw}], category: "${escapeForTs(s.category)}", unicode: "${escapeForTs(s.unicode)}", html: "${escapeForTs(s.html)}", css: "${escapeForTs(s.css)}", description: "${escapeForTs(s.description)}" },`;
  }).join('\n');
  fs.writeFileSync(p, c.replace(/\n\];\s*$/, `\n${lines}\n];\n`), 'utf8');
}

function appendKaomoji(items) {
  const p = path.join(ROOT,'src/data/generated-kaomoji.ts');
  let c = fs.existsSync(p) ? fs.readFileSync(p,'utf8')
    : `// AUTO-GENERATED — DO NOT EDIT MANUALLY\nexport const generatedKaomoji = [\n];\n`;
  const lines = items.map(k => {
    const kw = k.keywords.map(w=>`"${escapeForTs(w)}"`).join(', ');
    return `  { id: "${escapeForTs(k.id)}", face: "${escapeForTs(k.face)}", name: "${escapeForTs(k.name)}", mood: "${escapeForTs(k.mood)}", keywords: [${kw}] },`;
  }).join('\n');
  fs.writeFileSync(p, c.replace(/\n\];\s*$/, `\n${lines}\n];\n`), 'utf8');
}

// ─── GENERATORS ──────────────────────────────────────────────────────────────

async function genSymbols(category, inventory) {
  const existing = [...inventory.symbolChars].slice(0,60).join(' ');
  const prompt = `Generate ${ITEMS_PER_CALL} unique Unicode symbols for "${category}": ${CAT_DESCRIPTIONS[category]||category}.

Do NOT include: ${existing}

Return ONLY valid JSON array, no markdown:
[{"symbol":"⟹","name":"Long Double Right Arrow","keywords":["long","double","implies"],"unicode":"U+27F9","html":"&#10233;","css":"\\\\27F9","description":"Long double arrow for math proofs."}]`;

  const text = await callAI(prompt);
  const items = parseJsonArray(text);
  const results = []; const ts = Date.now();
  for (const item of items) {
    if (!item.symbol?.trim()) continue;
    const sym = item.symbol.trim();
    if (inventory.symbolChars.has(sym)) continue;
    const id = `gen-${slugify(category)}-${slugify(item.name||'sym')}-${ts}`.slice(0,80);
    results.push({ id, symbol:sym, name:String(item.name||'').trim(), keywords:Array.isArray(item.keywords)?item.keywords.slice(0,6).map(String):[category], category, unicode:String(item.unicode||''), html:String(item.html||''), css:String(item.css||''), description:String(item.description||'') });
    inventory.symbolChars.add(sym); inventory.symbolIds.add(id);
  }
  return results;
}

async function genKaomoji(mood, inventory) {
  const existing = [...inventory.kaoFaces].slice(0,30).join('  ');

  // The key fix: very explicit prompt with real examples and strict rules
  const prompt = `You are a kaomoji expert. Generate ${ITEMS_PER_CALL} real Japanese-style kaomoji text emoticons for the mood "${mood}".

WHAT KAOMOJI ARE: Text faces using brackets, eyes, and mouth characters. Examples of GOOD kaomoji:
Happy: (＾▽＾)  ヽ(´▽\`)/  (◕‿◕)  (*^▽^*)  ٩(◕‿◕｡)۶  (ﾉ◕ヮ◕)ﾉ
Love: (♡ω♡)  (づ｡◕‿‿◕｡)づ  (っ◔◡◔)っ♥  ♥(ˆ⌣ˆ)
Sad: (╥_╥)  (；﹏；)  (T_T)  (╯︵╰,)
Angry: (ノಠ益ಠ)ノ  ヽ(\`Д´)ﾉ  (≧ロ≦)
Animals: ʕ•ᴥ•ʔ  (=^･ω･^=)  U・ᴥ・U
Shy: (〃▽〃)  (*/ω＼*)

STRICT RULES — your kaomoji MUST follow these:
1. Use ONLY face characters: eyes like ◕ ω ≧ ≦ ^ o • ᴗ ᴥ ♡ ் ˘ ◡
2. Use ONLY structural chars: ( ) ヽ ノ ╯ ╰ ┻ 彡 ♥ ﾉ づ っ
3. NEVER use math symbols as face parts: NO √ × ÷ → ← ↑ ↓ ≈ ∞ ∑
4. NEVER use random symbol chains like (~•••→√√) — that is WRONG
5. Each kaomoji must look like a recognisable face or character
6. Keep length between 4-25 characters

EXISTING kaomoji to avoid repeating: ${existing}

Return ONLY valid JSON array:
[{"face":"(◕ᴗ◕✿)","name":"Flower Joy","keywords":["happy","flower","cute"]}]`;

  const text = await callAI(prompt);
  const items = parseJsonArray(text);
  const results = [];
  let rejected = 0;

  for (const item of items) {
    if (!item.face?.trim()) continue;
    const face = item.face.trim();
    if (inventory.kaoFaces.has(face)) continue;

    // THE KEY FIX: validate before accepting
    if (!isValidKaomoji(face)) {
      rejected++;
      console.log(`    ❌ Rejected invalid: ${face}`);
      continue;
    }

    const id = `gen-${mood}-${Math.random().toString(36).slice(2,8)}`;
    results.push({ id, face, name:String(item.name||'').trim(), mood, keywords:Array.isArray(item.keywords)?item.keywords.slice(0,5).map(String):[mood] });
    inventory.kaoFaces.add(face); inventory.kaoIds.add(id);
  }

  if (rejected > 0) console.log(`    ⚠️  ${rejected} invalid kaomoji rejected`);
  return results;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const schedule = SCHEDULE[DAY];
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   CopyChars Content Bot (Fixed) 🤖       ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`📅  ${new Date().toUTCString()}`);
  console.log(`📋  ${schedule.label}`);
  console.log(`🔌  API: ${GROQ_API_KEY ? 'Groq (primary)' : 'Gemini'}`);

  const inventory = loadInventory();
  console.log(`📊  Inventory: ${inventory.symbolChars.size} symbols · ${inventory.kaoFaces.size} kaomoji\n`);

  const type = schedule.type;
  let totalNew = 0;

  const symbolCats = SYMBOL_CATS[type] || [];
  if (symbolCats.length > 0) {
    console.log(`🔣  Symbols: ${symbolCats.join(', ')}`);
    for (const cat of symbolCats) {
      if (reqDay >= MAX_PER_DAY) break;
      process.stdout.write(`  → ${cat.padEnd(14)} `);
      try {
        const items = await genSymbols(cat, inventory);
        if (items.length > 0) { appendSymbols(items); totalNew += items.length; console.log(`✅ +${items.length}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  const doKaomoji = type === 'kaomoji' || type === 'mixed';
  if (doKaomoji) {
    const moods = type === 'mixed' ? KAOMOJI_MOODS.slice(0,4) : KAOMOJI_MOODS;
    console.log(`\n😊  Kaomoji moods: ${moods.join(', ')}`);
    for (const mood of moods) {
      if (reqDay >= MAX_PER_DAY) break;
      process.stdout.write(`  → ${mood.padEnd(12)} `);
      try {
        const items = await genKaomoji(mood, inventory);
        if (items.length > 0) { appendKaomoji(items); totalNew += items.length; console.log(`✅ +${items.length} valid`); }
        else console.log('⚪ 0 valid');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n✅  Done! Added ${totalNew} items. API calls: ${reqDay}`);
}

main().catch(err => { console.error('💥', err.message); process.exit(1); });
