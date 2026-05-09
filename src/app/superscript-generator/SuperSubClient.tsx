"use client";
import { useState, useMemo } from "react";

const superscriptMap: Record<string, string> = {
  a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",o:"ᵒ",p:"ᵖ",q:"𐞥",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ",
  A:"ᴬ",B:"ᴮ",C:"ᶜ",D:"ᴰ",E:"ᴱ",F:"ᶠ",G:"ᴳ",H:"ᴴ",I:"ᴵ",J:"ᴶ",K:"ᴷ",L:"ᴸ",M:"ᴹ",N:"ᴺ",O:"ᴼ",P:"ᴾ",Q:"Q",R:"ᴿ",S:"ˢ",T:"ᵀ",U:"ᵁ",V:"ⱽ",W:"ᵂ",X:"ˣ",Y:"ʸ",Z:"ᶻ",
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",
  "+":"⁺","-":"⁻","=":"⁼","(":"⁽",")":"⁾",
};

const subscriptMap: Record<string, string> = {
  a:"ₐ",e:"ₑ",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",n:"ₙ",o:"ₒ",p:"ₚ",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",x:"ₓ",
  "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉",
  "+":"₊","-":"₋","=":"₌","(":"₍",")":"₎",
};

function convert(text: string, map: Record<string, string>): string {
  return text.split("").map(c => map[c] || map[c.toLowerCase()] || c).join("");
}

const EXAMPLES = [
  { label: "Math", input: "x2 + y2 = r2" },
  { label: "Chemistry", input: "H2SO4 + 2NaOH" },
  { label: "Footnote", input: "see note 1" },
  { label: "Powers of 10", input: "10 to the 6 = 1000000" },
];

export default function SuperSubClient() {
  const [input, setInput] = useState("hello world 2024");
  const [copied, setCopied] = useState<string | null>(null);

  const superOut = useMemo(() => convert(input, superscriptMap), [input]);
  const subOut = useMemo(() => convert(input, subscriptMap), [input]);

  const copy = async (text: string, label: string) => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(label);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = label === "Superscript" ? "ˣ" : "ₓ";
      toastMsg.textContent = `Copied ${label}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Tiny letters tool</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Superscript & Subscript Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Type anything and get instant <span style={{ verticalAlign: "super", fontSize: "0.7em" }}>superscript</span> or <span style={{ verticalAlign: "sub", fontSize: "0.7em" }}>subscript</span> versions. Works in Instagram bios, TikTok captions, Discord chat, and anywhere Unicode is supported — these are real characters, not formatting.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your text here..."
        rows={3}
        style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", marginBottom: 16, lineHeight: 1.6 }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <span style={{ fontSize: 12, color: "var(--text3)", marginRight: 4, alignSelf: "center" }}>Try:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            onClick={() => setInput(ex.input)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "var(--text2)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {[
          { label: "Superscript", desc: "Tiny letters above the line — for footnotes, exponents, abbreviations", result: superOut },
          { label: "Subscript",   desc: "Tiny letters below the line — for chemistry formulas, indices",            result: subOut },
        ].map(o => (
          <div
            key={o.label}
            onClick={() => copy(o.result, o.label)}
            style={{ background: "var(--surface)", border: `1px solid ${copied === o.label ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 20px", cursor: input ? "pointer" : "default", transition: "all 0.15s" }}
            onMouseEnter={e => { if (input && copied !== o.label) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
            onMouseLeave={e => { if (copied !== o.label) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>{o.label}</span>
              <span style={{ fontSize: 11, color: copied === o.label ? "var(--accent)" : "var(--text3)" }}>
                {copied === o.label ? "✓ copied" : input ? "click to copy" : ""}
              </span>
            </div>
            <div style={{ fontSize: "1.4rem", color: "var(--text)", lineHeight: 1.8, wordBreak: "break-all", minHeight: 36 }}>
              {input ? o.result : <span style={{ color: "var(--text3)", fontSize: 14 }}>{o.desc}</span>}
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>{o.desc}</div>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 56 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>How it works</h2>
        <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, marginBottom: 16 }}>
          Unicode includes a small set of <strong>actual</strong> superscript and subscript characters — for example U+00B2 is the literal character ², not a styled 2. This tool maps each letter or digit you type to its closest Unicode equivalent. Characters without a sub/super counterpart (like q, z, or most punctuation in subscript) are left as-is.
        </p>
        <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>
          Because these are real characters, they survive copy-paste anywhere — Instagram bio fields, TikTok captions, Discord chat, Twitter/X posts, even browser address bars. They&apos;re not CSS or formatting.
        </p>
      </section>
    </div>
  );
}
