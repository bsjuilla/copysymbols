import Link from "next/link";
import { categories, symbols, getPopularSymbols } from "@/data/symbols";
import SymbolCard from "@/components/SymbolCard";
import SearchBar from "@/components/SearchBar";
import CopyToast from "@/components/CopyToast";
import CategoryCard from "@/components/CategoryCard";

export default function HomePage() {
  const popular = getPopularSymbols();

  return (
    <>
      <CopyToast />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 24px 64px", textAlign: "center" }}>
        <div className="hero-glow" />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>3,000+ symbols · one click to copy</div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.03em", color: "var(--text)" }}>
            Copy any symbol,{" "}
            <span className="gradient-text">instantly.</span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text2)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            Arrows, currency, maths, Greek letters, chess pieces, kaomoji — every special character you will ever need, one tap to copy.
          </p>
          <SearchBar />
          <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["copyright symbol","theta symbol","arrow right","degree sign","pi symbol","euro sign"].map(q => (
              <Link key={q} href={`/search?q=${encodeURIComponent(q)}`} style={{ fontSize: 12, color: "var(--text3)", textDecoration: "none", padding: "3px 10px", borderRadius: 100, border: "1px solid var(--border)" }}>
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* POPULAR */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <div>
              <div className="section-label">Most copied</div>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Popular Symbols</h2>
            </div>
            <Link href="/symbols" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
          </div>
          <div className="symbols-grid">
            {popular.map(s => <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />)}
          </div>
        </section>

        {/* CATEGORIES GRID */}
        <section style={{ marginBottom: 64 }}>
          <div className="section-label">Browse by type</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>All Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
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
        </section>

        {/* FEATURE STRIPS */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { icon: "⚡", title: "Instant copy", desc: "Click any symbol to copy it to your clipboard immediately. Works on mobile and desktop." },
              { icon: "🔍", title: "Smart search", desc: "Search by name, description, or keyword. Find 'checkmark' or '✓' or 'tick' — all work." },
              { icon: "💾", title: "Full details", desc: "Every symbol shows Unicode code, HTML entity, CSS value, and keyboard shortcuts." },
            ].map(f => (
              <div key={f.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{f.icon}</div>
                <div className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MINI SYMBOL PREVIEWS */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "var(--text)" }}>Arrow Symbols</h3>
                <Link href="/symbols/arrows" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>All →</Link>
              </div>
              <div className="symbols-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))" }}>
                {symbols.filter(s => s.category === "arrows").slice(0, 12).map(s => <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />)}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "var(--text)" }}>Currency Signs</h3>
                <Link href="/symbols/currency" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>All →</Link>
              </div>
              <div className="symbols-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))" }}>
                {symbols.filter(s => s.category === "currency").slice(0, 12).map(s => <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />)}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
