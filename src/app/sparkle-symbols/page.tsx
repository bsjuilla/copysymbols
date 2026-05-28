import type { Metadata } from "next";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Sparkle Symbols ✨ ✦ ⭐ Copy & Paste — Star Sparkles",
  description: "Copy sparkle and star symbols instantly. ✨ ✦ ✧ ⭐ 🌟 💫 ✶ — aesthetic sparkles for Instagram bios, captions, and social media.",
  ...canonical("/sparkle-symbols"),
};

const items = [
  { symbol: "✨", name: "Sparkles" },
  { symbol: "⭐", name: "Star" },
  { symbol: "🌟", name: "Glowing Star" },
  { symbol: "💫", name: "Dizzy" },
  { symbol: "✦", name: "Black Four Pointed Star" },
  { symbol: "✧", name: "White Four Pointed Star" },
  { symbol: "✶", name: "Six Pointed Black Star" },
  { symbol: "✷", name: "Six Pointed Pinwheel Star" },
  { symbol: "✸", name: "Eight Pointed Black Star" },
  { symbol: "✹", name: "Eight Pointed Stress Star" },
  { symbol: "✺", name: "Eight Pointed Star" },
  { symbol: "❇", name: "Sparkle" },
  { symbol: "❈", name: "Heavy Sparkle" },
  { symbol: "✴", name: "Eight Pointed Star" },
  { symbol: "⋆", name: "Star Operator" },
  { symbol: "⁂", name: "Asterism" },
  { symbol: "★", name: "Black Star" },
  { symbol: "☆", name: "White Star" },
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
        { "@type": "ListItem", position: 3, name: "Sparkle Symbols", item: `${baseUrl}/sparkle-symbols` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Sparkle & Star Symbols",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${it.symbol} ${it.name}`,
      })),
    },
  ],
};

export default function SparkleSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Sparkle Symbols ✨
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any sparkle to copy it. Popular for aesthetic bios, captions, and messages on Instagram, TikTok, and Discord.
      </p>
      <CopySymbolGrid items={items} columns="repeat(auto-fill, minmax(140px, 1fr))" />
    </div>
  );
}
