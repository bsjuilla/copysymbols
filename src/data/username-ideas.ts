// Programmatic "username ideas" landing pages → /username-ideas/<slug>.
//
// Two kinds of spoke:
//   • vibe     — targets "<vibe> usernames" (aesthetic, cute, edgy, soft, y2k).
//                Example usernames are drawn from that vibe's ornament pool.
//   • platform — targets "<platform> username ideas" (discord, roblox, tiktok,
//                instagram). Examples use the full ornament set; tips cover that
//                platform's real handle vs display-name rules.
//
// Each page is intentionally NON-thin: a hand-authored intro + tips + FAQ PLUS
// ~24 server-rendered, deterministic example usernames (real indexable content),
// PLUS the live generator embedded with the vibe pre-selected.
//
// Cannibalization guard: we deliberately do NOT add a generic "cool usernames"
// spoke — the editorial /blog/cool-username-ideas owns that intent. Platform
// pages target "<platform> username ideas" (name inspiration), distinct from
// /symbols-for/<platform> (symbol palettes) — the two cross-link instead of
// competing.

import { STYLES } from "@/lib/fancy-text-styles";
import { ORNAMENTS, type Vibe } from "@/lib/username-ornaments";

export interface UsernameIdeaPage {
  slug: string;
  kind: "vibe" | "platform";
  /** Short noun used in breadcrumbs / hub cards (e.g. "Aesthetic"). */
  name: string;
  /** Page H1 (e.g. "Aesthetic Usernames"). */
  h1: string;
  /** <title> contents (template trap: bare title, layout adds "| CopyChars"). */
  title: string;
  /** Meta description (~150-160 chars). */
  description: string;
  /** Vibe pages: which ornament pool to draw examples from. Platform: undefined. */
  vibe?: Vibe;
  /** One-line summary for hub cards. */
  tagline: string;
  /** 2 unique intro paragraphs. */
  intro: string[];
  /** SFW seed words combined with styles+ornaments to mint example usernames. */
  seeds: string[];
  /** Page-specific tips (platform rules / styling advice). */
  tips: Array<{ h: string; p: string }>;
  /** 4 unique FAQ entries (FAQPage schema). */
  faqs: Array<{ q: string; a: string }>;
  /** Slugs of related spokes to cross-link. */
  related: string[];
}

