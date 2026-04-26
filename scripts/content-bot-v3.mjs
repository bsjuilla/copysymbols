#!/usr/bin/env node
/**
 * CopyChars Content Bot v3
 * Generates: Symbols, Kaomoji, Emoji Combos, Aesthetic Borders, Bio Templates
 * Primary API: Groq (free, 14,400 req/day)
 * Fallback: Gemini Flash (free, 1,500 req/day)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── API CONFIG ───────────────────────────────────────────────────────────────

const GROQ_KEY   = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!GROQ_KEY && !GEMINI_KEY) {
  console.error('❌  No API keys. Add GROQ_API_KEY or GEMINI_API_KEY to GitHub Secrets.');
  process.exit(1);
}

const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

const MAX_PER_MIN = 10;
const MAX_PER_DAY = 900;
const DELAY_MS    = 7000;

let reqMin = 0, reqDay = 0, minStart = Date.now();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function rateCheck() {
  if (Date.now() - minStart >= 60000) { reqMin = 0; minStart = Date.now(); }
  if (reqMin >= MAX_PER_MIN) {
    const wait = 60000 - (Date.now() - minStart) + 2000;
    console.log(`  ⏳ Rate limit — waiting ${Math.ceil(wait/1000)}s`);
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
    try { return await callGroq(prompt); } catch(e) { console.log(`  ⚠️  Groq failed: ${e.message}, trying Gemini...`); }
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

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────

const DAY = new Date().getUTCDay();
// 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
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
  music:       'musical notation — notes, clefs, rests, dynamics',
  chess:       'chess pieces, card suits, dice, board game symbols',
  zodiac:      'zodiac signs, planets, astrology, moon phases',
  weather:     'weather, sky, nature, seasonal symbols',
  technical:   'keyboard, interface, computer technical symbols',
  superscript: 'superscript and subscript numbers and letters',
  ui:          'UI icons and digital interface symbols',
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

// ─── KAOMOJI VALIDATOR ────────────────────────────────────────────────────────

function isValidKaomoji(face) {
  if (!face || typeof face !== 'string') return false;
  const f = face.trim();
  if (f.length < 3 || f.length > 40) return false;
  // Reject if 2+ math/arrow chars used as face parts
  if ((f.match(/[√÷×→←↑↓≈≠∞∑∏∫]/g) || []).length >= 2) return false;
  // Must have Japanese chars OR bracket structure
  const hasJP = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(f);
  const hasBrackets = /[\(\)\[\]ヽノ╯╰┻━彡]/.test(f);
  if (!hasJP && !hasBrackets) return false;
  // Reject pure math/arrow chains
  if (/^[→←↑↓⇒√×÷±≤≥≈∞\s\(\)~•\-]+$/.test(f)) return false;
  return true;
}

// ─── INVENTORY LOADING ────────────────────────────────────────────────────────

function loadSet(filePath, field) {
  if (!fs.existsSync(filePath)) return new Set();
  const content = fs.readFileSync(filePath, 'utf8');
  return new Set([...content.matchAll(new RegExp(`\\b${field}:\\s*"([^"]+)"`, 'g'))].map(m => m[1]));
}

function loadInventory() {
  return {
    symbolChars: new Set([
      ...loadSet(path.join(ROOT,'src/data/symbols.ts'), 'symbol'),
      ...loadSet(path.join(ROOT,'src/data/generated-symbols.ts'), 'symbol'),
    ]),
    kaoFaces: new Set([
      ...loadSet(path.join(ROOT,'src/data/kaomoji.ts'), 'face'),
      ...loadSet(path.join(ROOT,'src/data/generated-kaomoji.ts'), 'face'),
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

// ─── FILE WRITERS ─────────────────────────────────────────────────────────────

function appendToFile(filePath, defaultContent, newLines) {
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath,'utf8') : defaultContent;
  fs.writeFileSync(filePath, content.replace(/\n\];\s*$/, `\n${newLines.join('\n')}\n];\n`), 'utf8');
}

function appendSymbols(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-symbols.ts'),
    '// AUTO-GENERATED\nexport const generatedSymbols = [\n];\n',
    items.map(s => {
      const kw = s.keywords.map(k=>`"${esc(k)}"`).join(', ');
      return `  { id: "${esc(s.id)}", symbol: "${esc(s.symbol)}", name: "${esc(s.name)}", keywords: [${kw}], category: "${esc(s.category)}", unicode: "${esc(s.unicode)}", html: "${esc(s.html)}", css: "${esc(s.css)}", description: "${esc(s.description)}" },`;
    })
  );
}

function appendKaomoji(items) {
  appendToFile(
    path.join(ROOT,'src/data/generated-kaomoji.ts'),
    '// AUTO-GENERATED\nexport const generatedKaomoji = [\n];\n',
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

// ─── GENERATORS ───────────────────────────────────────────────────────────────

async function genSymbols(category, inv) {
  const existing = [...inv.symbolChars].slice(0,60).join(' ');
  const text = await ai(`Generate 20 unique Unicode symbols for "${category}": ${CAT_DESC[category]}.
Do NOT include: ${existing}
Return ONLY valid JSON array, no markdown:
[{"symbol":"⟹","name":"Long Double Right Arrow","keywords":["long","double","implies"],"unicode":"U+27F9","html":"&#10233;","css":"\\\\27F9","description":"Long double arrow used in proofs."}]`);

  const items = parseJSON(text);
  const results = []; const ts = Date.now();
  for (const item of items) {
    const sym = item.symbol?.trim();
    if (!sym || inv.symbolChars.has(sym)) continue;
    const id = `gen-${slug(category)}-${slug(item.name||'sym')}-${ts}`.slice(0,80);
    results.push({ id, symbol:sym, name:String(item.name||'').trim(), keywords:Array.isArray(item.keywords)?item.keywords.slice(0,6).map(String):[category], category, unicode:String(item.unicode||''), html:String(item.html||''), css:String(item.css||''), description:String(item.description||'') });
    inv.symbolChars.add(sym);
  }
  return results;
}

async function genKaomoji(mood, inv) {
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
3. NEVER use math: NO √ × ÷ → ← ↑ ↓ ≈ ∞ ∑
4. Must look like a recognisable face, 4-25 chars
5. Avoid: ${existing}

Return ONLY valid JSON array:
[{"face":"(◕ᴗ◕✿)","name":"Flower Joy","keywords":["happy","flower","cute"]}]`);

  const items = parseJSON(text);
  const results = [];
  let rejected = 0;
  for (const item of items) {
    const face = item.face?.trim();
    if (!face || inv.kaoFaces.has(face)) continue;
    if (!isValidKaomoji(face)) { rejected++; console.log(`    ❌ Rejected: ${face}`); continue; }
    const id = `gen-${mood}-${Math.random().toString(36).slice(2,8)}`;
    results.push({ id, face, name:String(item.name||'').trim(), mood, keywords:Array.isArray(item.keywords)?item.keywords.slice(0,5).map(String):[mood] });
    inv.kaoFaces.add(face);
  }
  if (rejected > 0) console.log(`    ⚠️  ${rejected} rejected`);
  return results;
}

async function genEmojiCombos(inv) {
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
  const todayTasks = SCHEDULE[DAY] || ['symbols-core','kaomoji'];

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   CopyChars Content Bot v3 🤖            ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`📅  ${new Date().toUTCString()}`);
  console.log(`🔌  API: ${GROQ_KEY ? 'Groq (primary)' : 'Gemini'}`);
  console.log(`📋  Tasks: ${todayTasks.join(', ')}\n`);

  const inv = loadInventory();
  console.log(`📊  Inventory: ${inv.symbolChars.size} symbols · ${inv.kaoFaces.size} kaomoji · ${inv.combos.size} combos · ${inv.borders.size} borders · ${inv.bios.size} bios\n`);

  let totalNew = 0;

  for (const task of todayTasks) {
    if (reqDay >= MAX_PER_DAY) { console.log('⚠️  Daily limit reached'); break; }

    if (task in SYM_CATS) {
      const cats = SYM_CATS[task];
      console.log(`🔣  Symbols: ${cats.join(', ')}`);
      for (const cat of cats) {
        process.stdout.write(`  → ${cat.padEnd(14)} `);
        try {
          const items = await genSymbols(cat, inv);
          if (items.length) { appendSymbols(items); totalNew += items.length; console.log(`✅ +${items.length}`); }
          else console.log('⚪ 0 new');
        } catch(e) { console.log(`❌ ${e.message}`); }
        await sleep(DELAY_MS);
      }
    }

    if (task === 'kaomoji') {
      console.log(`\n😊  Kaomoji — all moods`);
      for (const mood of KAOMOJI_MOODS) {
        process.stdout.write(`  → ${mood.padEnd(12)} `);
        try {
          const items = await genKaomoji(mood, inv);
          if (items.length) { appendKaomoji(items); totalNew += items.length; console.log(`✅ +${items.length}`); }
          else console.log('⚪ 0 valid');
        } catch(e) { console.log(`❌ ${e.message}`); }
        await sleep(DELAY_MS);
      }
    }

    if (task === 'emoji-combos') {
      console.log(`\n🎭  Emoji Combos`);
      process.stdout.write(`  → generating... `);
      try {
        const items = await genEmojiCombos(inv);
        const count = items.reduce((n,c) => n + c.combos.length, 0);
        if (count) { appendCombos(items); totalNew += count; console.log(`✅ +${count}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }

    if (task === 'borders') {
      console.log(`\n🎨  Aesthetic Borders`);
      process.stdout.write(`  → generating... `);
      try {
        const items = await genBorders(inv);
        const count = items.reduce((n,c) => n + c.items.length, 0);
        if (count) { appendBorders(items); totalNew += count; console.log(`✅ +${count}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }

    if (task === 'bio-templates') {
      console.log(`\n📝  Bio Templates`);
      process.stdout.write(`  → generating... `);
      try {
        const items = await genBios(inv);
        const count = items.reduce((n,p) => n + p.bios.length, 0);
        if (count) { appendBios(items); totalNew += count; console.log(`✅ +${count}`); }
        else console.log('⚪ 0 new');
      } catch(e) { console.log(`❌ ${e.message}`); }
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n✅  Done! Added ${totalNew} new items. API calls used: ${reqDay}`);
  console.log(`📊  New totals: ${inv.symbolChars.size} symbols · ${inv.kaoFaces.size} kaomoji · ${inv.combos.size} combos · ${inv.borders.size} borders · ${inv.bios.size} bios\n`);
}

main().catch(err => { console.error('💥', err.message); process.exit(1); });
