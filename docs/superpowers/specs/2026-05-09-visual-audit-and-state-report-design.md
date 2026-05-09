# Visual Audit & State-of-Website Report — Design Spec

- **Date:** 2026-05-09
- **Author:** Claude (with bsjuilla)
- **Branch:** `agent/visual-audit`
- **Repo:** [bsjuilla/copysymbols](https://github.com/bsjuilla/copysymbols)
- **Live site:** [copychars.com](https://www.copychars.com)
- **Related work:** PR `agent/code-audit`, `agent/indexing-fixes`, `agent/generator-overhaul`, `agent/ceo-roadmap` (4 open PRs at time of writing)

---

## 1. Context

The user spotted two visible bugs on the live site after running the multi-agent cleanup:

1. **Punctuation page** ([copychars.com/symbols/punctuation](https://www.copychars.com/symbols/punctuation)) renders the literal text `“`, `”`, `‘`, `’` in the first four cards instead of the smart-quote characters.
2. **Superscript & Subscript page** ([copychars.com/symbols/superscript](https://www.copychars.com/symbols/superscript)) shows two visually-identical "2" cards, and the page format itself is weak — a static list of pre-defined chars when an interactive subscript-maker tool would deliver more value.

These are the surface symptoms. The user's underlying request is broader: a thorough visual audit of every category page on copychars.com, plus a written state-of-the-website report covering what's broken, what's thin, and what could be improved.

The four agent PRs already in flight clean up data (319 nonsense items dropped), fix per-page canonicals, and harden the generator bot. This audit runs *after* those land — it tells the user what's still wrong on top of the cleanup, not what the cleanup already fixes.

The subscript-maker tool idea is **explicitly out of scope for this PR** — it becomes follow-on work as PR 6 once the audit lands.

## 2. Scope

### In scope
- Visual audit of ~45 pages × 2 viewports (desktop 1280px, mobile 375px) ≈ 90 screenshots
- AI-vision review of every screenshot
- Auto-apply safe fixes surfaced by the audit (data dedupes, escape-string corrections, dead-category route removal)
- Written state-of-website report at `_agent-reports/STATE-OF-WEBSITE.md`
- Recommendations grouped by effort tier (1-day / 1-week / 1-month)
- A teaser stub for the subscript-maker tool (full design in PR 6)

### Out of scope
- Building the subscript-maker tool itself (separate PR)
- Rewriting category descriptions or thin-content copy (CEO roadmap territory)
- Layout / CSS overhauls beyond bug fixes
- Anything blog-related (`/blog/*` routes)
- The `/community` page (already known to be empty — CEO roadmap item)
- API routes, `/search`, internal-only pages

## 3. Pages to audit

### Category routes (14)
`/symbols/[category]` for each id: `arrows`, `currency`, `math`, `greek`, `legal`, `shapes`, `punctuation`, `music`, `chess`, `zodiac`, `weather`, `technical`, `superscript`, `ui`

### Top-level static routes (~25)
`/kaomoji`, `/emoji`, `/hearts`, `/stars`, `/borders`, `/lenny-face`, `/bullet-points`, `/bio-templates`, `/emoji-combos`, `/bio-builder`, `/small-text`, `/strikethrough-text`, `/aesthetic-text`, `/mirror-text`, `/symbol-builder`, `/checkmark`, `/degree-symbol`, `/infinity-symbol`, `/pi-symbol`, `/copyright-symbol`, `/arrow-symbols`, `/flower-symbols`, `/sparkle-symbols`, `/smiley-face-text`, `/number-symbols`

### Dynamic samples (6)
- 3 random `/symbol/[slug]` pages
- 3 platform pages: `/symbols-for/instagram`, `/symbols-for/discord`, `/symbols-for/tiktok`

### Skipped
- `/blog/*` (17 routes — out of scope per Section 2)
- `/search`, `/symbols-for/whatsapp`, `/symbols-for/twitter`, `/symbols-for/facebook` (sampling — covered by the 3 platform pages above)
- Homepage `/` (covered separately, single screenshot)

**Total: ~46 pages × 2 viewports = ~92 screenshots.**

## 4. Approach — fanout-fanin with batched vision

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Phase A        │     │  Phase B        │     │  Phase C        │
│  (1 agent)      │ ──> │  (5 agents,     │ ──> │  (1 agent)      │
│                 │     │   parallel)     │     │                 │
│  - merge-preview│     │  - 6 screens    │     │  - read all     │
│  - playwright   │     │    each         │     │    findings     │
│  - screenshots  │     │  - vision review│     │  - apply fixes  │
│  - findings dir │     │  - JSON output  │     │  - write report │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Phase A — Setup & screenshot
**Single agent, sequential, ~10 min.**

1. `git checkout main` then create `_audit-base` = main + merge `agent/code-audit` + merge `agent/indexing-fixes` + merge `agent/generator-overhaul`. Skip `agent/ceo-roadmap` (no code).
   - Resolve any merge conflicts as they appear (most likely on `_agent-reports/` paths since each PR added files there).
   - The `_audit-base` branch is local-only — never pushed.
2. From `_audit-base`, branch `agent/visual-audit` (already exists at this design-doc commit; rebase it on `_audit-base`).
3. `npm install` (already done) → `npx playwright install chromium` → `npm run build` → `npm run start &` in background on port 3000. Wait for server ready (poll `http://localhost:3000`).
4. Run `_audit/scripts/screenshot-all.mjs` — Playwright script that:
   - Reads page list from `_audit/page-list.json` (committed)
   - For each page: opens at 1280×900 desktop, screenshots full-page, then resizes to 375×812 mobile, screenshots full-page
   - Saves to `_audit/screenshots/desktop/<slug>.png` and `_audit/screenshots/mobile/<slug>.png`
   - Also captures the rendered DOM text content to `_audit/dom-snapshots/<slug>.txt` — this is what AI vision can cross-reference for literal `\u`-escape detection
5. Stop the dev server.
6. Commit screenshots + DOM snapshots to `agent/visual-audit`. Output: `_audit/page-list.json`, `_audit/screenshots/`, `_audit/dom-snapshots/`.

### Phase B — Vision review (5 parallel agents)
**5 agents in parallel, ~15 min wall time.**

Main Claude (orchestrator) reads `_audit/page-list.json`, splits into 5 batches of ~9 pages each (= ~18 screenshots per agent including mobile). Each agent:

1. Reads its assigned screenshots + matching DOM snapshots
2. For each page, applies the per-screenshot checklist (Section 5)
3. Outputs structured JSON to `_audit/findings-batch-<N>.json`:
   ```json
   [
     {
       "page": "/symbols/punctuation",
       "viewport": "desktop",
       "screenshot": "_audit/screenshots/desktop/symbols-punctuation.png",
       "issues": [
         {"severity": "high", "category": "literal-escape", "evidence": "First 4 cards show \\u201C, \\u201D, \\u2018, \\u2019 as literal text", "suggested_fix": "data-fix"},
         {"severity": "medium", "category": "thin-content", "evidence": "Only 24 words of intro copy above the grid", "suggested_fix": "copywriting"}
       ],
       "all_clear": false
     }
   ]
   ```

### Phase C — Synthesis, fixes, report (1 agent)
**Single agent, sequential, ~10 min.**

1. Read all `_audit/findings-batch-*.json`. Aggregate.
2. Apply auto-fixes for `suggested_fix == "data-fix"`:
   - Literal-escape strings in `src/data/*.ts`: replace `"\\u201C"` → `"“"` etc.
   - Exact duplicate cards (same `symbol`, same `category`): drop second occurrence
   - Dead categories (zero items post-merge): remove from `categories` array in `symbols.ts`, update sitemap accordingly
3. Re-run a sanity build (`npm run build`) — must pass.
4. Write `_agent-reports/STATE-OF-WEBSITE.md` per Section 7.
5. Commit fixes + report. Push `agent/visual-audit`.
6. Output GitHub compare URL.

## 5. Per-screenshot checklist (vision agents)

For each screenshot, flag:

1. **Literal escape strings** — any visible text matching `\u[0-9A-Fa-f]{4}` or `&#\d+;` patterns. Cross-check against the DOM snapshot for accuracy.
2. **Visual duplicates** — two cards with identical glyph + identical title.
3. **Miscategorisation** — items whose glyph clearly doesn't match the category (e.g., emoji in a Unicode-symbol category).
4. **Empty grid** — page renders but the symbol grid is empty or shows < 3 items.
5. **Layout breakage** — text overflow, broken card grid, missing icons, distorted images, weird spacing, content cut off below the viewport without a scrollbar.
6. **Mobile-specific issues** — horizontal scroll, font sizes < 12px on mobile, tap targets < 32px, content hidden behind a fixed header/footer.
7. **Missing copy or CTA** — page has only a grid with no intro paragraph and no related links — flag as thin-content.
8. **Anything else weird** — free-text field for issues that don't fit the above.

Severity levels: `high` (broken UX or wrong data), `medium` (suboptimal, fixable), `low` (cosmetic or minor).

## 6. Auto-fix policy

### Auto-applied (Phase C)
- Literal-escape strings in `src/data/*.ts` (deterministic find-replace)
- Exact duplicate cards (same `symbol` + `category`, drop later occurrences)
- Dead categories with zero items post-merge (remove from category list + sitemap)
- Missing canonical helper on any page that surfaced (apply `canonical("/path")`)

### Reported only, NOT auto-applied
- Layout / CSS issues (need design judgment)
- Thin-content copy (CEO roadmap → copywriting skill)
- Mobile responsive issues (one-by-one, design judgment)
- Anything ambiguous → goes into "needs your eyes" section of the report

## 7. Report structure (`_agent-reports/STATE-OF-WEBSITE.md`)

1. **Executive summary** (one paragraph): pages audited, total issues, breakdown by severity
2. **What this PR fixes automatically** — bullet list with counts
3. **Per-page table**:
   | Page | Desktop | Mobile | Issues | Auto-fixed | Severity |
   |---|---|---|---|---|---|
   | (path) | ✅/⚠️ | ✅/⚠️ | (count) | Y/N | (high/medium/low) |
4. **Top 10 issues** with screenshot inline + suggested fix
5. **Patterns across the site** (e.g., "8 of 14 category pages have < 30 words of intro copy" — points at a systemic gap)
6. **Recommendations grouped by effort**:
   - 1-day: fixable in this PR or the next
   - 1-week: feature-level work (e.g., subscript-maker tool, /community build-out)
   - 1-month: rebuilds, e.g., `/symbols/[category]` with tabs/filters once data > 250 per category
7. **Subscript-maker tool stub** — one paragraph teaser, links to PR 6 (to be created)
8. **Appendix**: full findings JSON link, raw screenshot links

## 8. Critical files

### Read-only
- `src/app/sitemap.ts` — list of routes to audit
- `src/data/symbols.ts`, `src/data/extra-symbols.ts`, `src/data/generated-symbols.ts` — data sources
- `_agent-reports/CLEANUP-QUARANTINE.md` — context for what's already been cleaned

### Modified
- `_audit/scripts/screenshot-all.mjs` (new)
- `_audit/page-list.json` (new)
- `src/data/*.ts` (only for literal-escape and exact-dupe fixes)
- `src/data/symbols.ts` (potentially: remove dead category from `categories` array)
- `src/app/sitemap.ts` (potentially: remove dead-category sitemap entry)
- `_agent-reports/STATE-OF-WEBSITE.md` (new)

### Created
- `_audit/screenshots/desktop/*.png` (~46 files)
- `_audit/screenshots/mobile/*.png` (~46 files)
- `_audit/dom-snapshots/*.txt` (~46 files)
- `_audit/findings-batch-*.json` (5 files)

## 9. Verification

### Build & lint
- `npx tsc --noEmit` clean
- `npm run lint` no new errors (carry-overs from main are OK)
- `npm run build` succeeds, all routes generate

### Audit specific
- Phase A: every page in `page-list.json` has both desktop + mobile screenshots saved + DOM snapshot captured
- Phase B: every screenshot has a corresponding entry in some `findings-batch-*.json`
- Phase C: every issue with `suggested_fix == "data-fix"` either applied (and tracked in commit message) or moved to the "needs your eyes" section with a reason
- Manual: spot-check 5 random pages on `npm run dev` post-fix to confirm the literal-escape fix actually rendered correctly

### Smoke test
- After Phase C commit: `npm run build && npm run start` and click through 5 random category pages — no console errors, no broken layout, copy buttons work

## 10. Risks & open questions

- **Risk:** Merge conflicts when creating `_audit-base`. Mitigation: each agent PR only added files in its own `_agent-reports/<name>.md` slot, so the only likely conflicts are if two PRs touched the same file. Code-audit + indexing-fixes both touched `src/app/page.tsx` (Agent 2 confirmed). Resolution: take Agent 2's version (newer fix), re-run `tsc` to confirm.
- **Risk:** Playwright install size (~300MB Chromium). Mitigation: install on the fly with `npx playwright install chromium`, accept the disk hit, the audit branch only needs it once.
- **Risk:** AI vision misreads a stylised glyph as a literal escape (e.g., a font that renders fancy quotes as backslash-style). Mitigation: cross-check against DOM snapshot (raw text) — if DOM shows `"` and vision says `“`, trust DOM.
- **Open question:** When the user merges the 4 PRs to main, this `agent/visual-audit` branch will need a rebase. Plan: rebase on top of merged main, force-push (acceptable for an audit branch, not main).

## 11. Acceptance criteria

- All 4 PRs (`agent/code-audit`, `agent/indexing-fixes`, `agent/generator-overhaul`, `agent/ceo-roadmap`) merged into main first → audit branch rebased and PR opened
- Report file present at `_agent-reports/STATE-OF-WEBSITE.md`
- Every screenshot referenced in the report exists in `_audit/screenshots/`
- Build green
- The two user-spotted bugs (literal `“`, duplicate `2`) are explicitly addressed in the report (either as auto-fixed or as "still needs work + here's why")
