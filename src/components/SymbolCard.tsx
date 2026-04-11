"use client";
import { useState, useCallback } from "react";

interface Props {
  symbol: string;
  name: string;
  id: string;
  showLink?: boolean;
}

let toastTimeout: ReturnType<typeof setTimeout>;

export default function SymbolCard({ symbol, name, id, showLink = true }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(symbol);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = symbol;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    clearTimeout(toastTimeout);

    // Show global toast
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = symbol;
      toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
        setCopied(false);
      }, 1800);
    } else {
      toastTimeout = setTimeout(() => setCopied(false), 1800);
    }
  }, [symbol, name]);

  const card = (
    <div className={`symbol-card ${copied ? "copied" : ""}`} onClick={handleCopy} title={`Copy ${name}`}>
      <span className="symbol-char" aria-hidden="true">{symbol}</span>
      <span className="symbol-name">{name}</span>
    </div>
  );

  if (showLink) {
    return (
      <div style={{ position: "relative" }}>
        {card}
      </div>
    );
  }
  return card;
}
