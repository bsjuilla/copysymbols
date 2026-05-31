// Seasonal / holiday symbols & emoji for copy & paste. Powers /seasonal (hub)
// + /seasonal/[occasion] (7 spokes). Every character is a real, widely-supported
// Unicode emoji or text symbol (machine-verified: no Private Use Area, no U+FFFD,
// nothing newer than Emoji 14 / 2021, and a VS16 on every colour-presentation
// emoji so it renders in colour on Windows/iOS/Android/macOS). Verified 2026-05-31.

export interface SeasonFaq {
  q: string;
  a: string;
}

export interface SeasonSet {
  slug: string;
  name: string;
  /** One representative emoji for the hub card. */
  emoji: string;
  tagline: string;
  /** When it occurs, e.g. "October 31". */
  dateLabel: string;
  intro: string;
  /** Copyable emoji + text symbols for the occasion. */
  symbols: string[];
  /** Ready-made decorative emoji combos for bios/captions. */
  combos: string[];
  faqs: SeasonFaq[];
  keywords: string[];
}

export const SEASONS: SeasonSet[] = [
  {
    "slug": "halloween",
    "name": "Halloween",
    "emoji": "🎃",
    "tagline": "Spooky symbols for a haunted feed",
    "dateLabel": "October 31",
    "intro": "Halloween is the spooky autumn celebration on October 31, full of costumes, trick-or-treating, and all things eerie. These are real Unicode emoji and text symbols, so you can copy any of them and paste straight into Instagram, TikTok, your name, or a text message. They show up everywhere fonts go, no app or image needed.",
    "symbols": [
      "🎃",
      "👻",
      "🦇",
      "🕷️",
      "🕸️",
      "💀",
      "☠️",
      "🧛",
      "🧟",
      "🧙",
      "🔮",
      "🌙",
      "🌕",
      "⚰️",
      "🕯️",
      "🍬",
      "🍭",
      "🍫",
      "✝️",
      "†",
      "‡",
      "☥",
      "⚱️",
      "🕳️",
      "🧹",
      "🍁",
      "☢️",
      "😈",
      "👿",
      "💣",
      "⚔️",
      "🌠",
      "✨",
      "♠️",
      "♧"
    ],
    "combos": [
      "🎃👻🦇",
      "🕸️🕷️🕸️",
      "💀☠️💀",
      "🧛🦇🌙",
      "🎃🍬🍭",
      "👻👻👻",
      "🔮🌙✨",
      "🧟⚰️💀",
      "🍂🎃🍁",
      "🕯️💀🕯️",
      "✝️⚱️✝️",
      "🎃👿😈"
    ],
    "faqs": [
      {
        "q": "How do I get the Halloween emojis?",
        "a": "Tap or click any symbol above to copy it, then paste it wherever you want, such as a caption, bio, or message. You can copy as many as you like and string them together into spooky decorations."
      },
      {
        "q": "Do these Halloween emojis work on iPhone and Android?",
        "a": "Yes. They are standard Unicode emoji, so they render on iPhone, Android, Windows, and Mac. The colorful pictures and the black-and-white text symbols both paste anywhere you can type."
      },
      {
        "q": "When is Halloween?",
        "a": "Halloween is celebrated every year on October 31. It kicks off the wider fall and 'spooky season' run-up that many people decorate for all through October."
      }
    ],
    "keywords": [
      "halloween emojis copy paste",
      "halloween symbols",
      "spooky emoji copy and paste",
      "pumpkin emoji",
      "ghost emoji copy paste",
      "halloween text symbols"
    ]
  },
  {
    "slug": "christmas",
    "name": "Christmas",
    "emoji": "🎄",
    "tagline": "Festive emoji to deck out your posts",
    "dateLabel": "December 25",
    "intro": "Christmas is the festive winter holiday on December 25, celebrated with trees, gifts, lights, and time with family. Every symbol here is genuine Unicode, so you can copy and paste it into cards, captions, bios, or texts and it will display on any device. No screenshots or special fonts required.",
    "symbols": [
      "🎄",
      "🎅",
      "🤶",
      "🎁",
      "⛄",
      "☃️",
      "❄️",
      "🦌",
      "🔔",
      "🕯️",
      "⭐",
      "🌟",
      "🎶",
      "🧦",
      "🍪",
      "🥛",
      "🔥",
      "🌨️",
      "❆",
      "❅",
      "✷️",
      "✶",
      "❇️",
      "✻",
      "✳️",
      "🛷",
      "⛪",
      "☦",
      "✝️",
      "🍽️",
      "🍗",
      "🍷",
      "🥂",
      "✨"
    ],
    "combos": [
      "🎄🎁⭐",
      "❄️☃️❄️",
      "🎅🎁🎄",
      "🔔🎄🔔",
      "❆❄️❆",
      "🍪🥛🎅",
      "🦌🛷❄️",
      "🌟🎄🌟",
      "✨🎁✨",
      "🧦🎄🧦",
      "❄️❅❆❇️",
      "🕯️🎄🕯️"
    ],
    "faqs": [
      {
        "q": "How do I copy the Christmas emojis?",
        "a": "Click or tap a symbol to copy it instantly, then paste it into your greeting card, caption, bio, or message. Combine the tree, snowflakes, and gifts to build a festive border."
      },
      {
        "q": "Will these Christmas emojis show up on all phones?",
        "a": "Yes. They are official Unicode emoji and symbols, so they display correctly on iPhone, Android, Windows, and Mac. The black-and-white snowflakes and stars work as elegant text accents too."
      },
      {
        "q": "When is Christmas?",
        "a": "Christmas Day is December 25 every year. Christmas Eve falls on December 24, and many people decorate and share greetings throughout the December holiday season."
      }
    ],
    "keywords": [
      "christmas emojis copy paste",
      "christmas symbols",
      "snowflake symbol copy paste",
      "christmas tree emoji",
      "santa emoji copy paste",
      "xmas text symbols"
    ]
  },
  {
    "slug": "valentines-day",
    "name": "Valentine's Day",
    "emoji": "❤️",
    "tagline": "Hearts and love symbols to copy",
    "dateLabel": "February 14",
    "intro": "Valentine's Day on February 14 is the day for romance, love notes, and heartfelt gestures. All of these hearts and love symbols are real Unicode characters, so you can copy and paste them into texts, bios, captions, and cards on any device. They render in full color or as classic black-and-white heart marks.",
    "symbols": [
      "❤️",
      "💕",
      "💗",
      "💓",
      "💝",
      "💘",
      "😍",
      "🥰",
      "😘",
      "🌹",
      "💐",
      "💌",
      "🧸",
      "🍫",
      "💍",
      "💋",
      "💞",
      "💟",
      "💛",
      "💜",
      "💚",
      "💙",
      "🤍",
      "🖤",
      "🧡",
      "♥️",
      "♡",
      "❥",
      "❣️",
      "❦",
      "❧",
      "☙",
      "⚜️",
      "✿",
      "❀",
      "∞"
    ],
    "combos": [
      "❤️💕❤️",
      "💖💗💘",
      "🌹❤️🌹",
      "😍😘🥰",
      "♥️♡♥️",
      "💝💌💝",
      "🧸🍫❤️",
      "❣️❥❣️",
      "💐🌹💐",
      "∞❤️∞",
      "💛💚💙💜",
      "💍💘💍"
    ],
    "faqs": [
      {
        "q": "How do I copy and paste the heart symbols?",
        "a": "Tap or click any heart to copy it, then paste it into your message, bio, or caption. Mix the colorful hearts with the black-and-white heart marks to make a sweet little border."
      },
      {
        "q": "Do these heart emojis work on iPhone and Android?",
        "a": "Yes. They are standard Unicode, so the red heart, sparkling hearts, and text heart suits all display on iPhone, Android, Windows, and Mac. Some hearts use a hidden modifier so they always appear in color."
      },
      {
        "q": "When is Valentine's Day?",
        "a": "Valentine's Day is celebrated on February 14 every year. It is the most popular day to send love notes, flowers, and heart-filled messages to a partner, friend, or crush."
      }
    ],
    "keywords": [
      "valentines day emojis copy paste",
      "heart symbols copy paste",
      "love emoji copy and paste",
      "heart text symbol",
      "valentine symbols",
      "cute heart emojis"
    ]
  },
  {
    "slug": "new-year",
    "name": "New Year",
    "emoji": "🎉",
    "tagline": "Countdown and celebration symbols",
    "dateLabel": "January 1",
    "intro": "New Year welcomes January 1 with countdowns, fireworks, and toasts to fresh beginnings. These celebration emoji and symbols are all genuine Unicode, so you can copy and paste them into party invites, captions, and bios on any phone or computer. Pair the fireworks and confetti for an instant festive look.",
    "symbols": [
      "🎉",
      "🎊",
      "🥳",
      "🍾",
      "🥂",
      "✨",
      "🎆",
      "🎇",
      "⏰",
      "🪩",
      "🕛",
      "🍻",
      "🍷",
      "⭐",
      "🌟",
      "🌠",
      "🔥",
      "💫",
      "✴️",
      "✳️",
      "✹",
      "✺",
      "❂️",
      "❖",
      "❁",
      "⁕",
      "✼",
      "🍸",
      "🍹",
      "🏆",
      "📝",
      "📅",
      "🗓️",
      "🧨",
      "❇️"
    ],
    "combos": [
      "🎉🎊🎉",
      "🎆✨🎇",
      "🥂🍾🥂",
      "⏰🕛✨",
      "🪩🥳🪩",
      "🌟⭐🌠",
      "🎈🎉🎈",
      "✨🎆✨",
      "🧨🎆🧨",
      "✴️❂️✴️",
      "🍷🍻🍸",
      "🎉✨🎊✨"
    ],
    "faqs": [
      {
        "q": "How do I copy the New Year emojis?",
        "a": "Tap or click any symbol to copy it, then paste it into your countdown post, invite, caption, or bio. Stack the fireworks, confetti, and sparkles for a celebratory banner."
      },
      {
        "q": "Do these New Year emojis work on every device?",
        "a": "Yes. They are standard Unicode emoji and symbols, so they render on iPhone, Android, Windows, and Mac. The black-and-white stars and sparkles also make clean text decorations."
      },
      {
        "q": "When is New Year's Day?",
        "a": "New Year's Day is January 1, and the celebrations begin the night before on New Year's Eve, December 31, with countdowns and fireworks at midnight."
      }
    ],
    "keywords": [
      "new year emojis copy paste",
      "happy new year symbols",
      "fireworks emoji copy paste",
      "celebration emoji copy and paste",
      "new year text symbols",
      "countdown emoji"
    ]
  },
  {
    "slug": "easter",
    "name": "Easter",
    "emoji": "🐰",
    "tagline": "Bunnies, eggs and spring symbols",
    "dateLabel": "Sunday in spring (March or April)",
    "intro": "Easter is the springtime holiday celebrated on a Sunday in March or April, known for bunnies, decorated eggs, and fresh blooms. Each of these symbols is real Unicode, so you can copy and paste it into captions, bios, cards, and texts on any device. Combine the bunny, eggs, and flowers for a cheerful spring look.",
    "symbols": [
      "🐰",
      "🐇",
      "🥚",
      "🐣",
      "🐥",
      "🐤",
      "🌷",
      "🌸",
      "🌼",
      "🌻",
      "🌺",
      "🧺",
      "🐑",
      "🍫",
      "🍬",
      "🍀",
      "🌿",
      "🦋",
      "🐝",
      "🌈",
      "☀️",
      "🌞",
      "⚘️",
      "✿",
      "❀",
      "❁",
      "✝️",
      "☨",
      "🕊️",
      "🐦",
      "🌾",
      "💐"
    ],
    "combos": [
      "🐰🥚🐣",
      "🌷🌸🌼",
      "🐇🥚🐇",
      "🐥🐤🐣",
      "🌈🌷🌈",
      "🧺🥚🥚",
      "🦋🌷🐝",
      "🐰🍫🥚",
      "☀️🌻☀️",
      "🕊️✝️🕊️",
      "🐑🌿🐑",
      "💐🐰💐"
    ],
    "faqs": [
      {
        "q": "How do I get the Easter emojis?",
        "a": "Click or tap a symbol to copy it, then paste it into your caption, bio, card, or message. Combine the bunny, eggs, and flowers to make a cute spring decoration."
      },
      {
        "q": "Do these Easter emojis work on iPhone and Android?",
        "a": "Yes. They are standard Unicode emoji, so the bunny, eggs, chicks, and flowers all display on iPhone, Android, Windows, and Mac. The text florettes work as decorative accents too."
      },
      {
        "q": "When is Easter?",
        "a": "Easter falls on a Sunday in spring, usually in late March or April, and the exact date changes each year. It always lands on the first Sunday after the first full moon following the spring equinox."
      }
    ],
    "keywords": [
      "easter emojis copy paste",
      "easter symbols",
      "bunny emoji copy paste",
      "easter egg emoji",
      "spring emoji copy and paste",
      "easter text symbols"
    ]
  },
  {
    "slug": "thanksgiving",
    "name": "Thanksgiving",
    "emoji": "🦃",
    "tagline": "Turkey, harvest and gratitude symbols",
    "dateLabel": "Fourth Thursday in November",
    "intro": "Thanksgiving is the American harvest holiday on the fourth Thursday in November, centered on a big meal, gratitude, and time with family. Every symbol here is genuine Unicode, so you can copy and paste it into captions, place cards, bios, and texts on any device. Pair the turkey with autumn leaves for a warm seasonal touch.",
    "symbols": [
      "🦃",
      "🍁",
      "🌽",
      "🥧",
      "🍗",
      "🌾",
      "🍞",
      "🍠",
      "🍇",
      "🍎",
      "🍯",
      "🍽️",
      "🍴",
      "🍷",
      "🕯️",
      "🌻",
      "🍄",
      "🌰",
      "🥜",
      "🍊",
      "💛",
      "🧡",
      "❤️",
      "✨",
      "✴️",
      "🕊️",
      "🏡",
      "👪",
      "🙏",
      "☀️"
    ],
    "combos": [
      "🦃🍁🍂",
      "🍁🍂🌾",
      "🥧🍗🍷",
      "🌽🦃🌽",
      "🍂🍄🌰",
      "🙏❤️🙏",
      "🍽️🍗🍽️",
      "💛🧡❤️",
      "🍁✨🍂",
      "🌻🍁🌻",
      "🦃🥧🍞",
      "🍂👪🍁"
    ],
    "faqs": [
      {
        "q": "How do I copy the Thanksgiving emojis?",
        "a": "Tap or click any symbol to copy it, then paste it into your caption, place card, bio, or message. Combine the turkey, leaves, and pie to set a cozy harvest mood."
      },
      {
        "q": "Do these Thanksgiving emojis work on iPhone and Android?",
        "a": "Yes. They are standard Unicode emoji, so the turkey, autumn leaves, and harvest foods all display on iPhone, Android, Windows, and Mac. The black-and-white stars and hearts work as text accents too."
      },
      {
        "q": "When is Thanksgiving?",
        "a": "In the United States, Thanksgiving is the fourth Thursday in November, so the date shifts a little each year. It is followed by Black Friday and a long holiday weekend."
      }
    ],
    "keywords": [
      "thanksgiving emojis copy paste",
      "thanksgiving symbols",
      "turkey emoji copy paste",
      "fall emoji copy and paste",
      "autumn leaf symbols",
      "harvest emoji"
    ]
  },
  {
    "slug": "st-patricks-day",
    "name": "St. Patrick's Day",
    "emoji": "☘️",
    "tagline": "Shamrocks, luck and Irish symbols",
    "dateLabel": "March 17",
    "intro": "St. Patrick's Day on March 17 is the Irish celebration of green, luck, and shamrocks, marked with parades and plenty of festivity. All of these symbols are real Unicode, so you can copy and paste them into captions, bios, and messages on any device. Stack the clovers and rainbows for an instant lucky look.",
    "symbols": [
      "☘️",
      "🍀",
      "🌈",
      "🍺",
      "🍻",
      "💚",
      "🎩",
      "🦄",
      "💰",
      "🪙",
      "🥇",
      "✨",
      "🌟",
      "🎶",
      "💃",
      "🎻",
      "🌿",
      "🍃",
      "⚘️",
      "✿",
      "❀",
      "♣️",
      "♧",
      "🧚",
      "★",
      "☆",
      "⚜️",
      "🥂",
      "🎉",
      "🎊",
      "✴️"
    ],
    "combos": [
      "☘️🍀☘️",
      "🍀🌈💰",
      "💚☘️💚",
      "🎩☘️🎩",
      "🍺🍻🍺",
      "🌈🪙🌈",
      "☘️✨🍀",
      "🦄🌈🍀",
      "🍀🍀🍀",
      "♣️☘️♣️",
      "🎉☘️🎊",
      "🎶💃🎻"
    ],
    "faqs": [
      {
        "q": "How do I get the St. Patrick's Day emojis?",
        "a": "Click or tap any symbol to copy it, then paste it into your caption, bio, or message. Line up the shamrocks, clovers, and rainbows for a lucky green border."
      },
      {
        "q": "Do these St. Patrick's Day emojis work on iPhone and Android?",
        "a": "Yes. They are standard Unicode emoji and symbols, so the shamrock, four-leaf clover, and rainbow all display on iPhone, Android, Windows, and Mac. The club suits and florettes make handy green text accents."
      },
      {
        "q": "When is St. Patrick's Day?",
        "a": "St. Patrick's Day is celebrated every year on March 17. It honors the patron saint of Ireland and is marked worldwide with parades, green outfits, and Irish music."
      }
    ],
    "keywords": [
      "st patricks day emojis copy paste",
      "shamrock symbol copy paste",
      "four leaf clover emoji",
      "irish emoji copy and paste",
      "lucky symbols",
      "st patricks day symbols"
    ]
  }
];

const _bySlug = new Map<string, SeasonSet>(SEASONS.map(s => [s.slug, s]));

export function getSeason(slug: string): SeasonSet | undefined {
  return _bySlug.get(slug);
}
