"use client";
import { useState, useMemo } from "react";

const flipMap: Record<string, string> = { a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ɓ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",A:"∀",B:"ᗺ",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"פ",H:"H",I:"I",J:"ɾ",K:"ʞ",L:"⅂",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Q",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z","0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6","!":"¡","?":"¿",".":"˙",",":"'","'":","," ":" " };

export default function MirrorClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const outputs = useMemo(() => [
    { label: "Upside Down (Flipped)", desc: "Text flipped both upside down and reversed", result: input.split("").reverse().map(c => flipMap[c] || c).join("") },
    { label: "Upside Down (Same order)", desc: "Text flipped upside down, same left-to-right", result: input.split("").map(c => flipMap[c] || c).join("") },
    { label: "Reversed", desc: "Text reversed, same characters", result: input.split("").reverse().join("") },
    { label: "Reversed + Spaced", desc: "Reversed and spaced out", result: input.split("").reverse().join(" ") },
  ], [input]);

  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(label);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "↕"; toastMsg.textContent = `Copied ${label}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text flip tool</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>Mirror & Flip Text Generator</h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>Type your text and get flipped, mirrored and reversed versions instantly. Uses Unicode characters so it works anywhere — Discord, Instagram, TikTok and more.</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Type your text here..." rows={3}
        style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", marginBottom: 28, lineHeight: 1.6 }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {outputs.map(o => (
          <div key={o.label} onClick={() => input && copy(o.result, o.label)}
            style={{ background: "var(--surface)", border: `1px solid ${copied === o.label ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 20px", cursor: input ? "pointer" : "default", transition: "all 0.15s" }}
            onMouseEnter={e => { if (input && copied !== o.label) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
            onMouseLeave={e => { if (copied !== o.label) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div><span style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>{o.label}</span><span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}>{o.desc}</span></div>
              <span style={{ fontSize: 11, color: copied === o.label ? "var(--accent)" : "var(--text3)" }}>{copied === o.label ? "✓ copied" : input ? "click to copy" : ""}</span>
            </div>
            <div style={{ fontSize: "1.2rem", color: "var(--text)", lineHeight: 1.8, wordBreak: "break-all", minHeight: 28 }}>{input ? o.result : <span style={{ color: "var(--text3)", fontSize: 14 }}>{o.desc}</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
