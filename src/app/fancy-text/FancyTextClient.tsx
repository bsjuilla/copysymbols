"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { STYLES, type FancyTextStyle } from "@/lib/fancy-text-styles";

const GROUP_LABELS: Record<FancyTextStyle["group"], string> = {
  math: "Bold, Italic & Script",
  enclosed: "Circled & Squared",
  decorated: "Width & Caps",
  combining: "Lines & Marks",
  novelty: "Novelty",
};
const GROUP_ORDER: FancyTextStyle["group"][] = ["math", "enclosed", "decorated", "combining", "novelty"];

type Props = {
  initialFocusSlug?: string;
  showHubLink?: boolean;
};

export default function FancyTextClient({ initialFocusSlug, showHubLink }: Props) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const out: Record<string, FancyTextStyle[]> = {};
    for (const g of GROUP_ORDER) out[g] = [];
    // If a style is "focused" (sub-page), pull it to top.
    const focusStyle = initialFocusSlug ? STYLES.find(s => s.slug === initialFocusSlug) : undefined;
    const rest = focusStyle ? STYLES.filter(s => s.slug !== initialFocusSlug) : STYLES;
    if (focusStyle) out[focusStyle.group].unshift(focusStyle);
    for (const s of rest) out[s.group].push(s);
    return out;
  }, [initialFocusSlug]);

  const handleCopy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(label);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "✦";
      toastMsg.textContent = "Copied " + label;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">{STYLES.length} Unicode font styles</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Fancy Text Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 28, lineHeight: 1.6 }}>
        Type once, get {STYLES.length} stylish Unicode versions. Bold, italic, script, old-english, bubble, squared, strikethrough, faux Cyrillic and more. Works in Instagram bios, TikTok captions, Discord names, WhatsApp — anywhere you can paste text.
      </p>

      {/* Input */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your text here..."
          rows={3}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", transition: "border-color 0.2s", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
        {input && (
          <button onClick={() => setInput("")} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "var(--text3)", fontSize: 20, cursor: "pointer" }}>×</button>
        )}
      </div>

      {/* Groups + style cards */}
      {GROUP_ORDER.map(group => {
        const items = grouped[group];
        if (!items?.length) return null;
        return (
          <section key={group} style={{ marginBottom: 32 }}>
            <h2 className="section-label" style={{ marginBottom: 12 }}>{GROUP_LABELS[group]}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 10 }}>
              {items.map(style => {
                const converted = input ? style.transform(input) : style.example;
                const isCopied = copied === style.label;
                return (
                  <div
                    key={style.slug}
                    onClick={() => input && handleCopy(converted, style.label)}
                    style={{ background: "var(--surface)", border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 18px", cursor: input ? "pointer" : "default", transition: "all 0.18s", opacity: input ? 1 : 0.85 }}
                    onMouseEnter={e => { if (input) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
                    onMouseLeave={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)" }}>{style.label}</span>
                      <span style={{ fontSize: 11, color: isCopied ? "var(--accent)" : "var(--text3)" }}>
                        {isCopied ? "✓ copied" : input ? "click to copy" : ""}
                      </span>
                    </div>
                    <div style={{ fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.5, wordBreak: "break-word", marginBottom: 6, minHeight: 24 }}>
                      {converted}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.5 }}>{style.description}</div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {showHubLink && (
        <div style={{ textAlign: "center", marginTop: 24, marginBottom: 32 }}>
          <Link href="/fancy-text" style={{ color: "var(--accent)", fontSize: 14, textDecoration: "none" }}>← All {STYLES.length} fancy text styles</Link>
        </div>
      )}

      {/* Info */}
      <section style={{ marginTop: 56, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>How does fancy text work?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
            Fancy text uses special Unicode characters that look like styled versions of regular letters but are actually different characters entirely. That&apos;s why they work everywhere — Instagram, TikTok, X (Twitter), Discord, WhatsApp — because they&apos;re plain text, not formatting or images.
          </p>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
            Most of the styles above come from the Unicode Mathematical Alphanumeric Symbols block (U+1D400–U+1D7FF), originally added so mathematicians could write equations. The bubble, squared, and parenthesized styles come from the Enclosed Alphanumerics block. The combining-mark styles (strikethrough, underline) overlay invisible marks on each letter.
          </p>
        </div>
      </section>

      {/* Cross-tool links */}
      <section style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>More text tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { href: "/character-counter", label: "# Character Counter" },
            { href: "/small-text", label: "ˢ Small Text" },
            { href: "/strikethrough-text", label: "S̶ Strikethrough" },
            { href: "/aesthetic-text", label: "ａ Aesthetic Text" },
            { href: "/mirror-text", label: "↕ Mirror Text" },
            { href: "/superscript-generator", label: "ˣ² Super & Subscript" },
            { href: "/text-repeater", label: "🔁 Text Repeater" },
            { href: "/symbol-builder", label: "✦ Symbol Builder" },
          ].map(t => (
            <a key={t.href} href={t.href} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13, fontWeight: 500 }}>
              {t.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
