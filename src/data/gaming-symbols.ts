// Gaming name symbols — decorative Unicode characters + ready-made stylized
// name templates that mobile/PC gamers paste into in-game usernames and clan
// tags. Powers /gaming-symbols (hub) + /gaming-symbols/[slug] (16 spokes).
//
// 10 games (Free Fire, PUBG, BGMI, COD, Valorant, Mobile Legends, Fortnite,
// Minecraft, Roblox, Clash of Clans) + 6 styles (clan-tag brackets, swords,
// skulls, crowns, wings, sweaty/tryhard). Every glyph is a real, assigned,
// renderable Unicode character (machine-verified: no Private Use Area, no
// unassigned code points, no U+FFFD). nameExamples use the literal placeholder
// NAME where the player drops their own name.
//
// Data compiled + verified 2026-05-31.

export interface GamingFaq {
  q: string;
  a: string;
}

export interface GamingSymbolSet {
  /** URL slug, e.g. "free-fire". */
  slug: string;
  /** Display name, e.g. "Free Fire". */
  name: string;
  /** "game" = a specific game; "style" = a themed symbol collection. */
  kind: "game" | "style";
  tagline: string;
  /** Copyable decorative characters for this set. */
  symbols: string[];
  /** Ready-to-use stylized name templates (contain the placeholder NAME). */
  nameExamples: string[];
  /** Unique intro paragraph. */
  intro: string;
  /** Set-specific FAQs (visible text == FAQPage schema). */
  faqs: GamingFaq[];
  /** Search phrases for keyword targeting. */
  keywords: string[];
}

