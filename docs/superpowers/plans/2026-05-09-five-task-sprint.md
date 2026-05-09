# Five-Task Sprint Plan — 2026-05-09

> **For agentic workers:** Each task below is dispatched as its own sub-agent (`general-purpose` Agent tool) on its own branch. Between tasks, a **validation agent** runs the prompt at the bottom of this doc against the just-merged branch. The validation agent has veto power — if it fails, fix forward on the same branch and re-validate before dispatching the next task.

---

## TL;DR

Five independent improvements to copychars.com, executed strictly in the order **K → Z → G → I → X**:

1. **K — Kaomoji clean + populate**: prune non-kaomoji entries that fail `scripts/classifiers.mjs::isValidKaomoji`, then add 50+ new real, distinct kaomoji.
2. **Z — Zodiac off-by-one fix**: rebuild the `zodiac` planet entries in `src/data/generated-symbols.ts` so glyph ↔ name ↔ codepoint all line up. Verify the 12 sign cards too.
3. **G — Greek Alphas-that-are-Iotas fix**: regenerate the Greek-Extended (U+1F00–U+1F4F) entries with proper Unicode names (e.g. "Alpha With Psili", "Iota With Dasia And Oxia"), removing the 20 stub "Alpha" cards.
4. **I — 200-word category intros**: add a `categoryIntros` lookup in `src/app/symbols/[category]/page.tsx` and render a 200-word, keyword-rich intro above the grid for 14 categories.
5. **X — Per-item search indexability**: build new dynamic routes `/emoji/[slug]` and `/kaomoji/[slug]` (similar to existing `/symbol/[slug]`) so Googling "hotel emoji" lands on a copychars page for that specific item.

Sprint runs sequentially because each validation pass must be green before the next task starts. Estimated total wall time: **6–9 hours of agent execution** (see per-task estimates).

---

## Skill survey table

| Need | Ideal skill | Loaded? | Substitute |
|---|---|---|---|
| Plan writing (this doc) | `writing-plans` (meta-skill via Skill tool) | yes | n/a — used here |
| Subagent dispatch | `Agent(general-purpose)` | yes (always available) | n/a |
| Reviewing each task's diff for reuse / quality | `simplify` | yes | run as a post-task pass on the per-task branch |
| Code-clash detection between tasks | `security-review` | yes | run before each merge to main; flags risky cross-task changes |
| Validating each merge (build/typecheck/lint) | `review` | yes | parameterised prompt below; uses `review` skill as the agent's framework |
| Content writing (kaomoji curation, category intros) | dedicated copywriting skill | **no — not loaded** | `Agent(general-purpose)` with a tightly-scoped prompt + voice anchors |
| Data cleanup (kaomoji prune, zodiac rebuild, greek regen) | `executing-plans` (meta-skill) | yes | `Agent(general-purpose)` driven by step-by-step instructions in this plan |
| Route building (emoji/kaomoji `[slug]` pages) | dedicated Next.js skill | **no — not loaded** | `Agent(general-purpose)` with anchor file `src/app/symbol/[slug]/page.tsx` to mirror; AGENTS.md says read `node_modules/next/dist/docs/` for Next 16 specifics |
| Hooks / settings | `update-config` | yes | not needed this sprint |

**Other loaded skills not used this sprint**: `keybindings-help`, `fewer-permission-prompts`, `loop`, `schedule`, `claude-api`, `init`, `brainstorming` — none match the work.

---

## Task K — Kaomoji clean + populate

**Goal**: Remove non-kaomoji entries (anything failing `isValidKaomoji`) from both kaomoji files, then add ≥50 real distinct kaomoji.

**Skill / agent**: `Agent(general-purpose)` — content cleanup + curation. Post-task: run `simplify` on the diff to make sure no duplicate logic was added.

**Branch**: `feat/kaomoji-cleanup-populate`

