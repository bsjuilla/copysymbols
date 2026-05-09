# CopyChars — Code Audit Report

**Branch:** `agent/code-audit`
**Date:** 2026-05-09
**Auditor:** Code-Clash Auditor
**Stack:** Next.js 16.2.3 (Turbopack) · React 19.2.4 · TypeScript 5 · Tailwind 4

---

## Summary (TL;DR)

| Check | Before | After | Status |
|---|---|---|---|
| `npx tsc --noEmit` | clean | clean | green |
| `npm run lint` | 29 errors / 15 warnings | **6 errors / 8 warnings** | yellow — remaining are React-19 purity / hook rules that need behavioural fixes (out of safe-auto-fix scope) |
| `npm run build` | succeeds | succeeds | green |
| `npm audit --omit=dev` (HIGH/CRITICAL) | 0 | 0 | green (only 2 moderate, in transitive `postcss`) |
| Routes vs sitemap | 3 missing | 3 missing | flagged below — Agent 2 owns sitemap |
| Broken internal `<Link>` | 0 | 0 | green |
| Cross-file symbol duplicates | 21 | 21 | flagged — Agent 3 owns data |
| Internal duplicate `id` | 43 (gen-symbols) | 43 | flagged — Agent 3 owns data |
| Internal duplicate value | 1 (`π` in symbols.ts) | 1 | flagged — Agent 3 |
| Dead components | 4 | 4 | flagged below |

**Auto-fixes applied this PR:** 30 ESLint issues resolved (unused imports, unescaped HTML entities, one `<a href="/">` → `<Link>`). No behavioural changes.

---

## TypeScript Errors

`npx tsc --noEmit` exits 0 both before and after fixes. **Zero errors.** The codebase compiles cleanly under `strict` (verify in `tsconfig.json`).

---

## ESLint Issues

### Before (44 total)

```
29 errors / 15 warnings
```

### After (14 total)

```
6 errors / 8 warnings
```

### Breakdown by rule (remaining)

| Count | Rule | Notes |
|---|---|---|
| 6 | `@typescript-eslint/no-unused-vars` | Warnings only — safe but not impacting build. Some are intentional unused destructures (`onUpdate`, `e`, `autoFocus`). |
| 4 | `react-hooks/purity` (error) | `Date.now()` and `Math.random()` called during render. Needs behavioural refactor (move to state / `useEffect`). |
| 2 | `react-hooks/exhaustive-deps` | Missing deps in `useEffect`. Adding them could cause infinite loops — needs human review. |
| 1 | `react-hooks/set-state-in-effect` (error) | `SymbolCard.tsx:22` — `setState` synchronously inside `useEffect`. |
| 1 | `react-hooks/immutability` (error) | `CommunityClient.tsx:399` — `refresh` accessed in `useEffect` before declaration. Real bug. |

### Files with remaining errors

- `src/app/community/CommunityClient.tsx` — 4 errors (3× `Date.now` purity, 1× `refresh` accessed before declaration)
- `src/components/FavouritesPanel.tsx` — 1 error (`Math.random()` in render — `key={r.id + Math.random()}` is an anti-pattern, generates new keys every render)
- `src/components/SymbolCard.tsx` — 1 error (`setState` in effect — should use lazy initializer)

These are **not auto-fixable**. Each requires a behavioural decision the auditor isn't authorised to make. They were introduced as part of the React 19 stricter ruleset — not pre-existing on the live site, but blocking once enforced. **Recommend Agent 1 / human owner triage these before next deploy.**

### Auto-fixes applied

