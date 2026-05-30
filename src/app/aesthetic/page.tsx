import type { Metadata } from "next";
import Link from "next/link";
import { AESTHETICS } from "@/data/aesthetics";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Aesthetic Symbols — Coquette, Y2K, Kawaii & More to Copy & Paste",
  description: "Copy and paste aesthetic symbols, kaomoji, dividers and bio templates for Coquette, Y2K, Cottagecore, Kawaii, Goth, Baddie and more. Click to copy instantly.",
  keywords: ["aesthetic symbols", "aesthetic bio copy paste", "coquette symbols", "y2k symbols", "kawaii symbols"],
  ...canonical("/aesthetic"),
};

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Aesthetic Symbols", item: `${baseUrl}/aesthetic` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Aesthetic Symbol Collections",
      itemListElement: AESTHETICS.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${a.name} Aesthetic Symbols`,
        url: `${baseUrl}/aesthetic/${a.slug}`,
      })),
    },
  ],
};

export default function AestheticHubPage() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
        Aesthetic Symbols
      </h1>

      {/* ── DEFINITION BLOCK ────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 40, maxWidth: 760 }}>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
          Aesthetic symbols are decorative Unicode characters — hearts, stars, sparkles, bows, dividers and kaomoji — bundled by trend so your Instagram, TikTok or Discord bio matches a specific vibe. Pick an aesthetic below to copy its signature symbols, kaomoji faces, divider strings and a ready-made bio template. Every character is real Unicode, so it pastes anywhere you write text.
        </p>
      </div>

      {/* ── AESTHETIC CARDS ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {AESTHETICS.map(a => (
          <Link
            key={a.slug}
            href={`/aesthetic/${a.slug}`}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: 10, textDecoration: "none", color: "inherit", transition: "border-color 0.15s" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{a.emoji}</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{a.name} aesthetic symbols</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{a.tagline}</p>
            <div style={{ fontSize: "1.4rem", color: "var(--text)", letterSpacing: "0.12em", lineHeight: 1.4, marginTop: 2 }}>
              {a.symbols.slice(0, 6).join(" ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
