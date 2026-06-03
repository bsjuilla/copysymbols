import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import SymbolEnrichment from "@/components/SymbolEnrichment";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForSymbol } from "@/lib/related";
import { symbolEnrichment } from "@/data/symbol-enrichment";
import { canonical } from "@/lib/canonical";

const pack = symbolEnrichment["checkmark"];

export const metadata: Metadata = {
  title: "Check Mark Symbol ✓ Copy & Paste — All Checkmarks",
  description: "Copy and paste check mark symbols instantly. ✓ ✔ ☑ ✅ — tick marks, ballot boxes, heavy check marks. One click to copy any checkmark symbol.",
  ...canonical("/checkmark"),
};

const items = [
  { symbol: "✓", name: "Check Mark", unicode: "U+2713", use: "Standard tick" },
  { symbol: "✔", name: "Heavy Check Mark", unicode: "U+2714", use: "Bold tick" },
  { symbol: "✅", name: "White Heavy Check Mark", unicode: "U+2705", use: "Green emoji tick" },
  { symbol: "☑", name: "Ballot Box with Check", unicode: "U+2611", use: "Checked checkbox" },
  { symbol: "☒", name: "Ballot Box with X", unicode: "U+2612", use: "Crossed checkbox" },
  { symbol: "✗", name: "Ballot X", unicode: "U+2717", use: "Light cross" },
  { symbol: "✘", name: "Heavy Ballot X", unicode: "U+2718", use: "Bold cross" },
  { symbol: "❌", name: "Cross Mark", unicode: "U+274C", use: "Red emoji cross" },
  { symbol: "☐", name: "Ballot Box", unicode: "U+2610", use: "Empty checkbox" },
  { symbol: "✕", name: "Multiplication X", unicode: "U+2715", use: "Light X mark" },
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
        { "@type": "ListItem", position: 3, name: "Check Mark", item: `${baseUrl}/checkmark` },
      ],
    },
    {
      "@type": "DefinedTerm",
      name: "Check Mark Symbol",
      termCode: "U+2713",
      description: "The check mark ✓ (U+2713) is a standard tick used in Google Docs, Word, Instagram, Discord, and WhatsApp. Related forms include ✔ (U+2714 heavy check), ✅ (U+2705 green emoji), ☑ (U+2611 ballot box checked), and ✗ (U+2717 ballot X).",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Unicode Symbols",
        url: `${baseUrl}/symbols`,
      },
      url: `${baseUrl}/checkmark`,
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

export default function CheckmarkPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Check Mark Symbol ✓
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any check mark or tick symbol to copy it instantly. Works everywhere — Google Docs, Word, Instagram, Discord, WhatsApp.
      </p>
      <CopySymbolGrid items={items} />
      <SymbolEnrichment pack={pack} what="check mark" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/ui",label:"UI Symbols"},{href:"/bullet-points",label:"Bullet Points"},{href:"/symbols/shapes",label:"Shapes"},{href:"/symbols",label:"All Symbols"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
      <RelatedLinks links={relatedForSymbol("ui")} heading="Related symbols & tools" />
    </div>
  );
}