| File | Fix |
|---|---|
| `src/app/page.tsx` | Removed unused `canonical` import |
| `src/app/symbols/page.tsx` | Removed unused `Link` import |
| `src/app/symbol/[slug]/page.tsx` | Removed unused `symbols` import |
| `src/app/emoji/EmojiPageClient.tsx` | Removed unused `CopyToast` import |
| `src/app/fancy-text/FancyTextClient.tsx` | Removed unused `CopyToast` import + escaped 4 quote/apostrophe entities |
| `src/app/hearts/HeartsClient.tsx` | Removed unused `CopyToast` import |
| `src/app/search/SearchPageClient.tsx` | Removed unused `useEffect` import + escaped 10 quote entities |
| `src/app/community/CommunityClient.tsx` | Escaped 1 apostrophe |
| `src/app/HomeClient.tsx` | Escaped 2 apostrophes |
| `src/app/kaomoji/KaomojiPageClient.tsx` | Escaped 1 apostrophe |
| `src/app/not-found.tsx` | Escaped 2 apostrophes |
| `src/app/small-text/SmallTextClient.tsx` | Escaped 2 quote entities |
| `src/app/symbols-for/[platform]/PlatformPageClient.tsx` | Replaced `<a href="/">` with `<Link href="/">` |

---

## Build Warnings

`npm run build` succeeds.

```
✓ Compiled successfully in 10.0s
✓ Generating static pages using 11 workers (53/53) in 2.3s
```

One non-blocking notice:

```
⚠ Using edge runtime on a page currently disables static generation for that page
```

Affects the dynamic routes (`/symbol/[slug]`, `/symbols-for/[platform]`, `/symbols/[category]`) which are server-rendered on demand (`ƒ`). **Not necessarily wrong** — these are intentionally dynamic. Worth confirming whether `force-dynamic` was intended on `/symbol/[slug]` (line 8 of that page).

---

## npm audit (high / critical)

```
0 high, 0 critical
2 moderate (transitive — postcss < 8.5.10 inside next/node_modules)
```

`npm audit fix --force` would downgrade Next to `9.3.3` — **do not run.** Wait for Next 16.x patch upstream. No action required.

---

## Route ↔ Sitemap Drift

**51 page routes total** (48 static + 3 dynamic). Sitemap has 53 static URL entries plus dynamic expansion for `/symbols/{cat.id}` and `/symbol/{s.id}`.

### Routes missing from sitemap (existing pages NOT in `sitemap.ts`)

```
/blog        ← src/app/blog/page.tsx exists, not listed
/community   ← src/app/community/page.tsx exists, not listed (has metadata too)
/search      ← src/app/search/page.tsx exists, not listed
```

**`/search` arguably should NOT be in sitemap** (search-results pages are usually noindex). But `/blog` (the blog index) and `/community` (a real landing page with full metadata) **should** be there.

### Sitemap entries pointing at non-existent routes

**None.** All sitemap entries resolve to a real route or match a dynamic pattern.

> **Agent 2** owns `sitemap.ts` — flagging only.

---

## Broken Internal Links

**None.** Every `<Link href="/...">` (literal and template-prefix) resolves to either a static page or a dynamic pattern (`/symbols/[category]`, `/symbol/[slug]`, `/symbols-for/[platform]`).

The only "match" my crawler reported (`/${p}` in `layout.tsx:41`) is a footer template literal (`["symbols","emoji","kaomoji","text-art"].map(p => <Link href={'/${p}'}>`) — all four targets exist. False positive from regex limitations, **not a real bug**.

---

## Data File Duplicates (report only)

> Agent 3 owns content cleanup.

### Cross-file duplicates by `symbol` value

| File pair | Duplicate count |
|---|---|
| `symbols.ts` vs `generated-symbols.ts` | 0 |
| `symbols.ts` vs `extra-symbols.ts` | 0 |
| `generated-symbols.ts` vs `extra-symbols.ts` | **21** |
| `kaomoji.ts` vs `generated-kaomoji.ts` (`face` field) | 0 |

#### Examples (gen-symbols ↔ extra-symbols)

```
①  gen-technical-decimal-number-one-1777540743505  vs  circled-1     "Circled Digit One"
②  gen-technical-decimal-number-two-1777540743505  vs  circled-2     "Circled Digit Two"
③  gen-technical-decimal-number-three…             vs  circled-3
④  gen-technical-decimal-number-four…              vs  circled-4
⑤  gen-technical-decimal-number-five…              vs  circled-5
… 16 more, mostly circled digits / Roman numerals duplicated by the bot under "technical" category
```

