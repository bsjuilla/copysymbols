"use client";
import { useState } from "react";
import Link from "next/link";
import type { Kaomoji } from "@/data/kaomoji";

/**
 * Two interactive zones per card:
 *  - the face is a click-to-copy button (preserves the original UX), and
 *  - the name is a Link to /kaomoji/<slug> so each entry is deep-linkable
 *    and crawlable. `slug` is optional so existing call sites keep working
 *    without it (the link just renders as plain text in that case).
 */
export default function KaomojiCard({
  kaomoji: k,
  slug,
}: {
  kaomoji: Kaomoji;
  slug?: string;
}) {
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
    <div className={`kaomoji-card ${copied ? "copied" : ""}`} title={`Copy ${k.name}`}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${k.name}`}
        style={{
          background: "transparent",
          border: 0,
          padding: 0,
          margin: 0,
          width: "100%",
          cursor: "pointer",
          font: "inherit",
          color: "inherit",
          display: "block",
        }}
      >
        <div className="kaomoji-face">{k.face}</div>
      </button>
      {slug ? (
        <Link
          href={`/kaomoji/${slug}`}
          style={{ fontSize: 12, color: "var(--text3)", textDecoration: "none", display: "block" }}
          prefetch={false}
        >
          {k.name}
        </Link>
      ) : (
        <div style={{ fontSize: 12, color: "var(--text3)" }}>{k.name}</div>
      )}
      <div style={{ fontSize: 11, color: copied ? "var(--accent)" : "var(--text3)", transition: "color 0.15s" }}>
        {copied ? "✓ copied!" : "click to copy"}
      </div>
    </div>
  );
}
