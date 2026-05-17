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
import { platformIds } from "@/data/collections/platforms";
import { STYLES as fancyTextStyles } from "@/lib/fancy-text-styles";
import { translators } from "@/lib/translators";

const BASE = "https://www.copychars.com";

// curated = the hand-authored symbols; excludes the gen-* slugs from
// generated-symbols.ts. The cross matrix /symbol/<slug>/in-<platform> is
// only built for curated symbols (matches generateStaticParams in the page).
const curatedSymbols = symbols.filter(s => !s.id.startsWith("gen-"));

// Next 16 multi-sitemap mechanism: generateSitemaps() returns the family
// list, and the default export receives { id: Promise<string> } and returns
// only that family's URLs. Output paths are /sitemap/<id>.xml plus the
// auto-generated /sitemap.xml index pointing at each child.
//
// id was a number/string in <=15 and became Promise<string> in v16
// (see node_modules/next/dist/docs/.../sitemap.md version history).
export async function generateSitemaps() {
  return [
    { id: "static" },
    { id: "symbols" },
    { id: "emoji" },
    { id: "kaomoji" },
    { id: "collections" },
    { id: "new-tools" },
  ];
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  switch (id) {
    case "static":
      return dedupe(staticSitemap());
    case "symbols":
      return dedupe(symbolsSitemap());
    case "emoji":
      return dedupe(emojiSitemap());
    case "kaomoji":
      return dedupe(kaomojiSitemap());
    case "collections":
      return dedupe(collectionsSitemap());
    case "new-tools":
      return dedupe(newToolsSitemap());
    default:
      return [];
  }
}

