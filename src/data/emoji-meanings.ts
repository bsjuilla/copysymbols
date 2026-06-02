// Emoji & combo meaning dictionary (build #5).
//
// The biggest competitor gap (both research clusters): emojicombos.com / getemoji
// list strings with ZERO explanation, while people constantly ask "what does
// 🤨📸 / 💀 / 🥺👉👈 mean". This is the answer layer — each entry is its own
// searchable, AI-citable page with a real, documented meaning + tone + example.
//
// ACCURACY RULE: only widely-documented meanings are included (mainstream Gen-Z
// usage per Know Your Meme, Dictionary.com, Emojipedia). Meanings are framed
// honestly — tone shifts with context, and we say so. Emoji are stored as the
// real characters (machine-checkable: no U+FFFD); the render-safety badge on
// each page flags the few newer ones (🫠 🫶) that box on un-updated devices.
//
// Data compiled 2026-06-02.

export interface EmojiMeaning {
  /** URL slug, e.g. "caught-in-4k". */
  slug: string;
  /** The emoji or combo. */
  emoji: string;
  /** Short display name, e.g. "Caught in 4K". */
  name: string;
  /** One-line meaning (used in lists + meta). */
  short: string;
  /** Full explanation (2–4 sentences). */
  meaning: string;
  /** The general tone(s) it carries. */
  tone: string;
  /** A natural usage example. */
  example: string;
  /** Where it comes from, when notable. */
  origin?: string;
  /** Related slugs for cross-linking. */
  related: string[];
  /** Search phrases. */
  keywords: string[];
}

