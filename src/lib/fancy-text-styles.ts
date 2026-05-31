// 31 Unicode-mapped text styles for /fancy-text and the future
// /tools/username-generator (which reuses this same STYLES table).
//
// Most "math alphanumeric" styles are derived programmatically from Unicode
// block offsets (U+1D400–U+1D7FF). A few have gaps where Unicode reused
// existing codepoints (e.g. ℂ instead of 𝔻 because U+2102 was already
// assigned), so for those we keep an explicit string.
//
// Combining-mark styles (strikethrough, underline, overline, slash) are
// applied per-character.

const PLAIN_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PLAIN_LOWER = "abcdefghijklmnopqrstuvwxyz";
const PLAIN_DIGIT = "0123456789";

function offsetMap(upperStart: number, lowerStart: number, digitStart?: number): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    out[PLAIN_UPPER[i]] = String.fromCodePoint(upperStart + i);
    out[PLAIN_LOWER[i]] = String.fromCodePoint(lowerStart + i);
  }
  if (digitStart != null) {
    for (let i = 0; i < 10; i++) out[PLAIN_DIGIT[i]] = String.fromCodePoint(digitStart + i);
  }
  return out;
}

function explicitMap(upperStr: string, lowerStr: string, digitStr?: string): Record<string, string> {
  const out: Record<string, string> = {};
  const u = [...upperStr];
  const l = [...lowerStr];
  for (let i = 0; i < 26; i++) {
    if (u[i]) out[PLAIN_UPPER[i]] = u[i];
    if (l[i]) out[PLAIN_LOWER[i]] = l[i];
  }
  if (digitStr) {
    const d = [...digitStr];
    for (let i = 0; i < 10; i++) if (d[i]) out[PLAIN_DIGIT[i]] = d[i];
  }
  return out;
}

const COMBINING_STRIKE = "̶";
const COMBINING_UNDER = "̲";
const COMBINING_OVER = "̅";
const COMBINING_SLASH = "̸";
const COMBINING_TILDE = "̃";

export type FancyTextStyle = {
  slug: string;
  label: string;
  example: string;
  description: string;
  /** Convert plain text to this style. */
  transform: (text: string) => string;
  /** SEO category — used to group in the UI. */
  group: "math" | "enclosed" | "decorated" | "novelty" | "combining";
};

function mapTransform(map: Record<string, string>): (t: string) => string {
  return (t) => [...t].map(c => map[c] ?? c).join("");
}

function combineTransform(mark: string): (t: string) => string {
  return (t) => [...t].map(c => c === " " ? c : c + mark).join("");
}

