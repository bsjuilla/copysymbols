// Cross-silo internal-linking layer (P0).
//
// Every detail template historically linked only WITHIN its own type
// (emoji→emoji, kaomoji→kaomoji, symbol→same-category). That leaves each
// content silo orphaned from the others, which caps topical authority and
// keeps deep pages buried (GSC: avg position ~47). This module produces a
// deduped set of *descriptive-anchor* contextual links that connect a detail
// page to adjacent silos, hub pages, relevant tools, and — for curated
// symbols — their own /symbol/<slug>/in-<platform> spoke pages.
//
// Pure + deterministic (build-time safe). No React, no data-file imports —
// callers pass the few primitives needed, so this stays decoupled and
// trivially testable.

export interface RelatedLink {
  href: string;
  /** Descriptive anchor text — never "click here" / "more". */
  label: string;
}

// ── Symbol category → 2 thematically adjacent categories ────────────────────
const SYMBOL_CATEGORY_AFFINITY: Record<string, string[]> = {
  arrows: ["shapes", "technical"],
  currency: ["math", "legal"],
  math: ["greek", "superscript"],
  greek: ["math", "technical"],
  legal: ["currency", "punctuation"],
  shapes: ["zodiac", "weather"],
  punctuation: ["legal", "ui"],
  music: ["shapes", "zodiac"],
  chess: ["shapes", "ui"],
  zodiac: ["weather", "shapes"],
  weather: ["zodiac", "shapes"],
  technical: ["math", "ui"],
  superscript: ["math", "greek"],
  ui: ["technical", "punctuation"],
};

const SYMBOL_CATEGORY_NAME: Record<string, string> = {
  arrows: "Arrow Symbols",
  currency: "Currency Symbols",
  math: "Math Symbols",
  greek: "Greek Letters",
  legal: "Legal & Trade Symbols",
  shapes: "Shapes & Stars",
  punctuation: "Punctuation Symbols",
  music: "Music Symbols",
  chess: "Chess & Game Symbols",
  zodiac: "Zodiac Symbols",
  weather: "Weather Symbols",
  technical: "Technical Symbols",
  superscript: "Superscript & Subscript",
  ui: "UI Symbols",
};

// ── Symbol category → hand-picked tool / collection destinations ────────────
const SYMBOL_CATEGORY_DESTINATIONS: Record<string, RelatedLink[]> = {
  arrows: [{ href: "/symbol-builder", label: "Build arrow combos in Symbol Builder" }],
  currency: [{ href: "/blog/currency-symbols-list", label: "All Currency Symbols guide" }],
  math: [
    { href: "/pi-symbol", label: "Pi Symbol π" },
    { href: "/infinity-symbol", label: "Infinity Symbol ∞" },
  ],
  greek: [{ href: "/blog/greek-alphabet-list", label: "Greek Alphabet list" }],
  legal: [
    { href: "/copyright-symbol", label: "Copyright Symbol ©" },
    { href: "/blog/trademark-vs-registered", label: "™ vs ® vs © explained" },
  ],
  shapes: [
    { href: "/stars", label: "Star Symbols ★" },
    { href: "/hearts", label: "Heart Symbols ♥" },
    { href: "/borders", label: "Aesthetic Borders" },
  ],
  punctuation: [{ href: "/bullet-points", label: "Bullet Point Symbols" }],
  music: [{ href: "/emoji-combos", label: "Music Emoji Combos" }],
  chess: [{ href: "/symbol-builder", label: "Symbol Builder" }],
  zodiac: [{ href: "/bio-templates", label: "Zodiac Bio Templates" }],
  weather: [{ href: "/emoji-combos", label: "Weather Emoji Combos" }],
  technical: [{ href: "/checkmark", label: "Checkmark Symbols ✓" }],
  superscript: [{ href: "/small-text", label: "Small Text Generator" }],
  ui: [{ href: "/checkmark", label: "Checkmark Symbols ✓" }],
};

// Top platforms surfaced as contextual spokes (order = priority).
const TOP_PLATFORMS: { id: string; name: string }[] = [
  { id: "instagram", name: "Instagram" },
  { id: "tiktok", name: "TikTok" },
  { id: "discord", name: "Discord" },
];

