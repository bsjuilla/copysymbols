"use client";
import { useState } from "react";
import type { PlatformConfig } from "@/data/collections/platforms";

interface Props { platform: PlatformConfig }

export default function PlatformPageClient({ platform }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const totalSymbols = platform.categories.reduce((sum, c) => sum + c.symbols.length, 0);

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
      <div className="section-label">{platform.emoji} {platform.name}</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        {totalSymbols}+ Symbols for {platform.name}
      </h1>
      <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.5, marginBottom: 16, maxWidth: 640, fontWeight: 500 }}>
        {platform.tagline}
      </p>
      <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 28, lineHeight: 1.7, maxWidth: 640 }}>
        {platform.intro}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, fontSize: 12, color: "var(--text3)" }}>
        <span style={{ padding: "4px 12px", borderRadius: 100, border: "1px solid var(--border)", background: "var(--bg)", fontFamily: "var(--font-dm-mono), monospace" }}>
          📏 {platform.bioLimit}-char bio limit
        </span>
        <span style={{ padding: "4px 12px", borderRadius: 100, border: "1px solid var(--border)", background: "var(--bg)", fontFamily: "var(--font-dm-mono), monospace" }}>
          {totalSymbols} symbols
        </span>
        <span style={{ padding: "4px 12px", borderRadius: 100, border: "1px solid var(--border)", background: "var(--bg)", fontFamily: "var(--font-dm-mono), monospace" }}>
          {platform.categories.length} categories
        </span>
      </div>

      {platform.categories.map(cat => (
        <section key={cat.id} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{cat.name}</h2>
          <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{cat.description}</p>
          <div className="symbols-grid">
            {cat.symbols.map(({ s, n, hint }) => (
              <div
                key={s + n}
                className={`symbol-card ${copied === s ? "copied" : ""}`}
                onClick={() => copy(s, n)}
                title={hint ? `${n} — ${hint}` : `Copy ${n}`}
              >
                <span className="symbol-char">{s}</span>
                <span className="symbol-name">{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* FAQs */}
      <section style={{ marginTop: 32, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{platform.name} symbol FAQ</h2>
        <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 24 }}>Platform-specific tips, limits and rendering caveats.</p>
        {platform.faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
