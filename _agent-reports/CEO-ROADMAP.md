# CopyChars — CEO Roadmap (Post Agents 1/2/3)

Branch: `agent/ceo-roadmap` (off main)
Date: 2026-05-09
Author: CEO Strategist agent

---

## State of the product

CopyChars is a Next 16 / React 19 / Tailwind 4 copy-paste catalogue for special characters, emoji, kaomoji, fancy text, borders, bios and bio templates. The audience is Instagram/TikTok/Discord creators, students who need Greek and math glyphs, and developers who want a pretty alternative to charset.com. The pitch is "3000+ symbols, one click away" — a ticker of glyphs on the homepage, category landing pages with grids of `SymbolCard`s, dedicated tool pages (small-text, fancy-text, mirror-text, etc.), per-symbol detail pages (`/symbol/<slug>`), platform pages (`/symbols-for/discord`, etc.) and a small blog. The user's three stated pain points are (a) the daily content bot was generating nonsense — whales filed under music, sunflowers labelled "crescent moon", letters labelled as music dynamics; (b) Google Search Console was stuck at 73 "Crawled — currently not indexed" + 2 "Duplicate without user-selected canonical"; (c) nobody had ever read the codebase end-to-end.

The three agent PRs together address all three pain points, but **none are merged yet**. Agent 1 (`agent/code-audit`) auto-fixed 30 lint issues, ran a full repo audit, and surfaced 14 remaining errors that need behavioural decisions, 4 dead components, and the data-quality issues Agent 3 then resolved. Agent 2 (`agent/indexing-fixes`) removed the poisonous root canonical from `layout.tsx` (the dominant root cause), added per-page canonicals to 35 pages, fixed a literally-wrong canonical on `/text-repeater` (was pointing at the non-existent `/text-generators`), deduped the sitemap, added the missing `/blog` entry, and shipped the first JSON-LD on the site (`BreadcrumbList` + `ItemList` on category, symbol-detail and kaomoji pages). Agent 3 (`agent/generator-overhaul`) rebuilt the bot with a per-category Unicode-block classifier (≥ 70% in-band score required), saturation tracking, deterministic codepoint-hex IDs, and a `--dry-run --use-fixture` mode that runs without API keys; then ran a full cleanup pass across 1,575 records (dropped 319, rerouted 131, renamed 151 IDs), reaching 0 duplicate IDs and 0 cross-file duplicates. **What's still on the table:** thin content on category/tool pages (the "Crawled — not indexed" pages will need real prose to convert from "indexed but ranking nowhere" to "indexed and ranking"), no programmatic SEO or trending pages yet, the `/community` route is a thin empty state, `/blog` has only 15 posts, the bot's GitHub Actions cron currently auto-commits straight to `main` (no human review of generated content), assets are missing (no apple-touch-icon, no `manifest.webmanifest`, no OpenGraph image), and the catalog page UX (200+ items in a single grid with no filters) starts to creak as Agent 3 lifts category counts.

---

## Roadmap

