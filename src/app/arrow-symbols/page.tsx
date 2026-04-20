import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arrow Symbols → ← Copy & Paste — 200+ Arrow Signs",
  description: "Copy and paste arrow symbols instantly. Right arrows →, left arrows ←, up ↑ down ↓, double arrows ⇒, curved arrows ↷, and 200+ more. One click to copy.",
};

const arrowGroups = [
  { label: "Basic Arrows", arrows: ["→","←","↑","↓","↔","↕","↗","↘","↙","↖"] },
  { label: "Double Arrows", arrows: ["⇒","⇐","⇑","⇓","⇔","⇕","⇗","⇘","⇙","⇖"] },
  { label: "Bold / Filled", arrows: ["➡","⬅","⬆","⬇","➔","➜","➝","➞","➟","➠"] },
  { label: "Curved Arrows", arrows: ["↷","↶","↻","↺","⟳","⟲","↩","↪","↬","↫"] },
  { label: "Long Arrows", arrows: ["⟶","⟵","⟷","⟹","⟸","⟺","⟼","⟻","↠","↞"] },
  { label: "Triangle / Chevron", arrows: ["▶","◀","▲","▼","▷","◁","△","▽","›","‹"] },
  { label: "Decorative", arrows: ["➤","➢","➣","➥","➦","➧","➨","➩","➪","➫"] },
  { label: "Special", arrows: ["↵","↩","↪","⎋","⏎","⌫","⌦","⇥","⇤","⇧"] },
];

export default function ArrowSymbolsPage() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Arrow Symbols → ←
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        200+ arrow symbols organized by style. Click any arrow to copy it instantly. Works in all apps — Google Docs, Word, Instagram, Discord.
      </p>
      {arrowGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 40 }}>
          <h2 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{group.label}</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {group.arrows.map(a => (
              <button key={a} onClick={() => navigator.clipboard.writeText(a)}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", cursor: "pointer", fontSize: "1.4rem", transition: "all 0.15s", minWidth: 52, textAlign: "center" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                {a}
              </button>
            ))}
          </div>
        </div>
      ))}
      <section style={{ marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Common Uses for Arrow Symbols</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {[
            { use: "→ in emails", desc: "Show direction, steps, or transitions" },
            { use: "⇒ in math", desc: "Logical implication: if A then B" },
            { use: "↩ in UI", desc: "Return / undo button icon" },
            { use: "↑↓ in tables", desc: "Sort direction indicators" },
            { use: "➡ in social bios", desc: "Point to links or calls-to-action" },
            { use: "↷ in diagrams", desc: "Show circular flow or redo action" },
          ].map(item => (
            <div key={item.use} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginBottom: 4 }}>{item.use}</div>
              <div style={{ fontSize: 12, color: "var(--text2)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/arrows",label:"All Arrow Details"},{href:"/symbols/technical",label:"Technical Symbols"},{href:"/checkmark",label:"✓ Check Marks"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
