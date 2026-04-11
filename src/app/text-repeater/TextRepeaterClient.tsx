"use client";
import { useState, useMemo } from "react";

const separatorOptions = [
  { label: "None", value: "" },
  { label: "Space", value: " " },
  { label: "New Line", value: "\n" },
  { label: "Comma", value: ", " },
  { label: "Dash", value: " - " },
  { label: "Pipe", value: " | " },
  { label: "Dot", value: " • " },
  { label: "Custom", value: "custom" },
];

const quickExamples = [
  { label: "Ha×10", text: "Ha", times: 10, sep: "" },
  { label: "⭐×20", text: "⭐", times: 20, sep: "" },
  { label: "❤️×10", text: "❤️", times: 10, sep: " " },
  { label: "lol×5", text: "lol", times: 5, sep: " " },
  { label: "✓×10", text: "✓", times: 10, sep: " " },
  { label: "100×5", text: "💯", times: 5, sep: "" },
];

export default function TextRepeaterClient() {
  const [text, setText] = useState("");
  const [times, setTimes] = useState(5);
  const [sepKey, setSepKey] = useState("Space");
  const [customSep, setCustomSep] = useState("");
  const [copied, setCopied] = useState(false);

  const separator = sepKey === "Custom" ? customSep : (separatorOptions.find(s => s.label === sepKey)?.value ?? " ");

  const result = useMemo(() => {
    if (!text) return "";
    return Array(Math.min(times, 500)).fill(text).join(separator);
  }, [text, times, separator]);

  const charCount = result.length;

  const handleCopy = async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = result; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "🔁";
      toastMsg.textContent = "Copied repeated text";
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    }
  };

  const loadExample = (ex: typeof quickExamples[0]) => {
    setText(ex.text);
    setTimes(ex.times);
    setSepKey(ex.sep === " " ? "Space" : ex.sep === "" ? "None" : "Space");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Repeat tool</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Text Repeater
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Repeat any text, word, emoji or symbol as many times as you want. Perfect for decorations, spam messages, and pattern generation.
      </p>

      {/* Quick examples */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        <span style={{ fontSize: 13, color: "var(--text3)", alignSelf: "center" }}>Quick:</span>
        {quickExamples.map(ex => (
          <button key={ex.label} onClick={() => loadExample(ex)} className="cat-pill" style={{ fontSize: 12 }}>{ex.label}</button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20 }}>
          {/* Text input */}
          <div>
            <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Text to repeat</label>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type anything... text, emoji, symbol"
              style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 16, fontFamily: "inherit", outline: "none" }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
          {/* Times */}
          <div style={{ minWidth: 120 }}>
            <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Repeat</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setTimes(Math.max(1, times - 1))} style={{ width: 32, height: 40, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text)", fontSize: 18, cursor: "pointer" }}>−</button>
              <input
                type="number"
                min={1}
                max={500}
                value={times}
                onChange={e => setTimes(Math.min(500, Math.max(1, parseInt(e.target.value) || 1)))}
                style={{ width: 60, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 4px", color: "var(--text)", fontSize: 16, textAlign: "center", outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={() => setTimes(Math.min(500, times + 1))} style={{ width: 32, height: 40, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text)", fontSize: 18, cursor: "pointer" }}>+</button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Separator</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {separatorOptions.map(s => (
              <button
                key={s.label}
                onClick={() => setSepKey(s.label)}
                className={"cat-pill" + (sepKey === s.label ? " active" : "")}
                style={{ fontSize: 12 }}
              >{s.label}</button>
            ))}
          </div>
          {sepKey === "Custom" && (
            <input
              type="text"
              value={customSep}
              onChange={e => setCustomSep(e.target.value)}
              placeholder="Enter custom separator..."
              style={{ marginTop: 12, width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          )}
        </div>
      </div>

      {/* Result */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>
            {result ? `${times}× repeated · ${charCount.toLocaleString()} characters` : "Result will appear here"}
          </div>
          <button
            onClick={handleCopy}
            disabled={!result}
            style={{ background: result ? "var(--accent)" : "var(--surface)", color: result ? "var(--bg)" : "var(--text3)", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: result ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.15s" }}
          >
            {copied ? "✓ Copied!" : "Copy Result"}
          </button>
        </div>
        <div style={{ maxHeight: 200, overflowY: "auto", fontSize: 15, color: "var(--text)", lineHeight: 1.7, wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
          {result || <span style={{ color: "var(--text3)" }}>Type something above to get started...</span>}
        </div>
      </div>

      {/* Info */}
      <section style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>What can you use this for?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { icon: "🎨", title: "Decorations", desc: "Repeat ★ or ❤️ to decorate your bio or posts" },
            { icon: "😂", title: "Reactions", desc: "HaHaHaHa or lololol for funny reactions" },
            { icon: "📝", title: "Dividers", desc: "Create ─────── dividers for Discord" },
            { icon: "✨", title: "Patterns", desc: "Build emoji patterns like ✨⭐✨⭐✨" },
          ].map(item => (
            <div key={item.title} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
