/**
 * scripts/classifiers.mjs
 *
 * Per-category Unicode-block whitelists used by both the content bot
 * (pre-insertion) and the cleanup script (post-hoc audit).
 *
 * A candidate `symbol` string passes a category iff
 *   (count of codepoints in that category's whitelist)
 *   / (count of meaningful codepoints — excluding whitespace and
 *     variation selectors like U+FE0F)
 * >= MIN_RATIO.
 *
 * If no per-category whitelist matches above MIN_RATIO, the candidate is
 * rejected (or, in cleanup mode, quarantined).
 *
 * No new dependencies. Native fetch / fs / path only.
 */

export const MIN_RATIO = 0.7;

// Codepoints we ignore when computing the ratio:
//  - whitespace
//  - variation selectors (FE00–FE0F)
//  - zero-width joiners (200D), zero-width non-joiners (200C)
const IGNORED_CODEPOINTS = new Set([
  0x20, 0x09, 0x0A, 0x0D,
  0x200C, 0x200D,
]);

function isIgnored(cp) {
  if (IGNORED_CODEPOINTS.has(cp)) return true;
  // Variation selectors
  if (cp >= 0xFE00 && cp <= 0xFE0F) return true;
  // Skin-tone modifiers
  if (cp >= 0x1F3FB && cp <= 0x1F3FF) return true;
  return false;
}

/**
 * Returns array of meaningful codepoints (numbers) for a string.
 * Strips whitespace, variation selectors, ZWJ, etc.
 */
export function meaningfulCodepoints(str) {
  if (!str || typeof str !== 'string') return [];
  const out = [];
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    if (isIgnored(cp)) continue;
    out.push(cp);
  }
  return out;
}

// ─── PER-CATEGORY WHITELISTS ──────────────────────────────────────────────────
// Each entry: array of [start, end] inclusive ranges, plus optional `extras`
// (set of single codepoints).

