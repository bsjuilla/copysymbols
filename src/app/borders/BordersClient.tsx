"use client";
import { useState } from "react";
import Link from "next/link";
import { borderCategories, getBordersByCategory } from "@/data/collections/borders";

export default function BordersClient() {
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
      toastSym.textContent = s.length > 6 ? "─" : s;
      toastMsg.textContent = `Copied ${n}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Decoration</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Aesthetic Borders & Dividers — 120+ to Copy & Paste
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>
        Every text divider in one place — box-drawing edges, horizontal rules, decorative frames, ornamental dividers and ready-made bio combos. Click any divider to copy it, or open its page for usage tips, related dividers and platform notes. Works on Discord, Instagram, TikTok, Notion and everywhere else.
      </p>

      {borderCategories.map(cat => {
        const items = getBordersByCategory(cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{cat.name}</h2>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.description}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map(b => (
                <Link
                  key={b.slug}
                  href={`/borders/${b.slug}`}
                  prefetch={false}
                  style={{ background: "var(--surface)", border: `1px solid ${copied === b.char ? "var(--accent)" : "var(--border)"}`, borderRadius: 10, padding: "12px 14px 12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, transition: "border-color 0.15s", textDecoration: "none", color: "inherit" }}
                >
                  <pre style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 14, color: "var(--text)", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1, minWidth: 0 }}>{b.char}</pre>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "var(--text3)" }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>open →</div>
                    </div>
                    <button
                      onClick={(e) => copy(e, b.char, b.name)}
                      aria-label={`Copy ${b.name}`}
                      style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontFamily: "var(--font-dm-mono), monospace", color: copied === b.char ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em" }}
                    >
                      {copied === b.char ? "✓ COPIED" : "COPY"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
        {[
          { q: "Which divider should I use for an Instagram bio?", a: "Ready-made combos like ❀⋆｡˚⋆❀ and ═══ஓ๑✿๑ஓ═══ are the most popular for IG bios because they stay symmetric and read as 'designed'. Avoid very long single-character rules (────────────) — they hit the 150-character bio limit fast." },
          { q: "What's the difference between ─ and —?", a: "─ (U+2500) is a box-drawing horizontal that aligns with corners like ┌ ┐ — built for ASCII boxes. — (U+2014) is the em-dash, an editorial punctuation mark slightly wider than ─. Both work as dividers; pick ─ for monospace/CLI contexts and — for prose." },
          { q: "Do these dividers work on Discord?", a: "Yes. Discord supports Unicode dividers in messages, channel topics, server descriptions and 'About Me' fields. For pixel-aligned ASCII boxes inside Discord, wrap them in code blocks (``` ```) so they render in monospace." },
          { q: "Why does my divider render at different widths on iPhone vs Android?", a: "Different system fonts have slightly different metrics — the same Unicode character can be ~5% wider on one platform than another. Box-drawing characters (─ ━ ═) are designed for monospace consistency, but proportional fonts (used in bios) will show small variations." },
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
