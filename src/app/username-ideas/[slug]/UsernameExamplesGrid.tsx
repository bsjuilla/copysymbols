"use client";
import { useState } from "react";
import type { UsernameExample } from "@/data/username-ideas";

// Copy-on-click grid for the server-computed example usernames. The examples
// are rendered into the SSR HTML (good for indexing) and become interactive on
// hydration. Uses the shared #global-toast like the other tools.
export default function UsernameExamplesGrid({ examples }: { examples: UsernameExample[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedIdx(idx);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "✦";
      toastMsg.textContent = "Copied username";
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setCopiedIdx(null);
      }, 1800);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
      {examples.map((ex, i) => {
        const isCopied = copiedIdx === i;
        return (
          <button
            key={`${i}-${ex.text}`}
            type="button"
            onClick={() => copy(ex.text, i)}
            style={{
              textAlign: "left",
              background: "var(--surface)",
              border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`,
              borderRadius: 12,
              padding: "14px 16px",
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
            onMouseLeave={(e) => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <div style={{ fontSize: "1.2rem", color: "var(--text)", lineHeight: 1.5, wordBreak: "break-word", marginBottom: 6, minHeight: 28 }}>
              {ex.text}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--text3)" }}>
              <span>{ex.style}{ex.ornament !== "Plain" ? ` · ${ex.ornament}` : ""}</span>
              <span style={{ color: isCopied ? "var(--accent)" : "var(--text3)" }}>{isCopied ? "✓ copied" : "click to copy"}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
