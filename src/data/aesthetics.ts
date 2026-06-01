// Aesthetic / trend collection pages (P2). Each aesthetic is a hand-curated
// bundle of copy-paste symbols, kaomoji, dividers and a bio template targeting
// high-velocity TikTok/Instagram "[aesthetic] symbols / [aesthetic] bio"
// search intent (the page type symbl.cc / emojicombos.com dominate).
//
// CURATION RULE — "no broken glyphs": the symbol/divider sets are restricted to
// universally-rendering characters: standard pre-2020 emoji + BMP decorative
// symbols (hearts, stars, sparkles, brackets, crosses) + a few BMP exotic-script
// decoratives (Vai, Cham, Lepcha, Yi, Tibetan) that render on modern iOS /
// Android / Windows. High-risk supplementary-plane exotic glyphs flagged in
// research (Old Turkic 𐰁, Linear B 𐙚, Pahlavi 𐭩, Miao 𖦹, Egyptian 𓆏 𓂃, etc.)
// were intentionally REMOVED — they show as tofu boxes on common devices.
// Data conventions verified 2026-05-29 (aesthetics wiki, emojicombos, symbl.cc).

export interface Aesthetic {
  slug: string;
  name: string;
  /** One representative emoji icon (universally-rendering). */
  emoji: string;
  tagline: string;
  /** 2-3 genuinely distinct sentences — the anti-thin-content signal. */
  description: string;
  /** Copy-paste decorative symbols that define the aesthetic. */
  symbols: string[];
  /** Kaomoji faces that fit the vibe. */
  kaomoji: string[];
  /** Decorative divider / border strings. */
  dividers: string[];
  /** Sample social bio using the aesthetic (placeholders in {BRACES}). */
  bioTemplate: string;
  /** Adjacent aesthetic slugs for cross-linking. */
  related: string[];
  /** Search phrases this page targets. */
  searchTerms: string[];
}

