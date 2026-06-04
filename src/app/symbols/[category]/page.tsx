import { notFound } from "next/navigation";
import { categories, getSymbolsByCategory } from "@/data/symbols";
import CopyToast from "@/components/CopyToast";
import SymbolCard from "@/components/SymbolCard";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  if (!cat) return {};
  return {
    title: `${cat.name} Symbols — Copy & Paste`,
    description: `Copy and paste ${cat.name.toLowerCase()} symbols. Click any symbol to copy instantly.`,
    alternates: { canonical: `https://www.copychars.com/symbols/${category}` },
  };
}

const categoryIntros: Record<string, { intro: string }> = {
  arrows: {
    intro:
      "Arrows are some of the most useful glyphs in the Unicode standard. They turn up everywhere — in slide decks pointing at the next idea, in chat messages where someone wants to say \"go here,\" in code comments, in flowcharts, and in mathematical notation where → can mean \"maps to\" or \"implies.\" Because they exist as actual characters rather than images, they paste cleanly into Google Docs, Word, Notion, Slack, Discord, Instagram bios, and anywhere else plain text lives.\n\nThe collection below covers the classic four cardinal arrows (← ↑ → ↓), the diagonal corner arrows used to show external links and trends, the heavy filled emoji-style arrows that work well as bullet markers, and the double-line arrows (⇒ ⇔) that logicians use for implication and equivalence. You will also find curved undo and redo glyphs, the carriage-return arrow ↵, and the angle-quote chevrons (‹ ›) that often show up in breadcrumbs.\n\nClick any arrow to copy it instantly. If you need a quick way to combine several arrows into a header or divider, the Symbol Builder linked below is built for exactly that. For deeper background on each codepoint, see the full arrow symbols guide.",
  },
  currency: {
    intro:
      "Money has its own alphabet. Every major economy has a Unicode currency sign that travels through forms, invoices, price lists, and product pages without breaking — $ for the dollar, € for the euro, £ for the pound, ¥ for the yen and the yuan, ₹ for the Indian rupee, ₿ for bitcoin, and dozens more. Using the real glyph rather than spelling out \"EUR\" or \"GBP\" keeps text shorter and reads more naturally to your audience.\n\nThe currency block in Unicode (U+20A0–U+20CF) was created specifically to give every currency a single, unambiguous code so that financial software, banking systems, and ecommerce stores all render the same character. That means the symbols below paste cleanly into Stripe descriptions, Shopify product names, accounting spreadsheets, and chat conversations across Slack, WhatsApp, and Discord.\n\nBelow you will find the official sign for each major world currency, organized so you can spot the one you need at a glance. Click to copy. If you are writing for an international audience and want both the symbol and the ISO code, the All Currency Symbols guide pairs each glyph with its country and three-letter currency code.",
  },
  math: {
    intro:
      "Mathematical notation is older than computing, but Unicode finally gave it a home that survives copy and paste. The math block covers operators most keyboards skip — ∑ for summation, ∫ for integrals, √ for roots, ≠ for inequality, ≤ and ≥ for comparisons, ≈ for approximation, ∞ for infinity, ± for tolerance, and ° for angles and temperature. These are real characters, not images, so they render correctly in Google Docs, LaTeX previews, Notion equations, exam papers, scientific blog posts, and even Twitter threads.\n\nIf you write technical content for the web, using the proper Unicode operator instead of an ASCII approximation matters: screen readers announce ÷ as \"divided by\" but read / as \"slash,\" and search engines treat ≈ as a distinct concept from a tilde. The same logic applies to multiplication — × is the proper times sign, separate from the letter x.\n\nThe collection below pairs each operator with a short description of what it means and where it shows up. Click any symbol to copy it. For Greek letters used as variables (alpha, beta, theta, lambda) head to the Greek section; for raised exponents like ² and ³, see Superscript & Subscript.",
  },
  greek: {
    intro:
      "The Greek alphabet has been in continuous use for almost three thousand years, and modern science could not function without it. Physicists reach for λ (lambda) for wavelength and Ω (omega) for resistance; mathematicians lean on π, Σ, and Δ; statisticians live in μ and σ; finance pages quote alpha and beta. Whether you are writing a thesis, captioning a graph, or posting a fraternity name on Instagram, the actual Greek codepoints below render the same on every device.\n\nUnicode contains the full uppercase and lowercase Greek alphabet from Α/α (alpha) through Ω/ω (omega), plus the variant forms — final sigma ς, the open-loop phi ϕ, and the curly theta ϑ — that show up in handwritten and typeset mathematics. The letters here are the modern monotonic forms used in everyday Greek, not the polytonic accented forms reserved for classical texts.\n\nClick any letter to copy it. If you need Greek letters styled as small superscripts (useful for footnotes and chemical formulas), the Small Text generator can transform them. The Math Symbols page covers the operator glyphs that frequently appear alongside Greek variables.",
  },
  legal: {
    intro:
      "A handful of small marks do most of the heavy lifting in legal and commercial writing. The copyright sign © asserts authorship of original work, the registered trademark ® signals a mark that has been formally registered with a trademark office, the unregistered trademark ™ claims a mark in use, and the sound recording sign ℗ marks ownership of an audio recording. They are tiny pieces of typography that carry real legal weight, which is why every word processor and operating system has shortcuts for them.\n\nThese symbols belong to the Letterlike Symbols and Latin-1 Supplement Unicode blocks, which means they are universally supported. Paste © into a website footer, ® into a product name, or ™ into a press release and they will render identically across browsers, email clients, and PDF readers. Using the real Unicode character is also better for SEO and accessibility than an inline image of the same mark.\n\nThe page below collects the core legal glyphs along with a few related marks like the section sign §, the paragraph pilcrow ¶, and the service mark ℠. For background on when to use ® versus ™ versus ©, see the trademark explainer linked below.",
  },
  shapes: {
    intro:
      "Shapes and stars are the workhorses of decorative typography. Designers use ★ and ☆ for ratings, bullet lists, and category badges. Writers drop ● ○ ◆ ◇ ▲ ▽ into bios and dividers. Brands use ✦ and ✧ as sparkles in display text. Because these are Unicode characters rather than images, they scale with the surrounding text, inherit colour from CSS, and work in places that block uploaded graphics — Twitter usernames, Instagram bios, Discord channel names, Notion headers, and YouTube video titles.\n\nThe Geometric Shapes block in Unicode (U+25A0–U+25FF) covers filled and outlined squares, circles, triangles, diamonds, and lozenges in a range of sizes. The Dingbats block adds decorative stars, asterisks, and ornamental marks designed by Hermann Zapf in the 1970s for the original ITC Zapf Dingbats font, which is why so many of these glyphs feel hand-drawn rather than geometric and pair nicely with serif typefaces.\n\nClick any shape to copy it instantly. For a focused collection of just star variations, see the Stars page; for hearts, see the Hearts page. The Aesthetic Borders generator combines shape glyphs into ready-made dividers, frames, and separators for bios and posts.",
  },
  punctuation: {
    intro:
      "Punctuation marks beyond the basics on your keyboard can make writing look more polished and more correct. The em dash — separates clauses with more weight than a comma, the en dash – connects ranges like 2020–2024, curly quotes “and” and apostrophes ‘like this’ read more naturally than their straight counterparts, and the ellipsis … is a single character that always typesets correctly. Word processors auto-correct some of these, but text editors, code blocks, web forms, and chat apps usually do not.\n\nThe collection below also includes the European angle quotation marks « and », the bullet •, the interpunct · used between syllables and in lists, the dagger † and double-dagger ‡ used for footnotes, and the section § and pilcrow ¶ marks used in legal and reference texts. These all live in well-supported Unicode ranges and render reliably across browsers, mobile keyboards, PDFs, and email.\n\nGood typography is one of the cheapest ways to make a page look more credible. Click any mark to copy it. For decorative text effects that pair well with proper punctuation, the Fancy Text generator offers small caps, italic, and serif variants.",
  },
  music: {
    intro:
      "Music notation gets a small but expressive set of glyphs in Unicode. The single eighth note ♪, the beamed pair ♫, the quarter note ♩, and the natural ♮, sharp ♯, and flat ♭ signs are all real characters that copy and paste cleanly. Music writers and bloggers reach for them in song titles, playlist headers, lyric annotations, and social posts where a literal note glyph reads better than the word \"music.\"\n\nThe symbols here come from the Miscellaneous Symbols block (U+2600–2671), which is why support is excellent across every modern font and operating system. There is a much larger Musical Symbols block (U+1D100–1D1FF) that covers full notation — staves, clefs, time signatures — but most of those require a specialist music font to render and are not included on this page since they appear as boxes on standard devices.\n\nThe glyphs below work everywhere a normal letter does: Spotify playlist names, YouTube video titles, Twitter handles, Discord server descriptions, Instagram captions, and SoundCloud bios. Click to copy. For ready-made music-themed combinations of notes, hearts, and sparkles, the Emoji Combos page has dozens of pre-built strings.",
  },
  chess: {
    intro:
      "All twelve chess pieces have their own Unicode characters: the white king ♔, queen ♕, rook ♖, bishop ♗, knight ♘, and pawn ♙, plus the black versions ♚ through ♟. They were added to Unicode specifically so chess problems, openings databases, and tournament reports could be typeset without inline images. That makes them perfect for blog posts about openings, PGN annotations, chess club bios, and Discord servers dedicated to the game.\n\nThese pieces sit in the Miscellaneous Symbols block, which means they are supported in every browser and most fonts going back two decades. Paste them into a Lichess study description, a chess.com forum post, a Twitter recap of a tournament game, or a Notion page tracking your repertoire and they will render correctly. The black and white versions are visually distinct enough to use as side indicators in text-based diagrams.\n\nA handful of related game glyphs sit nearby — playing card suits ♠ ♣ ♥ ♦, the white and black draughts pieces, and dice faces. Click any piece to copy. For combining chess pieces with other decorative glyphs in a single header or bio, see the Symbol Builder.",
  },
  zodiac: {
    intro:
      "Astrology has been around longer than the alphabet you are reading, and the twelve zodiac signs each have their own Unicode glyph: ♈ Aries, ♉ Taurus, ♊ Gemini, ♋ Cancer, ♌ Leo, ♍ Virgo, ♎ Libra, ♏ Scorpio, ♐ Sagittarius, ♑ Capricorn, ♒ Aquarius, and ♓ Pisces. Alongside the signs, you will find planet symbols — ☉ the Sun, ☽ the Moon, ☿ Mercury, ♀ Venus, ♂ Mars, ♃ Jupiter, ♄ Saturn — used in birth charts and astrological writing for centuries.\n\nThese glyphs live in the Miscellaneous Symbols block, which is supported on every modern phone and browser, so they paste reliably into Instagram bios, TikTok captions, YouTube channel descriptions, dating-app profiles, and Notion templates. Astrology creators use them to mark sun, moon, and rising signs without typing the word out, and to organize content by zodiac without uploading custom icons.\n\nThe page below pairs each glyph with the sign or planet it represents. Click to copy. For an explanation of the planet glyphs and how they appear in birth charts, the broader astrology guides on the site go into detail. Pair zodiac signs with stars and sparkles for decorative bio headers.",
  },
  weather: {
    intro:
      "Weather glyphs in Unicode predate emoji by decades. The black sun ☀, cloud ☁, umbrella ☂, snowman ☃, and lightning bolt ⚡ were added in the 1990s as part of the Miscellaneous Symbols block, and they remain useful precisely because they are simple, single-character marks that work as text. They are not the colourful emoji versions — those exist too — but the original monochrome forms that copy cleanly into spreadsheets, weather widgets, and minimalist bios.\n\nThe collection below covers sun, moon phases, clouds, rain, snow, lightning, and a few related nature glyphs like the snowflake ❄, the comet ☄, and the star ★. Each one is a real Unicode character, so they sit inline with text without breaking the line, scale with the surrounding font, and inherit colour from CSS — useful when you want a white snowflake on a dark theme or a yellow sun in a header.\n\nClick to copy. These work across Twitter handles, Instagram bios, weather-app descriptions, project names, channel categories on Discord, and almost any other plain-text context. For colourful emoji versions of the same concepts, your phone's emoji keyboard has the full set.",
  },
  technical: {
    intro:
      "Some symbols only make sense to people who spend time at a keyboard. The command key, written as a single glyph and officially named the Place of Interest sign, the option key, the shift arrow, the control caret, the return arrow, the delete-forward marker, and the escape symbol are all real Unicode characters, designed so that documentation, keyboard shortcut lists, and tutorials can show keys without screenshots. They are the reason a help article can write the command glyph plus S instead of spelling out \"command-S.\"\n\nAlongside the modifier keys, the technical block contains a range of engineering and computing glyphs: the power sign, the eject mark, the gear, brackets and corners used in technical drawings, and a small set of warning and notice marks. Apple has used the place-of-interest glyph as the Command key marker since the 1980s, so it carries instant meaning to anyone who has used a Mac.\n\nThese glyphs paste cleanly into README files, Notion docs, Stack Overflow answers, blog posts about productivity, and keyboard shortcut cheat sheets. Click any symbol to copy. For mathematical operators and exponents that pair with technical writing, see the Math section.",
  },
  fractions: {
    intro:
      "Vulgar fractions are the single-character forms of common fractions — ½, ⅓, ¼ and the rest — that sit inline with text instead of being typed out as 1/2. Unicode includes a fixed set of these precomposed fractions, drawn at the right size and baseline so they read cleanly in a recipe, a measurement, a spreadsheet, or a sentence, with no special formatting required.\n\nThe collection below covers halves, thirds, quarters, fifths, sixths, eighths and a few less common ones, plus the fraction slash ⁄ used to build your own fractions. Because they are real Unicode codepoints rather than styled text, they survive copy and paste, work in plain-text fields, and render the same on iOS, Android, Windows, and macOS.\n\nClick any fraction to copy it. For a fraction Unicode does not include as a single glyph, combine a superscript numerator, the fraction slash ⁄, and a subscript denominator. The Math Symbols page covers the operators that usually appear alongside fractions.",
  },
  ui: {
    intro:
      "Interface symbols are the glyphs designers reach for when an icon font is overkill but a plain word feels flat. The check mark and heavy check confirm completion in to-do lists and pricing tables, the ballot X and heavy X mark missing or unavailable features, the gear stands in for settings, and a handful of arrow, refresh, and close marks cover the rest of the common UI vocabulary. They sit somewhere between typography and iconography, and they paste anywhere text does.\n\nUnlike custom icon fonts, these are part of Unicode itself, so they render in plain-text contexts: GitHub README tables, comparison charts in Notion, feature lists in pricing emails, status updates in Slack, and changelogs in release notes. They are a quick way to add visual rhythm to dense text without touching CSS or images.\n\nThe collection below leans toward marks that read clearly at small sizes and stay legible without colour — the ones you would actually use in a comparison table or a status line. Click any glyph to copy. For the full collection of every check, tick, and cross, the dedicated Checkmark Symbols page goes deeper.",
  },
};