// -----------------------------------------------------------------------------
// Family: static — top-level routes, tool pages, blog posts, legal pages,
// dedicated symbol landing pages, and the /symbols-for/<platform> hub pages.
// -----------------------------------------------------------------------------
function staticSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/emoji`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kaomoji`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/text-art`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/fancy-text`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/text-repeater`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Blog index
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // NOTE: /community and /search are intentionally OMITTED.
    //   /community  — empty user-content page (~40 words live content); excluded
    //                 to avoid "Crawled — currently not indexed" noise.
    //                 Page itself sets robots: { index: false } as belt-and-braces.
    //   /search     — robots.ts disallows /search and the page sets index:false.
    // Mega pages
    { url: `${BASE}/hearts`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/stars`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/borders`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/lenny-face`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/bullet-points`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bio-templates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/emoji-combos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/bio-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Tools
    { url: `${BASE}/small-text`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/superscript-generator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/strikethrough-text`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/aesthetic-text`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/mirror-text`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/symbol-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/character-counter`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/upside-down-text`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/zalgo-text`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/invisible-character`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/username-generator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/morse-code`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/binary-translator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // NEW (audit pass 2 Task 4) — text decorator tool
    { url: `${BASE}/text-decorator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Legal pages — low priority for SEO but needed in sitemap for completeness
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // Dedicated symbol pages
    { url: `${BASE}/checkmark`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/degree-symbol`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/infinity-symbol`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pi-symbol`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/copyright-symbol`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/arrow-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/flower-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/sparkle-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/smiley-face-text`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/number-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Blog — original
    { url: `${BASE}/blog/how-to-type-copyright`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/blog/currency-symbols-list`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/blog/trademark-vs-registered`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/blog/greek-alphabet-list`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/blog/instagram-bio-lines`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Blog — new
    { url: `${BASE}/blog/check-mark-symbol`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/degree-symbol-copy-paste`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/infinity-symbol`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/arrow-symbols-list`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/star-symbols`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/heart-symbols`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/discord-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/instagram-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/math-symbols-list`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog/bullet-point-copy-paste`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  // /symbols-for/<platform> hub pages (introduced audit pass 1).
  const platformPages: MetadataRoute.Sitemap = platformIds.map(p => ({
    url: `${BASE}/symbols-for/${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...platformPages];
}

// -----------------------------------------------------------------------------
// Family: symbols — category indexes, per-symbol pages, the new cross matrix
// /symbol/<slug>/in-<platform>, and fancy-text style sub-pages.
// -----------------------------------------------------------------------------
function symbolsSitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE}/symbols/${cat.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const symbolPages: MetadataRoute.Sitemap = symbols.map(s => ({
    url: `${BASE}/symbol/${s.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // NEW (audit pass 2 Task 5) — /symbol/<slug>/in-<platform> cross matrix.
  // Built only from curated symbols (gen-* slugs are excluded; matches the
  // page's generateStaticParams). ~curatedSymbols.length × platformIds.length.
  const crossMatrixPages: MetadataRoute.Sitemap = curatedSymbols.flatMap(s =>
    platformIds.map(p => ({
      url: `${BASE}/symbol/${s.id}/in-${p}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  );

  // Per-style fancy-text sub-pages.
  const fancyTextStylePages: MetadataRoute.Sitemap = fancyTextStyles.map(s => ({
    url: `${BASE}/fancy-text/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...categoryPages, ...symbolPages, ...crossMatrixPages, ...fancyTextStylePages];
}

// -----------------------------------------------------------------------------
// Family: emoji — per-emoji pages.
// -----------------------------------------------------------------------------
function emojiSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return emoji.map(e => ({
    url: `${BASE}/emoji/${e.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
}

// -----------------------------------------------------------------------------
// Family: kaomoji — per-kaomoji pages, with duplicates filtered out.
// -----------------------------------------------------------------------------
function kaomojiSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Skip duplicate-named kaomoji (-2, -3 slug suffixes) — they're noindex'd
  // at the page level (see /kaomoji/[slug]/page.tsx) to stop Google reporting
  // them as duplicate canonical (GSC 2026-05-09: /kaomoji/delighted-2).
  return allKaomoji
    .filter(k => !k.isDuplicate)
    .map(k => ({
      url: `${BASE}/kaomoji/${k.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    }));
}

// -----------------------------------------------------------------------------
// Family: collections — per-item pages for bullets, borders, stars, lenny
// faces, emoji combos, hearts, text art, bio templates.
// -----------------------------------------------------------------------------
function collectionsSitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Per-bullet-point SSG pages (introduced 2026-05-11). Rich per-item content
  // at /bullet-points/<slug> — each entry has ~400 words of templated-but-
  // item-specific content to avoid the thin-page indexing problem.
  const bulletPages: MetadataRoute.Sitemap = bullets.map(b => ({
    url: `${BASE}/bullet-points/${b.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Per-border SSG pages (introduced 2026-05-11). Same rich-page strategy
  // as bullets — full body content per divider for indexability.
  const borderPages: MetadataRoute.Sitemap = borders.map(b => ({
    url: `${BASE}/borders/${b.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const starPages: MetadataRoute.Sitemap = stars.map(s => ({
    url: `${BASE}/stars/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const lennyPages: MetadataRoute.Sitemap = lennyFaces.map(l => ({
    url: `${BASE}/lenny-face/${l.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = emojiCombos.map(c => ({
    url: `${BASE}/emoji-combos/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const heartPages: MetadataRoute.Sitemap = hearts.map(h => ({
    url: `${BASE}/hearts/${h.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const textArtPages: MetadataRoute.Sitemap = textArt.map(t => ({
    url: `${BASE}/text-art/${t.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const bioTemplatePages: MetadataRoute.Sitemap = bioTemplates.map(b => ({
    url: `${BASE}/bio-templates/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...bulletPages,
    ...borderPages,
    ...starPages,
    ...lennyPages,
    ...comboPages,
    ...heartPages,
    ...textArtPages,
    ...bioTemplatePages,
  ];
}

// -----------------------------------------------------------------------------
// Family: new-tools — the /translate/<pair> family (audit pass 2 Task 3).
// Kept in its own sitemap so future translator additions don't churn the
// large symbols sitemap.
// -----------------------------------------------------------------------------
function newToolsSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return translators.map(t => ({
    url: `${BASE}/translate/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}

// -----------------------------------------------------------------------------
// Helper: dedupe by URL.
// generated-symbols.ts can contain duplicate `id` values that would otherwise
// emit the same /symbol/<id> URL many times; we also dedupe defensively in
// every family in case future data sources overlap.
// -----------------------------------------------------------------------------
function dedupe(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter(entry => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
