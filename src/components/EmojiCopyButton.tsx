"use client";
import { useState } from "react";

/**
 * Big-glyph copy button used on /emoji/[slug] and /kaomoji/[slug] detail pages.
 * Reuses the global toast (#global-toast) populated by CopyToast.
 */
export default function EmojiCopyButton({
  glyph,
  name,
  size = "clamp(5rem, 12vw, 9rem)",
}: {
  glyph: string;
  name: string;
  size?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    try { await navigator.clipboard.writeText(glyph); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = glyph; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = glyph;
      toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    } else {
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={`Copy ${name}`}
      className="emoji-hero-button"
      style={{
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: "100%",
      }}
    >
      <span
        style={{
          fontSize: size,
          lineHeight: 1,
          display: "block",
          filter: "drop-shadow(0 0 40px rgba(200,169,110,0.18))",
          transition: "transform 0.2s ease",
        }}
      >
        {glyph}
      </span>
      <span
        style={{
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "DM Mono, monospace",
          color: copied ? "var(--accent)" : "var(--text3)",
          transition: "color 0.15s",
        }}
      >
        {copied ? "✓ copied" : "click to copy"}
      </span>
    </button>
  );
}
