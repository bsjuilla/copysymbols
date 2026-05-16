"use client";
import { useState } from "react";
import { decorators } from "@/data/text-decorators";
import { useCopyToast } from "@/lib/use-copy-toast";

export default function TextDecoratorClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { copy } = useCopyToast();

  const handleCopy = (id: string, name: string, text: string) => {
    if (!text) return;
    setCopiedId(id);
    copy(text, { symbol: "✦", label: `Copied ${name}` });
    setTimeout(() => setCopiedId(c => (c === id ? null : c)), 1800);
  };

  const previewSource = input || "your text";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">{decorators.length} aesthetic frames</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        ✦ Text Decorator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 28, lineHeight: 1.6 }}>
        Type one word or phrase and get {decorators.length} decoratively-wrapped variants — sparkle frames, lace brackets, stars, hearts, kaomoji and more. Click any card to copy. Perfect for Instagram bios, TikTok captions and Discord nicknames.
      </p>

      {/* Input */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <label htmlFor="text-decorator-input" style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Your text</label>
        <input
          id="text-decorator-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a word or short phrase..."
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", outline: "none", transition: "border-color 0.2s" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
        {input && (
          <button
            onClick={() => setInput("")}
            aria-label="Clear input"
            style={{ position: "absolute", top: 34, right: 12, background: "none", border: "none", color: "var(--text3)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      {/* Grid of decorators */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10, marginBottom: 48 }}>
        {decorators.map(d => {
          const wrapped = d.wrap(previewSource);
          const copyable = d.wrap(input);
          const isCopied = copiedId === d.id;
          const canCopy = !!input;
          return (
            <div
              key={d.id}
              onClick={() => canCopy && handleCopy(d.id, d.name, copyable)}
              style={{
                background: "var(--surface)",
                border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 12,
                padding: "14px 16px",
                cursor: canCopy ? "pointer" : "default",
                transition: "all 0.18s",
                opacity: canCopy ? 1 : 0.85,
              }}
              onMouseEnter={e => { if (canCopy) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
              onMouseLeave={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)" }}>{d.name}</span>
                <span style={{ fontSize: 11, color: isCopied ? "var(--accent)" : "var(--text3)" }}>
                  {isCopied ? "✓ copied" : canCopy ? "click to copy" : "preview"}
                </span>
              </div>
              <div style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.5, wordBreak: "break-word", minHeight: 22 }}>
                {wrapped}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
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

      {/* Related tools */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Related text tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "30+ styles" },
            { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Custom frames" },
            { href: "/aesthetic-text", label: "ａ Aesthetic Text", desc: "Vaporwave" },
            { href: "/sparkle-symbols", label: "✧ Sparkle Symbols", desc: "All sparkles" },
            { href: "/borders", label: "═ Borders", desc: "Box & line frames" },
            { href: "/bio-builder", label: "★ Bio Builder", desc: "Full bio layouts" },
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
