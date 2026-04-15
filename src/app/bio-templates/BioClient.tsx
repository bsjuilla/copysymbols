"use client";
import { useState } from "react";

const bioCategories = [
  {
    platform: "Instagram", icon: "📸",
    bios: [
      { name: "Aesthetic Minimal", text: "˚ ༘♡ ⋆｡˚\n✦ [your name] ✦\n↳ living my best life\n⊹ ˚. ᵎᵎ 🌙" },
      { name: "Cute & Soft", text: "꒰ ˘͈ᵕ˘͈ ꒱\n✿ [name] ✿\n─── ・ 。゚☆: *.☽ .* :☆゚. ───\nlover of sunsets & soft things 🌸" },
      { name: "Dark Aesthetic", text: "꧁ [YOUR NAME] ꧂\n▸ born in chaos ◂\n━━━━━━━━━━━━\n🖤 not for the faint-hearted 🖤" },
      { name: "Minimalist", text: "[name] • [age]\n────────────\n[city] | [passion]\n✦ living intentionally" },
      { name: "Sparkle Vibes", text: "✨ [name] ✨\n┊ ┊ ┊ ┊\n┊ ┊ ┊ ✦\n┊ ┊ ☆\n┊ ★\n☆ dreaming big" },
      { name: "Bold Statement", text: "★━━━━━━★\n[YOUR NAME]\n★━━━━━━★\n↳ on my own terms\n💫 unapologetically me" },
    ]
  },
  {
    platform: "Discord", icon: "🎮",
    bios: [
      { name: "Gamer Aesthetic", text: "⚔️ [name] ⚔️\n─────────────\n▸ gamer | [game]\n▸ [rank] player\n▸ dm's open 🎮" },
      { name: "Chill Vibes", text: "꧁[name]꧂\n┌─── ∘°❉°∘ ───┐\n│  just vibing   │\n└─── ∘°❉°∘ ───┘\n🎵 music is life" },
      { name: "Server Owner", text: "⊱ [NAME] ⊰\n━━━━━━━━━━━\nServer Owner 👑\n[Server Name]\n━━━━━━━━━━━\n📩 open for collab" },
      { name: "Anime Fan", text: "彡★[name]★彡\n✿ anime lover ✿\n▸ [fav anime]\n▸ [fav character]\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧" },
      { name: "Coder", text: "{ [name] }\n──────────\n> developer 💻\n> [language] lover\n> always learning\n──────────\n⌨️ building cool stuff" },
    ]
  },
  {
    platform: "TikTok", icon: "🎵",
    bios: [
      { name: "Creator Vibe", text: "✨ [name] ✨\n🎬 content creator\n📍 [city]\n↓ new video every [day]" },
      { name: "Trendy Gen Z", text: "💀 [name] 💀\nnot like other girls\njk i'm worse 🔥\nfollow for chaos" },
      { name: "Soft Aesthetic", text: "🌙 [name] 🌙\n˚ ༘♡ ⋆｡˚\ndaydreamer ☁️\nart | music | vibes" },
      { name: "Business Owner", text: "👑 [name]\n─────────\n[Business Name] 🛍️\nlink below ↓\nDM for collabs ✨" },
    ]
  },
  {
    platform: "Twitter / X", icon: "🐦",
    bios: [
      { name: "Professional", text: "[Name] | [Role] @ [Company] • [interest] • [interest] • Opinions my own 🔁 ≠ endorsement" },
      { name: "Casual", text: "[name] ✦ [city] • lover of [thing] & [thing] • occasionally funny • always tired 😭" },
      { name: "Creator", text: "making [content type] 🎬 • [niche] creator • [followers] building in public • ✉️ [email]" },
      { name: "Developer", text: "[name] → building [project] • [language] dev • open source enthusiast • tweets about code & coffee ☕" },
    ]
  },
];

export default function BioClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [active, setActive] = useState("Instagram");

  const copy = async (text: string, name: string) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(name);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "📝"; toastMsg.textContent = `Copied ${name} bio`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 2000); }
  };

  const activeCat = bioCategories.find(c => c.platform === active)!;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Bio templates</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Aesthetic Bio Templates
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
        Ready-made bio templates with symbols and decorations. Click any bio to copy it. Replace the [bracketed] parts with your own info.
      </p>

      {/* Platform tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {bioCategories.map(c => (
          <button key={c.platform} className={`cat-pill ${active === c.platform ? "active" : ""}`} onClick={() => setActive(c.platform)}>
            {c.icon} {c.platform}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {activeCat.bios.map(({ name, text }) => (
          <div key={name} onClick={() => copy(text, name)}
            style={{ background: "var(--surface)", border: `1px solid ${copied === name ? "var(--accent)" : "var(--border)"}`, borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.18s" }}
            onMouseEnter={e => { if (copied !== name) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { if (copied !== name) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--accent)" }}>{name}</span>
              <span style={{ fontSize: 11, color: copied === name ? "var(--accent)" : "var(--text3)" }}>{copied === name ? "✓ copied!" : "click to copy"}</span>
            </div>
            <pre style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "var(--text2)", whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.7 }}>{text}</pre>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 56, padding: "24px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>💡 How to use these bio templates</h2>
        <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>Click any template to copy it. Then paste it into your bio editor and replace the [bracketed text] with your own info. The symbols and decorations will appear exactly as shown on the template.</p>
      </section>
    </div>
  );
}
