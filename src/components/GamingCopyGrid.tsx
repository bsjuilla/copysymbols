"use client";

/**
 * Click-to-copy grid for the /gaming-symbols pages. Two layouts:
 *  - variant="symbol":   compact big-glyph chips (single decorative characters)
 *  - variant="template": wider cells for full stylized name templates
 * Both copy the exact string and flash the global toast (#global-toast, rendered
 * by <CopyToast/>). Copy target is always the real string — corruption-safe.
 */
export default function GamingCopyGrid({
  items,
  variant,
}: {
  items: string[];
  variant: "symbol" | "template";
}) {
  function copy(text: string) {
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    const toast = document.getElementById("global-toast");
    const sym = document.getElementById("toast-symbol");
    const msg = document.getElementById("toast-message");
    if (toast && sym && msg) {
      sym.textContent = Array.from(text).length <= 3 ? text : "✓";
      msg.textContent = `Copied  ${Array.from(text).length > 16 ? Array.from(text).slice(0, 16).join("") + "…" : text}`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1500);
    }
  }

  const isSymbol = variant === "symbol";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isSymbol
          ? "repeat(auto-fill, minmax(62px, 1fr))"
          : "repeat(auto-fill, minmax(200px, 1fr))",
        gap: isSymbol ? 8 : 10,
      }}
    >
      {items.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={() => copy(s)}
          aria-label={`Copy ${s}`}
          title="Click to copy"
          style={{
            cursor: "pointer",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            borderRadius: 12,
            padding: isSymbol ? "14px 6px" : "16px 14px",
            fontSize: isSymbol ? "1.55rem" : "1.1rem",
            lineHeight: 1.25,
            color: "var(--text)",
            fontFamily: "inherit",
            textAlign: "center",
            wordBreak: "break-word",
            transition: "border-color 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.transform = "";
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
