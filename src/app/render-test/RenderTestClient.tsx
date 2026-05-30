"use client";
import { useState, useMemo } from "react";
import { codePointInfo } from "@/lib/unicode-blocks";
import EmojiCopyButton from "@/components/EmojiCopyButton";

// Split a string into user-perceived characters (graphemes). Prefer
// Intl.Segmenter (handles ZWJ emoji, flags, combining marks as one unit);
// fall back to Array.from (per code point) where Segmenter is unavailable.
function toGraphemes(input: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(input), s => s.segment);
  }
  return Array.from(input);
}

// Honest, plain-English device-support note keyed off the first code point.
function supportNote(cp: number): string {
  if (cp >= 0x1fa70)
    return "Very new character (recent Unicode) — likely shows as a box on devices that aren't fully up to date.";
  if (cp >= 0x1f000)
    return "Emoji/pictograph — shows on most modern devices; may box on older ones.";
  if (cp >= 0x2190)
    return "Symbol — renders on essentially all modern devices.";
  return "Basic character — renders everywhere.";
}

interface CharInfo {
  grapheme: string;
  codePoints: number[];
}

function analyze(input: string): { chars: CharInfo[]; codePointCount: number } {
  const chars: CharInfo[] = [];
  let codePointCount = 0;
  for (const grapheme of toGraphemes(input)) {
    // Ignore pure-whitespace graphemes (spaces, tabs, newlines).
    if (!grapheme.trim()) continue;
    const codePoints = Array.from(grapheme, c => c.codePointAt(0) ?? 0);
    codePointCount += codePoints.length;
    chars.push({ grapheme, codePoints });
  }
  return { chars, codePointCount };
}

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "18px 18px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: "var(--text3)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const codeStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  color: "var(--text)",
};

export default function RenderTestClient() {
  const [input, setInput] = useState("→ 😀 ❤ ʕ•ᴥ•ʔ 🎀 🫪");
  const { chars, codePointCount } = useMemo(() => analyze(input), [input]);

  return (
    <div style={{ marginBottom: 8 }}>
      <label htmlFor="render-input" style={{ ...labelStyle, display: "block", marginBottom: 6 }}>
        Paste any symbols or emoji
      </label>
      <textarea
        id="render-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste a symbol or emoji here…"
        rows={3}
        style={{
          width: "100%",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "16px 20px",
          color: "var(--text)",
          fontSize: 22,
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          lineHeight: 1.6,
        }}
        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
        onBlur={e => (e.target.style.borderColor = "var(--border)")}
      />

      <div style={{ fontSize: 13, color: "var(--text2)", margin: "12px 0 20px" }}>
        {chars.length.toLocaleString()} character{chars.length === 1 ? "" : "s"},{" "}
        {codePointCount.toLocaleString()} code point{codePointCount === 1 ? "" : "s"}
      </div>

      {chars.length === 0 ? (
        <div style={{ ...cardStyle, color: "var(--text3)", fontSize: 14, alignItems: "center" }}>
          Type or paste a character above to inspect it.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {chars.map((c, i) => {
            const first = codePointInfo(c.grapheme);
            const note = supportNote(c.codePoints[0]);
            return (
              <div key={`${c.grapheme}-${i}`} style={cardStyle}>
                <div
                  style={{
                    fontSize: "3rem",
                    lineHeight: 1.1,
                    textAlign: "center",
                    minHeight: "3.4rem",
                    wordBreak: "break-all",
                  }}
                >
                  {c.grapheme}
                </div>

                {/* Per-code-point breakdown. */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.codePoints.map((cp, j) => {
                    const info = codePointInfo(String.fromCodePoint(cp));
                    return (
                      <div
                        key={j}
                        style={{
                          borderTop: j === 0 ? "none" : "1px solid var(--border)",
                          paddingTop: j === 0 ? 0 : 8,
                        }}
                      >
                        <div style={{ ...codeStyle, fontSize: 14, fontWeight: 600 }}>
                          {info?.hex}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>
                          Decimal <span style={codeStyle}>{info?.decimal.toLocaleString()}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>
                          Block <span style={{ color: "var(--text)" }}>{info?.block}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* HTML entity + CSS escape for the first code point. */}
                {first && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>
                      <span style={labelStyle}>HTML</span>{" "}
                      <span style={codeStyle}>&amp;#{first.decimal};</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>
                      <span style={labelStyle}>CSS</span>{" "}
                      <span style={codeStyle}>\{first.hex.replace("U+", "")}</span>
                    </div>
                  </div>
                )}

                {/* Device-support note. */}
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text2)",
                    lineHeight: 1.5,
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  {note}
                </div>

                {/* Copy button — reuses EmojiCopyButton + the page's CopyToast. */}
                <div style={{ marginTop: "auto" }}>
                  <EmojiCopyButton glyph={c.grapheme} name="character" size="1.4rem" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
