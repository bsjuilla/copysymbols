import { kaomojiCategories } from "@/data/kaomoji";
import { allKaomoji } from "@/data/all-kaomoji";
import KaomojiPageClient from "./KaomojiPageClient";
import CopyToast from "@/components/CopyToast";
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
      <KaomojiPageClient allKaomoji={allKaomoji} categories={kaomojiCategories} />
    </>
  );
}