| # | Item | Impact | Conf | Ease | ICE | Owner / Skill | Branch | Effort | Notes |
|---|---|---:|---:|---:|---:|---|---|---|---|
| 1 | **Merge Agents 1, 2, 3 in order: 1 (code-audit) → 2 (indexing-fixes) → 3 (generator-overhaul)** | 10 | 10 | 10 | 100.0 | general subagent | n/a (PR review) | 0.5 d | Order matters: Agent 2 was written against pre-cleanup data; merging 3 first silently changes which IDs are in the sitemap. Resubmit sitemap in GSC immediately after deploy. |
| 2 | **Unique 200-word intro + "how to use" copy on the 14 `/symbols/[category]` pages** (the "Crawled — not indexed" survivors all live here and on the dedicated tool pages) | 10 | 8 | 7 | 56.0 | `copywriting` + `seo-audit` | `agent/cat-thin-content` | 4-5 d | Each category needs its own voice (math vs zodiac vs ui). Use Agent 3's headroom table to weight effort. Highest priority: music, arrows, math, shapes, ui — the categories the bot is also actively populating. |
| 3 | **Convert the existing daily content-bot cron into a PR-based workflow with `--dry-run` review step** | 9 | 9 | 7 | 56.7 | general subagent | `agent/bot-pr-workflow` | 1-2 d | Today `.github/workflows/content-bot.yml` runs `node scripts/content-bot.mjs` and `git push` to main 3× per day with no human in the loop — that's how the whale ended up in production. Switch to: weekly `--dry-run`, open a PR with the diff + classifier accept/reject log, auto-merge if zero rejects. Also start committing `_generator-state.json`. |
| 4 | **Sitewide accessibility pass on `SymbolCard` and copy buttons** | 7 | 9 | 8 | 50.4 | `webapp-testing` + general subagent | `agent/a11y-pass` | 2 d | `src/components/SymbolCard.tsx` is a `<div onClick>` with no `role`, no keyboard handler, no `aria-label`. Every category and detail page renders 50-200 of these. Trivial to fix (`role="button"`, `tabIndex=0`, `onKeyDown` for Space/Enter, `aria-label`) and unblocks Lighthouse a11y > 95. |
| 5 | **Fix the 6 React 19 hook-purity errors Agent 1 left untouched** (CommunityClient ×4, FavouritesPanel ×1, SymbolCard ×1) | 7 | 9 | 8 | 50.4 | general subagent | `agent/react19-hooks` | 1-2 d | These are real bugs, not stylistic. `Date.now()` in render breaks SSR hydration; `Math.random()` in `key={r.id + Math.random()}` defeats React reconciliation; `setState` synchronously in `useEffect` causes an extra render. Each fix is < 10 lines but needs a behavioural call (see Cleanup section below). |
| 6 | **Add favicons, apple-touch-icon, manifest.webmanifest, and a generic OG image** | 7 | 10 | 9 | 63.0 | general subagent | `agent/asset-coverage` | 1 d | `public/` has only `favicon.svg`. iPhone home-screen, Android home-screen, Slack/Discord/WhatsApp link previews all currently render a blank box. Use Next 16's file-based metadata (`src/app/icon.png`, `apple-icon.png`, `opengraph-image.png` per the file-conventions guide in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/`). |
| 7 | **`WebSite` + `SearchAction` JSON-LD on the homepage** so Google can render a sitelinks search box | 7 | 8 | 9 | 50.4 | `schema-markup` | `agent/sitelinks-search` | 0.5 d | One JSON-LD block in `src/app/page.tsx`. Minimal risk, real upside if it triggers — sitelinks search puts a search input directly under the brand result on Google. Agent 2 already established the JSON-LD pattern. |
| 8 | **`Article` JSON-LD on all 15 `/blog/[slug]` posts** | 6 | 9 | 8 | 43.2 | `schema-markup` | `agent/article-schema` | 1 d | Currently zero. Adding `Article` + `BreadcrumbList` makes posts eligible for richer Discover surfaces and Top Stories. Each post just needs `headline`, `datePublished`, `author`, `image`. |
| 9 | **Wire up internal links to the 14 orphan tool pages Agent 2 flagged** | 7 | 8 | 8 | 44.8 | `seo-audit` + general | `agent/orphan-links` | 1 d | `/text-repeater`, `/mirror-text`, `/strikethrough-text`, `/smiley-face-text`, `/number-symbols`, `/flower-symbols`, `/sparkle-symbols`, `/pi-symbol`, `/degree-symbol`, `/infinity-symbol`, `/copyright-symbol`, `/checkmark`, `/arrow-symbols`, `/symbol-builder`. Add them to the homepage tool grid + a "More Tools" footer column. Concrete unblock for Google's "Discovered — currently not indexed". |
| 10 | **Programmatic SEO: `/symbols-for/<platform>/<category>` pages** (e.g. `/symbols-for/discord/arrows`, `/symbols-for/instagram/hearts`) | 9 | 6 | 6 | 32.4 | `programmatic-seo` + `ai-seo` | `agent/pseo-platform-cat` | 5-7 d | 6 platforms × 14 categories = 84 templated pages, each combining the existing platform copy with the existing category data. Each one gets unique copy ("Best discord arrow symbols for usernames and channel headers, copy paste"). High keyword overlap with existing search demand. **Prerequisite: item #2** (need unique category copy first so the templates don't generate near-duplicate prose). |
| 11 | **Build out `/community` from empty state into a working user-submitted kaomoji wall** | 7 | 5 | 4 | 14.0 | `community-marketing` + general | `agent/community-mvp` | 10-15 d | Today `/community` is `noindex`'d (Agent 2 did the right thing — it has 40 words). Either kill it or build it. Recommend build it: cheapest viable path is a Vercel KV-backed (free tier 30k/mo) submission form + admin moderation queue + display, no auth, with a captcha. **Strategic question for the user — only do this if community is actually a goal (see strategic Q below).** |
| 12 | **Core Web Vitals pass on category pages** (LCP suffers when grids hit 200+ items after Agent 3 lifts counts) | 6 | 7 | 7 | 29.4 | `webapp-testing` + general | `agent/cwv-grids` | 2-3 d | Use `IntersectionObserver`-based virtualisation or paginate-on-scroll past row 100. Currently every `<SymbolCard>` mounts immediately. Also: drop `force-dynamic` from `/symbols/[category]` (Agent 1 flagged it — unclear why it's there; static would be cheaper and faster). |
| 13 | **Delete the 4 dead components Agent 1 flagged** (`MultiSelectGrid`, `SearchBar`, `SearchTrigger`, and decide on `FavouritesPanel`) | 5 | 10 | 10 | 50.0 | general subagent | `agent/dead-code` | 0.5 d | Pure removal except `FavouritesPanel`, which has a real localStorage-favourites feature in `SymbolCard.tsx` but no place that displays them. Either wire `FavouritesPanel` into the homepage / a `/favourites` route, or delete it and remove the heart toggle. Recommend wire — favourites is a stickiness feature. |
| 14 | **Refresh the 15 existing blog posts and add 5 new ones** targeting clusters Agent 2 found ranking nowhere | 7 | 7 | 5 | 24.5 | `content-strategy` + `copywriting` | `agent/blog-refresh` | 7-10 d | Topics with no current post but where data already exists: "kaomoji for Discord", "math symbols for Word", "arrow symbols for resumes", "aesthetic Instagram bio symbols 2026", "every Greek letter explained". Prioritise after #2 lands. |
| 15 | **Add `/trending` and `/recently-added` routes powered by Vercel Web Analytics + the bot's daily output** | 6 | 6 | 5 | 18.0 | `analytics-tracking` + general | `agent/trending` | 5-7 d | Vercel free-tier analytics gives last-30d page views; Agent 3's `_generator-state.json` gives "what was added when". Two pages, low effort, high freshness signal to Google. |
| 16 | **Schema.org `BreadcrumbList` on `/symbols-for/[platform]`, `/blog`, `/blog/[slug]`** (Agent 2 covered category, symbol-detail, and kaomoji — these three remain) | 5 | 9 | 9 | 40.5 | `schema-markup` | `agent/breadcrumb-coverage` | 0.5 d | Quick completion of Agent 2's JSON-LD work. Should be batched with #7 and #8. |
| 17 | **Seed the `music`, `ui`, `arrows` categories from Unicode CLDR annotations instead of LLM** (Agent 3 sketched this in their populator plan) | 8 | 7 | 4 | 22.4 | general subagent | `agent/cldr-seed` | 7-10 d | Replaces hallucination with authoritative names. Music has the most headroom (10/254). Build `scripts/seed-from-cldr.mjs` that reads a checked-in CLDR dump and emits seed entries through the existing `processSymbolCandidates` pipeline. **Prerequisite: items #1 and #3 land first.** |
| 18 | **One-time competitor profile sweep** — copychars.com vs symbl.cc, getemoji.com, fsymbols.com, coolsymbol.com | 7 | 9 | 7 | 44.1 | `competitor-profiling` | `agent/competitor-pass` | 2-3 d | We've never done this. Will surface (a) keywords we're missing entirely, (b) page types they have we don't, (c) UI patterns they use that work. Output is a single markdown brief that feeds items #2, #14, #15. |

(Total: 18 items.)

---

## Cleanup items

### Top 10 quarantined items from Agent 3 that need a human eye

(Drawn from `_quarantine.json` per the headline numbers in `CLEANUP-QUARANTINE.md`. The ten "most surprising" hallucinations are all clear deletes — no debate. The ten worth a human pass are the **rerouted** items, where Agent 3 made an opinionated category change.)

| # | Glyph | Old category → New category | Was the bot's reroute right? |
|---|---|---|---|
| 1 | 20 typographic punctuation marks (• † ‡ ※ etc.) | legal → punctuation | **Probably yes**, but the user might prefer them filed under `shapes` or split (some are footnote marks, some are decorative bullets). Spot-check 3-4. |
| 2 | 17 chess-misfiled glyphs | chess → shapes | Likely right. Worth checking if any were actually `chess-piece` Unicode and got moved off-block by mistake. |
| 3 | 12 arrow-misfiled glyphs | arrows → math | Math has plenty of arrow-like operators (⇒ ⇔ ↦) so this is plausible. Confirm none are visually-arrow but semantically-math (e.g. ↦ is "maps to"). |
| 4 | 10 music → technical | "Music" misfiles that were actually misc-technical block. Likely right. |
| 5 | 5 chess → ui | Strange — what UI codepoints look chess-like? Worth eyeballing. |
| 6 | 5 technical → math | Plausible. |
| 7 | 4 weather → ui | A weather glyph that's actually UI? Eyeball. |
| 8 | The 92 dropped kaomoji (`generated-kaomoji.ts`) flagged `invalid-shape` | dropped | Spot-check 5-10 of these — some might be valid kaomoji that the tightened `isValidKaomoji` is too aggressive about (e.g. ones using only Japanese kana or only animal-bracket pairs `ʕ ʔ`). |
| 9 | 58 items that left `legal` (largest exodus) | legal → various | The pre-cleanup `legal` category had 72 items; now has 14. That's a big visible delta on `/symbols/legal` — verify the page still has enough content to be useful. |
| 10 | The 2 items dropped from `symbols.ts` (zero-width / soft-hyphen) | dropped | Confirm these were never linked from anywhere. Their slugs would now 404 — Agent 2's sitemap dedupe protects Google but check internal links too. |

### The 14 ESLint errors Agent 1 left untouched (React 19 hook-purity)

Recommendation: **fix now** (item #5 above). They are not cosmetic — they're React 19's stricter checker catching real bugs:

- `CommunityClient.tsx` × 3 `Date.now()` calls in render → break SSR hydration mismatch on the community page (Agent 2 already `noindex`'d it, so no SEO damage, but visible bug for any user who lands there).
- `CommunityClient.tsx` line 399, `refresh` accessed in `useEffect` before declaration → real reference-before-defined bug, may explain whatever empty-state behaviour the page shows.
- `FavouritesPanel.tsx` `key={r.id + Math.random()}` → defeats React reconciliation; every render re-mounts every favourite. Combined with item #13 above (FavouritesPanel is dead code right now), the simplest fix is to first decide whether to wire up or delete.
- `SymbolCard.tsx:22` `setState` in `useEffect` → use a lazy `useState(() => ...)` initialiser instead. Cuts one render per mount on every symbol card on every page (so up to 200 wasted renders per category page load).
- `react-hooks/exhaustive-deps` × 2 → these need a real review. Adding the missing dep can cause infinite loops; the auditor was right to flag and not auto-fix.

All of these can land in one PR (`agent/react19-hooks`, ~1-2 days) and unblock the lint baseline returning to zero, which lets us add `npm run lint` to CI as a hard gate.

### The 4 dead components Agent 1 flagged

| Component | Recommendation |
|---|---|
| `src/components/MultiSelectGrid.tsx` | **Delete.** Nothing references it; functionality lives in `SymbolCard`'s `selectable` prop. |
| `src/components/SearchBar.tsx` | **Delete.** Live search is `SearchOverlay` triggered from `NavClient`. |
| `src/components/SearchTrigger.tsx` | **Delete.** Same — `NavClient` owns the search trigger now. |
| `src/components/FavouritesPanel.tsx` | **Wire it up.** `SymbolCard` writes `copychars-favs` to localStorage but nothing reads them back. Either add a `/favourites` route or include the panel in the homepage sidebar. Favourites is a real stickiness feature; deleting it would be a step backwards. |

---

## Things deliberately NOT in the roadmap

- **Auth / accounts.** Single biggest scope creep risk. Favourites + recents already work via localStorage; that's enough. If `/community` becomes a goal (item #11), revisit, but with a captcha-only submission flow first — not a full auth system.
- **Paid tier / Stripe.** Free-tier hobby project per the brief. The product is too thin (and indexing not yet recovered) to support a paywall conversation. Reconsider after 6 months of healthy organic growth.
- **Mobile app.** No evidence anyone has asked. PWA via the manifest.webmanifest in item #6 is the right amount of "mobile" for now.
- **Migrating off Next 16 / Tailwind 4.** Both are working. Don't.
- **Search re-architecture (server-side, ranked, fuzzy).** `SearchOverlay` works. The volume of data (1,000-ish symbols, 500-ish kaomoji) is small enough that client-side filter is fine. Revisit if catalogue passes 5,000.
- **Monetisable APIs ("symbols as a service").** Out of scope and would dilute the SEO surface.
- **Replacing Vercel.** Free hobby tier covers this load comfortably. If Web Analytics becomes a paid bottleneck for item #15, swap to Plausible or self-hosted Umami before paying Vercel.
- **`/text-art` enrichment beyond what exists.** It's a long-tail page that's already in the sitemap. Don't pour effort in until indexing recovers and we see whether it gets discovered.
- **Translating the site.** Single-language is fine for an English-keyword-driven SEO play. International expansion is a 6+ month project, not a quick win.

---

## One strategic question for the user

The roadmap above optimises for **organic SEO traffic growth from indexing recovery + content depth + programmatic SEO**, because that's the bottleneck you described. Items #1, #2, #6, #7, #9, #10, #14, #18 are all in service of that thesis.

But three other plausible north-stars exist, and each would re-rank the roadmap:

1. **Community-led growth** — kill items #10, #14, #15; promote item #11 (`/community` MVP) to top of list, build a kaomoji-of-the-day Discord bot, mine Reddit r/Kaomoji and r/Bigfont for user-submitted content.
2. **Paid creator features** — kill item #11; add a `/pro` tier with pinned favourites, custom palette saving, Discord-server symbol packs. Heavy auth + Stripe lift; revisit only after SEO traffic compounds.
3. **B2B / API partnerships** — productise the symbols data as a JSON API or `npm` package, list on RapidAPI / npmjs, use the existing site as the marketing front. Different audience entirely.

**Recommend you stay on (1) — SEO traffic growth — for at least the next quarter.** The indexing hole has to be dug out before any of (1)-(3) can compound. Confirm or redirect.
