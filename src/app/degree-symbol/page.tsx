import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Degree Symbol ° Copy & Paste — °C °F and More",
  description: "Copy the degree symbol ° instantly. Keyboard shortcuts for Windows (Alt+0176), Mac (Option+Shift+8), iPhone, Android, and HTML &deg;.",
  ...canonical("/degree-symbol"),
};

const items = [
  { symbol: "°", name: "Degree Sign", unicode: "U+00B0", use: "Temperature & angles" },
  { symbol: "℃", name: "Degree Celsius", unicode: "U+2103", use: "Celsius temperature" },
  { symbol: "℉", name: "Degree Fahrenheit", unicode: "U+2109", use: "Fahrenheit temperature" },
  { symbol: "ᵒ", name: "Superscript Small O", unicode: "U+1D52", use: "Superscript degree" },
  { symbol: "′", name: "Prime (arc minute)", unicode: "U+2032", use: "Minutes of arc" },
  { symbol: "″", name: "Double Prime", unicode: "U+2033", use: "Seconds of arc" },
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
        { "@type": "ListItem", position: 3, name: "Degree Symbol", item: `${baseUrl}/degree-symbol` },
      ],
    },
    {
      "@type": "DefinedTerm",
      name: "Degree Symbol",
      termCode: "U+00B0",
      description: "The degree sign ° (U+00B0) is used for temperatures and angles. Related forms include ℃ (U+2103 Celsius), ℉ (U+2109 Fahrenheit), ′ (U+2032 arc minute), and ″ (U+2033 arc second).",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Unicode Symbols",
        url: `${baseUrl}/symbols`,
      },
      url: `${baseUrl}/degree-symbol`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I type the degree symbol on Windows?", acceptedAnswer: { "@type": "Answer", text: "Hold Alt and type 0176 on the numeric keypad to produce °." } },
        { "@type": "Question", name: "How do I type the degree symbol on Mac?", acceptedAnswer: { "@type": "Answer", text: "Press Option + Shift + 8 to produce °." } },
        { "@type": "Question", name: "How do I type the degree symbol on iPhone or Android?", acceptedAnswer: { "@type": "Answer", text: "Hold the 0 key on the iPhone, iPad, or Android numeric keyboard — ° appears in the popup." } },
        { "@type": "Question", name: "What is the HTML entity for the degree symbol?", acceptedAnswer: { "@type": "Answer", text: "Use &deg; or the numeric reference &#176; to render ° in HTML." } },
        { "@type": "Question", name: "How do I insert a degree symbol in Google Docs?", acceptedAnswer: { "@type": "Answer", text: "Go to Insert then Special characters and search 'degree' to insert °." } },
      ],
    },
  ],
};

export default function DegreeSymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Degree Symbol °
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any degree symbol to copy it instantly. Use ° for angles and coordinates, ℃ for Celsius, ℉ for Fahrenheit.
      </p>
      <CopySymbolGrid items={items} />
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Keyboard Shortcuts for °</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 0176 (hold Alt, type on numpad)" },
            { platform: "Mac", method: "Option + Shift + 8" },
            { platform: "iPhone / iPad", method: "Hold the 0 key → ° appears" },
            { platform: "Android", method: "Hold the 0 key → degree appears" },
            { platform: "HTML", method: "&deg; or &#176;" },
            { platform: "Google Docs", method: "Insert → Special characters → 'degree'" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/math",label:"Math Symbols"},{href:"/symbols/technical",label:"Technical"},{href:"/pi-symbol",label:"π Pi Symbol"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
