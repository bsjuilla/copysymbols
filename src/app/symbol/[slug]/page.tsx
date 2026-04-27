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
    alternates: { canonical: `https://www.copychars.com/symbol/${slug}` },
  };
}

export default async function SymbolDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = getSymbolBySlug(slug);
  if (!s) notFound();

  const cat = categories.find(c => c.id === s!.category);
  const related = getSymbolsByCategory(s!.category).filter(r => r.id !== s!.id).slice(0, 16);

  const specs = [
    { label: "Unicode", value: s!.unicode, color: "var(--teal)", icon: "U" },
    { label: "HTML Entity", value: s!.html, color: "var(--purple)", icon: "</>" },
    { label: "CSS Value", value: s!.css, color: "var(--coral)", icon: "#" },
    { label: "Category", value: cat?.name || "", color: "var(--accent)", icon: "≡" },
  ];

  return (
    <>
      <CopyToast />

      <style>{`
        .sym-hero-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 40px 40px;
          text-align: center;
        }
        .sym-hero-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 200px;
          background: radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%);
          pointer-events: none;
        }
        .sym-hero-char {
          font-size: clamp(5rem, 12vw, 9rem);
          line-height: 1;
          color: var(--text);
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 40px rgba(200,169,110,0.15));
          transition: transform 0.3s ease;
        }
        .sym-hero-char:hover { transform: scale(1.08); }
        .sym-hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .sym-hero-cat {
          font-size: 13px;
          color: var(--accent);
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .sym-copy-area {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .spec-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.2s, transform 0.2s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .spec-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: currentColor;
          opacity: 0.3;
        }
        .spec-card:hover {
          border-color: var(--border2);
          transform: translateY(-1px);
        }
        .spec-icon {
          font-size: 10px;
          font-family: 'DM Mono', monospace;
          font-weight: 600;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: currentColor;
          flex-shrink: 0;
        }
        .spec-icon-inner {
          color: var(--bg);
          font-size: 9px;
          font-weight: 700;
        }
        .spec-label {
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: var(--text3);
        }
        .spec-value {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          font-weight: 500;
          word-break: break-all;
          line-height: 1.3;
        }
        .shortcut-key {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          border-radius: 8px;
          padding: 6px 12px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: var(--text);
        }
        .keyword-tag {
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--text3);
          background: var(--bg3);
          text-decoration: none;
          transition: all 0.15s;
          display: inline-block;
        }
        .keyword-tag:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(200,169,110,0.08);
        }
        .usage-band {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px 28px;
        }
        @media (max-width: 768px) {
          .detail-layout { flex-direction: column !important; }
          .spec-grid { grid-template-columns: 1fr 1fr; }
          .sym-hero-card { padding: 40px 24px 32px; }
        }
        @media (max-width: 480px) {
          .spec-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={undefined} onMouseLeave={undefined}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Symbols</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href={`/symbols/${s!.category}`} style={{ color: "var(--text3)", textDecoration: "none" }}>{cat?.name}</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{s!.name}</span>
        </div>

        {/* ── MAIN LAYOUT ────────────────────────────────────────────────── */}
        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40 }}>

          {/* LEFT — Hero Symbol Card */}
          <div style={{ width: 320, flexShrink: 0 }}>
            <div className="sym-hero-card">
              <div className="sym-hero-glow" />

              {/* Big symbol */}
              <div className="sym-hero-char" title={s!.name}>
                {s!.symbol}
              </div>

              <div className="sym-hero-name">{s!.name}</div>
              <div className="sym-hero-cat">
                <Link href={`/symbols/${s!.category}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
                  {cat?.name}
                </Link>
              </div>

              {/* Copy buttons */}
              <div className="sym-copy-area">
                <SymbolCopyButtons symbol={s!} />
              </div>
            </div>
          </div>

          {/* RIGHT — Info panel */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

            {/* Description */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this symbol</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                {s!.description}
              </p>
            </div>

            {/* Spec cards */}
            <div className="spec-grid">
              {specs.map(spec => (
                <div
                  key={spec.label}
                  className="spec-card"
                  style={{ color: spec.color }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="spec-icon">
                      <span className="spec-icon-inner">{spec.icon}</span>
                    </div>
                    <span className="spec-label">{spec.label}</span>
                  </div>
                  <div className="spec-value" style={{ color: spec.color }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Keyboard shortcuts */}
            {s!.shortcut && (
              <div className="usage-band">
                <div className="section-label" style={{ marginBottom: 14 }}>Keyboard Shortcuts</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {s!.shortcut.mac && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "DM Mono, monospace" }}>Mac</div>
                      <div className="shortcut-key">{s!.shortcut.mac}</div>
                    </div>
                  )}
                  {s!.shortcut.windows && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "DM Mono, monospace" }}>Windows</div>
                      <div className="shortcut-key">{s!.shortcut.windows}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* HTML usage example */}
            <div className="usage-band">
              <div className="section-label" style={{ marginBottom: 14 }}>Use in Code</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { lang: "HTML", code: s!.html },
                  { lang: "CSS content", code: `content: "${s!.css}";` },
                  { lang: "Unicode", code: s!.unicode },
                ].map(row => (
                  <div key={row.lang} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Mono, monospace", width: 90, flexShrink: 0 }}>{row.lang}</span>
                    <code style={{ fontSize: 13, color: "var(--teal)", fontFamily: "DM Mono, monospace", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "4px 12px", flex: 1, minWidth: 0, display: "block" }}>
                      {row.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── KEYWORDS ───────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Search keywords</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {s!.keywords.map(k => (
              <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="keyword-tag">
                {k}
              </Link>
            ))}
          </div>
        </div>

        {/* ── RELATED SYMBOLS ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More like this</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {cat?.name} Symbols
                </h2>
              </div>
              <Link href={`/symbols/${s!.category}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div className="symbols-grid">
              {related.map(r => (
                <SymbolCard key={r.id} symbol={r.symbol} name={r.name} id={r.id} />
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
