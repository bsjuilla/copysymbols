import { notFound } from "next/navigation";
import { categories, getSymbolsByCategory } from "@/data/symbols";
import CopyToast from "@/components/CopyToast";
import SymbolCard from "@/components/SymbolCard";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  if (!cat) return {};
  return {
    title: `${cat.name} Symbols — Copy & Paste`,
    description: `Copy and paste ${cat.name.toLowerCase()} symbols. Click any symbol to copy instantly.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  if (!cat) notFound();

  const catSymbols = getSymbolsByCategory(category);

  return (
    <>
      <CopyToast />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Symbols</Link>
          <span>›</span>
          <span style={{ color: "var(--text2)" }}>{cat!.name}</span>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{cat!.icon}</div>
          <div className="section-label">{catSymbols.length} symbols</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 8 }}>
            {cat!.name} Symbols
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>
            {cat!.description}. Click any symbol to copy it instantly.
          </p>
        </div>

        <div className="symbols-grid" style={{ marginBottom: 64 }}>
          {catSymbols.map(s => (
            <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />
          ))}
        </div>

        <section>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>More Categories</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.filter(c => c.id !== category).map(c => (
              <Link key={c.id} href={`/symbols/${c.id}`} className="cat-pill">
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
