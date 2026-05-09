import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Degree Symbol ° Copy & Paste — °C °F and More",
  description: "Copy the degree symbol ° instantly. Keyboard shortcuts for Windows (Alt+0176), Mac (Option+Shift+8), iPhone, Android, and HTML &deg;.",
  ...canonical("/degree-symbol"),
};

const items = [
  { symbol: "°", name: "Degree Sign", unicode: "U+00B0", use: "Temperature & angles" },
  { symbol: "℃", name: "Degree Celsius", unicode: "U+2103", use: "Celsius temperature" },
  { symbol: "℉", name: "Degree Fahrenheit", unicode: "U+2109", use: "Fahrenheit temperature" },
  { symbol: "ᵒ", name: "Superscript Small O", unicode: "U+1D52", use: "Superscript degree" },
  { symbol: "′", name: "Prime (arc minute)", unicode: "U+2032", use: "Minutes of arc" },
  { symbol: "″", name: "Double Prime", unicode: "U+2033", use: "Seconds of arc" },
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
      <CopySymbolGrid items={items} />
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Keyboard Shortcuts for °</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 0176 (hold Alt, type on numpad)" },
            { platform: "Mac", method: "Option + Shift + 8" },
            { platform: "iPhone / iPad", method: "Hold the 0 key → ° appears" },
            { platform: "Android", method: "Hold the 0 key → degree appears" },
            { platform: "HTML", method: "&deg; or &#176;" },
            { platform: "Google Docs", method: "Insert → Special characters → 'degree'" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/math",label:"Math Symbols"},{href:"/symbols/technical",label:"Technical"},{href:"/pi-symbol",label:"π Pi Symbol"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
