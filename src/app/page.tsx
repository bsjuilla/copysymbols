import { categories, symbols, getPopularSymbols } from "@/data/symbols";
import CopyToast from "@/components/CopyToast";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CopyChars — Copy & Paste Symbols, Emoji & Special Characters",
  description: "Copy and paste 3000+ symbols instantly. Arrows → ← ↑, hearts ♥ ♡, stars ★ ☆, currency $ € £ ¥, Greek letters, kaomoji and more. One click to copy.",
  // Homepage canonical kept as bare origin (no trailing slash) to match the
  // value already indexed by Google. Do NOT switch to canonical("/") — that
  // would emit a trailing slash and create a fresh URL for Google to dedupe.
  alternates: { canonical: "https://www.copychars.com" },
};

// Site-wide WebSite + SearchAction + Organization already ship from
// src/app/layout.tsx (siteJsonLd). Only emit the homepage-specific
// CollectionPage + ItemList here to avoid duplicating the site triple.
const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: baseUrl,
  name: "CopyChars — Symbol Categories",
  mainEntity: {
    "@type": "ItemList",
    name: "Symbol Categories",
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/symbols/${c.id}`,
      name: c.name,
    })),
  },
};

// Homepage FAQ — AI-extractable brand/category answers (AEO, P4). Rendered
// visibly below AND mirrored in FAQPage schema so the two never diverge.
const faqs = [
  {
    q: "What is CopyChars?",
    a: "CopyChars is a free website to copy and paste over 3,000 Unicode symbols, emoji, kaomoji and special characters. Click any character and it is copied to your clipboard instantly — no app and no sign-up needed.",
  },
  {
    q: "How do I copy and paste a symbol?",
    a: "Click any symbol on CopyChars and it is copied automatically. Then paste it with Ctrl+V (Cmd+V on Mac), or long-press and tap Paste on a phone — in bios, posts, documents and chats.",
  },
  {
    q: "Do these symbols work on Instagram, TikTok and Discord?",
    a: "Yes. Every character on CopyChars is real Unicode text, so it pastes into Instagram bios, TikTok captions, Discord names and messages, and anywhere else that accepts text.",
  },
  {
    q: "Is CopyChars free?",
    a: "Yes. CopyChars is completely free to use and does not require an account.",
  },
  {
    q: "What is the difference between symbols, emoji and kaomoji?",
    a: "Symbols are single Unicode characters such as ★, → and ©. Emoji are the colourful pictographs such as 😀 and 🎀. Kaomoji are Japanese text faces built from characters, such as (◕‿◕) and ʕ•ᴥ•ʔ.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  const popular = getPopularSymbols();
  const allCategories = categories.map(cat => ({
    ...cat,
    count: symbols.filter(s => s.category === cat.id).length,
    preview: symbols.filter(s => s.category === cat.id).slice(0, 6).map(s => ({ id: s.id, symbol: s.symbol })),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CopyToast />
      <HomeClient
        popular={popular.map(s => ({ id: s.id, symbol: s.symbol, name: s.name }))}
        categories={allCategories}
        arrowSymbols={symbols.filter(s => s.category === "arrows").slice(0, 16).map(s => ({ id: s.id, symbol: s.symbol, name: s.name }))}
        currencySymbols={symbols.filter(s => s.category === "currency").slice(0, 16).map(s => ({ id: s.id, symbol: s.symbol, name: s.name }))}
        mathSymbols={symbols.filter(s => s.category === "math").slice(0, 16).map(s => ({ id: s.id, symbol: s.symbol, name: s.name }))}
        totalSymbols={symbols.length}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 64px" }}>
        <div className="section-label" style={{ marginBottom: 12 }}>FAQ</div>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
        {faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{a}</p>
          </div>
        ))}
      </section>
    </>
  );
}
