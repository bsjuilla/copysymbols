"use client";
import { useState } from "react";
import Link from "next/link";
import { textArt, textArtCategories, getTextArtByCategory } from "@/data/collections/text-art";

export default function TextArtClient() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (e: React.MouseEvent, art: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    try { await navigator.clipboard.writeText(art); }
    catch { const ta = document.createElement("textarea"); ta.value = art; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(art);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = art.includes("\n") ? "✦" : art; toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">ASCII & Unicode text art</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        🎨 Text Art — 100 ASCII Pieces to Copy & Paste
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 620 }}>
        Single-line and multi-line text art across 10 categories — animals, faces, hearts, hands, pixel art, decorations, and more. Click any piece to copy it, or open its page for usage tips (most multi-line art needs a monospaced font like Discord code blocks or terminals to render correctly).
      </p>

      {textArtCategories.map(cat => {
        const items = getTextArtByCategory(cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{cat.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
              {items.map(t => (
                <Link
                  key={t.slug}
                  href={`/text-art/${t.slug}`}
                  prefetch={false}
                  style={{ background: "var(--surface)", border: `1px solid ${copied === t.art ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "14px 14px 12px", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "inherit", minHeight: 130, transition: "border-color 0.15s", position: "relative" }}
                >
                  <button
                    onClick={(e) => copy(e, t.art, t.name)}
                    aria-label={`Copy ${t.name}`}
                    style={{ position: "absolute", top: 8, right: 8, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontFamily: "DM Mono, monospace", color: copied === t.art ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                  >
                    {copied === t.art ? "✓" : "COPY"}
                  </button>
                  <pre style={{ fontFamily: "DM Mono, monospace", fontSize: t.lines > 1 ? "0.7rem" : "1.1rem", color: "var(--text)", margin: 0, whiteSpace: "pre", overflow: "hidden", textAlign: "center", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1.25, paddingRight: 36 }}>{t.art}</pre>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>{t.name}</span>
                    <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "DM Mono, monospace" }}>{t.lines}L →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
