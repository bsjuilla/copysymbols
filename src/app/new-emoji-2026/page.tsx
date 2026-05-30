import type { Metadata } from "next";
import EmojiCopyButton from "@/components/EmojiCopyButton";
import CopyToast from "@/components/CopyToast";
import RelatedLinks from "@/components/RelatedLinks";
import { canonical } from "@/lib/canonical";
import { codePointInfo } from "@/lib/unicode-blocks";
import { relatedForEmoji } from "@/lib/related";
import { NEW_EMOJI_2026, glyphOf } from "@/data/new-emoji-2026";
import { twemojiSvgUrl } from "@/lib/twemoji";

export const metadata: Metadata = {
  title: "New Emoji 2026 — Unicode 17.0 Emoji to Copy & Paste",
  description:
    "The 8 new emoji of 2026 from Unicode 17.0 — added to iPhone in iOS 26.4. Copy and paste the new 2026 emoji: Distorted Face, Orca, Treasure Chest, Trombone and more.",
  keywords: [
    ...NEW_EMOJI_2026.flatMap(e => e.searchTerms),
    "new emoji 2026",
    "unicode 17 emoji",
    "ios 26.4 emoji",
  ],
  ...canonical("/new-emoji-2026"),
};

const baseUrl = "https://www.copychars.com";

const faqs = [
  {
    q: "What are the new emoji in 2026?",
    a: "The new 2026 emoji are the 8 emoji from Unicode 17.0 / Emoji 17.0: Distorted Face, Fight Cloud, Hairy Creature (Bigfoot), Orca, Landslide, Trombone, Treasure Chest, and Ballet Dancer. They reached iPhone in iOS 26.4 on 24 March 2026.",
  },
  {
    q: "How many new emoji are in Unicode 17.0?",
    a: "Unicode 17.0 adds 8 brand-new emoji. Counting every skin-tone and gender variation of the Ballet Dancer sequence, the total number of new emoji codepoints is higher, but there are 8 distinct new designs.",
  },
  {
    q: "Why do the new emoji show as a box?",
    a: "A new emoji shows as a box (□ or a placeholder) when your device has not yet been updated to a version that includes the Unicode 17.0 font. Once both you and the person you message update to iOS 26.4 (or the matching Android / Windows update), the emoji renders correctly.",
  },
  {
    q: "When did the 2026 emoji come out?",
    a: "Unicode 17.0 was released on 9 September 2025, and Apple shipped these emoji to iPhone and iPad in iOS 26.4 on 24 March 2026. Other platforms are rolling them out across the first half of 2026.",
  },
  {
    q: "How do I get the new emoji on iPhone?",
    a: "Update your iPhone to iOS 26.4 or later: open Settings, tap General, then Software Update, and install the latest version. After updating, the new 2026 emoji appear in the standard emoji keyboard.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "New Emoji 2026", item: `${baseUrl}/new-emoji-2026` },
      ],
    },
    {
      "@type": "ItemList",
      name: "New Emoji 2026 — Unicode 17.0",
      itemListElement: NEW_EMOJI_2026.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: e.name,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function NewEmoji2026Page() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CopyToast />

      <div className="section-label">Copy & Paste</div>
      <h1
        className="font-display"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, letterSpacing: "-0.03em" }}
      >
        New Emoji 2026
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 16, lineHeight: 1.7 }}>
        The new 2026 emoji are the <strong style={{ color: "var(--text)" }}>8 emoji from Unicode 17.0</strong> (also
        called Emoji 17.0), released by the <strong style={{ color: "var(--text)" }}>Unicode</strong> Consortium on
        9 September 2025. According to <strong style={{ color: "var(--text)" }}>Emojipedia</strong>, Apple added them to
        iPhone and iPad in <strong style={{ color: "var(--text)" }}>iOS 26.4 on 24 March 2026</strong>. This is the
        complete set: Distorted Face, Fight Cloud, Hairy Creature (Bigfoot), Orca, Landslide, Trombone, Treasure Chest,
        and Ballet Dancer. Click any emoji below to copy it instantly.
      </p>
      <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>
        Each emoji below is shown as a preview image so you can see it on any device. When you click it you copy the
        real Unicode character — that character only appears as the finished emoji on devices updated to the Unicode
        17.0 font (iPhone needs iOS 26.4 or later), and may still show as a box (□) for anyone you send it to who
        hasn&rsquo;t updated yet. See &ldquo;How to get the new emoji on your phone&rdquo; below.
      </p>

      <section style={{ marginBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {NEW_EMOJI_2026.map(e => {
            const glyph = glyphOf(e);
            const info = codePointInfo(glyph);
            return (
              <article
                key={e.hexLabel}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "28px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <EmojiCopyButton glyph={glyph} name={e.name} size="clamp(3.2rem, 8vw, 4.6rem)" imageSrc={twemojiSvgUrl(glyph)} />
                <h2
                  className="font-display"
                  style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", margin: 0, textAlign: "center" }}
                >
                  {e.name}
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "DM Mono, monospace",
                      color: "var(--accent)",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      padding: "3px 10px",
                    }}
                  >
                    {e.hexLabel}
                  </span>
                  {info && (
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "DM Mono, monospace",
                        color: "var(--text3)",
                        border: "1px solid var(--border)",
                        borderRadius: 100,
                        padding: "3px 10px",
                      }}
                    >
                      Dec {info.decimal}
                    </span>
                  )}
                </div>
                {info && (
                  <div style={{ fontSize: 11, color: "var(--text3)", textAlign: "center" }}>
                    Block: {info.block}
                  </div>
                )}
                <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, margin: 0, textAlign: "center" }}>
                  {e.desc}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          How to get the new emoji on your phone
        </h2>
        <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text2)", fontSize: 14, lineHeight: 1.9 }}>
          <li><strong style={{ color: "var(--text)" }}>iPhone &amp; iPad:</strong> update to iOS 26.4 or later (Settings → General → Software Update). The 2026 emoji then appear in the standard emoji keyboard.</li>
          <li><strong style={{ color: "var(--text)" }}>Android:</strong> the Unicode 17.0 emoji arrive with a system or Google fonts update rolling out across 2026 — keep your device and Gboard up to date.</li>
          <li><strong style={{ color: "var(--text)" }}>Windows &amp; Mac:</strong> install the latest OS update; the new glyphs ship with the updated system emoji font.</li>
          <li><strong style={{ color: "var(--text)" }}>Seeing a box (□)?</strong> That means the emoji is not yet in your device&rsquo;s font. The character is still correct — it will render once both you and the person you message have updated. This is the single most common question about brand-new emoji.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map(f => (
            <div
              key={f.q}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedLinks links={relatedForEmoji()} heading="Related — emoji, kaomoji & bio tools" />
    </div>
  );
}
