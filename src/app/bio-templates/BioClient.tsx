"use client";
import { useState } from "react";
import Link from "next/link";
import { bioTemplates, bioVibes, bioPlatforms, getBioTemplatesByVibe, type BioVibe } from "@/data/collections/bio-templates";

export default function BioClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeVibe, setActiveVibe] = useState<BioVibe | "all">("all");

  const copy = async (e: React.MouseEvent, text: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(text);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "📝"; toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const displayedVibes = activeVibe === "all" ? bioVibes : bioVibes.filter(v => v.id === activeVibe);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Ready-to-paste bios</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        📝 Bio Templates — {bioTemplates.length} for Instagram, TikTok & more
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        Ready-to-paste bio templates for Instagram, TikTok, LinkedIn, Twitter/X, Bumble and YouTube. {bioTemplates.length} templates across 12 vibes — aesthetic, professional, minimalist, cottagecore, coquette, Y2K, witchy, humorous, dating, streamer, artist, athlete. Each has fillable <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>{`{PLACEHOLDERS}`}</code> and a per-platform char-limit check.
      </p>

      {/* Vibe filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        <button className={`cat-pill ${activeVibe === "all" ? "active" : ""}`} onClick={() => setActiveVibe("all")}>✦ All vibes</button>
        {bioVibes.map(v => (
          <button key={v.id} className={`cat-pill ${activeVibe === v.id ? "active" : ""}`} onClick={() => setActiveVibe(v.id)}>{v.name}</button>
        ))}
      </div>

      {/* Platform legend */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, fontSize: 12, color: "var(--text3)" }}>
        {bioPlatforms.map(p => (
          <span key={p.id} style={{ padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", background: "var(--bg)" }}>
            {p.name} · {p.charLimit} chars
          </span>
        ))}
      </div>

      {displayedVibes.map(vibe => {
        const items = getBioTemplatesByVibe(vibe.id);
        if (items.length === 0) return null;
        return (
          <section key={vibe.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{vibe.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{vibe.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
              {items.map(b => {
                const pMeta = bioPlatforms.find(p => p.id === b.platform);
                const overLimit = pMeta && b.charCount > pMeta.charLimit;
                return (
                  <Link
                    key={b.slug}
                    href={`/bio-templates/${b.slug}`}
                    prefetch={false}
                    style={{ background: "var(--surface)", border: `1px solid ${copied === b.template ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 16px 14px", display: "flex", flexDirection: "column", gap: 10, textDecoration: "none", color: "inherit", transition: "border-color 0.15s", position: "relative" }}
                  >
                    <button
                      onClick={(e) => copy(e, b.template, b.name)}
                      aria-label={`Copy ${b.name}`}
                      style={{ position: "absolute", top: 12, right: 12, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontFamily: "DM Mono, monospace", color: copied === b.template ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                    >
                      {copied === b.template ? "✓ COPIED" : "COPY"}
                    </button>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingRight: 70 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{b.name}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, fontSize: 10, fontFamily: "DM Mono, monospace", color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      <span style={{ color: "var(--accent)" }}>{pMeta?.name ?? b.platform}</span>
                      <span>·</span>
                      <span style={{ color: overLimit ? "#ff6b6b" : "var(--text3)" }}>{b.charCount}/{pMeta?.charLimit}</span>
                    </div>
                    <pre style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--text2)", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6, maxHeight: 140, overflow: "hidden" }}>{b.template}</pre>
                    <div style={{ fontSize: 11, color: "var(--accent)", marginTop: "auto" }}>open →</div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
