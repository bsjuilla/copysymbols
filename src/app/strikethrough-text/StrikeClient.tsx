"use client";
import { useState, useMemo } from "react";

const styles = [
  { label: "Strikethrough", desc: "S̶t̶r̶i̶k̶e̶ — horizontal line through text", char: "\u0336" },
  { label: "Double Strikethrough", desc: "D̴o̴u̴b̴l̴e̴ line through text", char: "\u0334" },
  { label: "Underline", desc: "U̲n̲d̲e̲r̲l̲i̲n̲e̲ — line below text", char: "\u0332" },
  { label: "Double Underline", desc: "D̳o̳u̳b̳l̳e̳ underline below text", char: "\u0333" },
  { label: "Overline", desc: "O̅v̅e̅r̅l̅i̅n̅e̅ — line above text", char: "\u0305" },
  { label: "Combining Tilde", desc: "T̃ĩl̃d̃ẽ through text", char: "\u0303" },
  { label: "Slash Through", desc: "S̷l̷a̷s̷h̷ diagonal through text", char: "\u0337" },
];

export default function StrikeClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const outputs = useMemo(() =>
    styles.map(s => ({
      ...s,
      result: input.split("").map(c => c + s.char).join("")
    })), [input]);

  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(label);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "S̶"; toastMsg.textContent = `Copied ${label}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text decorator</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ Text Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Type your text and instantly get strikethrough, underline, overline and other Unicode text decorations. Click any result to copy it.
      </p>

      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Type your text here..." rows={3}
        style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", marginBottom: 28, lineHeight: 1.6 }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {outputs.map(o => (
          <div key={o.label} onClick={() => input && copy(o.result, o.label)}
            style={{ background: "var(--surface)", border: `1px solid ${copied === o.label ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 20px", cursor: input ? "pointer" : "default", transition: "all 0.15s" }}
            onMouseEnter={e => { if (input && copied !== o.label) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
            onMouseLeave={e => { if (copied !== o.label) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div><span style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>{o.label}</span><span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}>{o.desc}</span></div>
              <span style={{ fontSize: 11, color: copied === o.label ? "var(--accent)" : "var(--text3)" }}>{copied === o.label ? "✓ copied" : input ? "click to copy" : ""}</span>
            </div>
            <div style={{ fontSize: "1.2rem", color: "var(--text)", lineHeight: 1.8, minHeight: 28 }}>{input ? o.result : <span style={{ color: "var(--text3)", fontSize: 14 }}>{o.desc}</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
