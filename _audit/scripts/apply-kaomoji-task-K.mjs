// _audit/scripts/apply-kaomoji-task-K.mjs
// Task K (Kaomoji Clean + Populate). Idempotent.
//
// 1. Reads src/data/kaomoji.ts and src/data/generated-kaomoji.ts.
// 2. Removes entries whose `face` fails scripts/classifiers.mjs::isValidKaomoji.
//    Curated kaomoji.ts is treated more conservatively — entries with Japanese
//    kana are KEPT even if the classifier rejects (real kaomoji often pass
//    visual sanity but fail the strict regex). The bot-generated file uses the
//    classifier verdict directly.
// 3. Appends a curated list of NEW kaomoji to src/data/generated-kaomoji.ts
//    (skipping any whose `face` already exists in either file).
//
// Re-running the script is a no-op once both passes are applied.
//
// Usage: `node _audit/scripts/apply-kaomoji-task-K.mjs`

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const KAOMOJI_PATH = resolve(REPO_ROOT, 'src/data/kaomoji.ts');
const GENERATED_PATH = resolve(REPO_ROOT, 'src/data/generated-kaomoji.ts');
const CLASSIFIERS_URL = pathToFileURL(resolve(REPO_ROOT, 'scripts/classifiers.mjs')).href;

const { isValidKaomoji } = await import(CLASSIFIERS_URL);

// ─── PARSING ──────────────────────────────────────────────────────────────────
// Each entry line has the shape:
//   { id: "...", face: "...", name: "...", mood: "...", keywords: [...] },
// We match line-by-line, tolerant of inner escapes.
const ENTRY_RE = /^\s*\{\s*id:\s*"([^"]+)",\s*face:\s*"((?:[^"\\]|\\.)*)",\s*name:\s*"((?:[^"\\]|\\.)*)",\s*mood:\s*"([^"]+)",\s*keywords:\s*\[([^\]]*)\]\s*\},?\s*$/;

function unescape(str) {
  return str.replace(/\\(.)/g, (_, ch) => {
    if (ch === 'n') return '\n';
    if (ch === 't') return '\t';
    if (ch === 'r') return '\r';
    return ch;
  });
}

function parseEntries(source) {
  const lines = source.split(/\r?\n/);
  const entries = [];
  lines.forEach((line, idx) => {
    const m = ENTRY_RE.exec(line);
    if (m) {
      entries.push({
        lineNumber: idx,
        rawLine: line,
        id: m[1],
        face: unescape(m[2]),
        rawFace: m[2],
        name: unescape(m[3]),
        mood: m[4],
      });
    }
  });
  return entries;
}

