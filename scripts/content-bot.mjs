#!/usr/bin/env node
/**
 * CopyChars Content Bot
 * Uses Gemini 1.5 Flash (free tier — no credit card needed)
 * Limits: max 1000 req/day, max 10 req/min (actual Gemini free limit is 1500/day, 15/min)
 *
 * Schedule (day of week):
 *   Monday    → Symbols: arrows, currency, math
 *   Tuesday   → Kaomoji: all moods
 *   Wednesday → Symbols: greek, legal, shapes, punctuation
 *   Thursday  → Symbols: music, chess, zodiac, weather
 *   Friday    → Kaomoji: all moods (fresh batch)
 *   Saturday  → Symbols: technical, superscript, ui + extra arrows/currency
 *   Sunday    → Mixed: symbols + kaomoji top-up
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── CONFIG ─────────────────────────────────────────────────────────────────

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('❌  GEMINI_API_KEY is not set. Add it as a GitHub Actions secret.');
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const MAX_PER_MINUTE = 10;   // our limit (Gemini allows 15)
const MAX_PER_DAY    = 1000; // our limit (Gemini allows 1500)
const ITEMS_PER_CALL = 15;   // how many items to request per API call
const DELAY_MS       = 7000; // 7 seconds between calls → max ~8/min safely

// ─── SCHEDULE ────────────────────────────────────────────────────────────────

// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const SCHEDULE = {
  0: { type: 'mixed',         label: 'Sunday — Mixed top-up' },
  1: { type: 'symbols-core',  label: 'Monday — Core symbols (arrows, currency, math)' },
  2: { type: 'kaomoji',       label: 'Tuesday — Kaomoji all moods' },
  3: { type: 'symbols-alpha', label: 'Wednesday — Symbols (greek, legal, shapes, punctuation)' },
  4: { type: 'symbols-misc',  label: 'Thursday — Symbols (music, chess, zodiac, weather)' },
  5: { type: 'kaomoji',       label: 'Friday — Kaomoji fresh batch' },
  6: { type: 'symbols-tech',  label: 'Saturday — Symbols (technical, superscript, ui)' },
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
  arrows:      'arrow symbols in various directions, styles, and weights (not basic ↑↓←→ — more creative variants)',
  currency:    'currency symbols from world currencies (less common ones like ₺ ₩ ₫ ₭ ₲ ₮ ₴ ₵ ₸ etc.)',
  math:        'mathematical operators, relations, and symbols (set theory, logic, calculus, statistics)',
  greek:       'Greek alphabet letters — both uppercase and lowercase variants, letter-like forms',
  legal:       'legal, copyright, trademark, and professional symbols',
  shapes:      'geometric shapes, polygons, stars, diamonds, decorative symbols',
  punctuation: 'typographic punctuation marks, dashes, quotation variants, special punctuation',
  music:       'musical notes, clefs, rests, and music notation symbols',
  chess:       'chess piece symbols and card/game symbols',
  zodiac:      'zodiac signs, astrological symbols, planet symbols',
  weather:     'weather symbols, moon phases, nature and seasonal symbols',
  technical:   'technical, computer keyboard, and interface symbols',
  superscript: 'superscript numbers/letters and subscript numbers/letters',
  ui:          'UI icons and interface symbols used in digital products',
};

const MOOD_DESCRIPTIONS = {
  happy:     'happy, joyful, excited, cheering, celebrating',
  love:      'love, romance, affection, hearts, kisses',
  sad:       'sadness, crying, tears, heartbreak, upset',
  angry:     'anger, frustration, rage, annoyance, table flipping',
  surprised: 'shock, surprise, amazement, wide-eyed, jaw-drop',
  shy:       'shyness, blushing, embarrassment, hiding face',
  cool:      'coolness, confidence, swag, sunglasses, flex',
  silly:     'silliness, goofiness, mischief, playfulness',
  waving:    'waving, greetings, hello, goodbye, cheering',
  bear:      'animal faces: bears, cats, dogs, rabbits, pandas, foxes',
};

// ─── RATE LIMITING ───────────────────────────────────────────────────────────

let requestsThisMinute = 0;
let requestsToday      = 0;
let minuteWindowStart  = Date.now();

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGemini(prompt) {
  if (requestsToday >= MAX_PER_DAY) {
    throw new Error('Daily API limit reached');
  }

  const now = Date.now();
  if (now - minuteWindowStart >= 60_000) {
    requestsThisMinute = 0;
    minuteWindowStart = now;
  }

  if (requestsThisMinute >= MAX_PER_MINUTE) {
    const waitMs = 60_000 - (Date.now() - minuteWindowStart) + 2000;
    console.log(`  ⏳ Rate limit — waiting ${Math.ceil(waitMs / 1000)}s...`);
    await sleep(waitMs);
    requestsThisMinute = 0;
    minuteWindowStart = Date.now();
  }

  const resp = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
    }),
  });

  requestsThisMinute++;
  requestsToday++;

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini API ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function parseJsonArray(text) {
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('No JSON array found in response');
  return JSON.parse(match[0]);
}

function escapeForTs(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── READ EXISTING INVENTORY ─────────────────────────────────────────────────

function extractFromFile(filePath, symbolField) {
  if (!fs.existsSync(filePath)) return { ids: new Set(), chars: new Set() };
  const content = fs.readFileSync(filePath, 'utf8');
  const ids   = new Set([...content.matchAll(/\bid:\s*"([^"]+)"/g)].map(m => m[1]));
  const chars = new Set([...content.matchAll(new RegExp(`\\b${symbolField}:\\s*"([^"]+)"`, 'g'))].map(m => m[1]));
  return { ids, chars };
}

function loadInventory() {
  const mainSym  = extractFromFile(path.join(ROOT, 'src/data/symbols.ts'), 'symbol');
  const genSym   = extractFromFile(path.join(ROOT, 'src/data/generated-symbols.ts'), 'symbol');
  const mainKao  = extractFromFile(path.join(ROOT, 'src/data/kaomoji.ts'), 'face');
  const genKao   = extractFromFile(path.join(ROOT, 'src/data/generated-kaomoji.ts'), 'face');

  return {
    symbolIds:   new Set([...mainSym.ids, ...genSym.ids]),
    symbolChars: new Set([...mainSym.chars, ...genSym.chars]),
    kaoIds:      new Set([...mainKao.ids, ...genKao.ids]),
    kaoFaces:    new Set([...mainKao.chars, ...genKao.chars]),
  };
}

// ─── WRITE GENERATED FILES ───────────────────────────────────────────────────

function appendToGeneratedSymbols(items) {
  const filePath = path.join(ROOT, 'src/data/generated-symbols.ts');
  let content = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : `// AUTO-GENERATED by scripts/content-bot.mjs — DO NOT EDIT MANUALLY\n// New entries are appended each day by the GitHub Actions bot.\n\nexport const generatedSymbols = [\n];\n`;

  const lines = items.map(s => {
    const keywords = s.keywords.map(k => `"${escapeForTs(k)}"`).join(', ');
    const shortcut = s.shortcut
      ? `, shortcut: { ${s.shortcut.windows ? `windows: "${escapeForTs(s.shortcut.windows)}"` : ''} }`
      : '';
    return `  { id: "${escapeForTs(s.id)}", symbol: "${escapeForTs(s.symbol)}", name: "${escapeForTs(s.name)}", keywords: [${keywords}], category: "${escapeForTs(s.category)}", unicode: "${escapeForTs(s.unicode)}", html: "${escapeForTs(s.html)}", css: "${escapeForTs(s.css)}", description: "${escapeForTs(s.description)}"${shortcut} },`;
  }).join('\n');

  const updated = content.replace(/\n\];\s*$/, `\n${lines}\n];\n`);
  fs.writeFileSync(filePath, updated, 'utf8');
}

function appendToGeneratedKaomoji(items) {
  const filePath = path.join(ROOT, 'src/data/generated-kaomoji.ts');
  let content = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : `// AUTO-GENERATED by scripts/content-bot.mjs — DO NOT EDIT MANUALLY\n// New entries are appended each day by the GitHub Actions bot.\n\nexport const generatedKaomoji = [\n];\n`;

  const lines = items.map(k => {
    const keywords = k.keywords.map(w => `"${escapeForTs(w)}"`).join(', ');
    return `  { id: "${escapeForTs(k.id)}", face: "${escapeForTs(k.face)}", name: "${escapeForTs(k.name)}", mood: "${escapeForTs(k.mood)}", keywords: [${keywords}] },`;
  }).join('\n');

  const updated = content.replace(/\n\];\s*$/, `\n${lines}\n];\n`);
  fs.writeFileSync(filePath, updated, 'utf8');
}

// ─── GENERATORS ──────────────────────────────────────────────────────────────

async function generateSymbolsForCategory(category, inventory) {
  const existing = [...inventory.symbolChars].slice(0, 60).join(' ');
  const desc = CAT_DESCRIPTIONS[category] || category;

  const prompt = `Generate ${ITEMS_PER_CALL} unique Unicode symbols for the "${category}" category: ${desc}.

EXISTING symbols to AVOID (do not repeat these): ${existing}

Return ONLY a valid JSON array — no markdown, no explanation, no code fences:
[
  {
    "symbol": "⟹",
    "name": "Long Double Right Arrow",
    "keywords": ["long", "double", "right", "implies", "arrow"],
    "unicode": "U+27F9",
    "html": "&#10233;",
    "css": "\\\\27F9",
    "description": "A long double-headed right arrow used in mathematical proofs."
  }
]

Rules:
- symbol: real Unicode character only, not an emoji sequence
- name: 2-5 word descriptive name in title case
- keywords: 3-6 relevant terms (lowercase)
- unicode: format U+XXXX (hex)
- html: format &name; or &#NNNNN;
- css: format \\\\XXXX (escaped backslash + 4 hex digits)
- description: 1-2 sentences explaining the symbol's use
- category is fixed as: "${category}" — do not include it in output
- Do not include "id" — it will be generated automatically`;

  const text = await callGemini(prompt);
  const items = parseJsonArray(text);
  const results = [];
  const ts = Date.now();

  for (const item of items) {
    if (!item.symbol || !item.name) continue;
    const sym = item.symbol.trim();
    if (!sym || sym.length === 0) continue;
    if (inventory.symbolChars.has(sym)) continue; // deduplicate

    const id = `gen-${slugify(category)}-${slugify(item.name)}-${ts}`.slice(0, 80);
    if (inventory.symbolIds.has(id)) continue;

    const entry = {
      id,
      symbol:      sym,
      name:        String(item.name).trim(),
      keywords:    Array.isArray(item.keywords) ? item.keywords.slice(0, 6).map(String) : [item.name.toLowerCase()],
      category,
      unicode:     String(item.unicode || '').trim(),
      html:        String(item.html || '').trim(),
      css:         String(item.css || '').trim(),
      description: String(item.description || '').trim(),
    };

    results.push(entry);
    inventory.symbolChars.add(sym);
    inventory.symbolIds.add(id);
  }

  return results;
}

async function generateKaomojiForMood(mood, inventory) {
  const existing = [...inventory.kaoFaces].slice(0, 40).join('  ');
  const desc = MOOD_DESCRIPTIONS[mood] || mood;

  const prompt = `Generate ${ITEMS_PER_CALL} unique Japanese kaomoji text emoticons for the mood "${mood}" (${desc}).

EXISTING kaomoji to AVOID (do not repeat these): ${existing}

Return ONLY a valid JSON array — no markdown, no explanation:
[
  {
    "face": "(◕ᴗ◕✿)",
    "name": "Flower Joy",
    "keywords": ["happy", "flower", "cute", "joyful"]
  }
]

Rules:
- face: creative kaomoji using Unicode/Japanese characters, different from existing ones
- name: 2-3 word expressive name
- keywords: 3-5 emotion/style words (lowercase)
- mood is fixed as: "${mood}" — do not include it in output
- Do not include "id" — auto-generated
- Make them genuinely different from the existing list`;

  const text = await callGemini(prompt);
  const items = parseJsonArray(text);
  const results = [];

  for (const item of items) {
    if (!item.face || !item.name) continue;
    const face = item.face.trim();
    if (!face) continue;
    if (inventory.kaoFaces.has(face)) continue;

    const id = `gen-${mood}-${Math.random().toString(36).slice(2, 8)}`;

    const entry = {
      id,
      face,
      name:     String(item.name).trim(),
      mood,
      keywords: Array.isArray(item.keywords) ? item.keywords.slice(0, 6).map(String) : [mood],
    };

    results.push(entry);
    inventory.kaoFaces.add(face);
    inventory.kaoIds.add(id);
  }

  return results;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const day      = new Date().getDay();
  const schedule = SCHEDULE[day];

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║     CopyChars Content Bot 🤖             ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`📅  ${new Date().toUTCString()}`);
  console.log(`📋  ${schedule.label}`);
  console.log(`⏱️   Limits: ${MAX_PER_MINUTE}/min · ${MAX_PER_DAY}/day\n`);

  const inventory = loadInventory();
  console.log(`📊  Current inventory: ${inventory.symbolChars.size} symbols · ${inventory.kaoFaces.size} kaomoji\n`);

  const type      = schedule.type;
  let totalNew    = 0;
  let totalCalls  = 0;

  // ── SYMBOLS ────────────────────────────────────────────────────────────────
  const symbolCats = SYMBOL_CATS[type] || [];
  if (symbolCats.length > 0) {
    console.log(`🔣  Generating symbols for: ${symbolCats.join(', ')}`);
    for (const cat of symbolCats) {
      if (requestsToday >= MAX_PER_DAY) { console.log('  ⚠️  Daily limit reached, stopping.'); break; }
      process.stdout.write(`  → ${cat.padEnd(14)} `);
      try {
        const items = await generateSymbolsForCategory(cat, inventory);
        if (items.length > 0) {
          appendToGeneratedSymbols(items);
          totalNew += items.length;
          console.log(`✅ +${items.length} new`);
        } else {
          console.log('⚪ 0 new (all duplicates)');
        }
        totalCalls++;
      } catch (e) {
        console.log(`❌ Error: ${e.message}`);
      }
      await sleep(DELAY_MS);
    }
  }

  // ── KAOMOJI ────────────────────────────────────────────────────────────────
  const doKaomoji = type === 'kaomoji' || type === 'mixed';
  if (doKaomoji) {
    const moods = type === 'mixed' ? KAOMOJI_MOODS.slice(0, 4) : KAOMOJI_MOODS;
    console.log(`\n😊  Generating kaomoji for moods: ${moods.join(', ')}`);
    for (const mood of moods) {
      if (requestsToday >= MAX_PER_DAY) { console.log('  ⚠️  Daily limit reached, stopping.'); break; }
      process.stdout.write(`  → ${mood.padEnd(12)} `);
      try {
        const items = await generateKaomojiForMood(mood, inventory);
        if (items.length > 0) {
          appendToGeneratedKaomoji(items);
          totalNew += items.length;
          console.log(`✅ +${items.length} new`);
        } else {
          console.log('⚪ 0 new (all duplicates)');
        }
        totalCalls++;
      } catch (e) {
        console.log(`❌ Error: ${e.message}`);
      }
      await sleep(DELAY_MS);
    }
  }

  console.log('\n══════════════════════════════════════════');
  console.log(`✅  Done! Added ${totalNew} new items across ${totalCalls} API calls.`);
  console.log(`📊  API usage today: ${requestsToday} / ${MAX_PER_DAY}`);
  console.log(`📦  New inventory: ${inventory.symbolChars.size} symbols · ${inventory.kaoFaces.size} kaomoji`);
  console.log('══════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err.message);
  process.exit(1);
});
