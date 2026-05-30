import type { Metadata } from "next";
import Link from "next/link";
import { FLAGS, FLAG_REGIONS, flagsByRegion, flagEmoji } from "@/data/flags";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Flag Emoji — Copy & Paste All Country Flags 🏳️",
  description: "Copy and paste every country flag emoji — 249 ISO 3166-1 flags grouped by continent. Click any flag to copy it for Instagram, TikTok, WhatsApp, Discord and more.",
  keywords: ["flag emoji", "country flags copy paste", "flag emoji copy paste", "all country flags", "flag emojis"],
  ...canonical("/flags"),
};

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Flags", item: `${baseUrl}/flags` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Country Flag Emoji",
      numberOfItems: FLAGS.length,
      itemListElement: FLAGS.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${f.name} Flag`,
        url: `${baseUrl}/flag/${f.slug}`,
      })),
    },
  ],
};

export default function FlagsHubPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
        Flag Emoji
      </h1>

      {/* ── DEFINITION BLOCK ────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 24, maxWidth: 820 }}>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
          Copy any country flag emoji with one click. There are <strong style={{ color: "var(--text)" }}>{FLAGS.length} flags</strong> in the Unicode standard — one for every officially-assigned ISO 3166-1 country code. Each flag is built from two <strong style={{ color: "var(--text)" }}>regional indicator symbols</strong> that spell the country code (for example 🇫🇷 is <code style={{ fontFamily: "DM Mono, monospace", color: "var(--teal)" }}>F</code> + <code style={{ fontFamily: "DM Mono, monospace", color: "var(--teal)" }}>R</code>), so they paste anywhere you write text.
        </p>
        <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.7, margin: "12px 0 0" }}>
          Tip: on Windows, flag emoji appear as the two-letter country code (like <code style={{ fontFamily: "DM Mono, monospace" }}>US</code>) instead of a picture — that is a Segoe UI Emoji font limitation, not a mistake. The same character shows a real flag on iPhone, Android, Mac and most browsers.
        </p>
      </div>

      {/* ── REGION JUMP LINKS ───────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {FLAG_REGIONS.map(r => (
          <a key={r} href={`#${r.toLowerCase()}`} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", background: "var(--surface)", textDecoration: "none" }}>
            {r} <span style={{ color: "var(--text3)" }}>({flagsByRegion(r).length})</span>
          </a>
        ))}
      </div>

      {/* ── REGION SECTIONS ─────────────────────────────────────────── */}
      {FLAG_REGIONS.map(region => {
        const list = flagsByRegion(region);
        if (list.length === 0) return null;
        return (
          <section key={region} id={region.toLowerCase()} style={{ marginBottom: 48, scrollMarginTop: 72 }}>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
              {region} <span style={{ fontSize: 14, color: "var(--text3)", fontWeight: 400 }}>({list.length})</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {list.map(f => (
                <Link
                  key={f.slug}
                  href={`/flag/${f.slug}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{flagEmoji(f.a2)}</span>
                  <span className="symbol-name">{f.name}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