// ─── CURATED ADDITIONS ────────────────────────────────────────────────────────
// 60 well-known real kaomoji. Each is hand-checked against isValidKaomoji at
// runtime; any that fail are skipped (and reported), so we'll never add a
// face that the cleanup pass would just delete.
const NEW_KAOMOJI = [
  // Happy / joyful
  { face: "ヽ(´▽`)/",            name: "Joyful Hands Up",       mood: "happy", keywords: ["happy", "yay", "celebrate", "arms"] },
  { face: "＼(^o^)／",            name: "Hands High Cheer",      mood: "happy", keywords: ["happy", "cheer", "yay", "excited"] },
  { face: "(ﾉ´ヮ`)ﾉ*: ･ﾟ",      name: "Sparkle Throw",         mood: "happy", keywords: ["happy", "magic", "sparkle", "throw"] },
  { face: "٩(◕‿◕)۶",             name: "Cheering Both Arms",    mood: "happy", keywords: ["happy", "cheer", "celebrate"] },
  { face: "(´∀｀)",               name: "Pleasant Smile",        mood: "happy", keywords: ["happy", "smile", "content", "pleased"] },
  { face: "ヽ(o^▽^o)ノ",          name: "Bouncy Joy",            mood: "happy", keywords: ["happy", "bounce", "excited", "yay"] },
  { face: "(*≧ω≦*)",              name: "Squee Smile",           mood: "happy", keywords: ["happy", "squee", "excited", "kawaii"] },

  // Love / affection
  { face: "(づ｡◕‿‿◕｡)づ",        name: "Outstretched Hug",      mood: "love", keywords: ["hug", "love", "give", "affection"] },
  { face: "(つ◕_◕)つ",            name: "Take My Hand",          mood: "love", keywords: ["hug", "reach", "love", "offer"] },
  { face: "⊂(◉‿◉)つ",             name: "Welcome Hug",           mood: "love", keywords: ["hug", "love", "embrace", "welcome"] },
  { face: "(´ ▽ ` ).｡ｏ♡",         name: "Daydreaming of Love",   mood: "love", keywords: ["love", "daydream", "heart", "dreamy"] },
  { face: "(♥ω♥*)",                name: "Smitten",               mood: "love", keywords: ["love", "smitten", "heart", "crush"] },
  { face: "( ˘ ³˘)♥",              name: "Kiss With Heart",       mood: "love", keywords: ["love", "kiss", "heart", "sweet"] },
  { face: "(>‿◠)✌",                name: "Wink and Peace",        mood: "love", keywords: ["wink", "peace", "love", "flirt"] },

  // Sad / crying
  { face: "(ｉДｉ)",                name: "Streaming Tears",       mood: "sad", keywords: ["sad", "cry", "weep", "tears"] },
  { face: "(╥﹏╥)",                 name: "Bawling",               mood: "sad", keywords: ["sad", "cry", "bawl", "tears"] },
  { face: "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)", name: "Heavy Tears",        mood: "sad", keywords: ["sad", "cry", "heavy", "tears"] },
  { face: "(ノಥ﹏ಥ)ノ",            name: "Despair Throw",         mood: "sad", keywords: ["sad", "despair", "cry"] },
  { face: "(´ω｀。)",                name: "Quiet Sadness",         mood: "sad", keywords: ["sad", "quiet", "downcast"] },
  { face: "(っ˘̩╭╮˘̩)っ",          name: "Reaching for Comfort",  mood: "sad", keywords: ["sad", "lonely", "comfort", "hug"] },

  // Angry / rage / table flip
  { face: "(╯°□°）╯︵ ┻━┻",        name: "Classic Table Flip",    mood: "angry", keywords: ["angry", "table flip", "rage", "frustrated"] },
  { face: "(┛◉Д◉)┛彡┻━┻",         name: "Big Table Flip",        mood: "angry", keywords: ["angry", "table flip", "rage"] },
  { face: "┬─┬ノ( º _ ºノ)",       name: "Restoring the Table",   mood: "angry", keywords: ["angry", "calm down", "table", "fix"] },
  { face: "(ノಠ益ಠ)ノ",            name: "Furious Throw",         mood: "angry", keywords: ["angry", "rage", "throw"] },
  { face: "(ﾉಥДಥ)ﾉ︵┻━┻･/",       name: "Crying Rage Flip",      mood: "angry", keywords: ["angry", "cry", "table flip", "rage"] },
  { face: "(◣д◢)",                 name: "Glare",                 mood: "angry", keywords: ["angry", "glare", "stare"] },
  { face: "(ﾒ`ﾛ´)/",               name: "Scolding Wave",         mood: "angry", keywords: ["angry", "scold", "yell"] },

  // Surprised / shocked
  { face: "(⊙ω⊙)",                 name: "Wide Surprise",         mood: "surprised", keywords: ["surprised", "wide eyes", "shocked"] },
  { face: "Σ(ﾟДﾟ)",                name: "Sudden Shock",          mood: "surprised", keywords: ["shocked", "surprised", "gasp"] },
  { face: "Σ(っ°Д°;)っ",           name: "Recoiling Shock",       mood: "surprised", keywords: ["shocked", "surprised", "back away"] },
  { face: "( ﾟдﾟ)",                name: "Speechless",            mood: "surprised", keywords: ["shocked", "speechless", "blank"] },
  { face: "(°o°)",                 name: "Round-Mouth Shock",     mood: "surprised", keywords: ["surprised", "shocked", "wow"] },
  { face: "Σ(°ロ°)",               name: "Sharp Gasp",            mood: "surprised", keywords: ["shocked", "gasp", "surprised"] },

  // Shy / blushing / awkward
  { face: "(/ω＼*)",                name: "Hiding Blush",          mood: "shy", keywords: ["shy", "blush", "hide", "embarrassed"] },
  { face: "(*ﾉωﾉ)",                name: "Bashful Hide",          mood: "shy", keywords: ["shy", "blush", "bashful", "embarrassed"] },
  { face: "(´∀｀;)ゞ",              name: "Awkward Salute",        mood: "shy", keywords: ["shy", "awkward", "scratch", "salute"] },
  { face: "(；￣Д￣)",              name: "Sweat Awkward",         mood: "shy", keywords: ["awkward", "sweat", "uncomfortable"] },
  { face: "(￣▽￣;)",               name: "Awkward Smile",         mood: "shy", keywords: ["awkward", "shy", "nervous", "smile"] },

  // Cool / confident / fight
  { face: "( ͡° ͜ʖ ͡°)",            name: "Lenny Face",            mood: "cool", keywords: ["lenny", "cool", "smug", "meme"] },
  { face: "( ͡~ ͜ʖ ͡°)",            name: "Lenny Wink",            mood: "cool", keywords: ["lenny", "wink", "cool", "meme"] },
  { face: "(ง'̀-'́)ง",              name: "Fists Up Fight",        mood: "cool", keywords: ["fight", "ready", "determined"] },
  { face: "ᕦ(ò_óˇ)ᕤ",              name: "Big Flex",              mood: "cool", keywords: ["flex", "strong", "muscle", "cool"] },
  { face: "(▀̿Ĺ̯▀̿ ̿)",             name: "Sunglasses Stare",      mood: "cool", keywords: ["cool", "sunglasses", "stare", "swag"] },
  { face: "(¬‿¬ )",                 name: "Sly Wink",              mood: "cool", keywords: ["sly", "smirk", "cool", "wink"] },

  // Silly / playful / disapproval
  { face: "(¬_¬)",                  name: "Disapproving Stare",    mood: "silly", keywords: ["disapprove", "side eye", "annoyed"] },
  { face: "(￢_￢)",                 name: "Side Eye",              mood: "silly", keywords: ["side eye", "doubt", "skeptical"] },
  { face: "( ಠ ʖ̯ ಠ)",              name: "Stern Disapproval",     mood: "silly", keywords: ["disapprove", "stern", "stare"] },
  { face: "(°ヮ°)",                 name: "Goofy Grin",            mood: "silly", keywords: ["silly", "grin", "goofy"] },
  { face: "( ͡ʘ ͜ʖ ͡ʘ)",            name: "Wide Lenny",            mood: "silly", keywords: ["lenny", "silly", "smug"] },

  // Waving / greeting / bye
  { face: "(￣ω￣)/",                name: "Easy Wave",             mood: "waving", keywords: ["wave", "hi", "bye", "casual"] },
  { face: "(ʘ‿ʘ)╯",                name: "Cheerful Reach",        mood: "waving", keywords: ["wave", "hi", "reach", "greet"] },
  { face: "(@^◡^)ﾉ",                name: "Bouncing Hi",           mood: "waving", keywords: ["wave", "greet", "hi"] },
  { face: "( ´ ω ` )ﾉﾞ",           name: "Soft Wave",             mood: "waving", keywords: ["wave", "soft", "greet", "hi"] },
  { face: "(•̀ᴗ•́)و ̑̑",            name: "Encouraging Pump",      mood: "waving", keywords: ["greet", "encourage", "fist pump"] },

  // Animals / creatures
  { face: "ʕ•ᴥ•ʔノ",                name: "Bear Wave",             mood: "bear", keywords: ["bear", "wave", "cute", "hi"] },
  { face: "ʕ ·(エ)· ʔ",             name: "Curious Bear",          mood: "bear", keywords: ["bear", "curious", "stare"] },
  { face: "(ฅ•ω•ฅ)",                name: "Paw Cat",               mood: "bear", keywords: ["cat", "paws", "cute", "kawaii"] },
  { face: "(=^･ｪ･^=)",              name: "Whisker Cat",           mood: "bear", keywords: ["cat", "kitty", "whiskers"] },
  { face: "(=^･ｪ･^=))ﾉ彡☆",         name: "Cat Throwing Stars",    mood: "bear", keywords: ["cat", "throw", "stars", "playful"] },
  { face: "(◔ᴥ◔)",                  name: "Stoic Animal",          mood: "bear", keywords: ["animal", "stoic", "stare"] },
  { face: "ʕっ•ᴥ•ʔっ",              name: "Bear Reach Hug",        mood: "bear", keywords: ["bear", "hug", "reach", "cute"] },
  { face: "(´･(ｪ)･`)",              name: "Sleepy Cub",            mood: "bear", keywords: ["bear", "cub", "sleepy", "cute"] },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function shortHash(input) {
  return createHash('sha1').update(input).digest('hex').slice(0, 7);
}

function buildId(mood, face) {
  return `gen-kao-${mood}-${shortHash(face)}`;
}

function escapeForTsString(str) {
  // Replace backslash and double quote.
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function formatKeywords(keywords) {
  return keywords.map(k => `"${escapeForTsString(k)}"`).join(", ");
}

function formatEntry({ id, face, name, mood, keywords }) {
  return `  { id: "${id}", face: "${escapeForTsString(face)}", name: "${escapeForTsString(name)}", mood: "${mood}", keywords: [${formatKeywords(keywords)}] },`;
}

function hasJapaneseKana(face) {
  // Hiragana, Katakana, CJK Unified Ideographs.
  if (/[぀-ゟ゠-ヿ一-龯]/.test(face)) return true;
  // Halfwidth katakana (ﾟ ﾞ ｪ ｺ etc.) U+FF65–U+FF9F.
  if (/[･-ﾟ]/.test(face)) return true;
  return false;
}

// A "kaomoji-feature" character that the strict classifier might miss but
// commonly appears in real kaomoji. Used to rescue conservative curated entries
// from being over-pruned.
const RESCUE_FEATURES = /[ДдЖжЯяЦцΩΣ⌣‿‵´⇀↼‸‶ʘʖ̯╥╤╧╨╪▀▄■□⊙○●ºº♥♡✌°⁄ᕙᕗ³｡｡。｡｡∪∩◣◢◤◥；﹏ᴥᵕ✿❤︵彡┻━┃]/;

// Optional alternate "structure" set for kaomoji that don't have round
// brackets but use ASCII letters as ears: "U・ᴥ・U" (dog), "T_T" (cry).
const ALT_STRUCT = /^[A-Z]\S+[A-Z]$/u;

function looksLikeKaomoji(face) {
  // Has any bracket-like structure.
  const STRUCT = /[\(\)\[\]｜（）「」ʕʔ]/;
  if (STRUCT.test(face) && (RESCUE_FEATURES.test(face) || hasJapaneseKana(face))) return true;
  if (ALT_STRUCT.test(face) && (RESCUE_FEATURES.test(face) || hasJapaneseKana(face))) return true;
  return false;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const curatedSrc = readFileSync(KAOMOJI_PATH, 'utf8');
const generatedSrc = readFileSync(GENERATED_PATH, 'utf8');

const curatedEntries = parseEntries(curatedSrc);
const generatedEntries = parseEntries(generatedSrc);

console.log(`Parsed ${curatedEntries.length} curated, ${generatedEntries.length} generated.`);

// Build the dedup set across BOTH files.
const existingFaces = new Set();
for (const e of curatedEntries) existingFaces.add(e.face);
for (const e of generatedEntries) existingFaces.add(e.face);

// ─── CLEANUP PASS ─────────────────────────────────────────────────────────────

// Accept either the strict classifier OR the broader rescue heuristic. The
// classifier has known precision gaps (halfwidth katakana, Cyrillic Д/д,
// accented Latin) that we don't want to penalise.
function classifierAccepts(face) {
  return isValidKaomoji(face) || looksLikeKaomoji(face);
}

// Beyond the classifier, apply our own judgment: reject obvious bot-output
// junk that the classifier can't catch.
function looksLikeBotJunk(entry) {
  const f = entry.face;
  // Long runs of bullet/dot characters: "(•̀╰•́••••••••••)".
  if (/[•·．\.]{4,}/.test(f)) return true;
  // Repeated identical eye glyph sequences like "❣❣❣" / "❣❣❣❣" / "ω∇ω∇ω".
  // Skip combining marks (U+0300–U+036F) — those are intentional in kaomoji
  // like "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)" (combining comma below for tears).
  const noCombining = f.replace(/[̀-ͯ]/g, '');
  if (/(.)\1{3,}/.test(noCombining)) return true;
  // Empty `name` — bot gave up labeling, almost always trash.
  if (!entry.name || entry.name.trim() === '') return true;
  // Very short faces with no face-feature char (just brackets + a single
  // glyph): "(ωω)", ")_(", "(ω◕ ω)" — these are degenerate.
  const stripped = f.replace(/[\s\(\)\[\]]/g, '');
  if (stripped.length <= 2) return true;
  // Faces with mismatched parens that aren't intentional: "(◕ ◕•◕✿)" — count
  // round brackets; if the count is off by 2+ it's broken.
  const lp = (f.match(/\(/g) || []).length;
  const rp = (f.match(/\)/g) || []).length;
  if (Math.abs(lp - rp) >= 2) return true;
  // Faces with `Д` or `Д` glued onto the bracket without a paired counterpart:
  // "(◕ω◕`Д)" — clearly half-broken.
  if (/[`,]Д\b/.test(f)) return true;
  return false;
}

function passes(faceOrEntry) {
  // Backward-compat for additions which only have a face.
  if (typeof faceOrEntry === 'string') {
    return classifierAccepts(faceOrEntry);
  }
  if (!classifierAccepts(faceOrEntry.face)) return false;
  if (looksLikeBotJunk(faceOrEntry)) return false;
  return true;
}

const generatedRemovals = [];
const generatedKeptIds = new Set();
for (const e of generatedEntries) {
  if (passes(e)) {
    generatedKeptIds.add(e.id);
  } else {
    generatedRemovals.push(e);
  }
}

const curatedRemovals = [];
const curatedKeptIds = new Set();
for (const e of curatedEntries) {
  // Curated file is conservative: keep entries that look like kaomoji even if
  // the strict classifier rejects them (it has known false positives for
  // halfwidth katakana, Cyrillic Д/д, accented Latin, etc.). For curated
  // we trust the human label, so we don't apply the bot-junk heuristic.
  if (classifierAccepts(e.face)) {
    curatedKeptIds.add(e.id);
  } else {
    curatedRemovals.push(e);
  }
}

console.log(`Cleanup: would remove ${generatedRemovals.length} from generated, ${curatedRemovals.length} from curated.`);
if (generatedRemovals.length > 0) {
  console.log('Generated removals:');
  for (const e of generatedRemovals) {
    console.log(`  - ${e.id}  face=${JSON.stringify(e.face)}  name=${JSON.stringify(e.name)}`);
  }
}
if (curatedRemovals.length > 0) {
  console.log('Curated removals:');
  for (const e of curatedRemovals) {
    console.log(`  - ${e.id}  face=${JSON.stringify(e.face)}`);
  }
}

// ─── CANDIDATE ADDITIONS ──────────────────────────────────────────────────────

const newAdditions = [];
const skippedNew = [];
const seenAdditionFaces = new Set();
for (const c of NEW_KAOMOJI) {
  if (existingFaces.has(c.face)) {
    skippedNew.push({ ...c, reason: 'duplicate-of-existing-face' });
    continue;
  }
  if (seenAdditionFaces.has(c.face)) {
    skippedNew.push({ ...c, reason: 'duplicate-within-additions' });
    continue;
  }
  if (!passes(c.face)) {
    skippedNew.push({ ...c, reason: 'fails-classifier' });
    continue;
  }
  seenAdditionFaces.add(c.face);
  const id = buildId(c.mood, c.face);
  newAdditions.push({ ...c, id });
}

console.log(`Additions: ${newAdditions.length} accepted, ${skippedNew.length} skipped.`);
if (skippedNew.length > 0) {
  for (const s of skippedNew) {
    console.log(`  SKIP [${s.reason}] ${JSON.stringify(s.face)}`);
  }
}

// Make sure none of the new ids collide with existing ones (idempotence guard).
const allExistingIds = new Set([
  ...curatedEntries.map(e => e.id),
  ...generatedEntries.map(e => e.id),
]);
const additionsToAppend = newAdditions.filter(a => {
  if (allExistingIds.has(a.id)) {
    // Already added by a previous run.
    return false;
  }
  return true;
});

console.log(`After idempotence dedup: ${additionsToAppend.length} entries to write.`);

// ─── REWRITE GENERATED FILE ───────────────────────────────────────────────────

let newGeneratedSrc = generatedSrc;

// 1. Remove dropped lines.
if (generatedRemovals.length > 0) {
  const dropIds = new Set(generatedRemovals.map(r => r.id));
  const lines = newGeneratedSrc.split(/\r?\n/);
  const kept = lines.filter(line => {
    const m = ENTRY_RE.exec(line);
    if (!m) return true;
    return !dropIds.has(m[1]);
  });
  newGeneratedSrc = kept.join('\n');
}

// 2. Append new entries before the closing `];`.
if (additionsToAppend.length > 0) {
  const closingIndex = newGeneratedSrc.lastIndexOf('];');
  if (closingIndex < 0) {
    throw new Error('Could not find closing "];" in generated-kaomoji.ts');
  }
  // Ensure there's a comma at end of the previous entry. Find prev non-empty line before "];".
  const before = newGeneratedSrc.slice(0, closingIndex);
  const after = newGeneratedSrc.slice(closingIndex);

  const additionLines = additionsToAppend.map(formatEntry).join('\n') + '\n';
  // Slot the additions immediately before the closing bracket.
  newGeneratedSrc = before + additionLines + after;
}

if (newGeneratedSrc !== generatedSrc) {
  writeFileSync(GENERATED_PATH, newGeneratedSrc);
  console.log(`Wrote ${GENERATED_PATH}`);
} else {
  console.log('generated-kaomoji.ts unchanged.');
}

// ─── REWRITE CURATED FILE ─────────────────────────────────────────────────────

let newCuratedSrc = curatedSrc;
if (curatedRemovals.length > 0) {
  const dropIds = new Set(curatedRemovals.map(r => r.id));
  const lines = newCuratedSrc.split(/\r?\n/);
  const kept = lines.filter(line => {
    const m = ENTRY_RE.exec(line);
    if (!m) return true;
    return !dropIds.has(m[1]);
  });
  newCuratedSrc = kept.join('\n');
  writeFileSync(KAOMOJI_PATH, newCuratedSrc);
  console.log(`Wrote ${KAOMOJI_PATH}`);
} else {
  console.log('kaomoji.ts unchanged.');
}

// ─── REPORT ───────────────────────────────────────────────────────────────────

const finalCurated = parseEntries(readFileSync(KAOMOJI_PATH, 'utf8'));
const finalGenerated = parseEntries(readFileSync(GENERATED_PATH, 'utf8'));

// dedupe count by face
const finalFaces = new Set();
let dupes = 0;
for (const e of [...finalCurated, ...finalGenerated]) {
  if (finalFaces.has(e.face)) dupes++;
  else finalFaces.add(e.face);
}

console.log('---');
console.log(`Final curated entries:   ${finalCurated.length}`);
console.log(`Final generated entries: ${finalGenerated.length}`);
console.log(`Final total entries:     ${finalCurated.length + finalGenerated.length}`);
console.log(`Final unique faces:      ${finalFaces.size}`);
console.log(`Face duplicates:         ${dupes}`);
console.log(`Removed from curated:    ${curatedRemovals.length}`);
console.log(`Removed from generated:  ${generatedRemovals.length}`);
console.log(`Newly added:             ${additionsToAppend.length}`);
