"use client";
import { useState, useMemo } from "react";

// Grapheme-cluster count = what the user sees as one character (so ❤️ counts
// as 1, not 2). Falls back to UTF-16 length if Intl.Segmenter is unavailable
// (very old browsers).
function graphemeCount(s: string): number {
  if (typeof Intl === "undefined" || typeof (Intl as unknown as { Segmenter?: unknown }).Segmenter === "undefined") {
    return s.length;
  }
  const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return [...seg.segment(s)].length;
}

const PLATFORMS: Array<{ name: string; limit: number; note?: string }> = [
  { name: "X (Twitter) post", limit: 280 },
  { name: "Instagram bio", limit: 150 },
  { name: "Instagram caption", limit: 2200 },
  { name: "TikTok bio", limit: 80 },
  { name: "TikTok caption", limit: 2200 },
  { name: "LinkedIn post", limit: 3000 },
  { name: "YouTube title", limit: 100 },
  { name: "YouTube description", limit: 5000 },
  { name: "Discord message", limit: 2000 },
  { name: "Facebook post", limit: 63206 },
  { name: "SMS (single)", limit: 160, note: "70 if any emoji/non-Latin" },
];

export default function CharacterCounterClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = graphemeCount(input);
    const charsNoSpaces = graphemeCount(input.replace(/\s/g, ""));
    const trimmed = input.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const sentences = trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = trimmed === "" ? 0 : input.split(/\n\s*\n/).filter(p => p.trim()).length;
    const lines = input === "" ? 0 : input.split(/\n/).length;
    const readingMin = words / 200;
    const speakingMin = words / 130;
    return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingMin, speakingMin };
  }, [input]);

  const copy = async () => {
    if (!input) return;
    try { await navigator.clipboard.writeText(input); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = input;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "✓";
      toastMsg.textContent = "Copied text";
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    }
  };

  const formatTime = (min: number) => {
    if (min === 0) return "0 sec";
    if (min < 1) return `${Math.round(min * 60)} sec`;
    const m = Math.floor(min);
    const s = Math.round((min - m) * 60);
    return s === 0 ? `${m} min` : `${m} min ${s} sec`;
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Free tool</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Character Counter
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Live counts as you type — characters, words, reading time, and platform limits for X, Instagram, TikTok, YouTube, LinkedIn, Discord, and SMS.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={6}
        style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 16, fontFamily: "inherit", resize: "vertical", outline: "none", marginBottom: 16, lineHeight: 1.6 }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={copy}
          disabled={!input}
          style={{ background: input ? "var(--accent)" : "var(--surface)", color: input ? "white" : "var(--text3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: input ? "pointer" : "not-allowed", transition: "all 0.15s" }}
        >
          {copied ? "✓ Copied" : "Copy text"}
        </button>
        <button
          onClick={() => setInput("")}
          disabled={!input}
          style={{ background: "transparent", color: "var(--text3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: input ? "pointer" : "not-allowed" }}
        >
          Clear
        </button>
      </div>

      {/* ── COUNTS GRID ─────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 36 }}>
        {[
          { label: "Characters", value: stats.chars.toLocaleString() },
          { label: "No spaces", value: stats.charsNoSpaces.toLocaleString() },
          { label: "Words", value: stats.words.toLocaleString() },
          { label: "Sentences", value: stats.sentences.toLocaleString() },
          { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
          { label: "Lines", value: stats.lines.toLocaleString() },
          { label: "Reading time", value: formatTime(stats.readingMin) },
          { label: "Speaking time", value: formatTime(stats.speakingMin) },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── PLATFORM LIMITS ─────────────────────────────────────────────────── */}
      <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Platform limits</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 56 }}>
        {PLATFORMS.map(p => {
          const pct = Math.min(100, (stats.chars / p.limit) * 100);
          const remaining = p.limit - stats.chars;
          const status = remaining < 0 ? "over" : remaining < p.limit * 0.1 ? "near" : "ok";
          const barColor = status === "over" ? "#ef4444" : status === "near" ? "#f59e0b" : "var(--accent)";
          return (
            <div key={p.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, gap: 8, flexWrap: "wrap" }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{p.name}</span>
                  {p.note && <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 8 }}>{p.note}</span>}
                </div>
                <span style={{ fontSize: 13, color: status === "over" ? "#ef4444" : "var(--text2)", fontVariantNumeric: "tabular-nums" }}>
                  {stats.chars.toLocaleString()} / {p.limit.toLocaleString()}
                  {status === "over" && <span style={{ marginLeft: 6 }}>· {Math.abs(remaining).toLocaleString()} over</span>}
                  {status === "near" && remaining >= 0 && <span style={{ marginLeft: 6 }}>· {remaining.toLocaleString()} left</span>}
                </span>
              </div>
              <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: barColor, transition: "width 0.15s, background 0.15s" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {faqs.map(f => (
            <div key={f.q}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATED TOOLS ───────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>More free tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { href: "/small-text", label: "Small Text Generator" },
            { href: "/fancy-text", label: "Fancy Text Generator" },
            { href: "/strikethrough-text", label: "Strikethrough Text" },
            { href: "/aesthetic-text", label: "Aesthetic Text" },
            { href: "/mirror-text", label: "Mirror Text" },
            { href: "/superscript-generator", label: "Superscript Generator" },
            { href: "/text-repeater", label: "Text Repeater" },
            { href: "/symbol-builder", label: "Symbol Builder" },
          ].map(t => (
            <a key={t.href} href={t.href} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13, fontWeight: 500, transition: "border-color 0.15s" }}>
              {t.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
