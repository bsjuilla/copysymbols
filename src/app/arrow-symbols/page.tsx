import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import SymbolEnrichment from "@/components/SymbolEnrichment";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForSymbol } from "@/lib/related";
import { symbolEnrichment } from "@/data/symbol-enrichment";
import { canonical } from "@/lib/canonical";

const pack = symbolEnrichment["arrow-symbols"];

export const metadata: Metadata = {
  title: "Arrow Symbols → ← Copy & Paste — 100+ Arrow Signs",
  description: "Copy and paste arrow symbols instantly: right →, left ←, up ↑, down ↓, double ⇒, curved ↷, bold ➡ and 100+ more. One click to copy into Docs, Word or chat.",
  ...canonical("/arrow-symbols"),
};

const items = [
  { symbol: "→", name: "Right Arrow", unicode: "U+2192", use: "Direction, next" },
  { symbol: "←", name: "Left Arrow", unicode: "U+2190", use: "Back, previous" },
  { symbol: "↑", name: "Up Arrow", unicode: "U+2191", use: "Increase, rise" },
  { symbol: "↓", name: "Down Arrow", unicode: "U+2193", use: "Decrease, fall" },
  { symbol: "↔", name: "Left Right Arrow", unicode: "U+2194", use: "Bidirectional" },
  { symbol: "↕", name: "Up Down Arrow", unicode: "U+2195", use: "Vertical both" },
  { symbol: "↗", name: "North East Arrow", unicode: "U+2197", use: "Diagonal upper right" },
  { symbol: "↘", name: "South East Arrow", unicode: "U+2198", use: "Diagonal lower right" },
  { symbol: "↙", name: "South West Arrow", unicode: "U+2199", use: "Diagonal lower left" },
  { symbol: "↖", name: "North West Arrow", unicode: "U+2196", use: "Diagonal upper left" },
  { symbol: "⇒", name: "Double Right Arrow", unicode: "U+21D2", use: "Implies (logic)" },
  { symbol: "⇐", name: "Double Left Arrow", unicode: "U+21D0", use: "Reverse implication" },
  { symbol: "⇔", name: "Double Left Right", unicode: "U+21D4", use: "If and only if" },
  { symbol: "➡", name: "Black Right Arrow", unicode: "U+27A1", use: "Bold filled right" },
  { symbol: "⬅", name: "Black Left Arrow", unicode: "U+2B05", use: "Bold filled left" },
  { symbol: "⬆", name: "Black Up Arrow", unicode: "U+2B06", use: "Bold filled up" },
  { symbol: "⬇", name: "Black Down Arrow", unicode: "U+2B07", use: "Bold filled down" },
  { symbol: "↷", name: "Curved Right", unicode: "U+21B7", use: "Redo action" },
  { symbol: "↶", name: "Curved Left", unicode: "U+21B6", use: "Undo action" },
  { symbol: "↵", name: "Return Arrow", unicode: "U+21B5", use: "Enter key / newline" },
  { symbol: "➔", name: "Heavy Right Arrow", unicode: "U+2794", use: "Emphasis arrow" },
  { symbol: "›", name: "Single Right Chevron", unicode: "U+203A", use: "Breadcrumb separator" },
  { symbol: "‹", name: "Single Left Chevron", unicode: "U+2039", use: "Left chevron" },
  { symbol: "»", name: "Double Right Chevron", unicode: "U+00BB", use: "Double chevron" },
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
        { "@type": "ListItem", position: 3, name: "Arrow Symbols", item: `${baseUrl}/arrow-symbols` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Arrow Symbols",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${it.symbol} ${it.name}`,
      })),
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

export default function ArrowSymbolsPage() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Arrow Symbols → ←
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any arrow to copy it instantly. Works in all apps — Google Docs, Word, Instagram, Discord.
      </p>
      <CopySymbolGrid items={items} columns="repeat(auto-fill, minmax(160px, 1fr))" />
      <SymbolEnrichment pack={pack} what="arrow symbols" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/arrows",label:"All Arrow Details"},{href:"/symbols/technical",label:"Technical Symbols"},{href:"/checkmark",label:"✓ Check Marks"},{href:"/symbols",label:"All Symbols"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
      <RelatedLinks links={relatedForSymbol("arrows")} heading="Related symbols & tools" />
    </div>
  );
}
