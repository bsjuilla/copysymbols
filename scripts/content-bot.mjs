#!/usr/bin/env node
/**
 * CopyChars Content Bot v2
 * Primary API: Groq (free tier — 14,400 req/day, 30 req/min, no credit card)
 * Fallback API: Gemini Flash (free tier — 1,500 req/day, 15 req/min)
 * Combined daily capacity: ~15,900 requests
 *
 * Runs 3x per day via GitHub Actions (7am, 1pm, 7pm UTC)
 * Each run focuses on a different content type based on hour
 *
 * Schedule per run:
 *   07:00 UTC → Symbols (all categories, rotating by day)
 *   13:00 UTC → Kaomoji (all moods)
 *   19:00 UTC → Mixed: emoji combos + borders + text art
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── CONFIG ─────────────────────────────────────────────────────────────────

const GROQ_API_KEY   = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GROQ_API_KEY && !GEMINI_API_KEY) {
  console.error('❌  No API keys set. Add GROQ_API_KEY or GEMINI_API_KEY as GitHub Actions secrets.');
  process.exit(1);
}

const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Conservative limits well below actual maximums
const GROQ_MAX_PER_MIN   = 25;   // Groq allows 30
const GROQ_MAX_PER_DAY   = 1200; // Groq allows 14,400 (keeping conservative per run)
const GEMINI_MAX_PER_MIN = 10;   // Gemini allows 15
const GEMINI_MAX_PER_DAY = 400;  // Gemini allows 1,500 (saving some for fallback)
const ITEMS_PER_CALL     = 25;   // Up from 15 — more content per request
const DELAY_MS           = 3000; // 3s between calls (safe for both APIs)

// ─── SCHEDULE ────────────────────────────────────────────────────────────────

const HOUR = new Date().getUTCHours();
const DAY  = new Date().getUTCDay(); // 0=Sun

// Which symbol categories to focus on per day
const DAY_SYMBOL_CATS = {
  0: ['arrows', 'math', 'shapes'],                     // Sun
  1: ['arrows', 'currency', 'math'],                   // Mon
  2: ['greek', 'legal', 'shapes', 'punctuation'],      // Tue
  3: ['music', 'chess', 'zodiac', 'weather'],          // Wed
  4: ['technical', 'superscript', 'ui'],               // Thu
  5: ['arrows', 'currency', 'greek', 'math'],          // Fri
  6: ['shapes', 'legal', 'punctuation', 'weather'],    // Sat
};

// Which run type based on UTC hour
function getRunType() {
  if (HOUR >= 5  && HOUR < 11)  return 'symbols';
  if (HOUR >= 11 && HOUR < 17)  return 'kaomoji';
  return 'misc'; // evening run
}

const KAOMOJI_MOODS = ['happy', 'love', 'sad', 'angry', 'surprised', 'shy', 'cool', 'silly', 'waving', 'bear'];

const CAT_DESCRIPTIONS = {
  arrows:      'arrow symbols — creative variants beyond basic ↑↓←→, include diagonal, decorative, curved, double-line arrows',
  currency:    'world currency symbols — less common ones from Africa, Asia, Middle East, Latin America',
  math:        'mathematical operators — set theory, calculus, statistics, number theory, topology',
  greek:       'Greek alphabet letters — uppercase, lowercase, variant forms, letter-like math symbols',
  legal:       'legal, copyright, trademark, professional, and official certification symbols',
  shapes:      'geometric shapes — polygons, stars, diamonds, triangles, circles, decorative fills',
  punctuation: 'typographic punctuation — dashes, quotation variants, brackets, special marks',
  music:       'musical notation — notes, clefs, rests, dynamics, instrument symbols',
  chess:       'chess pieces, card suits, dice, game symbols',
  zodiac:      'zodiac signs, astrological symbols, planet symbols, moon phases',
  weather:     'weather, moon phases, nature, seasonal, and sky symbols',
  technical:   'computer keyboard, interface, and technical symbols',
  superscript: 'superscript and subscript numbers and letters',
  ui:          'UI icons and interface symbols used in digital products',
};

const MOOD_DESCRIPTIONS = {
  happy:     'happy, joyful, excited, cheering, celebrating — creative new variations',
  love:      'love, romance, affection, hearts, kisses — beyond the common ones',
  sad:       'sadness, crying, tears, heartbreak, upset — nuanced expressions',
  angry:     'anger, frustration, rage, annoyance — expressive variations',
  surprised: 'shock, surprise, amazement, wide-eyed reactions',
  shy:       'shyness, blushing, embarrassment, hiding face',
  cool:      'coolness, confidence, swagger, sunglasses, flexing',
  silly:     'silliness, goofiness, mischief, playfulness',
  waving:    'waving, greetings, hello, goodbye, cheering',
  bear:      'animal faces: bears, cats, dogs, rabbits, pandas, foxes, wolves',
};

// ─── RATE LIMITING ───────────────────────────────────────────────────────────

let groqReqMin = 0, groqReqDay = 0, groqMinStart = Date.now();
let gemReqMin = 0,  gemReqDay = 0,  gemMinStart = Date.now();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkRateLimit(type) {
  const now = Date.now();
  if (type === 'groq') {
    if (now - groqMinStart >= 60000) { groqReqMin = 0; groqMinStart = now; }
    if (groqReqMin >= GROQ_MAX_PER_MIN) {
      const wait = 60000 - (now - groqMinStart) + 1000;
      console.log(`  ⏳ Groq rate limit — waiting ${Math.ceil(wait/1000)}s`);
      await sleep(wait);
      groqReqMin = 0; groqMinStart = Date.now();
    }
  } else {
    if (now - gemMinStart >= 60000) { gemReqMin = 0; gemMinStart = now; }
    if (gemReqMin >= GEMINI_MAX_PER_MIN) {
      const wait = 60000 - (now - gemMinStart) + 1000;
      console.log(`  ⏳ Gemini rate limit — waiting ${Math.ceil(wait/1000)}s`);
      await sleep(wait);
      gemReqMin = 0; gemMinStart = Date.now();
    }
  }
}

async function callGroq(prompt) {
  if (groqReqDay >= GROQ_MAX_PER_DAY) throw new Error('Groq daily limit reached');
  await checkRateLimit('groq');
  const resp = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
      temperature: 0.85,
    }),
  });
  groqReqMin++; groqReqDay++;
  if (!resp.ok) throw new Error(`Groq ${resp.status}: ${(await resp.text()).slice(0,200)}`);
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) throw new Error('No Gemini key');
  if (gemReqDay >= GEMINI_MAX_PER_DAY) throw new Error('Gemini daily limit reached');
  await checkRateLimit('gemini');
  const resp = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.85, maxOutputTokens: 2048 },
    }),
  });
  gemReqMin++; gemReqDay++;
  if (!resp.ok) throw new Error(`Gemini ${resp.status}: ${(await resp.text()).slice(0,200)}`);
  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Smart caller: tries Groq first, falls back to Gemini
async function callAI(prompt) {
  if (GROQ_API_KEY && groqReqDay < GROQ_MAX_PER_DAY) {
    try { return await callGroq(prompt); } catch(e) {
      console.log(`  ⚠️  Groq failed (${e.message}), trying Gemini...`);
    }
  }
  if (GEMINI_API_KEY && gemReqDay < GEMINI_MAX_PER_DAY) {
    return await callGemini(prompt);
  }
  throw new Error('All APIs exhausted or unavailable');
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
    symbolIds:   new Set([...ms.ids,   ...gs.ids]),
    symbolChars: new Set([...ms.chars, ...gs.chars]),
    kaoIds:      new Set([...mk.ids,   ...gk.ids]),
    kaoFaces:    new Set([...mk.chars, ...gk.chars]),
  };
}

// ─── WRITERS ─────────────────────────────────────────────────────────────────

function appendSymbols(items) {
  const p = path.join(ROOT,'src/data/generated-symbols.ts');
  let c = fs.existsSync(p) ? fs.readFileSync(p,'utf8')
    : '// AUTO-GENERATED — DO NOT EDIT MANUALLY\nimport type { Symbol } from \'./symbols\';\n\nexport const generatedSymbols: Symbol[] = [\n];\n';
  const lines = items.map(s => {
    const kw = s.keywords.map(k=>`"${escapeForTs(k)}"`).join(', ');
    return `  { id: "${escapeForTs(s.id)}", symbol: "${escapeForTs(s.symbol)}", name: "${escapeForTs(s.name)}", keywords: [${kw}], category: "${escapeForTs(s.category)}", unicode: "${escapeForTs(s.unicode)}", html: "${escapeForTs(s.html)}", css: "${escapeForTs(s.css)}", description: "${escapeForTs(s.description)}" },`;
  }).join('\n');
  fs.writeFileSync(p, c.replace(/\n\];\s*$/, `\n${lines}\n];\n`), 'utf8');
}

function appendKaomoji(items) {
  const p = path.join(ROOT,'src/data/generated-kaomoji.ts');
  let c = fs.existsSync(p) ? fs.readFileSync(p,'utf8')
    : '// AUTO-GENERATED — DO NOT EDIT MANUALLY\nimport type { Kaomoji } from \'./kaomoji\';\n\nexport const generatedKaomoji: Kaomoji[] = [\n];\n';
  const lines = items.map(k => {
    const kw = k.keywords.map(w=>`"${escapeForTs(w)}"`).join(', ');
    return `  { id: "${escapeForTs(k.id)}", face: "${escapeForTs(k.face)}", name: "${escapeForTs(k.name)}", mood: "${escapeForTs(k.mood)}", keywords: [${kw}] },`;
  }).join('\n');
  fs.writeFileSync(p, c.replace(/\n\];\s*$/, `\n${lines}\n];\n`), 'utf8');
}

// ─── GENERATORS ──────────────────────────────────────────────────────────────

async function genSymbols(category, inventory) {
  const existing = [...inventory.symbolChars].slice(0,80).join(' ');
  const desc = CAT_DESCRIPTIONS[category] || category;
  const prompt = `Generate ${ITEMS_PER_CALL} unique Unicode symbols for the "${category}" category: ${desc}.

Do NOT include any of these existing symbols: ${existing}

Return ONLY a valid JSON array, no markdown, no explanation:
[{"symbol":"⟹","name":"Long Double Right Arrow","keywords":["long","double","implies"],"unicode":"U+27F9","html":"&#10233;","css":"\\\\27F9","description":"Long double arrow used in mathematical proofs."}]

Rules: symbol=real Unicode char, name=2-5 words title case, keywords=3-6 lowercase terms, unicode=U+XXXX, html=&name; or &#N;, css=\\\\XXXX, description=1 sentence. No id field.`;

  const text = await callAI(prompt);
  const items = parseJsonArray(text);
  const results = [];
  const ts = Date.now();
  for (const item of items) {
    if (!item.symbol?.trim()) continue;
    const sym = item.symbol.trim();
    if (inventory.symbolChars.has(sym)) continue;
    const id = `gen-${slugify(category)}-${slugify(item.name||'sym')}-${ts}`.slice(0,80);
    if (inventory.symbolIds.has(id)) continue;
    const entry = {
      id, symbol: sym,
      name:        String(item.name||'').trim(),
      keywords:    Array.isArray(item.keywords) ? item.keywords.slice(0,6).map(String) : [category],
      category,
      unicode:     String(item.unicode||'').trim(),
      html:        String(item.html||'').trim(),
      css:         String(item.css||'').trim(),
      description: String(item.description||'').trim(),
    };
    results.push(entry);
    inventory.symbolChars.add(sym);
    inventory.symbolIds.add(id);
  }
  return results;
}

async function genKaomoji(mood, inventory) {
  const existing = [...inventory.kaoFaces].slice(0,50).join('  ');
  const desc = MOOD_DESCRIPTIONS[mood] || mood;
  const prompt = `Generate ${ITEMS_PER_CALL} unique kaomoji for the mood "${mood}" (${desc}).

Do NOT include any of these: ${existing}

Return ONLY a valid JSON array, no markdown:
[{"face":"(◕ᴗ◕✿)","name":"Flower Joy","keywords":["happy","flower","cute"]}]

Rules: face=creative Unicode/Japanese kaomoji genuinely different from existing ones, name=2-3 expressive words, keywords=3-5 lowercase emotion words. No id or mood fields.`;

  const text = await callAI(prompt);
  const items = parseJsonArray(text);
  const results = [];
  for (const item of items) {
    if (!item.face?.trim()) continue;
    const face = item.face.trim();
    if (inventory.kaoFaces.has(face)) continue;
    const id = `gen-${mood}-${Math.random().toString(36).slice(2,8)}`;
    const entry = {
      id, face,
      name:     String(item.name||'').trim(),
      mood,
      keywords: Array.isArray(item.keywords) ? item.keywords.slice(0,5).map(String) : [mood],
    };
    results.push(entry);
    inventory.kaoFaces.add(face);
    inventory.kaoIds.add(id);
  }
  return results;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const runType = getRunType();
  const apiUsing = GROQ_API_KEY ? 'Groq (primary)' : 'Gemini (fallback)';

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   CopyChars Content Bot v2 🤖            ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`📅  ${new Date().toUTCString()}`);
  console.log(`🔌  API: ${apiUsing}`);
  console.log(`📋  Run type: ${runType} (hour: ${HOUR} UTC)`);

  const inventory = loadInventory();
  console.log(`📊  Inventory: ${inventory.symbolChars.size} symbols · ${inventory.kaoFaces.size} kaomoji\n`);

  let totalNew = 0;

  if (runType === 'symbols') {
    const cats = DAY_SYMBOL_CATS[DAY] || ['arrows','math','shapes'];
    console.log(`🔣  Generating symbols: ${cats.join(', ')}`);
    for (const cat of cats) {
      process.stdout.write(`  → ${cat.padEnd(14)} `);
      try {
        const items = await genSymbols(cat, inventory);
        if (items.length > 0) { appendSymbols(items); totalNew += items.length; console.log(`✅ +${items.length}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  if (runType === 'kaomoji') {
    console.log(`😊  Generating kaomoji: all moods`);
    for (const mood of KAOMOJI_MOODS) {
      process.stdout.write(`  → ${mood.padEnd(12)} `);
      try {
        const items = await genKaomoji(mood, inventory);
        if (items.length > 0) { appendKaomoji(items); totalNew += items.length; console.log(`✅ +${items.length}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  if (runType === 'misc') {
    // Evening run: do extra symbols from less-covered categories
    const extraCats = ['shapes','weather','music','zodiac','chess','legal'];
    console.log(`🌙  Evening run — extra symbols: ${extraCats.join(', ')}`);
    for (const cat of extraCats) {
      process.stdout.write(`  → ${cat.padEnd(14)} `);
      try {
        const items = await genSymbols(cat, inventory);
        if (items.length > 0) { appendSymbols(items); totalNew += items.length; console.log(`✅ +${items.length}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  console.log('\n══════════════════════════════════════════');
  console.log(`✅  Done! Added ${totalNew} new items this run.`);
  console.log(`🔌  Groq used: ${groqReqDay} req · Gemini used: ${gemReqDay} req`);
  console.log(`📊  New totals: ${inventory.symbolChars.size} symbols · ${inventory.kaoFaces.size} kaomoji`);
  console.log('══════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('\n💥 Fatal:', err.message);
  process.exit(1);
});
