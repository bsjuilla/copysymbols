"use client";
import { useState } from "react";

export default function BioLineItem({ s, n }: { s: string; n: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(s); } catch {
      const ta = document.createElement("textarea");
      ta.value = s; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const sym = document.getElementById("toast-symbol");
    const msg = document.getElementById("toast-message");
    if (toast && sym && msg) {
      sym.textContent = "─"; msg.textContent = "Copied " + n;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    }
  };
  return (
    <div
      onClick={copy}
      style={{
        background: "var(--surface)",
        border: "1px solid " + (copied ? "var(--accent)" : "var(--border)"),
        borderRadius: 10, padding: "12px 18px", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 16, transition: "all 0.15s",
      }}
    >
      <code style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--text)", flex: 1 }}>{s}</code>
      <span style={{ fontSize: 12, color: copied ? "var(--accent)" : "var(--text3)", flexShrink: 0 }}>
        {copied ? "✓ copied!" : n + " · click to copy"}
      </span>
    </div>
  );
}
