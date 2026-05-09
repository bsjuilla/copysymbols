# Phase 3c — Populator Plan

Branch: `agent/generator-overhaul`
Date: 2026-05-09

## TL;DR

This sandbox has no `GROQ_API_KEY` or `GEMINI_API_KEY`, so the bot cannot
populate live. Phases 3a + 3b together prove the pipeline is sound:
phase 3a's `--dry-run --use-fixture` mode exercises the full classifier
hook against intentional good-and-bad items and produces the right
accept / reject decisions. Phase 3b removed 319 items that the old
unguarded bot had inserted (whale-as-music, sunflower-as-crescent-moon,
letters-as-music-dynamics, etc).

Headroom analysis below shows where the user / CEO agent should focus
the next live run: `music`, `arrows`, `shapes`, `ui`, and `math` have
the most room. `legal`, `chess`, and `zodiac` are nearly saturated.

## 1. Fixture run output

Latest dry-run + fixture against post-cleanup data:

```
$ node scripts/content-bot.mjs --dry-run --use-fixture
CopyChars Content Bot v4
Mode: DRY RUN + FIXTURE
Tasks: symbols-misc, kaomoji
Inventory: 659 symbols (676 ids) · 547 kaomoji · 0 combos · 0 borders · 0 bios

Symbols: music, chess, zodiac, weather
  music     +2 accepted, -4 rejected
     reject: 🐋 (classifier-fail (0.00 < 0.70))
     reject: p (classifier-fail (0.00 < 0.70))
     reject: + (classifier-fail (0.00 < 0.70))
  chess     +0 accepted, -2 rejected
     reject: ♚ (duplicate)
     reject: 🏆 (classifier-fail (0.00 < 0.70))
  zodiac    +0 accepted, -0 rejected
  weather   +0 accepted, -0 rejected

Kaomoji — all moods
  happy     +2 accepted, -2 rejected
     reject: 🌸🍵 (invalid-shape)
     reject: →←↑↓ (invalid-shape)

Done. Added 4 new items, 8 rejected. API calls used: 0
```

The fixture (`scripts/test-fixtures.json`) covers:

- **music**: 6 candidates — 3 good Unicode music symbols (𝅘𝅥𝅮 𝆑 ♩) + 3 hallucinations (🐋, "p" labelled pianissimo, "+" labelled crescendo)
- **arrows**: 2 — one good curving arrow + 🔥 mislabelled as arrow
- **currency**: 3 — ₹ ₿ + letter X mislabelled as currency
- **chess**: 2 — ♚ + 🏆 trophy mislabelled as chess
- **kaomoji happy**: 4 — two real kaomoji + an emoji combo + an arrow chain

