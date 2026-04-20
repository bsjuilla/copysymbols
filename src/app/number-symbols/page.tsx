import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Symbols ① ② ③ Copy & Paste — Circled & Special Numbers",
  description: "Copy circled numbers ①②③, Roman numerals ⅠⅡⅢ, fractions ½ ¼ ¾, and superscript numbers. One click to copy any special number symbol.",
};

const circled = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"];
const roman = ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","Ⅼ","Ⅽ","Ⅾ","Ⅿ"];
const fractions = ["½","⅓","¼","¾","⅔","⅕","⅙","⅛","⅜","⅝","⅞","⅒"];
const superscript = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","⁺","⁻","⁼","⁽","⁾","ⁿ"];
const subscript = ["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉","₊","₋","₌","₍","₎","ₙ"];

export default function NumberSymbolsPage() {
  const Section = ({ title, symbols }: { title: string; symbols: string[] }) => (
    <div style={{ marginBottom: 40 }}>
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{title}</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {symbols.map(s => (
          <button key={s} onClick={() => navigator.clipboard.writeText(s)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontSize: "1.3rem", color: "var(--text)", minWidth: 44, textAlign: "center" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Number Symbols ① ½ Ⅳ
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Circled numbers, Roman numerals, fractions, superscripts and subscripts. Click any to copy instantly.
      </p>
      <Section title="Circled Numbers ①" symbols={circled} />
      <Section title="Roman Numerals Ⅰ Ⅴ Ⅹ" symbols={roman} />
      <Section title="Fractions ½ ¼ ¾" symbols={fractions} />
      <Section title="Superscript ¹ ² ³" symbols={superscript} />
      <Section title="Subscript ₁ ₂ ₃" symbols={subscript} />
    </div>
  );
}
