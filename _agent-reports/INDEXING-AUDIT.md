# INDEXING AUDIT — copychars.com

Branch: `agent/indexing-fixes` (off main, pre-fix HEAD `78704e9`)
Date: 2026-05-09
Compare URL: https://github.com/bsjuilla/copysymbols/compare/main...agent/indexing-fixes

---

## TL;DR

**Three confirmed root causes for the GSC indexing problems:**

1. **Global canonical in `src/app/layout.tsx` was poisoning every child route.**
   The root layout exported `alternates: { canonical: "https://www.copychars.com" }`.
   In Next.js 16's metadata-merging model, every page that did not declare its
   own `alternates.canonical` inherited this homepage URL. **35 of 50 page.tsx
   files were missing their own canonical** and were therefore advertising the
   homepage as their canonical to Google. This is the dominant cause of both
   "Duplicate without user-selected canonical" (2 pages) and most of the 73
   "Crawled — currently not indexed" (Google de-duped them all to `/`).

2. **Sitemap was emitting duplicate URLs because of duplicate `id` values in
   `src/data/generated-symbols.ts` (Agent 3's territory).** Live
   `sitemap.xml` had **1,108 URLs but only 1,077 unique** — one URL appears
   20 times, another 10 times. We can't fix the source data here, but we now
   dedupe in `sitemap.ts` via a `Set` so Google never sees dupes from us.

3. **Three real routes were absent from the sitemap.** `/blog` exists but
   was missing. `/community` and `/search` are pages but should NOT be
   indexed (thin content / search results) — they remain excluded.

**Things ruled out as causes:**
- **Vercel preview deploy duplicate-indexing** — `copysymbols-one.vercel.app`
  301-redirects to `www.copychars.com` already, so the planned Fix D
  (`proxy.ts` middleware) was unnecessary and was NOT shipped. Note: in Next 16
  the file is `proxy.ts` not `middleware.ts`; if a future preview breaks the
  redirect, that's where to add the noindex header.
- **`robots.ts`** — already correct (`disallow: /search`, points to canonical
  sitemap). No changes needed.

---

## GSC error → fix mapping

| GSC error / status                                | Confirmed cause                                                                                                  | Fix in this PR                                                              |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 73 × "Crawled — currently not indexed"            | Pages inherited homepage canonical → Google saw them as homepage duplicates                                      | Fix A + Fix B: remove root canonical, add per-page canonicals to all 50 pages |
| 2 × "Duplicate without user-selected canonical"   | Same — child pages declared the homepage as their canonical                                                      | Fix A + Fix B                                                               |
| 1 × "Alternate page with proper canonical tag"    | Most likely a `/symbol/<id>` URL that the [slug] route handled but whose canonical pointed to a duplicate symbol's URL | Fix B (dynamic route already had per-slug canonical) + Fix C (dedupe sitemap) |
| ?? × "Discovered — currently not indexed"         | Sitemap dupes (one URL appearing 20×) + thin content + low internal-link density on long-tail pages              | Fix C (dedupe + drop thin community page) + Fix E (JSON-LD signals listing intent) |
| Live sitemap had 1,108 entries / 1,077 unique     | Duplicate `id` values in `src/data/generated-symbols.ts` (out of scope — Agent 3)                                | Fix C: dedupe via `Set` in sitemap.ts                                       |
| `/symbol/heart-1` returns 404 in production       | Live sitemap shipped URLs that don't resolve (data-side issue)                                                   | Mitigated by Fix C dedupe; full fix needs Agent 3                           |

---

## Per-page canonical audit

Status before/after fixes. **All 50 page.tsx files now correctly emit either
their own canonical or a `noindex` directive.**

| Page                                          | Before                                              | After                                          |
| --------------------------------------------- | --------------------------------------------------- | ---------------------------------------------- |
| `/` (`src/app/page.tsx`)                      | literal `https://www.copychars.com` (correct)       | unchanged (kept literal to preserve indexed bare-origin URL) |
| `/symbols`                                    | `canonical("/symbols")` (correct)                   | unchanged                                      |
| `/symbols/[category]`                         | per-slug literal in `generateMetadata` (correct)    | unchanged + JSON-LD added                      |
| `/symbol/[slug]`                              | per-slug literal in `generateMetadata` (correct)    | unchanged + JSON-LD added                      |
| `/symbols-for/[platform]`                     | `canonical(\`/symbols-for/${platform}\`)` (correct) | unchanged                                      |
| `/blog`                                       | `canonical("/blog")` (correct)                      | unchanged + sitemap entry added                |
| `/borders`, `/emoji-combos`, `/bio-templates`, `/kaomoji`, `/emoji`, `/lenny-face` | `canonical(...)` (correct) | unchanged (kaomoji + JSON-LD)                  |
| `/bio-builder`                                | hardcoded literal (correct)                         | unchanged                                      |
| `/text-repeater`                              | **`canonical("/text-generators")` — WRONG PATH**    | **fixed → `canonical("/text-repeater")`**      |
| `/aesthetic-text`                             | inherited homepage                                  | `canonical("/aesthetic-text")`                 |
| `/arrow-symbols`                              | inherited homepage                                  | `canonical("/arrow-symbols")`                  |
| `/bullet-points`                              | inherited homepage                                  | `canonical("/bullet-points")`                  |
| `/checkmark`                                  | inherited homepage                                  | `canonical("/checkmark")`                      |
| `/community`                                  | inherited homepage                                  | `canonical("/community")` + `robots:{index:false}` (thin content) |
| `/copyright-symbol`                           | inherited homepage                                  | `canonical("/copyright-symbol")`               |
| `/degree-symbol`                              | inherited homepage                                  | `canonical("/degree-symbol")`                  |
| `/fancy-text`                                 | inherited homepage                                  | `canonical("/fancy-text")`                     |
| `/flower-symbols`                             | inherited homepage                                  | `canonical("/flower-symbols")`                 |
| `/hearts`                                     | inherited homepage                                  | `canonical("/hearts")`                         |
| `/infinity-symbol`                            | inherited homepage                                  | `canonical("/infinity-symbol")`                |
| `/mirror-text`                                | inherited homepage                                  | `canonical("/mirror-text")`                    |
| `/number-symbols`                             | inherited homepage                                  | `canonical("/number-symbols")`                 |
| `/pi-symbol`                                  | inherited homepage                                  | `canonical("/pi-symbol")`                      |
| `/search`                                     | already had `robots:{index:false}` — fine           | unchanged (no canonical needed)                |
| `/small-text`                                 | inherited homepage                                  | `canonical("/small-text")`                     |
| `/smiley-face-text`                           | inherited homepage                                  | `canonical("/smiley-face-text")`               |
| `/sparkle-symbols`                            | inherited homepage                                  | `canonical("/sparkle-symbols")`                |
| `/stars`                                      | inherited homepage                                  | `canonical("/stars")`                          |
| `/strikethrough-text`                         | inherited homepage                                  | `canonical("/strikethrough-text")`             |
| `/symbol-builder`                             | inherited homepage                                  | `canonical("/symbol-builder")`                 |
| `/text-art`                                   | inherited homepage                                  | `canonical("/text-art")`                       |
| `/blog/arrow-symbols-list` … `/blog/trademark-vs-registered` (15 blog posts) | inherited homepage         | each gets `canonical("/blog/<slug>")`          |

**Verification:** `grep -oE 'rel="canonical"[^/]+href="[^"]+"' .next/server/app/<page>.html`
shows every built page has its own canonical. Spot-checked:
- `/aesthetic-text` → `https://www.copychars.com/aesthetic-text`
- `/hearts` → `https://www.copychars.com/hearts`
- `/blog/discord-symbols` → `https://www.copychars.com/blog/discord-symbols`
- `/text-repeater` → `https://www.copychars.com/text-repeater` (was previously `/text-generators` — broken)
- `/` (home) → `https://www.copychars.com` (preserved without trailing slash)
- `/community` → `https://www.copychars.com/community` AND `<meta name="robots" content="noindex, follow">`

---

## Sitemap changes

Live `https://www.copychars.com/sitemap.xml` (pre-fix):
- 1,108 total URLs
- 1,077 unique
- 31 duplicate URL emissions

After this PR (`src/app/sitemap.ts`):
- Added `/blog` to staticPages (it has 17 child posts in the sitemap but the
  index page itself was missing).
- Kept `/community` and `/search` OUT of the sitemap (community is a thin
  empty-state page; search is robots-disallowed).
- Wrapped the final emit in a `Set<string>`-based dedupe filter so Google
  never sees a duplicate `<loc>` from our sitemap, even if Agent 3's data
  fixes lag behind ours.

---

## Thin-content sample (live)

| URL                                            | Approx main-content words (excl. nav/footer/grid) |
| ---------------------------------------------- | ------------------------------------------------- |
| `/community`                                   | 40–50 (empty community state — VERY THIN)         |
| `/aesthetic-text`                              | 80–100                                            |
| `/symbols/music`                               | 80–120                                            |
| `/blog/discord-symbols`                        | ~285                                              |
| `/arrow-symbols`                               | 320–380                                           |

`/community` is the only thin page we acted on directly (excluded from
sitemap + `noindex`). The other thin pages are catalog-style and still need
real prose content (out of scope for this PR; flagged for content team).
JSON-LD `ItemList` markup added to the worst-affected catalog pages
(`/symbols/[category]`, `/kaomoji`) tells Google these are deliberate
listings rather than thin content.

---

## JSON-LD additions

Pre-fix: zero `application/ld+json` anywhere in the codebase.

Post-fix: structured data on three high-value page types.

| Page                  | Schema(s) added                                |
| --------------------- | ---------------------------------------------- |
| `/symbols/[category]` | `BreadcrumbList` + `ItemList` (top 100 symbols) |
| `/symbol/[slug]`      | `BreadcrumbList` (Home › Symbols › Category › Symbol) |
| `/kaomoji`            | `BreadcrumbList` + `ItemList` (top 100 kaomoji) |

Built using the standard Next.js App Router pattern:
`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />`
inside the page component (Next 16 still recommends this approach — see
`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`).

---

## Internal linking / orphans

`Link href=` count: 60 occurrences across 23 files. Most fan-out lives in
`HomeClient.tsx`, `layout.tsx` footer, `symbols/[category]/page.tsx`, and
`symbol/[slug]/page.tsx`.

`/symbols/[category]/page.tsx` already shipped a "More Categories" section at
the bottom that links to every sibling category — Fix F was effectively
already in place, no edit required. Confirmed by reading lines 305–315.

**Likely orphan pages (low inbound internal links, out of scope to fix here):**
`/text-repeater`, `/strikethrough-text`, `/mirror-text`, `/smiley-face-text`,
`/number-symbols`, `/flower-symbols`, `/sparkle-symbols`, `/pi-symbol`,
`/degree-symbol`, `/infinity-symbol`, `/copyright-symbol`, `/checkmark`,
`/arrow-symbols`, `/symbol-builder`. These pages need links from the homepage
or category pages — flagged in next-steps.

---

## Files modified

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | Removed root-level `alternates.canonical` (with comment explaining why) |
| `src/app/page.tsx` | Kept homepage canonical literal; removed unused `canonical` import |
| `src/app/sitemap.ts` | Added `/blog`; deduped emission via `Set<string>`; comments documenting why `/community` and `/search` are excluded |
| `src/app/community/page.tsx` | Added own canonical + `robots: { index: false }` |
| `src/app/text-repeater/page.tsx` | Bug fix: `canonical("/text-generators")` → `canonical("/text-repeater")` |
| `src/app/aesthetic-text/page.tsx` | Added `canonical("/aesthetic-text")` |
| `src/app/arrow-symbols/page.tsx` | Added `canonical("/arrow-symbols")` |
| `src/app/blog/arrow-symbols-list/page.tsx` | Added `canonical(...)` |
| `src/app/blog/bullet-point-copy-paste/page.tsx` | Added `canonical(...)` |
| `src/app/blog/check-mark-symbol/page.tsx` | Added `canonical(...)` |
| `src/app/blog/currency-symbols-list/page.tsx` | Added `canonical(...)` |
| `src/app/blog/degree-symbol-copy-paste/page.tsx` | Added `canonical(...)` |
| `src/app/blog/discord-symbols/page.tsx` | Added `canonical(...)` |
| `src/app/blog/greek-alphabet-list/page.tsx` | Added `canonical(...)` |
| `src/app/blog/heart-symbols/page.tsx` | Added `canonical(...)` |
| `src/app/blog/how-to-type-copyright/page.tsx` | Added `canonical(...)` |
| `src/app/blog/infinity-symbol/page.tsx` | Added `canonical(...)` |
| `src/app/blog/instagram-bio-lines/page.tsx` | Added `canonical(...)` |
| `src/app/blog/instagram-symbols/page.tsx` | Added `canonical(...)` |
| `src/app/blog/math-symbols-list/page.tsx` | Added `canonical(...)` |
| `src/app/blog/star-symbols/page.tsx` | Added `canonical(...)` |
| `src/app/blog/trademark-vs-registered/page.tsx` | Added `canonical(...)` |
| `src/app/bullet-points/page.tsx` | Added `canonical("/bullet-points")` |
| `src/app/checkmark/page.tsx` | Added `canonical("/checkmark")` |
| `src/app/copyright-symbol/page.tsx` | Added `canonical("/copyright-symbol")` |
| `src/app/degree-symbol/page.tsx` | Added `canonical("/degree-symbol")` |
| `src/app/fancy-text/page.tsx` | Added `canonical("/fancy-text")` |
| `src/app/flower-symbols/page.tsx` | Added `canonical("/flower-symbols")` |
| `src/app/hearts/page.tsx` | Added `canonical("/hearts")` |
| `src/app/infinity-symbol/page.tsx` | Added `canonical("/infinity-symbol")` |
| `src/app/mirror-text/page.tsx` | Added `canonical("/mirror-text")` |
| `src/app/number-symbols/page.tsx` | Added `canonical("/number-symbols")` |
| `src/app/pi-symbol/page.tsx` | Added `canonical("/pi-symbol")` |
| `src/app/small-text/page.tsx` | Added `canonical("/small-text")` |
| `src/app/smiley-face-text/page.tsx` | Added `canonical("/smiley-face-text")` |
| `src/app/sparkle-symbols/page.tsx` | Added `canonical("/sparkle-symbols")` |
| `src/app/stars/page.tsx` | Added `canonical("/stars")` |
| `src/app/strikethrough-text/page.tsx` | Added `canonical("/strikethrough-text")` |
| `src/app/symbol-builder/page.tsx` | Added `canonical("/symbol-builder")` |
| `src/app/text-art/page.tsx` | Added `canonical("/text-art")` |
| `src/app/kaomoji/page.tsx` | Added BreadcrumbList + ItemList JSON-LD |
| `src/app/symbol/[slug]/page.tsx` | Added BreadcrumbList JSON-LD |
| `src/app/symbols/[category]/page.tsx` | Added BreadcrumbList + ItemList JSON-LD |

Total: 43 files modified.

---

## Verification

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | clean (no errors) |
| `npm run lint` | 29 errors / 14 warnings — **all pre-existing on main** (main has 29 errors / 15 warnings; my branch has one fewer warning because I removed an unused import). No new errors introduced. |
| `npm run build` | ✓ Compiled successfully in 11.2s; ✓ 53 static + dynamic routes generated |
| Manual: built canonical for `/aesthetic-text`, `/hearts`, `/arrow-symbols`, `/stars`, `/blog/*`, `/text-repeater`, `/fancy-text`, `/checkmark` | All emit their own canonical, NOT the homepage |
| Manual: `/community` | `noindex, follow` + own canonical |
| Manual: `/` (homepage) | canonical preserved as bare origin (no trailing slash) |
| Manual: `/kaomoji` JSON-LD | present (1 `application/ld+json` block in built HTML) |

---

## Next steps for the user

### In Google Search Console (immediately after merge & deploy)

1. **Resubmit the sitemap.** GSC > Sitemaps > delete & re-add `https://www.copychars.com/sitemap.xml`. This forces a re-crawl and gives Google a clean dedup'd URL list.
2. **Use the URL Inspection tool** on 5–10 sample pages from the "Crawled — currently not indexed" list (one per category: a `/symbols/<cat>` page, a `/blog/<slug>` page, an `/aesthetic-text`-style tool page, etc.). Click "Request indexing" on each.
3. **Check the canonical on those same URLs.** GSC's URL Inspection should now show "User-declared canonical" matching the URL itself (not `/`). If it still shows `/` after a re-crawl, something didn't deploy.
4. **Watch the Pages report for 7–14 days.** Expect:
   - "Duplicate without user-selected canonical" → drops to 0 within ~7 days
   - "Crawled — currently not indexed" → drops as Google re-crawls and re-evaluates each URL with its now-correct canonical (~7–28 days; Google is lazy here)
   - "Discovered — currently not indexed" → drops as the dedup'd sitemap shrinks the discovery surface

### Code follow-ups (not blocking)

1. **Agent 3 owns:** dedupe `id` values in `src/data/generated-symbols.ts`. Until that lands, `/symbol/heart-1`-style URLs may still 404 or render the wrong symbol. Our sitemap dedupe just stops Google from seeing the duplicates from our side.
2. **Content team owes** unique copy on the catalog pages (`/symbols/<cat>`, `/aesthetic-text`, `/hearts`, etc.) that currently sit at 80–120 words. Even 200 words of category-specific intro + a short "how to use" section per page will materially improve indexation odds.
3. **Internal linking:** add the orphan tool pages (`/text-repeater`, `/mirror-text`, `/smiley-face-text`, `/number-symbols`, `/flower-symbols`, `/sparkle-symbols`, `/pi-symbol`, `/degree-symbol`, `/infinity-symbol`, `/copyright-symbol`, `/checkmark`, `/arrow-symbols`, `/symbol-builder`, `/strikethrough-text`) to the homepage navigation tile grid OR add a "More Tools" footer section. Currently several of these have only a single inbound link, which Google interprets as low importance.
4. **Vercel preview:** if a future preview branch ever serves a 200 (i.e. someone disables the redirect), add a `proxy.ts` (Next 16's renamed `middleware.ts`) at the project root that sets `X-Robots-Tag: noindex, nofollow` for any host !== `www.copychars.com`. Pattern in Next 16 docs: `proxy.md` exports a `proxy(request)` function (NOT `middleware`).
5. **Schema expansion:** consider adding `Article` JSON-LD to `/blog/[slug]` posts and `WebSite` + `SearchAction` to the homepage (the latter helps Google show a sitelinks search box).
