import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Number Symbols ① ② ③ Copy & Paste — Circled & Special Numbers",
  description: "Copy circled numbers ①②③, Roman numerals ⅠⅡⅢ, fractions ½ ¼ ¾ and superscript digits, each a single Unicode character. One click to copy and paste anywhere.",
  ...canonical("/number-symbols"),
};

const circled = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"].map(s => ({ symbol: s, name: `Circled ${s}` }));
const roman = ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","Ⅼ","Ⅽ","Ⅾ","Ⅿ"].map(s => ({ symbol: s, name: `Roman ${s}` }));
const fractions = [
  { symbol: "½", name: "One Half" }, { symbol: "⅓", name: "One Third" }, { symbol: "¼", name: "One Quarter" },
  { symbol: "¾", name: "Three Quarters" }, { symbol: "⅔", name: "Two Thirds" }, { symbol: "⅛", name: "One Eighth" },
  { symbol: "⅜", name: "Three Eighths" }, { symbol: "⅝", name: "Five Eighths" }, { symbol: "⅞", name: "Seven Eighths" },
];
const superscripts = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"].map((s,i) => ({ symbol: s, name: `Superscript ${i}` }));

const faqs = [
  { q: "What is the difference between ① and the number 1?", a: "① is a single typographic character — a circled number that exists as one Unicode symbol. The number 1 you type is a plain digit. Because ① is a real character, it copies and pastes as a single unit and keeps its circle anywhere, unlike a 1 you would have to draw a circle around manually." },
  { q: "Are these Roman numerals real characters or just letters?", a: "Both versions exist. The ones on this page (Ⅰ Ⅴ Ⅹ) are dedicated Unicode Roman numeral characters, so Ⅻ is a single glyph for twelve. You can also spell Roman numerals with ordinary capital letters (X, V, I). The dedicated characters are tidier for things like clock faces and chapter numbers; the letters are more widely understood." },
  { q: "How do I type a fraction like ½?", a: "The common fractions (½ ¼ ¾ ⅓ ⅔ and the eighths) are single Unicode characters, so the easiest way is to click one above to copy it. They look cleaner than typing 1/2 and stay aligned on a single line." },
  { q: "Do circled and superscript numbers work everywhere?", a: "The circled numbers ①–⑳, Roman numerals, common fractions, and superscript digits are all long-established characters that render on nearly every device. They are plain text, so they paste into bios, documents, and messages without needing any special font." },
];

const baseUrl = "https://www.copychars.com";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Symbols", item: `${baseUrl}/symbols` },
        { "@type": "ListItem", position: 3, name: "Number Symbols", item: `${baseUrl}/number-symbols` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Number Symbols, Roman Numerals, Fractions",
      itemListElement: [...circled, ...roman, ...fractions, ...superscripts].map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${it.symbol} ${it.name}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function NumberSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={subH2}>What these number symbols are for</h2>
        <p style={proseP}>
          Each group answers a different need. <strong>Circled numbers</strong> (①②③) make clean, self-contained list markers and step counts that do not rely on your software&apos;s list formatting. <strong>Roman numerals</strong> (Ⅰ Ⅴ Ⅹ) suit chapter and volume numbers, clock faces, and anywhere a classic look fits. <strong>Fractions</strong> (½ ¼ ¾) keep recipes and measurements on a single tidy line. And <strong>superscript digits</strong> (¹ ² ³) handle footnote marks and simple exponents without leaving the flow of your text. Because every one is a real character, they survive copy and paste intact.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 className="font-display" style={{ ...subH2, marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 }}>
        <Link href="/roman-numerals" className="cat-pill">Roman Numerals</Link>
        <Link href="/superscript-generator" className="cat-pill">Superscript Generator</Link>
        <Link href="/symbols/math" className="cat-pill">Math Symbols</Link>
        <Link href="/symbols" className="cat-pill">All Symbols</Link>
      </div>
    </div>
  );
}

const subH2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.01em" };
const proseP: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 };
