import { notFound } from "next/navigation";
import { symbols, getSymbolBySlug, getSymbolsByCategory, categories } from "@/data/symbols";
import CopyToast from "@/components/CopyToast";
import SymbolCopyButtons from "@/components/SymbolCopyButtons";
import SymbolCard from "@/components/SymbolCard";
import Link from "next/link";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSymbolBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.symbol} ${s.name} — Copy & Paste`,
    description: `Copy the ${s.name} symbol (${s.symbol}). Unicode: ${s.unicode}, HTML: ${s.html}. ${s.description}`,
  };
}

export function generateStaticParams() {
  return symbols.map(s => ({ slug: s.id }));
}

export default async function SymbolDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = getSymbolBySlug(slug);
  if (!s) notFound();

  const cat = categories.find(c => c.id === s!.category);
  const related = getSymbolsByCategory(s!.category).filter(r => r.id !== s!.id).slice(0, 12);

  return (
    <>
      <CopyToast />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Symbols</Link>
          <span>›</span>
          <Link href={`/symbols/${s!.category}`} style={{ color: "var(--text3)", textDecoration: "none" }}>{cat?.name}</Link>
          <span>›</span>
          <span style={{ color: "var(--text2)" }}>{s!.name}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start", marginBottom: 64 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "40px 48px", fontSize: "6rem", lineHeight: 1, color: "var(--text)", userSelect: "none" }}>
              {s!.symbol}
            </div>
            <SymbolCopyButtons symbol={s!} />
          </div>

          <div>
            <div className="section-label">{cat?.name}</div>
            <h1 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.02em" }}>
              {s!.name}
            </h1>
            <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.7, marginBottom: 28 }}>{s!.description}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Unicode", value: s!.unicode },
                { label: "HTML Entity", value: s!.html },
                { label: "CSS Value", value: s!.css },
                { label: "Category", value: cat?.name },
              ].map(item => (
                <div key={item.label} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                  <div className="font-mono-custom" style={{ fontSize: 14, color: "var(--teal)" }}>{item.value}</div>
                </div>
              ))}
            </div>

            {s!.shortcut && (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Keyboard Shortcuts</div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {s!.shortcut.mac && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Mac</div>
                      <div className="font-mono-custom" style={{ fontSize: 13, color: "var(--text)", background: "var(--bg3)", padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)" }}>{s!.shortcut.mac}</div>
                    </div>
                  )}
                  {s!.shortcut.windows && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Windows</div>
                      <div className="font-mono-custom" style={{ fontSize: 13, color: "var(--text)", background: "var(--bg3)", padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)" }}>{s!.shortcut.windows}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {s!.keywords.map(k => (
                <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg3)", cursor: "pointer" }}>{k}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
              <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>More {cat?.name} Symbols</h2>
              <Link href={`/symbols/${s!.category}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
            </div>
            <div className="symbols-grid">
              {related.map(r => <SymbolCard key={r.id} symbol={r.symbol} name={r.name} id={r.id} />)}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
