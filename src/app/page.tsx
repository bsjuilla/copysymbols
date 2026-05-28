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
    </>
  );
}