export const STYLES: FancyTextStyle[] = [
  // ── MATH ALPHANUMERIC (formulaic Unicode-block offsets) ────────────────────
  {
    slug: "bold",
    label: "Bold",
    example: "𝐁𝐨𝐥𝐝 𝐭𝐞𝐱𝐭",
    description: "Strong, attention-grabbing. Works in Instagram bios, Discord names, Twitter posts.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D400, 0x1D41A, 0x1D7CE)),
  },
  {
    slug: "italic",
    label: "Italic",
    example: "𝐼𝑡𝑎𝑙𝑖𝑐 𝑡𝑒𝑥𝑡",
    description: "Slanted serif. Elegant for quotes, captions, emphasis.",
    group: "math",
    // Italic block has a gap at 'h' (U+210E) — explicit map handles it.
    transform: mapTransform(explicitMap(
      "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
      "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    )),
  },
  {
    slug: "bold-italic",
    label: "Bold Italic",
    example: "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄",
    description: "Maximum emphasis. Combines weight and slant.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D468, 0x1D482)),
  },
  {
    slug: "sans-serif",
    label: "Sans Serif",
    example: "𝖲𝖺𝗇𝗌 𝖲𝖾𝗋𝗂𝖿",
    description: "Clean, modern, no decorative strokes.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D5A0, 0x1D5BA, 0x1D7E2)),
  },
  {
    slug: "sans-bold",
    label: "Sans Bold",
    example: "𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱",
    description: "Bold sans-serif. The most-used style on Instagram.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D5D4, 0x1D5EE, 0x1D7EC)),
  },
  {
    slug: "sans-italic",
    label: "Sans Italic",
    example: "𝘚𝘢𝘯𝘴 𝘐𝘵𝘢𝘭𝘪𝘤",
    description: "Slanted sans-serif. Modern caption look.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D608, 0x1D622)),
  },
  {
    slug: "sans-bold-italic",
    label: "Sans Bold Italic",
    example: "𝙎𝙖𝙣𝙨 𝘽𝙤𝙡𝙙",
    description: "Bold + italic + sans. Triple emphasis.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D63C, 0x1D656)),
  },
  {
    slug: "script",
    label: "Script",
    example: "𝒮𝒸𝓇𝒾𝓅𝓉",
    description: "Calligraphic script. Romantic, elegant, wedding-card vibe.",
    group: "math",
    // Script has many gaps (B,E,F,H,I,L,M,R,e,g,o all reuse existing codepoints).
    transform: mapTransform(explicitMap(
      "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
      "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
    )),
  },
  {
    slug: "bold-script",
    label: "Bold Script",
    example: "𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽",
    description: "Heavier calligraphic script. Best for headers.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D4D0, 0x1D4EA)),
  },
  {
    slug: "old-english",
    label: "Old English",
    example: "𝔒𝔩𝔡 𝔈𝔫𝔤𝔩𝔦𝔰𝔥",
    description: "Gothic blackletter. Tattoo-style, medieval, dark academia.",
    group: "math",
    // Fraktur reuses ℭ ℌ ℑ ℜ ℨ for some letters.
    transform: mapTransform(explicitMap(
      "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
      "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
    )),
  },
  {
    slug: "bold-old-english",
    label: "Bold Old English",
    example: "𝕭𝖔𝖑𝖉 𝕬𝖓𝖌𝖑𝖔",
    description: "Heavy gothic. Maximum medieval impact.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D56C, 0x1D586)),
  },
  {
    slug: "double-struck",
    label: "Double Struck",
    example: "𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜",
    description: "Hollow outline, used in math for number sets (ℝ, ℕ).",
    group: "math",
    // Reuses ℂ ℍ ℕ ℙ ℚ ℝ ℤ.
    transform: mapTransform(explicitMap(
      "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
      "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
      "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
    )),
  },
  {
    slug: "monospace",
    label: "Monospace",
    example: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎",
    description: "Equal-width letters. Code, terminal, retro look.",
    group: "math",
    transform: mapTransform(offsetMap(0x1D670, 0x1D68A, 0x1D7F6)),
  },

  // ── ENCLOSED / WRAPPED ─────────────────────────────────────────────────────
  {
    slug: "circled",
    label: "Circled",
    example: "Ⓒⓘⓡⓒⓛⓔⓓ",
    description: "Each letter inside a circle. Great for bullet lists and bios.",
    group: "enclosed",
    transform: mapTransform(explicitMap(
      "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ",
      "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
      "⓪①②③④⑤⑥⑦⑧⑨",
    )),
  },
  {
    slug: "filled-circled",
    label: "Filled Circled",
    example: "🅕🅘🅛🅛🅔🅓",
    description: "Bold black-circle letters. High-contrast for usernames.",
    group: "enclosed",
    transform: (t) => [...t].map(c => {
      const upper = c.toUpperCase();
      const i = PLAIN_UPPER.indexOf(upper);
      return i >= 0 ? String.fromCodePoint(0x1F150 + i) : c;
    }).join(""),
  },
  {
    slug: "squared",
    label: "Squared",
    example: "🄢🄠🅄🄰🅁🄴🄳",
    description: "Letters in outlined boxes. Bold, geometric.",
    group: "enclosed",
    transform: (t) => [...t].map(c => {
      const upper = c.toUpperCase();
      const i = PLAIN_UPPER.indexOf(upper);
      return i >= 0 ? String.fromCodePoint(0x1F130 + i) : c;
    }).join(""),
  },
  {
    slug: "negative-squared",
    label: "Filled Squared",
    example: "🅽🅴🅶🅰🆃🅸🆅🅴",
    description: "Bold black-box letters. Maximum visual weight.",
    group: "enclosed",
    transform: (t) => [...t].map(c => {
      const upper = c.toUpperCase();
      const i = PLAIN_UPPER.indexOf(upper);
      return i >= 0 ? String.fromCodePoint(0x1F170 + i) : c;
    }).join(""),
  },
  {
    slug: "parenthesized",
    label: "Parenthesized",
    example: "⒫⒜⒭⒠⒩",
    description: "Lowercase letters inside parentheses.",
    group: "enclosed",
    transform: (t) => [...t].map(c => {
      const lower = c.toLowerCase();
      const i = PLAIN_LOWER.indexOf(lower);
      return i >= 0 ? String.fromCodePoint(0x249C + i) : c;
    }).join(""),
  },

  // ── DECORATED (block-based novelty) ────────────────────────────────────────
  {
    slug: "full-width",
    label: "Full Width",
    example: "Ｆｕｌｌ Ｗｉｄｔｈ",
    description: "Wide-spaced characters from CJK input mode. The vaporwave look.",
    group: "decorated",
    transform: (t) => [...t].map(c => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCodePoint(code + 65248);
      if (code === 32) return "　";
      return c;
    }).join(""),
  },
  {
    slug: "small-caps",
    label: "Small Caps",
    example: "Sᴍᴀʟʟ Cᴀᴘs",
    description: "Lowercase letters rendered as miniature capitals.",
    group: "decorated",
    transform: mapTransform(explicitMap(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ",
    )),
  },
  {
    slug: "superscript",
    label: "Superscript",
    example: "ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ",
    description: "Tiny letters raised above the line. Best for bios.",
    group: "decorated",
    transform: mapTransform(explicitMap(
      "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻ",
      "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ",
      "⁰¹²³⁴⁵⁶⁷⁸⁹",
    )),
  },
  {
    slug: "subscript",
    label: "Subscript",
    example: "ₛᵤᵦₛ𝒸ᵣᵢₚₜ",
    description: "Tiny letters lowered below the line.",
    group: "decorated",
    transform: mapTransform(explicitMap(
      "",
      "ₐᵦ𝒸ᵈₑ𝒻𝓰ₕᵢⱼₖₗₘₙₒₚᵩᵣₛₜᵤᵥ𝓌ₓᵧ𝓏",
      "₀₁₂₃₄₅₆₇₈₉",
    )),
  },

  // ── COMBINING-MARK STYLES (overlay marks on each char) ─────────────────────
  {
    slug: "strikethrough",
    label: "Strikethrough",
    example: "s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶",
    description: "Line through every character. Crossed-out look.",
    group: "combining",
    transform: combineTransform(COMBINING_STRIKE),
  },
  {
    slug: "underline",
    label: "Underline",
    example: "u̲n̲d̲e̲r̲l̲i̲n̲e̲",
    description: "Line under every character.",
    group: "combining",
    transform: combineTransform(COMBINING_UNDER),
  },
  {
    slug: "overline",
    label: "Overline",
    example: "o̅v̅e̅r̅l̅i̅n̅e̅",
    description: "Line above every character.",
    group: "combining",
    transform: combineTransform(COMBINING_OVER),
  },
  {
    slug: "slashthrough",
    label: "Slash Through",
    example: "s̸l̸a̸s̸h̸",
    description: "Diagonal slash through each character.",
    group: "combining",
    transform: combineTransform(COMBINING_SLASH),
  },
  {
    slug: "tilde",
    label: "Tilde",
    example: "t̃ĩl̃d̃ẽ",
    description: "Wavy tilde mark above each character.",
    group: "combining",
    transform: combineTransform(COMBINING_TILDE),
  },

  // ── NOVELTY (hand-mapped, lookalike scripts) ───────────────────────────────
  {
    slug: "upside-down",
    label: "Upside Down",
    example: "uʍop ǝpᴉsdn",
    description: "Letters flipped 180°. Reads bottom-to-top, right-to-left.",
    group: "novelty",
    transform: (t) => {
      const map: Record<string, string> = { a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ɓ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",A:"∀",B:"ᗺ",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"⅁",H:"H",I:"I",J:"ſ",K:"ʞ",L:"⅂",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Ò",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6","0":"0","!":"¡","?":"¿",".":"˙",",":"'","'":",","(":")",")":"(","[":"]","]":"[","{":"}","}":"{","<":">",">":"<"," ":" " };
      return [...t].reverse().map(c => map[c] ?? c).join("");
    },
  },
  {
    slug: "faux-cyrillic",
    label: "Faux Cyrillic",
    example: "FцZ Cчгiииiс",
    description: "Latin letters replaced by Cyrillic lookalikes. Reads as English with a Russian flavour.",
    group: "novelty",
    transform: mapTransform(explicitMap(
      "АБCDЭҒGНIJКLМИФPQЯSТЦVШЖУZ",
      "аъсdэfgнijкlмиоpqяsтцvшхуz",
    )),
  },
  {
    slug: "faux-greek",
    label: "Faux Greek",
    example: "ΓΛΥΞ ΓΡΣΣΚ",
    description: "Latin letters replaced by Greek lookalikes.",
    group: "novelty",
    transform: mapTransform(explicitMap(
      "ΛβΓΔΣFGΗIJΚLΜΝΟΠQΡΣΤΥVWΧΥΖ",
      "αβγδεϝghιjκλμνοπϙρστυvwχγz",
    )),
  },
  {
    slug: "spaced",
    label: "Spaced",
    example: "s p a c e d",
    description: "Single space inserted between every character.",
    group: "novelty",
    transform: (t) => [...t].join(" "),
  },
];

export function findStyle(slug: string): FancyTextStyle | undefined {
  return STYLES.find(s => s.slug === slug);
}

// Common search-term aliases per style (display-cased). People search "cursive"
// far more than "script", "bubble" more than "circled", etc. These let the
// existing /fancy-text/<slug> page target that real-world vocabulary in its
// title, keywords and copy — capturing the high-volume terms WITHOUT spinning up
// duplicate /cursive-text URLs that would cannibalise the same query.
export const STYLE_ALIASES: Record<string, string[]> = {
  script: ["Cursive", "Calligraphy"],
  "bold-script": ["Fancy Cursive"],
  "old-english": ["Gothic", "Blackletter"],
  "bold-old-english": ["Bold Gothic"],
  "double-struck": ["Outline", "Blackboard"],
  monospace: ["Typewriter", "Code"],
  circled: ["Bubble"],
  "full-width": ["Vaporwave", "Aesthetic", "Wide"],
  "faux-cyrillic": ["Russian"],
  "faux-greek": ["Greek"],
  "small-caps": ["Tiny Caps"],
};

/** Common-name aliases for a style slug (display-cased), or []. */
export function aliasesFor(slug: string): string[] {
  return STYLE_ALIASES[slug] ?? [];
}
