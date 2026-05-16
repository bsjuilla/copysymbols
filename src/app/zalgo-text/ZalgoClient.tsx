"use client";
import { useState, useMemo } from "react";
import { useCopyToast } from "@/lib/use-copy-toast";

const ABOVE = ["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͅ","͛","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ"];
const MIDDLE = ["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"];
const BELOW = ["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

interface Options {
  intensity: number;        // 1–5
  above: boolean;
  middle: boolean;
  below: boolean;
  seed: number;             // re-roll trigger
}

function zalgoize(text: string, opts: Options): string {
  void opts.seed;
  return [...text].map(c => {
    if (c === " " || c === "\n") return c;
    let r = c;
    if (opts.above) for (let i = 0; i < opts.intensity; i++) r += pick(ABOVE);
    if (opts.middle) for (let i = 0; i < Math.max(1, Math.floor(opts.intensity / 2)); i++) r += pick(MIDDLE);
    if (opts.below) for (let i = 0; i < opts.intensity; i++) r += pick(BELOW);
    return r;
  }).join("");
}

export default function ZalgoClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [input, setInput] = useState("zalgo");
  const [intensity, setIntensity] = useState(3);
  const [above, setAbove] = useState(true);
  const [middle, setMiddle] = useState(true);
  const [below, setBelow] = useState(true);
  const [seed, setSeed] = useState(0);
  const { copy: copyToast, copied } = useCopyToast();

  const output = useMemo(
    () => zalgoize(input, { intensity, above, middle, below, seed }),
    [input, intensity, above, middle, below, seed]
  );

  const copy = () => copyToast(output, {
    symbol: "z̴",
    label: "Copied zalgo text",
  });

  const toggleStyle = (active: boolean) => ({
    background: active ? "var(--accent)" : "var(--surface)",
    color: active ? "white" : "var(--text2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  });

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Cursed text generator</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Z̴a̴l̴g̴o̴ Text Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Type your text and apply random Unicode combining marks to create the cursed, glitched, dripping zalgo look. Adjust intensity and direction below.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="zalgo-input" style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Your text</label>
        <textarea
          id="zalgo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={3}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      {/* ── CONTROLS ────────────────────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 16, flexWrap: "wrap" }}>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Intensity: <span style={{ color: "var(--text)", fontWeight: 600, marginLeft: 6 }}>{intensity}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
            style={{ flex: 1, maxWidth: 280 }}
            aria-label="Zalgo intensity from 1 to 5"
          />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: 4 }}>Direction:</span>
          <button onClick={() => setAbove(!above)} style={toggleStyle(above)} aria-pressed={above}>̃ Above</button>
          <button onClick={() => setMiddle(!middle)} style={toggleStyle(middle)} aria-pressed={middle}>̴ Middle</button>
          <button onClick={() => setBelow(!below)} style={toggleStyle(below)} aria-pressed={below}>̩ Below</button>
          <button onClick={() => setSeed(s => s + 1)} style={{ ...toggleStyle(false), marginLeft: "auto" }}>↻ Re-roll</button>
        </div>
      </div>

      {/* ── OUTPUT ──────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Zalgo result</label>
        <div
          onClick={copy}
          style={{ background: "var(--surface)", border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "20px 22px", cursor: output ? "pointer" : "default", transition: "all 0.18s", minHeight: 100, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        >
          <div style={{ fontSize: "1.5rem", color: "var(--text)", lineHeight: 2.2, wordBreak: "break-word", flex: 1 }}>
            {output || <span style={{ color: "var(--text3)", fontSize: 14 }}>(type something above to see the cursed result)</span>}
          </div>
          {output && (
            <button
              onClick={e => { e.stopPropagation(); copy(); }}
              style={{ background: copied ? "var(--accent)" : "var(--bg)", color: copied ? "white" : "var(--text)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
        </div>
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

      {/* ── RELATED ─────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Related text tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { href: "/upside-down-text", label: "uʍop Upside Down", desc: "Flipped text" },
            { href: "/invisible-character", label: "ㅤInvisible Character", desc: "Blank space" },
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "31 styles" },
            { href: "/strikethrough-text", label: "S̶ Strikethrough", desc: "Crossed out" },
            { href: "/mirror-text", label: "↕ Mirror & Flip", desc: "Reverse variants" },
            { href: "/character-counter", label: "# Character Counter", desc: "Live counts" },
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
