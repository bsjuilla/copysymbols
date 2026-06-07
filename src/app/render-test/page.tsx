import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForEmoji } from "@/lib/related";
import { canonical } from "@/lib/canonical";
import { allKaomoji } from "@/data/all-kaomoji";
import RenderTestClient from "./RenderTestClient";

export const metadata: Metadata = {
  title: "Symbol & Emoji Render Test — Will It Show on Every Device?",
  description:
    "Paste any symbol, emoji or fancy font to see if it works on iPhone, Android, Windows and Discord — or shows as an empty ▯ box. Get a safer version of risky fonts and a link to test it on a friend's phone.",
  keywords: [
    "will my emoji show as a box",
    "will my font work on discord",
    "unicode character inspector",
    "emoji compatibility checker",
    "check if symbol works on iphone",
    "why do fonts turn into boxes",
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
  {
    q: "Will my fancy font work on Discord and iPhone?",
    a: "It depends on the font. The bold, italic, cursive (script) and monospace fancy fonts render almost everywhere, including Discord and iPhone. Blackletter (𝔣𝔯𝔞𝔨𝔱𝔲𝔯) and double-struck (𝕕𝕠𝕦𝕓𝕝𝕖) fonts are the risky ones — they often show as plain letters or boxes on iPhone, Android and Discord on the web. Paste your styled name above and each character shows a per-platform verdict; for a risky font it also offers a safer Bold version you can copy instead.",
  },
  {
    q: "How do I check if a symbol works on my friend's phone?",
    a: "Paste the text above and press \"Copy friend-test link\". That copies a link with your exact text baked in. Send it to your friend — when they open it on their phone, the tool loads your text so they can see whether it renders for them or shows as a box. It is the only way to be 100% sure, because what displays depends on the other person's device and app.",
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

        {/* ── KAOMOJI FONT SELF-CHECK ───────────────────────────────────────── */}
        {/* Renders every kaomoji face in the real .kaomoji-face site font. Many
            faces use halfwidth katakana (ﾟ U+FF9F), math operators (∀ U+2200) and
            other glyphs that some fonts lack — if any face below shows empty boxes
            (▯/□) on a given device, that's a font-coverage bug to fix. This is the
            canary: open it on iOS / Android / Windows and scan for boxes. */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginTop: 28, marginBottom: 12 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
            Kaomoji font self-check
          </h2>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, marginBottom: 20 }}>
            All {allKaomoji.length.toLocaleString()} kaomoji on CopyChars, rendered in the site font. Every face here
            should display cleanly — if any shows empty boxes (▯ or □) on your device, that face has a font-coverage
            problem. Open this on iPhone, Android and Windows to catch tofu before visitors do.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(116px, 1fr))", gap: 8 }}>
            {allKaomoji.map((k) => (
              <div
                key={k.slug}
                title={k.name}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "10px 6px",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                <div className="kaomoji-face" style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>{k.face}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {k.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks links={relatedForEmoji()} heading="Related — symbols, emoji & tools" />
      </div>
    </>
  );
}
