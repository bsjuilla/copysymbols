"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { emoji, emojiCategories, type EmojiRecord } from "@/data/emoji";

export default function EmojiPageClient() {
  const [active, setActive] = useState(emojiCategories[0]?.id ?? "smileys");
  const [copied, setCopied] = useState<string | null>(null);

  // Group emoji by category once. Preserves the original per-category render
  // order from EmojiPageClient.tsx (the data file is already in that order).
  const byCategory = useMemo(() => {
    const map = new Map<string, EmojiRecord[]>();
    for (const e of emoji) {
      const arr = map.get(e.category) ?? [];
      arr.push(e);
      map.set(e.category, arr);
    }
    return map;
  }, []);

  const handleCopy = async (e: string, name: string) => {
    try { await navigator.clipboard.writeText(e); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = e; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(e);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = e;
      toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const activeList = byCategory.get(active) ?? [];
  const activeMeta = emojiCategories.find(c => c.id === active);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Unicode emoji</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Copy & Paste Emoji 😀
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Click any emoji to copy it instantly. Works in any app, website, or document. Tap a name to open the dedicated page for that emoji.
      </p>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {emojiCategories.map(c => (
          <button
            key={c.id}
            className={`cat-pill ${active === c.id ? "active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Emoji grid — two interactive zones per card:
          - the glyph is a click-to-copy button (preserves the original UX),
          - the name is a Link to /emoji/<slug> so listings are crawlable
            and users can deep-link to a specific emoji's detail page. */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))", gap: 8 }}>
        {activeList.map(({ id, emoji: e, name }) => (
          <div
            key={id}
            className={`symbol-card ${copied === e ? "copied" : ""}`}
            title={name}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              onClick={() => handleCopy(e, name)}
              aria-label={`Copy ${name}`}
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
                gap: 4,
                width: "100%",
              }}
            >
              <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{e}</span>
            </button>
            <Link
              href={`/emoji/${id}`}
              className="symbol-name"
              style={{ textDecoration: "none", color: "inherit" }}
              prefetch={false}
            >
              {name}
            </Link>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 48, fontSize: 14, color: "var(--text3)", lineHeight: 1.7, textAlign: "center" }}>
        All emoji shown here are standard Unicode emoji supported by major platforms including iOS, Android, Windows, and macOS.
        {activeMeta && ` Currently viewing the ${activeMeta.name} category.`}
      </p>
    </div>
  );
}
