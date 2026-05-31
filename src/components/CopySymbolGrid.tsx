"use client";

import { useState } from "react";

interface SymbolItem {
  symbol: string;
  name: string;
  unicode?: string;
  html?: string;
  use?: string;
}

interface CopySymbolGridProps {
  items: SymbolItem[];
  columns?: string;
}

export default function CopySymbolGrid({ items, columns = "repeat(auto-fill, minmax(180px, 1fr))" }: CopySymbolGridProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function handleCopy(symbol: string, i: number) {
    // Robust copy: try the async Clipboard API, fall back to a hidden textarea +
    // execCommand so it still works if the API is blocked/rejects.
    let ok = false;
    try {
      await navigator.clipboard.writeText(symbol);
      ok = true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = symbol;
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      try {
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      } finally {
        ta.remove();
      }
    }
    if (!ok) return;

    // Flash the global toast too, if a page rendered <CopyToast /> (no-op otherwise).
    const toast = document.getElementById("global-toast");
    const tSym = document.getElementById("toast-symbol");
    const tMsg = document.getElementById("toast-message");
    if (toast && tSym && tMsg) {
      tSym.textContent = symbol;
      tMsg.textContent = "Copied!";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1400);
    }

    // Self-contained inline feedback (works on every page, even without CopyToast).
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(c => (c === i ? null : c)), 1200);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: columns, gap: 12, marginBottom: 56 }}>
      {items.map((s, i) => {
        const isCopied = copiedIdx === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleCopy(s.symbol, i)}
            aria-label={`Copy ${s.symbol}`}
            title="Click to copy"
            style={{
              background: isCopied ? "rgba(200,169,110,0.12)" : "var(--surface)",
              border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`,
              borderRadius: 14,
              padding: "20px 16px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => {
              if (isCopied) return;
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = isCopied ? "var(--accent)" : "var(--border)";
              (e.currentTarget as HTMLElement).style.transform = "";
            }}
          >
            <div style={{ fontSize: "2.2rem", marginBottom: 8, lineHeight: 1 }}>{s.symbol}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: isCopied ? "var(--accent)" : "var(--text)", marginBottom: 4 }}>
              {isCopied ? "✓ Copied!" : s.name}
            </div>
            {s.unicode && <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.unicode}</div>}
            {s.use && <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.use}</div>}
          </button>
        );
      })}
    </div>
  );
}
