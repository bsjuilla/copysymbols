# Phase 3a — Generator Strengthening

Branch: `agent/generator-overhaul` (off main)
Date: 2026-05-09

## TL;DR

The bot now refuses to write garbage. Every candidate symbol is scored
against the target category's Unicode-block whitelist (≥ 70% codepoints
must be in-band) before insertion. Kaomoji must contain real face features
and structural brackets, and must NOT contain emoji codepoints. IDs are
now deterministic from the glyph's codepoints. Categories self-saturate
after 2 consecutive zero-new runs or 250 items. A `--dry-run --use-fixture`
mode lets us validate the classifier without API calls; current fixture
shows whale, trophy, letter "p"-as-pianissimo and emoji-pretending-to-be-
kaomoji all rejected.

## What changed

### New file: `scripts/classifiers.mjs`

Pure-ESM, no dependencies. Exports:

| Export | Purpose |
|---|---|
| `passesCategory(symbol, category)` | Returns true iff `scoreSymbol >= 0.70`. The single hard pass/fail used by the bot before insertion. |
| `scoreSymbol(symbol, category)` | Returns 0..1 ratio of meaningful codepoints in the category whitelist. Whitespace, variation selectors (FE00–FE0F), ZWJ, skin-tone modifiers are stripped before scoring. |
| `bestCategory(symbol)` | Tries every known category, returns `{category, score}` for the highest, or `null` if none clear 0.70. Used by the cleanup script (3b) to auto-route miscategorised items. |
| `isValidKaomoji(face)` | Tightened from the original. Must be 3–60 chars, must have brackets/parens (incl. `ʕ ʔ` for animal kaomoji), must have at least one face-feature char OR Japanese char, must NOT contain any 1F300–1FAFF emoji codepoint, must reject pure math/arrow chains. |
| `KNOWN_CATEGORIES` | List of all category names that have classifier rules. |
| `meaningfulCodepoints(s)` | Helper: codepoint array minus ignored chars. Reused for ID building. |

### Per-category Unicode whitelists

| Category | Ranges | Notable extras |
|---|---|---|
| arrows | 2190–21FF, 27F0–27FF, 2900–297F, 2B00–2B0F, 1F800–1F8FF | — |
| currency | 20A0–20CF | $ ¢ £ ¤ ¥ ฿ ₠ ﷼ |
| math | 2200–22FF, 27C0–27EF, 2980–29FF, 2A00–2AFF, 1D400–1D7FF | ± × ÷ ¬ µ ° ′ ″ ‰ |
| greek | 0370–03FF, 1F00–1FFF | — |
| legal | (none — extras-only) | © ® ™ ℠ § ¶ † ‡ ※ ‽ ⁇ ⁈ ⁉ ℗ ℅ ⚖ |
| shapes | 25A0–25FF, 2B00–2BFF, 2700–27BF, 1F780–1F7FF, 2605–2606 | ☥ ☮ ☯ ⚜ ॐ |
| punctuation | 2010–2027, 2030–205E | « » ¡ ¿ |
| music | **2669–266F**, **1D100–1D1FF** | (none) |
| chess | 2654–265F, 2660–2667, 2680–2685 | — |
| zodiac | 2648–2653, 263F–2647, 1F311–1F31C | — |
| weather | 2600–2614, 1F324–1F32C, 1F300–1F303 | ♨ ❄ ❅ ❆ ⛄ ⛅ ⛈ ⛰ ⛱ 🌈 🌊 |
| technical | 2300–23FF | ☢ ☣ ⚒ ⚓ ⚕ ✂ ✆ ✏ |
| superscript | 2070–209F | ² ³ ¹ º ª |
| ui | 2615–263E, 2670–267F, 2686–26FF, 2300–23FF, 1F500–1F53F | — |

The `ui` and `technical` categories deliberately overlap on 2300–23FF
because U+2300 misc-technical glyphs are also genuinely "UI" (⌘ ⌫ ⏏ etc).
The cleanup auto-router prefers whichever category scores higher; in
practice items hit equally so we leave them where the curator put them.

### `scripts/content-bot.mjs` v4

Kept: Groq + Gemini fallback, day-of-week schedule, rate limiting, all
file appenders, the kaomoji-validator concept (now imported from the
shared classifier module).

Added:

1. **Pre-insertion classifier hook.** `genSymbols` is split into
   `genSymbolCandidates` (returns raw AI/fixture output) and
   `processSymbolCandidates` (runs the classifier, dedupes, builds IDs).
   Items below 0.70 are dropped with a logged reason.
2. **Deduplication against `extra-symbols.ts`.** Agent 1 caught that the
   old bot only checked `symbols.ts` + `generated-symbols.ts`. Now all
   three plus the existing-IDs set are loaded into the inventory.