export const USERNAME_IDEAS: UsernameIdeaPage[] = [
  // ───────────────────────── VIBE PAGES ─────────────────────────
  {
    slug: "aesthetic",
    kind: "vibe",
    vibe: "aesthetic",
    name: "Aesthetic",
    h1: "Aesthetic Usernames",
    title: "Aesthetic Usernames — 100+ Ideas & Generator",
    description:
      "Soft, dreamy aesthetic usernames with stars and sparkle accents. Browse 100+ ideas or type your name to generate your own — one click to copy for Discord, Insta, TikTok.",
    tagline: "Dreamy, celestial names with ⋆｡˚ star and sparkle accents.",
    intro: [
      "Aesthetic usernames lean on soft, celestial decoration — tiny stars, sparkle trails, crescent moons and hairline dots that frame a name without shouting. The look pairs a clean font (thin serif, script, or small caps) with delicate Unicode ornaments so the whole handle reads calm and curated rather than busy.",
      "The examples below mix lowercase nature and dusk words (luna, willow, ember, celeste) with the aesthetic ornament pack. Use them as-is, or drop your own name into the generator to get a fresh set in the same style. Everything is real Unicode text, so it pastes into any display-name or bio field.",
    ],
    seeds: ["luna", "aurora", "velvet", "dusk", "sage", "ivory", "ember", "willow", "onyx", "celeste", "marlowe", "lumiere"],
    tips: [
      { h: "Keep the font light", p: "Aesthetic names read best in thin styles — italic, script, or small caps. Heavy bold or fraktur fights the delicate ornaments. Pick one font and one ornament pack; layering two ornament styles usually looks cluttered." },
      { h: "Lowercase looks softer", p: "An all-lowercase base word (luna, not LUNA) reads gentler and more 'aesthetic'. The fancy font still capitalizes nicely where the style supports it." },
      { h: "Mind the length limits", p: "Star and sparkle ornaments add 4–8 invisible-feeling characters. On Roblox (20-char display name) or WhatsApp (25), a long base word plus ornaments can overflow — check with the character counter before saving." },
    ],
    faqs: [
      { q: "What makes a username look aesthetic?", a: "Three things: a soft lowercase base word, a light font (script, italic, or small caps), and delicate celestial ornaments — stars (⋆), sparkles (˚₊‧), or a crescent (୨୧). Restraint is the trick: one font, one ornament pack, nothing competing." },
      { q: "Where do aesthetic usernames work?", a: "Anywhere that accepts Unicode in the display name or bio: Discord, Instagram bio, TikTok display name, Tumblr, X (Twitter), Pinterest, Spotify. They do NOT work in Instagram or TikTok @handles, which only allow letters, numbers, periods and underscores." },
      { q: "Can I make matching aesthetic names with a friend?", a: "Yes — generate two names with the same ornament pack and font vibe so they read as a set (e.g. ⋆｡˚ luna ˚｡⋆ and ⋆｡˚ aurora ˚｡⋆). Keeping the wrapper identical and only changing the base word is what makes them look matched." },
      { q: "Will the sparkles show up on every phone?", a: "The star, sparkle and moon characters used here are common BMP symbols that render on all modern iOS, Android, Windows and Mac devices. Very old devices may show a box for the rarest glyphs, but the ornament packs here avoid those." },
    ],
    related: ["soft", "cute", "y2k", "instagram"],
  },
  {
    slug: "cute",
    kind: "vibe",
    vibe: "cute",
    name: "Cute",
    h1: "Cute Usernames",
    title: "Cute Usernames — Kawaii Name Ideas & Generator",
    description:
      "Sweet, kawaii cute usernames with hearts, bunnies and flower accents. Browse 100+ ideas or generate your own from any name — one tap to copy for Discord, Roblox, TikTok.",
    tagline: "Sweet kawaii names with ♡ hearts, bunnies and flowers.",
    intro: [
      "Cute usernames are playful and round — think hearts (♡), little flowers (✿), bunny ears (ദ്ദി) and kawaii brackets (꒰♡ ♡꒱) wrapped around a sweet base word. The vibe is soft and friendly, popular on Roblox, Discord and TikTok where a cute handle helps you read approachable.",
      "Below, cozy food and animal words (mochi, peachy, bunbun, biscuit) are paired with the cute ornament pack. Swap in your own name to mint a matching set. As always it's plain Unicode text, so one click copies it straight into your profile.",
    ],
    seeds: ["mochi", "peachy", "bunbun", "cookie", "pudding", "honeybee", "mimi", "cloudy", "biscuit", "dango", "pippin", "muffin"],
    tips: [
      { h: "Food + animal words win", p: "The cutest base words are tiny foods (mochi, pudding, biscuit) and soft animals (bunbun, ducky). Doubling a syllable (bun→bunbun, mi→mimi) instantly reads cuter." },
      { h: "Hearts over everything", p: "A simple ♡ on each side does 80% of the work. The kawaii bracket ꒰♡ ♡꒱ and the (♡ω♡) face are the next step up when you want extra sweetness." },
      { h: "Watch emoji length on Roblox", p: "Cute packs that use real emoji (🌷, 🍓) count as 2 characters each and Roblox display names cap at 20. The non-emoji packs (♡, ✿, ꒰꒱) are safer if your base word is long." },
    ],
    faqs: [
      { q: "What are good cute username ideas?", a: "Start from a sweet base word — a tiny food (mochi, muffin), a soft animal (bunbun, ducky) or a doubled syllable (mimi, lulu) — then wrap it in hearts (♡), a flower (✿) or the kawaii bracket ꒰♡ ♡꒱. The examples on this page are all generated that way." },
      { q: "Are cute usernames okay for Roblox?", a: "Yes. Roblox display names accept Unicode hearts and flowers and most kawaii brackets. Just keep it under 20 characters (display name limit) and remember your underlying @username is separate and ASCII-only." },
      { q: "How do I make a cute name with my real name?", a: "Type your name into the generator above, pick the Cute vibe, and roll. It keeps your name readable and just adds the cute font + ornament. Short names take ornaments best — if yours is long, try a nickname." },
      { q: "Do cute symbols work in Discord?", a: "Yes, in your Discord display name and server nickname. Hearts, flowers and kawaii faces all render. They won't work in the lowercase @username Discord assigns, but almost everyone sees your display name, not that handle." },
    ],
    related: ["aesthetic", "soft", "roblox", "y2k"],
  },
  {
    slug: "edgy",
    kind: "vibe",
    vibe: "edgy",
    name: "Edgy",
    h1: "Edgy Usernames",
    title: "Edgy Usernames — Cool Dark Name Ideas",
    description:
      "Sharp, dark edgy usernames with dagger, lightning and bracket accents. Browse 100+ ideas or generate your own from any name — one click to copy for Discord & gaming.",
    tagline: "Sharp, dark names with † dagger, ⌁ lightning and 『』 brackets.",
    intro: [
      "Edgy usernames go the opposite direction from cute — sharp daggers (†), lightning (⌁), Japanese brackets (『 』) and bold or gothic fonts that read serious and a little dangerous. It's the default look for competitive gaming tags, alt accounts and Discord servers that want a darker tone.",
      "The examples mix short, hard-edged words (venom, rogue, wraith, cinder) with the edgy ornament pack and heavier fonts. Drop your own gamer tag into the generator for a matching set. All output is real Unicode, copy-paste ready for any display name.",
    ],
    seeds: ["venom", "rogue", "ashen", "crow", "nyx", "wraith", "vandal", "hex", "riot", "raven", "shadow", "cinder"],
    tips: [
      { h: "Short and hard", p: "Edgy reads best with one short, punchy word — venom, rogue, hex — not a phrase. One syllable or two, ending on a hard consonant, lands strongest." },
      { h: "Bold or gothic fonts", p: "Pair the edgy ornaments with a bold, fraktur (gothic) or double-struck font. Thin script undercuts the vibe. The 『 』 Japanese bracket adds an instant esports look." },
      { h: "Keep it original", p: "Daggers and brackets are fine everywhere, but don't use fancy Unicode to imitate a known player or brand name — that's impersonation and can get you reported. Build your own tag." },
    ],
    faqs: [
      { q: "What are good edgy username ideas?", a: "A short dark word — venom, wraith, rogue, cinder — in a bold or gothic font, wrapped in a dagger (†), lightning (⌁) or Japanese bracket (『 』). The examples on this page are generated from exactly that recipe; roll the generator for more." },
      { q: "Are edgy symbols allowed in gaming names?", a: "Daggers, brackets and lightning are cosmetic Unicode and allowed on Discord, Steam, Roblox and most game display names. Skull and dagger glyphs are fine; what platforms ban is impersonation or slurs, not the decoration itself." },
      { q: "Why does my edgy font look plain in some games?", a: "A few games strip Unicode to ASCII in certain fields (especially @handles and leaderboards). The fancy version always shows in display names and chat; if a field flattens it, that field is ASCII-only by design." },
      { q: "What font goes with an edgy username?", a: "Gothic / fraktur (𝔵), bold (𝐱), and double-struck (𝕩) carry the edgy vibe best. Avoid script and bubble fonts — they read soft. The generator's Edgy vibe already biases toward these heavier ornaments." },
    ],
    related: ["discord", "roblox", "y2k", "aesthetic"],
  },
  {
    slug: "soft",
    kind: "vibe",
    vibe: "soft",
    name: "Soft",
    h1: "Soft Usernames",
    title: "Soft Usernames — Gentle Aesthetic Ideas",
    description:
      "Gentle soft usernames with petals, swans and wishing-star accents. Browse 100+ ideas or generate your own from any name — one click to copy for any bio or profile.",
    tagline: "Gentle names with ❀ petals, 🦢 swans and ✩ wishing stars.",
    intro: [
      "Soft usernames are the quietest of the aesthetic family — petals (❀), a single swan (🦢), wishing-star trails (*ੈ✩‧₊˚) and airy fonts. Where 'aesthetic' leans celestial and 'cute' leans playful, 'soft' leans pastel and gentle, like a cottagecore mood board turned into a handle.",
      "The seeds here are calm nature words (cotton, petal, meadow, dove, clover) wrapped in the soft ornament pack. Use one directly or generate your own. It's all Unicode text — a single click copies it into your bio.",
    ],
    seeds: ["cotton", "petal", "marsh", "dove", "linen", "meadow", "fawn", "clover", "misty", "poppy", "breeze", "juniper"],
    tips: [
      { h: "Pastel words, light fonts", p: "Nature and texture words (cotton, linen, meadow) carry the soft mood. Pair with italic or thin script — never bold. The goal is barely-there." },
      { h: "One ornament, lots of space", p: "Soft names breathe. A single ❀ or a short wishing-star trail on one side is plenty; symmetric heavy wrapping reads less soft, more decorated." },
      { h: "Great for cottagecore bios", p: "This vibe pairs naturally with cottagecore and fairycore aesthetics — see the aesthetic pages for matching bio symbols and dividers to complete the profile." },
    ],
    faqs: [
      { q: "What is a soft username?", a: "A gentle, pastel-leaning handle: a calm nature word (cotton, dove, clover) in a light italic or script font, with a single delicate ornament like a petal (❀) or wishing star (✩). It's the quietest, most understated corner of aesthetic usernames." },
      { q: "How is soft different from aesthetic or cute?", a: "All three are gentle, but soft leans pastel and minimal (petals, swans), aesthetic leans celestial (stars, moons), and cute leans playful (hearts, kawaii faces). Many people mix them — the generator lets you switch vibes and compare." },
      { q: "Where do soft usernames look best?", a: "Instagram and Pinterest bios, Tumblr, soft-aesthetic Discord servers, and any profile going for a cottagecore or fairycore mood. They're real Unicode, so they paste into any display name or bio field." },
      { q: "Can I match a soft username to my bio?", a: "Yes — keep the same ornament across your name and bio dividers. Our aesthetic and bio-template pages have matching petals, stars and dividers so the whole profile reads as one soft set." },
    ],
    related: ["aesthetic", "cute", "instagram", "tiktok"],
  },
  {
    slug: "y2k",
    kind: "vibe",
    vibe: "y2k",
    name: "Y2K",
    h1: "Y2K Usernames",
    title: "Y2K Usernames — 2000s Aesthetic Name Ideas",
    description:
      "Retro Y2K usernames with shooting stars, sparkles and bubble fonts. Browse 100+ 2000s-aesthetic ideas or generate your own — one click to copy for TikTok, Insta, Discord.",
    tagline: "2000s-core names with ★彡 shooting stars and bubble fonts.",
    intro: [
      "Y2K usernames revive the early-2000s internet look — shooting stars (★彡), anime sparkles (゚:✧), bubble and full-width fonts, and a hint of MySpace-era chaos. It's nostalgic, glittery and a little ironic, which is exactly why it's everywhere on TikTok and Instagram again.",
      "The seeds lean retro-digital (cyber, glitter, pixel, neon, matrixx) and pair with the Y2K ornament pack. Generate your own from any name for a matching set. Everything copies as plain Unicode into your display name or bio.",
    ],
    seeds: ["cyber", "glitter", "starz", "pixel", "neon", "blink", "cherri", "angelz", "matrixx", "frutiger", "disco", "sparkle"],
    tips: [
      { h: "Spell it 2000s", p: "Swap s→z (starz, angelz), double letters (matrixx), and lean digital (cyber, pixel, neon). Deliberate 'wrong' spelling is the whole Y2K joke." },
      { h: "Bubble + full-width fonts", p: "Pair Y2K ornaments with bubble (ⓢ) or full-width (ｓ) fonts for the chunky early-web feel. The ★彡 shooting star and ◤ ◥ checker brackets are the signature accents." },
      { h: "Big on short-form video", p: "Y2K reads strongest on TikTok and Instagram display names. Combine with a retro emoji combo from our emoji-combos pages for a full 2000s-core profile." },
    ],
    faqs: [
      { q: "What is a Y2K username?", a: "A handle styled after early-2000s internet culture: intentional 'z' spellings (starz, angelz), bubble or full-width fonts, and glittery accents like shooting stars (★彡) and anime sparkles (゚:✧). It's nostalgia for the MySpace / Frutiger Aero era." },
      { q: "How do I make a Y2K name?", a: "Take a short word, give it a 2000s respelling (s→z, doubled letters), then add a Y2K ornament. Type it into the generator, pick the Y2K vibe, and roll — the examples here were made the same way." },
      { q: "Where is the Y2K aesthetic popular?", a: "TikTok and Instagram, mostly — it's a dominant short-form-video look right now. It also fits Discord servers and Spotify display names going for a retro-digital mood." },
      { q: "What fonts are Y2K?", a: "Bubble / circled (ⓧ), full-width (ｘ), and bold all fit the chunky early-web feel. The generator's Y2K vibe biases ornaments toward stars and sparkles to complete the look." },
    ],
    related: ["aesthetic", "cute", "tiktok", "instagram"],
  },

  // ───────────────────────── PLATFORM PAGES ─────────────────────────
  {
    slug: "discord",
    kind: "platform",
    name: "Discord",
    h1: "Discord Username Ideas",
    title: "Discord Username Ideas — Fancy Name Generator",
    description:
      "Discord username & display-name ideas with fancy fonts and symbols. Browse 100+ or generate your own — one click to copy. Plus the real rules for handles vs display names.",
    tagline: "Fancy display-name ideas + the real handle vs display-name rules.",
    intro: [
      "Discord splits your identity in two: a lowercase @username (your unique handle, ASCII only) and a display name (what people actually see, full Unicode). That means you can run a fancy, decorated name in chat and servers even though your handle stays plain — and that's exactly where these ideas go.",
      "The examples below mix gaming-friendly words (nova, echo, ghost, void) across every ornament pack, so you can scan vibes side by side. Type your own name into the generator for a fresh set, then paste it into Settings → Profile → Display Name.",
    ],
    seeds: ["nova", "echo", "ghost", "rin", "kuro", "zephyr", "quill", "void", "lumi", "sable", "koda", "wisp"],
    tips: [
      { h: "Handle vs display name", p: "Your @username must be lowercase letters, numbers, period or underscore. Your display name (Settings → Profile) accepts full Unicode — fancy fonts, hearts, daggers, all of it. Decorate the display name, not the handle." },
      { h: "32-character limit", p: "Discord display names cap at 32 characters. Some ornaments and emoji count as 2+ characters, so a heavily decorated long name can hit the limit — trim the base word if it won't save." },
      { h: "Per-server nicknames", p: "You can set a different decorated nickname in each server (right-click your name → Edit Server Profile). Handy for matching a server's aesthetic without changing your global name." },
      { h: "Don't impersonate", p: "Cosmetic Unicode is allowed; using look-alike characters to imitate a mod, admin or another member is against Discord's rules. Keep your name original." },
    ],
    faqs: [
      { q: "How do I get a fancy Discord username?", a: "Generate a styled name above, copy it, then in Discord go to Settings → Profile → Display Name and paste. The display name takes full Unicode — fonts, hearts, daggers — even though your @username handle stays lowercase ASCII." },
      { q: "Why can't I paste fancy text into my Discord @username?", a: "The @username is a unique handle restricted to lowercase letters, numbers, periods and underscores. Fancy Unicode only works in the display name and server nicknames — which is what everyone sees anyway." },
      { q: "What's the Discord display name character limit?", a: "32 characters. Note some glyphs count as more than one — emoji are usually 2, combining marks add up — so a long decorated name may exceed 32 even if it looks shorter. Use the character counter to check." },
      { q: "Can I have a different name in each server?", a: "Yes. Right-click your name in a server → Edit Server Profile → set a Nickname. It can be fully decorated and is separate from your global display name, so you can match each server's vibe." },
    ],
    related: ["edgy", "aesthetic", "cute", "roblox"],
  },
  {
    slug: "roblox",
    kind: "platform",
    name: "Roblox",
    h1: "Roblox Username Ideas",
    title: "Roblox Username Ideas — Cool & Cute Names",
    description:
      "Roblox display-name ideas — cool, cute and aesthetic. Browse 100+ or generate your own from any name. Plus the real Roblox username vs display-name rules and limits.",
    tagline: "Cool & cute display-name ideas + the real Roblox name rules.",
    intro: [
      "Roblox, like Discord, separates your permanent @username from a changeable display name. Your display name can use Unicode decoration (within limits), so you can run a cute or cool styled name above your account without changing the handle your friends search for.",
      "The examples lean playful and gaming-friendly (pixel, cookie, frost, cosmo) across all ornament packs so you can compare cute, edgy and aesthetic at a glance. Generate your own from any name, then set it under Account → Display Name.",
    ],
    seeds: ["pixel", "cookie", "zynx", "frost", "mango", "slime", "turbo", "jelly", "cosmo", "bubbles", "sprout", "waffle"],
    tips: [
      { h: "20-character display limit", p: "Roblox display names cap at 20 characters — the tightest of the major platforms. Decorated names fill up fast, so favour a short base word and a light ornament (♡, ✦, ★) over long sparkle trails." },
      { h: "Display name vs @username", p: "Your @username is permanent-ish and ASCII; your display name can be changed (limited free changes) and accepts Unicode. Style the display name." },
      { h: "Emoji may not render", p: "Roblox filters and renders a limited set — some emoji ornaments show as blanks in-game. The text-symbol packs (hearts, stars, brackets) are far more reliable than emoji packs here." },
      { h: "Names are moderated", p: "Roblox runs strict text moderation, especially for younger accounts. Keep it clearly clean — decorative symbols are fine, but anything that reads as bypassing a filter can be rejected." },
    ],
    faqs: [
      { q: "Can I use a fancy display name on Roblox?", a: "Yes — Roblox display names accept Unicode fonts and symbols, within the 20-character limit and content moderation. Generate one above, copy it, then set it under Account Settings → Display Name." },
      { q: "What's the Roblox display name length limit?", a: "20 characters, the shortest among the big platforms. Fancy fonts and ornaments eat into that quickly, so pick a short base word and a single light ornament rather than a long trail." },
      { q: "Why do some symbols show as blank squares in Roblox?", a: "Roblox renders a limited glyph set and filters some characters. Emoji-based ornaments are the usual culprits. Stick to text symbols — hearts (♡), stars (★, ✦) and brackets (『 』) — which render reliably in-game." },
      { q: "Do fancy names get moderated on Roblox?", a: "Names pass through Roblox's text filter. Decorative Unicode is allowed, but the system is strict (especially on under-13 accounts) and will reject anything that looks like it's evading the filter. Keep it clean and original." },
    ],
    related: ["cute", "edgy", "discord", "y2k"],
  },
  {
    slug: "tiktok",
    kind: "platform",
    name: "TikTok",
    h1: "TikTok Username Ideas",
    title: "TikTok Username Ideas — Aesthetic Generator",
    description:
      "Aesthetic TikTok name ideas with fancy fonts and symbols. Browse 100+ or generate your own. Plus the real difference between your TikTok @username and display name.",
    tagline: "Aesthetic display-name ideas + the @username vs nickname rules.",
    intro: [
      "On TikTok your @username (the unique handle) is ASCII only — letters, numbers, periods and underscores — but your nickname (display name) accepts Unicode fonts and symbols. That's where an aesthetic, fancy TikTok name lives, and it's the name that shows large on your profile.",
      "The examples skew aesthetic and soft (luna, aura, honey, skye) across the ornament packs, matching the most popular TikTok name vibe. Type your own and roll for a set, then paste it into Profile → Edit profile → Name.",
    ],
    seeds: ["luna", "aura", "vibe", "star", "honey", "cherry", "sunny", "ari", "mia", "skye", "remi", "juno"],
    tips: [
      { h: "Nickname takes Unicode, @handle doesn't", p: "Decorate your nickname (the 'Name' field), not your @username. The @handle must stay ASCII; the nickname is what shows big on your profile and accepts fancy fonts and symbols." },
      { h: "Aesthetic & soft win on TikTok", p: "The dominant TikTok name look is soft/aesthetic — light fonts with a star or sparkle. Save the heavy edgy ornaments for gaming; here, less is more." },
      { h: "Pair with matching symbols", p: "Add a small symbol set to your bio that matches your name's ornament. Our /symbols-for/tiktok and aesthetic pages have palettes that complete the profile." },
    ],
    faqs: [
      { q: "How do I get an aesthetic TikTok name?", a: "Generate a styled name above, copy it, then go to Profile → Edit profile → Name and paste it into the Name (nickname) field — not the username field. The nickname accepts Unicode fonts and symbols." },
      { q: "Why won't fancy text work in my TikTok @username?", a: "TikTok @usernames are restricted to letters, numbers, periods and underscores (ASCII). Fancy Unicode only works in your nickname/display name, which is the larger name shown on your profile anyway." },
      { q: "What's the most popular TikTok username style?", a: "Soft and aesthetic — a short lowercase word in a light font with a single star or sparkle (˚₊‧ luna ‧₊˚). It reads clean on mobile. The Aesthetic and Soft vibes in the generator target exactly this look." },
      { q: "Can I change my TikTok name often?", a: "Your nickname can be changed freely, so experiment with decorated versions any time. Your @username can only be changed once every 30 days, so set that carefully — but the fancy part is the nickname, which you can re-roll whenever." },
    ],
    related: ["aesthetic", "soft", "y2k", "instagram"],
  },
  {
    slug: "instagram",
    kind: "platform",
    name: "Instagram",
    h1: "Instagram Username Ideas",
    title: "Instagram Username Ideas — Aesthetic Generator",
    description:
      "Aesthetic Instagram name ideas with fancy fonts and symbols. Browse 100+ or generate your own. Plus how the @handle, display name and bio fonts actually differ.",
    tagline: "Aesthetic name & bio ideas + how the @handle vs name differ.",
    intro: [
      "Instagram gives you an ASCII-only @handle and a separate display name that accepts Unicode — plus a bio where fancy fonts shine. The styled name and bio are what give a profile its aesthetic, even though the @handle underneath stays plain letters and dots.",
      "The seeds here are short, clean name-words (ari, mira, wren, isla) across the ornament packs, matching Instagram's aesthetic-leaning norm. Generate your own for a set, then paste it into Edit profile → Name (and grab matching bio symbols from the linked pages).",
    ],
    seeds: ["ari", "mira", "jude", "noir", "sol", "wren", "kai", "eve", "romy", "theo", "isla", "faye"],
    tips: [
      { h: "Name field, not @username", p: "Put the fancy version in the 'Name' field (Edit profile → Name), which accepts Unicode and is searchable. The @username stays lowercase letters, numbers, periods and underscores." },
      { h: "Bio fonts complete the look", p: "Instagram bios render fancy Unicode fonts too. Match your name's font in the bio for a cohesive aesthetic — our fancy-text and aesthetic-bio pages have ready palettes." },
      { h: "Keep it readable", p: "Instagram's name field is searchable, so overly heavy Zalgo or dense combining marks can hurt discoverability. A clean fancy font plus one ornament is the sweet spot." },
    ],
    faqs: [
      { q: "How do I add a fancy font to my Instagram name?", a: "Generate a styled name above, copy it, then go to Edit profile → Name and paste. The Name field accepts Unicode fonts and symbols. Your @username (handle) stays ASCII and is separate." },
      { q: "Can I use symbols in my Instagram @handle?", a: "No. The @username allows only letters, numbers, periods and underscores. Fancy fonts and symbols work in your Name field and bio — which is where the aesthetic actually shows." },
      { q: "What's a good aesthetic Instagram name idea?", a: "A short clean word (ari, wren, isla) in a light font with one delicate ornament (˚₊‧ ‧₊˚ or ⋆). Keep it readable since the Name field is searchable. The Aesthetic and Soft vibes target this exact look." },
      { q: "How do I match my name and bio fonts?", a: "Use the same font style for both. Generate the name here, then head to our fancy-text page, apply the same style to your bio lines, and add matching divider symbols from the aesthetic-bio page." },
    ],
    related: ["aesthetic", "soft", "tiktok", "cute"],
  },
];