const RANGES = {
  // U+2190–U+21FF Arrows
  // U+27F0–U+27FF Supplemental Arrows-A
  // U+2900–U+297F Supplemental Arrows-B
  // U+2B00–U+2B0F (subset of Misc Symbols and Arrows used for arrows)
  // U+1F800–U+1F8FF Supplemental Arrows-C
  arrows: {
    ranges: [
      [0x2190, 0x21FF],
      [0x27F0, 0x27FF],
      [0x2900, 0x297F],
      [0x2B00, 0x2B0F],
      [0x1F800, 0x1F8FF],
    ],
    extras: new Set(),
  },
  // U+20A0–U+20CF Currency Symbols
  // Plus legacy: $ ¢ £ ¤ ¥ ฿ ₠ ﷼
  currency: {
    ranges: [
      [0x20A0, 0x20CF],
    ],
    extras: new Set([0x0024, 0x00A2, 0x00A3, 0x00A4, 0x00A5, 0x0E3F, 0xFDFC]),
  },
  // U+2200–U+22FF Mathematical Operators
  // U+27C0–U+27EF Misc Math A
  // U+2980–U+29FF Misc Math B
  // U+2A00–U+2AFF Supplemental Math
  // U+1D400–U+1D7FF Math Alphanumerics
  // Plus legacy: ± × ÷ ¬ µ ° ′ ″ ‰ ‱ ∂ (already in 2200) etc
  math: {
    ranges: [
      [0x2200, 0x22FF],
      [0x27C0, 0x27EF],
      [0x2980, 0x29FF],
      [0x2A00, 0x2AFF],
      [0x1D400, 0x1D7FF],
    ],
    extras: new Set([0x00B1, 0x00D7, 0x00F7, 0x00AC, 0x00B5, 0x00B0, 0x2032, 0x2033, 0x2030, 0x2031]),
  },
  // U+0370–U+03FF Greek and Coptic
  // U+1F00–U+1FFF Greek Extended
  greek: {
    ranges: [
      [0x0370, 0x03FF],
      [0x1F00, 0x1FFF],
    ],
    extras: new Set(),
  },
  // Tight allowlist: legal / typography
  // © ® ™ ℠ § ¶ † ‡ ※ ‽ ⁇ ⁈ ⁉ ℗ ℅ ℀ ℁ ℅ ‱ + scales of justice
  legal: {
    ranges: [],
    extras: new Set([
      0x00A9, // ©
      0x00AE, // ®
      0x2122, // ™
      0x2120, // ℠
      0x00A7, // §
      0x00B6, // ¶
      0x2020, // †
      0x2021, // ‡
      0x203B, // ※
      0x203D, // ‽
      0x2047, // ⁇
      0x2048, // ⁈
      0x2049, // ⁉
      0x2117, // ℗
      0x2105, // ℅
      0x2100, // ℀
      0x2101, // ℁
      0x2696, // ⚖ scales of justice
      0x00B0, // ° (degree, used in legal/official notation)
    ]),
  },
  // U+25A0–U+25FF Geometric Shapes
  // U+2B00–U+2BFF Misc Symbols and Arrows (most are arrows; we share with arrows but accept here too — shapes/decoration)
  // U+2700–U+27BF Dingbats (stars, asterisks)
  // U+1F780–U+1F7FF Geometric Shapes Extended
  // Plus stars from Misc Symbols block: 2605 ★, 2606 ☆, 269D ⚝
  shapes: {
    ranges: [
      [0x25A0, 0x25FF],
      [0x2B00, 0x2BFF],
      [0x2700, 0x27BF],
      [0x1F780, 0x1F7FF],
      [0x2605, 0x2606], // ★ ☆
    ],
    // Extras: misc spiritual / decorative shapes commonly used
    extras: new Set([
      0x2625, // ☥ ankh
      0x262E, // ☮ peace
      0x262F, // ☯ yin yang
      0x269C, // ⚜ fleur-de-lis
      0x0950, // ॐ om
    ]),
  },
  // U+2010–U+2027, U+2030–U+205E General Punctuation
  // Plus legacy ASCII punctuation considered "special": « » ¡ ¿ § ¶ … (already in 2026)
  punctuation: {
    ranges: [
      [0x2010, 0x2027],
      [0x2030, 0x205E],
    ],
    extras: new Set([0x00AB, 0x00BB, 0x00A1, 0x00BF]),
  },
  // U+2669–U+266F (♩♪♫♬♭♮♯) — TIGHT
  // U+1D100–U+1D1FF Musical Symbols block
  music: {
    ranges: [
      [0x2669, 0x266F],
      [0x1D100, 0x1D1FF],
    ],
    extras: new Set([0x2668]), // ♨ hot springs is debatable; keep out — assigned to weather. Skip.
  },
  // U+2654–U+265F Chess pieces
  // U+2660–U+2667 Card suits
  // U+2680–U+2685 Dice
  chess: {
    ranges: [
      [0x2654, 0x265F],
      [0x2660, 0x2667],
      [0x2680, 0x2685],
    ],
    extras: new Set(),
  },
  // U+2648–U+2653 Zodiac
  // U+263F–U+2647 Planets / sun / moon
  // U+1F311–U+1F31C Moon phases
  zodiac: {
    ranges: [
      [0x2648, 0x2653],
      [0x263F, 0x2647],
      [0x1F311, 0x1F31C],
    ],
    extras: new Set(),
  },
  // U+2600–U+2614 sun/cloud/rain/snow/storm (misc symbols)
  // U+1F324–U+1F32C supplemental weather
  // Plus 2614 already in range
  weather: {
    ranges: [
      [0x2600, 0x2614],
      [0x1F324, 0x1F32C],
      [0x1F300, 0x1F303], // 🌀🌁🌂🌃 cyclone, foggy, closed-umbrella, night-with-stars
    ],
    extras: new Set([
      0x2668, // ♨ hot springs
      0x2744, // ❄ already in 2600 range
      0x2745, // ❅
      0x2746, // ❆
      0x26C4, // ⛄ snowman
      0x26C5, // ⛅ partly cloudy
      0x26C6, // ⛆ rain
      0x26C7, // ⛇ black snowman
      0x26C8, // ⛈ thunder cloud and rain
      0x26F0, // ⛰ mountain
      0x26F1, // ⛱ umbrella
      0x1F308, // 🌈 rainbow
      0x1F30A, // 🌊 wave
    ]),
  },
  // U+2300–U+23FF Misc Technical
  technical: {
    ranges: [
      [0x2300, 0x23FF],
    ],
    extras: new Set([
      0x2622, // ☢ radioactive
      0x2623, // ☣ biohazard
      0x2625, // ☥
      0x2692, // ⚒ hammer & pick
      0x2693, // ⚓ anchor
      0x2695, // ⚕ medical
      0x2702, // ✂ scissors
      0x2706, // ✆ phone
      0x270F, // ✏ pencil
    ]),
  },
  // U+2070–U+209F Superscripts and Subscripts
  superscript: {
    ranges: [
      [0x2070, 0x209F],
    ],
    extras: new Set([0x00B2, 0x00B3, 0x00B9, 0x00BA, 0x00AA]), // ² ³ ¹ º ª
  },
  // UI: soft category. Misc Symbols (2600–26FF) excluding ranges already
  // claimed by other categories (zodiac 2648–2653, planets 263F–2647,
  // chess 2654–2667, dice 2680–2685, music 2669–266F, weather 2600–2614).
  // Allow 2615–263E, 2670–267F, 2686–26FF.
  // Also allow 2300–23FF (control pictures) and 1F500–1F53F (UI buttons in supplemental).
  ui: {
    ranges: [
      [0x2615, 0x263E],
      [0x2670, 0x267F],
      [0x2686, 0x26FF],
      [0x2300, 0x23FF],
      [0x1F500, 0x1F53F],
    ],
    extras: new Set(),
  },
};