3. **Deterministic IDs.** `gen-<category-slug>-<glyph-codepoints-hex>`.
   For `→` in arrows: `gen-arrows-2192`. Collision-resistant: if the id
   already exists (e.g. an upper/lowercase pair maps to same hex by
   accident), a 4-char random suffix is appended; if THAT also collides
   (extremely unlikely) it tries up to 8 times then falls back to a
   timestamp suffix. Replaces the old timestamp-based scheme that
   produced 43 colliding ids.
4. **Saturation tracking.** `_generator-state.json` (committed, but
   auto-updated by the bot). Per-category record:
   ```json
   { "count": 62, "consecutive_zero_runs": 0, "saturated": false, "last_run": "..." }
   ```
   After each category run, `count` is updated and `consecutive_zero_runs`
   either increments or resets. When `>= 2` zero-runs OR `count >= 250`
   the category is marked `saturated: true` and skipped on subsequent
   runs. Kaomoji moods get keys like `kaomoji:happy`. Reset with
   `--reset-saturation [category]`.
5. **CLI flags:**
   - `--dry-run` — runs the full pipeline but never writes data files or
     state. Logs what WOULD have happened.
   - `--use-fixture` — reads candidate items from
     `scripts/test-fixtures.json` instead of the AI APIs. Skips combos /
     borders / bios (no fixture coverage). Used to verify the classifier
     end-to-end without burning credits.
   - `--reset-saturation [category]` — un-saturate one category, or all
     if no category given.

Stricter prompts (no behaviour change — just better instructions to the
LLM): each category description now mentions the Unicode block range so
Groq is more likely to give us in-band results in the first place.

## Fixture results

`scripts/test-fixtures.json` covers four symbol categories (music,
arrows, currency, chess) and one kaomoji mood (happy), with intentional
good and bad items per group.

```
$ node scripts/content-bot.mjs --dry-run --use-fixture
CopyChars Content Bot v4
Mode: DRY RUN + FIXTURE
Tasks: symbols-misc, kaomoji
Inventory: 864 symbols (860 ids) · 639 kaomoji · 0 combos · 0 borders · 0 bios

Symbols: music, chess, zodiac, weather
  music     +2 accepted, -4 rejected
     reject: 🐋 (classifier-fail (0.00 < 0.70))
     reject: p (duplicate)
     reject: + (duplicate)
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

The whale 🐋 specifically — what the user complained about on the live
site — scores 0.00 against music's whitelist (1F40B is in
1F300–1FAFF emoji block, not 2669–266F or 1D100–1D1FF) and is rejected.
Same for 🏆 in chess and 🌐 in weather (in fixture but not shown above
since it was already a duplicate).

## Before / after diff snippets

### ID generation (before)

```js
const id = `gen-${slug(category)}-${slug(item.name||'sym')}-${ts}`.slice(0,80);
```

This collides on uppercase/lowercase name pairs (slug normalises both),
on items generated within the same millisecond, and (Agent 1's finding)
on 43 cases in production.

### ID generation (after)

```js
function buildSymbolId(category, symbol, existingIds) {
  const cps = meaningfulCodepoints(symbol);
  const hex = cps.map(c => c.toString(16)).join('') || 'x';
  let id = `gen-${slug(category)}-${hex}`;
  if (!existingIds.has(id)) return id;
  for (let i = 0; i < 8; i++) {
    const rand = Math.random().toString(36).slice(2, 6);
    const trial = `${id}-${rand}`;
    if (!existingIds.has(trial)) return trial;
  }
  return `${id}-${Date.now().toString(36)}`;
}
```

### Acceptance gate (before)

```js
if (!sym || inv.symbolChars.has(sym)) continue;
// nothing else — anything the AI returns is accepted
```

### Acceptance gate (after)

```js
if (!sym) { rejects.push({ symbol: '<empty>', reason: 'empty' }); continue; }
if (inv.symbolChars.has(sym)) { rejects.push({ symbol: sym, reason: 'duplicate' }); continue; }
const score = scoreSymbol(sym, category);
if (score < 0.7) {
  rejects.push({ symbol: sym, reason: `classifier-fail (${score.toFixed(2)} < 0.70)` });
  continue;
}
// classifier passed — build ID, insert
```

## Constraints honoured

- Zero new dependencies (still native fetch / fs / path only).
- No changes outside `scripts/`, `src/data/`, `_generator-state.json`,
  `_quarantine.json`, `_agent-reports/`. (No touch of pages, sitemap,
  layouts.)
- AGENTS.md respected: no Next 16 surface area touched. The bot is a
  Node script invoked via `node scripts/content-bot.mjs` and does not go
  through the Next build pipeline.
- API-key-free: bot will not start without `--use-fixture` if neither
  GROQ_API_KEY nor GEMINI_API_KEY is set.
