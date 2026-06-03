// Demand-driven "style" collection pages for kaomoji, layered on top of the
// mood spokes. Each type targets a real search query that already ranks ~page-1
// bottom in GSC (e.g. "pout kaomoji" pos 9.3, 191 impr; "shine/sparkle kaomoji"
// pos 7.5). Pages REUSE existing kaomoji records (each card links to its own
// /kaomoji/<slug> detail page) — no new thin content, just a curated collection
// view + intro + FAQ that matches the collection-intent query.

import { allKaomoji, type KaomojiWithSlug } from "./all-kaomoji";

export interface KaomojiType {
  id: string; // url slug under /kaomoji/type/<id>
  name: string; // "Pout"
  hero: string; // representative face for the hero
  /** lowercase terms matched against record name + keywords */
  synonyms: string[];
  /** one-paragraph intro (mood-style) */
  blurb: string;
  /** extra type-specific FAQ appended to the shared ones */
  faqExtra?: { q: string; a: string }[];
}

export const kaomojiTypes: KaomojiType[] = [
  {
    id: "pout",
    name: "Pout",
    hero: "(´•︵•｀)",
    synonyms: ["pout", "sulk", "sulking", "pouty", "grumpy", "hmph", "displeased", "frown", "frowning", "puff", "sullen", "disappointed"],
    blurb:
      "Pout kaomoji turn a little sulk into text — puffed cheeks, a downturned mouth, a quiet hmph. Drop one in a chat or caption when you want to look adorably annoyed without saying a word.",
    faqExtra: [
      {
        q: "What is a pout kaomoji?",
        a: "A pout kaomoji is a Japanese text face that shows sulking or mild displeasure — a puffed, downturned expression like (´•︵•｀) or (｡•́︿•̀｡). It reads as cute-annoyed rather than truly angry.",
      },
    ],
  },
  {
    id: "confident",
    name: "Confident",
    hero: "(⌐■_■)",
    synonyms: ["confident", "smug", "proud", "boss", "swagger", "sass", "sassy", "determined", "cocky", "unbothered"],
    blurb:
      "Confident kaomoji radiate self-assured energy — shades on, chin up, that unbothered smirk. Use one to flex a win, sign off with attitude, or just feel like the main character.",
    faqExtra: [
      {
        q: "Which kaomoji looks the most confident?",
        a: "The sunglasses face (⌐■_■) and the flex pose ᕦ(ò_óˇ)ᕤ are the most confident-reading kaomoji — they signal cool, in-control, deal-with-it energy.",
      },
    ],
  },
  {
    id: "smirk",
    name: "Smirk",
    hero: "(¬‿¬)",
    synonyms: ["smirk", "sly", "mischief", "cheeky", "sneaky", "knowing", "sassy", "smug"],
    blurb:
      "Smirk kaomoji carry that sly, knowing little grin — perfect for teasing a friend, hinting you know something, or landing a playful jab with (¬‿¬).",
    faqExtra: [
      {
        q: "What does the (¬‿¬) kaomoji mean?",
        a: "(¬‿¬) is the classic smirk kaomoji — a sly, knowing half-smile. People use it for teasing, sarcasm, or a cheeky 'I know what you did' vibe.",
      },
    ],
  },
  {
    id: "sparkle",
    name: "Sparkle",
    hero: "(◕ᴗ◕✿)",
    synonyms: ["sparkle", "shine", "shimmer", "twinkle", "glitter", "star", "starry", "dazzle", "shiny"],
    blurb:
      "Sparkle kaomoji add a little shine to anything — starry eyes, glittering stars, that ✧ﾟ glow. Great for hyping someone up, celebrating, or making a bio feel magical.",
    faqExtra: [
      {
        q: "How do I make a sparkle or shine kaomoji?",
        a: "Sparkle kaomoji use star symbols like ✧ ☆ ✦ around or inside the face, as in (★^O^★) or (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧. Just click any face here to copy the whole thing.",
      },
    ],
  },
  {
    id: "wink",
    name: "Wink",
    hero: "(^_~)",
    synonyms: ["wink", "flirt", "tease", "winking", "cheeky"],
    blurb:
      "Wink kaomoji drop one eye for a playful, flirty, or just-kidding tone. Send (^_~) to soften a joke or add a little charm to a message.",
  },
  {
    id: "blush",
    name: "Blush",
    hero: "(〃▽〃)",
    synonyms: ["blush", "bashful", "shy", "flustered", "embarrassed", "timid", "coy", "blushing"],
    blurb:
      "Blush kaomoji show those flushed, bashful cheeks — the (〃▽〃) glow you get when someone compliments you. Perfect for shy, sweet, or flustered moments.",
  },
  {
    id: "crying",
    name: "Crying",
    hero: "(╥﹏╥)",
    synonyms: ["cry", "crying", "tears", "sob", "weep", "bawl", "sobbing", "tearful", "teary"],
    blurb:
      "Crying kaomoji let the tears flow — from a single sad drop to full ugly-sobbing (╥﹏╥). Use them for heartbreak, happy tears, or a dramatic 'I'm not crying, you're crying'.",
    faqExtra: [
      {
        q: "What is the crying kaomoji with tears?",
        a: "Classic crying kaomoji include (╥﹏╥), (；﹏；) and (T_T) — the ﹏, ﾟ and T shapes read as streaming tears. Copy any one with a click.",
      },
    ],
  },
  {
    id: "flex",
    name: "Flex",
    hero: "ᕦ(ò_óˇ)ᕤ",
    synonyms: ["flex", "strong", "muscle", "power", "champion", "determined", "win", "fight", "victory", "pumped"],
    blurb:
      "Flex kaomoji throw up the arms and show some muscle — ᕦ(ò_óˇ)ᕤ energy for wins, gym posts, motivation, or a playful 'let's go'.",
  },
];

const lc = (s: string) => s.toLowerCase();

/** Curated collection for a type: name-matches first, then keyword-matches,
 *  excluding duplicate-named records, capped for a focused page. */
export function getKaomojiForType(t: KaomojiType): KaomojiWithSlug[] {
  const seen = new Set<string>();
  const out: KaomojiWithSlug[] = [];
  const nameHit = (k: KaomojiWithSlug) => t.synonyms.some((s) => lc(k.name).includes(s));
  const kwHit = (k: KaomojiWithSlug) => k.keywords.some((w) => t.synonyms.some((s) => lc(w).includes(s)));
  for (const k of allKaomoji) {
    if (k.isDuplicate) continue;
    if (nameHit(k) && !seen.has(k.slug)) { seen.add(k.slug); out.push(k); }
  }
  for (const k of allKaomoji) {
    if (k.isDuplicate) continue;
    if (!seen.has(k.slug) && kwHit(k)) { seen.add(k.slug); out.push(k); }
  }
  return out.slice(0, 32);
}

export function getKaomojiTypeById(id: string): KaomojiType | undefined {
  return kaomojiTypes.find((t) => t.id === id);
}
