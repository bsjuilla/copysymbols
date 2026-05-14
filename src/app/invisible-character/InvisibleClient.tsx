"use client";
import { useState } from "react";

interface InvisibleChar {
  slug: string;
  name: string;
  codepoint: string;
  char: string;
  width: "zero" | "regular";
  best: string;
  // Compatibility per platform: ✓ (works), ~ (partial), ✗ (stripped)
  compat: Record<string, "ok" | "partial" | "fail">;
}

const PLATFORMS = ["WhatsApp", "Instagram bio", "Instagram DM", "TikTok", "Discord", "X (Twitter)", "Telegram", "Facebook", "SMS"];

const CHARS: InvisibleChar[] = [
  {
    slug: "hangul-filler",
    name: "Hangul Filler",
    codepoint: "U+3164",
    char: "ㅤ",
    width: "regular",
    best: "Best for blank WhatsApp messages and Instagram bio line breaks. Survives most spam filters because it's technically a Korean text character.",
    compat: { "WhatsApp": "ok", "Instagram bio": "ok", "Instagram DM": "fail", "TikTok": "ok", "Discord": "ok", "X (Twitter)": "ok", "Telegram": "ok", "Facebook": "partial", "SMS": "ok" },
  },
  {
    slug: "zero-width-space",
    name: "Zero-Width Space",
    codepoint: "U+200B",
    char: "​",
    width: "zero",
    best: "Best for inserting invisible breaks inside words without visual gaps. Often stripped by chat apps as anti-spam.",
    compat: { "WhatsApp": "partial", "Instagram bio": "partial", "Instagram DM": "fail", "TikTok": "fail", "Discord": "fail", "X (Twitter)": "fail", "Telegram": "ok", "Facebook": "fail", "SMS": "ok" },
  },
  {
    slug: "zero-width-non-joiner",
    name: "Zero-Width Non-Joiner",
    codepoint: "U+200C",
    char: "‌",
    width: "zero",
    best: "Prevents two adjacent characters from forming a ligature. Useful in scripts like Persian and Hindi; in Latin used to defeat keyword filters.",
    compat: { "WhatsApp": "partial", "Instagram bio": "partial", "Instagram DM": "fail", "TikTok": "fail", "Discord": "partial", "X (Twitter)": "fail", "Telegram": "ok", "Facebook": "fail", "SMS": "ok" },
  },
  {
    slug: "zero-width-joiner",
    name: "Zero-Width Joiner",
    codepoint: "U+200D",
    char: "‍",
    width: "zero",
    best: "Joins emoji into single composed glyphs (used in flag emoji, family emoji). Standalone it's invisible.",
    compat: { "WhatsApp": "ok", "Instagram bio": "partial", "Instagram DM": "fail", "TikTok": "partial", "Discord": "ok", "X (Twitter)": "partial", "Telegram": "ok", "Facebook": "partial", "SMS": "ok" },
  },
  {
    slug: "braille-blank",
    name: "Braille Pattern Blank",
    codepoint: "U+2800",
    char: "⠀",
    width: "regular",
    best: "Visually empty Braille cell with regular character width. Reliable across most platforms; sometimes flagged as Braille rather than blank.",
    compat: { "WhatsApp": "ok", "Instagram bio": "ok", "Instagram DM": "ok", "TikTok": "ok", "Discord": "ok", "X (Twitter)": "ok", "Telegram": "ok", "Facebook": "ok", "SMS": "ok" },
  },
  {
    slug: "no-break-space",
    name: "No-Break Space",
    codepoint: "U+00A0",
    char: " ",
    width: "regular",
    best: "Standard Latin no-break space (NBSP). Renders identically to a regular space but doesn't allow line wrapping. Most apps treat it as plain whitespace and strip it from message starts.",
    compat: { "WhatsApp": "partial", "Instagram bio": "fail", "Instagram DM": "fail", "TikTok": "fail", "Discord": "partial", "X (Twitter)": "partial", "Telegram": "partial", "Facebook": "fail", "SMS": "ok" },
  },
  {
    slug: "mongolian-vowel-separator",
    name: "Mongolian Vowel Separator",
    codepoint: "U+180E",
    char: "᠎",
    width: "zero",
    best: "Originally a Mongolian script control character, now invisible in most fonts. Useful as a fallback when other invisibles are filtered.",
    compat: { "WhatsApp": "partial", "Instagram bio": "partial", "Instagram DM": "fail", "TikTok": "partial", "Discord": "partial", "X (Twitter)": "fail", "Telegram": "ok", "Facebook": "partial", "SMS": "partial" },
  },
];