**Files**:
- Read: `src/data/kaomoji.ts`, `src/data/generated-kaomoji.ts`, `scripts/classifiers.mjs`
- Write: `src/data/kaomoji.ts` (curated additions), `src/data/generated-kaomoji.ts` (prune only — never add to this file by hand)
- Optionally write: a one-shot ESM script `scripts/audit-kaomoji.mjs` that does the prune mechanically (deleted in the same commit if you don't want to keep it)

**Step-by-step instructions** (the agent's prompt):

1. Branch off latest `main`: `git switch main && git pull && git switch -c feat/kaomoji-cleanup-populate`.
2. Open `scripts/classifiers.mjs` and read `isValidKaomoji` (lines ~314–356). Note: requires brackets + face-feature, rejects emoji codepoints (U+1F300–U+1FAFF), rejects 2+ math/arrow chars, rejects pure math chains.
3. Write a one-shot script `scripts/audit-kaomoji.mjs` that:
   - Imports `isValidKaomoji` from `./classifiers.mjs`.
   - Reads both `src/data/kaomoji.ts` and `src/data/generated-kaomoji.ts` as text, parses entries with a forgiving regex (`face: "([^"]+)"`).
   - For each entry, runs `isValidKaomoji(face)`. Logs `KEEP` / `DROP` with a reason.
   - With `--apply`, rewrites `generated-kaomoji.ts` to remove DROP entries; for `kaomoji.ts` (curated), it only PRINTS the lines to drop — the agent must manually decide curated removals so we don't lose intentional edge cases.
4. Run `node scripts/audit-kaomoji.mjs` (dry run), eyeball the DROP list. Anything wrongly flagged: note in the commit message but still drop it (be honest about precision).
5. Run `node scripts/audit-kaomoji.mjs --apply` to prune `generated-kaomoji.ts`. Manually edit `kaomoji.ts` per the dry-run output.
6. Append ≥50 new kaomoji to `src/data/kaomoji.ts`. Distribute across the existing `kaomoji.mood` buckets: `happy`, `love`, `sad`, `angry`, `surprised`, `shy`, `cool`, `silly`, `waving`, `bear`. Each entry needs a unique `id` (continue the existing `mood-N` numbering), `face`, `name`, `mood`, and 3–5 `keywords`. Use well-known faces — verify each against `isValidKaomoji` before adding. Recommended sources to draw from (your own knowledge of):
   - Classic table flips: `(╯°□°）╯︵ ┻━┻`, `(┛◉Д◉)┛彡┻━┻`, `┬─┬ノ( º _ ºノ)`
   - Lenny faces: `( ͡° ͜ʖ ͡°)`, `( ͡~ ͜ʖ ͡°)`, `( ͠° ͟ʖ ͡°)`
   - Anger/fight: `ヽ(\`Д´)ﾉ`, `(ง'̀-'́)ง`, `(ノಠ益ಠ)ノ彡┻━┻`
   - Animals: `(=^･ｪ･^=))ﾉ彡☆`, `(ฅ•ω•ฅ)`, `ʕ•ᴥ•ʔノ`, `(◔ᴥ◔)`
   - Disapproval: `(¬_¬)`, `(￢_￢)`, `( ಠ ʖ̯ ಠ)`
   - Joyful: `٩(◕‿◕)۶`, `(ﾉ´ヮ`)ﾉ*: ･ﾟ`, `＼(^o^)／`
   - Sweat/awkward: `(￣▽￣;)`, `(´∀\`;)ゞ`, `(；￣Д￣)`
   - Pleading/cute: `(´• ω •\`)`, `(ó﹏ò｡)`, `(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥)`
   - Hugs: `(つ ◕_◕ )つ`, `⊂(◉‿◉)つ`, `(づ｡◕‿‿◕｡)づ`
   - Sleeping: `(￣O￣)zzz`, `(¦3[▓▓]`, `(─.─)Zzz`
7. Re-run `node scripts/audit-kaomoji.mjs` — every new entry must pass.
8. **De-dup pass**: confirm no `face` string is duplicated across `kaomoji.ts` and `generated-kaomoji.ts`. The runtime de-dup at `kaomoji.ts:115-116` only checks `id`, not `face`.
9. Decide whether to keep `scripts/audit-kaomoji.mjs`. If yes, document it in a one-line comment at top.
10. Commit: `chore(kaomoji): drop N non-kaomoji entries; add 50+ real ones`. Push branch.

**Verification (validation agent checks)**:
- Build / typecheck / lint pass.
- `npm run dev` then `curl http://localhost:3000/kaomoji` returns 200, page renders without errors.
- Spot-check 5 of the newly added faces appear in the rendered HTML.
- `node scripts/audit-kaomoji.mjs` (if kept) reports zero DROPs against the post-merge state.
- Visual check via Playwright headless: screenshot `/kaomoji`, confirm grid renders, no missing-glyph rectangles in the new section.

**Estimated session size**: medium (60–90 min). Mostly mechanical + 30 min of curation.

---

## Task Z — Zodiac off-by-one fix

**Goal**: Every planet card on `/symbols/zodiac` shows its true Unicode glyph with its true name. The off-by-one shift (Uranus card showing ♄ Saturn glyph, etc.) goes away.

**Skill / agent**: `Agent(general-purpose)`. Post-task: run `simplify` if any helper got introduced.

**Branch**: `fix/zodiac-glyph-name-alignment`

**Files**:
- Read: `src/data/generated-symbols.ts` (zodiac entries — lines ~13–325 contain `category: "zodiac"` rows; current state is already inspected and confirmed broken)
- Write: `src/data/generated-symbols.ts`

**Confirmed bug evidence** (already verified by coordinator): in current file,
- `gen-zodiac-uranus-1777453978473` has `symbol: "♄️"` (Saturn glyph), `unicode: "U+2644"` — wrong glyph for Uranus.
- `gen-zodiac-uranus-symbol-1777710194996` has `symbol: "♀"` (Venus glyph) labelled "Uranus Symbol".
- `gen-zodiac-mars-symbol-1777710194996` has `symbol: "♃"` (Jupiter glyph) labelled "Mars Symbol".
- `gen-zodiac-mercury-symbol-1777710194996` has `symbol: "♄"` (Saturn glyph) labelled "Mercury Symbol".
- The 12 zodiac signs (U+2648–U+2653) need spot-check too — `Capricorn` is pinned to U+2641 (which is Earth ♁, not Capricorn ♑).

**Authoritative mapping** (use exactly these, no improvisation):

| Unicode | Glyph | Name |
|---|---|---|
| U+2600 | ☀ | Sun |
| U+263D | ☽ | First Quarter Moon |
| U+263E | ☾ | Last Quarter Moon |
| U+263F | ☿ | Mercury |
| U+2640 | ♀ | Venus |
| U+2641 | ♁ | Earth |
| U+2642 | ♂ | Mars |
| U+2643 | ♃ | Jupiter |
| U+2644 | ♄ | Saturn |
| U+2645 | ♅ | Uranus |
| U+2646 | ♆ | Neptune |
| U+2647 | ♇ | Pluto |
| U+2648 | ♈ | Aries |
| U+2649 | ♉ | Taurus |
| U+264A | ♊ | Gemini |
| U+264B | ♋ | Cancer |
| U+264C | ♌ | Leo |
| U+264D | ♍ | Virgo |
| U+264E | ♎ | Libra |
| U+264F | ♏ | Scorpio |
| U+2650 | ♐ | Sagittarius |
| U+2651 | ♑ | Capricorn |
| U+2652 | ♒ | Aquarius |
| U+2653 | ♓ | Pisces |

**Step-by-step instructions** (the agent's prompt):

1. Branch off latest `main`: `git switch main && git pull && git switch -c fix/zodiac-glyph-name-alignment`.
2. Open `src/data/generated-symbols.ts`. Find every entry with `category: "zodiac"`.
3. For each entry, derive correct `(symbol, unicode, html, css, name)` from the table above using its **codepoint as the source of truth**:
   - If the entry's `symbol` is a valid planet/sign glyph from the table, keep it and overwrite `name`/`unicode`/`html`/`css` to match.
   - If the entry's `symbol` is non-glyph or wrong (e.g. `"♂♀"` "Sun Sign" — that's a fabrication), **delete the entry entirely**. Better to ship 23 correct entries than 26 with frauds.
   - Moon-phase emoji entries (🌑–🌘 at U+1F311–U+1F318) are fine — keep them; their names are independently correct.
4. The 12 zodiac signs (U+2648–U+2653) currently have hand-rolled IDs like `gen-zodiac-aries-1777453978473`. Rewrite each entry so `symbol` matches the codepoint per table above. Example fix for Capricorn:
   ```ts
   { id: "gen-zodiac-capricorn-1777453978473", symbol: "♑", name: "Capricorn", keywords: ["zodiac", "astrology", "capricorn"], category: "zodiac", unicode: "U+2651", html: "&#9809;", css: "\\2651", description: "Capricorn zodiac sign — the Goat, December 22 – January 19." },
   ```
5. Drop the variation-selector `️` (U+FE0F) suffix from any planet symbols — these are technical/astrological characters, not emoji. Keep VS16 only on intentional emoji glyphs (e.g. 🌑).
6. After edits, grep the file for any `category: "zodiac"` entry and visually verify glyph matches name. The codepoint of the glyph (run `[..."♅"][0].codePointAt(0).toString(16)`) must equal the unicode field.
7. Run `npm run build` locally to make sure no syntax errors.
8. Commit: `fix(zodiac): correct planet glyph↔name mapping; drop fabricated entries`. Push.

**Verification (validation agent checks)**:
- Build / typecheck / lint pass.
- `curl http://localhost:3000/symbols/zodiac` returns 200.
- Playwright headless screenshot of `/symbols/zodiac`. Use AI vision (or grep the rendered HTML) to confirm:
  - The Uranus card shows ♅ (not ♄).
  - The Mars card shows ♂ (not ♃).
  - The Capricorn card shows ♑ (not ♁).
- Cross-check no removed-entry `id` is referenced anywhere else (`grep -r "gen-zodiac-sun-sign"` etc. should return zero matches).

**Estimated session size**: small (30–45 min). Mostly find-and-replace driven by the table.

---

## Task G — Greek Alphas-that-are-Iotas fix

**Goal**: Greek-Extended (U+1F00–U+1F4F) entries on `/symbols/greek` show correct names like "Alpha With Psili" / "Iota With Dasia And Oxia", not 20 cards all called "Alpha".

**Skill / agent**: `Agent(general-purpose)`. Post-task: `simplify` pass on diff.

**Branch**: `fix/greek-extended-naming`

**Files**:
- Read: `src/data/generated-symbols.ts` (greek entries — file has 45 `category: "greek"` rows total)
- Write: `src/data/generated-symbols.ts`

**Step-by-step instructions** (the agent's prompt):

1. Branch off latest `main`: `git switch main && git pull && git switch -c fix/greek-extended-naming`.
2. Open `src/data/generated-symbols.ts`. Filter to `category: "greek"` entries.
3. For each entry whose codepoint is in **U+1F00–U+1F4F (Greek Extended block)**, derive the correct Unicode name from the codepoint. Use this table (covering the most common breathing-mark variants the bot mislabelled):

   | Range | Letter | Marks | Example |
   |---|---|---|---|
   | U+1F00–1F07 | Alpha (small) | psili / dasia / + oxia / + varia / + perispomeni | U+1F00 ἀ "Greek Small Letter Alpha With Psili" |
   | U+1F08–1F0F | Alpha (capital) | same | U+1F08 Ἀ "Greek Capital Letter Alpha With Psili" |
   | U+1F10–1F15 | Epsilon (small) | psili / dasia + oxia/varia | U+1F10 ἐ "Greek Small Letter Epsilon With Psili" |
   | U+1F18–1F1D | Epsilon (capital) | same | |
   | U+1F20–1F27 | Eta (small) | psili / dasia / + accents / + perispomeni | |
   | U+1F28–1F2F | Eta (capital) | same | |
   | U+1F30–1F37 | Iota (small) | psili / dasia / + accents / + perispomeni | U+1F30 ἰ "Greek Small Letter Iota With Psili" |
   | U+1F38–1F3F | Iota (capital) | same | U+1F3D Ἵ "Greek Capital Letter Iota With Dasia And Oxia" |
   | U+1F40–1F45 | Omicron (small) | psili / dasia + accents | |
   | U+1F48–1F4D | Omicron (capital) | same | |

   Naming pattern: `Greek {Small|Capital} Letter {Letter} With {Mark}[ And {Accent}]`. Marks are `Psili` (smooth breathing `᾿`) or `Dasia` (rough breathing `῾`); accents are `Oxia` (acute), `Varia` (grave), `Perispomeni` (circumflex). For the full official Unicode name of any codepoint, the agent can:
   - Check `node_modules/unicode-properties/` if installed, or
   - Use the official Unicode chart `https://unicode.org/charts/PDF/U1F00.pdf` (agent should not actually fetch — derive from pattern), or
   - Use Node: `const { name } = await import("unicode-name"); name("ἀ".codePointAt(0))` if a name lookup package is available — otherwise hand-derive using the pattern above.

4. The "20 consecutive cards titled Alpha" must each become a distinct, descriptive name. If an entry's codepoint is **not** in the Alpha range (U+1F00–1F0F or U+0391/U+03B1), rename it correctly per its actual codepoint — that's the "Iota mislabeled as Alpha" bug.
5. Update `unicode`, `html`, `css` fields if they were also wrong (very likely — same root cause).
6. Where the `keywords` array is just `["greek"]`, expand to include the letter name + mark name (e.g. `["greek", "iota", "psili", "dasia"]`) for better search.
7. The 24 base Greek letters (U+0391–U+03A9 capital, U+03B1–U+03C9 small) are likely correct — spot-check 3, fix any anomalies, but don't rewrite if they pass.
8. Run `npm run build`. Commit: `fix(greek): correct Greek Extended block names — kill 20 'Alpha' duplicates`. Push.

**Verification (validation agent checks)**:
- Build / typecheck / lint pass.
- `curl http://localhost:3000/symbols/greek` returns 200.
- Playwright headless: screenshot `/symbols/greek`. Confirm no card titled "Alpha" appears more than once. Confirm at least 5 distinct "With Psili"/"With Dasia" names render.
- Grep the page HTML for `>Alpha<` count: should be ≤2 (just the base U+0391/U+03B1, both legitimately "Alpha").

**Estimated session size**: medium (60–90 min). Mostly Unicode-name lookup work; tedious but mechanical.

---

## Task I — 200-word category intros

**Goal**: 14 `/symbols/[category]` pages get a 200-word intro above the symbol grid covering history, common uses, how-to-type tips, and when-not-to-use. Improves indexability of thin pages.

**Skill / agent**: `Agent(general-purpose)`. This is content-writing — no skill matches perfectly. Voice anchor: read existing copy on `/` (`src/app/page.tsx`) and `/superscript-generator` for tone before writing. Post-task: `simplify` review of the diff to make sure nothing got copy-pasted across categories.

**Branch**: `feat/category-intros`

**Files**:
- Read: `src/app/page.tsx` (voice anchor), `src/app/superscript-generator/page.tsx` (voice anchor), `src/app/symbols/[category]/page.tsx` (target)
- Write: `src/app/symbols/[category]/page.tsx`

**Categories** (14 total): `arrows`, `currency`, `math`, `greek`, `legal`, `shapes`, `punctuation`, `music`, `chess`, `zodiac`, `weather`, `technical`, `superscript`, `ui`.

**Step-by-step instructions** (the agent's prompt):

1. Branch off latest `main`: `git switch main && git pull && git switch -c feat/category-intros`.
2. Read voice anchors: `src/app/page.tsx` and `src/app/superscript-generator/page.tsx`. Note: friendly + practical, no superlatives, no marketing fluff, no emoji in body copy unless functionally relevant.
3. Read AGENTS.md and `node_modules/next/dist/docs/` if needed for any Next 16 surprise (this change is server-component only, no React quirks expected).
4. In `src/app/symbols/[category]/page.tsx`, add a `categoryIntros: Record<string, { historyAndUses: string; howToType: string; whenNotToUse: string }>` lookup near the top (after `categoryRelated`). Each value's three fields together total **~200 words** (range: 180–220) to give the page substance Google will index.
5. Each intro must cover, in this order:
   - **History & uses** (~100 words): when the symbol family entered Unicode, what real domains use it (e.g. for `currency`: ISO 4217, banking displays, accounting software). Cite specific examples. No "the rich and fascinating world of...".
   - **How to type tips** (~50 words): mac/windows/linux shortcuts where applicable; mention copy-paste as the universal fallback; link to the in-page grid ("scroll down to copy any of the X symbols below").
   - **When not to use** (~50 words): pitfalls — e.g. "don't use the multiplication sign × in code, use `*`"; "don't use Greek mu µ for the SI micro prefix in scientific contexts — use U+03BC". This is the block that distinguishes copychars from generic symbol dumps.
6. Render the intro in the JSX: a new section between the existing header (line ~277) and the symbol grid (line ~279). Style: same surface card pattern as the existing related-blog cards, three sub-headings ("Background", "How to Type", "When Not to Use"). Keep total visual weight modest — should not push the grid below the fold on desktop.
7. **Critical**: each intro must be unique copy. No template-substitution that produces 14 near-identical paragraphs. Google will detect that.
8. After writing all 14, do a self-check: open each page in dev (`/symbols/arrows`, `/symbols/currency`, ...). Count words on each. If any < 180 or > 220, rewrite.
9. If `categories.find(c => c.id === category)` returns a category not in the lookup (defensive — there are exactly 14), render no intro section (don't crash, don't show a placeholder).
10. Commit: `feat(content): add 200-word intros to 14 category pages for indexability`. Push.

**Verification (validation agent checks)**:
- Build / typecheck / lint pass.
- For each of the 14 categories, `curl http://localhost:3000/symbols/<id>` and grep word count of the intro section. Each must be 180–220 words.
- For each intro, confirm it includes at least one specific real-world use case (banking / coding / signage / etc.) — not just "useful for many things".
- Playwright headless: screenshot 3 random category pages. Intro must render above the grid, must not break mobile layout.
- Cross-page de-dup: pairwise diff the intros — no two should share more than 30 consecutive characters.

**Estimated session size**: large (2–3 hours). Pure writing time; 14 unique 200-word essays is real work.

---

## Task X — Per-item search indexability

**Goal**: When someone Googles "hotel emoji" or "blushing kaomoji", they land on a copychars page for that specific item.

**Skill / agent**: `Agent(general-purpose)`. Mirror existing `src/app/symbol/[slug]/page.tsx` pattern. Post-task: **both** `simplify` and `security-review` passes (this introduces dynamic routes that can be probed).

**Branch**: `feat/per-item-indexability`

**Recommended approach: A — build `/emoji/[slug]` and `/kaomoji/[slug]` dynamic routes.**

**Why A over B and C** (one paragraph):
> Option B (anchor-link approach with JSON-LD ItemList) gives Google something to deep-link to, but `#hotel-emoji` URLs rarely rank well — Google treats fragment anchors as the same canonical URL and the snippet quality is poor. Option C (request-time templated route) is essentially A but with worse caching characteristics on Vercel — every request runs the template instead of serving a static build artifact. Option A is the proven path: the `/symbol/[slug]` route already exists and ranks (it's how the visual audit identified problems), Google handles ~2k static routes from a sitemap without complaint, and Vercel free-tier build time for ~2k pre-rendered pages is ~1–2 min added (acceptable). The only real cost is build memory; Next 16 handles 2k routes comfortably (the existing repo already builds 1074 emoji into one page client-side; we're moving them server-side which is actually less work at runtime). Recommend A.

**Files**:
- Read: `src/app/symbol/[slug]/page.tsx` (template to mirror), `src/data/symbols.ts` (`getSymbolBySlug` pattern), `src/data/kaomoji.ts`, `src/app/emoji/EmojiPageClient.tsx` (current emoji data)
- Create: `src/data/emoji.ts` (extract emoji array from `EmojiPageClient.tsx` into a typed module), `src/app/emoji/[slug]/page.tsx`, `src/app/kaomoji/[slug]/page.tsx`
- Write: `src/app/sitemap.ts` (or wherever sitemap lives — agent must locate; if no sitemap exists yet, create one), `src/app/emoji/EmojiPageClient.tsx` (consume the new data module instead of inline literal)

**Step-by-step instructions** (the agent's prompt):

1. Branch off latest `main`: `git switch main && git pull && git switch -c feat/per-item-indexability`.
2. Read AGENTS.md and verify Next 16 dynamic-route conventions in `node_modules/next/dist/docs/`. Specifically check whether `generateStaticParams` is still the API name in 16 (it is, but verify) and how `dynamic = "force-dynamic"` interacts with prerendering (we want **`dynamic = "force-static"`** here, not force-dynamic — these are SEO pages).
3. **Extract emoji data**: create `src/data/emoji.ts` exporting:
   ```ts
   export interface Emoji {
     id: string;          // slug, e.g. "hotel" or "grinning-face"
     emoji: string;       // 🏨
     name: string;        // "Hotel"
     category: string;    // "travel" / "smileys" / etc
     keywords: string[];  // ["hotel","building","travel","accommodation"]
     unicode: string;     // "U+1F3E8"
   }
   export const emojis: Emoji[] = [ /* extracted from EmojiPageClient */ ];
   export function getEmojiBySlug(slug: string): Emoji | undefined { ... }
   ```
   Generate a slug from `name` using the same kebab-case pattern as `symbols.ts`. Build keywords by tokenising `name` + adding category. Include the Unicode codepoint (computed from `e.codePointAt(0).toString(16).toUpperCase()` — handle ZWJ sequences by storing all codepoints joined).
4. Update `src/app/emoji/EmojiPageClient.tsx` to import from the new module instead of holding the array inline. Behaviour must not change.
5. **Add to kaomoji data**: in `src/data/kaomoji.ts`, export a `getKaomojiBySlug(slug: string)` helper. Slugs already exist as `id`. No data migration needed — IDs like `joy-1` are URL-safe.
6. **Build `/emoji/[slug]/page.tsx`**: mirror `src/app/symbol/[slug]/page.tsx` line-for-line in structure. Differences:
   - Hero card shows the big emoji at `font-size: clamp(8rem, 18vw, 14rem)` (emoji are visually denser than symbol glyphs).
   - Spec cards: Unicode, HTML entity (`&#X;`), CSS escape, Category. No "shortcut" block (emoji don't have OS keyboard shortcuts that fit the existing pattern).
   - JSON-LD: `BreadcrumbList` (Home › Emoji › <Category> › <Name>) **plus** a `Thing` with `name`, `description`, `image` (use the emoji codepoint via [Twemoji CDN](https://twemoji.maxcdn.com/v/14.0.2/72x72/) URL — `https://twemoji.maxcdn.com/v/14.0.2/72x72/<hex>.png`).
   - "More like this" section pulls from same category.
   - `generateMetadata` returns `title: "<emoji> <Name> Emoji — Copy & Paste"`, description that includes the literal name and the word "emoji" (matches "<x> emoji" search intent).
7. **Build `/kaomoji/[slug]/page.tsx`**: same shape, adapted for kaomoji:
   - Hero shows the kaomoji `face` string at smaller size (kaomoji are wide).
   - No Unicode/HTML/CSS specs (kaomoji are multi-codepoint compositions). Replace with: Mood, Length (chars), Plain-text source.
   - Title: `"<face> <Name> Kaomoji — Copy & Paste"`.
8. **`generateStaticParams`**: in both routes, return the full slug list so Next pre-renders every page at build. For ~2000 routes total, this adds ~60–120s to build time — acceptable.
9. **Set `export const dynamic = "force-static"`** (not `force-dynamic` like the symbol route currently uses — that was a workaround for a different issue; for these SEO pages we want pre-rendered HTML).
10. **Sitemap**: locate or create `src/app/sitemap.ts`. Add an entry per emoji and per kaomoji, with `changeFrequency: "monthly"` and `priority: 0.6`. Existing symbol entries should be preserved.
11. **Internal linking**: in `src/app/emoji/EmojiPageClient.tsx`, wrap each emoji card in a `<Link href={\`/emoji/${slug}\`}>` so the category page passes link equity to detail pages. Same for `src/app/kaomoji/page.tsx`.
12. **Deferral note**: do NOT add `og:image` generation in this task — that's a follow-up. The PNG-from-emoji generation is its own can of worms.
13. Commit: `feat(seo): per-emoji and per-kaomoji detail pages for search indexability`. Push.

**Verification (validation agent checks)**:
- `npm run build` passes; build time delta noted (should be < 3 min added).
- `npx tsc --noEmit` clean.
- `npm run lint` — no new errors.
- Pick 5 random emoji slugs and 5 kaomoji slugs; `curl http://localhost:3000/emoji/<slug>` and `/kaomoji/<slug>` — all return 200.
- Specifically test: `/emoji/hotel` (the user's literal example) renders 🏨 with name "Hotel" and category "travel" or similar.
- Sitemap accessible at `/sitemap.xml`, contains the new URLs.
- Playwright headless: screenshot `/emoji/hotel`, `/emoji/grinning-face`, `/kaomoji/joy-1`. Layouts match `/symbol/<slug>` quality.
- View-source check: each detail page contains a `<script type="application/ld+json">` with the BreadcrumbList + Thing JSON-LD.
- Regression: `/emoji` (the listing page) still works after the data extraction refactor.

**Estimated session size**: large (3–4 hours). The data extraction + two parallel route builds + sitemap is real engineering.

---

## Validation agent prompt template

> The validation agent runs **after each per-task agent merges to `main`** and **before the next per-task agent is dispatched**. It uses the `review` skill as its framework but with the parameterised checklist below.

```
You are the validation agent for the five-task sprint at copysymbols.
The previous task just merged to main: <TASK_LETTER> on branch <BRANCH_NAME>.

Your job is to verify the merge before the next task is allowed to start.
You do NOT make code changes. If something fails, you produce a list of
findings; main Claude will dispatch a fix-forward agent if needed.

Run, in order:

1. `git pull origin main` to get the latest merge.
2. `npm run build` — must exit 0.
3. `npx tsc --noEmit` — must exit 0.
4. `npm run lint` — carry-over errors are OK; NEW errors introduced
   by this task (compare to `git diff main~1 main --name-only`) are
   blocking.
5. Task-specific checks: <PASTE THE "Verification" SECTION FROM THIS
   PLAN'S TASK ENTRY>.
6. Cross-task regression check: visit the page(s) modified by the
   PREVIOUS task in the sprint and confirm they still render
   correctly (catches the dropdown-bug class of regression). For the
   first task in the sprint, visit `/` and `/symbols/zodiac` as a
   smoke test of the recently-fixed dropdown.
7. Check `git log --oneline main~1..main` — commit message should
   follow conventional-commit style (`feat:` / `fix:` / `chore:`)
   and reference the task.

Output a structured report:

```
TASK <LETTER> VALIDATION
Build:        PASS | FAIL <details>
Typecheck:    PASS | FAIL
Lint:         PASS | FAIL <new errors only>
Task checks:  PASS | FAIL <list>
Regression:   PASS | FAIL <list>
Verdict:      GREEN — proceed to next task
              | RED — block; needs <fix description>
```

If GREEN, return verdict + one-line summary.
If RED, return the full failure list. Do NOT attempt fixes.
```

---

## Risks & dependencies

- **K → X**: Task X (per-item indexability) ingests kaomoji data. Running K first means X indexes a clean, populated set rather than the current dirty set. Hard dependency — do not reorder.
- **Z → I**: Task I writes a category intro for `/symbols/zodiac`. If I runs before Z, the intro text might end up referencing the broken state ("our planet symbols are presented in standard astrological order"). Soft dependency, but order K→Z→G→I→X handles it cleanly.
- **G → I**: Same as above for `/symbols/greek`.
- **I → X**: Independent; I changes the category-listing pages, X adds detail pages. No conflict.
- **All → X**: X is the only task that touches `src/app/emoji/EmojiPageClient.tsx` and creates new routes. Last-task placement minimises rebase pain on the others.
- **Validation agent gating**: if K's validation fails (e.g. a malformed kaomoji breaks the build), Z is blocked. Main Claude must dispatch a fix-forward agent on the K branch before Z starts. Don't skip-and-come-back.
- **Build time creep**: Task X adds ~2k static routes. Vercel free-tier should handle it but worth checking the post-X build output for warnings.
- **Twemoji CDN dependency** (Task X JSON-LD): `twemoji.maxcdn.com` is the legacy CDN. If it's down at validation time, the JSON-LD `image` URL still validates (we don't fetch it during build). Note for follow-up: migrate to `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/` for stability.
- **Off-by-one edge cases in Z**: the existing data has fabricated entries like `{ symbol: "♀♂", name: "Sun Sign" }` — those must be deleted, not relabeled. The agent prompt explicitly authorises deletion.
- **Greek breathing-mark naming complexity (G)**: the agent may not have full Unicode-database access. The provided table covers the most common variants but not every codepoint in U+1F00–U+1F4F. Acceptable to skip a handful of obscure ones (mark them with a `// TODO: unicode name` comment) rather than ship a wrong name.

---

## What's NOT in this sprint

Considered and dropped:

- **og:image generation for /emoji/[slug] and /kaomoji/[slug]**: would be the natural next step for X but adds Sharp/Resvg dependencies and 5–10 sec/page to build. Defer to a dedicated SEO follow-up sprint.
- **Search index page (`/search` improvements)**: the existing search overlay handles this client-side adequately. Server-rendered search results would be valuable but is its own design problem.
- **Symbol detail page UX overhaul**: the current `/symbol/[slug]` template is being mirrored in X, not redesigned. If user feedback later wants a different layout for emoji vs symbol pages, that's a new task.
- **Kaomoji combos** (e.g. greeting card → multi-line ASCII art): out of scope; adjacent feature for a different sprint.
- **Translating category intros (Task I) to other languages**: i18n infrastructure is a separate epic.
- **Removing the visual-audit Playwright infrastructure**: it's still useful for the validation agent in this sprint. Leave it.
- **Dropdown-bug regression test in CI**: would prevent another 5c4b967-style break, but adding Playwright to CI is its own setup task. Validation agent's manual check suffices for this sprint.
