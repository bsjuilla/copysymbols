import type { Metadata } from "next";
import Link from "next/link";
import { SCRIPTS } from "@/data/scripts";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Alphabets & Scripts — Copy & Paste Japanese, Chinese, Korean, Russian, Arabic Letters",
  description: "Copy and paste letters and symbols from world writing systems — Japanese (hiragana, katakana, kanji), Chinese hanzi, Korean Hangul, Russian Cyrillic and Arabic — with romanization. Real Unicode, one click to copy.",
  keywords: ["alphabets copy paste", "foreign letters copy paste", "japanese symbols", "chinese symbols", "korean letters", "russian letters", "arabic letters"],
  ...canonical("/alphabets"),
};

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Alphabets", item: `${baseUrl}/alphabets` },
      ],
    },
    {
      "@type": "ItemList",
      name: "World Alphabets & Scripts",
      numberOfItems: SCRIPTS.length,
      itemListElement: SCRIPTS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${s.name} Symbols & Letters`,
        url: `${baseUrl}/alphabets/${s.slug}`,
      })),
    },
  ],
};

export default function AlphabetsHub() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-label">Copy &amp; Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
        Alphabets &amp; Scripts
      </h1>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 40, maxWidth: 820 }}>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
          Copy and paste letters and symbols from the world&apos;s major writing systems — Japanese hiragana, katakana and kanji, Chinese hanzi, Korean Hangul, the Russian Cyrillic alphabet and Arabic. Every character comes with its romanization so you know how it sounds, and each one is real Unicode that pastes into names, captions, messages and documents anywhere.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {SCRIPTS.map(s => (
          <Link
            key={s.slug}
            href={`/alphabets/${s.slug}`}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "inherit" }}
          >
            <span style={{ fontSize: "2rem", lineHeight: 1.1, color: "var(--text)" }}>{s.nativeName}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{s.name} symbols &amp; letters</span>
            <span style={{ fontSize: 13, color: "var(--text3)" }}>{s.family}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--text2)", letterSpacing: "0.08em", lineHeight: 1.4, marginTop: 2 }}>
              {s.groups[0].items.slice(0, 7).map(i => i.char).join(" ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
