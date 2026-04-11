"use client";
import { useState } from "react";
import type { Symbol } from "@/data/symbols";

export default function SymbolCopyButtons({ symbol: s }: { symbol: Symbol }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(label);
    setTimeout(() => setCopied(null), 1600);

    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = s.symbol;
      toastMsg.textContent = `Copied ${label}`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  };

  const btns = [
    { label: "Symbol", value: s.symbol, hint: s.symbol },
    { label: "HTML", value: s.html, hint: s.html },
    { label: "Unicode", value: s.unicode, hint: s.unicode },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
      {btns.map(b => (
        <button
          key={b.label}
          className="detail-copy-btn"
          onClick={() => copy(b.value, b.label)}
          style={{ justifyContent: "space-between", width: "100%", ...(copied === b.label ? { borderColor: "var(--accent)", color: "var(--accent)" } : {}) }}
        >
          <span style={{ color: "var(--text3)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 56 }}>{b.label}</span>
          <span style={{ flex: 1, textAlign: "center" }}>{b.hint}</span>
          <span style={{ fontSize: 12 }}>{copied === b.label ? "✓" : "copy"}</span>
        </button>
      ))}
    </div>
  );
}
