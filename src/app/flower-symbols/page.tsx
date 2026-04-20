import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Symbols ✿ ❀ ❁ Copy & Paste — All Floral Signs",
  description: "Copy and paste flower symbols instantly. ✿ ❀ ❁ ✾ 🌸 🌺 🌻 — floral text symbols and emoji flowers for bios, captions, and messages.",
};

const flowers = [
  { symbol: "✿", name: "White Florette" }, { symbol: "❀", name: "Black Florette" },
  { symbol: "❁", name: "Eight Petalled Flower" }, { symbol: "✾", name: "Six Petalled Black Flower" },
  { symbol: "✽", name: "Heavy Eight Teardrop Flower" }, { symbol: "❃", name: "Heavy Teardrop Flower" },
  { symbol: "❋", name: "Heavy Eight Petal Flower" }, { symbol: "✼", name: "Open Centre Teardrop Spoked Asterisk" },
  { symbol: "🌸", name: "Cherry Blossom" }, { symbol: "🌺", name: "Hibiscus" },
  { symbol: "🌻", name: "Sunflower" }, { symbol: "🌹", name: "Rose" },
  { symbol: "🌷", name: "Tulip" }, { symbol: "💐", name: "Bouquet" },
  { symbol: "🌼", name: "Blossom" }, { symbol: "🪷", name: "Lotus" },
  { symbol: "☘", name: "Shamrock" }, { symbol: "🍀", name: "Four Leaf Clover" },
  { symbol: "🌿", name: "Herb" }, { symbol: "🍃", name: "Leaf Fluttering" },
];

export default function FlowerSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Flower Symbols ✿
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any flower symbol to copy it. Perfect for Instagram bios, aesthetic captions, TikTok, and social media.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10, marginBottom: 48 }}>
        {flowers.map(f => (
          <button key={f.symbol} onClick={() => navigator.clipboard.writeText(f.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div style={{ fontSize: "2rem", marginBottom: 6 }}>{f.symbol}</div>
            <div style={{ fontSize: 11, color: "var(--text2)" }}>{f.name}</div>
          </button>
        ))}
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Flower Bio Ideas</h2>
        {["✿ dreaming in bloom ✿", "❀ soft as petals ❀", "🌸 cherry blossom girl 🌸", "✾ wildflower ✾", "🌺 in full bloom 🌺"].map(bio => (
          <button key={bio} onClick={() => navigator.clipboard.writeText(bio)}
            style={{ display: "block", width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 16px", cursor: "pointer", textAlign: "left", fontSize: 15, color: "var(--text)", marginBottom: 8 }}>
            {bio}
          </button>
        ))}
      </section>
    </div>
  );
}
