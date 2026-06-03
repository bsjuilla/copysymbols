"use client";

import { useState } from "react";
import { uwuify } from "@/lib/uwu";
import { toRunes } from "@/lib/runes";

/**
 * Live text → transformed text converter, copy-to-clipboard with toast.
 * mode "uwu" → uwuify; mode "runes" → Elder Futhark transliteration.
 * Transforms are pure & deterministic (no Math.random) → no hydration mismatch.
 */
export default function LiveTransform({
  mode,
  defaultText,
  placeholder,
}: {
  mode: "uwu" | "runes";
  defaultText: string;
  placeholder: string;
}) {
  const [text, setText] = useState(defaultText);
  const out = mode === "uwu" ? uwuify(text) : toRunes(text);

  function copy() {
    if (!out) return;
    try {
      navigator.clipboard.writeText(out);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = out;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    const toast = document.getElementById("global-toast");
    const sym = document.getElementById("toast-symbol");
    const msg = document.getElementById("toast-message");
    if (toast && sym && msg) {
      sym.textContent = mode === "runes" ? "ᚱ" : "uwu";
      msg.textContent = "Copied!";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1500);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
      <div>
        <label htmlFor="lt-in" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 8, display: "block" }}>Your text</label>
        <textarea
          id="lt-in"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          rows={5}
          style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", fontSize: 16, color: "var(--text)", fontFamily: "inherit", resize: "vertical" }}
        />
      </div>
      <div>
        <label htmlFor="lt-out" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 8, display: "block" }}>Result</label>
        <div
          id="lt-out"
          style={{ width: "100%", minHeight: 124, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", fontSize: mode === "runes" ? "1.6rem" : 16, lineHeight: 1.6, color: "var(--text)", wordBreak: "break-word", whiteSpace: "pre-wrap" }}
        >
          {out || <span style={{ color: "var(--text3)" }}>…</span>}
        </div>
        <button
          type="button"
          onClick={copy}
          style={{ marginTop: 12, background: "var(--accent)", color: "#0a0a0f", border: 0, borderRadius: 100, padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
        >
          Copy result
        </button>
      </div>
    </div>
  );
}
