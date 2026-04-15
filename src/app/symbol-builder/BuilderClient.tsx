"use client";
import { useState } from "react";

const presets = [
  { label: "Gold Star", prefix: "★彡", suffix: "彡★" },
  { label: "Ornament", prefix: "꧁", suffix: "꧂" },
  { label: "Diamond", prefix: "◈──", suffix: "──◈" },
  { label: "Heart Wrap", prefix: "♡ ", suffix: " ♡" },
  { label: "Star Border", prefix: "★ ", suffix: " ★" },
  { label: "Bracket", prefix: "【", suffix: "】" },
  { label: "Crown", prefix: "👑 ", suffix: " 👑" },
  { label: "Four Star", prefix: "✦ ", suffix: " ✦" },
  { label: "Wave", prefix: "≋≋ ", suffix: " ≋≋" },
  { label: "Fire", prefix: "🔥 ", suffix: " 🔥" },
  { label: "Japanese", prefix: "彡★ ", suffix: " ★彡" },
  { label: "Tribal", prefix: "꙳★*", suffix: "*★꙳" },
];

const quickSymbols = ["★","☆","✦","✧","♡","❤","♥","✿","❀","•","·","｜","─","═","꧁","꧂","彡","★彡","🔥","💎","👑","✨","⭐","🌙","💀","⚡","🎯","💜","🖤","🤍"];

export default function BuilderClient() {
  const [prefix, setPrefix] = useState("꧁✦ ");
  const [text, setText] = useState("Your Name");
  const [suffix, setSuffix] = useState(" ✦꧂");
  const [copied, setCopied] = useState(false);

  const result = prefix + text + suffix;

  const copy = async () => {
    try { await navigator.clipboard.writeText(result); } catch { const ta = document.createElement("textarea"); ta.value = result; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(true);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "✦"; toastMsg.textContent = "Copied your symbol text!"; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800); }
  };

  const applyPreset = (p: typeof presets[0]) => { setPrefix(p.prefix); setSuffix(p.suffix); };
  const addToPrefix = (s: string) => setPrefix(prev => prev + s);
  const addToSuffix = (s: string) => setSuffix(prev => s + prev);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Custom text builder</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>Symbol Text Builder</h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.6 }}>Build custom symbol text for your name, bio or username. Add symbols before and after your text, then copy the result.</p>

      {/* Preset buttons */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Quick presets</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {presets.map(p => (
            <button key={p.label} onClick={() => applyPreset(p)} className="cat-pill" style={{ fontSize: 12 }}>
              {p.prefix}text{p.suffix}
            </button>
          ))}
        </div>
      </div>

      {/* Builder inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Prefix (before)</div>
          <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)}
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 16, fontFamily: "inherit", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
        </div>
        <div style={{ fontSize: "1.5rem", color: "var(--text3)", paddingTop: 20 }}>+</div>
        <div>
          <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Your text (middle)</div>
          <input type="text" value={text} onChange={e => setText(e.target.value)}
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 16, fontFamily: "inherit", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--accent)"} />
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Suffix (after)</div>
        <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 16, fontFamily: "inherit", outline: "none" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
      </div>

      {/* Result */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your result</div>
        <div style={{ fontSize: "1.8rem", color: "var(--text)", fontFamily: "serif", letterSpacing: "0.05em", lineHeight: 1.5, wordBreak: "break-all", marginBottom: 16 }}>{result}</div>
        <button onClick={copy} style={{ background: "var(--accent)", border: "none", borderRadius: 8, padding: "10px 24px", color: "var(--bg)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          {copied ? "✓ Copied!" : "Copy Result"}
        </button>
      </div>

      {/* Quick symbol picker */}
      <div>
        <div style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Add symbols</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {quickSymbols.map(s => (
            <div key={s} style={{ display: "flex", gap: 4 }}>
              <button onClick={() => addToPrefix(s)} title={`Add ${s} to prefix`}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px 0 0 6px", padding: "4px 8px", fontSize: "1.1rem", cursor: "pointer", color: "var(--text)", transition: "all 0.15s" }}>
                {s}
              </button>
              <button onClick={() => addToSuffix(s)} title={`Add ${s} to suffix`}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "0 6px 6px 0", padding: "4px 6px", fontSize: 10, cursor: "pointer", color: "var(--text3)", transition: "all 0.15s" }}>
                ↩
              </button>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>Click a symbol to add it to the prefix. Click ↩ to add it to the suffix instead.</p>
      </div>
    </div>
  );
}
