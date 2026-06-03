import { kaomojiCategories } from "@/data/kaomoji";
import { kaomojiTypes } from "@/data/kaomoji-types";
import { allKaomoji } from "@/data/all-kaomoji";
import KaomojiPageClient from "./KaomojiPageClient";
import CopyToast from "@/components/CopyToast";
import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Kaomoji ʕ•ᴥ•ʔ Copy & Paste — Japanese Text Emoticons",
  description: "Copy kaomoji instantly. ¯\\_(ツ)_/¯ (◕‿◕) ʕ•ᴥ•ʔ (╥_╥) — happy, sad, angry, cute, bear faces. 100+ Japanese text emoticons that work everywhere.",
  keywords: ["kaomoji copy paste","japanese emoticons","text faces copy paste","shrug emoticon","(◕‿◕) copy","cute kaomoji","kaomoji japanese"],
  ...canonical("/kaomoji"),
};

export default function KaomojiPage() {
  // JSON-LD: BreadcrumbList + ItemList of kaomoji entries on this page.
  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Kaomoji", item: `${baseUrl}/kaomoji` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Kaomoji — Japanese Text Emoticons",
        description: "Copy-and-paste Japanese kaomoji text emoticons.",
        numberOfItems: allKaomoji.length,
        itemListElement: allKaomoji.slice(0, 100).map((k, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: k.name,
        })),
      },
    ],
  };
  return (
    <>
      <CopyToast />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Browse by mood — hub→spoke links to the per-mood pages (P3). */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
        <div className="section-label" style={{ marginBottom: 10 }}>Browse kaomoji by mood</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {kaomojiCategories.map(c => (
            <Link key={c.id} href={`/kaomoji/mood/${c.id}`} className="cat-pill" style={{ textDecoration: "none" }}>
              {c.icon} {c.name}
            </Link>
          ))}
        </div>

        {/* Browse by style — demand-driven type collections (pout, confident, …). */}
        <div className="section-label" style={{ margin: "22px 0 10px" }}>Browse kaomoji by style</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {kaomojiTypes.map(t => (
            <Link key={t.id} href={`/kaomoji/type/${t.id}`} className="cat-pill" style={{ textDecoration: "none" }}>
              {t.hero} {t.name}
            </Link>
          ))}
        </div>
      </div>
      <KaomojiPageClient allKaomoji={allKaomoji} categories={kaomojiCategories} />
    </>
  );
}
