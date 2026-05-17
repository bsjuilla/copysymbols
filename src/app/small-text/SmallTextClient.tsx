"use client";
import { useState, useMemo } from "react";

const superscriptMap: Record<string, string> = {
  a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",o:"ᵒ",p:"ᵖ",q:"𐞥",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ",
  A:"ᴬ",B:"ᴮ",C:"ᶜ",D:"ᴰ",E:"ᴱ",F:"ᶠ",G:"ᴳ",H:"ᴴ",I:"ᴵ",J:"ᴶ",K:"ᴷ",L:"ᴸ",M:"ᴹ",N:"ᴺ",O:"ᴼ",P:"ᴾ",Q:"Q",R:"ᴿ",S:"ˢ",T:"ᵀ",U:"ᵁ",V:"ⱽ",W:"ᵂ",X:"ˣ",Y:"ʸ",Z:"ᶻ",
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",
};

const smallCapsMap: Record<string, string> = {
  a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ",
};

const subscriptMap: Record<string, string> = {
  a:"ₐ",e:"ₑ",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",n:"ₙ",o:"ₒ",p:"ₚ",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",x:"ₓ",
  "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉",
};

function convert(text: string, map: Record<string, string>, fallback?: boolean): string {
  return text.split("").map(c => {
    const lower = c.toLowerCase();
    return map[c] || map[lower] || (fallback ? c : c);
  }).join("");
}

export default function SmallTextClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const outputs = useMemo(() => [
    { label: "Superscript (Small)", desc: "ˢᵐᵃˡˡ text — most popular for bios", result: convert(input, superscriptMap, true) },
    { label: "Small Caps", desc: "ᴘʀᴏꜰᴇssɪᴏɴᴀʟ small capitals", result: convert(input.toLowerCase(), smallCapsMap, true) },
    { label: "Subscript", desc: "ₜₑₓₜ below the line", result: convert(input, subscriptMap, true) },
    { label: "Tiny Bold", desc: "𝘁𝗶𝗻𝘆 bold text", result: input.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + code - 97);
      return c;
    }).join("") },
  ], [input]);

  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(label);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "ˢ"; toastMsg.textContent = `Copied ${label}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text converter</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Small Text Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Convert your text to ˢᵐᵃˡˡ superscript, ᴄᴀᴘs ᴄᴀᴘɪᴛᴀʟs and more. Works on Instagram bios, TikTok, Discord — anywhere you can paste text.
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
              <div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>{o.label}</span>
                <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}>{o.desc}</span>
              </div>
              <span style={{ fontSize: 11, color: copied === o.label ? "var(--accent)" : "var(--text3)" }}>{copied === o.label ? "✓ copied" : input ? "click to copy" : ""}</span>
            </div>
            <div style={{ fontSize: "1.2rem", color: "var(--text)", fontFamily: "serif", lineHeight: 1.6, minHeight: 28 }}>
              {input ? o.result : <span style={{ color: "var(--text3)", fontSize: 14 }}>{o.desc}</span>}
            </div>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How does small text work?</h2>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
          Small text uses Unicode superscript and modifier letter characters that look like tiny versions of normal letters. For example, the small &quot;a&quot; is actually the character ᵃ (Unicode U+1D43). Because they are real text characters — not images or formatting — they work anywhere you can paste text, including Instagram bios, TikTok profiles, Discord usernames, Twitter bios, and more.
        </p>
      </section>
    </div>
  );
}
