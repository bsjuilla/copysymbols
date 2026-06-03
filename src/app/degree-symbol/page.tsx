import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import SymbolEnrichment from "@/components/SymbolEnrichment";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForSymbol } from "@/lib/related";
import { symbolEnrichment } from "@/data/symbol-enrichment";
import { canonical } from "@/lib/canonical";

const pack = symbolEnrichment["degree-symbol"];

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
      mainEntity: pack.faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
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
      <SymbolEnrichment pack={pack} what="degree symbol" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/math",label:"Math Symbols"},{href:"/symbols/technical",label:"Technical"},{href:"/pi-symbol",label:"π Pi Symbol"},{href:"/symbols",label:"All Symbols"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
      <RelatedLinks links={relatedForSymbol("math")} heading="Related symbols & tools" />
    </div>
  );
}
