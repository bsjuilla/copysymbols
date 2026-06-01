"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { codePointInfo } from "@/lib/unicode-blocks";
import { renderSafety, emojiVariation, PLATFORM_LABELS, type Platform, type Verdict } from "@/lib/render-safety";
import { useCopyToast } from "@/lib/use-copy-toast";
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

const vsBtnStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: "8px 6px",
  borderRadius: 8,
  cursor: "pointer",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text)",
};

const VERDICT: Record<Verdict, { color: string; mark: string; word: string }> = {
  safe: { color: "#3fb950", mark: "✓", word: "works" },
  risky: { color: "#d29922", mark: "!", word: "risky" },
  box: { color: "#f85149", mark: "▯", word: "boxes" },
};

const PLATFORM_ORDER: Platform[] = ["ios", "android", "windows", "discord"];

function PlatformBadges({ byPlatform }: { byPlatform: Record<Platform, Verdict> }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {PLATFORM_ORDER.map(p => {
        const vd = VERDICT[byPlatform[p]];
        return (
          <span
            key={p}
            title={`${PLATFORM_LABELS[p]}: ${vd.word}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11.5,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 100,
              color: vd.color,
              background: `${vd.color}1a`,
              border: `1px solid ${vd.color}40`,
            }}
          >
            <span aria-hidden style={{ fontWeight: 700 }}>{vd.mark}</span>
            {PLATFORM_LABELS[p]}
          </span>
        );
      })}
    </div>
  );
}

const DEFAULT_INPUT = "★ 😀 𝖋𝖗𝖆𝖐 🫨";

export default function RenderTestClient() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [shareCopied, setShareCopied] = useState(false);
  const { copy } = useCopyToast();
  const { chars, codePointCount } = useMemo(() => analyze(input), [input]);

  // Friend-test: if someone opened a shared ?text= link, load that text so they
  // can see whether it renders on THEIR device. Client-only (reads window) and
  // set after mount, so the server HTML and first client render match (no
  // hydration mismatch).
  useEffect(() => {
    try {
      const t = new URLSearchParams(window.location.search).get("text");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only: prefill from the shared ?text= link (unknown during SSG prerender).
      if (t) setInput(t);
    } catch {}
  }, []);

  const copyShareLink = useCallback(async () => {
    const url = `${window.location.origin}/render-test?text=${encodeURIComponent(input)}`;
    // useCopyToast handles the clipboard write (+ textarea fallback) AND pops the
    // shared toast, so the share button gives the same feedback as every other copy.
    await copy(url, { symbol: "🔗", label: "Copied test link!" });
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1600);
  }, [input, copy]);

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

      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", margin: "12px 0 20px" }}>
        <div style={{ fontSize: 13, color: "var(--text2)" }}>
          {chars.length.toLocaleString()} character{chars.length === 1 ? "" : "s"},{" "}
          {codePointCount.toLocaleString()} code point{codePointCount === 1 ? "" : "s"}
        </div>
        {chars.length > 0 && (
          <button
            type="button"
            onClick={copyShareLink}
            style={{
              fontSize: 12.5, fontWeight: 600, padding: "6px 12px", borderRadius: 100, cursor: "pointer",
              color: shareCopied ? "#3fb950" : "var(--text2)",
              background: "var(--surface)",
              border: `1px solid ${shareCopied ? "#3fb95066" : "var(--border)"}`,
            }}
            title="Copy a link that opens this exact text — send it to a friend to see if it renders on their device"
          >
            {shareCopied ? "✓ Link copied" : "🔗 Copy friend-test link"}
          </button>
        )}
      </div>

      {chars.length === 0 ? (
        <div style={{ ...cardStyle, color: "var(--text3)", fontSize: 14, alignItems: "center" }}>
          Type or paste a character above to inspect it.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {chars.map((c, i) => {
            const first = codePointInfo(c.grapheme);
            const safety = renderSafety(c.grapheme);
            const variation = emojiVariation(c.grapheme);
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

                {/* Per-platform render-safety verdict. */}
                <PlatformBadges byPlatform={safety.byPlatform} />
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
                  {safety.reason}
                </div>

                {/* Nearest-safe swap, when the input is a risky fancy-font char. */}
                {safety.safer && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(63,185,80,0.08)", border: "1px solid rgba(63,185,80,0.30)", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...labelStyle, color: "#3fb950" }}>Safer version</div>
                      <div style={{ fontSize: "1.5rem", lineHeight: 1.2 }}>{safety.safer}</div>
                    </div>
                    <EmojiCopyButton glyph={safety.safer} name="safer character" size="1.2rem" />
                  </div>
                )}

                {/* Text vs emoji presentation toggle (VS-15 / VS-16). */}
                {variation && (
                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ ...labelStyle, marginBottom: 6 }}>Copy as text or emoji</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => copy(variation.text, { symbol: variation.text, label: "Copied text style" })}
                        style={vsBtnStyle}
                        title="Forces the plain monochrome look (variation selector U+FE0E)"
                      >
                        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{variation.text}</span>
                        <span style={{ fontSize: 10.5, color: "var(--text3)" }}>Text</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => copy(variation.emoji, { symbol: variation.emoji, label: "Copied emoji style" })}
                        style={vsBtnStyle}
                        title="Forces the colourful emoji look (variation selector U+FE0F)"
                      >
                        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{variation.emoji}</span>
                        <span style={{ fontSize: 10.5, color: "var(--text3)" }}>Emoji</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Per-code-point breakdown. */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.codePoints.map((cp, j) => {
                    const info = codePointInfo(String.fromCodePoint(cp));
                    return (
                      <div
                        key={j}
                        style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }}
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
