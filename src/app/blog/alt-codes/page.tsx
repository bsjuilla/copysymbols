import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Alt Codes — How to Type Any Symbol on Windows";
const DESCRIPTION = "Alt codes let you type symbols like ©, ° and ™ straight from a Windows keyboard. Get the full code chart, laptop workarounds, and the Mac equivalents.";
const SLUG = "alt-codes";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["alt codes","alt key codes","alt codes list","how to type symbols on windows","alt code for degree symbol","alt code copyright symbol","alt codes without numpad","windows symbol shortcuts"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Hold down the Alt key, type 0176 on the number pad, release: a degree sign (°) appears in your document. That little trick is an alt code, and Windows has supported it since before Windows existed. For the handful of symbols people need constantly, like copyright marks, fractions, currency signs, and proper dashes, alt codes are still the fastest way to type them without leaving the keyboard. They are also widely misunderstood. Half the lists floating around online mix up two incompatible code tables, and very few explain that the trick demands a real numeric keypad. This guide covers the codes genuinely worth knowing, why that leading zero matters more than it looks, and what to do on a numpad-less laptop or a Mac.";

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "How Alt Codes Work",
    paras: [
      "The recipe has three parts, and all three are mandatory. First, Num Lock must be on. Second, the digits have to come from the numeric keypad on the right side of a full-size keyboard; the number row above the letters will not work. Third, you hold Alt down through the entire sequence and only release it at the end. So for a copyright symbol: press and hold Alt, type 0, 1, 6, 9 on the keypad, then let go of Alt. The © appears the instant you release. If you let go early or mistype a digit, nothing useful happens and you simply start over.",
      "This works almost anywhere Windows lets you type: Notepad, Word, Excel cells, browser text boxes, email clients, file rename fields. The feature is a direct inheritance from the IBM PC era of the early 1980s, when DOS users needed a way to reach characters that had no key of their own, and Microsoft has quietly preserved it through every Windows release since. A few programs intercept the Alt key for their own shortcuts (full-screen games are the usual culprits), but in ordinary text editing it is one of the most dependable tricks the operating system has.",
    ],
  },
  {
    h2: "The Codes Worth Memorizing",
    paras: [
      "Start with the legal and business symbols, because they come up in real work constantly. Alt+0153 gives the trademark sign ™, Alt+0169 the copyright sign ©, and Alt+0174 the registered mark ®. Writers citing laws or style guides get the section sign § from Alt+21 and the pilcrow ¶ from Alt+0182. These five alone cover most of what office documents ever need.",
      "Math and measurement codes are next. Alt+0176 types the degree sign °, essential for temperatures and angles, and Alt+0177 gives plus-minus ±. The real multiplication sign × is Alt+0215 and division ÷ is Alt+0247; both look noticeably better than the letter x or a slash. Common fractions have their own codes too: Alt+0188 for ¼, Alt+0189 for ½, and Alt+0190 for ¾.",
      "For money and punctuation: Alt+0162 is the cent sign ¢, Alt+0163 the pound £, and Alt+0165 the yen ¥. Typographers lean on Alt+0151 for the em dash and Alt+0150 for the en dash, plus Alt+0149 for a solid bullet •. Curly quotation marks live at Alt+0145 through Alt+0148, which is handy in apps that do not auto-correct straight quotes for you.",
      "Then there are the classics. Alt+1 produces a smiley face ☺, Alt+3 the famous heart ♥, and Alt+7 a small bullet •. These short codes are relics of the original IBM PC character set, which is exactly why they behave differently from the four-digit codes. That difference deserves its own section.",
    ],
  },
  {
    h2: "Why the Leading Zero Matters",
    paras: [
      "Here is the detail most alt-code lists never mention: there are two different character tables wired into the same trick. Codes typed without a leading zero pull from code page 437, the character set built into the original IBM PC in 1981, the same table that gave DOS its box-drawing lines, card suits, and that smiley face. Codes typed with a leading zero pull from Windows-1252, the Western character set Windows adopted years later. That is why Alt+1 produces ☺ while Alt+01 produces nothing visible: position 1 in the old IBM table is a smiley, but position 1 in Windows-1252 is an invisible control character.",
      "The practical rule: prefer the leading-zero codes for anything going into a document, because Windows-1252 holds the polished publishing characters, including the dashes, the curly quotes, the © and the ™. The zero-less table is where the retro charm lives, including the card suits at Alt+3 through Alt+6 (♥ ♦ ♣ ♠). And treat any code above 255 with suspicion. Some programs, including Word and WordPad, read large numbers as Unicode values, but most others wrap them back around the 256-character table, which is why those giant alt-code lists online produce the wrong symbol half the time.",
    ],
  },
  {
    h2: "No Numpad? Your Options on a Laptop",
    paras: [
      "Alt codes need a numeric keypad, and most laptops no longer have one. Many machines hide a substitute: look closely at the 7, 8, 9, U, I, O, J, K, L, and M keys for small secondary numbers printed on the keycaps. Toggle that layer on (usually Fn plus a key labeled NumLk) and those letters become a phantom numpad that alt codes accept. The catch is that plenty of recent thin laptops have dropped the feature entirely, and the toggle combination varies by manufacturer, so it is worth checking your specific model.",
      "If there is no Fn-layer numpad, you still have routes. The On-Screen Keyboard (search for osk in the Start menu) can show a numeric pad if you enable it under Options; hold the physical Alt key while clicking the on-screen digits. The Character Map app (charmap) lets you browse and copy any character the old-fashioned way. But the genuinely modern answer is the emoji panel: press the Windows key and the period key together, switch to the symbols tab, and search or scroll for what you need. For one-off symbols it has largely replaced alt codes on portable machines.",
    ],
  },
  {
    h2: "Why Macs Don't Have Alt Codes",
    paras: [
      "macOS took a different path. Instead of numeric codes, the Option key shifts the keyboard into an entire second layer of characters, with a third layer behind Option+Shift. On a U.S. keyboard layout, Option+Shift+8 types the degree sign °, Option+G types ©, Option+R types ®, Option+2 types ™, and Option+3 types £. Dashes follow the same logic: Option+hyphen for an en dash, Option+Shift+hyphen for an em dash. The combinations change with keyboard layout, so a German or U.K. Mac will differ in spots.",
      "To explore what your own layout hides, enable the Keyboard Viewer from the input menu and hold Option to watch the keys transform. For anything not on the Option layers, press Control+Command+Space to open the character picker, which searches all of Unicode by name. Apple does ship an optional Unicode Hex Input keyboard layout that lets you type a character code while holding Option, but almost nobody enables it. In everyday use the Option system is pleasant enough that Mac users rarely miss numeric codes at all.",
    ],
  },
  {
    h2: "When Copy-Paste Beats Any Code",
    paras: [
      "Both alt-code tables together cover only a few hundred characters. Unicode contains more than 150,000. That means no alt code exists for a check mark ✓, for most arrows, for stars, Greek letters, chess pieces, or virtually any of the characters people actually go searching for. Workarounds exist; Microsoft Word, for example, can convert a hexadecimal code into a character when you type the code and press Alt+X. But at that point you are memorizing trivia, not saving time.",
      "The sane division of labor: memorize the five or six codes you genuinely type weekly, and copy-paste everything else. A symbol site keeps the entire Unicode catalog one search and one click away, already organized by topic, and a pasted character is identical in every way to a typed one. The symbol galleries on this site cover arrows, check marks, stars, math notation, and far more, each with a one-tap copy button. Alt codes are a great tool; they were never meant to be the whole toolbox.",
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Why does my alt code do nothing or just open a menu?",
    a: "The usual causes, in order: Num Lock is off, you used the number row instead of the numeric keypad, or you released Alt before finishing the digits. Tapping Alt by itself also moves focus to the application menu bar in many programs, which is what is happening if menus light up. Turn Num Lock on, hold Alt down for the whole code, and use only keypad digits.",
  },
  {
    q: "Do alt codes work in every Windows program?",
    a: "Nearly every standard text field accepts them, including Office apps, browsers, and Notepad. Exceptions are programs that claim the Alt key for their own purposes, such as full-screen games, and a few apps built on frameworks that skip the standard Windows text input behavior. Handling of codes above 255 also varies from program to program, so stick to the well-known codes for predictable results.",
  },
  {
    q: "Is there an alt code for a check mark?",
    a: "Not in either standard table; the check mark ✓ is not part of code page 437 or Windows-1252. In Microsoft Word you can type 2713 and press Alt+X to convert it into ✓. Everywhere else, the practical move is to copy the character once from a symbol site and paste it, or keep it stored in a notes file if you use it often.",
  },
  {
    q: "Can I type emoji with alt codes?",
    a: "No. Color emoji live far beyond the range alt codes can reach reliably, and the old Alt+1 smiley ☺ is a monochrome text character rather than an emoji. On Windows 10 and 11 the built-in shortcut is the Windows key plus the period key, which opens a searchable emoji and symbol panel that works in any text field.",
  },
  {
    q: "What is the alt code for an em dash?",
    a: "Alt+0151 types an em dash, and Alt+0150 types the shorter en dash used for ranges like 9–5. Word users also get an em dash automatically when typing two hyphens between words, and Mac users press Option+Shift+hyphen. If you only need one occasionally, copying it from a symbol page is just as quick.",
  },
];