export const GAMING_SYMBOL_SETS: GamingSymbolSet[] = [
  {
    "slug": "free-fire",
    "name": "Free Fire",
    "kind": "game",
    "tagline": "Stylish symbols for your Free Fire name",
    "symbols": [
      "꧁",
      "꧂",
      "༒",
      "☬",
      "⚔",
      "☠",
      "♛",
      "♕",
      "★",
      "✰",
      "✦",
      "✯",
      "⚡",
      "☇",
      "⚜",
      "➻",
      "❥",
      "™",
      "乡",
      "丿",
      "々",
      "〆",
      "ツ",
      "シ",
      "╰",
      "╮",
      "〖",
      "〗",
      "「",
      "」",
      "『",
      "』",
      "⛧",
      "彡",
      "气",
      "卄",
      "の",
      "ノ",
      "刀",
      "ϟ",
      "⫷",
      "⫸",
      "ᴹ",
      "ᴿ",
      "☥",
      "✠",
      "☯",
      "⚝",
      "ᵗ",
      "꧅"
    ],
    "nameExamples": [
      "꧁༒NAME༒꧂",
      "꧁☬NAME☬꧂",
      "彡[NAME]彡",
      "ᴹᴿ•NAME",
      "乡NAME乡",
      "꧁⚔NAME⚔꧂",
      "➻❥NAME",
      "卄NAME",
      "シNAMEツ",
      "「NAME」ツ",
      "༒࿗NAME࿗༒",
      "NAME™"
    ],
    "intro": "These are the decorative symbols Free Fire players paste into the in-game name field to stand out in Booyah lobbies and guild tags. Free Fire renames cost a Name Change Card (sold in the store for 390 diamonds, occasionally given free), and the name field is short — roughly twenty characters — so most players combine one wing pair with two or three accent glyphs rather than a long string. The in-game keyboard accepts many of these special characters directly, which is why the ꧁༒☬ wing style became iconic in FF.",
    "faqs": [
      {
        "q": "How do I change my name in Free Fire with symbols?",
        "a": "Tap your avatar, open the profile/edit screen, and paste a name containing these symbols into the name box. You need a Name Change Card, available for 390 diamonds in the store (sometimes handed out free during events). Paste the full stylized string before confirming, since the card is consumed on each successful change."
      },
      {
        "q": "Why do some Free Fire symbols show as a box or question mark?",
        "a": "Free Fire's font does not support every Unicode glyph, so unsupported characters render as a hollow box. Stick to widely-rendered glyphs like ꧁ ꧂ ༒ ☬ ⚔ ★ and the katakana ツ シ, which display reliably on both Android and iOS builds."
      },
      {
        "q": "How many characters can a Free Fire name be?",
        "a": "The name field is limited to around twenty characters and is checked for uniqueness, so a name may be rejected if it is taken. Because wing symbols and brackets each eat into that budget, keep the actual letters short so the full decorated string fits."
      }
    ],
    "keywords": [
      "free fire name symbols",
      "stylish symbols for free fire",
      "free fire stylish name",
      "ff name symbols copy paste",
      "free fire guild name symbols"
    ]
  },
  {
    "slug": "pubg",
    "name": "PUBG",
    "kind": "game",
    "tagline": "Cool symbols for PUBG names and clans",
    "symbols": [
      "༒",
      "☬",
      "⚔",
      "☠",
      "♛",
      "♕",
      "♔",
      "★",
      "✦",
      "✯",
      "⚡",
      "⚜",
      "➻",
      "❥",
      "™",
      "乡",
      "丿",
      "々",
      "〆",
      "ツ",
      "ジ",
      "シ",
      "卄",
      "の",
      "刀",
      "气",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "꧁",
      "꧂",
      "⛧",
      "✠",
      "☇",
      "ᴹ",
      "ᴿ",
      "ᴷ",
      "ᴰ",
      "✩",
      "✪",
      "⚝",
      "⫷",
      "⫸",
      "҂",
      "⊰",
      "⊱"
    ],
    "nameExamples": [
      "꧁ঔৣ☬NAME☬ঔৣ꧂",
      "彡NAME彡",
      "ᴷᴰ•NAME",
      "乡NAME乡",
      "【NAME】",
      "☬࿐NAME",
      "➻❥NAME",
      "꧁༒NAME༒꧂",
      "シNAMEツ",
      "NAME࿐",
      "「NAME」ツ",
      "乛NAME乛"
    ],
    "intro": "PUBG (global PC/console and the international mobile build) attracts long stylized callsigns and clan tags, and these symbols are the ones players paste into the rename box. On PUBG Mobile a rename uses a Rename Card — granted once free to new accounts, then purchasable with UC — and the input field accepts decorative Unicode, though the anti-cheat name filter strips or rejects some glyphs. The classic PUBG look pairs a wing frame with sweeping 彡 and 乡 strokes plus a superscript clan prefix.",
    "faqs": [
      {
        "q": "How do I use a Rename Card in PUBG Mobile?",
        "a": "Open Inventory, find the Rename Card, tap Use, then paste your symbol name into the field. New accounts get one free card; after that you buy them with UC. The card only applies once you confirm, so verify the symbols display correctly first."
      },
      {
        "q": "Why does PUBG reject my symbol name?",
        "a": "PUBG runs a name filter that blocks certain control characters, look-alike spoofing glyphs, and overly long combining sequences, so some pasted names are refused. If yours is rejected, remove stacked diacritics and exotic glyphs and keep to common ones like ༒ ☬ ⚔ ★ ツ and bracket pairs."
      },
      {
        "q": "Can I put a clan tag with symbols in PUBG?",
        "a": "Clan (and crew) tags have a tighter character limit than personal names and are even more aggressively filtered, so short bracket frames like 【NAME】 or a superscript prefix such as ᴷᴰ work far better than full wing strings inside a tag."
      }
    ],
    "keywords": [
      "pubg name symbols",
      "stylish symbols for pubg",
      "pubg clan name symbols",
      "pubg stylish name",
      "symbols for pubg name copy paste"
    ]
  },
  {
    "slug": "bgmi",
    "name": "BGMI",
    "kind": "game",
    "tagline": "Stylish BGMI name and clan symbols",
    "symbols": [
      "꧁",
      "꧂",
      "༒",
      "☬",
      "⚔",
      "☠",
      "♛",
      "♕",
      "★",
      "✦",
      "✯",
      "⚡",
      "⚜",
      "➻",
      "❥",
      "™",
      "乡",
      "丿",
      "々",
      "〆",
      "ツ",
      "シ",
      "ジ",
      "卄",
      "の",
      "刀",
      "气",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "⛧",
      "✠",
      "☇",
      "ᴹ",
      "ᴿ",
      "ᴮ",
      "ᴳ",
      "ᴵ",
      "✩",
      "⚝",
      "⫷",
      "⫸",
      "⊰",
      "⊱",
      "꧅"
    ],
    "nameExamples": [
      "꧁༒☬NAME☬༒꧂",
      "ᴮᴳᴹᴵ•NAME",
      "彡NAME彡",
      "乡NAME乡",
      "【NAME】",
      "☬࿐NAME",
      "➻❥NAME",
      "꧁ঔৣNAMEঔৣ꧂",
      "シNAMEツ",
      "NAME࿐",
      "「NAME」",
      "乛NAME乛"
    ],
    "intro": "BGMI (Battlegrounds Mobile India, Krafton's India build of PUBG Mobile) shares the same engine, so its stylish-name culture is identical — wing frames, 彡 sweeps and superscript clan prefixes pasted into the rename box. A BGMI rename uses a Rename Card: new accounts get one free, after which cards are bought with UC, and the in-game name filter strips or refuses certain glyphs just as PUBG Mobile does. The BGMI scene leans heavily on ꧁༒☬ wings and the ᴮᴳᴹᴵ superscript tag style.",
    "faqs": [
      {
        "q": "How do I change my BGMI name with stylish symbols?",
        "a": "Open Inventory, use a Rename Card, and paste your decorated name into the field. The first card is free for new accounts; further changes cost UC. Confirm only after the symbols preview correctly, since the card is consumed on a successful change."
      },
      {
        "q": "Which symbols work safely in BGMI?",
        "a": "Stick to glyphs the BGMI font renders cleanly: ꧁ ꧂ ༒ ☬ ⚔ ★ ✦, the katakana ツ シ, and bracket frames. Heavy stacked combining marks and rare glyphs are the usual cause of a name being rejected or showing as a box."
      },
      {
        "q": "Can my BGMI clan tag use these symbols?",
        "a": "Clan tags are short and filtered more strictly than personal names, so a compact frame like 【NAME】 or a superscript prefix such as ᴮᴳᴹᴵ fits better than a full wing string. Test the tag in the clan-edit screen before committing."
      }
    ],
    "keywords": [
      "bgmi name symbols",
      "stylish symbols for bgmi",
      "bgmi stylish name",
      "bgmi clan name symbols",
      "bgmi name symbols copy paste"
    ]
  },
  {
    "slug": "call-of-duty",
    "name": "Call of Duty",
    "kind": "game",
    "tagline": "Sweaty symbols for COD names and clans",
    "symbols": [
      "⚔",
      "☠",
      "☬",
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "☇",
      "⚜",
      "➻",
      "❥",
      "™",
      "卐",
      "卍",
      "⛧",
      "✠",
      "†",
      "‡",
      "♛",
      "♕",
      "♔",
      "ᴷ",
      "ᴰ",
      "ᴹ",
      "ᴿ",
      "ᵗ",
      "ᵐ",
      "乡",
      "彡",
      "「",
      "」",
      "【",
      "】",
      "꧁",
      "꧂",
      "༒",
      "ϟ",
      "҂",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "✟",
      "✝",
      "☯",
      "⚙",
      "⚝",
      "ツ",
      "シ"
    ],
    "nameExamples": [
      "xXNAMEXx",
      "꧁☬NAME☬꧂",
      "ᴷᴰ•NAME",
      "[NAME]ツ",
      "NAME™",
      "彡NAME彡",
      "☠NAME☠",
      "【NAME】",
      "➻❥NAME",
      "꧁⚔NAME⚔꧂",
      "ϟNAMEϟ",
      "乡NAME乡"
    ],
    "intro": "Call of Duty's titles (Modern Warfare, Warzone, Black Ops and the mobile build) all surface a player display name or clan tag, and these symbols are pasted into those fields. Console and PC display names follow Activision's ID format with a discriminator, while clan tags are short and uppercase-leaning, so COD players favor compact frames and aggressive superscript prefixes over long wing strings. Activision's profanity and impersonation filter can reject names, so the safe set skips spoofing glyphs.",
    "faqs": [
      {
        "q": "Can I use symbols in my Activision / COD display name?",
        "a": "The Activision ID accepts many Unicode symbols, but the name is paired with a numeric discriminator and is run through a profanity and impersonation filter, so refused names usually contain blocked words or look-alike spoof characters rather than decorative glyphs like ⚔ ★ ☠."
      },
      {
        "q": "How long can a COD clan tag be?",
        "a": "Clan tags are only a handful of characters — far shorter than a display name — so they suit a tight bracket frame such as [NAME] or a superscript prefix like ᴷᴰ rather than a full ꧁༒☬ wing string, which will not fit."
      },
      {
        "q": "Why do my COD symbols look different on console vs PC?",
        "a": "Each platform renders names with its own system font, so a glyph that looks sharp on PC may appear thinner or boxed on console. Favor universally supported symbols (★ ☠ ⚔ † and superscript letters) for a consistent look across platforms."
      }
    ],
    "keywords": [
      "cod name symbols",
      "call of duty clan tag symbols",
      "cod stylish name",
      "warzone name symbols",
      "cod symbols copy paste"
    ]
  },
  {
    "slug": "valorant",
    "name": "Valorant",
    "kind": "game",
    "tagline": "Riot ID symbols and tagline styles",
    "symbols": [
      "⚔",
      "☠",
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "☇",
      "⚜",
      "➻",
      "❥",
      "™",
      "♛",
      "♕",
      "♔",
      "ᴹ",
      "ᴿ",
      "ᵗ",
      "ᵛ",
      "乡",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "꧁",
      "꧂",
      "༒",
      "☬",
      "⛧",
      "✠",
      "†",
      "ϟ",
      "҂",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "✟",
      "☯",
      "⚝",
      "✩",
      "ツ",
      "シ",
      "ジ",
      "の",
      "卄"
    ],
    "nameExamples": [
      "NAME #VLR",
      "彡NAME彡",
      "ᴹᴿ NAME",
      "꧁☬NAME☬꧂",
      "[NAME] #1337",
      "NAME™",
      "➻❥NAME",
      "乡NAME乡",
      "「NAME」",
      "☠NAME☠",
      "NAME #ace",
      "ϟNAMEϟ"
    ],
    "intro": "Valorant uses a Riot ID, which is a display name plus a hashtag tagline (for example NAME #VLR), and both parts surface in the killfeed and on your card. The display name allows a range of Unicode symbols, but the tagline is restricted to a short alphanumeric set after the #, so the decorative glyphs go in the name portion while the tagline stays plain. Riot's name policy and Vanguard-era filtering reject impersonation and slurs, so the safe palette avoids spoofing look-alikes.",
    "faqs": [
      {
        "q": "Can I put symbols in my Valorant Riot ID?",
        "a": "The display-name portion of a Riot ID accepts many decorative symbols like ⚔ ★ ☠ and bracket frames, but the tagline after the # is limited to a short alphanumeric string, so keep the fancy glyphs in the name and use plain characters for the tag."
      },
      {
        "q": "How often can I change my Valorant name?",
        "a": "Riot ID changes are managed through your Riot account settings and are rate-limited (you cannot rename repeatedly in quick succession), so decide on your final symbol layout before applying rather than experimenting live."
      },
      {
        "q": "Why was my Valorant name rejected?",
        "a": "Riot's name policy blocks slurs, impersonation, and confusable spoof characters, so a refused name usually contains a banned word or look-alike glyph. Decorative symbols such as ✦ ✯ † and superscript letters generally pass."
      }
    ],
    "keywords": [
      "valorant name symbols",
      "riot id symbols",
      "valorant stylish name",
      "valorant tagline ideas",
      "valorant name symbols copy paste"
    ]
  },
  {
    "slug": "mobile-legends",
    "name": "Mobile Legends",
    "kind": "game",
    "tagline": "MLBB name and squad tag symbols",
    "symbols": [
      "꧁",
      "꧂",
      "༒",
      "☬",
      "⚔",
      "☠",
      "♛",
      "♕",
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "⚜",
      "➻",
      "❥",
      "™",
      "乡",
      "丿",
      "々",
      "〆",
      "ツ",
      "シ",
      "ジ",
      "卄",
      "の",
      "刀",
      "气",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "⛧",
      "✠",
      "☇",
      "ᴹ",
      "ᴿ",
      "✩",
      "⚝",
      "⫷",
      "⫸",
      "⊰",
      "⊱",
      "꧅",
      "ღ",
      "☯",
      "✟"
    ],
    "nameExamples": [
      "꧁༒NAME༒꧂",
      "彡NAME彡",
      "乡NAME乡",
      "【NAME】",
      "☬࿐NAME",
      "➻❥NAME",
      "꧁☬NAME☬꧂",
      "シNAMEツ",
      "「NAME」",
      "ღNAMEღ",
      "NAME™",
      "卄NAME"
    ],
    "intro": "Mobile Legends: Bang Bang (MLBB) players paste these symbols into both their personal IGN and their squad name. A name change uses a Rename Card — given once free to new accounts, then bought with Diamonds — and MLBB supports the wing-and-bracket style well, which is why ꧁༒☬ frames are everywhere in ranked. Squad tags are shorter and shown beside your name in-match, so they favor compact frames over long decorated strings.",
    "faqs": [
      {
        "q": "How do I change my Mobile Legends name with symbols?",
        "a": "Open your profile, tap the edit (pencil) icon by your name, and paste the symbol string. The first Rename Card is free for new accounts; afterward you buy one with Diamonds. Confirm only once the preview renders correctly, as the card is consumed on a successful change."
      },
      {
        "q": "Why do some MLBB symbols not show up?",
        "a": "MLBB's font does not cover every glyph, so unsupported characters appear as a box or are stripped on submit. Reliable picks include ꧁ ꧂ ༒ ☬ ⚔ ★ ✦, katakana ツ シ, and the lenticular brackets 【 】."
      },
      {
        "q": "Can my MLBB squad name use these symbols?",
        "a": "Squad names have their own length cap and a filter, and they render in a smaller slot beside your IGN, so a short frame like 【NAME】 or a single wing pair reads more clearly in-match than a dense multi-symbol string."
      }
    ],
    "keywords": [
      "mobile legends name symbols",
      "mlbb stylish name",
      "mobile legends symbols copy paste",
      "mlbb squad name symbols",
      "stylish symbols for mobile legends"
    ]
  },
  {
    "slug": "fortnite",
    "name": "Fortnite",
    "kind": "game",
    "tagline": "Allowed symbols for Fortnite display names",
    "symbols": [
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "☇",
      "⚜",
      "➻",
      "❥",
      "™",
      "♛",
      "♕",
      "♔",
      "ᴹ",
      "ᴿ",
      "ᵗ",
      "ᵛ",
      "ⁿ",
      "乡",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "☬",
      "⚔",
      "☠",
      "⛧",
      "✠",
      "†",
      "ϟ",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "✟",
      "☯",
      "⚝",
      "✩",
      "ツ",
      "シ",
      "ジ",
      "の",
      "卄",
      "気",
      "气",
      "㋡",
      "㋛"
    ],
    "nameExamples": [
      "彡NAME彡",
      "NAME™",
      "[NAME]ツ",
      "ᴹᴿ NAME",
      "ⁿNAMEᵗ",
      "【NAME】",
      "➻❥NAME",
      "乡NAME乡",
      "「NAME」",
      "☬NAME☬",
      "NAME ✦",
      "✪NAME✪"
    ],
    "intro": "Fortnite shows your Epic display name above your character and in the lobby, and Epic enforces a fairly strict display-name policy: the name must be unique and is run through a profanity and impersonation filter, so not every symbol is accepted and certain spoof characters are blocked. Players therefore lean on light decoration — a single katakana sweep, a superscript clan prefix, or a 彡 frame — rather than dense wing strings. Renames are limited (Epic caps how often you can change), so pick a layout you will keep.",
    "faqs": [
      {
        "q": "Why won't Fortnite accept my symbol name?",
        "a": "Epic's display-name filter rejects profanity, impersonation, and many confusable or control characters, and it requires the name to be unique. Decorative glyphs like ★ ✦ ツ and superscript letters usually pass, but exotic stacked symbols and look-alike spoofs are commonly refused."
      },
      {
        "q": "How often can I change my Fortnite display name?",
        "a": "Epic limits display-name changes to a set number within a time window, so you cannot rename repeatedly. Finalize your symbol layout before applying rather than testing variations live, or you may use up your allowance."
      },
      {
        "q": "Do symbols in my Fortnite name show to other players?",
        "a": "Yes, your Epic display name with its accepted symbols appears in the lobby, party, and feed across platforms, though each platform's font may render a glyph slightly differently. Favor widely supported symbols for a consistent look everywhere."
      }
    ],
    "keywords": [
      "fortnite name symbols",
      "fortnite sweaty name symbols",
      "symbols for fortnite name",
      "fortnite stylish name",
      "fortnite display name symbols"
    ]
  },
  {
    "slug": "minecraft",
    "name": "Minecraft",
    "kind": "game",
    "tagline": "Color codes and nickname symbols",
    "symbols": [
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "⚜",
      "➻",
      "❥",
      "™",
      "♛",
      "♕",
      "♔",
      "☠",
      "⚔",
      "☬",
      "乡",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "⛧",
      "✠",
      "†",
      "ϟ",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "✟",
      "☯",
      "⚝",
      "✩",
      "ツ",
      "シ",
      "ジ",
      "の",
      "卄",
      "气",
      "㋡",
      "㋛",
      "✚",
      "⚒",
      "⛏",
      "⚓",
      "§"
    ],
    "nameExamples": [
      "§6NAME§r",
      "§l§cNAME",
      "彡NAME彡",
      "[NAME]",
      "✦NAME✦",
      "【NAME】",
      "☠NAME☠",
      "「NAME」",
      "➻❥NAME",
      "乡NAME乡",
      "ツNAMEツ",
      "NAME™"
    ],
    "intro": "Minecraft splits into Java and Bedrock, and that changes what symbols you can use where. Your actual account profile name (the gamertag) is restricted to plain ASCII letters, digits and underscores, so the fancy symbols live in server nicknames, scoreboard tags and chat — many servers apply them via the section-sign color codes (§ followed by a code, like §6 for gold). On Bedrock your in-game nickname allows spaces and more characters than a Java profile name, so the playground for these glyphs is the server side, not the account name itself.",
    "faqs": [
      {
        "q": "Can I put symbols in my actual Minecraft username?",
        "a": "No — your Mojang/Microsoft account profile name (the one others see by default) is limited to A–Z, 0–9 and underscore, 3 to 16 characters. Decorative symbols only work in server nicknames, team tags, books and chat, not in the core profile name."
      },
      {
        "q": "How do the § color codes work in Minecraft?",
        "a": "Type the section sign § followed by a code (0–9, a–f for colors; l for bold, n for underline, o for italic, r to reset) to style text on servers that allow it, e.g. §6NAME§r prints NAME in gold. Bedrock uses the same § system; many clients let you insert § from a sign or book."
      },
      {
        "q": "What's the difference between Java and Bedrock for nicknames?",
        "a": "Java profile names are ASCII-only, while Bedrock gamertags and in-game nicknames permit spaces and a wider character range. On both editions, servers with nickname plugins are where players actually apply symbols like ✦ ★ ☠ and the § color codes."
      }
    ],
    "keywords": [
      "minecraft name symbols",
      "minecraft color codes",
      "minecraft nickname symbols",
      "minecraft section sign codes",
      "symbols for minecraft name"
    ]
  },
  {
    "slug": "roblox",
    "name": "Roblox",
    "kind": "game",
    "tagline": "Display name symbols vs username rules",
    "symbols": [
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "⚜",
      "➻",
      "❥",
      "™",
      "♛",
      "♕",
      "♔",
      "☠",
      "⚔",
      "☬",
      "乡",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "⛧",
      "✠",
      "†",
      "ϟ",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "✟",
      "☯",
      "⚝",
      "✩",
      "ツ",
      "シ",
      "ジ",
      "の",
      "卄",
      "气",
      "㋡",
      "㋛",
      "ღ",
      "❀",
      "❁",
      "✿",
      "☘",
      "✣",
      "✥"
    ],
    "nameExamples": [
      "彡NAME彡",
      "✦NAME✦",
      "【NAME】",
      "☆NAME☆",
      "「NAME」",
      "➻❥NAME",
      "乡NAME乡",
      "ツNAMEツ",
      "NAME™",
      "꧁NAME꧂",
      "ღNAMEღ",
      "✿NAME✿"
    ],
    "intro": "Roblox separates the @username (your permanent, ASCII-only handle used to log in and add friends) from the display name, which is what most players actually see above your avatar. The display name is where symbols go — it allows a wider character set and does not have to be unique — but Roblox runs both through a strict moderation filter aimed at younger players, so anything resembling profanity, contact info or bypass text is blocked. Display-name changes cost Robux after the first free change, so settle your symbol layout first.",
    "faqs": [
      {
        "q": "Can I use symbols in my Roblox username?",
        "a": "No — the @username is restricted to letters, numbers and a single underscore and cannot be changed freely, so symbols are not allowed there. Symbols only work in your display name, which is the larger label shown above your avatar."
      },
      {
        "q": "Why does Roblox block my display name?",
        "a": "Roblox's moderation filter is strict for safety and rejects names that read as profanity, personal information, or filter-bypass attempts even when symbols are mixed in. Plain decorative glyphs like ★ ✦ ✿ ☆ usually pass, but symbol-spelled words that imitate blocked text will be refused."
      },
      {
        "q": "Does changing my Roblox display name cost anything?",
        "a": "Your first display-name change is free; subsequent changes cost Robux and are rate-limited. Because of that, preview your symbol arrangement and confirm it passes moderation before spending Robux on repeated edits."
      }
    ],
    "keywords": [
      "roblox name symbols",
      "roblox display name symbols",
      "aesthetic roblox name symbols",
      "symbols for roblox name",
      "roblox stylish name"
    ]
  },
  {
    "slug": "clash-of-clans",
    "name": "Clash of Clans",
    "kind": "game",
    "tagline": "Clan name and player tag symbols",
    "symbols": [
      "꧁",
      "꧂",
      "༒",
      "☬",
      "⚔",
      "☠",
      "♛",
      "♕",
      "♔",
      "★",
      "✦",
      "✯",
      "✪",
      "⚡",
      "⚜",
      "➻",
      "❥",
      "™",
      "乡",
      "彡",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "⛧",
      "✠",
      "†",
      "ϟ",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "✟",
      "☯",
      "⚝",
      "✩",
      "ツ",
      "シ",
      "ジ",
      "卄",
      "の",
      "气",
      "卐",
      "卍",
      "⚒",
      "⛏",
      "⚓"
    ],
    "nameExamples": [
      "꧁༒NAME༒꧂",
      "彡NAME彡",
      "【NAME】",
      "☬NAME☬",
      "乡NAME乡",
      "➻❥NAME",
      "「NAME」",
      "★NAME★",
      "⚔NAME⚔",
      "NAME™",
      "♛NAME♛",
      "✦NAME✦"
    ],
    "intro": "Clash of Clans players decorate both their player name and, more visibly, their clan name and clan description. A personal name change in CoC is free the first time and then costs Gems, and the name field accepts a good range of Unicode symbols, so wing frames and bracketed tags are common. Clan names are checked against Supercell's content filter and must be unique enough to find in search, so clans often combine a readable word with a single symbol frame rather than a wall of glyphs.",
    "faqs": [
      {
        "q": "How do I change my name in Clash of Clans with symbols?",
        "a": "Go to Settings, tap Change Name, and enter your symbol string. The first change is free; later changes cost Gems and Supercell warns that the very first rename may be permanent on some account types, so choose your symbol layout carefully before confirming."
      },
      {
        "q": "Can my CoC clan name have symbols?",
        "a": "Yes — the clan name field accepts symbols like ꧁ ☬ ⚔ ★ and bracket frames, but it passes through Supercell's profanity filter and needs to stay searchable, so pair a real word with one frame (for example 【NAME】) rather than only symbols."
      },
      {
        "q": "Why do some symbols disappear from my CoC name?",
        "a": "Characters outside the game's supported font set, or sequences caught by the filter, are stripped on submit and show as blanks or boxes. Stick to common, well-rendered glyphs such as ☬ ⚔ ★ ✦ ♛ and the lenticular brackets to avoid losing characters."
      }
    ],
    "keywords": [
      "clash of clans name symbols",
      "coc clan name symbols",
      "coc stylish name",
      "clash of clans symbols copy paste",
      "symbols for coc clan name"
    ]
  },
  {
    "slug": "clan-tag-brackets",
    "name": "Clan Tag Brackets",
    "kind": "style",
    "tagline": "Framing pairs to wrap your clan tag",
    "symbols": [
      "꧁",
      "꧂",
      "༒",
      "☬",
      "〖",
      "〗",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "〘",
      "〙",
      "〚",
      "〛",
      "⦃",
      "⦄",
      "⫷",
      "⫸",
      "⊰",
      "⊱",
      "⛧",
      "︻",
      "︼",
      "︗",
      "︘",
      "﹝",
      "﹞",
      "≼",
      "≽",
      "⪻",
      "⪼",
      "⩹",
      "⩺",
      "↞",
      "↠",
      "彡",
      "乡",
      "〈",
      "〉",
      "《",
      "》",
      "〔",
      "〕"
    ],
    "nameExamples": [
      "꧁NAME꧂",
      "【NAME】",
      "〖NAME〗",
      "「NAME」",
      "『NAME』",
      "⫷NAME⫸",
      "[NAME]",
      "〘NAME〙",
      "꧁☬NAME☬꧂",
      "⊰NAME⊱",
      "︻NAME︼",
      "彡[NAME]彡"
    ],
    "intro": "Clan-tag brackets are the framing pairs players wrap around a name or squad tag to make it look enclosed and official. The collection centers on opening/closing pairs — the Javanese rerenggan wings ꧁ ꧂, CJK lenticular and corner brackets 【 】「 」『 』, white tortoise-shell and curly brackets, and math-style nesting chevrons ⫷ ⫸. Because they come in matched left/right pairs, they slot cleanly on either side of your text in almost any game's name field.",
    "faqs": [
      {
        "q": "Which bracket pairs render most reliably across games?",
        "a": "The CJK lenticular 【 】, corner 「 」 and white-corner 『 』 brackets are extremely widely supported and show correctly in most game fonts. The Javanese wings ꧁ ꧂ are popular but depend on a font that includes that block, so test them in your specific game before committing."
      },
      {
        "q": "How do I keep the left and right brackets matched?",
        "a": "Always copy the pair together — opening on the left of your text, closing on the right — so the frame stays symmetrical. Mixing, say, an opening 【 with a closing 』 looks broken; this set lists them as natural pairs to avoid that."
      },
      {
        "q": "Why use brackets instead of wings for a clan tag?",
        "a": "Clan and squad tags usually have a tight character limit and stricter filters than personal names, so a single bracket pair like 【NAME】 fits and passes far more often than a full multi-symbol wing string, while still reading as a deliberate frame."
      }
    ],
    "keywords": [
      "clan tag brackets",
      "name bracket symbols",
      "bracket symbols copy paste",
      "clan tag symbols",
      "symbols to frame a name"
    ]
  },
  {
    "slug": "sword-symbols",
    "name": "Sword Symbols",
    "kind": "style",
    "tagline": "Blades and weapon glyphs for names",
    "symbols": [
      "⚔",
      "🗡",
      "†",
      "‡",
      "⸸",
      "✠",
      "✚",
      "✟",
      "✝",
      "⛏",
      "⚒",
      "⚓",
      "⚑",
      "⚐",
      "ϟ",
      "☇",
      "⚡",
      "⛧",
      "♆",
      "⚝",
      "⚞",
      "⚟",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "彡",
      "乡",
      "刀",
      "刃",
      "斬",
      "⚙",
      "⚖",
      "✦",
      "✯",
      "★",
      "⊹",
      "⸻",
      "⸺",
      "꧁",
      "꧂",
      "☠",
      "⛨",
      "劍",
      "剣"
    ],
    "nameExamples": [
      "⚔NAME⚔",
      "†NAME†",
      "꧁⚔NAME⚔꧂",
      "彡⚔NAME⚔彡",
      "刃NAME刃",
      "⊰⚔NAME⚔⊱",
      "[NAME]⚔",
      "✠NAME✠",
      "⚔࿐NAME",
      "‡NAME‡",
      "斬NAME斬",
      "🗡NAME🗡"
    ],
    "intro": "Sword symbols are the blade-and-weapon glyphs players wrap around warrior and tryhard names. The set leads with the crossed-swords ⚔ and dagger 🗡, the dagger marks † ‡ ⸸, cross-style blades ✠ ✚ ✟, and tools-of-war glyphs like ⚒ ⛏ ⚓, rounded out with CJK blade kanji 刀 刃 斬 for an edgier eastern look. They pair naturally with bracket frames and wing pairs to build an aggressive, battle-ready in-game name.",
    "faqs": [
      {
        "q": "What's the difference between ⚔ and 🗡 in names?",
        "a": "The crossed swords ⚔ is a text-style symbol that usually renders monochrome and matches surrounding letters, while 🗡 (dagger) is an emoji that most systems show in full color and slightly larger. Use ⚔ for a clean text look and 🗡 when you want a bold colored accent."
      },
      {
        "q": "Do the dagger marks † ‡ work as sword symbols?",
        "a": "Yes — the dagger † and double-dagger ‡ are standard punctuation glyphs that render almost everywhere, which makes them the safest blade-style accents for strict name filters that reject emoji. They read as small swords flanking a name, e.g. †NAME†."
      },
      {
        "q": "Can I mix sword kanji like 刃 or 斬 into a name?",
        "a": "The blade kanji 刀 (sword), 刃 (edge) and 斬 (slash) render in any CJK-capable font and give an eastern warrior feel, but they are literal Japanese/Chinese characters, so use them for aesthetic flair rather than as readable English text."
      }
    ],
    "keywords": [
      "sword symbols",
      "sword symbols copy paste",
      "dagger symbol for name",
      "weapon symbols for gaming",
      "blade symbols text"
    ]
  },
  {
    "slug": "skull-symbols",
    "name": "Skull Symbols",
    "kind": "style",
    "tagline": "Skulls and death glyphs for names",
    "symbols": [
      "☠",
      "💀",
      "⚰",
      "⚱",
      "†",
      "‡",
      "⸸",
      "⛧",
      "☥",
      "⚔",
      "✠",
      "✟",
      "✝",
      "卍",
      "卐",
      "ϟ",
      "♆",
      "⚝",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "彡",
      "乡",
      "鬼",
      "魂",
      "闇",
      "悪",
      "⚒",
      "⛏",
      "☇",
      "⚡",
      "꧁",
      "꧂",
      "骨",
      "死",
      "幽",
      "霊",
      "怨",
      "呪",
      "屍",
      "墓",
      "棺",
      "👻",
      "🦴"
    ],
    "nameExamples": [
      "☠NAME☠",
      "💀NAME💀",
      "꧁☠NAME☠꧂",
      "彡☠NAME☠彡",
      "†NAME†",
      "鬼NAME鬼",
      "⚰NAME⚰",
      "[NAME]☠",
      "☠࿐NAME",
      "⸸NAME⸸",
      "闇NAME闇",
      "☠彡NAME彡☠"
    ],
    "intro": "Skull symbols give a name a dark, edgy, death-themed look. The core glyphs are the text skull-and-crossbones ☠, the color skull emoji 💀, and the coffin and urn ⚰ ⚱, supported by dagger marks † ‡ ⸸, the inverted pentagram ⛧, and ominous CJK kanji 鬼 (demon) 魂 (soul) 闇 (darkness) 悪 (evil). They are a favorite for horror clans and tryhard squads and frame cleanly inside wing or bracket pairs.",
    "faqs": [
      {
        "q": "Does ☠ render the same everywhere as 💀?",
        "a": "No — ☠ (skull and crossbones) is a text symbol that often shows monochrome and inline with your letters, while 💀 (skull) is an emoji rendered in full color and larger. If a game's filter blocks emoji, ☠ is the reliable fallback that still reads as a skull."
      },
      {
        "q": "What dark symbols pair well with skulls?",
        "a": "The dagger marks † ‡ ⸸, the inverted pentagram ⛧, and the coffin/urn ⚰ ⚱ all share the death theme and combine well with ☠ or 💀. Adding a wing frame ꧁ ꧂ or 彡 sweep builds a complete horror-style name."
      },
      {
        "q": "Can I use kanji like 鬼 or 闇 in a skull name?",
        "a": "Yes — 鬼 (demon/ghost), 魂 (soul) and 闇 (darkness) render in any CJK-capable font and reinforce the dark theme, but they are real Japanese characters used here for aesthetic effect, so treat them as decoration rather than English words."
      }
    ],
    "keywords": [
      "skull symbols",
      "skull symbol copy paste",
      "death symbols for names",
      "skull emoji text",
      "dark symbols for gaming names"
    ]
  },
  {
    "slug": "crown-symbols",
    "name": "Crown Symbols",
    "kind": "style",
    "tagline": "Crowns and royalty glyphs for names",
    "symbols": [
      "♔",
      "♕",
      "♛",
      "♚",
      "👑",
      "★",
      "✦",
      "✯",
      "✪",
      "⚜",
      "☬",
      "༒",
      "➻",
      "❥",
      "™",
      "✟",
      "✠",
      "⊰",
      "⊱",
      "⫷",
      "⫸",
      "彡",
      "乡",
      "王",
      "帝",
      "皇",
      "覇",
      "神",
      "꧁",
      "꧂",
      "「",
      "」",
      "【",
      "】",
      "⚝",
      "✩",
      "♖",
      "♗",
      "♘",
      "♙",
      "君",
      "尊",
      "貴",
      "侯",
      "爵"
    ],
    "nameExamples": [
      "♛NAME♛",
      "👑NAME👑",
      "꧁♛NAME♛꧂",
      "♔NAME♔",
      "彡♛NAME♛彡",
      "王NAME王",
      "【♛NAME♛】",
      "➻♛NAME",
      "♛࿐NAME",
      "✦♛NAME♛✦",
      "帝NAME帝",
      "♕NAME♕"
    ],
    "intro": "Crown symbols mark a name as royalty, a king, queen or clan leader. The set is built from the chess crowns ♔ ♕ ♛ ♚ (white and black king and queen), the gold crown emoji 👑, and royal accents like the fleur-de-lis ⚜ and the trinity ☬, plus CJK kanji for rank 王 (king) 帝 (emperor) 皇 (sovereign) 覇 (supremacy). These pair with stars and wing frames to crown almost any in-game name.",
    "faqs": [
      {
        "q": "What's the difference between ♛ ♕ and 👑?",
        "a": "♛ and ♚ are the black (filled) chess queen and king, ♕ and ♔ are the white (outlined) versions — all text symbols that render monochrome inline. 👑 is the gold crown emoji, shown in color and larger. Filled ♛ reads boldest in most game fonts; 👑 stands out most where emoji are allowed."
      },
      {
        "q": "Which crown symbol works in strict name filters?",
        "a": "The chess crowns ♔ ♕ ♚ ♛ are standard Unicode symbols supported almost everywhere and rarely blocked, making them safer than the 👑 emoji in games that filter or strip emoji from names."
      },
      {
        "q": "How do I make a king or leader name?",
        "a": "Flank your text with a filled crown — ♛NAME♛ — or stack a crown inside a wing frame like ꧁♛NAME♛꧂. Adding a rank kanji such as 王 or 帝, or a fleur-de-lis ⚜, reinforces the royal theme for a clan leader tag."
      }
    ],
    "keywords": [
      "crown symbols",
      "crown symbol copy paste",
      "king symbol for name",
      "royal symbols for gaming",
      "crown text symbol"
    ]
  },
  {
    "slug": "wing-symbols",
    "name": "Wing Symbols",
    "kind": "style",
    "tagline": "Angel wings and flourish frames",
    "symbols": [
      "꧁",
      "꧂",
      "༒",
      "☬",
      "⛧",
      "⫷",
      "⫸",
      "⊰",
      "⊱",
      "≼",
      "≽",
      "⪻",
      "⪼",
      "⩹",
      "⩺",
      "彡",
      "乡",
      "ϟ",
      "҂",
      "❧",
      "☙",
      "⊹",
      "✠",
      "➻",
      "❥",
      "⚜",
      "✦",
      "✯",
      "★",
      "⸻",
      "⸺",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "〖",
      "〗",
      "꧅",
      "ღ",
      "❀",
      "✿",
      "➶",
      "➴"
    ],
    "nameExamples": [
      "꧁༒NAME༒꧂",
      "꧁☬NAME☬꧂",
      "⫷NAME⫸",
      "彡NAME彡",
      "⊰NAME⊱",
      "乡NAME乡",
      "꧁⚜NAME⚜꧂",
      "≼NAME≽",
      "❧NAME☙",
      "⪻NAME⪼",
      "꧁ঔNAMEঔ꧂",
      "➻❥NAME"
    ],
    "intro": "Wing symbols create the iconic winged-name look, where a name sits between two swept, mirror-image flourishes. The heart of the set is the Javanese rerenggan pair ꧁ ꧂ (the famous ꧁༒☬꧂ wings), supported by chevron-like nesting glyphs ⫷ ⫸ ⊰ ⊱, the floral hearts ❧ ☙, and the 彡 and 乡 sweep strokes that simulate motion lines. Combined with a central ornament like ༒ or ☬, they produce the most recognizable stylish-gamer name format.",
    "faqs": [
      {
        "q": "How do I make the ꧁༒☬꧂ winged name?",
        "a": "Wrap your name with the Javanese rerenggan pair and a central ornament: ꧁༒☬ on the left of your text and ☬༒꧂ on the right, giving ꧁༒☬NAME☬༒꧂. Copy the opening and closing wings as a matched set so the frame mirrors correctly."
      },
      {
        "q": "Why do my wing symbols show as boxes?",
        "a": "The Javanese wings ꧁ ꧂ and the Tibetan ornament ༒ live in Unicode blocks that not every font includes, so a device lacking those fonts shows boxes. They work in most mobile game fonts (Free Fire, PUBG, MLBB); if they fail, fall back to chevron wings ⫷ ⫸ or ⊰ ⊱."
      },
      {
        "q": "What goes in the center of a winged name?",
        "a": "Players place an ornament between the wings and the text — commonly the Tibetan mark ༒, the trinity ☬, a crown ♛, or a star ★ — for example ꧁༒NAME༒꧂. Pick one center symbol so the frame stays balanced rather than cluttered."
      }
    ],
    "keywords": [
      "wing symbols",
      "wings symbol copy paste",
      "angel wings text symbol",
      "name wings symbols",
      "꧁꧂ wings symbol"
    ]
  },
  {
    "slug": "sweaty-tryhard-symbols",
    "name": "Sweaty Tryhard Symbols",
    "kind": "style",
    "tagline": "Tryhard katakana and superscript tags",
    "symbols": [
      "ツ",
      "シ",
      "ジ",
      "㋡",
      "㋛",
      "乡",
      "丿",
      "々",
      "〆",
      "彡",
      "卄",
      "の",
      "ノ",
      "刀",
      "气",
      "ᴹ",
      "ᴿ",
      "ᴷ",
      "ᴰ",
      "ᴮ",
      "ᴳ",
      "ᴺ",
      "ᵗ",
      "ᵐ",
      "ᵛ",
      "ⁿ",
      "ʸ",
      "ˣ",
      "ᵏ",
      "乄",
      "乂",
      "乜",
      "乇",
      "么",
      "丂",
      "乙",
      "〤",
      "王",
      "ϟ",
      "★",
      "✦",
      "✯",
      "™",
      "➻",
      "❥",
      "☠",
      "⚡"
    ],
    "nameExamples": [
      "NAMEツ",
      "彡NAME彡",
      "乡NAME乡",
      "ᴹᴿ•NAME",
      "卄NAME",
      "ⁿNAMEᵗ",
      "シNAMEツ",
      "乛NAME乛",
      "ᴷᴰ NAME",
      "丿NAME丿",
      "NAME™ツ",
      "々NAME々"
    ],
    "intro": "Sweaty tryhard symbols are the compact glyph set competitive players use to look effortlessly hardcore — the smirking katakana ツ シ ジ, the 彡 and 乡 motion sweeps, half-width CJK strokes 丿 卄 の 刀, and tiny superscript clan prefixes like ᴹᴿ and ᴷᴰ. They favor short, sharp names over ornate wings, signaling a fast-fingered ranked grinder rather than a casual. This is the look behind countless Fortnite, COD and PUBG sweat tags.",
    "faqs": [
      {
        "q": "How do I make a sweaty name with ツ?",
        "a": "Append the katakana ツ (which reads like a smirking face) to the end of a short name — NAMEツ — or flank it with ツ and シ. Keep the letters minimal; the tryhard look is about a clean, punchy name plus one or two of these glyphs, not a wall of symbols."
      },
      {
        "q": "How do superscript clan tags like ᴹᴿ work?",
        "a": "Superscript modifier letters (ᴹ ᴿ ᴷ ᴰ ᵗ ⁿ) sit small and raised, so a clan prefix like ᴹᴿ•NAME or ᴷᴰ NAME looks like a tiny tag above the baseline. Note only certain letters exist as superscripts in Unicode, so not every clan name can be fully rendered this way."
      },
      {
        "q": "Why do tryhard players use 彡 and 乡?",
        "a": "The CJK characters 彡 and 乡 resemble three sweeping strokes, so placing them beside a name (彡NAME彡) mimics speed or motion lines — a visual shorthand for being fast and aggressive. They render in any CJK-capable font, which is most modern game and phone fonts."
      }
    ],
    "keywords": [
      "sweaty symbols",
      "tryhard name symbols",
      "sweaty fortnite symbols",
      "ツ symbol copy paste",
      "superscript clan tag symbols"
    ]
  }
];

const _bySlug = new Map<string, GamingSymbolSet>(
  GAMING_SYMBOL_SETS.map(s => [s.slug, s]),
);

export function getGamingSet(slug: string): GamingSymbolSet | undefined {
  return _bySlug.get(slug);
}

export const GAMING_KINDS: { id: "game" | "style"; label: string; blurb: string }[] = [
  { id: "game", label: "By Game", blurb: "Symbols and name templates for specific games." },
  { id: "style", label: "By Style", blurb: "Themed symbol collections to build any name." },
];

export function gamingSetsByKind(kind: "game" | "style"): GamingSymbolSet[] {
  return GAMING_SYMBOL_SETS.filter(s => s.kind === kind);
}
