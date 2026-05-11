"use client";
import { useState } from "react";
import Link from "next/link";
import { hearts, heartCategories, getHeartsByCategory } from "@/data/collections/hearts";

export default function HeartsClient() {
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
      toastSym.textContent = s.includes("\n") ? "♥" : s; toastMsg.textContent = `Copied ${n}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Love & romance</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        ❤ Heart Symbol Copy & Paste — {hearts.length}+ Hearts
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>
        Every heart symbol, emoji, kaomoji combo, ASCII heart and script-letter heart in one place. {hearts.length} unique glyphs across 7 categories. Click any heart to copy it, or open its page for the tone notes, alternative forms, and rendering caveats. Works on Instagram, TikTok, WhatsApp, Discord and everywhere else.
      </p>

      {heartCategories.map(cat => {
        const items = getHeartsByCategory(cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{cat.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.description}</p>
            <div className="symbols-grid">
              {items.map(h => (
                <Link
                  key={h.slug}
                  href={`/hearts/${h.slug}`}
                  className={`symbol-card ${copied === h.char ? "copied" : ""}`}
                  prefetch={false}
                  style={{ textDecoration: "none", color: "inherit", position: "relative" }}
                  title={`Open ${h.name} page`}
                >
                  <button
                    onClick={(e) => copy(e, h.char, h.name)}
                    aria-label={`Copy ${h.name}`}
                    style={{ position: "absolute", top: 6, right: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontFamily: "DM Mono, monospace", color: copied === h.char ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                  >
                    {copied === h.char ? "✓" : "COPY"}
                  </button>
                  <span className="symbol-char" style={h.char.includes("\n") ? { whiteSpace: "pre", fontFamily: "DM Mono, monospace", fontSize: "clamp(0.6rem, 8cqi, 0.9rem)", lineHeight: 1.2 } : undefined}>{h.char}</span>
                  <span className="symbol-name">{h.name}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
        {[
          { q: "How do I type a heart symbol on my keyboard?", a: "The fastest way is to click any heart above — it copies to your clipboard instantly. On Mac press Option+V for ♥ (the heart suit). On Windows hold Alt and type 3 on the numpad for ♥. iOS and Android have hearts in the emoji keyboard." },
          { q: "What's the difference between ❤ and ♥?", a: "❤ (U+2764) is the emoji heart — renders red/colored on modern devices unless followed by U+FE0E (text presentation selector). ♥ (U+2665) is the heart suit from card games — usually monochrome text. Both copy and paste the same way." },
          { q: "Which heart is best for an Instagram bio?", a: "For minimalist bios, ♡ (outline) is the most popular — clean and doesn't grab attention away from your text. For pink/girly aesthetics, 🩷 or 💕. For dark/edgy, 🖤. For aesthetic combos that don't read as romantic, try ˚ʚ♡ɞ˚ or ♡⋆｡˚." },
          { q: "Why does ❤ sometimes render as ❤︎ (black) instead of red?", a: "When ❤ is followed by U+FE0E (text variation selector) it forces monochrome text rendering. Without any selector, the platform decides — most modern platforms default to the red emoji. Add U+FE0F to force the emoji presentation explicitly." },
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
