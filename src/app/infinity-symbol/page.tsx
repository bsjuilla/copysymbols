import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Infinity Symbol ∞ Copy & Paste — All Infinity Signs",
  description: "Copy the infinity symbol ∞ with one click. Keyboard shortcuts for Mac (Option+5), Windows (Alt+236), HTML &infin; and LaTeX \\infty.",
  ...canonical("/infinity-symbol"),
};

const items = [
  { symbol: "∞", name: "Infinity", unicode: "U+221E", use: "Standard infinity sign" },
  { symbol: "⧞", name: "Infinity Negated", unicode: "U+29DE", use: "Bounded infinity" },
  { symbol: "♾", name: "Infinity Emoji", unicode: "U+267E", use: "Permanent paper emoji" },
  { symbol: "∝", name: "Proportional To", unicode: "U+221D", use: "Proportional (∞ look)" },
  { symbol: "≈", name: "Almost Equal To", unicode: "U+2248", use: "Approximately equal" },
  { symbol: "∫", name: "Integral", unicode: "U+222B", use: "Calculus integral" },
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
        { "@type": "ListItem", position: 3, name: "Infinity Symbol", item: `${baseUrl}/infinity-symbol` },
      ],
    },
    {
      "@type": "DefinedTerm",
      name: "Infinity Symbol",
      termCode: "U+221E",
      description: "The infinity symbol ∞ (U+221E) represents endlessness in mathematics, philosophy, and popular culture. Related forms include ⧞ (U+29DE), ♾ (U+267E), ∝ (U+221D), ≈ (U+2248), and ∫ (U+222B).",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Unicode Symbols",
        url: `${baseUrl}/symbols`,
      },
      url: `${baseUrl}/infinity-symbol`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I type the infinity symbol on Windows?", acceptedAnswer: { "@type": "Answer", text: "Hold Alt and type 236 on the numeric keypad to produce ∞." } },
        { "@type": "Question", name: "How do I type the infinity symbol on Mac?", acceptedAnswer: { "@type": "Answer", text: "Press Option + 5 to produce ∞." } },
        { "@type": "Question", name: "What is the HTML entity for the infinity symbol?", acceptedAnswer: { "@type": "Answer", text: "Use &infin; or the numeric reference &#8734; to render ∞ in HTML." } },
        { "@type": "Question", name: "How do I write infinity in LaTeX?", acceptedAnswer: { "@type": "Answer", text: "Use \\infty in math mode to render ∞ in LaTeX documents." } },
        { "@type": "Question", name: "What does the infinity symbol mean?", acceptedAnswer: { "@type": "Answer", text: "The ∞ sign represents endlessness in mathematics, philosophy, and popular culture." } },
      ],
    },
  ],
};

export default function InfinitySymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Infinity Symbol ∞
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any infinity symbol to copy it instantly. The ∞ sign represents endlessness in mathematics, philosophy, and popular culture.
      </p>
      <CopySymbolGrid items={items} />
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How to Type ∞</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 236 (numpad)" },
            { platform: "Mac", method: "Option + 5" },
            { platform: "HTML", method: "&infin; or &#8734;" },
            { platform: "LaTeX", method: "\\infty" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/math",label:"Math Symbols"},{href:"/pi-symbol",label:"π Pi Symbol"},{href:"/hearts",label:"♡ Hearts"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
