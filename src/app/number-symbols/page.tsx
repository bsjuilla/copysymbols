import type { Metadata } from "next";
import CopySymbolGrid from "@/components/CopySymbolGrid";

export const metadata: Metadata = {
  title: "Number Symbols ① ② ③ Copy & Paste — Circled & Special Numbers",
  description: "Copy circled numbers ①②③, Roman numerals ⅠⅡⅢ, fractions ½ ¼ ¾, and superscript numbers. One click to copy.",
};

const circled = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"].map(s => ({ symbol: s, name: `Circled ${s}` }));
const roman = ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","Ⅼ","Ⅽ","Ⅾ","Ⅿ"].map(s => ({ symbol: s, name: `Roman ${s}` }));
const fractions = [
  { symbol: "½", name: "One Half" }, { symbol: "⅓", name: "One Third" }, { symbol: "¼", name: "One Quarter" },
  { symbol: "¾", name: "Three Quarters" }, { symbol: "⅔", name: "Two Thirds" }, { symbol: "⅛", name: "One Eighth" },
  { symbol: "⅜", name: "Three Eighths" }, { symbol: "⅝", name: "Five Eighths" }, { symbol: "⅞", name: "Seven Eighths" },
];
const superscripts = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"].map((s,i) => ({ symbol: s, name: `Superscript ${i}` }));

export default function NumberSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Number Symbols ① ½ Ⅳ
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Circled numbers, Roman numerals, fractions, and superscripts. Click any to copy instantly.
      </p>
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Circled Numbers ①</h2>
      <CopySymbolGrid items={circled} columns="repeat(auto-fill, minmax(110px, 1fr))" />
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Roman Numerals Ⅰ Ⅴ Ⅹ</h2>
      <CopySymbolGrid items={roman} columns="repeat(auto-fill, minmax(110px, 1fr))" />
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Fractions ½ ¼ ¾</h2>
      <CopySymbolGrid items={fractions} columns="repeat(auto-fill, minmax(130px, 1fr))" />
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Superscript Numbers</h2>
      <CopySymbolGrid items={superscripts} columns="repeat(auto-fill, minmax(110px, 1fr))" />
    </div>
  );
}
