// Slug-addressable wrapper over the merged kaomoji set.
// `src/data/kaomoji.ts` already merges curated `kaomoji` with `generatedKaomoji`
// (deduped by `id`). This module adds the per-item slug, the slug→record lookup,
// and the by-mood lookup used by /kaomoji/[slug] and the sitemap.

import { kaomoji, type Kaomoji } from "./kaomoji";
import { slugify } from "@/lib/slug";

export type KaomojiWithSlug = Kaomoji & { slug: string };

// Single-pass build: append-with-slug, slug→record map, mood→records map.
// Names like "Big Smile" repeat — dedupe by appending -2, -3 to the slug.
const _seen = new Map<string, number>();
const _bySlug = new Map<string, KaomojiWithSlug>();
const _byMood = new Map<string, KaomojiWithSlug[]>();
const _all: KaomojiWithSlug[] = [];

for (const k of kaomoji) {
  const base = slugify(k.name) || k.id;
  const occurrences = (_seen.get(base) ?? 0) + 1;
  _seen.set(base, occurrences);
  const slug = occurrences === 1 ? base : `${base}-${occurrences}`;

  const withSlug: KaomojiWithSlug = { ...k, slug };
  _all.push(withSlug);
  _bySlug.set(slug, withSlug);

  const moodList = _byMood.get(k.mood);
  if (moodList) moodList.push(withSlug);
  else _byMood.set(k.mood, [withSlug]);
}

export const allKaomoji: KaomojiWithSlug[] = _all;

export function getKaomojiBySlug(slug: string): KaomojiWithSlug | undefined {
  return _bySlug.get(slug);
}

export function getKaomojiByMood(mood: string): KaomojiWithSlug[] {
  return _byMood.get(mood) ?? [];
}

export const slugifyKaomoji = slugify;