export const AESTHETICS: Aesthetic[] = [
  {
    slug: "coquette",
    name: "Coquette",
    emoji: "🎀",
    tagline: "Soft, flirty, bows-and-lace femininity",
    description:
      "Coquette is a hyper-feminine 2020s aesthetic built on bows, lace, ribbons, pearls and blush pastels, drawing on Victorian and 1950s-60s romance. It dominates TikTok and Instagram bios, where the pink bow 🎀 is the signature motif. Soft pinks, cream tones, hearts and ribbon symbols define its look.",
    symbols: ["🎀", "♡", "ʚ", "ɞ", "꒰", "꒱", "❀", "✿", "⋆", "˚", "₊", "‧", "✧", "♥", "❤︎", "ꕥ"],
    kaomoji: ["(˶ᵔ ᵕ ᵔ˶)", "꒰ᐢ. .ᐢ꒱", "(｡♡‿♡｡)", "(˶˃ ᵕ ˂˶)", "ʚ♡ɞ"],
    dividers: ["˚｡⋆ ❀ ⋆｡˚ ꒰ ꒱ ˚｡⋆ ❀ ⋆｡˚", "♡ ‧₊˚ ⊹ ୨୧ ⊹ ˚₊‧ ♡", "✧･ﾟ ⋆ ♡ ⋆ ﾟ･✧"],
    bioTemplate: "🎀 {NAME} ⋆˚｡⋆\n♡ {AGE} ⋅ {PRONOUNS}\nʚ {HOBBY} ɞ\n˚₊‧ ꒰ soft girl hours ꒱ ‧₊˚",
    related: ["soft", "y2k", "kawaii"],
    searchTerms: ["coquette symbols", "coquette bio copy paste", "coquette aesthetic symbols", "coquette bow copy paste"],
  },
  {
    slug: "y2k",
    name: "Y2K",
    emoji: "🦋",
    tagline: "Late-90s / 2000s cyber-glam nostalgia",
    description:
      "Y2K revives late-1990s and early-2000s pop culture: chrome, butterflies, low-rise everything, CDs and bubblegum maximalism in hot pink, baby blue and metallic silver. It's a top TikTok and Instagram bio trend, with the butterfly 🦋, sparkles and the classic ✧･ﾟ sparkle string as its hallmarks. Bright clashing colours and gadget motifs define the vibe.",
    symbols: ["🦋", "★", "☆", "✩", "✦", "✧", "⋆", "♡", "💿", "⭑", "✮", "♥", "꙳", "˖", "°", "ᯓ"],
    kaomoji: ["(˃ᴗ˂)", "(๑>؂•̀๑)", "꒰⑅•ᴗ•⑅꒱", "(•̀ᴗ•́)و", "(★ω★)"],
    dividers: ["✧･ﾟ: *✧･ﾟ:* ⋆｡˚ ☆ ˚｡⋆ *:･ﾟ✧*:･ﾟ✧", "★彡 ⋆⭒˚｡⋆ 彡★", "‧₊˚ ⋆ ☆ ⋆ ˚₊‧"],
    bioTemplate: "˚₊‧ Y2K baby ‧₊˚\n🦋 {NAME} ⋆｡˚\n★ {AGE} ⋅ {PRONOUNS} ★\n✧ {HOBBY} ✧",
    related: ["baddie", "kidcore", "coquette"],
    searchTerms: ["y2k symbols", "y2k bio copy paste", "y2k aesthetic symbols", "y2k butterfly copy paste"],
  },
  {
    slug: "cottagecore",
    name: "Cottagecore",
    emoji: "🍄",
    tagline: "Cozy rural, mushrooms and wildflowers",
    description:
      "Cottagecore romanticises simple rural life: baking, gardening, foraging and quiet mornings in muted sage greens, cream and warm browns. It thrives on Tumblr, TikTok and Instagram bios, where mushrooms 🍄, flowers, frogs and tea define the imagery. Earthy nature motifs and soft botanical symbols set its gentle tone.",
    symbols: ["🍄", "🌿", "🌱", "🌻", "🍂", "🐌", "🐸", "🌾", "❀", "✿", "♡", "⋆", "˚", "₊", "✷", "꒷"],
    kaomoji: ["(˶ᵔ ᵕ ᵔ˶)", "(´｡• ᵕ •｡`)", "꒰ ´• ᵕ •` ꒱", "(◍•ᴗ•◍)", "ʚ🌱ɞ"],
    dividers: ["꒷꒦ ⋆｡˚ 🌿 ˚｡⋆ ꒦꒷", "❀ ｡˚ ⋆ ୨୧ ⋆ ˚｡ ❀", "🍂 ⋆⭒˚ ⋆ ˚⭒⋆ 🍂"],
    bioTemplate: "🍄 {NAME} ꒷꒦\n🌿 {AGE} ⋅ {PRONOUNS}\nʚ {HOBBY} ɞ\n꒰ tending the garden ꒱",
    related: ["fairycore", "soft", "kawaii"],
    searchTerms: ["cottagecore symbols", "cottagecore bio copy paste", "cottagecore aesthetic symbols", "cottagecore emoji combos"],
  },
  {
    slug: "kawaii",
    name: "Kawaii",
    emoji: "🌸",
    tagline: "Japanese cute, hearts and pastels",
    description:
      "Kawaii is the Japanese culture of cuteness — all rounded shapes, pastel pinks, hearts, stars and chubby characters. It's huge across Discord, TikTok and Instagram bios and is the home of the kaomoji (Japanese text emoticon). Hearts ♡, sparkles and expressive text faces are its core symbols.",
    symbols: ["🌸", "♡", "☆", "★", "✧", "⋆", "ꕀ", "ᰔ", "꩜", "꒰", "꒱", "ʚ", "ɞ", "♥", "❀", "₊"],
    kaomoji: ["(≧◡≦)", "( • ⩊ • )", "ʕ•ᴥ•ʔ", "(˶ˆᗜˆ˵)", "(づ｡◕‿‿◕｡)づ"],
    dividers: ["｡✧ﾟ･ ⋆ ♡ ⋆ ･ﾟ✧｡", "♡⋆｡˚ ꒰ఎ ♡ ໒꒱ ˚｡⋆♡", "˚ʚ♡ɞ˚ ⋆ ˚ʚ♡ɞ˚"],
    bioTemplate: "🌸 {NAME} ♡\n☆ {AGE} ⋅ {PRONOUNS} ☆\nʕ•ᴥ•ʔ {HOBBY}\n꒰ stay cute ꒱ ‧₊˚",
    related: ["coquette", "soft", "cottagecore"],
    searchTerms: ["kawaii symbols", "kawaii bio copy paste", "kawaii aesthetic symbols", "cute kaomoji copy paste"],
  },
  {
    slug: "fairycore",
    name: "Fairycore",
    emoji: "🧚",
    tagline: "Whimsical woodland fairy magic",
    description:
      "Fairycore is a whimsical, magical cousin of cottagecore centred on fairies, enchanted forests, butterflies and glowing mushrooms in dewy greens, lilac and gold. It's popular on TikTok and Instagram bios, where the fairy 🧚, sparkles and mushroom motifs lead. Ethereal nature symbols and twinkle marks define its dreamy look.",
    symbols: ["🧚", "🍄", "🦋", "🌿", "🌙", "🔮", "✨", "✧", "⋆", "˚", "₊", "ೃ", "༘", "✦", "♡", "·"],
    kaomoji: ["(˶ᵔ ᵕ ᵔ˶)", "(˃ᴗ˂)", "꒰ᐢ. .ᐢ꒱", "ʚ🧚ɞ", "(｡•́‿•̀｡)"],
    dividers: ["⋆｡˚ ✧ 🧚 ✧ ˚｡⋆", "✦ ‧₊˚ ⊹ 🍄 ⊹ ˚₊‧ ✦", "˚ ༘ ⋆｡˚ 🦋 ˚｡⋆ ༘ ˚"],
    bioTemplate: "🧚 {NAME} ⋆｡˚\n✧ {AGE} ⋅ {PRONOUNS}\nʚ {HOBBY} ɞ\n꒰ off to the forest ꒱ ‧₊˚",
    related: ["cottagecore", "kawaii", "dreamcore"],
    searchTerms: ["fairycore symbols", "fairycore bio copy paste", "fairycore aesthetic symbols", "fairycore emoji combos"],
  },
  {
    slug: "dreamcore",
    name: "Dreamcore",
    emoji: "☁️",
    tagline: "Surreal, hazy dreamlike nostalgia",
    description:
      "Dreamcore is a surreal early-2020s aesthetic evoking the soft, hazy comfort and unease of dreams — floating clouds, eyes, hallways and childhood imagery. It shows up in alt TikTok captions, Discord and Instagram bios with a slightly uncanny mood. Clouds ☁️, eyes, moons and stars in washed pastel tones define it.",
    symbols: ["☁️", "👁️", "🌈", "🌙", "💭", "🫧", "✦", "✧", "⋆", "˚", "☾", "♡", "✶", "₊", "⊹", "°"],
    kaomoji: ["(˘ω˘)", "(ᵕ—ᴗ—)", "( ˘ ³˘)♡", "(´-ω-`)", "(｡-‿-｡)"],
    dividers: ["⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆", "✶ ⋆｡˚ 👁️ ˚｡⋆ ✶", "˚ ☁️ ⋆｡˚ ✦ ˚｡⋆ ☁️ ˚"],
    bioTemplate: "☁️ {NAME} ⋆｡˚\n🌙 {AGE} ⋅ {PRONOUNS}\n💭 {HOBBY}\n꒰ lost in a daydream ꒱",
    related: ["weirdcore", "soft", "fairycore"],
    searchTerms: ["dreamcore symbols", "dreamcore bio copy paste", "dreamcore aesthetic symbols", "dreamcore emoji combos"],
  },
  {
    slug: "goth",
    name: "Goth",
    emoji: "🖤",
    tagline: "Dark romance, bats and crosses",
    description:
      "Goth is a dark, romantic aesthetic built on black-on-black palettes, crosses, bats, skulls, spiders and candles with deep purple and crimson accents. It's a staple of Instagram bios, TikTok and Discord usernames, where the black heart 🖤, crosses (♱ ✟) and bat motifs lead. Macabre imagery and ornate cross symbols define the mood.",
    symbols: ["🖤", "🦇", "🕷️", "🕸️", "🕯️", "⛧", "♱", "✟", "☾", "✞", "☽", "♰", "†", "🥀", "⚰️", "☠"],
    kaomoji: ["(◣_◢)", "(˘︹˘)", "(╥﹏╥)", "ʕ•̀ω•́ʔ", "(҂◡_◡)"],
    dividers: ["⛧ ｡˚ ⋆ ♱ ⋆ ˚｡ ⛧", "☾ ⋆⁺₊ ♰ ₊⁺⋆ ☽", "✟ ˚｡⋆ 🦇 ⋆｡˚ ✟"],
    bioTemplate: "🖤 {NAME} ♱\n🦇 {AGE} ⋅ {PRONOUNS}\n⛧ {HOBBY} ⛧\n☾ creature of the night ☽",
    related: ["grunge", "weirdcore", "baddie"],
    searchTerms: ["goth symbols", "goth bio copy paste", "goth aesthetic symbols", "gothic symbols copy paste"],
  },
  {
    slug: "grunge",
    name: "Grunge",
    emoji: "🥀",
    tagline: "Edgy 90s rock, chains and skulls",
    description:
      "Grunge is a gritty, edgy aesthetic rooted in 90s rock culture: distressed textures, chains, safety pins, skulls and wilted roses in washed black, grey and rust. It's common in alt TikTok, Instagram bios and Discord names, where the wilted rose 🥀, crosses and chain motifs lead. Distressed dark symbols and moody crosses define it.",
    symbols: ["🥀", "🖤", "⛓️", "🧷", "🔪", "💀", "♱", "✮", "☠", "⛧", "🕸️", "☾", "✝", "♰", "⋆", "₊"],
    kaomoji: ["(ㅍ_ㅍ)", "(҂⌣̀_⌣́)", "(◢_◣)", "(˘︹˘)", "(︶︹︶)"],
    dividers: ["✮ ˚₊ ⋆ ☠ ⋆ ₊˚ ✮", "⋆♱✮♱⋆ ⛓️ ⋆♱✮♱⋆", "˖° ‧₊ ♱ ₊‧ °˖"],
    bioTemplate: "🥀 {NAME} ♱\n🖤 {AGE} ⋅ {PRONOUNS}\n⛓️ {HOBBY} ⛓️\n✮ never mind ✮",
    related: ["goth", "baddie", "y2k"],
    searchTerms: ["grunge symbols", "grunge bio copy paste", "grunge aesthetic symbols", "grunge emoji combos"],
  },
  {
    slug: "kidcore",
    name: "Kidcore",
    emoji: "🌈",
    tagline: "Bright 90s/2000s childhood nostalgia",
    description:
      "Kidcore is a loud, nostalgic aesthetic celebrating 1990s and early-2000s childhood with clashing primary colours, rainbows, crayons, stickers and toys. It's playful across TikTok and Instagram bios, rejecting minimalism entirely. Rainbows 🌈, stars, candy and bright primary-colour emoji define it.",
    symbols: ["🌈", "⭐", "🧃", "🍭", "🎨", "🩹", "☀️", "🪀", "★", "☆", "✩", "♡", "✿", "⋆", "✦", "✮"],
    kaomoji: ["(≧▽≦)", "(★ω★)", "ヽ(>∀<☆)ノ", "(✿◠‿◠)", "＼(^o^)／"],
    dividers: ["•꒰ 🌈 ꒱• ⋆ •꒰ ⭐ ꒱•", "★彡 ⋆｡˚ ☆ ˚｡⋆ 彡★", "✩ ‧₊˚ 🍭 ˚₊‧ ✩"],
    bioTemplate: "🌈 {NAME} ⭐\n🧃 {AGE} ⋅ {PRONOUNS}\n🎨 {HOBBY}\n☀️ just a big kid ☀️",
    related: ["y2k", "kawaii", "weirdcore"],
    searchTerms: ["kidcore symbols", "kidcore bio copy paste", "kidcore aesthetic symbols", "kidcore emoji combos"],
  },
  {
    slug: "soft",
    name: "Soft Girl",
    emoji: "🩰",
    tagline: "Gentle pastels, hearts and clouds",
    description:
      "Soft girl (soft / pastel) is a gentle, hyper-feminine aesthetic in pink, lavender and peach, with hearts, clouds, flowers and fluffy things. It blew up via TikTok in 2019 and is a go-to for short Instagram and Discord bios. Hearts ♡, clouds and pastel sparkles in sugary tones define its tender mood.",
    symbols: ["🩰", "☁️", "♡", "🌷", "🫧", "🤍", "ʚ", "ɞ", "‧₊˚", "⊹", "꒰", "꒱", "✿", "˚", "₊", "·"],
    kaomoji: ["(˶ᵔ ᵕ ᵔ˶)", "(´｡• ᵕ •｡`)", "꒰ᐢ. .ᐢ꒱", "(｡♡‿♡｡)", "ʚ♡ɞ"],
    dividers: ["‧₊˚ ☁️ ⋅ ♡ ⋅ ☁️ ˚₊‧", "♡ ⋆｡˚ ꒰ 🤍 ꒱ ˚｡⋆ ♡", "˚₊‧ ୨୧ ‧₊˚"],
    bioTemplate: "🩰 {NAME} ♡\n☁️ {AGE} ⋅ {PRONOUNS}\nʚ {HOBBY} ɞ\n‧₊˚ soft hours only ˚₊‧",
    related: ["coquette", "kawaii", "cottagecore"],
    searchTerms: ["soft aesthetic symbols", "soft girl bio copy paste", "pastel aesthetic symbols", "soft symbols copy paste"],
  },
  {
    slug: "baddie",
    name: "Baddie",
    emoji: "💋",
    tagline: "Bold, glam, confident self-love",
    description:
      "Baddie is a bold, glamorous aesthetic about confidence and self-love — sharp makeup, heels, fire, diamonds and red roses in black, red and gold. It's a top-searched Instagram and TikTok bio style projecting unapologetic attitude. Lips 💋, fire, crowns and diamond symbols define its fierce energy.",
    symbols: ["💋", "🔥", "💅", "👑", "💎", "🌹", "😈", "✨", "★", "✦", "♡", "⛓️", "🖤", "💄", "⚡", "♛"],
    kaomoji: ["(¬‿¬)", "(˵ ͡° ͜ʖ ͡°˵)", "(•̀ᴗ•́)و", "(￣ω￣)", "(¬ω¬)"],
    dividers: ["✦ ♡ 💋 ♡ ✦", "★彡 ⋆ 🔥 ⋆ 彡★", "⛓ ⋆⭒˚ ♛ ˚⭒⋆ ⛓"],
    bioTemplate: "💋 {NAME} 🔥\n👑 {AGE} ⋅ {PRONOUNS}\n💅 {HOBBY}\n✨ know your worth ✨",
    related: ["y2k", "grunge", "goth"],
    searchTerms: ["baddie symbols", "baddie bio copy paste", "baddie aesthetic symbols", "baddie emoji combos"],
  },
  {
    slug: "weirdcore",
    name: "Weirdcore",
    emoji: "👁️",
    tagline: "Uncanny, distorted liminal nostalgia",
    description:
      "Weirdcore is an unsettling internet aesthetic of distorted reality, low-res images, liminal spaces and uncanny imagery — especially floating eyes, doors and spirals. It defines cryptic alt TikTok captions, playlist titles and Discord bios with a confused, alienated mood. Eyes 👁️, spirals, arrows and glitchy punctuation set the tone.",
    symbols: ["👁️", "🌀", "🚪", "🍄", "⭐", "🎈", "💭", "✶", "❓", "‽", "⸮", "꒰", "꒱", "ঌ", "໒", "✦"],
    kaomoji: ["(◉_◉)", "( ͡⊙ ͜ʖ ͡⊙)", "(⊙_☉)", "(°△°)", "(๑•̆۬•̆๑)"],
    dividers: ["꒰ঌ 👁️ ໒꒱ ⋆ ꒰ঌ 👁️ ໒꒱", "✶ ˖° ⋆ 🌀 ⋆ °˖ ✶", "·˳ ✶ ⋆ 👁️ ⋆ ✶ ˳·"],
    bioTemplate: "👁️ {NAME} ⸮\n🌀 {AGE} ⋅ {PRONOUNS}\n🚪 {HOBBY}\n꒰ have we met before? ꒱",
    related: ["dreamcore", "kidcore", "goth"],
    searchTerms: ["weirdcore symbols", "weirdcore bio copy paste", "weirdcore aesthetic symbols", "weirdcore emoji combos"],
  },
];

export function getAesthetic(slug: string): Aesthetic | undefined {
  return AESTHETICS.find(a => a.slug === slug);
}

// The signature "font" of each aesthetic — a fancy-text style slug (see
// src/lib/fancy-text-styles.ts). This is the one element the vibe bundle was
// missing: each aesthetic now ships font + symbols + kaomoji + dividers + bio
// as one kit. Values are real STYLES slugs; all render on modern iOS/Android/
// Windows (blackletter old-english for goth/grunge is the authentic look and is
// the same style /fancy-text already serves). Falls back to bold-script.
export const AESTHETIC_FONT: Record<string, string> = {
  coquette: "bold-script",
  y2k: "double-struck",
  cottagecore: "italic",
  kawaii: "circled",
  fairycore: "script",
  dreamcore: "small-caps",
  goth: "old-english",
  grunge: "bold-old-english",
  kidcore: "filled-circled",
  soft: "italic",
  baddie: "bold-italic",
  weirdcore: "full-width",
};
