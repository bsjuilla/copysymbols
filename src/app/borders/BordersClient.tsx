"use client";
import { useState } from "react";

const borderCategories = [
  { name: "Simple Lines", items: [
    { s: "────────────────────", n: "Thin line" },
    { s: "════════════════════", n: "Double line" },
    { s: "━━━━━━━━━━━━━━━━━━━━", n: "Thick line" },
    { s: "····················", n: "Dotted line" },
    { s: "· · · · · · · · · ·", n: "Spaced dots" },
    { s: "--------------------", n: "Dashes" },
    { s: "====================", n: "Equals" },
    { s: "~~~~~~~~~~~~~~~~~~~~", n: "Wavy" },
    { s: "〰〰〰〰〰〰〰〰〰〰", n: "Wave emoji" },
    { s: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", n: "Block line" },
  ]},
  { name: "Decorative Lines", items: [
    { s: "★━━━━━━━━━━━━━━━━━━━★", n: "Star line" },
    { s: "✦────────────────✦", n: "Diamond line" },
    { s: "•._.••´¯`•._.•", n: "Fancy dots" },
    { s: "─────✦─────", n: "Star center" },
    { s: "━━━ ⋆⋆⋆ ━━━", n: "Stars center" },
    { s: "·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩͙˚̩̥̩̥*̩̩͙·͙", n: "Crystal" },
    { s: "ꕥ────────────ꕥ", n: "Flower ends" },
    { s: "❦────────────❦", n: "Heart ends" },
    { s: "✿─────────────✿", n: "Floral" },
    { s: "⊱────────────────⊱", n: "Ornament" },
  ]},
  { name: "Box Frames", items: [
    { s: "┌────────────────────┐\n│                    │\n└────────────────────┘", n: "Simple box" },
    { s: "╔════════════════════╗\n║                    ║\n╚════════════════════╝", n: "Double box" },
    { s: "╭────────────────────╮\n│                    │\n╰────────────────────╯", n: "Round box" },
    { s: "┌──✦──────────────✦──┐\n│                    │\n└──✦──────────────✦──┘", n: "Star box" },
    { s: "꧁────────────────꧂", n: "Ornament frame" },
    { s: "【                    】", n: "Bracket frame" },
    { s: "「                    」", n: "Quote frame" },
    { s: "『                    』", n: "Double quote" },
  ]},
  { name: "Aesthetic Dividers", items: [
    { s: "ꕤ ─────────────── ꕤ", n: "Sakura divider" },
    { s: "𖡼.𖤣𖥧𖡼.𖤣𖥧𖡼", n: "Aesthetic dots" },
    { s: "✧.*･ﾟ:✧.*･ﾟ:", n: "Sparkle wave" },
    { s: "⋘ ─────── ∗ ⋅◈⋅ ∗ ─────── ⋙", n: "Arrow center" },
    { s: "ılı.lıllılı.ıllı.", n: "Audio wave" },
    { s: "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒", n: "Shade blocks" },
    { s: "░░░░░░░░░░░░░░░░░░░", n: "Light shade" },
    { s: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", n: "Dark shade" },
    { s: "⊰ ─────── ♡ ─────── ⊱", n: "Heart divider" },
    { s: "•° ✿ °•", n: "Flower minimal" },
  ]},
  { name: "Corner Decorations", items: [
    { s: "꧁꧂", n: "Ornament pair" },
    { s: "彡★彡", n: "Star waves" },
    { s: "╰☆╮", n: "Star corners" },
    { s: "ঌ◦♦◦ঌ", n: "Diamond row" },
    { s: "⊂◉‿◉つ", n: "Eye brackets" },
    { s: "»──────«", n: "Arrow divider" },
    { s: "⸻", n: "Em dash 3x" },
    { s: "⸺", n: "Two-em dash" },
    { s: "⟨ ⟩", n: "Angle brackets" },
    { s: "⌠ ⌡", n: "Integral brackets" },
  ]},
];

export default function BordersClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); } catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "─"; toastMsg.textContent = `Copied ${n}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Decoration</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>Aesthetic Borders & Dividers</h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>Copy and paste aesthetic text borders, dividers and decorative lines. Click any border to copy it. Works on Discord, Instagram, TikTok, WhatsApp.</p>
      {borderCategories.map(cat => (
        <section key={cat.name} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{cat.name}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cat.items.map(({ s, n }) => (
              <div key={n} onClick={() => copy(s, n)}
                style={{ background: "var(--surface)", border: `1px solid ${copied === s ? "var(--accent)" : "var(--border)"}`, borderRadius: 10, padding: "12px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, transition: "all 0.15s" }}
                onMouseEnter={e => { if (copied !== s) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
                onMouseLeave={e => { if (copied !== s) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <pre style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--text)", margin: 0, whiteSpace: "pre-wrap", flex: 1 }}>{s}</pre>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{n}</div>
                  <div style={{ fontSize: 11, color: copied === s ? "var(--accent)" : "var(--text3)", marginTop: 2 }}>{copied === s ? "✓ copied" : "click to copy"}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
