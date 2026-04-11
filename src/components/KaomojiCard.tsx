"use client";
import { useState } from "react";
import type { Kaomoji } from "@/data/kaomoji";

export default function KaomojiCard({ kaomoji: k }: { kaomoji: Kaomoji }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(k.face); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = k.face; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "( ˘ ³˘)";
      toastMsg.textContent = `Copied ${k.name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    } else {
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className={`kaomoji-card ${copied ? "copied" : ""}`} onClick={handleCopy} title={`Copy ${k.name}`}>
      <div className="kaomoji-face">{k.face}</div>
      <div style={{ fontSize: 12, color: "var(--text3)" }}>{k.name}</div>
      <div style={{ fontSize: 11, color: copied ? "var(--accent)" : "var(--text3)", transition: "color 0.15s" }}>
        {copied ? "✓ copied!" : "click to copy"}
      </div>
    </div>
  );
}
