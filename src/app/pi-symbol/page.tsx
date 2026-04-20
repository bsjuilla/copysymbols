import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pi Symbol π Copy & Paste — π Π and Math Constants",
  description: "Copy the pi symbol π instantly. Lowercase π, uppercase Π, and related math constant symbols. Keyboard shortcuts for all devices.",
};

const piSymbols = [
  { symbol: "π", name: "Pi (lowercase)", unicode: "U+03C0", html: "&pi;", use: "Math constant ≈ 3.14159" },
  { symbol: "Π", name: "Pi (uppercase)", unicode: "U+03A0", html: "&Pi;", use: "Product notation" },
  { symbol: "∏", name: "N-ary Product", unicode: "U+220F", html: "&prod;", use: "Product operator" },
  { symbol: "τ", name: "Tau", unicode: "U+03C4", html: "&tau;", use: "Tau = 2π ≈ 6.283" },
  { symbol: "φ", name: "Phi (golden ratio)", unicode: "U+03C6", html: "&phi;", use: "Golden ratio ≈ 1.618" },
  { symbol: "∞", name: "Infinity", unicode: "U+221E", html: "&infin;", use: "Infinity constant" },
  { symbol: "∑", name: "Summation", unicode: "U+2211", html: "&sum;", use: "Sum operator" },
  { symbol: "√", name: "Square Root", unicode: "U+221A", html: "&radic;", use: "Radical sign" },
];

export default function PiSymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Pi Symbol π
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any symbol to copy it instantly. π is the ratio of a circle&apos;s circumference to its diameter ≈ 3.14159265...
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 56 }}>
        {piSymbols.map(s => (
          <button key={s.symbol} onClick={() => navigator.clipboard.writeText(s.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8, lineHeight: 1 }}>{s.symbol}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.unicode}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.use}</div>
          </button>
        ))}
      </div>
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How to Type π</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 227 (numpad)" },
            { platform: "Mac", method: "Option + P" },
            { platform: "HTML", method: "&pi; or &#960;" },
            { platform: "LaTeX", method: "\\pi for π, \\Pi for Π" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/math",label:"All Math Symbols"},{href:"/symbols/greek",label:"Greek Letters"},{href:"/infinity-symbol",label:"∞ Infinity"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
