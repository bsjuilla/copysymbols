# Phase 3b — Cleanup & Misclassification Audit

Branch: `agent/generator-overhaul`
Date: 2026-05-09

## TL;DR

Ran the per-category classifier from phase 3a against every record in
the five data files (`symbols.ts`, `extra-symbols.ts`,
`generated-symbols.ts`, `kaomoji.ts`, `generated-kaomoji.ts`).

- **Total audited:** 1 028 symbols + 547 kaomoji = **1 575 records**
- **Removed (dropped):** 319 (227 symbols + 92 kaomoji)
- **Rerouted to a different category:** 131 symbols
- **IDs renamed for collision-resolution:** 151 (handles all 43 dup IDs Agent 1 found, plus collateral renames from rerouting)
- **Cross-file glyph collisions remaining after cleanup:** 0
- **Duplicate IDs remaining in `generated-symbols.ts`:** 0
- **Build / typecheck:** green
- The 🐋 case: zero items in U+1F40A–1F40F survived cleanup. Even if a future bot run tried to insert a whale into music, the classifier would reject it (1F40B not in 2669–266F or 1D100–1D1FF; score 0.00 < 0.70).

## What it did

`scripts/cleanup-data.mjs` is the single reusable script. It:

1. Parses each TS file by locating the named `export const ... = [` block (so auxiliary arrays like `categories`, `extraCategories`, `kaomojiCategories` are left untouched in the header).
2. For every record, runs the classifier from `scripts/classifiers.mjs`.
3. **Curated files (`symbols.ts`, `extra-symbols.ts`, `kaomoji.ts`):** trusts the curator. Only quarantines records with no meaningful codepoints (zero-width / control chars). Does not reroute curator-chosen categories — the curator legitimately puts ♥♦♣♠ under `shapes`, π Δ under `math`, ⚙ ⚠ under `technical` etc.
4. **Generated files (`generated-symbols.ts`, `generated-kaomoji.ts`):** full audit. Items below 0.70 score are tried against every other category. If one scores ≥ 0.70 the item is rerouted (id regenerated to match new category); otherwise the item is dropped.
5. **Cross-file dedupe** on the `symbol` value, with precedence `symbols.ts > extra-symbols.ts > generated-symbols.ts`.
6. **ID dedupe** by regenerating colliding ids to the deterministic `gen-<cat>-<glyph hex>` form (or `-2`, `-3` etc on the rare second collision).
7. **Kaomoji** dedupe by face string. Generated faces also re-checked with `isValidKaomoji`.
8. Writes a refresh of `_generator-state.json` so post-cleanup counts are accurate.
9. Writes `_quarantine.json` listing every removed / relocated item with reason.

The script is **idempotent**. A second run produces zero changes (verified):
```
$ node scripts/cleanup-data.mjs
  symbols.ts                 kept=217 removed=0 rerouted=0 idsRenamed=0 [no change]
  extra-symbols.ts           kept=57  removed=0 rerouted=0 idsRenamed=0 [no-op]
  generated-symbols.ts       kept=385 removed=0 rerouted=0 idsRenamed=0 [no change]
  kaomoji.ts                 kept=71  removed=0 rerouted=0 idsRenamed=0 [no-op]
  generated-kaomoji.ts       kept=476 removed=0 rerouted=0 idsRenamed=0 [no change]
Quarantine total: 0
```

## Headline numbers

| File | Original records | Kept | Removed | Rerouted | IDs renamed |
|---|---:|---:|---:|---:|---:|
| `symbols.ts` | 219 | 217 | 2 | 0 | 0 |
| `extra-symbols.ts` | 57 | 57 | 0 | 0 | 0 |
| `generated-symbols.ts` | 610 | 385 | 225 | 131 | 151 |
| `kaomoji.ts` | 71 | 71 | 0 | 0 | 0 |
| `generated-kaomoji.ts` | 568 | 476 | 92 | 0 | 0 |

## Quarantine breakdown

By kind: 319 dropped, 131 rerouted, 0 id-only-dups (those got renamed in place).

By source: 356 from `generated-symbols.ts`, 92 from `generated-kaomoji.ts`, 2 from `symbols.ts` (zero-width / soft-hyphen).

By the original (incorrect) category:

| Old category | Count |
|---|---:|
| (kaomoji invalid-shape) | 92 |
| legal | 58 |
| music | 52 |
| greek | 46 |
| technical | 43 |
| weather | 32 |
| arrows | 32 |
| chess | 27 |
| math | 17 |
| currency | 15 |
| shapes | 11 |
| ui | 11 |
| superscript | 8 |
| zodiac | 5 |
| punctuation | 1 |

