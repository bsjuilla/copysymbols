// Test: the cross-silo internal-linking layer (src/lib/related.ts).
//
// Guards the SEO contract these links exist to enforce:
//   1. A curated symbol page links across ALL adjacent silos + the platform hubs
//      (/symbols-for/<platform> — the old per-symbol /in-<platform> spokes were
//      removed; that route was a Next-16-broken partial segment that 404'd).
//   2. Every anchor is descriptive — never "more" / "click here" / "read more".
//   3. No duplicate hrefs survive dedupe.
//   4. Emoji / kaomoji detail pages reach their expected cross-silo + tool hubs.
//
// No test framework is configured in this repo — plain imports, throw on
// failure, console.log on pass. Run with: npx tsx src/lib/related.test.ts
import { relatedForSymbol, relatedForEmoji, relatedForKaomoji, type RelatedLink } from "./related";

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

function hrefs(links: RelatedLink[]): string[] {
  return links.map(l => l.href);
}

function assertIncludesAll(links: RelatedLink[], expected: string[], label: string): void {
  const set = new Set(hrefs(links));
  for (const href of expected) {
    assert(set.has(href), `${label}: expected href "${href}" to be present, got [${hrefs(links).join(", ")}]`);
  }
}

function assertNoDuplicateHrefs(links: RelatedLink[], label: string): void {
  const seen = new Set<string>();
  for (const h of hrefs(links)) {
    assert(!seen.has(h), `${label}: duplicate href "${h}"`);
    seen.add(h);
  }
}

const BANNED_LABELS = ["more", "click here", "read more"];

function assertDescriptiveAnchors(links: RelatedLink[], label: string): void {
  for (const l of links) {
    assert(l.label.trim().length > 0, `${label}: empty label for href "${l.href}"`);
    const lower = l.label.trim().toLowerCase();
    assert(!BANNED_LABELS.includes(lower), `${label}: non-descriptive anchor "${l.label}" for href "${l.href}"`);
  }
}

// ── 1. Curated symbol page links across all adjacent silos + platform hubs ────
const heart = relatedForSymbol("shapes");
assertIncludesAll(
  heart,
  [
    "/symbols/zodiac",
    "/symbols/weather",
    "/stars",
    "/hearts",
    "/emoji",
    "/kaomoji",
    "/fancy-text",
    "/bio-templates",
    "/symbols-for/instagram",
    "/symbols-for/tiktok",
    "/symbols-for/discord",
  ],
  "relatedForSymbol(shapes)",
);

// ── 2 + 3. Descriptive anchors + dedupe across every result ──────────────────
const allResults: { label: string; links: RelatedLink[] }[] = [
  { label: "relatedForSymbol(shapes)", links: heart },
  { label: "relatedForEmoji()", links: relatedForEmoji() },
  { label: "relatedForKaomoji()", links: relatedForKaomoji() },
];
for (const { label, links } of allResults) {
  assertDescriptiveAnchors(links, label);
  assertNoDuplicateHrefs(links, label);
}

// ── 5. Emoji + kaomoji hubs ──────────────────────────────────────────────────
assertIncludesAll(
  relatedForEmoji(),
  ["/emoji-combos", "/kaomoji", "/symbols", "/symbols-for/instagram"],
  "relatedForEmoji()",
);
assertIncludesAll(
  relatedForKaomoji(),
  ["/lenny-face", "/emoji-combos", "/username-generator"],
  "relatedForKaomoji()",
);

console.log("related.ts tests passed");
