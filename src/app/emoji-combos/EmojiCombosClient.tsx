"use client";
import { useState } from "react";

const comboCategories = [
  { name: "Aesthetic & Vibes", combos: [
    { s: "🌙✨", n: "Moon sparkle" }, { s: "✨🌙✨", n: "Sparkle moon" }, { s: "🌙⭐✨", n: "Night sky" },
    { s: "🌸✨", n: "Blossom sparkle" }, { s: "🌿✨", n: "Nature glow" }, { s: "🦋✨", n: "Butterfly magic" },
    { s: "💫🌙", n: "Dizzy moon" }, { s: "🌊🐚", n: "Ocean vibes" }, { s: "🍃🌸", n: "Spring" },
    { s: "☁️🌙", n: "Cloudy night" }, { s: "🌅✨", n: "Sunrise" }, { s: "🌺🌊", n: "Tropical" },
    { s: "🫧✨", n: "Bubbles" }, { s: "🌙🖤", n: "Dark moon" }, { s: "⭐🌙⭐", n: "Stars night" },
    { s: "🌷🌸🌹", n: "Flower trio" },
  ]},
  { name: "Mood & Emotion", combos: [
    { s: "💀🔥", n: "Dead fire" }, { s: "🔥💯", n: "Fire hundred" }, { s: "😭💀", n: "Dead laughing" },
    { s: "🥺👉👈", n: "Shy plea" }, { s: "😌✨", n: "Blessed" }, { s: "🙄💅", n: "Unbothered" },
    { s: "😤💢", n: "Angry steam" }, { s: "🥰💕", n: "In love" }, { s: "😍❤️", n: "Heart eyes" },
    { s: "🫶🏽✨", n: "Heart hands glow" }, { s: "💔😭", n: "Heartbroken" }, { s: "😂💀", n: "Hilarious" },
    { s: "🤭✨", n: "Giggly" }, { s: "😴💤", n: "Sleepy" }, { s: "🤩⭐", n: "Star struck" },
    { s: "😏🔥", n: "Smug fire" },
  ]},
  { name: "Dark & Edgy", combos: [
    { s: "🖤🖤🖤", n: "Triple black" }, { s: "💀☠️", n: "Skull duo" }, { s: "🌑🔮", n: "Dark mystic" },
    { s: "⚡🖤", n: "Dark lightning" }, { s: "🕷️🖤", n: "Spider dark" }, { s: "🥀🖤", n: "Dead rose" },
    { s: "🌑💀", n: "Dark moon skull" }, { s: "⛓️🖤", n: "Chains dark" }, { s: "🔪💀", n: "Edgy" },
    { s: "🕯️🖤", n: "Candle dark" }, { s: "🌑🌒🌓", n: "Moon phases" }, { s: "🦇🌑", n: "Bat night" },
  ]},
  { name: "Soft & Cute", combos: [
    { s: "🌸🍵", n: "Blossom tea" }, { s: "🐰💕", n: "Bunny love" }, { s: "🍑🌸", n: "Peach blossom" },
    { s: "☁️🌙", n: "Cloud moon" }, { s: "🍓💖", n: "Berry love" }, { s: "🌷💗", n: "Tulip pink" },
    { s: "🐾💕", n: "Paw love" }, { s: "🍭🌈", n: "Candy rainbow" }, { s: "🎀💝", n: "Bow heart" },
    { s: "🌸🎀🌸", n: "Bow blossoms" }, { s: "🧸💕", n: "Bear love" }, { s: "🍰🌸", n: "Cake blossom" },
    { s: "🌙🌸✨", n: "Night blossom" }, { s: "🍬🌷", n: "Candy tulip" }, { s: "🐱🌸", n: "Cat blossom" },
    { s: "🎀✨💕", n: "Bow sparkle love" },
  ]},
  { name: "Goals & Motivation", combos: [
    { s: "💪🔥", n: "Strong fire" }, { s: "🏆✨", n: "Trophy glow" }, { s: "🚀💫", n: "Rocket star" },
    { s: "💰💸", n: "Money moves" }, { s: "📈🔥", n: "Growth fire" }, { s: "👑✨", n: "Crown glow" },
    { s: "💎👑", n: "Diamond crown" }, { s: "🎯🔥", n: "Target fire" }, { s: "⚡💪", n: "Lightning strength" },
    { s: "🌟💪", n: "Star strength" }, { s: "🏅🔥", n: "Medal fire" }, { s: "📚☕", n: "Study coffee" },
  ]},
  { name: "Nature & Seasons", combos: [
    { s: "🍂🍁", n: "Autumn leaves" }, { s: "❄️⛄", n: "Winter snow" }, { s: "🌸🌿", n: "Spring green" },
    { s: "🌊🐠", n: "Ocean fish" }, { s: "🌞🌻", n: "Sunny flower" }, { s: "🍃💨", n: "Windy leaves" },
    { s: "🌈☁️", n: "Rainbow clouds" }, { s: "⛈️⚡", n: "Storm lightning" }, { s: "🌊🐋", n: "Ocean whale" },
    { s: "🌙⭐🌟", n: "Night stars" }, { s: "🌺🦋", n: "Flower butterfly" }, { s: "🍄🌿", n: "Mushroom herb" },
  ]},
];

export default function EmojoCombosClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [active, setActive] = useState("all");

  const copy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); } catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = s; toastMsg.textContent = `Copied ${n}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };

  const displayed = active === "all" ? comboCategories : comboCategories.filter(c => c.name === active);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Emoji combinations</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        🌙✨ Emoji Combinations
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
        Popular emoji combos and pairings. Click any combination to copy it instantly. Perfect for Instagram captions, TikTok bios and text messages.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        <button className={`cat-pill ${active === "all" ? "active" : ""}`} onClick={() => setActive("all")}>✦ All</button>
        {comboCategories.map(c => <button key={c.name} className={`cat-pill ${active === c.name ? "active" : ""}`} onClick={() => setActive(c.name)}>{c.name}</button>)}
      </div>

      {displayed.map(cat => (
        <section key={cat.name} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{cat.name}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
            {cat.combos.map(({ s, n }) => (
              <div key={s + n} className={`symbol-card ${copied === s ? "copied" : ""}`} onClick={() => copy(s, n)} title={`Copy ${n}`} style={{ padding: "16px 8px" }}>
                <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{s}</span>
                <span className="symbol-name">{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