export const EMOJI_MEANINGS: EmojiMeaning[] = [
  {
    slug: "caught-in-4k",
    emoji: "🤨📸",
    name: "Caught in 4K",
    short: "Caught doing something undeniable, as if on camera.",
    meaning: "The raised-eyebrow face plus a camera means someone has been caught red-handed with proof — \"caught in 4K\" (4K being ultra-clear video). It's used playfully to call out a contradiction, a lie, or someone doing exactly what they said they wouldn't.",
    tone: "Playful, calling-out",
    example: "You said you were studying 🤨📸",
    origin: "From the 2021 \"caught in 4K\" meme about being recorded in high definition.",
    related: ["skull-laughing", "eyes-looking", "cap-lie"],
    keywords: ["caught in 4k meaning", "🤨📸 meaning", "raised eyebrow camera emoji"],
  },
  {
    slug: "skull-laughing",
    emoji: "💀",
    name: "Skull (I'm dead)",
    short: "Something is so funny you've 'died' laughing.",
    meaning: "Among Gen Z the skull largely replaced 😂 as the way to say something is hilarious — \"I'm dead\" / \"I can't breathe\". It rarely means anything morbid in chat; context (a joke, a meme) makes it clearly about laughter.",
    tone: "Funny, dramatic",
    example: "the way he tripped 💀💀",
    related: ["sob-stop", "clown-fool", "caught-in-4k"],
    keywords: ["skull emoji meaning", "💀 meaning gen z", "what does the skull emoji mean"],
  },
  {
    slug: "shy-finger-touch",
    emoji: "🥺👉👈",
    name: "Shy / nervously asking",
    short: "Timid, bashful — softly asking for something.",
    meaning: "The pleading face with two fingers touching shows shyness or a nervous, gentle request. It's the visual of someone poking their fingers together while working up the courage to ask a favour or apologise.",
    tone: "Shy, cute",
    example: "can we get pizza tonight 🥺👉👈",
    related: ["melting", "heart-hands", "skull-laughing"],
    keywords: ["🥺👉👈 meaning", "shy emoji finger meaning", "pleading face fingers"],
  },
  {
    slug: "eyes-mouth-eyes",
    emoji: "👁️👄👁️",
    name: "Staring in disbelief",
    short: "Awkwardly witnessing something — 'are you seeing this?'",
    meaning: "Two eyes around a mouth is a blank, staring face used when you're silently watching something awkward, chaotic, or unbelievable unfold. It often means \"I have no words\" or \"is anyone else seeing this?\".",
    tone: "Awkward, deadpan",
    example: "they started arguing in the group chat 👁️👄👁️",
    origin: "A viral 2020 format used to react to uncomfortable or surreal moments.",
    related: ["eyes-looking", "standing-awkward", "skull-laughing"],
    keywords: ["👁️👄👁️ meaning", "eyes mouth eyes emoji", "staring emoji meaning"],
  },
  {
    slug: "sob-stop",
    emoji: "😭✋",
    name: "Overwhelmed / can't",
    short: "Laughing-crying so hard you have to say stop.",
    meaning: "The loudly-crying face with a raised palm means you're overwhelmed — usually from laughing too hard, but sometimes from being touched or emotional. The hand is a playful \"stop, I can't take it\".",
    tone: "Overwhelmed, dramatic",
    example: "STOP he really said that 😭✋",
    related: ["skull-laughing", "melting", "shy-finger-touch"],
    keywords: ["😭✋ meaning", "crying stop hand emoji", "i can't emoji"],
  },
  {
    slug: "peace-out",
    emoji: "😔✌️",
    name: "Peace out (defeated)",
    short: "A quiet, slightly defeated goodbye.",
    meaning: "The pensive face with a peace sign is a low-key, resigned \"I'm out\". It carries a tired or defeated mood — leaving a situation without making a fuss, half-joking about giving up.",
    tone: "Defeated, low-key",
    example: "exam went terribly, anyway 😔✌️",
    related: ["melting", "skull-laughing", "stoic-sigma"],
    keywords: ["😔✌️ meaning", "sad peace sign emoji", "peace out emoji meaning"],
  },
  {
    slug: "standing-awkward",
    emoji: "🧍",
    name: "Just standing there",
    short: "Frozen, awkward, not knowing what to do.",
    meaning: "The person standing emoji means standing there awkwardly with no reaction — the visual of \"and I oop\" or being left speechless. It captures that blank, what-do-I-do-now moment.",
    tone: "Awkward, deadpan",
    example: "everyone went quiet when I walked in 🧍",
    related: ["eyes-mouth-eyes", "clown-fool", "skull-laughing"],
    keywords: ["🧍 meaning", "standing person emoji meaning", "awkward standing emoji"],
  },
  {
    slug: "nail-polish",
    emoji: "💅",
    name: "Unbothered / I said what I said",
    short: "Sassy confidence — unbothered and fabulous.",
    meaning: "The nail-polish emoji signals cool, unbothered confidence — \"I said what I said\". It adds a sassy, dismissive flair, as if calmly doing your nails while staying completely above the drama.",
    tone: "Sassy, confident",
    example: "didn't text back, anyway 💅",
    related: ["stoic-sigma", "smug", "hundred"],
    keywords: ["💅 meaning", "nail polish emoji meaning", "unbothered emoji"],
  },
  {
    slug: "sparkle-sarcasm",
    emoji: "✨",
    name: "Sarcastic emphasis",
    short: "Wrapping a word in ✨ for mocking emphasis.",
    meaning: "Sparkles around a word add an ironic, sing-song emphasis — ✨special✨, ✨amazing✨ — usually sarcastic, making fun of something rather than praising it. On its own, ✨ can also just mean magical, pretty, or exciting.",
    tone: "Sarcastic (or genuinely magical)",
    example: "another ✨productive✨ Monday",
    related: ["clown-fool", "nail-polish", "hundred"],
    keywords: ["✨ meaning", "sparkle emoji sarcasm", "word in sparkles meaning"],
  },
  {
    slug: "cap-lie",
    emoji: "🧢",
    name: "Cap (lie)",
    short: "Calling out a lie — 'that's cap'.",
    meaning: "The cap emoji means a lie: \"that's cap\" = that's not true. The opposite, \"no cap\", means \"no lie / for real\". It comes from slang where \"capping\" is lying or exaggerating.",
    tone: "Calling-out",
    example: "he said he ran a 4-minute mile 🧢",
    origin: "From African-American slang where \"cap\" means a lie or boast.",
    related: ["caught-in-4k", "hundred", "clown-fool"],
    keywords: ["🧢 meaning", "cap emoji meaning", "no cap meaning"],
  },
  {
    slug: "stoic-sigma",
    emoji: "🗿",
    name: "Stoic / sigma",
    short: "Emotionless, unbothered, deadpan 'chad' energy.",
    meaning: "The moai (stone head) emoji conveys a flat, emotionless reaction — staying stone-faced through chaos. It's tied to \"sigma\" and deadpan-humour memes, often used to look unbothered or to deliver a dry punchline.",
    tone: "Deadpan, unbothered",
    example: "they tried to make me mad 🗿",
    related: ["nail-polish", "peace-out", "smug"],
    keywords: ["🗿 meaning", "moai emoji meaning", "stone face emoji sigma"],
  },
  {
    slug: "eyes-looking",
    emoji: "👀",
    name: "Looking / suspicious interest",
    short: "Watching closely — interested or a little nosy.",
    meaning: "The eyes emoji means looking — usually with interest, suspicion, or anticipation. It signals \"I see that\", \"ooh, tell me more\", or quietly watching something develop.",
    tone: "Curious, suspicious",
    example: "new couple in the friend group 👀",
    related: ["caught-in-4k", "eyes-mouth-eyes", "smug"],
    keywords: ["👀 meaning", "eyes emoji meaning", "looking emoji"],
  },
  {
    slug: "clown-fool",
    emoji: "🤡",
    name: "Clown (fooled myself)",
    short: "Feeling foolish — playing yourself.",
    meaning: "The clown emoji means feeling like a fool — usually self-directed, as in \"I really thought… 🤡\" after being wrong or naive. Pointed at someone else, it calls them a clown for foolish behaviour.",
    tone: "Self-deprecating",
    example: "got dressed up and the date cancelled 🤡",
    related: ["skull-laughing", "cap-lie", "standing-awkward"],
    keywords: ["🤡 meaning", "clown emoji meaning", "feeling like a clown"],
  },
  {
    slug: "melting",
    emoji: "🫠",
    name: "Melting face",
    short: "Overwhelmed, embarrassed, or 'I can't even'.",
    meaning: "The melting face shows being overwhelmed — by embarrassment, heat, awkwardness, or a situation slipping out of control. It's the visual of dissolving into a puddle while keeping a smile on.",
    tone: "Overwhelmed, embarrassed",
    example: "sent the text to the wrong person 🫠",
    related: ["sob-stop", "shy-finger-touch", "standing-awkward"],
    keywords: ["🫠 meaning", "melting face emoji meaning", "melting emoji"],
  },
  {
    slug: "heart-hands",
    emoji: "🫶",
    name: "Heart hands",
    short: "Love, gratitude, support.",
    meaning: "Two hands forming a small heart means love, appreciation, and support — a warm \"I love you\" or \"thank you so much\". It became hugely popular as a soft, sincere way to show affection.",
    tone: "Wholesome, loving",
    example: "you all are the best 🫶",
    related: ["heart-on-fire", "shy-finger-touch", "hundred"],
    keywords: ["🫶 meaning", "heart hands emoji meaning", "finger heart emoji"],
  },
  {
    slug: "pinched-fingers",
    emoji: "🤌",
    name: "Pinched fingers",
    short: "Emphatic Italian gesture — 'what are you saying?'",
    meaning: "The pinched-fingers emoji mimics the Italian hand gesture used to add emphasis or express \"what do you mean?\" / \"are you serious?\". Online it's also used to mean something is *chef's-kiss* perfect.",
    tone: "Emphatic, expressive",
    example: "the pasta was perfect 🤌",
    related: ["nail-polish", "hundred", "smug"],
    keywords: ["🤌 meaning", "pinched fingers emoji meaning", "italian hand emoji"],
  },
  {
    slug: "woozy",
    emoji: "🥴",
    name: "Woozy face",
    short: "Dazed — drunk, infatuated, or overwhelmed.",
    meaning: "The woozy face has uneven eyes and a crooked mouth. It means feeling dazed — tipsy, exhausted, lovestruck, or just overwhelmed. Tone depends fully on context, from \"I'm wasted\" to \"he's so cute I can't think\".",
    tone: "Dazed (context-dependent)",
    example: "three coffees in and still tired 🥴",
    related: ["melting", "smug", "sob-stop"],
    keywords: ["🥴 meaning", "woozy face emoji meaning", "drunk emoji"],
  },
  {
    slug: "smug",
    emoji: "😏",
    name: "Smirking face",
    short: "Smug, flirty, or suggestive confidence.",
    meaning: "The smirking face carries a knowing, confident smugness — often flirtatious or suggestive, sometimes just self-satisfied. It implies you know something the other person doesn't, or you're teasing.",
    tone: "Flirty, smug",
    example: "guess who got the job 😏",
    related: ["eyes-looking", "nail-polish", "stoic-sigma"],
    keywords: ["😏 meaning", "smirk emoji meaning", "flirty emoji"],
  },
  {
    slug: "pray-thanks",
    emoji: "🙏",
    name: "Folded hands",
    short: "Please, thank you, or hope/pray.",
    meaning: "Folded hands mean a sincere please, thank you, or a hopeful prayer. Some people read it as a high-five, but its primary use is gratitude or a heartfelt request. Stacked (🙏🙏🙏) it adds emphasis to the plea or the thanks.",
    tone: "Sincere, hopeful",
    example: "please let it not rain tomorrow 🙏",
    related: ["heart-hands", "hundred", "melting"],
    keywords: ["🙏 meaning", "folded hands emoji meaning", "praying emoji meaning"],
  },
  {
    slug: "hundred",
    emoji: "💯",
    name: "Hundred points",
    short: "Full agreement — keeping it 100 / real.",
    meaning: "The hundred-points emoji means total agreement, authenticity, or a perfect score — \"100%\", \"keep it 100\" (stay real). It's a stamp of approval that something is true, excellent, or fully co-signed.",
    tone: "Affirming, hype",
    example: "best decision ever 💯",
    related: ["cap-lie", "heart-hands", "pinched-fingers"],
    keywords: ["💯 meaning", "100 emoji meaning", "keep it 100 meaning"],
  },
  {
    slug: "nerd-face",
    emoji: "🤓",
    name: "Nerd face",
    short: "Mocking a know-it-all — 'well, actually…'.",
    meaning: "Once an innocent nerd, this face is now mostly used to mock someone for being a pedantic know-it-all — the \"well, actually 🤓☝️\" reply. It pokes fun at over-explaining or correcting people.",
    tone: "Mocking, teasing",
    example: "\"technically it's a fruit\" 🤓",
    related: ["clown-fool", "smug", "cap-lie"],
    keywords: ["🤓 meaning", "nerd emoji meaning", "well actually emoji"],
  },
  {
    slug: "heart-on-fire",
    emoji: "❤️‍🔥",
    name: "Heart on fire",
    short: "Burning passion or intense desire.",
    meaning: "A heart wrapped in flames means burning passion, intense love, or being completely captivated. It's stronger than a plain red heart — used for deep desire, obsession with something, or fiery enthusiasm.",
    tone: "Passionate, intense",
    example: "obsessed with this album ❤️‍🔥",
    related: ["heart-hands", "smug", "woozy"],
    keywords: ["❤️‍🔥 meaning", "heart on fire emoji meaning", "burning heart emoji"],
  },
  {
    slug: "exhale",
    emoji: "😮‍💨",
    name: "Exhaling face",
    short: "A breath out — relief, exhaustion, or frustration.",
    meaning: "The exhaling face blows out a puff of air. It means letting out a breath — from relief, tiredness, or quiet frustration. Context decides whether it's \"phew, that's over\" or \"I'm so done with this\".",
    tone: "Relieved or frustrated",
    example: "finally finished the project 😮‍💨",
    related: ["melting", "peace-out", "stoic-sigma"],
    keywords: ["😮‍💨 meaning", "exhaling emoji meaning", "sigh emoji"],
  },
  {
    slug: "kneeling-begging",
    emoji: "🧎",
    name: "Kneeling (begging)",
    short: "On your knees — pleading or desperate.",
    meaning: "The kneeling person emoji is used to dramatise begging or desperation — \"I'm on my knees, please\". Paired with 🙏 or 🥺 it amplifies a heartfelt or over-the-top plea.",
    tone: "Dramatic, pleading",
    example: "please restock my size 🧎🙏",
    related: ["pray-thanks", "shy-finger-touch", "melting"],
    keywords: ["🧎 meaning", "kneeling emoji meaning", "begging emoji"],
  },
];

export function getEmojiMeaning(slug: string): EmojiMeaning | undefined {
  return EMOJI_MEANINGS.find((e) => e.slug === slug);
}