const RELATED: { href: string; label: string }[] = [
  { href: "/symbols", label: "All Symbols" },
  { href: "/how-to-copy-paste", label: "How to Copy & Paste" },
  { href: "/blog/degree-symbol-copy-paste", label: "Degree Symbol Guide" },
  { href: "/blog/check-mark-symbol", label: "Check Mark Symbols" },
  { href: "/blog/em-dash", label: "Em Dash Guide" },
  { href: "/blog/math-symbols-list", label: "Math Symbols List" },
  { href: "/character-counter", label: "Character Counter" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED.slice(0, 10),
  dateModified: MODIFIED.slice(0, 10),
  author: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  publisher: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  mainEntityOfPage: `https://www.copychars.com/blog/${SLUG}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>&larr; Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          {TITLE}
        </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>{INTRO}</p>

        {SECTIONS.map((s, i) => (
          <section key={i}>
            <h2 style={sectionH2}>{s.h2}</h2>
            {s.paras.map((p, j) => (
              <p key={j} style={para}>{p}</p>
            ))}
          </section>
        ))}

        <h2 style={sectionH2}>Frequently asked questions</h2>
        <div style={{ marginBottom: 24 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <h3 style={faqQ}>{f.q}</h3>
              <p style={{ ...para, marginBottom: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          {RELATED.map((r) => (
            <Link key={r.href} href={r.href} className="cat-pill">{r.label}</Link>
          ))}
          <Link href="/blog" className="cat-pill">More Guides</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const faqQ: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" };
