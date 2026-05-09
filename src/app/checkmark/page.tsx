import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Check Mark Symbol ✓ Copy & Paste — All Checkmarks",
  description: "Copy and paste check mark symbols instantly. ✓ ✔ ☑ ✅ — tick marks, ballot boxes, heavy check marks. One click to copy any checkmark symbol.",
  ...canonical("/checkmark"),
};

const items = [
  { symbol: "✓", name: "Check Mark", unicode: "U+2713", use: "Standard tick" },
  { symbol: "✔", name: "Heavy Check Mark", unicode: "U+2714", use: "Bold tick" },
  { symbol: "✅", name: "White Heavy Check Mark", unicode: "U+2705", use: "Green emoji tick" },
  { symbol: "☑", name: "Ballot Box with Check", unicode: "U+2611", use: "Checked checkbox" },
  { symbol: "☒", name: "Ballot Box with X", unicode: "U+2612", use: "Crossed checkbox" },
  { symbol: "✗", name: "Ballot X", unicode: "U+2717", use: "Light cross" },
  { symbol: "✘", name: "Heavy Ballot X", unicode: "U+2718", use: "Bold cross" },
  { symbol: "❌", name: "Cross Mark", unicode: "U+274C", use: "Red emoji cross" },
  { symbol: "☐", name: "Ballot Box", unicode: "U+2610", use: "Empty checkbox" },
  { symbol: "✕", name: "Multiplication X", unicode: "U+2715", use: "Light X mark" },
];

export default function CheckmarkPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Check Mark Symbol ✓
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any check mark or tick symbol to copy it instantly. Works everywhere — Google Docs, Word, Instagram, Discord, WhatsApp.
      </p>
      <CopySymbolGrid items={items} />
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How to Type a Check Mark</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 10003 (numpad) for ✓" },
            { platform: "Mac", method: "No shortcut — copy from here or Ctrl+Cmd+Space" },
            { platform: "Word / Google Docs", method: "Insert → Special Characters → search 'check'" },
            { platform: "HTML", method: "&check; or &#10003;" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/ui",label:"UI Symbols"},{href:"/bullet-points",label:"Bullet Points"},{href:"/symbols/shapes",label:"Shapes"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
