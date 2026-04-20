import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smiley Face Text Symbols :) ☺ ツ Copy & Paste",
  description: "Copy text smiley faces instantly. Classic :) emoticons, Unicode smileys ☺ ☻ ツ, and kawaii faces. Works everywhere — no emoji required.",
};

const smileys = [
  { symbol: "☺", name: "White Smiling Face" }, { symbol: "☻", name: "Black Smiling Face" },
  { symbol: "ツ", name: "Katakana Tu (smile)" }, { symbol: "シ", name: "Katakana Si (grin)" },
  { symbol: "ϡ", name: "Coptic Letter Shima" }, { symbol: "⌣", name: "Smile (arc)" },
  { symbol: "ʘ", name: "Latin Letter Bilabial Click" }, { symbol: "◉", name: "Fisheye" },
  { symbol: "ಠ", name: "Kannada Letter" }, { symbol: "益", name: "CJK Rage face" },
  { symbol: "ω", name: "Omega (cute mouth)" }, { symbol: "▽", name: "White Down-Pointing Triangle" },
];

const classic = [":)",":-)",":-D",":D","xD","XD","=)","=D",":P",":-P",";)",":-)",":o","O_o","o_O","^_^","^.^","T_T",">_<","*_*"];

export default function SmileyFaceTextPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Smiley Face Text ☺
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Classic text emoticons and Unicode smiley symbols. Click any to copy — no emoji, just text characters that work everywhere.
      </p>
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Unicode Smileys</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginBottom: 40 }}>
        {smileys.map(s => (
          <button key={s.symbol} onClick={() => navigator.clipboard.writeText(s.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 10px", cursor: "pointer", textAlign: "center" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{s.symbol}</div>
            <div style={{ fontSize: 10, color: "var(--text2)" }}>{s.name}</div>
          </button>
        ))}
      </div>
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Classic Emoticons</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {classic.map(s => (
          <button key={s} onClick={() => navigator.clipboard.writeText(s)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 15, color: "var(--text)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
