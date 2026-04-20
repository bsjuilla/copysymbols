import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Infinity Symbol ∞ Copy & Paste — All Infinity Signs",
  description: "Copy the infinity symbol ∞ with one click. Includes double-struck ⧞, infinity loop variants, and related math symbols. Works everywhere.",
};

const infinitySymbols = [
  { symbol: "∞", name: "Infinity", unicode: "U+221E", html: "&infin;", use: "Standard infinity sign" },
  { symbol: "⧞", name: "Infinity Negated with Vertical Bar", unicode: "U+29DE", html: "&#10718;", use: "Bounded/negated infinity" },
  { symbol: "⧝", name: "Tied Over Three Dots", unicode: "U+29DD", html: "&#10717;", use: "Infinity with ties" },
  { symbol: "♾", name: "Infinity Emoji", unicode: "U+267E", html: "&#9854;", use: "Permanent paper / infinity emoji" },
  { symbol: "∝", name: "Proportional To", unicode: "U+221D", html: "&prop;", use: "Proportional (looks like ∞)" },
  { symbol: "≈", name: "Almost Equal To", unicode: "U+2248", html: "&asymp;", use: "Approximately equal" },
  { symbol: "∫", name: "Integral", unicode: "U+222B", html: "&int;", use: "Calculus integral" },
  { symbol: "⁸", name: "Superscript Eight", unicode: "U+2078", html: "&#8312;", use: "Rotated = infinity look" },
];

export default function InfinitySymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Infinity Symbol ∞
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any infinity symbol to copy it instantly. The ∞ sign represents endlessness in mathematics, philosophy, and popular culture.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 56 }}>
        {infinitySymbols.map(s => (
          <button
            key={s.symbol}
            onClick={() => navigator.clipboard.writeText(s.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 8, lineHeight: 1 }}>{s.symbol}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.unicode}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.use}</div>
          </button>
        ))}
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How to Type ∞ on Any Device</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 236 (numpad) or copy from this page" },
            { platform: "Mac", method: "Option + 5" },
            { platform: "iPhone", method: "Copy from this page — no built-in shortcut" },
            { platform: "HTML", method: "&infin; or &#8734;" },
            { platform: "LaTeX", method: "\\infty" },
            { platform: "Google Docs", method: "Insert → Special characters → search 'infinity'" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>What Does ∞ Mean?</h2>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
          The infinity symbol ∞ was introduced by mathematician John Wallis in 1655 in his work <em>De sectionibus conicis</em>. Its exact origin is debated — it may derive from the Roman numeral M (1000, meaning "many"), from the Ouroboros (a snake eating its tail), or from the figure-eight laid on its side.
        </p>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginTop: 12 }}>
          In mathematics, ∞ represents a quantity with no upper bound. In everyday use it represents eternity, endlessness, and unlimited potential — making it popular in tattoos, jewellery, and social media bios.
        </p>
      </section>

      <section>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Related Symbols</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { href: "/symbol/infinity", label: "∞ Infinity details" },
            { href: "/symbols/math", label: "Math Symbols" },
            { href: "/pi-symbol", label: "π Pi Symbol" },
            { href: "/hearts", label: "♡ Heart Symbols" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
