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

// Single flat sitemap served at /sitemap.xml.
//
// Pass 2 Task 6 split this via generateSitemaps() for per-family GSC
// visibility, but Next 16's app/sitemap.ts metadata convention serves only
// children at /sitemap/{id}.xml and leaves /sitemap.xml as 404 (verified
// 2026-05-17). Adding a sibling Route Handler at /sitemap.xml hard-conflicts
// with the metadata file convention. Collapsing back to one flat sitemap
// restores the canonical URL Google has been tracking for months. Total
// URL count (~3,650) is well under Google's 50K per-sitemap limit.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const all: MetadataRoute.Sitemap = [
    // ---- Static top-level routes -----------------------------------------
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

    // ---- /symbols-for/<platform> hub pages (pass 1) ----------------------
    ...platformIds.map(p => ({
      url: `${BASE}/symbols-for/${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // ---- Category indexes ------------------------------------------------
    ...categories.map(c => ({
      url: `${BASE}/symbols/${c.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // ---- /symbol/<slug> for all symbols (curated + gen-*) ----------------
    ...symbols.map(s => ({
      url: `${BASE}/symbol/${s.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // ---- /symbol/<slug>/in-<platform> cross matrix (pass 2 Task 5) -------
    // Built only from curated symbols (gen-* slugs are excluded; matches the
    // page's generateStaticParams). ~curatedSymbols.length × platformIds.length.
    ...curatedSymbols.flatMap(s =>
      platformIds.map(p => ({
        url: `${BASE}/symbol/${s.id}/in-${p}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    ),

    // ---- Per-style fancy-text sub-pages ----------------------------------
    ...fancyTextStyles.map(st => ({
      url: `${BASE}/fancy-text/${st.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // ---- Per-emoji pages -------------------------------------------------
    ...emoji.map(e => ({
      url: `${BASE}/emoji/${e.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // ---- Per-kaomoji pages -----------------------------------------------
    // Skip duplicate-named kaomoji (-2, -3 slug suffixes) — they're noindex'd
    // at the page level (see /kaomoji/[slug]/page.tsx) to stop Google reporting
    // them as duplicate canonical (GSC 2026-05-09: /kaomoji/delighted-2).
    ...allKaomoji
      .filter(k => !k.isDuplicate)
      .map(k => ({
        url: `${BASE}/kaomoji/${k.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),

    // ---- Collections (bullets, borders, stars, lenny, combos, hearts,
    //                  text art, bio templates) --------------------------
    // Per-bullet-point SSG pages (introduced 2026-05-11). Rich per-item content
    // at /bullet-points/<slug> — each entry has ~400 words of templated-but-
    // item-specific content to avoid the thin-page indexing problem.
    ...bullets.map(b => ({
      url: `${BASE}/bullet-points/${b.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    // Per-border SSG pages (introduced 2026-05-11).
    ...borders.map(b => ({
      url: `${BASE}/borders/${b.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...stars.map(s => ({
      url: `${BASE}/stars/${s.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...lennyFaces.map(l => ({
      url: `${BASE}/lenny-face/${l.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...emojiCombos.map(c => ({
      url: `${BASE}/emoji-combos/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...hearts.map(h => ({
      url: `${BASE}/hearts/${h.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...textArt.map(t => ({
      url: `${BASE}/text-art/${t.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...bioTemplates.map(b => ({
      url: `${BASE}/bio-templates/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // ---- Translators (pass 2 Task 3) -------------------------------------
    ...translators.map(t => ({
      url: `${BASE}/translate/${t.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  // Dedup by URL.
  // generated-symbols.ts can contain duplicate `id` values that would otherwise
  // emit the same /symbol/<id> URL many times; also dedupes defensively across
  // every section in case future data sources overlap.
  const seen = new Set<string>();
  return all.filter(entry => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
