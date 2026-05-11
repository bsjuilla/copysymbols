"use client";
import { useState } from "react";
import Link from "next/link";
import { bullets, bulletCategories, getBulletsByCategory } from "@/data/collections/bullets";

export default function BulletsClient() {
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
      <div className="section-label">List symbols</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        • Bullet Point Symbols — 120+ to Copy & Paste
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>
        Every bullet point symbol in one place — dots, arrows, stars, flowers, numbered and aesthetic. Click any bullet to copy it instantly. Open a bullet&apos;s page for details, alternatives, and pairing tips. Works on Word, Google Docs, LinkedIn, Discord, Instagram and everywhere else.
      </p>

      {bulletCategories.map(cat => {
        const items = getBulletsByCategory(cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{cat.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.description}</p>
            <div className="symbols-grid">
              {items.map(b => (
                <Link
                  key={b.slug}
                  href={`/bullet-points/${b.slug}`}
                  className={`symbol-card ${copied === b.char ? "copied" : ""}`}
                  prefetch={false}
                  style={{ textDecoration: "none", color: "inherit", position: "relative" }}
                  title={`Open ${b.name} page`}
                >
                  <button
                    onClick={(e) => copy(e, b.char, b.name)}
                    aria-label={`Copy ${b.name}`}
                    style={{ position: "absolute", top: 6, right: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontFamily: "DM Mono, monospace", color: "var(--text3)", cursor: "pointer", letterSpacing: "0.04em" }}
                  >
                    COPY
                  </button>
                  <span className="symbol-char">{b.char}</span>
                  <span className="symbol-name">{b.name}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* FAQ for SEO */}
      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
        {[
          { q: "How do I add a bullet point in Word or Google Docs?", a: "The fastest way is to click any bullet on this page — it copies to your clipboard instantly, then paste with Ctrl+V (Cmd+V on Mac). For automatic bullets, use the bullet-list button in your toolbar instead." },
          { q: "Which bullet point should I use for Instagram bio?", a: "For Instagram bios, ✦ ✨ ✿ ❀ ୨୧ ⋆｡° are the most popular. They keep your bio feeling intentional rather than default. Pick a bullet whose shape matches your tone — sparkles for soft/aesthetic, ◆ for sharp/modern, ❀ for floral/feminine." },
          { q: "What's the difference between • and ●?", a: "• (U+2022) is the standard list bullet — slightly raised, medium weight. ● (U+25CF) is a black circle, larger and heavier. Use • for body-text lists, ● when you need a bullet that reads at a glance in heading-style lists." },
          { q: "Do bullet symbols work on LinkedIn?", a: "Yes. LinkedIn supports Unicode bullets in headlines, About sections, and post bodies. Copy any bullet from this page and paste it directly. Avoid emoji-rendered bullets (⚫ ⚪ 🔴) in formal posts; stick to monochrome text bullets like • ▪ ◆ for a professional look." },
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
