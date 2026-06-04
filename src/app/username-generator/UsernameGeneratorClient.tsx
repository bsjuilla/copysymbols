"use client";
import { useState, useCallback, useEffect } from "react";
import { STYLES } from "@/lib/fancy-text-styles";
import { ORNAMENTS, VIBES, type Vibe } from "@/lib/username-ornaments";

type VibeFilter = Vibe | "all";
const COUNT_OPTIONS = [12, 24, 48];

interface Result {
  text: string;
  styleLabel: string;
  ornamentLabel: string;
}

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generate(name: string, vibe: VibeFilter, count: number): Result[] {
  if (!name.trim()) return [];
  const ornamentPool = vibe === "all"
    ? ORNAMENTS
    : ORNAMENTS.filter(o => o.vibe === vibe || o.vibe === "none");
  if (ornamentPool.length === 0) return [];

  const out: Result[] = [];
  const seen = new Set<string>();
  // Try up to count*4 times to get distinct outputs (collision tolerance)
  for (let attempt = 0; attempt < count * 4 && out.length < count; attempt++) {
    const style = pick(STYLES);
    const ornament = pick(ornamentPool);
    const styled = style.transform(name);
    const wrapped = ornament.wrap(styled);
    if (seen.has(wrapped)) continue;
    seen.add(wrapped);
    out.push({ text: wrapped, styleLabel: style.label, ornamentLabel: ornament.label });
  }
  return out;
}

export default function UsernameGeneratorClient({
  faqs = [],
  initialVibe = "all",
  initialName = "",
  embedded = false,
}: {
  faqs?: Array<{ q: string; a: string }>;
  /** Pre-select a vibe filter (used when embedded on a /username-ideas page). */
  initialVibe?: VibeFilter;
  /** Pre-fill the name input (used when embedded on a /username-ideas page). */
  initialName?: string;
  /** Compact mode for embedding under a landing page's own H1/FAQ. */
  embedded?: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [vibe, setVibe] = useState<VibeFilter>(initialVibe);
  const [count, setCount] = useState(24);
  const [results, setResults] = useState<Result[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = useCallback(() => {
    setResults(generate(name, vibe, count));
    setHasGenerated(true);
  }, [name, vibe, count]);

  // When embedded with a pre-filled name, roll a set on mount so the tool shows
  // live results immediately under the landing page's server-rendered examples.
  useEffect(() => {
    if (embedded && initialName.trim()) {
      setResults(generate(initialName, initialVibe, 24));
      setHasGenerated(true);
    }
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async (text: string, idx: number) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedIdx(idx);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "✦";
      toastMsg.textContent = "Copied username";
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopiedIdx(null); }, 1800);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); handleGenerate(); }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: embedded ? "8px 0 0" : "48px 24px" }}>
      {!embedded && (
        <>
          <div className="section-label">Random username generator</div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
            Username Generator
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
            Type your name and pick a vibe. We mix {STYLES.length} font styles with {ORNAMENTS.length} ornament packs to spin up fancy usernames for Discord, Instagram, Roblox, TikTok and more. Press Generate to roll a fresh set.
          </p>
        </>
      )}

      {/* ── INPUT + CONTROLS ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="ug-name" style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Your name or word</label>
        <input
          id="ug-name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={onKey}
          placeholder="alex, luna, midnight, sk8r..."
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", outline: "none", lineHeight: 1.4 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: 4 }}>Vibe:</span>
          {VIBES.map(v => (
            <button
              key={v.id}
              onClick={() => setVibe(v.id)}
              style={{
                background: vibe === v.id ? "var(--accent)" : "transparent",
                color: vibe === v.id ? "white" : "var(--text2)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              aria-pressed={vibe === v.id}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: 4 }}>Count:</span>
          {COUNT_OPTIONS.map(n => (
            <button
              key={n}
              onClick={() => setCount(n)}
              style={{
                background: count === n ? "var(--accent)" : "transparent",
                color: count === n ? "white" : "var(--text2)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              aria-pressed={count === n}
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleGenerate}
            disabled={!name.trim()}
            style={{
              marginLeft: "auto",
              background: name.trim() ? "var(--accent)" : "var(--surface)",
              color: name.trim() ? "white" : "var(--text3)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: name.trim() ? "pointer" : "not-allowed",
              transition: "all 0.15s",
            }}
          >
            {hasGenerated ? "↻ Generate again" : "Generate"}
          </button>
        </div>
      </div>

      {/* ── RESULTS ─────────────────────────────────────────────────────────── */}
      {!hasGenerated ? (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: 12, padding: "40px 24px", textAlign: "center", color: "var(--text3)", marginBottom: 36 }}>
          <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.5 }}>✦</div>
          <div style={{ fontSize: 14 }}>Type a name above and press Generate to see {count} random usernames.</div>
        </div>
      ) : results.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: 12, padding: "40px 24px", textAlign: "center", color: "var(--text3)", marginBottom: 36 }}>
          Type a name first to generate usernames.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: 36 }}>
          {results.map((r, i) => {
            const isCopied = copiedIdx === i;
            return (
              <div
                key={`${i}-${r.text}`}
                onClick={() => copy(r.text, i)}
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseEnter={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
                onMouseLeave={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <div style={{ fontSize: "1.2rem", color: "var(--text)", lineHeight: 1.5, wordBreak: "break-word", marginBottom: 6, minHeight: 28 }}>
                  {r.text}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--text3)" }}>
                  <span>{r.styleLabel}{r.ornamentLabel !== "Plain" ? ` · ${r.ornamentLabel}` : ""}</span>
                  <span style={{ color: isCopied ? "var(--accent)" : "var(--text3)" }}>{isCopied ? "✓ copied" : "click to copy"}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {hasGenerated && results.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <button
            onClick={handleGenerate}
            style={{ background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            ↻ Roll another {count}
          </button>
        </div>
      )}

      {/* FAQ + Related are hidden in embedded mode — the landing page supplies its own. */}
      {!embedded && (<>
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
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "31 styles" },
            { href: "/character-counter", label: "# Character Counter", desc: "Check name limits" },
            { href: "/upside-down-text", label: "uʍop Upside Down", desc: "Flipped names" },
            { href: "/zalgo-text", label: "z̴ Zalgo Text", desc: "Cursed names" },
            { href: "/aesthetic-text", label: "ａ Aesthetic Text", desc: "Vaporwave" },
            { href: "/symbols-for/discord", label: "🟣 Discord Symbols", desc: "For your server" },
            { href: "/symbols-for/instagram", label: "📸 Instagram Symbols", desc: "For your bio" },
            { href: "/strikethrough-text", label: "S̶ Strikethrough", desc: "Crossed out" },
          ].map(t => (
            <a key={t.href} href={t.href} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{t.desc}</div>
            </a>
          ))}
        </div>
      </section>
      </>)}
    </div>
  );
}
