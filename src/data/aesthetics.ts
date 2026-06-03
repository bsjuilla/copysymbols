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
  {
    slug: "frutiger-aero",
    name: "Frutiger Aero",
    emoji: "🫧",
    tagline: "Glossy, nature-meets-tech optimism of the early 2000s",
    description:
      "Frutiger Aero is the sleek, nature-infused design language that dominated consumer tech from roughly 2004 to 2013 — defined by translucent glass buttons, water droplet textures, lush tropical foliage, and the crystalline aqua palette of Windows Vista, Mac OS X Aqua, and early iPod advertising. The aesthetic takes its name from the Adrian Frutiger typeface family widely used in signage and UI of the era, paired with the 'aero' glass compositing engine Microsoft shipped in Vista, and it represents a cultural moment when Silicon Valley genuinely believed technology and nature could be seamlessly, joyfully unified. It has seen a major revival since 2022 on TikTok and Tumblr as Gen Z rediscovers its sunny, pre-ironic optimism — complete with dolphins leaping over gradient skies, glossy soap bubbles, and tropical fish alongside the sleek white plastic of the iPod nano.",
    symbols: ["🫧", "💧", "🐬", "🐠", "🌊", "🌿", "🍃", "☁️", "💙", "🌴", "🌅", "✨", "⋆", "˚", "◦", "°"],
    kaomoji: ["(｡•̀ᴗ•́｡)", "( ˘͈ ᵕ ˘͈♡)", "╰(*°▽°*)╯", "(˶ᵔ ᵕ ᵔ˶)", "( •̀ ω •́ )✧"],
    dividers: ["˚₊‧꒰ 🫧 💧 🌊 💧 🫧 ꒱‧₊˚", "✦ ° ◦ ꒰🐬꒱ ◦ ° ✦ ° ◦ ꒰🌊꒱ ◦ ° ✦", "⋆˚｡ 🌿 ☁️ 💙 ☁️ 🌿 ｡˚⋆"],
    bioTemplate: "🫧 {NAME} ˚₊‧\n💙 {AGE} · {PRONOUNS}\n🌿 {HOBBY} ◦ {CITY}\n☁️ {VIBE_WORD} era",
    related: ["y2k", "soft", "kidcore"],
    searchTerms: ["frutiger aero copy and paste symbols", "frutiger aero aesthetic bio", "frutiger aero symbols copy paste", "frutiger aero aesthetic symbols"],
  },
  {
    slug: "festival",
    name: "Festival",
    emoji: "🎉",
    tagline: "Stage lights, confetti, and pure electric energy",
    description:
      "Festival aesthetic captures the euphoric atmosphere of music festivals, raves, and large-scale celebrations — blending neon stage lighting, confetti showers, and the communal high of live performance. It thrives on social media in event recap posts, DJ and artist bios, and party-planning content where users pair bold color combos with music notes, fireworks, and disco ball glyphs. Signature motifs include glowing sparkles, rainbow arches, pulsing sound waves, and celebratory symbols that convey movement, brightness, and collective joy.",
    symbols: ["🎉", "🎊", "🪩", "💃", "🕺", "🎶", "🎵", "🎈", "✨", "🔥", "🌈", "🎆", "🎇", "💫", "⚡", "★"],
    kaomoji: ["ヽ(•‿•)ノ", "٩(◕‿◕)۶", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "＼(≧▽≦)／", "(*＾▽＾)／"],
    dividers: ["✨ ꒰ 🎉 ꒱ ✨ ⋆˚₊‧ 🎊 ‧₊˚⋆ ✨ ꒰ 🎉 ꒱ ✨", "⚡ ★ 🎶 ★ ⚡ ‧₊˚ 💃 ˚₊‧ ⚡ ★ 🎶 ★ ⚡", "🌈˚｡⋆ 🎵 ⋆｡˚🌈˚｡⋆ 🎵 ⋆｡˚🌈"],
    bioTemplate: "🎉 {NAME} ✨\n🎵 {GENRE} lover · {CITY}\n💃 {PRONOUN} · living for the drop\n🌈 {TAGLINE}",
    related: ["y2k", "baddie", "kidcore"],
    searchTerms: ["festival emoji combos", "rave aesthetic symbols", "music festival bio", "party emoji copy paste"],
  },
  {
    slug: "angelcore",
    name: "Angelcore",
    emoji: "👼",
    tagline: "Ethereal, heavenly, and divinely soft",
    description:
      "Angelcore draws from Renaissance angel paintings, Christian iconography, and heavenly imagery to create a dreamy aesthetic centered on wings, halos, clouds, and celestial light. It gained mainstream popularity on TikTok and Pinterest in the early 2020s, embraced for its themes of divine femininity, purity, and soft ethereal beauty. Soft whites, pearl golds, and pastel blues define the palette, evoking a sense of sacred serenity and otherworldly grace.",
    symbols: ["👼", "🕊️", "☁️", "🤍", "✨", "💫", "🌙", "🎀", "🔔", "✟", "✝", "⊹", "˚", "₊", "⋆", "✦"],
    kaomoji: ["( ˘ ³˘)♡", "✟(˘▾˘✟)", "⊹˚｡⋆( ᐢ ᵕ ᐢ )⋆｡˚⊹", "✦ ˚ · ⋆｡˚ ☁️", "(っ˘ω˘ς)✨"],
    dividers: ["✟ ‧₊˚ ⊹ ✦ ⊹ ˚₊‧ ✟", "🤍 ˚₊‧ ☁️ ⋆ ☁️ ‧₊˚ 🤍", "✨ · ‧₊˚ ⊹ ✟ ⊹ ˚₊‧ · ✨"],
    bioTemplate: "👼 {NAME} ⋆˚｡⋆\n🤍 {AGE} ⋅ {PRONOUNS}\n✟ {AESTHETIC} dreamer\n☁️ {LOCATION} · {SIGN}",
    related: ["fairycore", "dreamcore", "coquette", "soft"],
    searchTerms: ["angelcore aesthetic", "angel aesthetic symbols", "heavenly aesthetic bio", "ethereal angel symbols"],
  },
  {
    slug: "lovecore",
    name: "Lovecore",
    emoji: "💌",
    tagline: "Hearts everywhere, roses in bloom, love turned up to eleven",
    description:
      "Lovecore is a maximalist romantic aesthetic built around unabashed affection — every surface layered with hearts, roses, ribbons, candy hearts, and love letters in saturated reds and pinks. It exploded on TikTok and Tumblr as a bold counterpoint to ironic detachment, celebrating sincerity through Valentine's Day imagery, cupid motifs, and overwrought declarations of love. Typical use cases include lovestruck profile bios, soft gifting posts, couple content, and playlists where the goal is to drown the viewer in sweetness.",
    symbols: ["💌", "💕", "💞", "❤️", "💝", "💗", "💖", "💓", "💘", "💋", "🌹", "🫶", "♡", "♥", "❥", "ღ"],
    kaomoji: ["(´♡‿♡`)", "♡( ◡‿◡ )", "(*˘︶˘*).｡.:*♡", "( ˘ ³˘)♥", "ʚ♡ɞ"],
    dividers: ["♡ ‧₊˚ ❥ ₊˚ ♥ ˚₊ ❥ ˚₊‧ ♡", "💌 ⋆˚ ꒰ ♡ ꒱ ˚⋆ ღ ˚⋆ ꒰ ♡ ꒱ ˚⋆ 💌", "❤︎ ˚₊‧ ୨୧ ‧₊˚ ❤︎ ˚₊‧ ୨୧ ‧₊˚ ❤︎"],
    bioTemplate: "💌 {NAME} ♡\n🌹 {PRONOUN} · hopelessly romantic\n💕 {CITY} · {SIGN}\n❥ {TAGLINE}",
    related: ["coquette", "kawaii", "soft"],
    searchTerms: ["lovecore symbols copy paste", "heart aesthetic bio", "valentine emoji combinations", "romantic symbols text"],
  },
  {
    slug: "vaporwave",
    name: "Vaporwave",
    emoji: "🌴",
    tagline: "Glitchy 80s-90s nostalgia soaked in neon and marble",
    description:
      "Vaporwave is a microgenre and visual aesthetic born online around 2010-2012, built entirely from the spectral residue of late-capitalism — pastel neon gradients of pink and teal, Greek and Roman marble busts floating in digital voids, checkerboard floors receding to infinity, and the unmistakable signature of full-width Latin text that stretches ordinary words into something alien and cinematic (ａｅｓｔｈｅｔｉｃ). The visual vocabulary draws heavily from 1980s mall architecture, early Macintosh interfaces, VHS glitch artifacts, and Japanese city-pop advertising, creating a sense of hyperreal nostalgia for a consumer utopia that never quite existed. Retro tech totems — floppy disks, arcade cabinets, CRT televisions, and cassette tapes — appear alongside tropical sunsets, leaping dolphins, and neon grids to conjure a surreal digital dreamscape permanently suspended somewhere between 1987 and 1994.",
    symbols: ["🌴", "🗿", "🌅", "💾", "📼", "🕹️", "🌊", "🐬", "📺", "🎮", "🌙", "★", "░", "▓", "▲", "✧"],
    kaomoji: ["( ´ ▽ ` )ﾉ", "｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡", "(　･ω･)ﾉ", "★ミ(o*･ω･)ﾉ", "(*･ω･)ﾉ~☆"],
    dividers: ["░▒▓█ ｡ﾟ･ 🌴 🌅 🌴 ･ﾟ｡ █▓▒░", "✧ · ˚ ★ 🐬 　 ｖａｐｏｒ　 🐬 ★ ˚ · ✧", "▲ ░ ｡ﾟ 💾 📼 🕹️ 📼 💾 ﾟ｡ ░ ▲"],
    bioTemplate: "🌴 {NAME} 　 ｖｉｂｅｓ\n🌅 {AGE} · {PRONOUNS}\n💾 {HOBBY} ░ {CITY}\n🎮 ｌｏｓｔ　ｉｎ　{VIBE_WORD}",
    related: ["y2k", "dreamcore", "weirdcore"],
    searchTerms: ["vaporwave aesthetic symbols copy paste", "vaporwave text copy paste full width", "vaporwave aesthetic bio symbols", "aesthetic full width letters copy paste"],
  },
  {
    slug: "old-money",
    name: "Old Money",
    emoji: "🥂",
    tagline: "Understated elegance, quiet luxury, timeless refinement",
    description:
      "Old money aesthetic channels the inherited wealth and restrained taste of historic aristocracy — equestrian estates, sailing regattas, and country clubs rendered in cream, navy, and ivory rather than logos or flash. The palette is deliberately muted: champagne, stone, white linen, and deep forest green, evoking marble foyers and cashmere rather than conspicuous labels. Rooted in heritage sports like tennis, polo, and sailing, it rose to mainstream prominence on TikTok in the early 2020s as a counterpoint to flashy streetwear.",
    symbols: ["🥂", "🤍", "🐎", "⛵", "🎾", "🦢", "🕊️", "☕", "🌿", "🏛️", "✦", "❦", "─", "°", "‧", "₊"],
    kaomoji: ["( ˘ ˘ ) ✦", "‧₊˚ · ° · ˚₊‧", "( ´ ▽ ` ).｡", "˚ · ✦ · ˚", "( · ̮ · )"],
    dividers: ["─ ✦ ❦ ✦ ─", "‧₊˚ ° • ° ˚₊‧", "⊹ ─── 🤍 ─── ⊹"],
    bioTemplate: "🥂 {NAME} ✦ {AGE}\n🤍 {PRONOUNS} · {LOCATION}\n🐎 {INTEREST} · {SIGN}\n‧₊˚ quiet luxury ˚₊‧",
    related: ["coquette", "soft", "baddie"],
    searchTerms: ["old money aesthetic symbols", "quiet luxury aesthetic", "old money bio copy paste", "old money aesthetic bio"],
  },
  {
    slug: "egirl",
    name: "E-Girl",
    emoji: "🖤",
    tagline: "Black hearts, blush cheeks, chains and eyeliner — cute meets edgy online",
    description:
      "E-girl is a TikTok-born internet-fashion aesthetic defined by a clash of cute and dark: heart blush stickers, winged eyeliner, dyed hair streaks, layered chains, and oversized band tees worn over striped long-sleeves. The palette runs on black, hot pink, and silver, pulling references from anime, 2000s emo, and Japanese street fashion into a distinctly Gen-Z, camera-ready look. Accessories like safety pins, plastic hair clips, chunky platform boots, and headphones are staple signals of the aesthetic across both physical wardrobes and digital profile aesthetics.",
    symbols: ["🖤", "💕", "🎧", "⛓️", "🦇", "🕸️", "🎀", "🥀", "🧷", "🎸", "♡", "✞", "★", "☆", "✧", "⋆"],
    kaomoji: ["(✞ᴗ✞)", "♡( >ᴗ< )⛓", "(๑•̀ᗝ•́)✧", "⋆˚🖤 (◕‿◕✿) 🖤˚⋆", "(っ◞‸◟c)♡"],
    dividers: ["🖤 ⋆ ✞ ⋆ ⛓️ ⋆ ✞ ⋆ 🖤", "♡ ✧ 🎀 ★ 🥀 ★ 🎀 ✧ ♡", "⋆ ⛓️ ☆ 🦇 ☆ ⛓️ ⋆"],
    bioTemplate: "🖤 {NAME} ✞\n🎧 {PRONOUN} · {MUSIC_GENRE} obsessed\n⛓️ {CITY} · {AGE}\n🥀 {TAGLINE}\n☆ {SOCIALS}",
    related: ["goth", "grunge", "kawaii", "baddie"],
    searchTerms: ["egirl symbols copy paste", "e-girl aesthetic bio", "black heart chain emoji combination", "egirl text art"],
  },
  {
    slug: "goblincore",
    name: "Goblincore",
    emoji: "🍄",
    tagline: "Hoard shiny things, befriend the frogs, embrace the beautiful rot",
    description:
      "Goblincore is the chaotic, earthy counterpart to cottagecore — where cottagecore romanticises tidy pastoral sweetness, goblincore celebrates the damp, the overlooked, and the delightfully ugly: mossy logs, rain-soaked soil, toadstools, snail trails, and the triumphant discovery of a particularly good rock. Its creatures are frogs, snails, beetles, newts, and all the creeping things most aesthetics ignore, elevated to mascot status with genuine affection. Central to the vibe is foraging and hoarding — mushrooms, bones, shed feathers, river glass, and any coin or trinket that catches the light — living by the gremlin creed that every scavenged treasure has worth.",
    symbols: ["🍄", "🐸", "🐌", "🦎", "🌿", "🍂", "🪨", "🦴", "🐛", "🌱", "🪵", "🍃", "🐚", "🦗", "❦", "♧"],
    kaomoji: ["(ᵔᴥᵔ) ✷", "( •̀ᴗ•́ )و ✧", "꒰ ᵕ ᵕ ꒱ 🍄", "(˵ᵕ̣̣̣̣̣̣ω ᵕ̣̣̣̣̣̣˵) ✷", "ᕙ(⇀‸↼‶)ᕗ 🪨"],
    dividers: ["꒷꒦ ✷‧₊ 🍄 ₊‧✷ ꒦꒷", "⋆ ˚ ❦ ˚ 🐸 ˚ ❦ ˚ ⋆", "‧₊˚ ♧ ° 🌿 ° ♧ ˚₊‧"],
    bioTemplate: "🍄 {NAME} ‧₊˚\n🐸 {PRONOUN} · frog appreciator\n🌿 {CITY} · forager of {TREASURE}\n❦ {GOBLIN_CREED}",
    related: ["cottagecore", "fairycore", "weirdcore"],
    searchTerms: ["goblincore symbols copy paste", "frog aesthetic bio", "mushroom emoji combinations", "cottagecore dark aesthetic symbols"],
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
  "frutiger-aero": "double-struck",
  festival: "bold-script",
  angelcore: "script",
  lovecore: "bold-script",
  vaporwave: "full-width",
  "old-money": "small-caps",
  egirl: "bold-italic",
  goblincore: "italic",
};