const COMPAT_LABEL: Record<"ok" | "partial" | "fail", string> = { ok: "✓", partial: "~", fail: "✗" };
const COMPAT_COLOR: Record<"ok" | "partial" | "fail", string> = { ok: "var(--accent)", partial: "#f59e0b", fail: "#ef4444" };

export default function InvisibleClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copy = async (c: InvisibleChar) => {
    try { await navigator.clipboard.writeText(c.char); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = c.char;
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedSlug(c.slug);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "•";
      toastMsg.textContent = `Copied ${c.name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopiedSlug(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Blank space generator</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Invisible Character
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 28, lineHeight: 1.6 }}>
        Real Unicode characters that render as nothing — for blank WhatsApp messages, blank Instagram bio lines, blank usernames. Tap any character below to copy. Compatibility matrix shows which apps preserve which characters.
      </p>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 28, fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
        <strong style={{ color: "var(--text)" }}>Recommended:</strong> Hangul Filler (U+3164) for chat apps that strip whitespace, Braille Pattern Blank (U+2800) for maximum cross-platform compatibility.
      </div>

      {/* ── CHARACTER LIST ──────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {CHARS.map(c => {
          const isCopied = copiedSlug === c.slug;
          return (
            <div
              key={c.slug}
              onClick={() => copy(c)}
              style={{ background: "var(--surface)", border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "all 0.18s" }}
              onMouseEnter={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
              onMouseLeave={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12, flexWrap: "wrap" }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{c.name}</span>
                  <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 10, fontFamily: "monospace" }}>{c.codepoint}</span>
                  <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 10, padding: "2px 8px", background: "var(--bg)", borderRadius: 4 }}>{c.width === "zero" ? "0-width" : "regular width"}</span>
                </div>
                <span style={{ fontSize: 12, color: isCopied ? "var(--accent)" : "var(--text3)" }}>
                  {isCopied ? "✓ copied" : "click to copy"}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 12 }}>{c.best}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PLATFORMS.map(p => {
                  const status = c.compat[p];
                  return (
                    <div key={p} style={{ fontSize: 11, padding: "4px 8px", border: `1px solid ${COMPAT_COLOR[status]}`, borderRadius: 4, color: "var(--text2)", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: COMPAT_COLOR[status], fontWeight: 700 }}>{COMPAT_LABEL[status]}</span>
                      <span>{p}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── HOW TO USE ──────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>How to use</h2>
        <ol style={{ paddingLeft: 20, fontSize: 15, color: "var(--text2)", lineHeight: 1.9 }}>
          <li>Tap one of the characters above to copy it (Hangul Filler is recommended for most uses).</li>
          <li>Switch to the destination app (WhatsApp, Instagram, Discord, etc.).</li>
          <li>Long-press the input field and tap Paste.</li>
          <li>Send / save. The recipient sees a blank message or your bio shows blank lines.</li>
        </ol>
      </section>

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

      {/* ── RELATED ─────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Related text tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { href: "/zalgo-text", label: "z̴ Zalgo Text", desc: "Cursed glitch" },
            { href: "/upside-down-text", label: "uʍop Upside Down", desc: "Flipped text" },
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "31 styles" },
            { href: "/character-counter", label: "# Character Counter", desc: "Live counts" },
            { href: "/small-text", label: "ˢ Small Text", desc: "Tiny letters" },
            { href: "/text-repeater", label: "🔁 Text Repeater", desc: "Repeat N times" },
          ].map(t => (
            <a key={t.href} href={t.href} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{t.desc}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
