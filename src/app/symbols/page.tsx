import Link from "next/link";
import { categories, symbols } from "@/data/symbols";
import CategoryCard from "@/components/CategoryCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Symbol Categories",
  description: "Browse 3000+ special characters organised by category — arrows, currency, math, Greek letters, chess, zodiac, and more.",
};

export default function SymbolsIndexPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Complete library</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        All Symbol Categories
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 48, lineHeight: 1.6 }}>
        {symbols.length} symbols across {categories.length} categories. Click any category to browse.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {categories.map(cat => {
          const catSymbols = symbols.filter(s => s.category === cat.id);
          return (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              icon={cat.icon}
              name={cat.name}
              description={cat.description}
              count={catSymbols.length}
              preview={catSymbols.slice(0, 6).map(s => ({ id: s.id, symbol: s.symbol }))}
            />
          );
        })}
      </div>
    </div>
  );
}
