import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sparkle Symbols ✨ ✦ ⭐ Copy & Paste — Star Sparkles",
  description: "Copy sparkle and star symbols instantly. ✨ ✦ ✧ ⭐ 🌟 💫 ✶ ✷ — aesthetic sparkles for Instagram bios, captions, and social media.",
};

const sparkles = [
  { symbol: "✨", name: "Sparkles" }, { symbol: "⭐", name: "Star" },
  { symbol: "🌟", name: "Glowing Star" }, { symbol: "💫", name: "Dizzy" },
  { symbol: "✦", name: "Black Four Pointed Star" }, { symbol: "✧", name: "White Four Pointed Star" },
  { symbol: "✶", name: "Six Pointed Black Star" }, { symbol: "✷", name: "Six Pointed Pinwheel Star" },
  { symbol: "✸", name: "Eight Pointed Black Star" }, { symbol: "✹", name: "Eight Pointed Stress Star" },
  { symbol: "✺", name: "Eight Pointed Star" }, { symbol: "❇", name: "Sparkle" },
  { symbol: "❈", name: "Heavy Sparkle" }, { symbol: "✴", name: "Eight Pointed Star" },
  { symbol: "⋆", name: "Star Operator" }, { symbol: "꙰", name: "Combining Cyrillic Letter O" },
  { symbol: "⁂", name: "Asterism" }, { symbol: "★", name: "Black Star" },
  { symbol: "☆", name: "White Star" }, { symbol: "⭑", name: "Black Small Star" },
];

export default function SparkleSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Sparkle Symbols ✨
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any sparkle to copy it. Popular for aesthetic bios, captions, and messages on Instagram, TikTok, and Discord.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginBottom: 48 }}>
        {sparkles.map(s => (
          <button key={s.symbol} onClick={() => navigator.clipboard.writeText(s.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div style={{ fontSize: "2rem", marginBottom: 6 }}>{s.symbol}</div>
            <div style={{ fontSize: 11, color: "var(--text2)" }}>{s.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