const _bySlug = new Map(USERNAME_IDEAS.map((p) => [p.slug, p]));
export function getUsernameIdea(slug: string): UsernameIdeaPage | undefined {
  return _bySlug.get(slug);
}

export interface UsernameExample {
  text: string;
  style: string;
  ornament: string;
}

// Deterministic example builder — NO Math.random, so the server-rendered HTML
// is byte-stable across builds (good for caching + clean diffs). Combines the
// page's seeds with the STYLES table and the appropriate ornament pool using
// index arithmetic, then de-dupes. A per-page offset (derived from the slug
// length) keeps pages with overlapping seeds from producing identical lists.
export function buildExamples(page: UsernameIdeaPage, n = 24): UsernameExample[] {
  const pool =
    page.kind === "vibe" && page.vibe
      ? ORNAMENTS.filter((o) => o.vibe === page.vibe || o.vibe === "none")
      : ORNAMENTS;
  const offset = page.slug.length;
  const out: UsernameExample[] = [];
  const seen = new Set<string>();

  for (let i = 0; out.length < n && i < n * 8; i++) {
    const seed = page.seeds[i % page.seeds.length];
    const style = STYLES[(i * 5 + offset) % STYLES.length];
    const orn = pool[(i * 3 + offset) % pool.length];
    const text = orn.wrap(style.transform(seed));
    if (seen.has(text)) continue;
    seen.add(text);
    out.push({ text, style: style.label, ornament: orn.label });
  }
  return out;
}