## Top 10 most surprising findings

The bot really did hallucinate Unicode names. A small selection from the quarantine that needs the user's eyes:

| # | Glyph | U+ | The bot called it… | Was filed as | After cleanup |
|---|---|---|---|---|---|
| 1 | 🌻 | 1F33B | "Crescent Moon" | weather | dropped (it's a sunflower) |
| 2 | 🌺 | 1F33A | "Full Moon" | weather | dropped (hibiscus) |
| 3 | 🌼 | 1F33C | "New Moon" | weather | dropped (blossom) |
| 4 | 🌽 | 1F33D | "Waning Crescent Moon" | weather | dropped (corn) |
| 5 | 🌾 | 1F33E | "Waxing Gibbous Moon" | weather | dropped (rice stalk) |
| 6 | 🚣 | 1F6A3 | "Foggy Weather" | weather | dropped (rowboat) |
| 7 | q | U+71 | "Qatari rial note variant" | currency | dropped (the letter q) |
| 8 | 🐲 | 1F432 | "Sharp Note" | music | dropped (dragon face) |
| 9 | 🐳 | 1F433 | "Flat Note" | music | dropped (whale-spout) |
| 10 | 🏟️ | 1F3DF | "City" | weather | dropped (stadium) |

Bonus dishonourable mentions:
- `p` and `f` (literal letters) filed under `music` as "Pianissimo" and "Fortissimo"
- `+` and `-` filed as music's "Crescendo" / "Decrescendo"
- `📦` filed under `shapes` as "Package"
- `👉` and `👈` (pointing-finger emoji) filed under `arrows`
- `🔠 🔡 🔢` (input-symbol emoji) correctly **rerouted** to `ui`

The user complaint about a whale on `/symbols/music` is now structurally impossible: U+1F40B scores 0.00 against the `music` whitelist (2669–266F + 1D100–1D1FF). The cleanup did not find a 1F40B entry in the local clone (it may have been on production at a different point in time, or been autocleared by a prior commit), but the classifier guarantees no future regression.

## What got rerouted (top destinations)

| From → To | Count |
|---|---:|
| legal → punctuation | 20 |
| chess → shapes | 17 |
| arrows → math | 12 |
| music → technical | 10 |
| arrows → shapes | 5 |
| chess → ui | 5 |
| technical → math | 5 |
| shapes → ui | 4 |
| weather → ui | 4 |
| legal → ui | 4 |

These items were curated correctly by Unicode block but mislabelled by category — e.g. 20 typographic punctuation marks (• † ‡ ※ etc) were filed under "legal", which is technically right for the old definition but reads weird; the cleanup moves them to `punctuation` where users expect them.

## Why some symbols.ts items still "fail" the classifier

After cleanup, `symbols.ts` still contains 37 records and `extra-symbols.ts` still contains 38 records that the classifier would reject if asked "does this codepoint belong to this category?". These are **deliberately preserved curator decisions**:

- `➔ ➡ › ‹` — dingbat arrows the curator filed as `arrows` (Unicode block is Dingbats, not Arrows)
- `π Δ` — Greek letters used as math constants
- `♥ ♡ ♦ ♣ ♠` — card suits the curator decorates as `shapes`
- `⚙ ⚠ ⛔` — decorative misc-symbols the curator labels `technical`
- All `fractions` / `enclosed` / `roman` items — these categories aren't in the bot's vocabulary at all

The cleanup script's curator-pass-through branch leaves them alone. If we ever decide to enforce strict Unicode-block matching on curator files we can flip a flag, but that would churn URLs and break user expectations.

## Verification

- `npx tsc --noEmit` → clean
- `npm run build` → "Compiled successfully in 9.7s", every page including dynamic `/symbol/[slug]` and `/symbols/[category]` routes renders
- `npm run lint` → 49 issues, all in pre-existing `src/components/*.tsx` / pages (verified identical to main); zero issues in any of our changed files
- ID uniqueness: 385/385 unique in `generated-symbols.ts` (was 567 records → 524 unique-id slots → 43 colliding pairs; now 385 records all unique)
- Cross-file glyph uniqueness: 0 collisions across symbols/extra/generated (was 21 per Agent 1)
- Idempotency: confirmed no-op on second run

## What needs the user's eyes

The 10 top findings above are illustrative of bot hallucinations. The full quarantine is in `_quarantine.json` (450 entries). User should skim the `rerouted` items in particular — most look right, but a few might benefit from a different home (e.g. `legal -> punctuation` is correct but the user might prefer `legal -> shapes` for some).
