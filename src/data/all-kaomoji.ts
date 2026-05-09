// Aggregated kaomoji helpers for slug-addressable per-item routes.
//
// `src/data/kaomoji.ts` already merges the curated `kaomoji` array with
// `generatedKaomoji` (deduped by `id`). This module re-exports that merged
// list and adds slug helpers used by /kaomoji/[slug] and the sitemap.

import { kaomoji, type Kaomoji } from "./kaomoji";

/**
 * Deterministic slugifier for kaomoji names. Lowercase, hyphen-separated,
 * non-alphanumerics collapsed. Same shape as slugifyEmoji.
 */
export function slugifyKaomoji(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type KaomojiWithSlug = Kaomoji & { slug: string };

// Build the slug list once at module load. Names like "Big Smile" are not
// unique across the data set (the bot emits many "Cute Bounce", "Sad Cry",
// etc.) so we dedupe by appending a counter (-2, -3, ...) the same way
// the emoji extractor does.
const _seen = new Map<string, number>();
const _allKaomoji: KaomojiWithSlug[] = [];
for (const k of kaomoji) {
  const base = slugifyKaomoji(k.name) || k.id; // fall back to id if name is empty
  let slug: string;
  if (_seen.has(base)) {
    const n = (_seen.get(base) ?? 1) + 1;
    _seen.set(base, n);
    slug = `${base}-${n}`;
  } else {
    _seen.set(base, 1);
    slug = base;
  }
  _allKaomoji.push({ ...k, slug });
}

export const allKaomoji: KaomojiWithSlug[] = _allKaomoji;

const _bySlug = new Map<string, KaomojiWithSlug>(allKaomoji.map((k) => [k.slug, k]));

export function getKaomojiBySlug(slug: string): KaomojiWithSlug | undefined {
  return _bySlug.get(slug);
}

export function getKaomojiByMood(mood: string): KaomojiWithSlug[] {
  return allKaomoji.filter((k) => k.mood === mood);
}
