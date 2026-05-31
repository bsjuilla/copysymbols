import type { Metadata } from "next";
import Link from "next/link";
import { GAMING_SYMBOL_SETS, GAMING_KINDS, gamingSetsByKind } from "@/data/gaming-symbols";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Gaming Symbols ⚔ Copy & Paste Stylish Name Symbols",
  description: "Copy stylish gaming name symbols for Free Fire, PUBG, BGMI, COD, Valorant and more — plus sword, skull, crown, wing and clan-tag symbols. Ready-made name templates, one click to copy.",
  keywords: ["gaming symbols", "name symbols for games", "stylish symbols copy paste", "gaming name symbols", "clan tag symbols", "free fire name symbols"],
  ...canonical("/gaming-symbols"),
};

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Gaming Symbols", item: `${baseUrl}/gaming-symbols` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Gaming Name Symbols",
      numberOfItems: GAMING_SYMBOL_SETS.length,
      itemListElement: GAMING_SYMBOL_SETS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.kind === "game" ? `${s.name} Name Symbols` : s.name,
        url: `${baseUrl}/gaming-symbols/${s.slug}`,
      })),
    },
  ],
};

export default function GamingSymbolsHub() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
        Gaming Symbols
      </h1>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 40, maxWidth: 840 }}>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
          Gaming symbols are the decorative Unicode characters players paste into in-game names, clan tags and bios — wings ꧁༒☬꧂, swords ⚔, crowns ♛, skulls ☠ and the sweaty ツ tags. Pick your game for symbols and ready-made name templates that fit its name field, or pick a style to grab a themed set. Every symbol is real Unicode, so it pastes anywhere you type your name.
        </p>
        <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.7, margin: "12px 0 0" }}>
          Tip: a few ornate symbols (like the ꧁ ꧂ wings and ༒) render perfectly in your game and on phones, but may show as a box on some Windows desktops — that is just a font gap, the copied character is still correct and shows properly in-game.
        </p>
      </div>

      {GAMING_KINDS.map(kind => {
        const list = gamingSetsByKind(kind.id);
        if (list.length === 0) return null;
        return (
          <section key={kind.id} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
              {kind.label}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 18px" }}>{kind.blurb}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
              {list.map(s => (
                <Link
                  key={s.slug}
                  href={`/gaming-symbols/${s.slug}`}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10, textDecoration: "none", color: "inherit" }}
                >
                  <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>
                    {s.kind === "game" ? `${s.name} name symbols` : s.name}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{s.tagline}</span>
                  <span style={{ fontSize: "1.4rem", color: "var(--text)", letterSpacing: "0.1em", lineHeight: 1.4, marginTop: 2 }}>
                    {s.symbols.slice(0, 6).join(" ")}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
