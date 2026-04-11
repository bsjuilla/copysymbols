import { notFound } from "next/navigation";
import { categories, getSymbolsByCategory, symbols } from "@/data/symbols";
import SymbolCard from "@/components/SymbolCard";
import CopyToast from "@/components/CopyToast";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categories.find(c => c.id === params.category);
  if (!cat) return {};
  return {
    title: `${cat.name} Symbols — Copy & Paste`,
    description: `Copy and paste ${cat.name.toLowerCase()} symbols. ${cat.description}. Click any symbol to copy it instantly.`,
  };
}

export function generateStaticParams() {
  return categories.map(c => ({ category: c.id }));
}

export default function CategoryPage({ params }: Props) {
  const cat = categories.find(c => c.id === params.category);
  if (!cat) notFound();

  const catSymbols = getSymbolsByCategory(params.category);
  const otherCats = categories.filter(c => c.id !== params.category).slice(0, 8);

  return (
    <>
      <CopyToast />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Symbols</Link>
          <span>›</span>
          <span style={{ color: "var(--text2)" }}>{cat.name}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{cat.icon}</div>
          <div className="section-label">{catSymbols.length} symbols</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 8 }}>
            {cat.name} Symbols
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>
            {cat.description}. Click any symbol to copy it to your clipboard instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="symbols-grid" style={{ marginBottom: 64 }}>
          {catSymbols.map(s => <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />)}
        </div>

        {/* Symbol details table */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Symbol Details</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Symbol","Name","Unicode","HTML","CSS","Description"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: "var(--text3)", fontWeight: 500, fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catSymbols.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                    <td style={{ padding: "12px 14px", fontSize: "1.4rem" }}>{s.symbol}</td>
                    <td style={{ padding: "12px 14px", color: "var(--text)", fontWeight: 500 }}>
                      <Link href={`/symbol/${s.id}`} style={{ color: "var(--text)", textDecoration: "none" }}>{s.name}</Link>
                    </td>
                    <td style={{ padding: "12px 14px" }}><span className="code-tag">{s.unicode}</span></td>
                    <td style={{ padding: "12px 14px" }}><span className="code-tag">{s.html}</span></td>
                    <td style={{ padding: "12px 14px" }}><span className="code-tag">{s.css}</span></td>
                    <td style={{ padding: "12px 14px", color: "var(--text2)", maxWidth: 260 }}>{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Other categories */}
        <section>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Browse Other Categories</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {otherCats.map(c => (
              <Link key={c.id} href={`/symbols/${c.id}`} className="cat-pill">{c.icon} {c.name}</Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
