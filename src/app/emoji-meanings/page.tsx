import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import { EMOJI_MEANINGS } from "@/data/emoji-meanings";

const TITLE = "Emoji Meanings — What Each Emoji & Combo Actually Means";
const DESCRIPTION =
  "What do 💀 🤨📸 🥺👉👈 🗿 💅 and other emoji really mean? A plain-English dictionary of the most-used emoji and combos, with the tone, an example, and one-click copy.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "emoji meanings",
    "what does this emoji mean",
    "emoji combo meanings",
    "gen z emoji meanings",
    "emoji slang",
    "what does 💀 mean",
  ],
  ...canonical("/emoji-meanings"),
};

const baseUrl = "https://www.copychars.com";

const faqs = [
  { q: "What does the 💀 emoji mean?", a: "Among Gen Z the skull means \"I'm dead\" — something is so funny you've died laughing. It largely replaced 😂 and rarely means anything morbid in casual chat." },
  { q: "What does 🤨📸 mean?", a: "The raised eyebrow plus a camera means \"caught in 4K\" — caught doing something undeniable, as if on high-definition video. It's used to playfully call out a lie or a contradiction." },
  { q: "Do emoji meanings change by context?", a: "Yes. The same emoji can read as sincere or sarcastic depending on the message around it — 🥴 can mean drunk, lovestruck or exhausted, and ✨ can be genuinely magical or pointedly sarcastic. Each entry here notes the usual tone, but context always decides." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Emoji Meanings", item: `${baseUrl}/emoji-meanings` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Emoji & combo meanings",
      itemListElement: EMOJI_MEANINGS.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${e.emoji} ${e.name}`,
        url: `${baseUrl}/emoji-meanings/${e.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function EmojiMeaningsHub() {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Dictionary</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.03em" }}>
        Emoji Meanings
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7, maxWidth: 640 }}>
        What does that emoji actually mean? This is a plain-English dictionary of the most-used emoji and combos — the real meaning, the tone it carries, and a quick example. Tap any one to read its page or copy it.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12, marginBottom: 48 }}>
        {EMOJI_MEANINGS.map((e) => (
          <Link
            key={e.slug}
            href={`/emoji-meanings/${e.slug}`}
            style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px", textDecoration: "none", color: "inherit" }}
          >
            <span style={{ fontSize: "1.9rem", lineHeight: 1.1, flexShrink: 0, width: 44, textAlign: "center" }} aria-hidden>{e.emoji}</span>
            <span>
              <span className="font-display" style={{ display: "block", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{e.name}</span>
              <span style={{ display: "block", fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{e.short}</span>
            </span>
          </Link>
        ))}
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/emoji" className="cat-pill">All Emoji</Link>
        <Link href="/emoji-combos" className="cat-pill">Emoji Combos</Link>
        <Link href="/kaomoji" className="cat-pill">Kaomoji</Link>
        <Link href="/new-emoji-2026" className="cat-pill">New Emoji 2026</Link>
      </div>
    </div>
  );
}
