export type PlatformId = "instagram" | "discord" | "whatsapp" | "twitter" | "tiktok" | "facebook";

export interface PlatformSymbol {
  s: string;
  n: string;
  /** Short tooltip — when to use this symbol on this platform. Optional. */
  hint?: string;
}

export interface PlatformCategory {
  id: string;
  name: string;
  description: string;
  symbols: PlatformSymbol[];
}

export interface PlatformFAQ {
  q: string;
  a: string;
}

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  emoji: string;
  /** Char limit for bios on this platform, used in copy. */
  bioLimit: number;
  /** Tagline shown in the page hero. */
  tagline: string;
  /** Per-platform intro paragraph (2-3 sentences) explaining what symbols work best here and why. */
  intro: string;
  categories: PlatformCategory[];
  faqs: PlatformFAQ[];
}

export const platforms: Record<PlatformId, PlatformConfig> = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    emoji: "📸",
    bioLimit: 150,
    tagline: "Symbols for Instagram bios, captions, and stories",
    intro: "Instagram bios cap at 150 characters, so every glyph has to earn its slot. The Instagram aesthetic leans soft and decorative — sparkles, hairline arrows, script-style hearts, and dingbats that break a bio into scannable lines. The picks below are battle-tested for rendering across both iOS and Android Instagram apps.",
    categories: [
      {
        id: "bio-decorations",
        name: "Bio Decorations",
        description: "Soft sparkles, hearts, flowers, and stars to frame your name, handle, or tagline.",
        symbols: [
          { s: "✨", n: "Sparkles", hint: "Most-used Instagram bio decoration." },
          { s: "⭐", n: "Star", hint: "Pre/post a tagline word." },
          { s: "🌟", n: "Glowing Star" },
          { s: "💫", n: "Dizzy Sparkle" },
          { s: "🌸", n: "Cherry Blossom", hint: "Soft girly aesthetic." },
          { s: "🌷", n: "Tulip" },
          { s: "🌺", n: "Hibiscus" },
          { s: "🌻", n: "Sunflower" },
          { s: "🌼", n: "Blossom" },
          { s: "🍀", n: "Four-Leaf Clover" },
          { s: "❀", n: "White Flower (text)", hint: "Renders as text not emoji — slim look." },
          { s: "✿", n: "Black Flower" },
          { s: "❁", n: "Eight-Petalled Flower" },
          { s: "✾", n: "Six Petal Black Flower" },
          { s: "❤", n: "Red Heart (text)" },
          { s: "♡", n: "White Heart Suit", hint: "Slim text heart — popular in script bios." },
          { s: "♥", n: "Black Heart Suit" },
          { s: "💗", n: "Growing Heart" },
          { s: "💕", n: "Two Hearts" },
          { s: "💖", n: "Sparkling Heart" },
          { s: "💘", n: "Heart Arrow" },
          { s: "🤍", n: "White Heart" },
          { s: "🖤", n: "Black Heart" },
          { s: "✩", n: "Hollow Star (text)" },
          { s: "✫", n: "Open Centre Star" },
          { s: "✬", n: "Black Centre Star" },
          { s: "✭", n: "Outlined Star" },
          { s: "⭑", n: "Black Small Star" },
          { s: "⭒", n: "White Small Star" },
          { s: "🌈", n: "Rainbow" }
        ]
      },
      {
        id: "arrows-separators",
        name: "Arrows & Separators",
        description: "Slim arrows, dots, and middots to break a 150-character bio into clean lines.",
        symbols: [
          { s: "→", n: "Right Arrow", hint: "Classic bio line-starter." },
          { s: "↳", n: "Down-Right Arrow", hint: "For sub-points under a heading." },
          { s: "↪", n: "Hooked Right Arrow" },
          { s: "➜", n: "Heavy Right Arrow" },
          { s: "➤", n: "Black Right Pointer" },
          { s: "➔", n: "Heavy Wide-Headed Arrow" },
          { s: "➞", n: "Long Right Arrow" },
          { s: "▸", n: "Black Right Triangle (small)" },
          { s: "▹", n: "White Right Triangle (small)" },
          { s: "»", n: "Right Double Angle Quote" },
          { s: "›", n: "Single Right Angle Quote" },
          { s: "‣", n: "Triangular Bullet" },
          { s: "•", n: "Middle Dot Bullet", hint: "Universally-rendering separator." },
          { s: "·", n: "Middle Dot (thin)" },
          { s: "⋅", n: "Dot Operator" },
          { s: "◦", n: "White Bullet" },
          { s: "▪", n: "Small Black Square" },
          { s: "▫", n: "Small White Square" },
          { s: "│", n: "Vertical Bar", hint: "Slim divider — works inline." },
          { s: "┃", n: "Heavy Vertical Bar" },
          { s: "︱", n: "Vertical em-dash (presentation)" },
          { s: "|", n: "ASCII Pipe" },
          { s: "/", n: "Slash" },
          { s: "—", n: "Em Dash" },
          { s: "–", n: "En Dash" }
        ]
      },
      {
        id: "aesthetic-symbols",
        name: "Aesthetic Symbols",
        description: "Kawaii combos, six-pointed stars, and dainty dingbats for the soft-aesthetic crowd.",
        symbols: [
          { s: "⊹", n: "Dot Star (cute)", hint: "Pairs with ✧ ⋆." },
          { s: "✧", n: "White Four-Pointed Star" },
          { s: "✦", n: "Black Four-Pointed Star" },
          { s: "⋆", n: "Star Operator (small)" },
          { s: "˚", n: "Ring Above" },
          { s: "༉", n: "Tibetan Mark", hint: "Common in y2k/Tumblr bios." },
          { s: "‧", n: "Hyphenation Point" },
          { s: "꒰", n: "Left Cute Bracket" },
          { s: "꒱", n: "Right Cute Bracket" },
          { s: "ʚ", n: "Latin Small Letter Ezh", hint: "Half a heart: ʚɞ." },
          { s: "ɞ", n: "Open-Mid Vowel" },
          { s: "♡̷̷", n: "Slashed Heart", hint: "Glitch-aesthetic." },
          { s: "𓍢ִ໋", n: "Sparkly Pearl Combo" },
          { s: "ೃ", n: "Kannada Sign" },
          { s: "࿐", n: "Tibetan Sign Rdel Nag" },
          { s: "ೄ", n: "Kannada Length Mark" },
          { s: "ﾟ", n: "Halfwidth Voiced Sound" },
          { s: "˖", n: "Modifier Letter Middle Dot" },
          { s: "⊱", n: "Curly Equals (left)" },
          { s: "⊰", n: "Curly Equals (right)" },
          { s: "ʚ♡ɞ", n: "Heart Combo" },
          { s: "✦˚", n: "Star with Ring" },
          { s: "˚୨୧", n: "Cute Floral Combo" },
          { s: "ྀི", n: "Tibetan Vowel" },
          { s: "❍", n: "Shadowed White Circle" }
        ]
      },
      {
        id: "status-mood",
        name: "Status & Mood",
        description: "Verified-style checks, lightning, and mystic icons that signal tone at a glance.",
        symbols: [
          { s: "✓", n: "Check Mark (text)" },
          { s: "✔", n: "Heavy Check Mark" },
          { s: "☑", n: "Ballot Box with Check" },
          { s: "⚡", n: "High Voltage", hint: "Energy / fast / electric." },
          { s: "🔥", n: "Fire" },
          { s: "💯", n: "Hundred Points" },
          { s: "🔮", n: "Crystal Ball" },
          { s: "🌙", n: "Crescent Moon" },
          { s: "☾", n: "Crescent Moon (text)" },
          { s: "☽", n: "First Quarter Moon (text)" },
          { s: "☀", n: "Sun (text)" },
          { s: "☁", n: "Cloud (text)" },
          { s: "❄", n: "Snowflake (text)" },
          { s: "♪", n: "Eighth Note", hint: "For music creators." },
          { s: "♫", n: "Beamed Notes" },
          { s: "☻", n: "Black Smiling Face" },
          { s: "☹", n: "Frowning Face" },
          { s: "♛", n: "Black Queen Chess" },
          { s: "♕", n: "White Queen Chess" },
          { s: "👑", n: "Crown" }
        ]
      },
      {
        id: "section-headers",
        name: "Section Headers",
        description: "Brackets, dividers, and floral ornaments that announce a new bio section.",
        symbols: [
          { s: "꒰꒱", n: "Cute Bracket Pair", hint: "꒰ your text ꒱" },
          { s: "❀", n: "Flower Header" },
          { s: "━━━", n: "Triple Heavy Dash" },
          { s: "━━━━━", n: "Long Heavy Divider" },
          { s: "───", n: "Light Horizontal Bar" },
          { s: "▰▰▰", n: "Filled Tally" },
          { s: "▱▱▱", n: "Empty Tally" },
          { s: "═══", n: "Double Bar" },
          { s: "⋆˚࿔", n: "Tibetan Sparkle Divider" },
          { s: "˚୨୧⋆", n: "Floral Sparkle Combo" },
          { s: "꧁ ꧂", n: "Filigree Brackets" },
          { s: "「」", n: "Corner Brackets (CJK)" },
          { s: "『』", n: "Filled Corner Brackets" },
          { s: "✦・━━・✦", n: "Star-Bar Divider" },
          { s: "◜◝", n: "Curved Header Top" },
          { s: "◟◞", n: "Curved Header Bottom" },
          { s: "❋", n: "Heavy Eight Petalled Flower" },
          { s: "❊", n: "Eight Teardrop Petalled" },
          { s: "✼", n: "Open Centre Teardrop Star" },
          { s: "⊰༻ ༺⊱", n: "Tibetan Filigree" }
        ]
      }
    ],
    faqs: [
      {
        q: "How do I add these symbols to my Instagram bio?",
        a: "Tap the symbol to copy it, open Instagram, go to your profile, tap 'Edit Profile', then long-press the Bio field and paste. The symbol will appear inline with your other text. You can also paste into Notes first to compose a full bio before pasting the finished block into Instagram."
      },
      {
        q: "Why does my bio look fine in Notes but break on Instagram?",
        a: "Instagram bios cap at 150 characters and strip most repeated line breaks. Plain Unicode symbols render reliably, but combining marks (like the dotted-pearl combos) sometimes show as boxes on older Android devices. Stick to single-glyph symbols if you need cross-device safety."
      },
      {
        q: "Can I use these symbols in Instagram captions and Stories too?",
        a: "Yes. Every symbol here works in captions, comments, Story text, and direct messages with no character limit on those surfaces. The bio is the only constrained field at 150 characters, so reserve the heaviest decorative combos for captions and use slim glyphs in the bio."
      },
      {
        q: "Do these count as one character each in my 150-character limit?",
        a: "Most do, but emoji and combining marks can cost 2-4 characters under the hood. Instagram counts in UTF-16 code units, so a sparkles emoji is 2 and a flag emoji can be 4. If your bio is rejected for being too long, swap emoji for text-only symbols like ★ ♡ ✧ which cost just 1 each."
      },
      {
        q: "Will these symbols hurt my Instagram SEO or discoverability?",
        a: "No. Instagram's bio search indexes keywords, not symbols, so decoration is neutral. The one trap is replacing letters with stylized look-alikes (e.g. mathematical-script letters) — Instagram won't match those against searched words, so keep your actual name and keywords in regular Latin characters."
      },
      {
        q: "Which symbols look best for an aesthetic / soft-girl Instagram bio?",
        a: "The Aesthetic Symbols category is built for this — combos like ʚ♡ɞ, ⊹ ✧ ⋆, and ˚୨୧ are the current staples. Pair them with hairline arrows (↳ →) and the curly꒰꒱brackets to frame each line. Keep emoji to a minimum (one or two) so the text-symbols carry the look."
      }
    ]
  },

  discord: {
    id: "discord",
    name: "Discord",
    emoji: "🎮",
    bioLimit: 190,
    tagline: "Symbols for Discord usernames, About Me, and server topics",
    intro: "Discord renders Unicode broadly thanks to its Twemoji set, so almost anything copy-pasted will display for every member. Usernames have stricter rules (no spaces, limited symbols), but the About Me, status, channel names, and server topics accept the full Unicode range. The picks below favor symbols that survive Discord's username filter and look sharp in dark-mode UI.",
    categories: [
      {
        id: "username-decorators",
        name: "Username Decorators",
        description: "Filigree brackets, daggers, and crowns popular in gamer-style display names.",
        symbols: [
          { s: "꧁꧂", n: "Filigree Brackets", hint: "꧁ NAME ꧂ — the classic gamer wrap." },
          { s: "༒", n: "Tibetan Sign Rdel Nag Gsum", hint: "༒ NAME ༒ for the goth/edgy look." },
          { s: "★", n: "Black Star (text)" },
          { s: "☆", n: "White Star (text)" },
          { s: "⚔", n: "Crossed Swords (text)" },
          { s: "☠", n: "Skull and Crossbones (text)" },
          { s: "⚜", n: "Fleur-de-Lis" },
          { s: "♛", n: "Black Queen" },
          { s: "♚", n: "Black King" },
          { s: "♜", n: "Black Rook" },
          { s: "♞", n: "Black Knight" },
          { s: "✘", n: "Heavy Ballot X" },
          { s: "✗", n: "Ballot X" },
          { s: "卐", n: "CJK 'Ten Thousand'" },
          { s: "彡", n: "Three Slashes", hint: "Common 'fast' decoration: 彡ﾟ" },
          { s: "ヾ", n: "Katakana-Hiragana Voiced" },
          { s: "ッ", n: "Small Tsu", hint: "Adds a 'ッ' tail to usernames." },
          { s: "シ", n: "Katakana Shi", hint: "Looks like a smiling face." },
          { s: "ツ", n: "Katakana Tsu" },
          { s: "❦", n: "Floral Heart" },
          { s: "♱", n: "East Syriac Cross" },
          { s: "☬", n: "Adi Shakti (Khanda)" },
          { s: "⚝", n: "Outlined White Star" },
          { s: "⚒", n: "Hammer and Pick" },
          { s: "⛧", n: "Inverted Pentagram", hint: "Edgy/metal aesthetic." }
        ]
      },
      {
        id: "server-decorations",
        name: "Server Decorations",
        description: "Box-drawing characters and geometric blocks built for channel topics and rules embeds.",
        symbols: [
          { s: "▰", n: "Black Sesame Dot Right" },
          { s: "▱", n: "White Sesame Dot Right" },
          { s: "◈", n: "White Diamond w Centre Dot" },
          { s: "◆", n: "Black Diamond" },
          { s: "◇", n: "White Diamond" },
          { s: "■", n: "Black Square" },
          { s: "□", n: "White Square" },
          { s: "▪", n: "Small Black Square" },
          { s: "▫", n: "Small White Square" },
          { s: "▮", n: "Black Vertical Rectangle" },
          { s: "▯", n: "White Vertical Rectangle" },
          { s: "━", n: "Heavy Horizontal" },
          { s: "─", n: "Light Horizontal" },
          { s: "═", n: "Double Horizontal" },
          { s: "║", n: "Double Vertical" },
          { s: "╔", n: "Box Drawings Double Top-Left" },
          { s: "╗", n: "Box Drawings Double Top-Right" },
          { s: "╚", n: "Box Drawings Double Bottom-Left" },
          { s: "╝", n: "Box Drawings Double Bottom-Right" },
          { s: "╠", n: "Double Tee Right" },
          { s: "╣", n: "Double Tee Left" },
          { s: "┏", n: "Box Drawings Heavy Top-Left" },
          { s: "┓", n: "Box Drawings Heavy Top-Right" },
          { s: "┗", n: "Heavy Bottom-Left" },
          { s: "┛", n: "Heavy Bottom-Right" },
          { s: "╭", n: "Light Arc Top-Left" },
          { s: "╮", n: "Light Arc Top-Right" },
          { s: "╰", n: "Light Arc Bottom-Left" },
          { s: "╯", n: "Light Arc Bottom-Right" }
        ]
      },
      {
        id: "reaction-symbols",
        name: "Reaction Symbols",
        description: "The unicode-emoji staples that show up under every server announcement.",
        symbols: [
          { s: "✅", n: "White Heavy Check", hint: "React for 'yes / confirmed'." },
          { s: "❌", n: "Cross Mark", hint: "React for 'no / wrong'." },
          { s: "⭐", n: "White Medium Star" },
          { s: "🔥", n: "Fire", hint: "Hype / banger." },
          { s: "🗿", n: "Moai", hint: "Stoic 'no comment' meme reaction." },
          { s: "🤡", n: "Clown Face", hint: "Clown-take callout." },
          { s: "💀", n: "Skull", hint: "'I'm dead' laughing reaction." },
          { s: "🎉", n: "Party Popper" },
          { s: "👀", n: "Eyes" },
          { s: "❗", n: "Red Exclamation" },
          { s: "❓", n: "Red Question Mark" },
          { s: "💯", n: "Hundred Points" },
          { s: "🙏", n: "Folded Hands" },
          { s: "👍", n: "Thumbs Up" },
          { s: "👎", n: "Thumbs Down" },
          { s: "❤️", n: "Red Heart" },
          { s: "😂", n: "Face With Tears of Joy" },
          { s: "🤔", n: "Thinking Face" },
          { s: "💩", n: "Pile of Poo" },
          { s: "🚀", n: "Rocket", hint: "To-the-moon hype." },
          { s: "⚠️", n: "Warning Sign" },
          { s: "🆗", n: "OK Button" },
          { s: "🆘", n: "SOS Button" },
          { s: "🥶", n: "Cold Face", hint: "'Ice cold' callout." }
        ]
      },
      {
        id: "channel-symbols",
        name: "Channel Symbols",
        description: "Prefix glyphs that style channel names — announcement, chat, voice, mod.",
        symbols: [
          { s: "📢", n: "Loudspeaker", hint: "For #announcements." },
          { s: "📝", n: "Memo", hint: "For #rules or #notes." },
          { s: "💬", n: "Speech Balloon", hint: "For #general / #chat." },
          { s: "🎮", n: "Video Game", hint: "For #gaming / #lfg." },
          { s: "🛠", n: "Hammer and Wrench", hint: "For #mod / #staff channels." },
          { s: "🔊", n: "Speaker High Volume", hint: "Voice channel marker." },
          { s: "🔇", n: "Muted Speaker" },
          { s: "🔒", n: "Locked", hint: "Private channel." },
          { s: "🔓", n: "Unlocked" },
          { s: "📌", n: "Pushpin", hint: "Pinned / important." },
          { s: "📋", n: "Clipboard" },
          { s: "📅", n: "Calendar", hint: "Events channel." },
          { s: "🎵", n: "Musical Note", hint: "Music bot channel." },
          { s: "🎶", n: "Multiple Notes" },
          { s: "🖼", n: "Framed Picture", hint: "Media / art channel." },
          { s: "🎨", n: "Artist Palette" },
          { s: "🤖", n: "Robot", hint: "Bot-commands channel." },
          { s: "📊", n: "Bar Chart", hint: "Polls / stats." },
          { s: "💰", n: "Money Bag", hint: "Economy / trading bot." },
          { s: "🎁", n: "Wrapped Gift", hint: "Giveaways channel." },
          { s: "❓", n: "Question Mark", hint: "Support / help channel." },
          { s: "📚", n: "Books", hint: "Resources / guides." },
          { s: "🐾", n: "Paw Prints", hint: "Pets / off-topic." }
        ]
      },
      {
        id: "bot-code",
        name: "Bot / Code Symbols",
        description: "Markdown snippet markers and mathematical operators for code blocks and bot commands.",
        symbols: [
          { s: "```", n: "Triple Backtick", hint: "Wrap code blocks in ``` ``` " },
          { s: "`", n: "Single Backtick", hint: "Inline code." },
          { s: "**", n: "Double Asterisk", hint: "**bold** in Discord markdown." },
          { s: "*", n: "Single Asterisk", hint: "*italic*." },
          { s: "__", n: "Double Underscore", hint: "__underline__." },
          { s: "~~", n: "Double Tilde", hint: "~~strikethrough~~." },
          { s: "||", n: "Double Pipe", hint: "||spoiler|| markers." },
          { s: ">", n: "Greater-than", hint: "> quotes." },
          { s: ">>>", n: "Triple Greater-than", hint: "Multi-line blockquote." },
          { s: "→", n: "Right Arrow" },
          { s: "←", n: "Left Arrow" },
          { s: "↑", n: "Up Arrow" },
          { s: "↓", n: "Down Arrow" },
          { s: "↔", n: "Left-Right Arrow" },
          { s: "≈", n: "Almost Equal To" },
          { s: "≠", n: "Not Equal" },
          { s: "≤", n: "Less or Equal" },
          { s: "≥", n: "Greater or Equal" },
          { s: "∞", n: "Infinity" },
          { s: "±", n: "Plus-Minus" },
          { s: "÷", n: "Division" },
          { s: "×", n: "Multiplication" },
          { s: "√", n: "Square Root" },
          { s: "π", n: "Pi" },
          { s: "Σ", n: "Sigma" },
          { s: "Δ", n: "Delta" },
          { s: "λ", n: "Lambda" }
        ]
      }
    ],
    faqs: [
      {
        q: "Can I use these symbols in my Discord username?",
        a: "Most decorative Unicode symbols work in display names (the nickname you set per-server), but Discord's unique handle / login username is limited to lowercase letters, numbers, underscores, and periods. Set your fancy decorated name in 'Display Name' under User Settings -> Profiles instead — it shows everywhere your handle does."
      },
      {
        q: "How do I add a symbol to my Discord About Me?",
        a: "Copy the symbol, open User Settings -> Profiles, scroll to 'About Me', and paste. The About Me field has a 190-character limit (and supports markdown), so plan your decorations carefully. Changes save instantly once you tap the green 'Save' button at the bottom."
      },
      {
        q: "Why do some symbols look different on Discord than elsewhere?",
        a: "Discord uses the Twemoji emoji set on every platform — desktop, web, mobile — so emoji look identical for every member regardless of their OS. Text-only Unicode symbols (★ ♡ ⚔) render using the user's system font, which means a Mac viewer and a Windows viewer might see slightly different shapes for the same glyph."
      },
      {
        q: "Will these symbols break code blocks or bot commands?",
        a: "Plain Unicode is safe inside code blocks, but the markdown trigger characters (backtick, asterisk, underscore, tilde, pipe) need escaping with a backslash if you want them to appear literally outside a code block. Inside a triple-backtick fence, no escaping is needed — everything renders as raw text."
      },
      {
        q: "Can I use these in channel names?",
        a: "Yes — channel names accept Unicode, including emoji and box-drawing characters. Discord auto-lowercases letter characters and strips spaces, but symbols pass through untouched. Note that channel names with leading emoji sort and search differently, so put the decorative glyph first only if you don't mind it being the sort key."
      },
      {
        q: "What's the trick for those fancy ꧁NAME꧂ usernames?",
        a: "Those are Javanese filigree characters (U+A9C1 and U+A9C2). They count as 1 character each in Discord's display-name field, leaving plenty of room for the inner text. Copy ꧁꧂, paste your in-game name in the middle, and add a ༒ or ⚔ on either side for the full gamer-tag aesthetic."
      }
    ]
  },

  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    emoji: "💬",
    bioLimit: 139,
    tagline: "Symbols for WhatsApp status, About, and group chats",
    intro: "WhatsApp 'About' lines cap at 139 characters, status updates have their own 700-char text limit, and chats accept anything. WhatsApp uses its own emoji set on Android and Apple's on iOS — both render the standard Unicode emoji block crisply, but slightly differently. Symbols here are picked for fast-tap mood signaling and family-chat list-making rather than aesthetic decoration.",
    categories: [
      {
        id: "message-decorations",
        name: "Message Decorations",
        description: "Sparkle, star, and coloured-circle glyphs to dress up status text and group announcements.",
        symbols: [
          { s: "✨", n: "Sparkles" },
          { s: "⭐", n: "White Medium Star" },
          { s: "🌟", n: "Glowing Star" },
          { s: "💫", n: "Dizzy Symbol" },
          { s: "✴️", n: "Eight-Pointed Star" },
          { s: "✳️", n: "Eight-Spoked Asterisk" },
          { s: "❇️", n: "Sparkle" },
          { s: "🔴", n: "Red Circle", hint: "Live / urgent." },
          { s: "🟠", n: "Orange Circle" },
          { s: "🟡", n: "Yellow Circle" },
          { s: "🟢", n: "Green Circle", hint: "Online / available." },
          { s: "🔵", n: "Blue Circle" },
          { s: "🟣", n: "Purple Circle" },
          { s: "⚫", n: "Black Circle" },
          { s: "⚪", n: "White Circle" },
          { s: "🟤", n: "Brown Circle" },
          { s: "🔶", n: "Large Orange Diamond" },
          { s: "🔷", n: "Large Blue Diamond" },
          { s: "🔸", n: "Small Orange Diamond" },
          { s: "🔹", n: "Small Blue Diamond" },
          { s: "💠", n: "Diamond w Dot" },
          { s: "🎀", n: "Ribbon" },
          { s: "🎈", n: "Balloon" },
          { s: "🎊", n: "Confetti Ball" },
          { s: "🎉", n: "Party Popper" }
        ]
      },
      {
        id: "status-symbols",
        name: "Status Symbols",
        description: "One-tap emotion taps for the 139-char About line — gratitude, hustle, love.",
        symbols: [
          { s: "👍", n: "Thumbs Up", hint: "Universal 'ok / agreed'." },
          { s: "🙏", n: "Folded Hands", hint: "'Please / thank you'." },
          { s: "💪", n: "Flexed Biceps", hint: "Strength / hustle." },
          { s: "❤", n: "Red Heart" },
          { s: "💯", n: "Hundred Points" },
          { s: "🔥", n: "Fire" },
          { s: "😊", n: "Smiling Face" },
          { s: "😇", n: "Smiling with Halo" },
          { s: "🤲", n: "Palms Up Together", hint: "Common in du'a / prayer status." },
          { s: "🌹", n: "Rose" },
          { s: "🌷", n: "Tulip" },
          { s: "🏆", n: "Trophy" },
          { s: "🎯", n: "Bullseye" },
          { s: "💼", n: "Briefcase" },
          { s: "📖", n: "Open Book" },
          { s: "🧿", n: "Nazar Amulet", hint: "Anti-evil-eye, popular in MENA / SA chats." },
          { s: "☘", n: "Shamrock" },
          { s: "🕊", n: "Dove", hint: "Peace / RIP." },
          { s: "✌", n: "Victory Hand" },
          { s: "🤝", n: "Handshake" },
          { s: "👊", n: "Oncoming Fist" },
          { s: "🫶", n: "Heart Hands" },
          { s: "🥲", n: "Smiling with Tear" },
          { s: "😌", n: "Relieved Face" },
          { s: "🤍", n: "White Heart" }
        ]
      },
      {
        id: "lists-points",
        name: "List & Points",
        description: "Numbered circles and bullet markers built for grocery, chore, and to-do lists in family chats.",
        symbols: [
          { s: "①", n: "Circled 1" },
          { s: "②", n: "Circled 2" },
          { s: "③", n: "Circled 3" },
          { s: "④", n: "Circled 4" },
          { s: "⑤", n: "Circled 5" },
          { s: "⑥", n: "Circled 6" },
          { s: "⑦", n: "Circled 7" },
          { s: "⑧", n: "Circled 8" },
          { s: "⑨", n: "Circled 9" },
          { s: "⑩", n: "Circled 10" },
          { s: "1️⃣", n: "Keycap 1 (emoji)" },
          { s: "2️⃣", n: "Keycap 2" },
          { s: "3️⃣", n: "Keycap 3" },
          { s: "✓", n: "Check Mark", hint: "Tick off bought / done items." },
          { s: "✔", n: "Heavy Check Mark" },
          { s: "☑", n: "Ballot Box with Check" },
          { s: "✗", n: "Ballot X" },
          { s: "▪", n: "Small Black Square Bullet" },
          { s: "▫", n: "Small White Square Bullet" },
          { s: "•", n: "Middle Dot Bullet" },
          { s: "◦", n: "White Bullet" },
          { s: "→", n: "Right Arrow", hint: "Item -> price / quantity." },
          { s: "↳", n: "Down-Right Arrow", hint: "Sub-item under a heading." },
          { s: "▶", n: "Black Right Triangle" },
          { s: "▷", n: "White Right Triangle" },
          { s: "►", n: "Black Right Pointer" },
          { s: "✅", n: "Check Mark (emoji)" },
          { s: "❌", n: "Cross Mark (emoji)" },
          { s: "*", n: "Asterisk", hint: "*bold* on WhatsApp." },
          { s: "_", n: "Underscore", hint: "_italic_ on WhatsApp." }
        ]
      },
      {
        id: "greetings",
        name: "Greetings",
        description: "Sun, moon, tea, and coffee glyphs for good-morning and good-night family chat signoffs.",
        symbols: [
          { s: "☀", n: "Sun (text)", hint: "Good morning." },
          { s: "☀️", n: "Sun (emoji)" },
          { s: "🌅", n: "Sunrise" },
          { s: "🌄", n: "Sunrise Over Mountains" },
          { s: "🌇", n: "Sunset" },
          { s: "🌆", n: "Cityscape at Dusk" },
          { s: "🌙", n: "Crescent Moon", hint: "Good night." },
          { s: "🌛", n: "First Quarter Moon Face" },
          { s: "🌜", n: "Last Quarter Moon Face" },
          { s: "✨", n: "Sparkles" },
          { s: "☕", n: "Hot Beverage", hint: "Morning coffee status." },
          { s: "🍵", n: "Teacup w/o Handle" },
          { s: "🥐", n: "Croissant" },
          { s: "🍞", n: "Bread" },
          { s: "🍯", n: "Honey Pot" },
          { s: "🌸", n: "Cherry Blossom" },
          { s: "🌻", n: "Sunflower" },
          { s: "🌺", n: "Hibiscus" },
          { s: "🌼", n: "Blossom" },
          { s: "🦋", n: "Butterfly" },
          { s: "🌿", n: "Herb" },
          { s: "🍃", n: "Leaf Fluttering" },
          { s: "💐", n: "Bouquet" },
          { s: "🕯", n: "Candle" },
          { s: "📿", n: "Prayer Beads" }
        ]
      }
    ],
    faqs: [
      {
        q: "How do I change my WhatsApp About to include a symbol?",
        a: "Open WhatsApp, tap Settings, tap your profile, then tap 'About' and clear the field. Paste your symbol-decorated text and save. The About line caps at 139 characters and shows under your name on your contact card and in your Contact Info screen for friends."
      },
      {
        q: "Why do my symbols look weird on the recipient's phone?",
        a: "WhatsApp uses the OS-native emoji font for skin-tone emoji and its own bundled set for the rest. iPhones see Apple's design, Androids see WhatsApp's. Plain text symbols (★ ♡ → ✓) use the receiver's system font, so older devices with limited Unicode coverage may show empty boxes — keep critical messages plain-text-safe."
      },
      {
        q: "Can I format text with bold or italic on WhatsApp?",
        a: "Yes — wrap a word in *asterisks* for bold, _underscores_ for italic, ~tildes~ for strikethrough, and ```triple backticks``` for monospace. These work in any chat, group, or status update, but not in your About line, which is plain text only."
      },
      {
        q: "How long can a WhatsApp status text be?",
        a: "Text status updates allow up to 700 characters and stay live for 24 hours. Your permanent 'About' is a separate, shorter 139-character field. If you paste long emoji-heavy text, WhatsApp may truncate the preview on the contact card — keep the most important glyph in the first 50 characters."
      },
      {
        q: "Do symbols affect the read receipts or notifications?",
        a: "No — symbols are treated as regular text, so notifications still preview them, replies still quote them, and the two blue ticks fire the same as for plain text. The one exception is custom GIF / sticker reactions, which don't trigger the same notification badge as a text reply."
      },
      {
        q: "Which symbols are safest to use across older Android phones in group chats?",
        a: "Stick to the core Unicode-6 emoji set (the ones in our Status Symbols category) and ASCII-adjacent glyphs like ✓ ✗ → ★ ♡. Newer additions (the heart-hands 🫶, melting face, beaver) only render on Android 12+ and iOS 14.5+, so older relatives in family chats may see them as a blank rectangle."
      }
    ]
  },

  twitter: {
    id: "twitter",
    name: "Twitter / X",
    emoji: "🐦",
    bioLimit: 160,
    tagline: "Symbols for X / Twitter bios, threads, and replies",
    intro: "Twitter / X bios cap at 160 characters and tweet bodies are 280 (or 25 000 for premium). The platform's algorithm doesn't penalize symbols, but it does favour scannable bios with clear separators. The slim text-symbols below are favourites among the tech, finance, and AI-Twitter crowds for that 'builder | founder | shipping' tri-line look.",
    categories: [
      {
        id: "bio-symbols",
        name: "Bio Symbols",
        description: "Hairline separators and stars sized for the 160-char bio's pipe-delimited format.",
        symbols: [
          { s: "★", n: "Black Star (text)" },
          { s: "☆", n: "White Star (text)" },
          { s: "•", n: "Bullet", hint: "Most-used bio separator." },
          { s: "·", n: "Middle Dot (thin)" },
          { s: "│", n: "Vertical Bar (text)", hint: "Slim pipe — works inline." },
          { s: "|", n: "ASCII Pipe" },
          { s: "▪", n: "Small Black Square" },
          { s: "→", n: "Right Arrow", hint: "'role → company' bio pattern." },
          { s: "✦", n: "Black Four-Pointed Star" },
          { s: "✧", n: "White Four-Pointed Star" },
          { s: "▸", n: "Small Right Triangle" },
          { s: "/", n: "Slash", hint: "Inline 'this / that' tagging." },
          { s: "—", n: "Em Dash" },
          { s: "–", n: "En Dash" },
          { s: "·", n: "Interpunct" },
          { s: "⌁", n: "Electric Arrow" },
          { s: "✶", n: "Six-Pointed Star" },
          { s: "✷", n: "Eight-Pointed Pinwheel" },
          { s: "✸", n: "Heavy Eight-Pointed" },
          { s: "✺", n: "Sixteen-Pointed Asterisk" },
          { s: "❍", n: "Shadowed Circle" },
          { s: "◆", n: "Black Diamond" },
          { s: "◇", n: "White Diamond" },
          { s: "▲", n: "Black Up Triangle" },
          { s: "△", n: "White Up Triangle" }
        ]
      },
      {
        id: "tweet-accents",
        name: "Tweet Accents",
        description: "Thread, retweet, and reply markers that show up in every viral thread.",
        symbols: [
          { s: "🧵", n: "Spool of Thread", hint: "Marks the start of a thread." },
          { s: "👇", n: "Backhand Pointing Down", hint: "'1/n below.'" },
          { s: "👆", n: "Backhand Pointing Up", hint: "Refers to tweet above." },
          { s: "👉", n: "Backhand Pointing Right" },
          { s: "👈", n: "Backhand Pointing Left" },
          { s: "🔁", n: "Repeat Button", hint: "Manual RT indicator." },
          { s: "❤", n: "Red Heart" },
          { s: "💬", n: "Speech Balloon", hint: "Reply-engagement marker." },
          { s: "🔖", n: "Bookmark" },
          { s: "📌", n: "Pushpin", hint: "Pinned-tweet reference." },
          { s: "📎", n: "Paperclip" },
          { s: "🔗", n: "Link Symbol" },
          { s: "📊", n: "Bar Chart" },
          { s: "📈", n: "Chart Increasing" },
          { s: "📉", n: "Chart Decreasing" },
          { s: "🚨", n: "Police Car Light", hint: "Breaking news." },
          { s: "‼️", n: "Double Exclamation" },
          { s: "⚡", n: "High Voltage" },
          { s: "🔥", n: "Fire" },
          { s: "💯", n: "Hundred" },
          { s: "👀", n: "Eyes", hint: "'Take a look' tease." },
          { s: "🫡", n: "Saluting Face" },
          { s: "🙏", n: "Folded Hands" },
          { s: "🤝", n: "Handshake" },
          { s: "🥇", n: "First Place Medal" }
        ]
      },
      {
        id: "account-style",
        name: "Account-Style",
        description: "Crown, lightning, fire, and diamond glyphs for founder / builder / flex bios.",
        symbols: [
          { s: "👑", n: "Crown", hint: "Status-flex prefix." },
          { s: "⚡", n: "High Voltage", hint: "'⚡ Building...' tagline." },
          { s: "🔥", n: "Fire" },
          { s: "💎", n: "Gem Stone", hint: "Diamond-hands / premium." },
          { s: "🛠", n: "Hammer and Wrench", hint: "'Builder' bio marker." },
          { s: "🦄", n: "Unicorn", hint: "Startup unicorn / rare." },
          { s: "🚀", n: "Rocket", hint: "Growth / shipping fast." },
          { s: "💼", n: "Briefcase" },
          { s: "🏆", n: "Trophy" },
          { s: "🎯", n: "Bullseye", hint: "'Focused on X' bio." },
          { s: "♟", n: "Black Chess Pawn" },
          { s: "♛", n: "Black Queen" },
          { s: "⚔", n: "Crossed Swords" },
          { s: "🛡", n: "Shield" },
          { s: "🗡", n: "Dagger" },
          { s: "🪙", n: "Coin" },
          { s: "💰", n: "Money Bag" },
          { s: "💵", n: "Dollar Banknote" },
          { s: "🎩", n: "Top Hat" },
          { s: "🧠", n: "Brain", hint: "Big-brain take." },
          { s: "🏛", n: "Classical Building" },
          { s: "🇺🇸", n: "Flag US", hint: "Patriot-bio common." },
          { s: "✝", n: "Latin Cross" },
          { s: "🇮🇱", n: "Flag Israel" }
        ]
      },
      {
        id: "niche-tags",
        name: "Niche Tags",
        description: "Symbols common in tech, finance, AI, and crypto profile bios.",
        symbols: [
          { s: "🚀", n: "Rocket", hint: "Crypto/tech 'to the moon'." },
          { s: "📈", n: "Chart Increasing", hint: "Finance / markets." },
          { s: "📉", n: "Chart Decreasing" },
          { s: "📊", n: "Bar Chart", hint: "Data / analytics." },
          { s: "🤖", n: "Robot", hint: "AI / ML accounts." },
          { s: "🧪", n: "Test Tube", hint: "Research / experiment." },
          { s: "⚗", n: "Alembic" },
          { s: "🔬", n: "Microscope", hint: "Science Twitter." },
          { s: "🧬", n: "DNA", hint: "Biotech." },
          { s: "💻", n: "Laptop" },
          { s: "🖥", n: "Desktop Computer" },
          { s: "⌨", n: "Keyboard" },
          { s: "🖱", n: "Computer Mouse" },
          { s: "🪐", n: "Ringed Planet", hint: "Space / Saturn-girl." },
          { s: "🛰", n: "Satellite" },
          { s: "🌐", n: "Globe with Meridians" },
          { s: "₿", n: "Bitcoin Sign", hint: "BTC bios." },
          { s: "Ξ", n: "Capital Xi / Ethereum" },
          { s: "◎", n: "Bullseye (Solana SOL)" },
          { s: "Ð", n: "Eth / Dogecoin (D-stroke)" },
          { s: "⟁", n: "Triangle (Avalanche-ish)" },
          { s: "$", n: "Dollar Sign", hint: "$TICKER finance shorthand." },
          { s: "€", n: "Euro" },
          { s: "£", n: "Pound" },
          { s: "¥", n: "Yen" },
          { s: "₹", n: "Indian Rupee" },
          { s: "%", n: "Percent" },
          { s: "‱", n: "Per Ten Thousand" }
        ]
      }
    ],
    faqs: [
      {
        q: "How do I add a symbol to my X / Twitter bio?",
        a: "Tap your profile picture, then 'Edit profile', then the Bio field. Paste your symbol-decorated text and tap Save. Symbols count toward the 160-character bio limit — emoji typically cost 2 characters each, plain text symbols cost 1. The bio is parsed for live links and @mentions but otherwise displayed as-is."
      },
      {
        q: "Will symbols affect my tweets in search or the algorithm?",
        a: "X's search indexes hashtags and tokens, so symbols are invisible to search but don't hurt ranking either. The For You algorithm reportedly rewards 'long-form' formatted content, and clean separators (• | →) improve readability and dwell time, which can help. Avoid spammy bursts of fire 🔥 emoji at the end of every tweet — engagement-bait patterns are demoted."
      },
      {
        q: "Why does my X bio look different on mobile vs desktop?",
        a: "X's web client falls back to system fonts, so the same star or arrow can look slightly heavier on Windows vs Mac. Emoji are rendered via Twemoji on web but via the device emoji set on mobile apps, so a 🔥 on iPhone looks different to the same tweet viewed on twitter.com. Plan around your largest audience surface."
      },
      {
        q: "How many characters do emoji really use in a tweet?",
        a: "Most single emoji count as 2 (a high and low surrogate in UTF-16). Flag emoji and skin-tone modified emoji count as 4-7. Plain Unicode symbols like ★ ✦ → are 1 each. If you're packing a thread tweet to 280, the difference matters — a quick Twitter character counter helps verify before posting."
      },
      {
        q: "What's the etiquette for the 🧵 thread emoji?",
        a: "Put it at the end of the first tweet (not the start) and number subsequent tweets like '2/n' or '2/12'. Twitter users skim, so the 🧵 signals 'scroll for more' without taking up the high-value opening characters. Don't use 🧵 on a single-tweet post — it sets up an expectation of a thread that isn't there."
      },
      {
        q: "Can I use crypto ticker symbols like ₿ Ξ in my bio?",
        a: "Yes — they're regular Unicode characters and X displays them fine. They don't auto-link to a token page (unlike $CASHTAG, which does). If you want a clickable ticker, use $BTC or $ETH; if you want pure aesthetic, the ₿ Ξ ◎ Ð glyphs read as instantly-crypto without consuming a $ prefix."
      }
    ]
  },

  tiktok: {
    id: "tiktok",
    name: "TikTok",
    emoji: "🎵",
    bioLimit: 80,
    tagline: "Symbols for TikTok bios, usernames, and captions",
    intro: "TikTok's bio is brutally tight at 80 characters and strips most consecutive line breaks. Symbols are the fastest way to add personality without burning characters on adjectives. The picks below skew Gen-Z 2024-25 — gothic-script letters, 彡 slashes, and the kawaii combos that trend in beauty / dance / aesthetic niches.",
    categories: [
      {
        id: "bio-decorations",
        name: "Bio Decorations",
        description: "Quick visual-mood glyphs that fit in TikTok's punishing 80-character bio.",
        symbols: [
          { s: "✨", n: "Sparkles" },
          { s: "🌙", n: "Crescent Moon" },
          { s: "⭐", n: "Star" },
          { s: "💫", n: "Dizzy Symbol" },
          { s: "🌟", n: "Glowing Star" },
          { s: "🌸", n: "Cherry Blossom" },
          { s: "🦋", n: "Butterfly", hint: "Mega-popular on aesthetic TikTok." },
          { s: "🌷", n: "Tulip" },
          { s: "🤍", n: "White Heart" },
          { s: "🖤", n: "Black Heart" },
          { s: "❤", n: "Red Heart" },
          { s: "🧚", n: "Fairy", hint: "'Fairycore' bios." },
          { s: "🪞", n: "Mirror" },
          { s: "🪐", n: "Ringed Planet" },
          { s: "☁", n: "Cloud (text)" },
          { s: "☾", n: "Crescent Moon (text)" },
          { s: "✧", n: "Four-Pointed Star (text)" },
          { s: "♡", n: "White Heart Suit", hint: "Saves characters vs emoji." },
          { s: "❀", n: "Flower (text)" },
          { s: "˚", n: "Ring Above" },
          { s: "⊹", n: "Cute Dot Star" },
          { s: "✿", n: "Black Flower" },
          { s: "♥", n: "Black Heart Suit" },
          { s: "🌺", n: "Hibiscus" },
          { s: "🌼", n: "Blossom" }
        ]
      },
      {
        id: "trending-symbols",
        name: "Trending Symbols",
        description: "Gen-Z 2024-25 staples — gothic-script letters and the 彡 slashes still going viral.",
        symbols: [
          { s: "꧁꧂", n: "Filigree Brackets" },
          { s: "彡", n: "Three Slashes", hint: "'fast' aesthetic." },
          { s: "ヾ", n: "Voiced Iteration Mark" },
          { s: "ッ", n: "Small Tsu" },
          { s: "ツ", n: "Tsu" },
          { s: "シ", n: "Shi (looks like smile)" },
          { s: "𝓛", n: "Math Script L" },
          { s: "𝓞", n: "Math Script O" },
          { s: "𝓥", n: "Math Script V" },
          { s: "𝓔", n: "Math Script E" },
          { s: "𝓐", n: "Math Script A" },
          { s: "𝔅", n: "Fraktur Bold B" },
          { s: "𝔄", n: "Fraktur Bold A" },
          { s: "𝔇", n: "Fraktur Bold D" },
          { s: "𝕯", n: "Bold Fraktur D" },
          { s: "𝖔", n: "Bold Fraktur o" },
          { s: "ᴀ", n: "Small-caps A" },
          { s: "ʙ", n: "Small-caps B" },
          { s: "ᴄ", n: "Small-caps C" },
          { s: "ᴅ", n: "Small-caps D" },
          { s: "𝕒", n: "Double-struck a" },
          { s: "𝕓", n: "Double-struck b" },
          { s: "𝟙", n: "Double-struck 1" },
          { s: "𝟚", n: "Double-struck 2" },
          { s: "𓆩♡𓆪", n: "Egyptian Heart Combo" },
          { s: "ೃ", n: "Kannada Sign", hint: "Soft 'ೃ࿔' combos." },
          { s: "࿔", n: "Tibetan Symbol" },
          { s: "ʚɞ", n: "Heart-half Combo" },
          { s: "ᰔ", n: "Heart Tag" }
        ]
      },
      {
        id: "mood-tags",
        name: "Mood Tags",
        description: "Skull, fire, pleading, clown, sparkle — emotional shorthand for Gen-Z bios and captions.",
        symbols: [
          { s: "💀", n: "Skull", hint: "'I'm dead' / cringe." },
          { s: "🔥", n: "Fire" },
          { s: "🥺", n: "Pleading Face" },
          { s: "🤡", n: "Clown Face", hint: "Self-deprecating callout." },
          { s: "✨", n: "Sparkles", hint: "'✨ tone-marker ✨' irony." },
          { s: "🫠", n: "Melting Face", hint: "'I'm cooked.'" },
          { s: "💅", n: "Nail Polish" },
          { s: "👁👄👁", n: "Eyes-Mouth Combo", hint: "'...okay then'." },
          { s: "💁", n: "Tipping Hand" },
          { s: "🙄", n: "Face With Rolling Eyes" },
          { s: "😭", n: "Loudly Crying", hint: "Laughing-so-hard." },
          { s: "🥲", n: "Smile With Tear" },
          { s: "😩", n: "Weary Face" },
          { s: "🤌", n: "Pinched Fingers" },
          { s: "🫦", n: "Biting Lip" },
          { s: "🫶", n: "Heart Hands" },
          { s: "💆", n: "Person Getting Massage" },
          { s: "🙃", n: "Upside-Down Face" },
          { s: "👽", n: "Alien" },
          { s: "🦴", n: "Bone", hint: "'Bones-day' TikTok meme." },
          { s: "🥶", n: "Cold Face", hint: "'Ice cold' callout." },
          { s: "👹", n: "Ogre", hint: "'Goblin mode'." },
          { s: "🪩", n: "Mirror Ball", hint: "Disco / party energy." }
        ]
      },
      {
        id: "creator-markers",
        name: "Creator Markers",
        description: "Location pins, cameras, and play buttons for content-creator and small-business TikTok bios.",
        symbols: [
          { s: "📍", n: "Round Pushpin", hint: "Location of your business." },
          { s: "🎥", n: "Movie Camera" },
          { s: "🎬", n: "Clapper Board" },
          { s: "▶", n: "Black Right Pointer", hint: "'▶ New video Fri'." },
          { s: "🎞", n: "Film Frames" },
          { s: "📸", n: "Camera with Flash" },
          { s: "📷", n: "Camera" },
          { s: "🎙", n: "Studio Microphone" },
          { s: "🎤", n: "Microphone" },
          { s: "🎧", n: "Headphones" },
          { s: "📺", n: "Television" },
          { s: "🛒", n: "Shopping Cart", hint: "TikTok Shop link tease." },
          { s: "🛍", n: "Shopping Bags" },
          { s: "💌", n: "Love Letter", hint: "'DM for collabs'." },
          { s: "✉", n: "Envelope" },
          { s: "📩", n: "Envelope with Arrow" },
          { s: "🔗", n: "Link", hint: "'Link in bio'." },
          { s: "👇", n: "Backhand Pointing Down", hint: "'👇 New drop'." },
          { s: "📅", n: "Calendar" },
          { s: "⏰", n: "Alarm Clock" },
          { s: "🆕", n: "NEW Button" },
          { s: "🏷", n: "Label" },
          { s: "🛎", n: "Bellhop Bell", hint: "'Hit the bell' callout." },
          { s: "✂", n: "Scissors" }
        ]
      }
    ],
    faqs: [
      {
        q: "How do I add symbols to my TikTok bio?",
        a: "Open the app, tap your profile, then 'Edit profile' -> 'Bio'. Paste your symbol-decorated text and tap Save. Your bio caps at 80 characters total, including emoji (which count as 2 each on TikTok's counter). The TikTok web editor is more forgiving for previewing before you commit on mobile."
      },
      {
        q: "Why does my TikTok bio strip line breaks?",
        a: "TikTok flattens consecutive line breaks down to one and ignores leading whitespace. If you paste a multi-line bio from Notes, expect everything to compress to a single visual line on most devices. Use separator symbols like • | → instead of trying to force vertical layouts."
      },
      {
        q: "Can I use fancy fonts like 𝓢𝓮𝓻𝓲𝓯 in my TikTok username?",
        a: "Yes — the username field accepts mathematical-script and double-struck letters since they're separate Unicode code points. The downside: TikTok's search will not match those decorated letters against searches for the plain-ASCII version. Decide whether discoverability or aesthetic matters more."
      },
      {
        q: "Will symbols affect my TikTok For You page reach?",
        a: "No — TikTok's recommendation system reads watch-time, completion, and engagement signals, not your bio's character composition. The bio's only ranking effect is encouraging click-through to your profile after a viral video. Stack the bio with creator info (📍 location, ▶ posting schedule) rather than pure decoration."
      },
      {
        q: "Why do some symbols I paste turn into question marks?",
        a: "TikTok's iOS and Android apps have slightly different Unicode coverage, and rare characters like recently-added emoji (the 2023 wireless arrow, custom flags) sometimes render as a blank box on the opposite OS. Test your bio by opening your own profile in an incognito web browser to preview the safest version."
      },
      {
        q: "What's a good 80-character TikTok bio template?",
        a: "Try: '📍 City • ▶ daily clips • ✨ DM for collabs 👇'. That fits inside 60 characters and leaves room for one personality tag like 🦋 or 💀. Lead with the highest-value info (location, niche, CTA) and use symbols to break those tokens up — TikTok's compact bio rewards density over flowery decoration."
      }
    ]
  },

  facebook: {
    id: "facebook",
    name: "Facebook",
    emoji: "👥",
    bioLimit: 101,
    tagline: "Symbols for Facebook bios, status posts, and Groups",
    intro: "Facebook's audience skews older and the platform's emoji rendering follows the user's device rather than a Facebook-specific set. Bios cap at 101 characters and 'Intro' fields are even shorter, so symbols need to communicate quickly to a family-and-friends audience. The selection below leans gentle, family-safe, and inspirational — the categories that actually trend on Facebook today.",
    categories: [
      {
        id: "status-decorations",
        name: "Status Decorations",
        description: "Soft sun, star, heart, and gratitude glyphs for daily status posts and 'feeling' updates.",
        symbols: [
          { s: "☀", n: "Sun (text)" },
          { s: "☀️", n: "Sun (emoji)" },
          { s: "⭐", n: "Star" },
          { s: "🌟", n: "Glowing Star" },
          { s: "✨", n: "Sparkles" },
          { s: "❤", n: "Red Heart (text)" },
          { s: "❤️", n: "Red Heart (emoji)" },
          { s: "💕", n: "Two Hearts" },
          { s: "💖", n: "Sparkling Heart" },
          { s: "💗", n: "Growing Heart" },
          { s: "🙏", n: "Folded Hands", hint: "'Blessed' status." },
          { s: "🌸", n: "Cherry Blossom" },
          { s: "🌹", n: "Rose" },
          { s: "🌺", n: "Hibiscus" },
          { s: "🌻", n: "Sunflower" },
          { s: "🌷", n: "Tulip" },
          { s: "💐", n: "Bouquet", hint: "Birthday / condolence posts." },
          { s: "🦋", n: "Butterfly" },
          { s: "🐝", n: "Honeybee" },
          { s: "🌈", n: "Rainbow" },
          { s: "☘", n: "Shamrock" },
          { s: "🍀", n: "Four-Leaf Clover" },
          { s: "🌿", n: "Herb" },
          { s: "🍃", n: "Leaf" },
          { s: "💛", n: "Yellow Heart" },
          { s: "💚", n: "Green Heart" },
          { s: "💙", n: "Blue Heart" },
          { s: "💜", n: "Purple Heart" },
          { s: "🤎", n: "Brown Heart" }
        ]
      },
      {
        id: "relationship-family",
        name: "Relationship & Family",
        description: "Family, wedding, and baby glyphs for engagements, births, and anniversary posts.",
        symbols: [
          { s: "👨‍👩‍👧‍👦", n: "Family (M/W/G/B)" },
          { s: "👨‍👩‍👧", n: "Family (M/W/G)" },
          { s: "👨‍👩‍👦", n: "Family (M/W/B)" },
          { s: "👩‍👧‍👦", n: "Family (W/G/B)" },
          { s: "👨‍👧‍👦", n: "Family (M/G/B)" },
          { s: "💕", n: "Two Hearts" },
          { s: "💑", n: "Couple With Heart" },
          { s: "💍", n: "Ring", hint: "Engagement announcement." },
          { s: "👰", n: "Person With Veil" },
          { s: "🤵", n: "Person in Tuxedo" },
          { s: "💒", n: "Wedding" },
          { s: "👶", n: "Baby", hint: "Birth announcement." },
          { s: "🍼", n: "Baby Bottle" },
          { s: "🎂", n: "Birthday Cake" },
          { s: "🎈", n: "Balloon" },
          { s: "🎁", n: "Wrapped Gift" },
          { s: "🥳", n: "Partying Face" },
          { s: "👵", n: "Older Woman" },
          { s: "👴", n: "Older Man" },
          { s: "🧑‍🦱", n: "Person: Curly Hair" },
          { s: "💏", n: "Kiss" },
          { s: "🌹", n: "Rose" },
          { s: "🥂", n: "Clinking Glasses" }
        ]
      },
      {
        id: "religious-inspirational",
        name: "Religious & Inspirational",
        description: "Cross, prayer, peace, and dove glyphs common on Facebook devotional and inspirational posts.",
        symbols: [
          { s: "🙏", n: "Folded Hands" },
          { s: "✝", n: "Latin Cross (text)" },
          { s: "✝️", n: "Latin Cross (emoji)" },
          { s: "☪", n: "Star and Crescent", hint: "Islam." },
          { s: "☪️", n: "Star and Crescent (emoji)" },
          { s: "✡", n: "Star of David", hint: "Judaism." },
          { s: "🕉", n: "Om", hint: "Hindu / yoga." },
          { s: "☸", n: "Wheel of Dharma", hint: "Buddhism." },
          { s: "☯", n: "Yin Yang" },
          { s: "☮", n: "Peace Symbol" },
          { s: "🕊", n: "Dove", hint: "Peace / condolence." },
          { s: "👼", n: "Baby Angel" },
          { s: "😇", n: "Smiling Face with Halo" },
          { s: "🌅", n: "Sunrise", hint: "'New day' devotional." },
          { s: "🌄", n: "Sunrise Over Mountains" },
          { s: "✨", n: "Sparkles" },
          { s: "💫", n: "Dizzy" },
          { s: "⛪", n: "Church" },
          { s: "🕯", n: "Candle", hint: "Memorial post." },
          { s: "📖", n: "Open Book", hint: "Scripture verse." },
          { s: "📿", n: "Prayer Beads" },
          { s: "🛐", n: "Place of Worship" },
          { s: "🌟", n: "Glowing Star" },
          { s: "💐", n: "Bouquet" }
        ]
      },
      {
        id: "group-community",
        name: "Group / Community",
        description: "Megaphone, calendar, and house glyphs that prefix group rules, event posts, and meet-up listings.",
        symbols: [
          { s: "📢", n: "Loudspeaker", hint: "Announcement to group." },
          { s: "📣", n: "Cheering Megaphone" },
          { s: "📅", n: "Calendar" },
          { s: "🗓", n: "Spiral Calendar" },
          { s: "⏰", n: "Alarm Clock", hint: "Event reminder." },
          { s: "🎉", n: "Party Popper" },
          { s: "🎊", n: "Confetti Ball" },
          { s: "🎈", n: "Balloon" },
          { s: "🏠", n: "House", hint: "Local-area / neighborhood group." },
          { s: "🏡", n: "House With Garden" },
          { s: "🏘", n: "Houses" },
          { s: "🏙", n: "Cityscape" },
          { s: "📍", n: "Pushpin", hint: "Meet-up location." },
          { s: "📌", n: "Pushpin (vertical)" },
          { s: "🆕", n: "NEW Button" },
          { s: "👥", n: "Busts in Silhouette", hint: "Group icon." },
          { s: "👋", n: "Waving Hand", hint: "New-member welcome." },
          { s: "📝", n: "Memo", hint: "Group rules / pinned post." },
          { s: "🔔", n: "Bell", hint: "Notification reminder." },
          { s: "🆘", n: "SOS Button", hint: "Help request." },
          { s: "❓", n: "Question Mark" },
          { s: "ℹ️", n: "Information" },
          { s: "⚠️", n: "Warning Sign" },
          { s: "✅", n: "Check Mark", hint: "Approved / sold / done." },
          { s: "❌", n: "Cross Mark", hint: "Closed / cancelled." }
        ]
      }
    ],
    faqs: [
      {
        q: "How do I add a symbol to my Facebook bio?",
        a: "Open Facebook (web or app), go to your profile, tap 'Edit Bio', then paste your symbol-decorated text. Bios cap at 101 characters. On desktop you can also paste into the 'About' details for fields like 'Work', 'Education', and 'Places lived', though those are more conservative spaces and emoji can feel out of place."
      },
      {
        q: "Why do emoji look different on Facebook than my phone's keyboard?",
        a: "Facebook displays emoji using the viewer's device font on most platforms — so iPhone users see Apple emoji, Android users see Google emoji, and Windows users see Segoe UI Emoji. Older Android phones in particular have outdated emoji sets, which is why a fresh 🫶 or 🪩 sometimes appears as a blank box for a relative on an older device."
      },
      {
        q: "Can I add symbols to a Facebook Group name or event title?",
        a: "Yes — Group names and Event titles both accept full Unicode, and a leading 📢 or 📅 helps the listing stand out in members' feed of pinned items. Group admins should pick one prefix style and stick to it across announcements; mixing 📌 and 📍 randomly can look disorganised to older members."
      },
      {
        q: "Are there symbols that get a Facebook post flagged or downranked?",
        a: "Facebook's News Feed algorithm doesn't penalise symbols themselves, but spammy patterns like all-caps + bursts of fire 🔥🔥🔥 or money 💰💰💰 emoji can trigger 'engagement bait' detection. Keep the symbol count under five per post and pair them with genuine text — the soft, family-friendly glyphs in our Status Decorations category are completely safe."
      },
      {
        q: "Do symbols work in Facebook Marketplace listings?",
        a: "Yes — listing titles and descriptions both accept emoji and Unicode symbols. A leading ✅ (sold), 🆕 (new), or 📍 (location) helps your listing scan faster in the buyer's feed. Don't replace the actual price or condition text with emoji-only — Marketplace search relies on plain-text keywords."
      },
      {
        q: "What's a good Facebook bio template for a family / personal profile?",
        a: "Try: '🙏 Blessed mama 💕 wife of @name ☀ Texas 🌻 [verse]'. That keeps it under 101 characters and matches Facebook's older-skewing culture better than tech-style bios. Reserve the heavier emoji combos for status posts where you have a full text field rather than the constrained bio space."
      }
    ]
  }
};

export const platformIds: PlatformId[] = ["instagram", "discord", "whatsapp", "twitter", "tiktok", "facebook"];

export function getPlatform(id: string): PlatformConfig | undefined {
  return (platforms as Record<string, PlatformConfig>)[id];
}
