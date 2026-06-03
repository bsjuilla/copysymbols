import { MetadataRoute } from "next";
import { categories, symbols } from "@/data/symbols";
import { emoji } from "@/data/emoji";
import { allKaomoji } from "@/data/all-kaomoji";
import { kaomojiCategories } from "@/data/kaomoji";
import { kaomojiTypes } from "@/data/kaomoji-types";
import { bullets } from "@/data/collections/bullets";
import { borders } from "@/data/collections/borders";
import { stars } from "@/data/collections/stars";
import { lennyFaces } from "@/data/collections/lenny";
import { emojiCombos, comboThemes } from "@/data/collections/emoji-combos";
import { EMOJI_MEANINGS } from "@/data/emoji-meanings";
import { hearts } from "@/data/collections/hearts";
import { textArt } from "@/data/collections/text-art";
import { bioTemplates } from "@/data/collections/bio-templates";
import { platformIds } from "@/data/collections/platforms";
import { STYLES as fancyTextStyles } from "@/lib/fancy-text-styles";
import { translators } from "@/lib/translators";
import { AESTHETICS } from "@/data/aesthetics";
import { FLAGS } from "@/data/flags";
import { GAMING_SYMBOL_SETS } from "@/data/gaming-symbols";
import { SCRIPTS } from "@/data/scripts";
import { SEASONS } from "@/data/seasonal";

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
// Stable per-deploy `lastmod`. Previously `new Date()` made every URL look
// freshly modified on every crawl, which Google ignores as a quality signal
// (and can downgrade the whole sitemap). Bump SITEMAP_FALLBACK_DATE manually
// when content materially changes, or set BUILD_DATE in the deploy env so
// every deploy carries the build date as lastmod. (Audit section 7.2.)
const SITEMAP_FALLBACK_DATE = "2026-05-28T00:00:00Z";
const SITEMAP_LAST_MODIFIED = process.env.BUILD_DATE
  ? new Date(process.env.BUILD_DATE)
  : new Date(SITEMAP_FALLBACK_DATE);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = SITEMAP_LAST_MODIFIED;

  const all: MetadataRoute.Sitemap = [
    // ---- Static top-level routes -----------------------------------------
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/emoji`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Timely Unicode 17.0 / Emoji 17.0 land-grab page (shipped iOS 26.4, Mar 2026).
    { url: `${BASE}/new-emoji-2026`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/kaomoji`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Country flag emoji hub (spokes at /flag/<country>).
    { url: `${BASE}/flags`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Gaming name symbols hub (spokes at /gaming-symbols/<slug>).
    { url: `${BASE}/gaming-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Alphabets & scripts hub (spokes at /alphabets/<slug>).
    { url: `${BASE}/alphabets`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Seasonal / holiday symbols hub (spokes at /seasonal/<occasion>).
    { url: `${BASE}/seasonal`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/text-art`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/fancy-text`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/text-repeater`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Blog index
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // How-to guide (P4, AEO HowTo schema)
    { url: `${BASE}/how-to-copy-paste`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
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
    { url: `${BASE}/couple-bio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/emoji-combos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/community-combos`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    // Emoji meaning dictionary (hub + per-entry "what does X mean" pages).
    { url: `${BASE}/emoji-meanings`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...EMOJI_MEANINGS.map((e) => ({
      url: `${BASE}/emoji-meanings/${e.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
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
    { url: `${BASE}/roman-numerals`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/uwu-translator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/runes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/render-test`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/game-name-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Per-game stylish-name landing pages (wired to the validator above).
    { url: `${BASE}/free-fire-name`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/bgmi-name`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/fortnite-name`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/valorant-name`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/roblox-name`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/discord-name`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // NEW (audit pass 2 Task 4) — text decorator tool
    { url: `${BASE}/text-decorator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // NEW (audit pass 3 Task 2) — translator index page (children at /translate/<id>)
    { url: `${BASE}/translate`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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
    // Blog — 2026-06 content push (original long-form guides)
    { url: `${BASE}/blog/aesthetic-instagram-bio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/zodiac-signs-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/discord-fonts`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/tiktok-username-symbols`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/heart-emoji-meanings`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/em-dash`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/aesthetic-emoji-combos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/cool-username-ideas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog/what-is-kaomoji`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // New tool — Discord timestamp generator
    { url: `${BASE}/discord-timestamp`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

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

    // ---- /symbol/<slug> for curated symbols only -------------------------
    // gen-* slugs are intentionally excluded: src/app/symbol/[slug]/page.tsx
    // emits robots:{ index:false } for them, so listing them in the sitemap
    // submits ~270 noindex'd URLs to Google and trains it to discount the
    // whole sitemap as a quality signal. GSC 2026-05-28 "Excluded by
    // 'noindex' tag" report confirms this was happening. The /symbol/[slug]
    // route still builds gen-* pages so existing inbound links keep working;
    // they just aren't advertised.
    ...curatedSymbols.map(s => ({
      url: `${BASE}/symbol/${s.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // ---- /symbol/<slug>/in-<platform> cross matrix — ROUTE DELETED -----------
    // These ~1,300 "<symbol> for <platform>" pages were near-duplicate thin
    // content AND the route (a partial-segment `in-[platform]` folder) 404'd
    // under Next 16, so they were both removed from this sitemap and the route
    // deleted; old URLs now 308-redirect to the base /symbol/<slug> page
    // (next.config.ts). Crawl budget goes to the base symbol pages + the rich
    // /symbols-for/<platform> hubs, which own these intents.

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
    // ---- /emoji-combos/theme/<theme> collection pages (demand-driven) ----
    ...comboThemes.map(t => ({
      url: `${BASE}/emoji-combos/theme/${t.id.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
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

    // ---- Aesthetic / trend collection pages (P2) -------------------------
    { url: `${BASE}/aesthetic`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...AESTHETICS.map(a => ({
      url: `${BASE}/aesthetic/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // ---- /kaomoji/mood/<mood> spoke pages (P3) ---------------------------
    ...kaomojiCategories.map(c => ({
      url: `${BASE}/kaomoji/mood/${c.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // ---- /kaomoji/type/<type> style collection pages (demand-driven) -----
    ...kaomojiTypes.map(t => ({
      url: `${BASE}/kaomoji/type/${t.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // ---- /flag/<country> per-country flag pages (249 ISO 3166-1) ---------
    ...FLAGS.map(f => ({
      url: `${BASE}/flag/${f.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // ---- /gaming-symbols/<slug> spoke pages (games + styles) -------------
    ...GAMING_SYMBOL_SETS.map(s => ({
      url: `${BASE}/gaming-symbols/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // ---- /alphabets/<slug> script pages ---------------------------------
    ...SCRIPTS.map(s => ({
      url: `${BASE}/alphabets/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // ---- /seasonal/<occasion> holiday pages -----------------------------
    ...SEASONS.map(s => ({
      url: `${BASE}/seasonal/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
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