The bot is generating glyphs under `category: "technical"` that already exist as hand-curated entries under `category: "enclosed"` or `category: "roman"` in `extra-symbols.ts`. The bot is also **mislabelling Unicode** — e.g. `①` is not "Decimal Number One", it's "Circled Digit One" (U+2460), and the bot's row claims `unicode: "U+2460"` but `name: "Decimal Number One"`. SEO + UX risk.

### Internal duplicate `id` (same file)

| File | Count | Severity |
|---|---|---|
| `symbols.ts` | 0 | clean |
| `generated-symbols.ts` | **43** | bot bug — collisions in id generation |
| `extra-symbols.ts` | 0 | clean |
| `kaomoji.ts` | 0 | clean |
| `generated-kaomoji.ts` | 0 | clean |

#### Examples of duplicate IDs in `generated-symbols.ts`

```
gen-currency-shekel-sign-1777232694973
  → symbol: "₪" name: "Shekel Sign"
  → symbol: "₶" name: "Shekel Sign"            ← same id, different glyph

gen-greek-alpha-with-hook-variation-1777389154567
  → symbol: "Α̱" (uppercase)
  → symbol: "α̱" (lowercase)                   ← same id, different glyph

gen-greek-alpha-1777407277238
  → symbol: "Ἀ" — appears 3 times with that same id, varying glyphs ἀ / Ἁ
```

**Impact:** React `key={id}` collisions, broken `getSymbolBySlug()` lookups (returns first match), and duplicate `<Link href={'/symbol/{id}'}>` URLs in the sitemap. **Real production bug** if any of these IDs are linkable.

### Internal duplicate `symbol` value

| File | Count | Examples |
|---|---|---|
| `symbols.ts` | 1 | `π` appears twice — `id: "pi"` ("Pi") and `id: "pi-lower"` ("Pi (lowercase)"). Both map to U+03C0. Probably intentional (one is the math constant, the other the Greek letter), but confusing — consider distinct glyphs `Π` (U+03A0) for uppercase. |

---

## Inconsistent Record Shapes

Each data file has a primary record type (`Symbol` / `Kaomoji`) and may also export a second array with a different shape (`Category` / `kaomojiCategory`). After accounting for those:

| File | Records | Majority shape | Variants |
|---|---|---|---|
| `symbols.ts` | 233 | `category,css,description,html,id,keywords,name,symbol,unicode` (184) | 35 records add `shortcut` (intentional, optional field) · 14 records are `Category` exports (separate type) |
| `generated-symbols.ts` | 610 | same (610/610) | none — perfectly uniform |
| `extra-symbols.ts` | 60 | same (57) | 3 records are `Category` exports (separate type) |
| `kaomoji.ts` | 81 | `face,id,keywords,mood,name` (71) | 10 records are `kaomojiCategories` exports (separate type) |
| `generated-kaomoji.ts` | 568 | same (568/568) | none — perfectly uniform |

**No inconsistencies within a single record type.** All Symbol records have the required fields; the only field that varies is the optional `shortcut`, which is correctly typed `?:` in the `Symbol` interface.

---

## Dead Components

Files in `src/components/` with no import from anywhere else in `src/`:

```
src/components/FavouritesPanel.tsx     (188 lines, has react-hooks/purity error)
src/components/MultiSelectGrid.tsx
src/components/SearchBar.tsx           (referenced nowhere; SearchOverlay is the live one)
src/components/SearchTrigger.tsx       (referenced nowhere; NavClient + SearchOverlay handle search now)
```

**Recommend deletion** in a follow-up PR. Did not delete in this PR because deleting components is a behavioural change that should get a review pass — and `FavouritesPanel` may be wired up via a future CEO-roadmap feature (Agent 4 owns the roadmap).

