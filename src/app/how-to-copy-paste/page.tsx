import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForEmoji } from "@/lib/related";

const TITLE = "How to Copy and Paste Symbols & Emoji — iPhone, Android, Windows, Mac";
const DESCRIPTION =
  "Learn how to copy and paste symbols, emoji and special characters on iPhone, Android, Windows, Mac and Google Docs. Click to copy, then paste anywhere you type.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "how to copy and paste symbols",
    "copy paste emoji iphone",
    "how to paste special characters",
    "copy symbols android",
    "copy paste keyboard shortcuts",
  ],
  ...canonical("/how-to-copy-paste"),
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", siteName: "CopyChars" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

const baseUrl = "https://www.copychars.com";

// ── Load-bearing visible content ───────────────────────────────────────────
// These three steps are rendered verbatim in the visible <ol> below AND are the
// single source for the HowTo `step` nodes in the JSON-LD @graph. Editing the
// text here keeps the schema and the page in sync (compliance: schema must
// mirror visible content). The `name`/`text` shape matches schema.org HowToStep.
const steps: { name: string; text: string }[] = [
  {
    name: "Find and click the symbol",
    text: "Find the symbol you want on CopyChars and click (or tap) it — it copies to your clipboard automatically.",
  },
  {
    name: "Go to where you want it",
    text: "Go to where you want it — an Instagram bio, a Discord message, a document, anywhere you can type.",
  },
  {
    name: "Paste it",
    text: "Paste it: press Ctrl+V (Windows) or Cmd+V (Mac), or long-press and tap Paste on a phone.",
  },
];

// Per-platform paste subsections — visible content; kept accurate + concise.
const platforms: { id: string; heading: string; body: string }[] = [
  {
    id: "iphone",
    heading: "On iPhone & iPad",
    body: "Tap and hold the text field where you want the symbol, lift your finger, then tap Paste on the little popup menu. There is no keyboard shortcut on iOS — the long-press menu is how you paste.",
  },
  {
    id: "android",
    heading: "On Android",
    body: "Long-press the text field (or the spot in your text), then tap Paste from the popup. On most Android keyboards you can also tap the clipboard icon to re-insert the last thing you copied.",
  },
  {
    id: "windows",
    heading: "On Windows",
    body: "Press Ctrl + V to paste. You can also right-click and choose Paste. To paste plain text without formatting, use Ctrl + Shift + V in most apps.",
  },
  {
    id: "mac",
    heading: "On Mac",
    body: "Press Cmd + V to paste. Right-click (or two-finger click) and choose Paste also works. For plain text, use Cmd + Shift + V in apps that support it.",
  },
  {
    id: "docs",
    heading: "In Google Docs / Word",
    body: "Click where you want the symbol, then press Ctrl + V (Windows) or Cmd + V (Mac). Both Google Docs and Microsoft Word render Unicode symbols and emoji once you have a font that supports them — the default fonts cover almost everything.",
  },
];

// ── FAQ — single source for the visible section AND the FAQPage node ─────────
const faqs: { q: string; a: string }[] = [
  {
    q: "How do I copy and paste a symbol on my phone?",
    a: "Tap the symbol on CopyChars to copy it, then open the app where you want it, long-press the text field, and tap Paste. This works the same way on both iPhone and Android — phones use the long-press menu rather than a keyboard shortcut.",
  },
  {
    q: "Why does a symbol show as a box or question mark?",
    a: "A box (□), tofu, or question mark means the device or app does not have a font that can draw that character. The copy and paste still worked — the symbol is in your text — but that device cannot display it. Newer emoji and rarer symbols need an up-to-date operating system to render.",
  },
  {
    q: "Do copied symbols work on Instagram and TikTok?",
    a: "Yes. Symbols and emoji are plain Unicode text, so they paste straight into Instagram bios and captions, TikTok captions and usernames, and comments on both. If a symbol looks like a box, that specific glyph is too new for the viewer's device, not a problem with pasting.",
  },
  {
    q: "How do I copy an emoji on Windows?",
    a: "Click any emoji on CopyChars to copy it, then press Ctrl + V to paste. Windows also has a built-in emoji picker you can open anywhere with the Windows key + . (period) or Windows key + ; (semicolon).",
  },
  {
    q: "Can I copy and paste symbols on a Chromebook?",
    a: "Yes. Click the symbol on CopyChars to copy it, then press Ctrl + V to paste — Chromebooks use the same shortcut as Windows. To paste plain text without formatting, press Ctrl + Shift + V.",
  },
];

const popularPages: { href: string; label: string }[] = [
  { href: "/symbols", label: "Browse all special character symbols" },
  { href: "/emoji", label: "Copy and paste emoji" },
  { href: "/kaomoji", label: "Kaomoji and Japanese text faces" },
  { href: "/aesthetic", label: "Aesthetic bio symbols" },
  { href: "/fancy-text", label: "Fancy text generator" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "How to Copy and Paste", item: `${baseUrl}/how-to-copy-paste` },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to copy and paste a symbol",
      description:
        "Copy any symbol or emoji from CopyChars in two steps — click to copy, then paste it wherever you can type.",
      totalTime: "PT1M",
      step: steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${baseUrl}/how-to-copy-paste#step-${i + 1}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function HowToCopyPaste() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16 }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>
            Home
          </Link>{" "}
          › How to Copy and Paste
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: 16,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          How to Copy and Paste Symbols and Emoji
        </h1>

        {/* Answer-first definition lead (AI-extractable) */}
        <p style={{ fontSize: 17, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
          Copying a symbol from CopyChars takes two steps: click the symbol to copy it to your clipboard, then paste it
          wherever you can type. The paste step is a keyboard shortcut on a computer (Ctrl+V or Cmd+V) and a long-press
          &rarr; Paste on a phone.
        </p>

        {/* ── HowTo: visible numbered steps (schema mirrors this <ol>) ─────── */}
        <section style={{ marginBottom: 48 }}>
          <h2
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}
          >
            How to copy and paste a symbol
          </h2>
          <ol style={{ paddingLeft: 22, margin: 0 }}>
            {steps.map((s, i) => (
              <li
                key={i}
                id={`step-${i + 1}`}
                style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.7, marginBottom: 12 }}
              >
                {s.text}
              </li>
            ))}
          </ol>
        </section>

        {/* ── Per-platform paste shortcuts ────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}
          >
            How to paste on each device
          </h2>
          <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 24, lineHeight: 1.6 }}>
            Once a symbol is on your clipboard, here is the exact paste gesture or shortcut for every platform.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {platforms.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "18px 22px",
                }}
              >
                <h2
                  className="font-display"
                  style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}
                >
                  {p.heading}
                </h2>
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Popular pages (internal links, descriptive anchors) ─────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2
            className="font-display"
            style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}
          >
            Popular pages
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {popularPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} style={{ color: "var(--accent)", textDecoration: "none", fontSize: 15 }}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ (sources the FAQPage node above) ────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 8 }}>
          <h2
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}
          >
            Frequently asked questions
          </h2>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <RelatedLinks links={relatedForEmoji()} heading="Related — symbols, emoji & tools" />
      </div>
    </>
  );
}
