// Slug-addressable wrapper over the merged kaomoji set.
// `src/data/kaomoji.ts` already merges curated `kaomoji` with `generatedKaomoji`
// (deduped by `id`). This module adds the per-item slug, the slug→record lookup,
// and the by-mood lookup used by /kaomoji/[slug] and the sitemap.

import { kaomoji, type Kaomoji } from "./kaomoji";
import { extraKaomoji } from "./kaomoji-extra";
import { slugify } from "@/lib/slug";

// `isDuplicate` is true for the 2nd, 3rd, ... occurrence of a name. Pages for
// these get `robots: noindex` so Google doesn't treat them as duplicate-canonical
// against the first occurrence (GSC reported `/kaomoji/delighted-2` as such on
// 2026-05-09; ~50 names collide across the corpus).
export type KaomojiWithSlug = Kaomoji & { slug: string; isDuplicate: boolean };

// Single-pass build: append-with-slug, slug→record map, mood→records map.
// Names like "Big Smile" repeat — dedupe by appending -2, -3 to the slug.
const _seen = new Map<string, number>();
const _bySlug = new Map<string, KaomojiWithSlug>();
const _byMood = new Map<string, KaomojiWithSlug[]>();
const _all: KaomojiWithSlug[] = [];

// Existing kaomoji are processed FIRST so their slugs never change; the extra
// curated set (P3) is appended after — any name collision makes the extra the
// `-2` noindex'd duplicate, preserving every existing canonical URL.
for (const k of [...kaomoji, ...extraKaomoji]) {
  const base = slugify(k.name) || k.id;
  const occurrences = (_seen.get(base) ?? 0) + 1;
  _seen.set(base, occurrences);
  const slug = occurrences === 1 ? base : `${base}-${occurrences}`;
  const isDuplicate = occurrences > 1;

  const withSlug: KaomojiWithSlug = { ...k, slug, isDuplicate };
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
