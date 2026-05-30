import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForEmoji } from "@/lib/related";
import { canonical } from "@/lib/canonical";
import RenderTestClient from "./RenderTestClient";

export const metadata: Metadata = {
  title: "Symbol & Emoji Render Test — Will It Show on Every Device?",
  description:
    "Paste any symbol or emoji to see its Unicode code point, block, and whether it will render on iPhone, Android and Windows — or show as an empty box.",
  keywords: [
    "will my emoji show as a box",
    "unicode character inspector",
    "what character is this",
    "emoji compatibility checker",
    "check if symbol works",
  ],
  ...canonical("/render-test"),
};

const baseUrl = "https://www.copychars.com";

// Single source of truth — both the visible FAQ section and the FAQPage
// schema below are generated from this array.
const faqs = [
  {
    q: "Why does my emoji show as a box or question mark?",
    a: "An empty box (often called \"tofu\"), a question mark, or a generic placeholder appears when the device you are viewing on does not have a font glyph for that character. The text was sent correctly — the receiving device simply has no picture to draw for that code point, usually because its emoji/font set predates the character. Updating the operating system normally fixes it.",
  },
  {
    q: "How can I tell if a symbol will work on someone else's phone?",
    a: "Check the symbol's Unicode code point with this tool. Basic characters and common symbols (below U+1F000) render almost everywhere. Standard emoji render on most phones from roughly the last decade. Characters at U+1FA70 and above were added in very recent Unicode versions and only appear on fully up-to-date devices — those are the ones most likely to show as a box for other people.",
  },
  {
    q: "What is a Unicode code point?",
    a: "A Unicode code point is the unique number Unicode assigns to a character, written in hex as U+ followed by the value — for example the arrow → is U+2192 and the grinning face 😀 is U+1F600. Every character, symbol, and emoji has one. Some emoji are built from several code points joined together (for example a profession or flag), which is why one visible character can list more than one code point here.",
  },
  {
    q: "Do new emoji work on all phones?",
    a: "No. A new emoji only displays once both Unicode has approved it and the device's operating system has shipped a font update that includes its artwork. In the months after a yearly Unicode release, the newest emoji show as a box on most phones and gradually appear as people update iOS, Android and Windows. The newer the emoji, the more devices will fail to render it.",
  },
  {
    q: "Why does the same emoji look different on iPhone and Android?",
    a: "Unicode defines what an emoji means, not exactly how it looks. Each platform draws its own artwork — Apple, Google, Microsoft, Samsung and others each ship a different emoji font. So the same code point (the same underlying character) is rendered with a different style on each system. The character is identical; only the picture differs.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Render Test",
      item: `${baseUrl}/render-test`,
    },
  ],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Symbol & Emoji Render Test",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (web browser)",
  url: `${baseUrl}/render-test`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const graphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [breadcrumbJsonLd, appJsonLd, faqJsonLd],
};

export default function RenderTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
      />
      <CopyToast />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
        <div className="section-label">Unicode character inspector</div>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: 8,
            letterSpacing: "-0.03em",
          }}
        >
          Symbol &amp; Emoji Render Test
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text2)",
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Paste any character to see its exact Unicode code point, decimal value
          and block. The render note tells you whether it will display correctly
          on other devices, or show up as an empty box.
        </p>

        <RenderTestClient />

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginTop: 40, marginBottom: 12 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            How it works
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 20, margin: 0 }}>
            <li style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
              Your text is split into user-perceived characters, so a multi-part
              emoji counts as one character even when it is several code points.
            </li>
            <li style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
              Each character is looked up against the Unicode standard to show its
              code point (U+ hex), decimal value, block, HTML entity and CSS escape.
            </li>
            <li style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
              The render note is derived from the code point&apos;s age: newer
              characters are likelier to show as a box on devices that are not
              fully up to date.
            </li>
          </ul>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginTop: 28, marginBottom: 12 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            Frequently asked questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {faqs.map(f => (
              <div key={f.q}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks links={relatedForEmoji()} heading="Related — symbols, emoji & tools" />
      </div>
    </>
  );
}