---

## Notes for Agent 3 (Generator-Bot Weaknesses)

The audit surfaced several `scripts/content-bot.mjs` problems Agent 3 should address:

1. **No Unicode-block ↔ category validation.** Bot is generating glyphs whose Unicode codepoint lives in a different category than the bot claims:
   - `❄️` (snowflake, U+2744) labelled `category: "weather"` — actually U+2744 is the *Dingbats* block.
   - `🌻` (sunflower) labelled `name: "Crescent Moon"` with `unicode: "U+1F33B"` — but U+1F33B is *Sunflower*. Name lies about the glyph.
   - `🌺` (hibiscus) labelled `name: "Full Moon"` with `unicode: "U+1F33A"` — same story.
   - `🌽` (corn) labelled `name: "Waning Crescent Moon"` — wildly wrong.

   The bot appears to have hallucinated Unicode codepoints + names that don't match the emitted glyph. **Add a verification step:** for each generated record, look up the canonical Unicode name for the glyph and reject the record if `name` / `unicode` disagree.

2. **Duplicate ID generation.** `generated-symbols.ts` has 43 duplicate `id` collisions. The bot is keying IDs off `name` slugified + a timestamp, but generating multiple glyphs under the same name in one batch (uppercase/lowercase variants), so they collide. **Fix:** include the codepoint in the ID, e.g. `gen-greek-alpha-u0391-${ts}`.

3. **Cross-file duplicates.** Bot doesn't check `extra-symbols.ts` before generating new entries, so it re-generates 21 symbols that already exist as curated entries. **Fix:** load the existing dataset and filter generated candidates against it before writing.

4. **Lossy `html` entity choice.** Many generated rows have `html: "&#9744;"` (= ☐) regardless of the actual glyph. The bot seems to be defaulting to a placeholder HTML entity. **Fix:** generate `html` from the actual codepoint (`&#${codepoint};`).

5. **Minimum-effort `keywords`.** Many generated records have `keywords: ["shapes"]` or `keywords: ["happy", "joyful", "celebrating"]` — same set repeated dozens of times. Hurts in-app search and SEO. **Fix:** require at least 4 unique keywords + reject if keyword set matches an existing record exactly.

---

## Files Touched This PR

```
src/app/page.tsx                                       (-1 line:  removed unused import)
src/app/symbols/page.tsx                               (-1 line:  removed unused import)
src/app/symbol/[slug]/page.tsx                         (modified: removed `symbols` from import)
src/app/emoji/EmojiPageClient.tsx                      (-1 line:  removed unused import)
src/app/fancy-text/FancyTextClient.tsx                 (modified: removed import + escaped entities)
src/app/hearts/HeartsClient.tsx                        (-1 line:  removed unused import)
src/app/search/SearchPageClient.tsx                    (modified: removed useEffect + escaped entities)
src/app/community/CommunityClient.tsx                  (modified: escaped 1 apostrophe)
src/app/HomeClient.tsx                                 (modified: escaped 2 apostrophes)
src/app/kaomoji/KaomojiPageClient.tsx                  (modified: escaped 1 apostrophe)
src/app/not-found.tsx                                  (modified: escaped 2 apostrophes)
src/app/small-text/SmallTextClient.tsx                 (modified: escaped 2 quote entities)
src/app/symbols-for/[platform]/PlatformPageClient.tsx  (modified: <a> -> <Link>)

_agent-reports/CODE-AUDIT.md       (this file)
_agent-reports/code-audit-raw.txt  (concatenated raw outputs for traceability)
_agent-reports/analyze.mjs         (analysis script — kept for reproducibility)
_agent-reports/raw-*.txt           (individual raw outputs)
_agent-reports/raw-analyze.json    (machine-readable analysis output)
```

No files in `src/data/`, `src/lib/`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/layout.tsx`, `next.config.ts`, or `scripts/content-bot.mjs` were modified. All Agent-2 / Agent-3 territory is untouched.
