"use client";
import { useState } from "react";
import Link from "next/link";
import { emojiCombos, comboThemes, getCombosByTheme, type ComboTheme } from "@/data/collections/emoji-combos";

export default function EmojoCombosClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [active, setActive] = useState<ComboTheme | "all">("all");

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

  const displayedThemes = active === "all" ? comboThemes : comboThemes.filter(t => t.id === active);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Emoji combinations</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        🌙✨ Emoji Combos — 120 Aesthetic Pairings
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
        Popular emoji combos across 12 themes — aesthetic, coquette, cottagecore, witchy, Y2K, cozy, and more. Click any combo to copy it, or open its page for the vibe story, related combos, and platform notes. Perfect for Instagram bios, TikTok captions, and posts that need a visual mood.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        <button className={`cat-pill ${active === "all" ? "active" : ""}`} onClick={() => setActive("all")}>✦ All</button>
        {comboThemes.map(t => (
          <button key={t.id} className={`cat-pill ${active === t.id ? "active" : ""}`} onClick={() => setActive(t.id)}>{t.name}</button>
        ))}
      </div>

      {displayedThemes.map(theme => {
        const items = getCombosByTheme(theme.id);
        if (items.length === 0) return null;
        return (
          <section key={theme.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{theme.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{theme.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {items.map(c => (
                <Link
                  key={c.slug}
                  href={`/emoji-combos/${c.slug}`}
                  className={`symbol-card ${copied === c.combo ? "copied" : ""}`}
                  prefetch={false}
                  style={{ textDecoration: "none", color: "inherit", position: "relative" }}
                  title={`Open ${c.name} page`}
                >
                  <button
                    onClick={(e) => copy(e, c.combo, c.name)}
                    aria-label={`Copy ${c.name}`}
                    style={{ position: "absolute", top: 6, right: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontFamily: "DM Mono, monospace", color: copied === c.combo ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                  >
                    {copied === c.combo ? "✓" : "COPY"}
                  </button>
                  <span style={{ fontSize: "1.6rem", lineHeight: 1.1, marginTop: 4 }}>{c.combo}</span>
                  <span className="symbol-name">{c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