const categoryRelated: Record<string, {
  blog?: { href: string; label: string; desc: string }[];
  tools?: { href: string; label: string; desc: string }[];
  pages?: { href: string; label: string }[];
}> = {
  arrows: {
    blog: [
      { href: "/blog/arrow-symbols-list", label: "All Arrow Symbols", desc: "Complete list of every arrow symbol with copy buttons" },
    ],
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build custom arrow combos for your bio" },
      { href: "/fancy-text", label: "Fancy Text", desc: "Style your text with arrows and decorations" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Arrows for Instagram" },
      { href: "/symbols-for/discord", label: "🎮 Arrows for Discord" },
      { href: "/borders", label: "─ Aesthetic Borders" },
    ],
  },
  currency: {
    blog: [
      { href: "/blog/currency-symbols-list", label: "All Currency Symbols", desc: "Every world currency with Unicode and country" },
    ],
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Combine currency symbols in your text" },
    ],
    pages: [
      { href: "/symbols-for/twitter", label: "🐦 Currency for Twitter" },
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols/legal", label: "© Legal Symbols" },
    ],
  },
  math: {
    blog: [
      { href: "/blog/math-symbols-list", label: "Math Symbols List", desc: "All mathematical symbols explained with uses" },
    ],
    tools: [
      { href: "/small-text", label: "Small Text", desc: "Convert numbers and text to superscript" },
      { href: "/fancy-text", label: "Fancy Text", desc: "Bold and italic math symbols" },
    ],
    pages: [
      { href: "/symbols/greek", label: "α Greek Letters" },
      { href: "/symbols/fractions", label: "½ Fractions" },
      { href: "/pi-symbol", label: "π Pi Symbol" },
      { href: "/infinity-symbol", label: "∞ Infinity Symbol" },
    ],
  },
  greek: {
    blog: [
      { href: "/blog/greek-alphabet-list", label: "Greek Alphabet List", desc: "All 24 Greek letters with names and uses" },
    ],
    tools: [
      { href: "/fancy-text", label: "Fancy Text", desc: "Greek-style decorative text" },
      { href: "/small-text", label: "Small Text", desc: "Tiny Greek letters for bios" },
    ],
    pages: [
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols-for/discord", label: "🎮 Greek for Discord" },
    ],
  },
  legal: {
    blog: [
      { href: "/blog/how-to-type-copyright", label: "How to Type the Copyright Symbol", desc: "Mac, Windows, iPhone and Android shortcuts" },
      { href: "/blog/trademark-vs-registered", label: "™ vs ® vs © — What's the Difference?", desc: "Plain-English guide to legal symbols" },
    ],
    tools: [
      { href: "/copyright-symbol", label: "© Copyright Symbol", desc: "Dedicated page for the copyright sign" },
    ],
    pages: [
      { href: "/symbols/punctuation", label: "« Punctuation" },
      { href: "/symbols-for/instagram", label: "📸 Legal symbols for Instagram" },
    ],
  },
  shapes: {
    blog: [
      { href: "/blog/star-symbols", label: "Star Symbols Guide", desc: "Every star symbol and how to use them" },
      { href: "/blog/heart-symbols", label: "Heart Symbols Guide", desc: "All heart symbols copy paste" },
    ],
    tools: [
      { href: "/stars", label: "★ Star Symbols", desc: "Dedicated star symbol collection" },
      { href: "/hearts", label: "❤ Heart Symbols", desc: "100+ heart symbols to copy" },
      { href: "/sparkle-symbols", label: "✦ Sparkle Symbols", desc: "Decorative sparkle collection" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Shapes for Instagram" },
      { href: "/bio-templates", label: "Bio Templates" },
      { href: "/borders", label: "─ Aesthetic Borders" },
    ],
  },
  punctuation: {
    blog: [],
    tools: [
      { href: "/fancy-text", label: "Fancy Text", desc: "Decorate your text with punctuation" },
      { href: "/strikethrough-text", label: "Strikethrough Text", desc: "Add strikethrough to any text" },
    ],
    pages: [
      { href: "/symbols/legal", label: "© Legal Symbols" },
      { href: "/symbols/technical", label: "⌘ Technical Symbols" },
    ],
  },
  music: {
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build music symbol combos" },
      { href: "/emoji-combos", label: "Emoji Combos", desc: "Music-themed emoji combinations" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Music symbols for Instagram" },
      { href: "/symbols-for/tiktok", label: "🎵 Music symbols for TikTok" },
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
    ],
  },
  chess: {
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Combine chess pieces in text" },
    ],
    pages: [
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
      { href: "/symbols/zodiac", label: "♈ Zodiac Symbols" },
      { href: "/symbols-for/discord", label: "🎮 Symbols for Discord" },
    ],
  },
  zodiac: {
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build zodiac symbol combos for your bio" },
      { href: "/bio-templates", label: "Bio Templates", desc: "Ready-made bios with zodiac symbols" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Zodiac for Instagram" },
      { href: "/symbols-for/tiktok", label: "🎵 Zodiac for TikTok" },
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
    ],
  },
  weather: {
    tools: [
      { href: "/emoji-combos", label: "Emoji Combos", desc: "Weather-themed emoji combinations" },
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build weather symbol combos" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Weather for Instagram" },
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
      { href: "/symbols/zodiac", label: "♈ Zodiac Symbols" },
    ],
  },
  technical: {
    blog: [],
    tools: [
      { href: "/fancy-text", label: "Fancy Text", desc: "Technical symbol text styles" },
    ],
    pages: [
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols/fractions", label: "½ Fractions" },
      { href: "/symbols-for/discord", label: "🎮 Technical for Discord" },
    ],
  },
  fractions: {
    tools: [
      { href: "/superscript-generator", label: "ˣ² Super & Subscript Generator", desc: "Build custom fractions with superscript and subscript digits" },
      { href: "/number-symbols", label: "№ Number Symbols", desc: "More numeric symbols and signs" },
      { href: "/character-counter", label: "Character Counter", desc: "Count characters in any text" },
    ],
    pages: [
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols/currency", label: "€ Currency Symbols" },
    ],
  },
  ui: {
    tools: [
      { href: "/checkmark", label: "✓ Checkmark Symbols", desc: "Every checkmark and tick symbol" },
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build UI symbol combos" },
    ],
    pages: [
      { href: "/symbols-for/discord", label: "🎮 UI for Discord" },
      { href: "/symbols/technical", label: "⌘ Technical Symbols" },
    ],
  },
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  if (!cat) notFound();

  const catSymbols = getSymbolsByCategory(category);
  const related = categoryRelated[category] ?? {};
  const hasBlog = related.blog && related.blog.length > 0;
  const hasTools = related.tools && related.tools.length > 0;
  const hasPages = related.pages && related.pages.length > 0;

  // JSON-LD: BreadcrumbList + ItemList of the symbols on this page.
  // Helps Google understand listing intent so the page is indexed as a
  // catalogue rather than dismissed as thin content.
  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Symbols", item: `${baseUrl}/symbols` },
          { "@type": "ListItem", position: 3, name: `${cat!.name} Symbols`, item: `${baseUrl}/symbols/${category}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${cat!.name} Symbols`,
        description: `${cat!.description}. ${catSymbols.length} symbols to copy and paste.`,
        numberOfItems: catSymbols.length,
        itemListElement: catSymbols.slice(0, 100).map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${baseUrl}/symbol/${s.id}`,
        })),
      },
    ],
  };

  return (
    <>
      <CopyToast />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .cat-blog-link { display: flex; justify-content: space-between; align-items: center; gap: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; text-decoration: none; transition: border-color 0.15s; }
        .cat-blog-link:hover { border-color: var(--accent); }
        .cat-tool-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 16px; text-decoration: none; display: block; transition: border-color 0.15s, transform 0.15s; }
        .cat-tool-card:hover { border-color: var(--accent); transform: translateY(-2px); }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Symbols</Link>
          <span>›</span>
          <span style={{ color: "var(--text2)" }}>{cat!.name}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{cat!.icon}</div>
          <div className="section-label">{catSymbols.length} symbols</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 8 }}>
            {cat!.name} Symbols
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>
            {cat!.description}. Click any symbol to copy it instantly.
          </p>
        </div>

        {/* Category intro — written copy that gives Google enough unique
            content per page to actually index it. See the categoryIntros
            lookup at the top of this file for the source text. */}
        {categoryIntros[category] && (
          <section style={{ maxWidth: 800, marginBottom: 40, color: "var(--text2)", fontSize: 15, lineHeight: 1.7 }}>
            {categoryIntros[category].intro.split("\n\n").map((p, i) => (
              <p key={i} style={{ marginBottom: 16 }}>{p}</p>
            ))}
          </section>
        )}

        {/* Symbol grid */}
        <div className="symbols-grid" style={{ marginBottom: 64 }}>
          {catSymbols.map(s => (
            <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />
          ))}
        </div>

        {/* Cross-links */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 48, marginBottom: 48, display: "flex", flexDirection: "column", gap: 40 }}>

          {hasBlog && (
            <div>
              <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                📖 Related Guides
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {related.blog!.map(post => (
                  <Link key={post.href} href={post.href} className="cat-blog-link">
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{post.label}</div>
                      <div style={{ fontSize: 13, color: "var(--text3)" }}>{post.desc}</div>
                    </div>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {hasTools && (
            <div>
              <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                🛠 You Might Also Like
              </h2>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {related.tools!.map(tool => (
                  <Link key={tool.href} href={tool.href} className="cat-tool-card">
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{tool.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{tool.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {hasPages && (
            <div>
              <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                ⚡ Quick Links
              </h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {related.pages!.map(p => (
                  <Link key={p.href} href={p.href} className="cat-pill">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* More Categories */}
        <section>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>More Categories</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.filter(c => c.id !== category).map(c => (
              <Link key={c.id} href={`/symbols/${c.id}`} className="cat-pill">
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
