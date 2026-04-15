"use client";
import { useState } from "react";

const bulletCategories = [
  { name: "Classic Bullets", bullets: [
    { s: "•", n: "Bullet" }, { s: "◦", n: "White Bullet" }, { s: "▪", n: "Small Square" },
    { s: "▫", n: "White Small Square" }, { s: "■", n: "Black Square" }, { s: "□", n: "White Square" },
    { s: "▸", n: "Triangle Bullet" }, { s: "▹", n: "White Triangle" }, { s: "‣", n: "Triangular Bullet" },
    { s: "⁃", n: "Hyphen Bullet" }, { s: "⦾", n: "Circled Bullet" }, { s: "⦿", n: "Target Bullet" },
  ]},
  { name: "Arrow Bullets", bullets: [
    { s: "→", n: "Right Arrow" }, { s: "➤", n: "Heavy Right" }, { s: "➜", n: "Heavy Round" },
    { s: "➔", n: "Heavy Right Arrow" }, { s: "➝", n: "Arrow Right" }, { s: "➞", n: "Dashed Arrow" },
    { s: "➟", n: "Wedge Arrow" }, { s: "➠", n: "Heavy Wedge" }, { s: "▶", n: "Play Arrow" },
    { s: "►", n: "Black Arrow" }, { s: "›", n: "Single Angle" }, { s: "»", n: "Double Angle" },
  ]},
  { name: "Star & Decorative Bullets", bullets: [
    { s: "✦", n: "Four Point Star" }, { s: "✧", n: "White Star" }, { s: "★", n: "Black Star" },
    { s: "☆", n: "White Star" }, { s: "✩", n: "Stress Star" }, { s: "✪", n: "Circled Star" },
    { s: "✫", n: "Open Centre Star" }, { s: "✬", n: "Black Centre Star" }, { s: "✭", n: "Outlined Star" },
    { s: "❖", n: "Black Diamond Minus" }, { s: "◈", n: "Square with Target" }, { s: "⋄", n: "Diamond" },
  ]},
  { name: "Check & Cross Bullets", bullets: [
    { s: "✓", n: "Check Mark" }, { s: "✔", n: "Heavy Check" }, { s: "✅", n: "Green Check" },
    { s: "☑", n: "Check Box" }, { s: "☐", n: "Empty Box" }, { s: "✗", n: "Ballot X" },
    { s: "✘", n: "Heavy X" }, { s: "❌", n: "Cross Mark" }, { s: "☒", n: "X Box" },
    { s: "⊕", n: "Plus Circle" }, { s: "⊗", n: "Times Circle" }, { s: "⊙", n: "Dot Circle" },
  ]},
  { name: "Number Bullets", bullets: [
    { s: "①", n: "Circled 1" }, { s: "②", n: "Circled 2" }, { s: "③", n: "Circled 3" },
    { s: "④", n: "Circled 4" }, { s: "⑤", n: "Circled 5" }, { s: "⑥", n: "Circled 6" },
    { s: "⑦", n: "Circled 7" }, { s: "⑧", n: "Circled 8" }, { s: "⑨", n: "Circled 9" },
    { s: "⑩", n: "Circled 10" }, { s: "❶", n: "Filled 1" }, { s: "❷", n: "Filled 2" },
  ]},
];

export default function BulletsClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); } catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = s; toastMsg.textContent = `Copied ${n}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">List symbols</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>• Bullet Point Symbols</h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>Every bullet point symbol in one place. Click any bullet to copy it. Perfect for Word documents, LinkedIn, Discord, presentations and social media posts.</p>
      {bulletCategories.map(cat => (
        <section key={cat.name} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{cat.name}</h2>
          <div className="symbols-grid">
            {cat.bullets.map(({ s, n }) => (
              <div key={s + n} className={`symbol-card ${copied === s ? "copied" : ""}`} onClick={() => copy(s, n)} title={`Copy ${n}`}>
                <span className="symbol-char">{s}</span>
                <span className="symbol-name">{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
