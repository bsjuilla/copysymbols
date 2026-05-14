import { MetadataRoute } from "next";
import { categories, symbols } from "@/data/symbols";
import { emoji } from "@/data/emoji";
import { allKaomoji } from "@/data/all-kaomoji";
import { bullets } from "@/data/collections/bullets";
import { borders } from "@/data/collections/borders";
import { stars } from "@/data/collections/stars";
import { lennyFaces } from "@/data/collections/lenny";
import { emojiCombos } from "@/data/collections/emoji-combos";
import { hearts } from "@/data/collections/hearts";
import { textArt } from "@/data/collections/text-art";
import { bioTemplates } from "@/data/collections/bio-templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.copychars.com";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/emoji`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/kaomoji`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/text-art`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/fancy-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/text-repeater`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    // Blog index
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    // NOTE: /community and /search are intentionally OMITTED.
    //   /community  — empty user-content page (~40 words live content); excluded
    //                 to avoid "Crawled — currently not indexed" noise.
    //                 Page itself sets robots: { index: false } as belt-and-braces.
    //   /search     — robots.ts disallows /search and the page sets index:false.
    // Mega pages
    { url: `${base}/hearts`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/stars`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/borders`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/lenny-face`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/bullet-points`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/bio-templates`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/emoji-combos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/bio-builder`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    // Tools
    { url: `${base}/small-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/superscript-generator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/strikethrough-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/aesthetic-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/mirror-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbol-builder`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    // NEW — Dedicated symbol pages
    { url: `${base}/checkmark`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/degree-symbol`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/infinity-symbol`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/pi-symbol`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/copyright-symbol`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/arrow-symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/flower-symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/sparkle-symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/smiley-face-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/number-symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    // Platform pages — OMITTED until the /symbols-for/[platform] routes are built.
    // These returned 404 when present in the sitemap (no page.tsx files exist yet).
    // Blog — original
    { url: `${base}/blog/how-to-type-copyright`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/currency-symbols-list`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/trademark-vs-registered`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/greek-alphabet-list`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/instagram-bio-lines`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    // Blog — new
    { url: `${base}/blog/check-mark-symbol`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/degree-symbol-copy-paste`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/infinity-symbol`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/arrow-symbols-list`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/star-symbols`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/heart-symbols`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/discord-symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/blog/instagram-symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/blog/math-symbols-list`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/blog/bullet-point-copy-paste`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
  ];

  const categoryPages = categories.map(cat => ({
    url: `${base}/symbols/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const symbolPages = symbols.map(s => ({
    url: `${base}/symbol/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const emojiPages = emoji.map(e => ({
    url: `${base}/emoji/${e.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Skip duplicate-named kaomoji (-2, -3 slug suffixes) — they're noindex'd
  // at the page level (see /kaomoji/[slug]/page.tsx) to stop Google reporting
  // them as duplicate canonical (GSC 2026-05-09: /kaomoji/delighted-2).
  const kaomojiPages = allKaomoji
    .filter(k => !k.isDuplicate)
    .map(k => ({
      url: `${base}/kaomoji/${k.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  // Per-bullet-point SSG pages (introduced 2026-05-11). Rich per-item content
  // at /bullet-points/<slug> — each entry has ~400 words of templated-but-
  // item-specific content to avoid the thin-page indexing problem.
  const bulletPages = bullets.map(b => ({
    url: `${base}/bullet-points/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Per-border SSG pages (introduced 2026-05-11). Same rich-page strategy
  // as bullets — full body content per divider for indexability.
  const borderPages = borders.map(b => ({
    url: `${base}/borders/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const starPages = stars.map(s => ({
    url: `${base}/stars/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const lennyPages = lennyFaces.map(l => ({
    url: `${base}/lenny-face/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const comboPages = emojiCombos.map(c => ({
    url: `${base}/emoji-combos/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const heartPages = hearts.map(h => ({
    url: `${base}/hearts/${h.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const textArtPages = textArt.map(t => ({
    url: `${base}/text-art/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const bioTemplatePages = bioTemplates.map(b => ({
    url: `${base}/bio-templates/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dedupe by URL — generated-symbols.ts can contain duplicate `id` values
  // that would otherwise emit the same /symbol/<id> URL many times.
  const all = [
    ...staticPages,
    ...categoryPages,
    ...symbolPages,
    ...emojiPages,
    ...kaomojiPages,
    ...bulletPages,
    ...borderPages,
    ...starPages,
    ...lennyPages,
    ...comboPages,
    ...heartPages,
    ...textArtPages,
    ...bioTemplatePages,
  ];
  const seen = new Set<string>();
  return all.filter(entry => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
