"use client";
import { useState, useMemo } from "react";

// Encode text → binary by going through UTF-8 bytes (handles emoji + non-Latin
// natively). Each byte becomes 8 binary digits, separated by spaces.
function encode(text: string): string {
  if (!text) return "";
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes).map(b => b.toString(2).padStart(8, "0")).join(" ");
}

// Decode binary → text. Strip everything that isn't 0/1/space, group into
// 8-bit bytes, then decode the byte array as UTF-8.
function decode(binary: string): string {
  const cleaned = binary.replace(/[^01\s]/g, "").trim();
  if (!cleaned) return "";
  // Split on whitespace; if user pasted a single unbroken binary string,
  // split into 8-bit chunks.
  const tokens = cleaned.split(/\s+/);
  let bits = "";
  for (const t of tokens) bits += t;
  if (bits.length % 8 !== 0) {
    // Pad with leading zeros to nearest byte. Better than dropping bits.
    bits = bits.padStart(Math.ceil(bits.length / 8) * 8, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  try {
    return new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(bytes));
  } catch {
    return "(invalid UTF-8)";
  }
}

type Mode = "encode" | "decode";

export default function BinaryClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => mode === "encode" ? encode(input) : decode(input),
    [input, mode]
  );

  const stats = useMemo(() => {
    if (mode === "encode") {
      const bytes = new TextEncoder().encode(input).length;
      return { bytes, bits: bytes * 8 };
    } else {
      const cleaned = input.replace(/[^01]/g, "");
      return { bytes: Math.ceil(cleaned.length / 8), bits: cleaned.length };
    }
  }, [input, mode]);

  const swap = () => {
    setInput(output);
    setMode(m => m === "encode" ? "decode" : "encode");
  };

  const copy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = output;
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "01";
      toastMsg.textContent = mode === "encode" ? "Copied binary" : "Copied text";
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">UTF-8 binary converter</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Binary Translator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Convert text to binary and back. Full UTF-8 support — handles emoji, accented letters, CJK, the lot.
      </p>

      {/* ── MODE TOGGLE ─────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 4, marginBottom: 16, gap: 4 }}>
        <button
          onClick={() => setMode("encode")}
          style={{ flex: 1, background: mode === "encode" ? "var(--accent)" : "transparent", color: mode === "encode" ? "white" : "var(--text2)", border: "none", borderRadius: 6, padding: "10px 14px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
        >
          Text → Binary
        </button>
        <button
          onClick={() => setMode("decode")}
          style={{ flex: 1, background: mode === "decode" ? "var(--accent)" : "transparent", color: mode === "decode" ? "white" : "var(--text2)", border: "none", borderRadius: 6, padding: "10px 14px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
        >
          Binary → Text
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="bin-input" style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
          {mode === "encode" ? "Plain text" : "Binary (8-bit groups, separated by spaces)"}
        </label>
        <textarea
          id="bin-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "encode" ? "hello world" : "01101000 01100101 01101100 01101100 01101111"}
          rows={4}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: mode === "decode" ? 14 : 18, fontFamily: mode === "decode" ? "ui-monospace, monospace" : "inherit", resize: "vertical", outline: "none", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <button
          onClick={swap}
          style={{ background: "transparent", color: "var(--text2)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}
          aria-label="Swap input and output"
        >
          ⇅ Swap
        </button>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
          {mode === "encode" ? "Binary output" : "Plain text output"}
        </label>
        <div
          onClick={copy}
          style={{ background: "var(--surface)", border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "20px 22px", cursor: output ? "pointer" : "default", transition: "all 0.18s", minHeight: 80 }}
        >
          <div style={{ fontSize: mode === "encode" ? 14 : "1.2rem", color: "var(--text)", lineHeight: 1.7, wordBreak: "break-all", fontFamily: mode === "encode" ? "ui-monospace, monospace" : "inherit", marginBottom: output ? 12 : 0 }}>
            {output || <span style={{ color: "var(--text3)", fontSize: 14, fontFamily: "inherit" }}>(translation appears here)</span>}
          </div>
          {output && (
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={e => e.stopPropagation()}>
              <button onClick={copy} style={{ background: copied ? "var(--accent)" : "var(--bg)", color: copied ? "white" : "var(--text)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 36 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Bytes</div>
          <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{stats.bytes.toLocaleString()}</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Bits</div>
          <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{stats.bits.toLocaleString()}</div>
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
            { href: "/morse-code", label: "·− Morse Code", desc: "Text ⇄ Morse + audio" },
            { href: "/character-counter", label: "# Character Counter", desc: "Live counts" },
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "31 styles" },
            { href: "/upside-down-text", label: "uʍop Upside Down", desc: "Flipped text" },
            { href: "/zalgo-text", label: "z̴ Zalgo Text", desc: "Cursed glitch" },
            { href: "/invisible-character", label: "• Invisible Character", desc: "Blank spaces" },
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
