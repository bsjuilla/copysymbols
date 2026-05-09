import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Pi Symbol π Copy & Paste — π Π and Math Constants",
  description: "Copy the pi symbol π instantly. Lowercase π, uppercase Π, and related math constants. Keyboard shortcuts: Windows Alt+227, Mac Option+P.",
  ...canonical("/pi-symbol"),
};

const items = [
  { symbol: "π", name: "Pi (lowercase)", unicode: "U+03C0", use: "Math constant ≈ 3.14159" },
  { symbol: "Π", name: "Pi (uppercase)", unicode: "U+03A0", use: "Product notation" },
  { symbol: "∏", name: "N-ary Product", unicode: "U+220F", use: "Product operator" },
  { symbol: "τ", name: "Tau", unicode: "U+03C4", use: "Tau = 2π ≈ 6.283" },
  { symbol: "φ", name: "Phi (golden ratio)", unicode: "U+03C6", use: "Golden ratio ≈ 1.618" },
  { symbol: "∞", name: "Infinity", unicode: "U+221E", use: "Infinity constant" },
  { symbol: "∑", name: "Summation", unicode: "U+2211", use: "Sum operator" },
  { symbol: "√", name: "Square Root", unicode: "U+221A", use: "Radical sign" },
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
      <CopySymbolGrid items={items} />
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
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{row.method}</div>
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
