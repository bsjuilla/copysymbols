"use client";
import { useState } from "react";

const FLIP: Record<string, string> = {
  a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",
  A:"∀",B:"ᗺ",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"⅁",H:"H",I:"I",J:"ſ",K:"ʞ",L:"⅂",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Ò",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z",
  "0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6",
  "!":"¡","?":"¿",".":"˙",",":"'","'":",","\"":",",
  "(":")",")":"(","[":"]","]":"[","{":"}","}":"{","<":">",">":"<","&":"⅋","_":"‾",
  " ":" ","\n":"\n",
};

function flipText(s: string): string {
  return [...s].reverse().map(c => FLIP[c] ?? FLIP[c.toLowerCase()] ?? c).join("");
}

export default function UpsideDownClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [input, setInput] = useState("hello world");
  const [copied, setCopied] = useState(false);
  const output = flipText(input);

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
      toastSym.textContent = "ǝ";
      toastMsg.textContent = "Copied upside down text";
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text flipper</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Upside Down Text Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Type your text and instantly get the flipped <span style={{ display: "inline-block", transform: "rotate(180deg)", color: "var(--text)" }}>upside down</span> version. Pastes anywhere — Instagram, TikTok, Discord, X, WhatsApp.
      </p>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="ud-input" style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Your text</label>
        <textarea
          id="ud-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={3}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Upside down result</label>
        <div
          onClick={copy}
          style={{ background: "var(--surface)", border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "20px 22px", cursor: output ? "pointer" : "default", transition: "all 0.18s", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        >
          <div style={{ fontSize: "1.4rem", color: "var(--text)", lineHeight: 1.6, wordBreak: "break-word", flex: 1 }}>
            {output || <span style={{ color: "var(--text3)", fontSize: 14 }}>(type something above to see the flipped result)</span>}
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
            { href: "/mirror-text", label: "↕ Mirror & Flip Text", desc: "More flip variants" },
            { href: "/zalgo-text", label: "z̴ Zalgo Text", desc: "Cursed glitch" },
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "31 styles" },
            { href: "/character-counter", label: "# Character Counter", desc: "Live counts" },
            { href: "/strikethrough-text", label: "S̶ Strikethrough", desc: "Crossed out" },
            { href: "/small-text", label: "ˢ Small Text", desc: "Tiny letters" },
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
