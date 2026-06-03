// Verified enrichment content for thin high-impression symbol pages.
// Codepoints, HTML entities and CSS escapes verified via Unicode data
// (ruflo research, 2026-06). Drives both the visible sections and the
// FAQPage schema on each page so they stay in sync. DO NOT hand-edit values
// without re-verifying codepoints.

export interface HowToRow { platform: string; method: string; }
export interface RefRow { symbol: string; name: string; codepoint: string; html: string; css: string; }
export interface QA { q: string; a: string; }
export interface SymbolEnrichmentPack {
  slug: string;
  about: string;
  meaning: string;
  howto: HowToRow[];
  table: RefRow[];
  faqs: QA[];
}

export const symbolEnrichment: Record<string, SymbolEnrichmentPack> = {
  "checkmark": {
    "slug": "checkmark",
    "about": "The check mark (Unicode CHECK MARK, U+2713, ✓) is a symbol used to indicate that something is correct, completed, verified, or chosen. It appears constantly in to-do lists, checkboxes, forms, spreadsheets like Excel and Google Sheets, and chat apps such as WhatsApp, Discord, Slack, and Instagram, where it signals approval or a finished task. Related variants include the bolder ✔ (U+2714), the green emoji ✅ (U+2705), and the checked box ☑ (U+2611).",
    "meaning": "A check mark means 'yes', 'done', 'correct', or 'approved', and pairs with an X mark (✗ or ❌) for 'no' or 'wrong'. The differences are mostly weight and rendering: ✓ is a thin text check, ✔ is a heavy check, and ✅ is a full-color emoji (a white check inside a green rounded square) that displays in color on phones, while ☑ and ☒ are checkbox glyphs rather than standalone checks.",
    "howto": [
      {
        "platform": "Windows",
        "method": "For the heavy check ✔ press Alt + 10004 on the numeric keypad; the thin ✓ is Alt + 10003. In most apps the Alt + decimal codes above 255 only work reliably in Microsoft Word; elsewhere it is easiest to copy ✓ from this page or use Word's Insert > Symbol."
      },
      {
        "platform": "Mac",
        "method": "There is no single Option key shortcut for ✓ on the US layout, so copy it from this page, or open the Emoji & Symbols viewer with Control + Command + Space and search 'check'."
      },
      {
        "platform": "iPhone / iOS",
        "method": "Open the emoji keyboard (globe or smiley icon) and search 'check' to insert ✅ or ☑️; for a plain ✓ copy it from this page, since iOS has no dedicated key for the text check mark."
      },
      {
        "platform": "Android",
        "method": "Open the emoji keyboard and search 'check' for ✅ or ☑️ (Gboard supports search); for the plain ✓ copy it from this page."
      },
      {
        "platform": "HTML",
        "method": "Thin check ✓ = &check; or &checkmark; or &#10003; — heavy check ✔ has no named entity, use &#10004; — green emoji ✅ = &#9989;."
      },
      {
        "platform": "Word / Google Docs",
        "method": "In Word: Insert > Symbol > More Symbols, set the font to a normal font like Segoe UI Symbol or Wingdings and pick the check; or type 2713 then press Alt + X. In Google Docs: Insert > Special characters and search 'check mark'."
      }
    ],
    "table": [
      {
        "symbol": "✓",
        "name": "Check Mark",
        "codepoint": "U+2713",
        "html": "&check; &#10003;",
        "css": "\\2713"
      },
      {
        "symbol": "✔",
        "name": "Heavy Check Mark",
        "codepoint": "U+2714",
        "html": "&#10004;",
        "css": "\\2714"
      },
      {
        "symbol": "✅",
        "name": "White Heavy Check Mark (emoji)",
        "codepoint": "U+2705",
        "html": "&#9989;",
        "css": "\\2705"
      },
      {
        "symbol": "☑",
        "name": "Ballot Box with Check",
        "codepoint": "U+2611",
        "html": "&#9745;",
        "css": "\\2611"
      },
      {
        "symbol": "☒",
        "name": "Ballot Box with X",
        "codepoint": "U+2612",
        "html": "&#9746;",
        "css": "\\2612"
      },
      {
        "symbol": "✗",
        "name": "Ballot X",
        "codepoint": "U+2717",
        "html": "&cross; &#10007;",
        "css": "\\2717"
      },
      {
        "symbol": "✘",
        "name": "Heavy Ballot X",
        "codepoint": "U+2718",
        "html": "&#10008;",
        "css": "\\2718"
      },
      {
        "symbol": "❌",
        "name": "Cross Mark (emoji)",
        "codepoint": "U+274C",
        "html": "&#10060;",
        "css": "\\274C"
      },
      {
        "symbol": "☐",
        "name": "Ballot Box (empty)",
        "codepoint": "U+2610",
        "html": "&#9744;",
        "css": "\\2610"
      },
      {
        "symbol": "✕",
        "name": "Multiplication X",
        "codepoint": "U+2715",
        "html": "&#10005;",
        "css": "\\2715"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between ✓ and ✔?",
        "a": "They are two separate Unicode characters: ✓ is CHECK MARK (U+2713), a thin/regular-weight check, and ✔ is HEAVY CHECK MARK (U+2714), a bolder version. Both are plain text glyphs that take the surrounding text color, unlike the emoji ✅."
      },
      {
        "q": "What is the difference between ✔ and ✅?",
        "a": "✔ (U+2714) is a monochrome text symbol that inherits your text color, while ✅ (U+2705, White Heavy Check Mark) is an emoji that renders as a white check inside a green rounded square on phones and most apps. Use ✅ when you want the recognizable green badge, and ✔ when you want a check that matches surrounding text."
      },
      {
        "q": "How do I type a check mark on Windows?",
        "a": "Copying ✓ from this page is the most reliable method. The Alt-code Alt + 10003 (held on the numeric keypad) produces ✓ inside Microsoft Word, but codes above 255 do not work consistently in every Windows app, so copy-paste or Word's Insert > Symbol is recommended elsewhere."
      },
      {
        "q": "How do I make a check mark on iPhone or Android?",
        "a": "Open the emoji keyboard and search 'check' to insert the ✅ emoji or the ☑️ checked box. Phones have no dedicated key for the plain text ✓, so for that exact character copy it from this page."
      },
      {
        "q": "What is the HTML code for a check mark?",
        "a": "The thin check ✓ has named entities &check; and &checkmark;, or numeric &#10003;. The heavy check ✔ has no named entity, so use &#10004;. The green emoji ✅ is &#9989;."
      },
      {
        "q": "Why does my check mark show up as a box or look different on another device?",
        "a": "A blank box or different shape means the other device's font lacks that exact glyph or substitutes a different style. Emoji checks like ✅ render in color on phones but may appear flat in some desktop fonts, and rarely-supported glyphs can fall back to a tofu box. Copying the standard ✓ (U+2713) maximizes compatibility."
      }
    ]
  },
  "degree-symbol": {
    "slug": "degree-symbol",
    "about": "The degree symbol (Unicode DEGREE SIGN, U+00B0, °) is a small raised circle used after a number to denote degrees. It appears in temperatures (25 °C, 98.6 °F), angles and geometry (a 90° turn), and geographic coordinates (40° N, 74° W), and is widely typed in Word, Excel, web pages, weather apps, and social posts on Instagram, Discord, and elsewhere. Related characters include the precomposed ℃ (U+2103) and ℉ (U+2109), and the prime marks ′ ″ used for arcminutes and arcseconds.",
    "meaning": "The degree sign marks a unit of measurement for temperature, plane angles, and map coordinates. In temperature it precedes the scale letter (°C, °F), in geometry it follows an angle value (45°), and in coordinates it pairs with the prime ′ (arcminutes) and double prime ″ (arcseconds). The single ° is the standard character; the ligatures ℃ and ℉ are convenience glyphs, while ᵒ (a small superscript letter o) is a lookalike that should not be used as a true degree sign.",
    "howto": [
      {
        "platform": "Windows",
        "method": "Hold Alt and type 0176 on the numeric keypad (Num Lock on), then release: Alt + 0176 = °."
      },
      {
        "platform": "Mac",
        "method": "Press Option + Shift + 8 for °. (Option + K gives the lookalike modifier ˚, so Option + Shift + 8 is the correct degree sign.)"
      },
      {
        "platform": "iPhone / iOS",
        "method": "Switch to the number/symbols keyboard (123), then press and hold the 0 key; a popup shows ° — slide to it and release."
      },
      {
        "platform": "Android",
        "method": "On Gboard, switch to the symbols keyboard (?123), then press and hold the 0 key (or open the second symbols page =\\<) to reveal and select °."
      },
      {
        "platform": "HTML",
        "method": "Use the named entity &deg; or the numeric &#176; for °. For the ligatures use &#8451; (℃) and &#8457; (℉); neither has a named entity."
      },
      {
        "platform": "Word / Google Docs",
        "method": "In Word: Insert > Symbol (the ° is in the Latin-1 Supplement subset), or type 00B0 then press Alt + X. In Google Docs: Insert > Special characters and search 'degree'."
      }
    ],
    "table": [
      {
        "symbol": "°",
        "name": "Degree Sign",
        "codepoint": "U+00B0",
        "html": "&deg; &#176;",
        "css": "\\B0"
      },
      {
        "symbol": "℃",
        "name": "Degree Celsius",
        "codepoint": "U+2103",
        "html": "&#8451;",
        "css": "\\2103"
      },
      {
        "symbol": "℉",
        "name": "Degree Fahrenheit",
        "codepoint": "U+2109",
        "html": "&#8457;",
        "css": "\\2109"
      },
      {
        "symbol": "ᵒ",
        "name": "Modifier Letter Small O (lookalike)",
        "codepoint": "U+1D52",
        "html": "&#7506;",
        "css": "\\1D52"
      },
      {
        "symbol": "′",
        "name": "Prime (arcminutes / feet)",
        "codepoint": "U+2032",
        "html": "&prime; &#8242;",
        "css": "\\2032"
      },
      {
        "symbol": "″",
        "name": "Double Prime (arcseconds / inches)",
        "codepoint": "U+2033",
        "html": "&Prime; &#8243;",
        "css": "\\2033"
      }
    ],
    "faqs": [
      {
        "q": "How do I type the degree symbol on a Windows keyboard?",
        "a": "Hold the Alt key and type 0176 on the numeric keypad (with Num Lock on), then release: Alt + 0176 gives °. If your laptop has no numeric keypad, copy ° from this page or insert it from Word's Insert > Symbol menu."
      },
      {
        "q": "How do I type ° on a Mac?",
        "a": "Press Option + Shift + 8. Be careful not to use Option + K, which produces the ring/modifier character ˚ that looks similar but is a different codepoint and is not the correct degree sign."
      },
      {
        "q": "What is the HTML code for the degree symbol?",
        "a": "The degree sign has the named entity &deg; and the numeric entity &#176; (hex &#xB0;). Either one renders ° in all modern browsers."
      },
      {
        "q": "Should I use ° C or the single character ℃?",
        "a": "Both are acceptable. The everyday and most compatible form is the plain degree sign followed by the letter, 25 °C, using ° (U+00B0). The single ligature ℃ (U+2103) exists for compact typesetting but is less widely supported, so for general writing the separate ° plus C is safest."
      },
      {
        "q": "What is the difference between ° and the prime marks ′ ″?",
        "a": "The degree sign ° measures whole degrees, while the prime ′ (U+2032) marks arcminutes and the double prime ″ (U+2033) marks arcseconds when subdividing an angle or a coordinate, for example 40° 26′ 46″ N. The primes are also used for feet and inches; they are not apostrophes or quotation marks."
      },
      {
        "q": "Why does ᵒ look like a degree sign but cause problems?",
        "a": "ᵒ is MODIFIER LETTER SMALL O (U+1D52), a superscript letter, not a degree sign. It may look similar in some fonts but it is the wrong character semantically, can be read incorrectly by screen readers and search, and may not align like a true °. Always use ° (U+00B0) for degrees."
      }
    ]
  },
  "copyright-symbol": {
    "slug": "copyright-symbol",
    "about": "The copyright symbol (Unicode COPYRIGHT SIGN, U+00A9, ©) is the encircled letter C used to assert copyright ownership of creative work such as text, images, music, and software. It appears in website footers, book and document copyright notices, video credits, and product packaging, typically written as © 2026 Your Name. Closely related marks include the trademark ™ (U+2122), the registered trademark ® (U+00AE), and the legal/section signs § and ¶.",
    "meaning": "© asserts copyright in a creative work and is conventionally followed by the year and the rights holder. It is distinct from trademark marks: ™ claims an unregistered trademark on a brand name or logo, while ® indicates a trademark officially registered with a trademarks office and is legally restricted to registered marks. ℠ is the service-mark equivalent of ™ for services, ℗ marks the copyright of a sound recording, and § and ¶ are reference marks for legal sections and paragraphs rather than ownership marks.",
    "howto": [
      {
        "platform": "Windows",
        "method": "Hold Alt and type 0169 on the numeric keypad (Num Lock on): Alt + 0169 = ©. (Tip: in Word and many apps, typing (c) autocorrects to ©.)"
      },
      {
        "platform": "Mac",
        "method": "Press Option + G for ©. (Option + 2 gives ™ and Option + R gives ®.)"
      },
      {
        "platform": "iPhone / iOS",
        "method": "Switch to the symbols keyboard (123 then #+=) where © appears directly, or type (c) which iOS autocorrect may convert; otherwise copy © from this page."
      },
      {
        "platform": "Android",
        "method": "On Gboard, open the symbols keyboard (?123) and then the second page (=\\<); © is on the symbols pages. You can also long-press related symbol keys to find it, or copy it from this page."
      },
      {
        "platform": "HTML",
        "method": "Use the named entity &copy; or the numeric &#169; for ©. Related: &trade; (™, &#8482;), &reg; (®, &#174;), &sect; (§, &#167;), &para; (¶, &#182;)."
      },
      {
        "platform": "Word / Google Docs",
        "method": "In Word: type (c) and AutoCorrect converts it to ©, or Insert > Symbol, or type 00A9 then Alt + X. In Google Docs: Insert > Special characters and search 'copyright' (typing (c) also autocorrects)."
      }
    ],
    "table": [
      {
        "symbol": "©",
        "name": "Copyright Sign",
        "codepoint": "U+00A9",
        "html": "&copy; &#169;",
        "css": "\\A9"
      },
      {
        "symbol": "™",
        "name": "Trade Mark Sign",
        "codepoint": "U+2122",
        "html": "&trade; &#8482;",
        "css": "\\2122"
      },
      {
        "symbol": "®",
        "name": "Registered Sign",
        "codepoint": "U+00AE",
        "html": "&reg; &#174;",
        "css": "\\AE"
      },
      {
        "symbol": "℠",
        "name": "Service Mark",
        "codepoint": "U+2120",
        "html": "&#8480;",
        "css": "\\2120"
      },
      {
        "symbol": "℗",
        "name": "Sound Recording Copyright",
        "codepoint": "U+2117",
        "html": "&copysr; &#8471;",
        "css": "\\2117"
      },
      {
        "symbol": "§",
        "name": "Section Sign",
        "codepoint": "U+00A7",
        "html": "&sect; &#167;",
        "css": "\\A7"
      },
      {
        "symbol": "¶",
        "name": "Pilcrow (Paragraph) Sign",
        "codepoint": "U+00B6",
        "html": "&para; &#182;",
        "css": "\\B6"
      }
    ],
    "faqs": [
      {
        "q": "How do I type the copyright symbol on Windows?",
        "a": "Hold Alt and type 0169 on the numeric keypad with Num Lock on: Alt + 0169 produces ©. In Microsoft Word and many editors you can also just type (c) and it autocorrects to ©."
      },
      {
        "q": "How do I type © on a Mac?",
        "a": "Press Option + G. For the related marks, Option + 2 gives ™ and Option + R gives ®."
      },
      {
        "q": "What is the difference between ©, ™ and ®?",
        "a": "© claims copyright in a creative work (text, art, music, code). ™ claims a trademark on a brand name or logo that has not been formally registered. ® indicates a trademark that is officially registered with a trademark office, and using ® is legally limited to registered marks."
      },
      {
        "q": "What is the HTML code for the copyright symbol?",
        "a": "Use the named entity &copy; or the numeric entity &#169; (hex &#xA9;). Both render © in every modern browser."
      },
      {
        "q": "When should I use ™ instead of ®?",
        "a": "Use ™ for a brand, name, logo, or slogan you are claiming as a trademark but have not registered, including while an application is pending. Use ® only after the mark is officially registered, since using ® on an unregistered mark can be legally problematic in many jurisdictions."
      },
      {
        "q": "What are § and ¶ used for?",
        "a": "§ is the section sign, used to reference a numbered section of a law, contract, or document (for example § 12). ¶ is the pilcrow or paragraph sign, used to mark or reference a paragraph and to show paragraph breaks when formatting marks are visible in word processors. Neither asserts ownership the way © does."
      }
    ]
  },
  "arrow-symbols": {
    "slug": "arrow-symbols",
    "about": "Arrow symbols are directional glyphs led by the right arrow (Unicode RIGHTWARDS ARROW, U+2192, →), used to point, show direction, link cause to effect, or guide the eye from one item to the next. They appear in menus and step paths (File → Save), math and logic (A → B), diagrams, navigation, and decorative use in social bios on Instagram, TikTok, and Discord. The core set covers the four single arrows → ← ↑ ↓ plus the double-headed ↔, the double-line implication arrows ⇒ ⇐, and stylized variants like ➜, ➤, ⟶, and the hooked return arrow ↩.",
    "meaning": "An arrow points toward a direction or destination and is widely read as 'leads to', 'go to', or 'results in'. Single-line arrows (→ ← ↑ ↓) show plain direction or navigation; the double-line arrows ⇒ and ⇐ are conventionally used in logic and math to mean 'implies' and is implied by, distinct from the single → which often means a simple mapping or step. The heavy and long variants (➜ ➤ ⟶) are mostly stylistic emphasis, while the hooked ↩ suggests 'return', 'reply', or 'go back'.",
    "howto": [
      {
        "platform": "Windows",
        "method": "Right arrow → is Alt + 26 on the numeric keypad; up ↑ = Alt + 24, down ↓ = Alt + 25, left ← = Alt + 27 (these come from the legacy code page and work in many apps). For other arrows like ⇒ or ⟶, copy from this page or use Word: type the hex (e.g. 2192) then press Alt + X."
      },
      {
        "platform": "Mac",
        "method": "There are no standard Option shortcuts for the arrow glyphs on the US layout, so copy the arrow you need from this page, or open Emoji & Symbols (Control + Command + Space) and search 'arrow'."
      },
      {
        "platform": "iPhone / iOS",
        "method": "iOS has no dedicated arrow keys; copy the arrow from this page, or use the emoji keyboard and search 'arrow' for the colored arrow emoji (➡️, ⬅️, etc.)."
      },
      {
        "platform": "Android",
        "method": "On Gboard, search 'arrow' in the emoji keyboard for arrow emoji; for the plain text arrows (→ ← ↑ ↓ ⇒) copy them from this page since they are not on the standard symbols pages."
      },
      {
        "platform": "HTML",
        "method": "→ = &rarr; or &#8594; — ← = &larr; or &#8592; — ↑ = &uarr; or &#8593; — ↓ = &darr; or &#8595; — ↔ = &harr; or &#8596; — ⇒ = &rArr; or &#8658; — ⇐ = &lArr; or &#8656; — ⟶ = &xrarr; or &#10230; — ↩ = &larrhk; or &#8617;. The stylized ➜ (&#10140;) and ➤ (&#10148;) have no named entities."
      },
      {
        "platform": "Word / Google Docs",
        "method": "In Word: Insert > Symbol > More Symbols (arrows live in the 'Arrows' subset), or type the hex code such as 2192 then press Alt + X to turn it into →. AutoCorrect also turns --> into → and ==> into ⇒. In Google Docs: Insert > Special characters and search 'arrow' or draw the shape."
      }
    ],
    "table": [
      {
        "symbol": "→",
        "name": "Rightwards Arrow",
        "codepoint": "U+2192",
        "html": "&rarr; &#8594;",
        "css": "\\2192"
      },
      {
        "symbol": "←",
        "name": "Leftwards Arrow",
        "codepoint": "U+2190",
        "html": "&larr; &#8592;",
        "css": "\\2190"
      },
      {
        "symbol": "↑",
        "name": "Upwards Arrow",
        "codepoint": "U+2191",
        "html": "&uarr; &#8593;",
        "css": "\\2191"
      },
      {
        "symbol": "↓",
        "name": "Downwards Arrow",
        "codepoint": "U+2193",
        "html": "&darr; &#8595;",
        "css": "\\2193"
      },
      {
        "symbol": "↔",
        "name": "Left Right Arrow",
        "codepoint": "U+2194",
        "html": "&harr; &#8596;",
        "css": "\\2194"
      },
      {
        "symbol": "⇒",
        "name": "Rightwards Double Arrow",
        "codepoint": "U+21D2",
        "html": "&rArr; &#8658;",
        "css": "\\21D2"
      },
      {
        "symbol": "⇐",
        "name": "Leftwards Double Arrow",
        "codepoint": "U+21D0",
        "html": "&lArr; &#8656;",
        "css": "\\21D0"
      },
      {
        "symbol": "➜",
        "name": "Heavy Round-Tipped Rightwards Arrow",
        "codepoint": "U+279C",
        "html": "&#10140;",
        "css": "\\279C"
      },
      {
        "symbol": "➤",
        "name": "Black Rightwards Arrowhead",
        "codepoint": "U+27A4",
        "html": "&#10148;",
        "css": "\\27A4"
      },
      {
        "symbol": "⟶",
        "name": "Long Rightwards Arrow",
        "codepoint": "U+27F6",
        "html": "&xrarr; &#10230;",
        "css": "\\27F6"
      },
      {
        "symbol": "↩",
        "name": "Leftwards Arrow with Hook (return)",
        "codepoint": "U+21A9",
        "html": "&larrhk; &#8617;",
        "css": "\\21A9"
      }
    ],
    "faqs": [
      {
        "q": "How do I type a right arrow → on Windows?",
        "a": "On a keyboard with a numeric keypad, hold Alt and type 26, then release: Alt + 26 gives →. The other legacy codes are Alt + 24 (↑), Alt + 25 (↓), and Alt + 27 (←). For arrows outside that set, copy from this page or type the hex code (e.g. 2192) in Word and press Alt + X."
      },
      {
        "q": "What is the HTML code for arrows?",
        "a": "The four basic arrows have short named entities: → is &rarr; (&#8594;), ← is &larr; (&#8592;), ↑ is &uarr; (&#8593;), and ↓ is &darr; (&#8595;). The double arrows are &rArr; (⇒) and &lArr; (⇐), and ↔ is &harr;."
      },
      {
        "q": "What is the difference between → and ⇒?",
        "a": "→ (single line, U+2192) is the general-purpose arrow for direction, navigation, and steps (File → Save), and in math it often denotes a mapping or a function. ⇒ (double line, U+21D2) is used in logic and math to mean 'implies', so 'A ⇒ B' reads 'A implies B'. Visually one is a single stroke and the other is a double stroke."
      },
      {
        "q": "How do I get arrows on iPhone or Android?",
        "a": "Phones have no dedicated arrow keys. For colored arrow emoji, open the emoji keyboard and search 'arrow' (➡️ ⬅️ ⬆️ ⬇️). For the plain text arrows like → ← ⇒ ⟶, copy the exact one you want from this page."
      },
      {
        "q": "Do arrow symbols work in Instagram bios, Discord, and usernames?",
        "a": "Yes. The standard Unicode arrows (→ ← ↑ ↓ ↔ ⇒ ➜ ➤) are plain text and display in Instagram and TikTok bios, Discord, and most chat apps. Some platforms restrict which characters are allowed in usernames specifically, but in bio and message fields these arrows are well supported. Rare or very stylized glyphs may render slightly differently depending on the device font."
      },
      {
        "q": "What does the hooked arrow ↩ mean?",
        "a": "↩ is LEFTWARDS ARROW WITH HOOK (U+21A9), commonly read as 'return', 'reply', or 'go back'. As the emoji ↩️ it is the standard reply/return icon in many apps; as plain text it is used to indicate carriage return, undo, or navigating back."
      }
    ]
  }
};
