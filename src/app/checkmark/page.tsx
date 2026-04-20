import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Check Mark Symbol ✓ Copy & Paste — All Checkmarks",
  description: "Copy and paste check mark symbols instantly. ✓ ✔ ☑ ✅ — tick marks, ballot boxes, heavy check marks. One click to copy any checkmark symbol.",
};

const checkmarks = [
  { symbol: "✓", name: "Check Mark", unicode: "U+2713", use: "Most common tick mark" },
  { symbol: "✔", name: "Heavy Check Mark", unicode: "U+2714", use: "Bold, thick tick" },
  { symbol: "✅", name: "White Heavy Check Mark", unicode: "U+2705", use: "Green emoji tick" },
  { symbol: "☑", name: "Ballot Box with Check", unicode: "U+2611", use: "Checkbox ticked" },
  { symbol: "☒", name: "Ballot Box with X", unicode: "U+2612", use: "Checkbox crossed" },
  { symbol: "✗", name: "Ballot X", unicode: "U+2717", use: "Light cross / wrong" },
  { symbol: "✘", name: "Heavy Ballot X", unicode: "U+2718", use: "Bold cross / wrong" },
  { symbol: "❌", name: "Cross Mark", unicode: "U+274C", use: "Red emoji cross" },
  { symbol: "☐", name: "Ballot Box", unicode: "U+2610", use: "Empty checkbox" },
  { symbol: "✕", name: "Multiplication X", unicode: "U+2715", use: "Light X mark" },
  { symbol: "〇", name: "Ideographic Circle", unicode: "U+3007", use: "Circle for correct (Japanese)" },
  { symbol: "⊘", name: "Empty Set with Long Horizontal Stroke", unicode: "U+2298", use: "No/prohibited mark" },
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 56 }}>
        {checkmarks.map(c => (
          <button
            key={c.symbol}
            onClick={() => navigator.clipboard.writeText(c.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 8, lineHeight: 1 }}>{c.symbol}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{c.unicode}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{c.use}</div>
          </button>
        ))}
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How to Type a Check Mark</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 10003 (numpad) for ✓\nAlt + 10004 for ✔" },
            { platform: "Mac", method: "No default shortcut — copy from here or use Character Viewer (Ctrl+Cmd+Space)" },
            { platform: "Word / Google Docs", method: "Insert → Special Characters → search 'check'" },
            { platform: "HTML", method: "&check; or &#10003; for ✓" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Check Mark vs Tick — What's the Difference?</h2>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
          A <strong>check mark</strong> (✓) and a <strong>tick</strong> are the same symbol — "tick" is the British English term, "check mark" is American English. Both refer to the small mark used to indicate something is correct, complete, or approved. The heavy version (✔) is simply a bolder, thicker variant of the same symbol.
        </p>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginTop: 12 }}>
          The green emoji version (✅) is technically called "White Heavy Check Mark" in Unicode, despite appearing green — it was named before emoji color standards were established.
        </p>
      </section>

      <section>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Related Symbols</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { href: "/symbol/checkmark", label: "✓ Check Mark details" },
            { href: "/symbol/heavy-check", label: "✔ Heavy Check details" },
            { href: "/bullet-points", label: "• Bullet Points" },
            { href: "/symbols/ui", label: "UI Symbols" },
            { href: "/symbols/shapes", label: "Shapes & Stars" },
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
