// Extra hand-curated kaomoji (P3 expansion). Appended AFTER the existing set in
// all-kaomoji.ts so every existing slug is preserved (no regression to live
// URLs); any name that collides with an existing kaomoji makes THIS entry the
// `-2` noindex'd duplicate, never the existing canonical page.
//
// Targets the 521K/mo "kaomoji" head term + its mood long-tail. Moods are mapped
// to the site's 10 existing kaomojiCategories ids (happy, love, sad, angry,
// surprised, shy, cool, silly, waving, bear) so every mood spoke page stays
// rich — we deliberately do NOT introduce thin new mood buckets.
//
// GLYPH RULE "no broken glyphs": every face is built from Basic-Multilingual-
// Plane characters only (Japanese kana, CJK punctuation, common BMP symbols).
// Verified BMP — a code-point audit asserts zero supplementary-plane glyphs.

import type { Kaomoji } from "./kaomoji";

export const extraKaomoji: Kaomoji[] = [
  // ── happy ──────────────────────────────────────────────────────────────
  { id: "kx-happy-1", face: "(＾▽＾)", name: "Big Grin", mood: "happy", keywords: ["happy", "grin", "smile", "joy"] },
  { id: "kx-happy-2", face: "(◕‿◕)", name: "Sweet Smile", mood: "happy", keywords: ["happy", "smile", "content", "warm"] },
  { id: "kx-happy-3", face: "ヽ(´▽`)/", name: "Cheering Joy", mood: "happy", keywords: ["happy", "cheer", "yay", "celebrate"] },
  { id: "kx-happy-4", face: "(≧◡≦)", name: "Eyes Closed Smile", mood: "happy", keywords: ["happy", "smile", "glee", "content"] },
  { id: "kx-happy-5", face: "(≧▽≦)", name: "Thrilled", mood: "happy", keywords: ["happy", "excited", "thrilled", "hyped"] },
  { id: "kx-happy-6", face: "ヽ(＾Д＾)ﾉ", name: "Pumped Up", mood: "happy", keywords: ["happy", "excited", "pumped", "hyped"] },
  { id: "kx-happy-7", face: "(ﾉ≧∇≦)ﾉ", name: "Bursting Joy", mood: "happy", keywords: ["happy", "excited", "joy", "thrilled"] },
  { id: "kx-happy-8", face: "\\(≧▽≦)/", name: "Hands Up Cheer", mood: "happy", keywords: ["happy", "cheer", "yay", "hooray"] },
  { id: "kx-happy-9", face: "(★^O^★)", name: "Star Eyes", mood: "happy", keywords: ["happy", "excited", "star", "amazed"] },
  // ── waving ─────────────────────────────────────────────────────────────
  { id: "kx-waving-1", face: "(´ ▽ `)ﾉ", name: "Happy Wave", mood: "waving", keywords: ["wave", "hi", "greet", "happy"] },
  // ── sad ────────────────────────────────────────────────────────────────
  { id: "kx-sad-1", face: "(T_T)", name: "Streaming Tears", mood: "sad", keywords: ["sad", "cry", "tears", "upset"] },
  { id: "kx-sad-2", face: "(╥﹏╥)", name: "Sobbing", mood: "sad", keywords: ["sad", "sob", "cry", "weep"] },
  { id: "kx-sad-3", face: "(´；ω；`)", name: "Tearful", mood: "sad", keywords: ["sad", "cry", "tearful", "sniff"] },
  { id: "kx-sad-4", face: "(；﹏；)", name: "Quiet Cry", mood: "sad", keywords: ["sad", "cry", "sniffle", "sorrow"] },
  { id: "kx-sad-5", face: "(╯︵╰,)", name: "Downcast", mood: "sad", keywords: ["sad", "down", "gloomy", "blue"] },
  // ── love ───────────────────────────────────────────────────────────────
  { id: "kx-love-1", face: "(｡♥‿♥｡)", name: "Heart Eyes", mood: "love", keywords: ["love", "heart", "adore", "crush"] },
  { id: "kx-love-2", face: "(♡ω♡)", name: "In Love", mood: "love", keywords: ["love", "heart", "smitten", "affection"] },
  { id: "kx-love-3", face: "(づ｡◕‿‿◕｡)づ", name: "Loving Hug", mood: "love", keywords: ["love", "hug", "cuddle", "embrace"] },
  { id: "kx-love-4", face: "(っ◔◡◔)っ ♥", name: "Offering Heart", mood: "love", keywords: ["love", "heart", "give", "affection"] },
  { id: "kx-love-5", face: "ヽ(♡‿♡)ノ", name: "Lovestruck", mood: "love", keywords: ["love", "heart", "adore", "happy"] },
  // ── angry ──────────────────────────────────────────────────────────────
  { id: "kx-angry-1", face: "ヽ(`Д´)ﾉ", name: "Yelling Mad", mood: "angry", keywords: ["angry", "yell", "rage", "mad"] },
  { id: "kx-angry-2", face: "(╬ಠ益ಠ)", name: "Furious Glare", mood: "angry", keywords: ["angry", "furious", "glare", "rage"] },
  { id: "kx-angry-3", face: "(ノಠ益ಠ)ノ彡┻━┻", name: "Table Flip", mood: "angry", keywords: ["angry", "flip", "table", "rage"] },
  { id: "kx-angry-4", face: "凸(｀⌒´メ)凸", name: "Both Fingers", mood: "angry", keywords: ["angry", "rude", "mad", "annoyed"] },
  { id: "kx-angry-5", face: "( ｀皿´)", name: "Gritted Teeth", mood: "angry", keywords: ["angry", "grit", "mad", "fume"] },
  // ── surprised (incl. confused reactions) ─────────────────────────────────
  { id: "kx-surprised-1", face: "(⊙_⊙)", name: "Wide Eyes", mood: "surprised", keywords: ["surprised", "shock", "wide", "stare"] },
  { id: "kx-surprised-2", face: "(°ロ°)！", name: "Gasp", mood: "surprised", keywords: ["surprised", "gasp", "shock", "wow"] },
  { id: "kx-surprised-3", face: "Σ(°△°|||)", name: "Startled", mood: "surprised", keywords: ["surprised", "startled", "shock", "alarm"] },
  { id: "kx-surprised-4", face: "w(°ｏ°)w", name: "Whoa", mood: "surprised", keywords: ["surprised", "whoa", "amazed", "shock"] },
  { id: "kx-surprised-5", face: "(⊙o⊙)", name: "Round Shock", mood: "surprised", keywords: ["surprised", "shock", "stunned", "stare"] },
  { id: "kx-surprised-6", face: "(・_・ヾ", name: "Head Scratch", mood: "surprised", keywords: ["confused", "puzzled", "unsure", "huh"] },
  { id: "kx-surprised-7", face: "(￣ω￣;)", name: "Uncertain", mood: "surprised", keywords: ["confused", "unsure", "awkward", "hmm"] },
  { id: "kx-surprised-8", face: "¯\\_(ツ)_/¯", name: "Shrug", mood: "surprised", keywords: ["confused", "shrug", "dunno", "whatever"] },
  { id: "kx-surprised-9", face: "(・_・;)", name: "Sweat Drop", mood: "surprised", keywords: ["confused", "sweat", "nervous", "unsure"] },
  { id: "kx-surprised-10", face: "(？_？)", name: "Question Face", mood: "surprised", keywords: ["confused", "question", "huh", "lost"] },
  // ── shy ────────────────────────────────────────────────────────────────
  { id: "kx-shy-1", face: "(〃▽〃)", name: "Blushing", mood: "shy", keywords: ["shy", "blush", "flustered", "bashful"] },
  { id: "kx-shy-2", face: "(*/ω＼*)", name: "Hiding Face", mood: "shy", keywords: ["shy", "hide", "embarrassed", "blush"] },
  { id: "kx-shy-3", face: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", name: "Very Bashful", mood: "shy", keywords: ["shy", "bashful", "blush", "timid"] },
  { id: "kx-shy-4", face: "(*ﾉωﾉ)", name: "Covering Up", mood: "shy", keywords: ["shy", "cover", "embarrassed", "blush"] },
  // ── silly (cute + playful dance) ─────────────────────────────────────────
  { id: "kx-silly-1", face: "(｡•ᴗ•｡)", name: "Soft Cutie", mood: "silly", keywords: ["cute", "kawaii", "sweet", "adorable"] },
  { id: "kx-silly-2", face: "(✿◠‿◠)", name: "Flower Smile", mood: "silly", keywords: ["cute", "flower", "smile", "kawaii"] },
  { id: "kx-silly-3", face: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", name: "Sparkle Toss", mood: "silly", keywords: ["cute", "sparkle", "magic", "kawaii"] },
  { id: "kx-silly-4", face: "(◡ ‿ ◡)", name: "Gentle Cutie", mood: "silly", keywords: ["cute", "gentle", "sweet", "soft"] },
  { id: "kx-silly-5", face: "(｡◕‿◕｡)", name: "Big Eyes Cutie", mood: "silly", keywords: ["cute", "eyes", "kawaii", "adorable"] },
  { id: "kx-silly-6", face: "♪♪ヽ(ˇ∀ˇ )ゞ", name: "Happy Groove", mood: "silly", keywords: ["dance", "music", "groove", "playful"] },
  { id: "kx-silly-7", face: "(〜￣▽￣)〜", name: "Sway", mood: "silly", keywords: ["dance", "sway", "wiggle", "playful"] },
  { id: "kx-silly-8", face: "ヾ(´〇｀)ﾉ♪", name: "Singing Dance", mood: "silly", keywords: ["dance", "sing", "music", "joy"] },
  // ── cool (chill + cool dance) ────────────────────────────────────────────
  { id: "kx-cool-1", face: "(－_－) zzZ", name: "Snoozing", mood: "cool", keywords: ["sleepy", "snooze", "tired", "chill"] },
  { id: "kx-cool-2", face: "(∪｡∪)｡｡｡zzZ", name: "Dozing Off", mood: "cool", keywords: ["sleepy", "doze", "nap", "chill"] },
  { id: "kx-cool-3", face: "(￣o￣) zzZ", name: "Snoring", mood: "cool", keywords: ["sleepy", "snore", "sleep", "tired"] },
  { id: "kx-cool-4", face: "(-, - )…zzZ", name: "Drowsy", mood: "cool", keywords: ["sleepy", "drowsy", "tired", "yawn"] },
  { id: "kx-cool-5", face: "ヾ(⌐■_■)ノ♪", name: "Cool Dance", mood: "cool", keywords: ["cool", "dance", "music", "confident"] },
  // ── bear / animals ───────────────────────────────────────────────────────
  { id: "kx-bear-1", face: "ʕ•ᴥ•ʔ", name: "Teddy Bear", mood: "bear", keywords: ["animal", "bear", "cute", "teddy"] },
  { id: "kx-bear-2", face: "(=^･ω･^=)", name: "Kitty Cat", mood: "bear", keywords: ["animal", "cat", "kitty", "meow"] },
  { id: "kx-bear-3", face: "U・ᴥ・U", name: "Puppy Dog", mood: "bear", keywords: ["animal", "dog", "puppy", "woof"] },
  { id: "kx-bear-4", face: "(•ㅅ•)", name: "Little Bunny", mood: "bear", keywords: ["animal", "bunny", "rabbit", "cute"] },
  { id: "kx-bear-5", face: "(=｀ω´=)", name: "Smug Cat", mood: "bear", keywords: ["animal", "cat", "smug", "kitty"] },
];
