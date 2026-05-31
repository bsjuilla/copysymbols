import type { Metadata } from "next";
import Link from "next/link";
import { SEASONS } from "@/data/seasonal";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Seasonal Symbols & Emojis — Halloween, Christmas, Valentine's & More",
  description: "Copy and paste seasonal & holiday emojis and symbols — Halloween 🎃, Christmas 🎄, Valentine's ❤️, New Year 🎉, Easter 🐰, Thanksgiving 🦃 and St. Patrick's ☘️. Ready-made combos, one click to copy.",
  keywords: ["seasonal symbols", "holiday emojis copy paste", "halloween emojis", "christmas symbols", "valentines day emojis", "holiday symbols copy paste"],
  ...canonical("/seasonal"),
};

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Seasonal", item: `${baseUrl}/seasonal` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Seasonal & Holiday Symbols",
      numberOfItems: SEASONS.length,
      itemListElement: SEASONS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${s.name} Symbols`,
        url: `${baseUrl}/seasonal/${s.slug}`,
      })),
    },
  ],
};

export default function SeasonalHub() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-label">Copy &amp; Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
        Seasonal Symbols
      </h1>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 40, maxWidth: 820 }}>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
          Copy and paste emojis and symbols for every holiday — pumpkins and ghosts for Halloween, trees and snowflakes for Christmas, hearts for Valentine&apos;s, fireworks for New Year and more. Pick an occasion below for its full symbol set and ready-made combos. Every character is real Unicode, so it pastes into bios, captions, cards and messages anywhere.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {SEASONS.map(s => (
          <Link
            key={s.slug}
            href={`/seasonal/${s.slug}`}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "inherit" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "1.9rem", lineHeight: 1 }}>{s.emoji}</span>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{s.dateLabel}</div>
              </div>
            </div>
            <div style={{ fontSize: "1.5rem", color: "var(--text)", letterSpacing: "0.04em", lineHeight: 1.4, marginTop: 2 }}>
              {s.symbols.slice(0, 7).join(" ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
