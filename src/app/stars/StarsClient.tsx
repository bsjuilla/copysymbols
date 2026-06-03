"use client";
import { useState } from "react";
import Link from "next/link";
import { stars, starCategories, getStarsByCategory } from "@/data/collections/stars";

export default function StarsClient() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (e: React.MouseEvent, s: string, n: string) => {
    e.preventDefault();
    e.stopPropagation();
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
      <div className="section-label">Stars & sparkles</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        ★ Star Symbol Copy & Paste — 130+ Stars
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>
        Every star symbol in one place — classic stars, outlined, decorative dingbats, sparkles, asterisks, compass roses, and ready-made aesthetic combos. {stars.length} unique glyphs. Click any star to copy it, or open its page for details, alternatives, and platform notes. Works on Instagram, TikTok, Discord, Word and everywhere else.
      </p>

      {starCategories.map(cat => {
        const items = getStarsByCategory(cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{cat.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.description}</p>
            <div className="symbols-grid">
              {items.map(s => (
                <Link
                  key={s.slug}
                  href={`/stars/${s.slug}`}
                  className={`symbol-card ${copied === s.char ? "copied" : ""}`}
                  prefetch={false}
                  style={{ textDecoration: "none", color: "inherit", position: "relative" }}
                  title={`Open ${s.name} page`}
                >
                  <button
                    onClick={(e) => copy(e, s.char, s.name)}
                    aria-label={`Copy ${s.name}`}
                    style={{ position: "absolute", top: 6, right: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontFamily: "var(--font-dm-mono), monospace", color: copied === s.char ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                  >
                    {copied === s.char ? "✓" : "COPY"}
                  </button>
                  <span className="symbol-char">{s.char}</span>
                  <span className="symbol-name">{s.name}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
        {[
          { q: "How do I type a star symbol on my keyboard?", a: "There's no dedicated star key on most keyboards. The fastest way is to click any star on this page — it copies to your clipboard. On Mac you can also press Option+8 for the asterisk * which renders as a star in some fonts. On Windows hold Alt and type 9733 on the numpad for ★." },
          { q: "What's the difference between ★ and ⭐?", a: "★ (U+2605) is a text-style star — renders in the surrounding text colour as a monochrome glyph. ⭐ (U+2B50) is an emoji — renders as a yellow/gold colored star on most platforms. Use ★ for inline ratings and headers, ⭐ when you want the colorful 'highlight' look." },
          { q: "Which star is best for Instagram bio?", a: "For minimalist bios use ★, ☆, ✦, ⋆ — all monochrome and clean. For aesthetic-style bios use combos like ✩₊˚ or ⋆｡°. For an attention-grabbing bio use ⭐ or ✨ (emoji-styled, colorful)." },
          { q: "Do all these star symbols work on iPhone and Android?", a: "Yes — the classic Unicode stars (★ ☆ ✦ ✧ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ⋆ ✶ ✷ ✸ etc.) work on every modern phone. A handful of newer stars from the U+1F7C0+ block may show as boxes on older systems — see each star's individual page for compatibility notes." },
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
