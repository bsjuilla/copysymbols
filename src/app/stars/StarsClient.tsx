"use client";
import { useState } from "react";

// Sections split into honest categories: pure star Unicode first, then star
// emoji, then sky/snowflake/award emoji that the audit flagged for being
// shoved into the star bucket under misleading labels.
type Section = { name: string; note?: string; stars: { s: string; n: string }[] };

const starCategories: Section[] = [
  {
    name: "Classic Stars (Unicode)",
    note: "Pure star symbols from the Unicode standard — single-character, render the same everywhere.",
    stars: [
      { s: "★", n: "Black Star" }, { s: "☆", n: "White Star" }, { s: "✦", n: "Four Point Star" },
      { s: "✧", n: "Four Point White" }, { s: "✩", n: "Stress Star" }, { s: "✪", n: "Circled Star" },
      { s: "✫", n: "Open Centre Star" }, { s: "✬", n: "Black Centre Star" }, { s: "✭", n: "Outlined Star" },
      { s: "✮", n: "Heavy Outlined Star" }, { s: "✯", n: "Pinwheel Star" }, { s: "✰", n: "Shadowed Star" },
      { s: "⋆", n: "Star Operator" }, { s: "✶", n: "Six Point Star" }, { s: "✷", n: "Eight Point Star" },
      { s: "✸", n: "Eight Point Circled" }, { s: "✹", n: "Heavy Eight Point" }, { s: "✺", n: "Twelve Point" },
      { s: "✻", n: "Teardrop Star" }, { s: "✼", n: "Open Centre Teardrop" }, { s: "✽", n: "Heavy Teardrop" },
      { s: "❂", n: "Circled White Star" }, { s: "⚝", n: "Outlined Star (Variant)" },
    ],
  },
  {
    name: "Star Emoji",
    note: "Standard star emoji — render colourful on modern devices.",
    stars: [
      { s: "⭐", n: "Star" }, { s: "🌟", n: "Glowing Star" }, { s: "💫", n: "Dizzy Star" },
      { s: "✨", n: "Sparkles" }, { s: "🌠", n: "Shooting Star" }, { s: "🔯", n: "Six Pointed Star" },
    ],
  },
  {
    name: "Star-Shaped Text Symbols",
    note: "Non-star Unicode characters that look starry — punctuation, asterism, dingbats. Useful as bullets or dividers.",
    stars: [
      { s: "≛", n: "Star Equals" }, { s: "⁂", n: "Asterism" }, { s: "※", n: "Reference Mark" },
      { s: "⊹", n: "Cross Star" }, { s: "꙳", n: "Star Asterisk" }, { s: "𖡼", n: "Leaf Star" },
    ],
  },
  {
    name: "Sky & Night Emoji",
    note: "Not stars, but star-adjacent — moons, sun, galaxy, night-sky. Honest section for what users often look for under \"stars\".",
    stars: [
      { s: "🌃", n: "Night with Stars" }, { s: "🌌", n: "Milky Way" },
      { s: "🌙", n: "Crescent Moon" }, { s: "☀", n: "Sun" },
      { s: "🌛", n: "First Quarter Moon" }, { s: "🌜", n: "Last Quarter Moon" },
    ],
  },
  {
    name: "Snowflake & Florette Dingbats",
    note: "Snowflakes and floral dingbats from the same Unicode block as stars (U+2740–U+2746) — visually similar, often used together.",
    stars: [
      { s: "✾", n: "Six Petalled Star" }, { s: "✿", n: "Black Florette" }, { s: "❀", n: "White Florette" },
      { s: "❁", n: "Eight Petalled" }, { s: "❃", n: "Heavy Teardrop Black" },
      { s: "❄", n: "Snowflake" }, { s: "❅", n: "Tight Trifoliate Snowflake" }, { s: "❆", n: "Heavy Chevron Snowflake" },
      { s: "❇", n: "Sparkle" }, { s: "❈", n: "Heavy Sparkle" }, { s: "❉", n: "Balloon Spoked Asterisk" },
    ],
  },
  {
    name: "Awards & Ratings Emoji",
    note: "Medals and trophies — not stars, but commonly used in the same context (rating, ranking, achievement).",
    stars: [
      { s: "🏅", n: "Sports Medal" }, { s: "🥇", n: "Gold Medal" }, { s: "🥈", n: "Silver Medal" },
      { s: "🥉", n: "Bronze Medal" }, { s: "🏆", n: "Trophy" },
    ],
  },
  {
    name: "Star Patterns & Combos",
    note: "Pre-arranged decorative combos for bios, captions, and aesthetic posts.",
    stars: [
      { s: "★★★★★", n: "Five Stars" }, { s: "☆☆☆☆☆", n: "Five Empty Stars" }, { s: "★★★★☆", n: "Four of Five" },
      { s: "✦✦✦", n: "Triple Star" }, { s: "✧˚ ༘ ⋆｡♡˚", n: "Dreamy Stars" }, { s: "⋆｡°✩", n: "Star Sequence" },
      { s: "˚★彡", n: "Star Flow" }, { s: "✦✧✦", n: "Star Alternating" }, { s: "★彡", n: "Star Japanese" },
    ],
  },
];

export default function StarsClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); } catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = s; toastMsg.textContent = `Copied ${n}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Stars & sparkles</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>★ Star Symbol Copy & Paste</h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>Every star symbol, emoji and text star in one place. Click any star to copy it instantly. Perfect for ratings, bios, Discord names and decorations.</p>
      {starCategories.map(cat => (
        <section key={cat.name} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: cat.note ? 6 : 16 }}>{cat.name}</h2>
          {cat.note && (
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.note}</p>
          )}
          <div className="symbols-grid">
            {cat.stars.map(({ s, n }) => (
              <div key={s + n} className={`symbol-card ${copied === s ? "copied" : ""}`} onClick={() => copy(s, n)} title={`Copy ${n}`}>
                <span className="symbol-char">{s}</span>
                <span className="symbol-name">{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is the star symbol called?", a: "The most common star symbol ★ is called 'Black Star' in Unicode (U+2605). The outline version ☆ is 'White Star' (U+2606). The sparkle ✨ is a separate emoji often used to indicate excitement or newness." },
          { q: "How do I type a star on my keyboard?", a: "Most keyboards do not have a dedicated star key. The asterisk (*) is the closest — press Shift+8. For the actual star symbols ★☆, copy from this page and paste wherever you need them." },
          { q: "Which star symbol is best for Instagram bio?", a: "The most popular stars for Instagram bios are ✦ (four-pointed star), ⋆ (small star operator), ✧ (white four-pointed), and ✨ (sparkles emoji). Many users combine them like ✦✧✦ for decorative effect." },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
