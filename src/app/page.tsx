import { categories, symbols, getPopularSymbols } from "@/data/symbols";
import CopyToast from "@/components/CopyToast";
import HomeClient from "./HomeClient";
import { canonical } from "@/lib/canonical";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CopyChars — Copy & Paste Symbols, Emoji & Special Characters",
  description: "Copy and paste 3000+ symbols instantly. Arrows → ← ↑, hearts ♥ ♡, stars ★ ☆, currency $ € £ ¥, Greek letters, kaomoji and more. One click to copy.",
  alternates: { canonical: "https://www.copychars.com" },
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