// Always-useful destinations shared across detail types.
const UNIVERSAL_TOOLS: RelatedLink[] = [
  { href: "/fancy-text", label: "Fancy Text Generator" },
  { href: "/bio-templates", label: "Bio Templates" },
  { href: "/render-test", label: "Symbol & Emoji Render Test" },
];

function dedupeCap(links: RelatedLink[], cap = 18): RelatedLink[] {
  const seen = new Set<string>();
  const out: RelatedLink[] = [];
  for (const l of links) {
    if (seen.has(l.href)) continue;
    seen.add(l.href);
    out.push(l);
    if (out.length >= cap) break;
  }
  return out;
}

/**
 * Contextual links for a /symbol/<id> detail page.
 * @param category symbol category id (e.g. "shapes")
 * @param id       symbol slug; gen-* slugs are noindex so they skip platform spokes
 */
export function relatedForSymbol(category: string, id: string): RelatedLink[] {
  const links: RelatedLink[] = [];

  // Adjacent symbol categories (sibling spokes).
  for (const cat of SYMBOL_CATEGORY_AFFINITY[category] ?? []) {
    const name = SYMBOL_CATEGORY_NAME[cat];
    if (name) links.push({ href: `/symbols/${cat}`, label: name });
  }

  // Hand-picked tools / collections for this category.
  links.push(...(SYMBOL_CATEGORY_DESTINATIONS[category] ?? []));

  // Cross-silo hubs.
  links.push(
    { href: "/emoji", label: "Emoji" },
    { href: "/kaomoji", label: "Kaomoji" },
  );
  links.push(...UNIVERSAL_TOOLS);

  // Platform spokes — link the hub down to its own cross-matrix pages.
  // Only for curated (indexable) symbols; gen-* pages are noindex.
  if (!id.startsWith("gen-")) {
    for (const p of TOP_PLATFORMS) {
      links.push({ href: `/symbol/${id}/in-${p.id}`, label: `Use this symbol on ${p.name}` });
    }
  }

  return dedupeCap(links);
}

/** Contextual links for an /emoji/<id> detail page. */
export function relatedForEmoji(): RelatedLink[] {
  return dedupeCap([
    { href: "/emoji-combos", label: "Emoji Combos" },
    { href: "/community-combos", label: "Community Combos" },
    { href: "/kaomoji", label: "Kaomoji Faces" },
    { href: "/symbols", label: "Symbols & Special Characters" },
    { href: "/aesthetic", label: "Aesthetic Bio Symbols" },
    { href: "/couple-bio", label: "Couple Bio Symbols" },
    { href: "/bio-templates", label: "Bio Templates" },
    { href: "/fancy-text", label: "Fancy Text Generator" },
    { href: "/render-test", label: "Symbol & Emoji Render Test" },
    ...TOP_PLATFORMS.map(p => ({ href: `/symbols-for/${p.id}`, label: `Symbols for ${p.name}` })),
  ]);
}

/** Contextual links for a /flag/<country> detail page. */
export function relatedForFlag(): RelatedLink[] {
  return dedupeCap([
    { href: "/flags", label: "All Country Flag Emoji" },
    { href: "/emoji", label: "Emoji" },
    { href: "/emoji-combos", label: "Emoji Combos" },
    { href: "/aesthetic", label: "Aesthetic Bio Symbols" },
    { href: "/bio-templates", label: "Bio Templates" },
    { href: "/symbols", label: "Symbols & Special Characters" },
    { href: "/fancy-text", label: "Fancy Text Generator" },
    { href: "/render-test", label: "Symbol & Emoji Render Test" },
    ...TOP_PLATFORMS.map(p => ({ href: `/symbols-for/${p.id}`, label: `Symbols for ${p.name}` })),
  ]);
}

/** Contextual links for a /kaomoji/<slug> detail page. */
export function relatedForKaomoji(): RelatedLink[] {
  return dedupeCap([
    { href: "/lenny-face", label: "Lenny Faces ( ͡° ͜ʖ ͡°)" },
    { href: "/emoji-combos", label: "Emoji Combos" },
    { href: "/emoji", label: "Emoji" },
    { href: "/aesthetic", label: "Aesthetic Bio Symbols" },
    { href: "/username-generator", label: "Username Generator" },
    { href: "/bio-templates", label: "Bio Templates" },
    ...TOP_PLATFORMS.map(p => ({ href: `/symbols-for/${p.id}`, label: `Symbols for ${p.name}` })),
  ]);
}