/**
 * Is a single codepoint in the whitelist for `category`?
 */
function inCategory(cp, category) {
  const def = RANGES[category];
  if (!def) return false;
  if (def.extras.has(cp)) return true;
  for (const [s, e] of def.ranges) {
    if (cp >= s && cp <= e) return true;
  }
  return false;
}

/**
 * Score a candidate symbol string against a category.
 * Returns ratio 0..1 of meaningful codepoints in the whitelist.
 * Returns 0 if there are no meaningful codepoints.
 */
export function scoreSymbol(symbol, category) {
  const cps = meaningfulCodepoints(symbol);
  if (cps.length === 0) return 0;
  let hit = 0;
  for (const cp of cps) if (inCategory(cp, category)) hit++;
  return hit / cps.length;
}

/**
 * Strict pass/fail. true iff scoreSymbol >= MIN_RATIO.
 */
export function passesCategory(symbol, category) {
  return scoreSymbol(symbol, category) >= MIN_RATIO;
}

/**
 * Try every category; return the best-matching one (with score),
 * or null if none score >= MIN_RATIO.
 */
export function bestCategory(symbol) {
  let bestName = null;
  let bestScore = 0;
  for (const cat of Object.keys(RANGES)) {
    const s = scoreSymbol(symbol, cat);
    if (s > bestScore) { bestScore = s; bestName = cat; }
  }
  if (bestScore >= MIN_RATIO) return { category: bestName, score: bestScore };
  return null;
}

/**
 * Names of all known categories with classifier rules.
 */
export const KNOWN_CATEGORIES = Object.keys(RANGES);

// ─── KAOMOJI CLASSIFIER ───────────────────────────────────────────────────────

// Face-feature characters that suggest an actual face/expression
const FACE_FEATURES = /[◕ω‿ᴗ▽◡‵´ヽノ╯╰•ᵕ◔ᴥ♡＾^o\-_⌐■OoTｪ°<>≧≦∇⊙￣ロಠ益]/;
// Structural brackets/parens (incl. IPA glottal-stop letters used in animal kaomoji ʕ ʔ)
const STRUCT_BRACKETS = /[\(\)\[\]｜（）「」ʕʔ]/;
// Emoji ranges to reject (kaomoji should NOT contain emoji).
// We reject only the supplemental emoji block (1F300–1FAFF). The BMP misc
// symbols range (2600–27BF) contains decorative chars like ✿ ❀ ♡ ✧ ✦ ☆ ★
// that are commonly used in kaomoji, so we leave it alone here.
function hasEmoji(str) {
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    if (cp >= 0x1F300 && cp <= 0x1FAFF) return true;
  }
  return false;
}

export function isValidKaomoji(face) {
  if (!face || typeof face !== 'string') return false;
  const f = face.trim();
  if (f.length < 3 || f.length > 60) return false;

  // Reject if contains true emoji codepoints (1F300–1FAFF)
  if (hasEmoji(f)) return false;

  // Reject if 2+ math/arrow chars used as face parts
  if ((f.match(/[√÷×→←↑↓≈≠∞∑∏∫⇒]/g) || []).length >= 2) return false;

  // Must contain at least one bracket/paren AND at least one face-feature char.
  // Japanese chars also count as a face feature for hiragana/katakana kaomoji.
  const hasJP = /[぀-ゟ゠-ヿ一-龯]/.test(f);
  const hasBrackets = STRUCT_BRACKETS.test(f) || /[ヽノ╯╰┻━彡]/.test(f);
  const hasFeature = FACE_FEATURES.test(f) || hasJP;

  if (!hasBrackets) return false;
  if (!hasFeature) return false;

  // Reject pure math/arrow chains
  if (/^[→←↑↓⇒√×÷±≤≥≈∞\s\(\)~•\-]+$/.test(f)) return false;

  return true;
}
