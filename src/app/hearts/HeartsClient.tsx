"use client";
import { useState } from "react";

// Sections are split into honest categories: strict heart Unicode first,
// then heart emoji, then related-but-not-strictly-hearts content (kissing
// couples, wedding rings, scripts that look heart-shaped). The visual audit
// flagged the original "Decorative Hearts" and "Text Hearts" sections for
// mixing actual hearts with non-heart content under misleading labels.
type Section = { name: string; note?: string; hearts: { s: string; n: string }[] };

const heartCategories: Section[] = [
  {
    name: "Classic Hearts (Unicode)",
    note: "Pure heart symbols from the Unicode standard — single-character, render the same everywhere.",
    hearts: [
      { s: "❤", n: "Red Heart" }, { s: "♥", n: "Heart Suit" }, { s: "♡", n: "White Heart Suit" },
      { s: "❥", n: "Rotated Heavy Black Heart" }, { s: "❣", n: "Heavy Heart Exclamation" },
      { s: "❦", n: "Floral Heart" }, { s: "❧", n: "Rotated Floral Heart" },
      { s: "🩷", n: "Pink Heart" }, { s: "🤍", n: "White Heart" }, { s: "🖤", n: "Black Heart" },
    ],
  },
  {
    name: "Coloured Heart Emoji",
    note: "Standard emoji hearts — render as colourful images on modern devices, monochrome on older ones.",
    hearts: [
      { s: "💕", n: "Two Hearts" }, { s: "💞", n: "Revolving Hearts" }, { s: "💓", n: "Beating Heart" },
      { s: "💗", n: "Growing Heart" }, { s: "💖", n: "Sparkling Heart" }, { s: "💘", n: "Heart with Arrow" },
      { s: "💝", n: "Heart with Ribbon" }, { s: "💟", n: "Heart Decoration" }, { s: "💔", n: "Broken Heart" },
      { s: "💛", n: "Yellow Heart" }, { s: "💚", n: "Green Heart" }, { s: "💙", n: "Blue Heart" },
      { s: "💜", n: "Purple Heart" }, { s: "🧡", n: "Orange Heart" }, { s: "🤎", n: "Brown Heart" },
      { s: "💌", n: "Love Letter" }, { s: "🫀", n: "Anatomical Heart" }, { s: "🫶", n: "Heart Hands" },
    ],
  },
  {
    name: "Romance & Love Emoji",
    note: "Not technically hearts, but commonly used in love-themed posts: kissing faces, couples, rings, weddings.",
    hearts: [
      { s: "💏", n: "Kiss" }, { s: "👫", n: "Couple" }, { s: "💑", n: "Couple with Heart" },
      { s: "🥰", n: "Smiling with Hearts" }, { s: "😍", n: "Heart Eyes" }, { s: "😘", n: "Face Blowing Kiss" },
      { s: "💋", n: "Kiss Mark" }, { s: "💒", n: "Wedding" }, { s: "💍", n: "Ring" },
    ],
  },
  {
    name: "Heart-Shaped Glyphs from Other Scripts",
    note: "Letters from Tamil, Georgian, and Korean scripts that resemble hearts in many fonts. These aren't heart Unicode codepoints — they're full letters being used decoratively.",
    hearts: [
      { s: "ஐ", n: "Tamil Om" }, { s: "ვ", n: "Georgian Vin" }, { s: "ლ", n: "Georgian Lasi" },
      { s: "ღ", n: "Georgian Ghan" }, { s: "웃", n: "Korean Us" }, { s: "유", n: "Korean Yu" },
    ],
  },
  {
    name: "Heart Combinations & Kaomoji",
    note: "Pre-arranged decorative combos for bios, captions, and aesthetic posts.",
    hearts: [
      { s: "❤️‍🔥", n: "Heart on Fire" }, { s: "❤️‍🩹", n: "Mending Heart" },
      { s: "♥♥", n: "Double Heart" }, { s: "❤❤", n: "Double Red" }, { s: "💕💕", n: "Double Pink" },
      { s: "💓💓", n: "Beating x2" }, { s: "🫀💕", n: "Anatomical Love" },
      { s: "♡˖꒰ᵕ̈꒱˖♡", n: "Cute Heart Frame" }, { s: "♡.*・。゚", n: "Sparkle Heart" },
      { s: "˚ʚ♡ɞ˚", n: "Pastel Heart" }, { s: "♡⃛", n: "Heart Sparkle" },
      { s: "♡̷̨", n: "Broken Heart Style" }, { s: "❤︎", n: "Heart Text" },
      { s: "꒰♡꒱", n: "Heart in brackets" }, { s: "(*´꒳`*)♡", n: "Love face" },
      { s: "♡ヽ(^Д^)ﾉ", n: "Excited love" }, { s: "（っ＾▿＾）♥", n: "Happy heart" },
    ],
  },
];

export default function HeartsClient() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); }
    catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = s; toastMsg.textContent = `Copied ${n}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Love & romance</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        ❤ Heart Symbol Copy & Paste
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>
        Every heart symbol, emoji and text heart in one place. Click any heart to copy it instantly. Works on Instagram, TikTok, WhatsApp, Discord and everywhere else.
      </p>

      {heartCategories.map(cat => (
        <section key={cat.name} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: cat.note ? 6 : 16 }}>{cat.name}</h2>
          {cat.note && (
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.note}</p>
          )}
          <div className="symbols-grid">
            {cat.hearts.map(({ s, n }) => (
              <div key={s + n} className={`symbol-card ${copied === s ? "copied" : ""}`} onClick={() => copy(s, n)} title={`Copy ${n}`}>
                <span className="symbol-char">{s}</span>
                <span className="symbol-name">{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ for SEO */}
      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently Asked Questions</h2>
        {[
          { q: "How do I type a heart symbol?", a: "The easiest way is to click any heart on this page — it copies to your clipboard instantly. You can then paste it anywhere. On a Mac, you can also press Option+V for ♥. On Windows, hold Alt and type 3 on the numpad." },
          { q: "What is the difference between ❤ and ♥?", a: "❤ is the emoji version of the heart, which displays in colour on modern devices. ♥ is the Unicode heart suit character from card games, which often displays in black. Both copy and paste the same way." },
          { q: "Which heart symbol works on Instagram?", a: "All the hearts on this page work on Instagram. The most popular for Instagram bios are ❤, ♡, 💕, and 🖤. For a minimalist look, ♡ (the outline heart) is very popular." },
          { q: "How do I make a heart on my keyboard?", a: "There is no dedicated heart key on most keyboards. The fastest way is to copy from this page. Alternatively, on Mac use Option+V for ♥, on Windows use Alt+3 (numpad) for ♥, or on any phone open the emoji keyboard." },
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
