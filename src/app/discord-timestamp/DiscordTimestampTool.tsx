"use client";

import { useEffect, useState } from "react";

// Discord renders <t:UNIX:STYLE> as a localised timestamp in each viewer's own
// timezone. We build that code from a date the user picks, and show a live
// preview of how Discord will display each style.
const STYLES: { code: string; label: string }[] = [
  { code: "t", label: "Short time" },
  { code: "T", label: "Long time" },
  { code: "d", label: "Short date" },
  { code: "D", label: "Long date" },
  { code: "f", label: "Short date/time" },
  { code: "F", label: "Long date/time" },
  { code: "R", label: "Relative" },
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// Format `date` the way Discord renders each style, using the viewer's locale.
function preview(date: Date, style: string): string {
  try {
    switch (style) {
      case "t":
        return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      case "T":
        return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      case "d":
        return date.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
      case "D":
        return date.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
      case "f":
        return date.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) + " " +
          date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      case "F":
        return date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " " +
          date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      case "R":
        return relative(date);
      default:
        return "";
    }
  } catch {
    return "";
  }
}

function relative(date: Date): string {
  const diffMs = date.getTime() - Date.now();
  const abs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000000],
    ["month", 2592000000],
    ["day", 86400000],
    ["hour", 3600000],
    ["minute", 60000],
    ["second", 1000],
  ];
  for (const [unit, ms] of units) {
    if (abs >= ms || unit === "second") {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return "now";
}

export default function DiscordTimestampTool() {
  const [dt, setDt] = useState("");
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Browser-only: the default timestamp is computed from the visitor's local
    // clock (new Date()), which differs between the server prerender and the
    // client. Setting it after mount — rather than during render — is what keeps
    // the server HTML and first client render identical, avoiding a hydration
    // mismatch. The set-state-in-effect rule is therefore intentionally waived.
    const now = new Date();
    /* eslint-disable react-hooks/set-state-in-effect */
    setDt(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`);
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const date = dt ? new Date(dt) : null;
  const unix = date && !isNaN(date.getTime()) ? Math.floor(date.getTime() / 1000) : null;

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
  }

  return (
    <div style={{ marginBottom: 8 }}>
      <label htmlFor="dt-input" style={{ display: "block", fontSize: 13, color: "var(--text3)", marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>
        Pick a date and time
      </label>
      <input
        id="dt-input"
        type="datetime-local"
        value={dt}
        onChange={(e) => setDt(e.target.value)}
        style={{ width: "100%", maxWidth: 320, padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontSize: 15, marginBottom: 24 }}
      />

      {mounted && unix !== null ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {STYLES.map(({ code, label }) => {
            const token = `<t:${unix}:${code}>`;
            const isCopied = copied === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => copy(token, code)}
                aria-label={`Copy ${label} timestamp code`}
                style={{
                  display: "flex", alignItems: "center", gap: 12, textAlign: "left", width: "100%",
                  background: isCopied ? "rgba(200,169,110,0.10)" : "var(--surface)",
                  border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: 12, padding: "12px 16px", cursor: "pointer", color: "inherit", font: "inherit",
                  transition: "border-color 0.15s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 15, color: "var(--text)", marginBottom: 4 }}>{preview(date!, code)}</div>
                  <code style={{ fontSize: 12.5, color: "var(--text2)", fontFamily: "DM Mono, monospace", wordBreak: "break-all" }}>{token}</code>
                </div>
                <span style={{ flexShrink: 0, fontSize: 11, fontFamily: "DM Mono, monospace", letterSpacing: "0.04em", color: isCopied ? "var(--accent)" : "var(--text3)" }}>
                  {isCopied ? "✓ COPIED" : "COPY"}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{ fontSize: 14, color: "var(--text3)" }}>Loading…</div>
      )}
    </div>
  );
}
