import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Em Dash — How to Type It (and Why It Became the 'AI' Sign)";
const DESCRIPTION = "How to type an em dash (—) on Windows, Mac, iPhone, Android and in HTML, the difference between the em dash, en dash and hyphen, and an honest look at the 2026 'em dash means AI wrote it' debate.";
const SLUG = "em-dash";
const PUBLISHED = "2026-06-01T00:00:00Z";
const MODIFIED = "2026-06-01T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "em dash",
    "how to type em dash",
    "em dash vs hyphen",
    "em dash ai",
    "em dash vs en dash",
    "em dash copy paste",
  ],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

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

const faqs = [
  {
    q: "What is the keyboard shortcut for an em dash?",
    a: "On Windows, hold Alt and type 0151 on the numeric keypad. On a Mac, press Shift + Option + the hyphen key. On iPhone and Android, press and hold the hyphen key on the keyboard and slide to the longest dash in the pop-up.",
  },
  {
    q: "What is the difference between an em dash and a hyphen?",
    a: "A hyphen (-) is short and joins words, like in 'well-known'. An em dash (—) is about three times longer and separates clauses, working like a comma, colon or pair of parentheses. They are different characters with different jobs.",
  },
  {
    q: "Does using an em dash mean something was written by AI?",
    a: "No. The em dash is a normal punctuation mark that writers have used for centuries. The 2026 meme grew out of the fact that some AI models lean on it heavily, but the character itself is not an AI fingerprint — plenty of human writers love it too.",
  },
  {
    q: "How do I write an em dash in HTML?",
    a: "Use the named entity &mdash; or the numeric entity &#8212;. Both render as the em dash (—). The en dash is &ndash; (&#8211;).",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const dashFamily = [
  { symbol: "—", name: "Em dash", use: "Break in a sentence" },
  { symbol: "–", name: "En dash", use: "Ranges: 9–5, Mon–Fri" },
  { symbol: "‒", name: "Figure dash", use: "Inside numbers" },
  { symbol: "―", name: "Horizontal bar", use: "Quotes, dialogue" },
  { symbol: "-", name: "Hyphen-minus", use: "Joining words" },
];

export default function EmDash() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          Em Dash — How to Type It (and Why It Became the &lsquo;AI&rsquo; Sign)
        </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>
          The em dash (—) is the long horizontal stroke you reach for when a comma feels too weak and a full stop feels too final. It has been part of careful writing for hundreds of years, and lately it has also become the centre of an odd internet argument about whether using one means a robot wrote your sentence. This guide covers both halves: how to actually type the thing on every device, and what the &ldquo;em dash equals AI&rdquo; talk is really about.
        </p>

        <h2 style={sectionH2}>What an em dash actually is</h2>
        <p style={para}>
          The em dash takes its name from old typesetting, where it was roughly the width of a capital &ldquo;M&rdquo; in whatever typeface was being used. That is why it is so much longer than a hyphen. Its job is to introduce a sudden break — a change of direction, an aside, an emphatic afterthought — without forcing a new sentence. You can use a single em dash where a colon might go, or a pair of them to fence off an interruption the way parentheses do, just with a little more drama.
        </p>
        <p style={para}>
          Because it is genuinely useful, it shows up everywhere from novels to newspaper headlines to product copy. It is not a niche symbol; it is a core piece of English punctuation that simply happens to be missing a dedicated key on most keyboards.
        </p>

        <h2 style={sectionH2}>How to type an em dash on any device</h2>
        <p style={para}>
          There is no single em dash key, so every platform has its own shortcut. Here are the reliable ones:
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
          <li style={liStyle}><strong>Windows:</strong> hold <strong>Alt</strong> and type <strong>0151</strong> on the numeric keypad, then release Alt. (The leading zero matters, and it has to be the number pad, not the row of numbers along the top.)</li>
          <li style={liStyle}><strong>Mac:</strong> press <strong>Shift + Option + hyphen</strong> (the hyphen key, between 0 and the equals sign). Option + hyphen on its own gives you the shorter en dash.</li>
          <li style={liStyle}><strong>iPhone and Android:</strong> <strong>press and hold the hyphen key</strong> on the on-screen keyboard. A small pop-up appears with the en dash and the longer em dash — slide your finger to the longest one and let go.</li>
          <li style={liStyle}><strong>HTML:</strong> type <strong>&amp;mdash;</strong> for the em dash, or the numeric form <strong>&amp;#8212;</strong>. Both render as —.</li>
          <li style={liStyle}><strong>Anywhere else:</strong> if none of those are handy, copy one from the grid below and paste it in.</li>
        </ul>
        <p style={para}>
          Word processors often help too: Microsoft Word and Google Docs both turn two hyphens (<code>--</code>) between words into an em dash automatically as you keep typing. If you would rather not memorise any of this, the one-click copy grid further down works on every device.
        </p>

        <h2 style={sectionH2}>Em dash vs en dash vs hyphen</h2>
        <p style={para}>
          People mix these three up constantly, partly because they look similar and partly because the names are unhelpful. They are different lengths and they do different jobs:
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
          <li style={liStyle}><strong>Hyphen ( - )</strong> — the short one. It joins words into a single idea (<em>well-known</em>, <em>part-time</em>) and breaks a word across a line. This is the key already on your keyboard.</li>
          <li style={liStyle}><strong>En dash ( – )</strong> — the medium one, about the width of a capital &ldquo;N&rdquo;. It signals a range or a connection: <em>pages 10–20</em>, <em>Monday–Friday</em>, <em>the London–Paris train</em>. Read it as &ldquo;to&rdquo; or &ldquo;through&rdquo;.</li>
          <li style={liStyle}><strong>Em dash ( — )</strong> — the long one. It separates whole clauses and adds a pause stronger than a comma: <em>She finally answered — and the answer surprised everyone.</em></li>
        </ul>
        <p style={para}>
          A quick test: if you could swap in the word &ldquo;to&rdquo;, you probably want an en dash. If you could swap in a comma, colon or pair of brackets, you want an em dash. If you are gluing two words into one, you want a plain hyphen. For more punctuation marks, the <Link href="/symbols/punctuation" style={inlineLink}>punctuation symbol set</Link> has them all in one place.
        </p>

        <h2 style={sectionH2}>Copy the whole dash family</h2>
        <p style={para}>
          Tap any character below to copy it. The grid includes the three everyday dashes plus two specialist ones — the figure dash, which lines up with digits, and the horizontal bar, traditionally used to introduce quoted speech.
        </p>
        <CopySymbolGrid items={dashFamily} columns="repeat(auto-fill, minmax(150px, 1fr))" />
        <p style={para}>
          Building a web page instead of pasting plain text? Use the HTML entity <code>&amp;mdash;</code> rather than the raw character — it is easier to spot in source and never gets mangled by an unexpected text encoding.
        </p>

        <h2 style={sectionH2}>The 2026 &ldquo;em dash means AI&rdquo; conversation</h2>
        <p style={para}>
          If you have spent any time online this year, you have probably seen someone point at an em dash and declare that a piece of writing &ldquo;was obviously AI&rdquo;. It is worth being clear-eyed about where that idea comes from and how much weight it deserves.
        </p>
        <p style={para}>
          The grain of truth is real. Several popular AI writing tools do reach for the em dash more often than the average person does, partly because they were trained on a lot of polished, professionally edited prose where the mark is common. So in a feed full of casual posts, a sudden run of perfectly placed em dashes can stand out, and people started using it as a rough tell.
        </p>
        <p style={para}>
          But the leap from &ldquo;AI uses these a lot&rdquo; to &ldquo;these mean AI&rdquo; does not hold up. The em dash predates computers by centuries and has always been a favourite of strong human writers — Emily Dickinson built entire poems around it. Plenty of journalists, novelists and copywriters use it heavily because it genuinely makes sentences read better. Punishing a punctuation mark for being well-used is a bit like deciding that anyone with neat handwriting must be a printer.
        </p>
        <p style={para}>
          The honest takeaway is that the meme is about <em>overuse and uniformity</em>, not the character itself. If every sentence has an em dash and they all land in the same rhythm, that sameness is the real tell — and that is just as true of a human who has one favourite trick. Use the em dash where it earns its place, vary your sentence shapes, and the mark will keep doing the job it has always done. Do not let a passing internet joke scare you out of good punctuation.
        </p>

        <h2 style={sectionH2}>Frequently asked questions</h2>
        <div style={{ marginBottom: 24 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <h3 style={faqQ}>{f.q}</h3>
              <p style={{ ...para, marginBottom: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        <p style={{ ...para, marginBottom: 32 }}>
          That is the em dash in full: one long stroke, a handful of shortcuts to type it, a clear line between it and its shorter cousins, and no reason to fear it. Grab one from the grid above and put it to work.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/symbols/punctuation" className="cat-pill">Punctuation Symbols</Link>
          <Link href="/fancy-text" className="cat-pill">Fancy Text</Link>
          <Link href="/blog" className="cat-pill">More Guides</Link>
          <Link href="/how-to-copy-paste" className="cat-pill">How to Copy &amp; Paste</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const liStyle: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 };
const inlineLink: React.CSSProperties = { color: "var(--accent)", textDecoration: "none", fontWeight: 600 };
const faqQ: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" };