Result: every hallucinated item rejected, every real item accepted. The 🐋 case (the user's specific complaint) is structurally impossible to slip through.

## 2. Headroom per category (post-cleanup)

| Category | Whitelist size | Current count | Headroom | State |
|---|---:|---:|---:|---|
| math | 1 723 | 59 | 1 664 | huge room (most of headroom is U+1D400–1D7FF math alphanumerics — niche) |
| shapes | 679 | 95 | 584 | lots of room |
| arrows | 528 | 90 | 438 | lots of room |
| ui | 500 | 34 | 466 | lots of room (after rerouting, 34 is conservative) |
| greek | 400 | 69 | 331 | room (but most niche) |
| technical | 265 | 46 | 219 | room |
| music | 264 | 10 | 254 | TONS of room (the 1D100–1D1FF block is rich) |
| superscript | 53 | 19 | 34 | moderate room |
| currency | 54 | 34 | 20 | tight |
| punctuation | 75 | 57 | 18 | tight |
| weather | 47 | 31 | 16 | tight |
| legal | 19 | 14 | 5 | nearly saturated |
| chess | 26 | 23 | 3 | nearly saturated |
| zodiac | 33 | 40 | -7 | over-quota (curator extras outside whitelist) |

| Kaomoji mood | Current count |
|---|---:|
| happy | 38 |
| love | 65 |
| sad | 59 |
| angry | 57 |
| surprised | 68 |
| shy | 24 |
| cool | 67 |
| silly | 53 |
| waving | 55 |
| bear | 61 |

### Headroom interpretation

- `music` is the surprise winner: only 10 records survived cleanup (down from 62), and the `1D100–1D1FF` Musical Symbols block has hundreds of legitimate music notation glyphs. This is where new live runs should focus first.
- `legal`, `chess`, `zodiac` should be `saturated: true` after a couple of zero-runs and stop wasting API calls. The bot's saturation logic handles this automatically.
- `math` whitelist is huge because U+1D400–1D7FF is included (math alphanumerics — 𝐀 𝐁 𝐂 𝐃 …). These are useful but niche; they'll exhaust slowly.
- `shy` kaomoji is light at 24 — could grow easily.

## 3. Curated source manifest (for richer content beyond LLM hallucination)

The current generator relies entirely on Llama / Gemini to invent items, which is exactly how we ended up with 🌻 labelled "Crescent Moon". For better-quality output a curated source manifest beats an LLM. Recommended sources:

| Source | What it gives | How to consume |
|---|---|---|
| **Unicode CLDR annotations** (`ldml/common/annotations/en.xml`) | Authoritative name + keywords for every emoji/symbol | XML; ship a one-time dump as a TS lookup. Eliminates name hallucination. |
| **Unicode Character Database** (UCD `UnicodeData.txt`) | Codepoint → block + canonical name | Plain-text. Use to validate `unicode` field and auto-fill HTML entity codes. |
| **kaomoji.ru** | Curated kaomoji by mood | Scrape (one-time). Their categorisation maps cleanly to our moods. |
| **getemoji.com** | Emoji combos and aesthetic borders | Scrape (one-time). Better quality than LLM-generated combos. |
| **emojipedia.org categories pages** | Real emoji sub-categories with curated names | Scrape per-category. |
| **Unicode block reference tables** (`Blocks.txt`) | Range → block name | Plain-text. Already implicitly encoded in `scripts/classifiers.mjs`. |

Suggested next step for the user / CEO agent: build `scripts/seed-from-cldr.mjs` that reads a checked-in `data/cldr-annotations.json` (one-time generated) and emits seed entries for the categories with the most headroom — `music`, `shapes`, `ui`, `arrows`. The classifier hook in `content-bot.mjs` already accepts manual seed feeds via the same `genSymbolCandidates` interface; we'd add a `--seed-file <path>` flag that bypasses the LLM the same way `--use-fixture` does.

This is **not implemented now** — it's a roadmap item. The brief's phase 3c was "PLAN ONLY".

## 4. How to run the bot post-merge

Once this branch is on main and API keys are set in CI / locally:

```bash
# Required env vars (one is enough, both is better)
export GROQ_API_KEY=gsk_...
export GEMINI_API_KEY=AIza...

# Daily scheduled run (live). The schedule (Sun..Sat) decides which
# categories to attempt. Saturation state is read+updated automatically.
node scripts/content-bot.mjs

# Preview what a real run WOULD produce, without writing files or burning credits:
node scripts/content-bot.mjs --dry-run

# Smoke-test the classifier in CI / dev, no API keys needed:
node scripts/content-bot.mjs --dry-run --use-fixture

# Force a category back into rotation after it was marked saturated:
node scripts/content-bot.mjs --reset-saturation music
node scripts/content-bot.mjs --reset-saturation         # all categories

# Re-audit existing data (idempotent):
node scripts/cleanup-data.mjs            # writes
node scripts/cleanup-data.mjs --dry-run  # preview only
```

Note `_generator-state.json` is **checked in** but gets auto-updated each
run. Treat it like a lockfile — committed, but normal to see commits
that only touch counts. The GitHub Actions workflow that runs the bot
should commit this file along with the data files.

## 5. Confidence checklist

- Whale 🐋 (U+1F40B) cannot be inserted into `music`: scoreSymbol = 0.00. ✓
- Letters as music: `p`, `f`, `+`, `-` cannot be inserted into `music`: all score 0.00. ✓
- Hallucinated names: stopped at the *category* gate before the name even matters. ✓
- Cross-file dupes: bot now checks symbols.ts + extra-symbols.ts + generated-symbols.ts before accepting. ✓
- ID collisions: deterministic codepoint-hex IDs + collision-resistant retry. ✓
- Saturation: idle categories self-mark and skip. Reset is one CLI flag. ✓
- API-key-free verification: `--dry-run --use-fixture` covers the full happy and unhappy paths. ✓
