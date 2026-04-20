import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Degree Symbol ° Copy & Paste — °C °F and More",
  description: "Copy the degree symbol ° instantly. Works for temperature (°C °F), angles, and coordinates. Keyboard shortcuts for Windows, Mac, iPhone, and Android.",
};

const degreeSymbols = [
  { symbol: "°", name: "Degree Sign", unicode: "U+00B0", html: "&deg;", use: "Temperature & angles" },
  { symbol: "℃", name: "Degree Celsius", unicode: "U+2103", html: "&#8451;", use: "Celsius temperature" },
  { symbol: "℉", name: "Degree Fahrenheit", unicode: "U+2109", html: "&#8457;", use: "Fahrenheit temperature" },
  { symbol: "ᵒ", name: "Modifier Letter Small O", unicode: "U+1D52", html: "&#7506;", use: "Superscript degree" },
  { symbol: "⁰", name: "Superscript Zero", unicode: "U+2070", html: "&#8304;", use: "Exponent zero" },
  { symbol: "′", name: "Prime (arc minute)", unicode: "U+2032", html: "&prime;", use: "Minutes of arc" },
  { symbol: "″", name: "Double Prime (arc second)", unicode: "U+2033", html: "&Prime;", use: "Seconds of arc" },
  { symbol: "‴", name: "Triple Prime", unicode: "U+2034", html: "&#8244;", use: "Thirds of arc" },
];

export default function DegreeSymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Degree Symbol °
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any degree symbol to copy it instantly. Use ° for angles and coordinates, ℃ for Celsius, ℉ for Fahrenheit.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 56 }}>
        {degreeSymbols.map(s => (
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
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Keyboard Shortcuts for °</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 0176 (hold Alt, type on numpad)" },
            { platform: "Mac", method: "Option + Shift + 8" },
            { platform: "iPhone / iPad", method: "Hold the 0 key on keyboard → ° appears" },
            { platform: "Android", method: "Hold the 0 key → degree symbol option appears" },
            { platform: "HTML code", method: "&deg; or &#176;" },
            { platform: "Google Docs", method: "Insert → Special characters → search 'degree'" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>When to Use Each Degree Symbol</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { sym: "°", title: "Degree Sign (°)", desc: "Use for angles (45°), geographic coordinates (51.5° N), and temperatures when combined with C or F (like 100°C). This is the standard degree symbol." },
            { sym: "℃", title: "Degree Celsius (℃)", desc: "A single Unicode character combining ° and C. Convenient shorthand, but less universally supported than typing °C separately." },
            { sym: "℉", title: "Degree Fahrenheit (℉)", desc: "Single Unicode character for Fahrenheit. Same caveat — typing °F separately is more reliable across all systems." },
          ].map(item => (
            <div key={item.sym} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: "2rem", flexShrink: 0, width: 40, textAlign: "center" }}>{item.sym}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Related Symbols</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { href: "/symbol/degree", label: "° Degree symbol details" },
            { href: "/symbols/math", label: "Math Symbols" },
            { href: "/symbols/technical", label: "Technical Symbols" },
            { href: "/superscript", label: "Superscript Numbers" },
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
