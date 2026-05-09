# Visual Audit & State-of-Website Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit every category page on copychars.com (post-merge state) using Playwright + AI vision, auto-fix safe data issues, and produce a written state-of-the-website report on branch `agent/visual-audit`.

**Architecture:** Three-phase fanout-fanin. Phase A (one agent): build local merge-preview base + capture 92 screenshots + DOM snapshots. Phase B (five agents in parallel): each reviews 18 screenshots and emits structured findings. Phase C (one agent): aggregate findings, apply auto-fixable data fixes, write the report, push.

**Tech Stack:** Next.js 16 + React 19 + TypeScript + Tailwind 4 (existing), Playwright (added), Node ESM scripts (existing convention from `scripts/content-bot.mjs`).

**Spec:** [docs/superpowers/specs/2026-05-09-visual-audit-and-state-report-design.md](../specs/2026-05-09-visual-audit-and-state-report-design.md)

---

## Working directory and branch state

- Repo: `c:\Users\Nitin\OneDrive\Documents\Claude\Obsedian demo\copysymbols`
- Current branch: `agent/visual-audit` (already exists, contains only the spec doc)
- Existing branches that need merging: `agent/code-audit`, `agent/indexing-fixes`, `agent/generator-overhaul`
- `agent/ceo-roadmap` is doc-only and is NOT merged into the audit base
- node_modules already installed
- AGENTS.md says "This is NOT the Next.js you know" — heed Next 16 docs at `node_modules/next/dist/docs/` for any uncertainty

---

## Task 1: Build the local merge-preview base

**Files:**
- Modify: git state only — create local-only branch `_audit-base` and rebase `agent/visual-audit` on top

- [ ] **Step 1: Confirm clean working tree on agent/visual-audit**

```bash
git status
```

Expected: `On branch agent/visual-audit`, `nothing to commit, working tree clean`. If dirty, stash before continuing.

- [ ] **Step 2: Create local _audit-base off main**

```bash
git switch main
git switch -c _audit-base
```

Expected: `Switched to a new branch '_audit-base'`

- [ ] **Step 3: Merge the three code-changing branches in order**

```bash
git merge --no-ff agent/code-audit -m "merge: agent/code-audit into audit base"
git merge --no-ff agent/indexing-fixes -m "merge: agent/indexing-fixes into audit base"
git merge --no-ff agent/generator-overhaul -m "merge: agent/generator-overhaul into audit base"
```

Expected: each merge succeeds. If conflicts arise, resolve favoring the LATER agent's intent (Agent 2 over Agent 1, Agent 3 over Agent 2 for any same-file overlap), then `git add <file> && git commit --no-edit`.

- [ ] **Step 4: Verify build still passes after merge**

```bash
npx tsc --noEmit && npm run lint && npm run build 2>&1 | tail -20
```

Expected: tsc clean, lint same as main (carry-overs OK), build succeeds with 53+ routes generated. If build fails, inspect the conflict resolution and re-do.

- [ ] **Step 5: Rebase agent/visual-audit on _audit-base**

```bash
git switch agent/visual-audit
git rebase _audit-base
```

Expected: clean rebase (only one commit on visual-audit — the spec doc — replays cleanly).

- [ ] **Step 6: Force-push the rebased visual-audit branch**

```bash
git push --force-with-lease origin agent/visual-audit
```

Expected: `forced update`. The spec doc commit is preserved at the new SHA.

---

## Task 2: Build the page list

**Files:**
- Create: `_audit/page-list.json`
- Test: `_audit/scripts/verify-page-list.mjs`

- [ ] **Step 1: Write the failing verification test**

Create `_audit/scripts/verify-page-list.mjs`:

```js
#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const list = JSON.parse(fs.readFileSync('_audit/page-list.json', 'utf8'));
const errors = [];

if (!Array.isArray(list)) errors.push('top-level must be array');
const seen = new Set();
for (const entry of list) {
  if (!entry.path || typeof entry.path !== 'string') errors.push(`bad entry: ${JSON.stringify(entry)}`);
  if (!entry.path.startsWith('/')) errors.push(`path must start with /: ${entry.path}`);
  if (!entry.slug || !/^[a-z0-9-]+$/.test(entry.slug)) errors.push(`bad slug: ${entry.slug}`);
  if (seen.has(entry.path)) errors.push(`duplicate path: ${entry.path}`);
  seen.add(entry.path);
}

if (list.length < 40 || list.length > 60) errors.push(`unexpected count: ${list.length} (want 40–60)`);

if (errors.length) {
  console.error('FAIL\n' + errors.map(e => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`OK — ${list.length} pages, all unique, all valid paths`);
```

- [ ] **Step 2: Run it to verify it fails**

```bash
mkdir -p _audit/scripts
node _audit/scripts/verify-page-list.mjs
```

Expected: FAIL with `ENOENT: no such file or directory, open '_audit/page-list.json'`

- [ ] **Step 3: Write _audit/page-list.json**

Create `_audit/page-list.json`:

```json
[
  { "path": "/", "slug": "home" },

  { "path": "/symbols/arrows", "slug": "symbols-arrows" },
  { "path": "/symbols/currency", "slug": "symbols-currency" },
  { "path": "/symbols/math", "slug": "symbols-math" },
  { "path": "/symbols/greek", "slug": "symbols-greek" },
  { "path": "/symbols/legal", "slug": "symbols-legal" },
  { "path": "/symbols/shapes", "slug": "symbols-shapes" },
  { "path": "/symbols/punctuation", "slug": "symbols-punctuation" },
  { "path": "/symbols/music", "slug": "symbols-music" },
  { "path": "/symbols/chess", "slug": "symbols-chess" },
  { "path": "/symbols/zodiac", "slug": "symbols-zodiac" },
  { "path": "/symbols/weather", "slug": "symbols-weather" },
  { "path": "/symbols/technical", "slug": "symbols-technical" },
  { "path": "/symbols/superscript", "slug": "symbols-superscript" },
  { "path": "/symbols/ui", "slug": "symbols-ui" },

  { "path": "/kaomoji", "slug": "kaomoji" },
  { "path": "/emoji", "slug": "emoji" },
  { "path": "/hearts", "slug": "hearts" },
  { "path": "/stars", "slug": "stars" },
  { "path": "/borders", "slug": "borders" },
  { "path": "/lenny-face", "slug": "lenny-face" },
  { "path": "/bullet-points", "slug": "bullet-points" },
  { "path": "/bio-templates", "slug": "bio-templates" },
  { "path": "/emoji-combos", "slug": "emoji-combos" },
  { "path": "/bio-builder", "slug": "bio-builder" },
  { "path": "/small-text", "slug": "small-text" },
  { "path": "/strikethrough-text", "slug": "strikethrough-text" },
  { "path": "/aesthetic-text", "slug": "aesthetic-text" },
  { "path": "/mirror-text", "slug": "mirror-text" },
  { "path": "/symbol-builder", "slug": "symbol-builder" },
  { "path": "/checkmark", "slug": "checkmark" },
  { "path": "/degree-symbol", "slug": "degree-symbol" },
  { "path": "/infinity-symbol", "slug": "infinity-symbol" },
  { "path": "/pi-symbol", "slug": "pi-symbol" },
  { "path": "/copyright-symbol", "slug": "copyright-symbol" },
  { "path": "/arrow-symbols", "slug": "arrow-symbols" },
  { "path": "/flower-symbols", "slug": "flower-symbols" },
  { "path": "/sparkle-symbols", "slug": "sparkle-symbols" },
  { "path": "/smiley-face-text", "slug": "smiley-face-text" },
  { "path": "/number-symbols", "slug": "number-symbols" },

  { "path": "/symbols-for/instagram", "slug": "symbols-for-instagram" },
  { "path": "/symbols-for/discord", "slug": "symbols-for-discord" },
  { "path": "/symbols-for/tiktok", "slug": "symbols-for-tiktok" },

  { "path": "/symbol/heart", "slug": "symbol-heart" },
  { "path": "/symbol/star", "slug": "symbol-star" },
  { "path": "/symbol/checkmark", "slug": "symbol-checkmark" }
]
```

- [ ] **Step 4: Run verification — expect pass**

```bash
node _audit/scripts/verify-page-list.mjs
```

Expected: `OK — 46 pages, all unique, all valid paths`

- [ ] **Step 5: Commit**

```bash
git add _audit/page-list.json _audit/scripts/verify-page-list.mjs
git commit -m "audit: page list (46 pages) + verifier"
```

---

## Task 3: Install Playwright

**Files:**
- Modify: `package.json` (devDependencies)
- Modify: `package-lock.json`

- [ ] **Step 1: Install Playwright as devDependency**

```bash
npm install --save-dev playwright
```

Expected: adds `"playwright": "^1.x"` under devDependencies, modifies package-lock.json.

- [ ] **Step 2: Install the Chromium browser binary**

```bash
npx playwright install chromium
```

Expected: downloads ~150MB Chromium to `~/AppData/Local/ms-playwright/`. One-time. Output ends with "successfully installed".

- [ ] **Step 3: Smoke-test Playwright with a 1-line script**

```bash
node -e "import('playwright').then(({chromium}) => chromium.launch()).then(b => b.close()).then(() => console.log('OK'))"
```

Expected: `OK`. If fails, the install didn't complete.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "audit: add playwright devDependency for screenshot capture"
```

---

## Task 4: Write the screenshot capture script

**Files:**
- Create: `_audit/scripts/screenshot-all.mjs`
- Test: `_audit/scripts/test-screenshot.mjs` (smoke test against one URL)

- [ ] **Step 1: Write the smoke-test driver**

Create `_audit/scripts/test-screenshot.mjs`:

```js
#!/usr/bin/env node
import fs from 'node:fs';
import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000/';
const out = '_audit/_test-screenshot.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: out, fullPage: true });
await browser.close();

const stat = fs.statSync(out);
if (stat.size < 5000) { console.error('FAIL — screenshot too small'); process.exit(1); }
console.log(`OK — ${out} (${stat.size} bytes)`);
```

- [ ] **Step 2: Verify the test fails without dev server running**

```bash
node _audit/scripts/test-screenshot.mjs
```

Expected: FAIL with `net::ERR_CONNECTION_REFUSED` or `Timeout 30000ms exceeded`.

- [ ] **Step 3: Start dev server in background and re-run smoke test**

```bash
npm run dev > /tmp/devserver.log 2>&1 &
sleep 6
node _audit/scripts/test-screenshot.mjs
```

Expected: `OK — _audit/_test-screenshot.png (NNNN bytes)` with size > 5000.

- [ ] **Step 4: Stop the dev server**

```bash
pkill -f 'next dev' || true
```

- [ ] **Step 5: Delete the test screenshot**

```bash
rm -f _audit/_test-screenshot.png
```

- [ ] **Step 6: Write the full screenshot script**

Create `_audit/scripts/screenshot-all.mjs`:

```js
#!/usr/bin/env node
/**
 * Screenshots every page in _audit/page-list.json at desktop + mobile widths.
 * Also writes a DOM text snapshot for cross-reference by vision agents.
 *
 * Usage:
 *   node _audit/scripts/screenshot-all.mjs [base-url]
 *
 * Default base-url: http://localhost:3000
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3000';
const PAGES = JSON.parse(fs.readFileSync('_audit/page-list.json', 'utf8'));

const DESKTOP = { width: 1280, height: 900 };
const MOBILE  = { width: 375,  height: 812 };

const DESKTOP_DIR = '_audit/screenshots/desktop';
const MOBILE_DIR  = '_audit/screenshots/mobile';
const DOM_DIR     = '_audit/dom-snapshots';

[DESKTOP_DIR, MOBILE_DIR, DOM_DIR].forEach(d => fs.mkdirSync(d, { recursive: true }));

const browser = await chromium.launch();

let ok = 0, fail = 0;
const failures = [];

for (const { path: urlPath, slug } of PAGES) {
  const url = BASE + urlPath;

  try {
    // Desktop pass — also captures DOM
    const desktopCtx = await browser.newContext({ viewport: DESKTOP });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await desktopPage.screenshot({ path: path.join(DESKTOP_DIR, `${slug}.png`), fullPage: true });
    const domText = await desktopPage.evaluate(() => document.body.innerText);
    fs.writeFileSync(path.join(DOM_DIR, `${slug}.txt`), domText, 'utf8');
    await desktopCtx.close();

    // Mobile pass
    const mobileCtx = await browser.newContext({ viewport: MOBILE });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await mobilePage.screenshot({ path: path.join(MOBILE_DIR, `${slug}.png`), fullPage: true });
    await mobileCtx.close();

    ok++;
    console.log(`✓ ${urlPath}`);
  } catch (err) {
    fail++;
    failures.push({ urlPath, error: err.message });
    console.error(`✗ ${urlPath} — ${err.message}`);
  }
}

await browser.close();

console.log(`\nDone — ${ok} ok, ${fail} failed`);
if (failures.length) {
  fs.writeFileSync('_audit/screenshot-failures.json', JSON.stringify(failures, null, 2));
  process.exit(1);
}
```

- [ ] **Step 7: Commit the script (without running)**

```bash
git add _audit/scripts/screenshot-all.mjs _audit/scripts/test-screenshot.mjs
git commit -m "audit: screenshot capture script + smoke test"
```

---

## Task 5: Phase A — dispatch screenshot agent

**Files:** generated artifacts only (`_audit/screenshots/`, `_audit/dom-snapshots/`)

- [ ] **Step 1: Dispatch a single subagent to run the full screenshot pass**

Use the Agent tool with `subagent_type: "general-purpose"`. Prompt:

```
You are the Phase A Screenshot Capture agent for the CopyChars visual audit.

Working directory: c:\Users\Nitin\OneDrive\Documents\Claude\Obsedian demo\copysymbols
Branch: agent/visual-audit (already checked out, _audit-base merged in)

Your job:
1. Verify you're on the right branch: git status
2. Start the Next.js dev server in the background:
   npm run dev > /tmp/devserver.log 2>&1 &
   sleep 8
3. Confirm the server is up by curling http://localhost:3000 (expect 200, sleep more if not)
4. Run the screenshot script:
   node _audit/scripts/screenshot-all.mjs
   This takes ~5-10 minutes. Each page logs ✓ or ✗.
5. Verify outputs:
   - ls _audit/screenshots/desktop/*.png | wc -l → should be 46
   - ls _audit/screenshots/mobile/*.png | wc -l → should be 46
   - ls _audit/dom-snapshots/*.txt | wc -l → should be 46
6. If any page failed (_audit/screenshot-failures.json exists), retry just those pages
7. Stop the dev server: pkill -f 'next dev'
8. Commit: git add _audit/ && git commit -m "audit: capture 92 screenshots + DOM snapshots"
9. Push: git push origin agent/visual-audit

Output to me:
- Number of screenshots captured (desktop + mobile separately)
- Any pages that failed even after retry
- Total disk size of _audit/screenshots/
- Confirm commit + push succeeded
```

- [ ] **Step 2: Verify outputs locally before proceeding**

```bash
ls _audit/screenshots/desktop/*.png | wc -l
ls _audit/screenshots/mobile/*.png | wc -l
ls _audit/dom-snapshots/*.txt | wc -l
```

Expected: 46, 46, 46

---

## Task 6: Aggregation script (TDD)

**Files:**
- Create: `_audit/scripts/aggregate-findings.mjs`
- Test: `_audit/scripts/test-aggregate.mjs`

- [ ] **Step 1: Write the test first**

Create `_audit/scripts/test-aggregate.mjs`:

```js
#!/usr/bin/env node
import fs from 'node:fs';
import { execSync } from 'node:child_process';

// Setup fixtures
fs.mkdirSync('_audit/_test', { recursive: true });
fs.writeFileSync('_audit/_test/findings-batch-1.json', JSON.stringify([
  { page: '/symbols/punctuation', viewport: 'desktop', screenshot: 'x.png', issues: [
    { severity: 'high', category: 'literal-escape', evidence: 'shows \\u201C', suggested_fix: 'data-fix' }
  ], all_clear: false }
]));
fs.writeFileSync('_audit/_test/findings-batch-2.json', JSON.stringify([
  { page: '/kaomoji', viewport: 'desktop', screenshot: 'y.png', issues: [], all_clear: true }
]));

execSync(`node _audit/scripts/aggregate-findings.mjs _audit/_test _audit/_test/all.json`);

const out = JSON.parse(fs.readFileSync('_audit/_test/all.json', 'utf8'));

const errors = [];
if (out.total_pages !== 2) errors.push(`expected 2 pages, got ${out.total_pages}`);
if (out.total_issues !== 1) errors.push(`expected 1 issue, got ${out.total_issues}`);
if (out.by_severity.high !== 1) errors.push(`expected 1 high, got ${out.by_severity.high}`);
if (out.by_category['literal-escape'] !== 1) errors.push(`expected 1 literal-escape`);
if (out.findings.length !== 2) errors.push(`expected 2 findings entries`);

// cleanup
fs.rmSync('_audit/_test', { recursive: true });

if (errors.length) { console.error('FAIL\n' + errors.join('\n')); process.exit(1); }
console.log('OK');
```

- [ ] **Step 2: Run the test — expect failure**

```bash
node _audit/scripts/test-aggregate.mjs
```

Expected: FAIL with `Cannot find module ... aggregate-findings.mjs` or `command failed`.

- [ ] **Step 3: Write the aggregator**

Create `_audit/scripts/aggregate-findings.mjs`:

```js
#!/usr/bin/env node
/**
 * Reads _audit/findings-batch-*.json from a directory, merges, summarises.
 * Usage: node aggregate-findings.mjs [input-dir] [output-file]
 */
import fs from 'node:fs';
import path from 'node:path';

const inputDir = process.argv[2] || '_audit';
const outputFile = process.argv[3] || '_audit/all-findings.json';

const batchFiles = fs.readdirSync(inputDir).filter(f => /^findings-batch-.+\.json$/.test(f));
if (!batchFiles.length) {
  console.error(`No findings-batch-*.json files in ${inputDir}`);
  process.exit(1);
}

const findings = [];
for (const f of batchFiles) {
  const batch = JSON.parse(fs.readFileSync(path.join(inputDir, f), 'utf8'));
  if (!Array.isArray(batch)) { console.error(`${f}: not an array`); process.exit(1); }
  findings.push(...batch);
}

const by_severity = { high: 0, medium: 0, low: 0 };
const by_category = {};
let total_issues = 0;

for (const finding of findings) {
  for (const issue of finding.issues || []) {
    total_issues++;
    by_severity[issue.severity] = (by_severity[issue.severity] || 0) + 1;
    by_category[issue.category] = (by_category[issue.category] || 0) + 1;
  }
}

const summary = {
  total_pages: findings.length,
  total_issues,
  by_severity,
  by_category,
  findings,
};

fs.writeFileSync(outputFile, JSON.stringify(summary, null, 2));
console.log(`Wrote ${outputFile}: ${findings.length} pages, ${total_issues} issues`);
```

- [ ] **Step 4: Run the test — expect pass**

```bash
node _audit/scripts/test-aggregate.mjs
```

Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add _audit/scripts/aggregate-findings.mjs _audit/scripts/test-aggregate.mjs
git commit -m "audit: findings aggregator with summary stats"
```

---

## Task 7: Auto-fix transforms (TDD)

**Files:**
- Create: `_audit/scripts/apply-data-fixes.mjs`
- Test: `_audit/scripts/test-apply-data-fixes.mjs`

- [ ] **Step 1: Write the test first**

Create `_audit/scripts/test-apply-data-fixes.mjs`:

```js
#!/usr/bin/env node
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const dir = '_audit/_fix-test';
fs.mkdirSync(dir, { recursive: true });

// Fixture: a TS data file with a literal-escape bug and a duplicate
fs.writeFileSync(`${dir}/data.ts`, `export const items = [
  { id: "good-1", symbol: "“", name: "Smart Quote", category: "punctuation" },
  { id: "bad-1", symbol: "\\\\u201C", name: "Broken Quote", category: "punctuation" },
  { id: "dupe-a", symbol: "★", name: "Star", category: "shapes" },
  { id: "dupe-b", symbol: "★", name: "Star", category: "shapes" },
];
`);

// Fixture: findings JSON pointing at the bugs
fs.writeFileSync(`${dir}/all-findings.json`, JSON.stringify({
  findings: [
    { page: '/p', issues: [
      { severity: 'high', category: 'literal-escape', evidence: 'shows \\\\u201C in card "Broken Quote"', suggested_fix: 'data-fix', target_file: `${dir}/data.ts` },
      { severity: 'medium', category: 'visual-duplicate', evidence: 'two ★ cards with same name', suggested_fix: 'data-fix', target_file: `${dir}/data.ts` },
    ]}
  ],
}));

execSync(`node _audit/scripts/apply-data-fixes.mjs ${dir}/all-findings.json --apply`);

const after = fs.readFileSync(`${dir}/data.ts`, 'utf8');
const errors = [];

if (after.includes('\\\\u201C')) errors.push('literal escape not replaced');
if (!after.includes('symbol: "“"') || (after.match(/symbol: "“"/g) || []).length < 2) {
  errors.push('expected smart quote to appear in the fixed entry');
}
const starCount = (after.match(/"★"/g) || []).length;
if (starCount !== 1) errors.push(`expected 1 star after dedupe, got ${starCount}`);

fs.rmSync(dir, { recursive: true });

if (errors.length) { console.error('FAIL\n' + errors.join('\n')); process.exit(1); }
console.log('OK');
```

- [ ] **Step 2: Run the test — expect failure**

```bash
node _audit/scripts/test-apply-data-fixes.mjs
```

Expected: FAIL.

- [ ] **Step 3: Write the fix script**

Create `_audit/scripts/apply-data-fixes.mjs`:

```js
#!/usr/bin/env node
/**
 * Reads aggregated findings JSON and applies safe data-fix transforms.
 *
 * Two transforms:
 *   1. literal-escape: replace "\\uXXXX" string literals with the actual char in TS data files
 *   2. visual-duplicate: drop later occurrences of {symbol, category} pairs
 *
 * Usage:
 *   node apply-data-fixes.mjs <findings.json> [--apply]
 *
 * Without --apply, it's a dry run that prints what would change.
 */
import fs from 'node:fs';

const findingsPath = process.argv[2];
const apply = process.argv.includes('--apply');

if (!findingsPath) { console.error('Usage: apply-data-fixes.mjs <findings.json> [--apply]'); process.exit(1); }

const data = JSON.parse(fs.readFileSync(findingsPath, 'utf8'));

// Group fixes by target file
const byFile = new Map();
for (const finding of (data.findings || [])) {
  for (const issue of (finding.issues || [])) {
    if (issue.suggested_fix !== 'data-fix') continue;
    const file = issue.target_file;
    if (!file) continue;
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(issue);
  }
}

let totalChanges = 0;

for (const [file, issues] of byFile) {
  if (!fs.existsSync(file)) { console.error(`SKIP: ${file} does not exist`); continue; }
  let content = fs.readFileSync(file, 'utf8');
  let changes = 0;

  // Transform 1: literal escape strings — replace "\\uXXXX" with actual char
  if (issues.some(i => i.category === 'literal-escape')) {
    const before = content;
    content = content.replace(/"\\\\u([0-9A-Fa-f]{4})"/g, (_, hex) => {
      changes++;
      return `"${String.fromCodePoint(parseInt(hex, 16))}"`;
    });
    if (content === before) console.log(`no literal escapes matched in ${file}`);
  }

  // Transform 2: visual duplicates — drop second occurrence of identical {symbol, category}
  if (issues.some(i => i.category === 'visual-duplicate')) {
    const lines = content.split('\n');
    const seen = new Set();
    const kept = [];
    const re = /symbol: "([^"]+)".*?category: "([^"]+)"/;
    for (const line of lines) {
      const m = line.match(re);
      if (m) {
        const key = `${m[1]}|${m[2]}`;
        if (seen.has(key)) { changes++; continue; }
        seen.add(key);
      }
      kept.push(line);
    }
    content = kept.join('\n');
  }

  if (changes > 0) {
    if (apply) {
      fs.writeFileSync(file, content);
      console.log(`✓ ${file}: ${changes} changes applied`);
    } else {
      console.log(`[dry-run] ${file}: would apply ${changes} changes`);
    }
    totalChanges += changes;
  }
}

console.log(`\nTotal changes: ${totalChanges} (${apply ? 'applied' : 'dry-run'})`);
```

- [ ] **Step 4: Run the test — expect pass**

```bash
node _audit/scripts/test-apply-data-fixes.mjs
```

Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add _audit/scripts/apply-data-fixes.mjs _audit/scripts/test-apply-data-fixes.mjs
git commit -m "audit: data-fix transforms (literal-escape + visual-duplicate)"
```

---

## Task 8: Phase B — dispatch 5 vision agents in parallel

**Files:** generated artifacts only (`_audit/findings-batch-1.json` through `_audit/findings-batch-5.json`)

- [ ] **Step 1: Compute the 5-batch split deterministically**

Run this one-liner to print the split:

```bash
node -e "
const list = require('./_audit/page-list.json');
const batchSize = Math.ceil(list.length / 5);
for (let i = 0; i < 5; i++) {
  const slice = list.slice(i * batchSize, (i + 1) * batchSize);
  console.log('Batch ' + (i+1) + ': ' + slice.map(p => p.path).join(', '));
}
"
```

Expected: prints 5 batches of ~9-10 paths each.

- [ ] **Step 2: Dispatch 5 Agent calls in a single message (parallel)**

Use 5 Agent tool invocations, all `subagent_type: "general-purpose"`. Each agent's prompt template:

```
You are Vision Reviewer Agent N of 5 for the CopyChars visual audit.

Working directory: c:\Users\Nitin\OneDrive\Documents\Claude\Obsedian demo\copysymbols

Your assigned pages: [PASTE THE BATCH N PATHS FROM STEP 1]

For each assigned page:
1. Read the desktop screenshot at _audit/screenshots/desktop/<slug>.png (use the Read tool — images render visually)
2. Read the mobile screenshot at _audit/screenshots/mobile/<slug>.png
3. Read the DOM snapshot at _audit/dom-snapshots/<slug>.txt for ground-truth text content

For BOTH viewports of each page, apply the per-screenshot checklist:

1. Literal escape strings — any visible text matching \\uXXXX or &#NNNN;. Cross-check against the DOM snapshot — if DOM shows the actual char and screenshot shows literal, that's a render bug. If DOM shows literal too, that's a data bug.
2. Visual duplicates — two cards with identical glyph + identical title.
3. Miscategorisation — items whose glyph clearly doesn't match the category (e.g., emoji in a Unicode-symbol category, animal emoji in /symbols/music).
4. Empty grid — page renders but the symbol grid is empty or shows < 3 items.
5. Layout breakage — text overflow, broken card grid, missing icons, distorted images, weird spacing, content cut off.
6. Mobile-specific issues — horizontal scroll, font sizes < 12px, tap targets < 32px, content hidden.
7. Missing copy/CTA — page has only a grid, no intro text, no related links — flag as thin-content.
8. Anything else weird — free-text.

Severity: "high" (broken UX or wrong data), "medium" (suboptimal, fixable), "low" (cosmetic).

For data-fix-able issues (literal-escape, visual-duplicate, exact-mismatch-by-Unicode-block), set suggested_fix = "data-fix" and target_file = the most likely src/data/*.ts file (use grep to find which file has the symbol).

Output a SINGLE JSON file at _audit/findings-batch-N.json with this exact shape:
[
  {
    "page": "/symbols/punctuation",
    "viewport": "desktop",
    "screenshot": "_audit/screenshots/desktop/symbols-punctuation.png",
    "issues": [
      { "severity": "high", "category": "literal-escape", "evidence": "First 4 cards render \\u201C, \\u201D, \\u2018, \\u2019 as literal text", "suggested_fix": "data-fix", "target_file": "src/data/symbols.ts" }
    ],
    "all_clear": false
  },
  ...
]

After writing the file, run: git add _audit/findings-batch-N.json && git commit -m "audit: vision findings batch N" && git push origin agent/visual-audit

Report back:
- Number of pages reviewed
- Number of issues found, grouped by severity
- 3 most surprising findings (with evidence)
- Any pages where you couldn't render the screenshot
```

Spawn all 5 in parallel by issuing 5 Agent tool calls in one assistant message. Wait for all five to complete.

- [ ] **Step 3: Verify all 5 batch files exist after the parallel run**

```bash
ls _audit/findings-batch-*.json
wc -l _audit/findings-batch-*.json
```

Expected: 5 files, each non-empty.

- [ ] **Step 4: Pull the agents' commits**

```bash
git pull origin agent/visual-audit
```

Expected: fast-forward, picks up 5 new commits.

---

## Task 9: Aggregate findings + dry-run fixes

**Files:** generated artifact `_audit/all-findings.json`

- [ ] **Step 1: Aggregate all batches**

```bash
node _audit/scripts/aggregate-findings.mjs _audit _audit/all-findings.json
```

Expected: `Wrote _audit/all-findings.json: 46 pages, NN issues`

- [ ] **Step 2: Inspect the summary**

```bash
node -e "const d = require('./_audit/all-findings.json'); console.log('Pages:', d.total_pages); console.log('Issues:', d.total_issues); console.log('By severity:', d.by_severity); console.log('By category:', d.by_category)"
```

Expected: prints clean summary, severity counts add up to total.

- [ ] **Step 3: Dry-run the data fixes**

```bash
node _audit/scripts/apply-data-fixes.mjs _audit/all-findings.json
```

Expected: prints `[dry-run] <file>: would apply N changes` lines for any data-fix issues.

- [ ] **Step 4: Commit aggregated findings**

```bash
git add _audit/all-findings.json
git commit -m "audit: aggregated findings across 5 batches"
```

---

## Task 10: Apply data fixes for real

**Files:** modifies `src/data/*.ts` per the findings

- [ ] **Step 1: Apply fixes**

```bash
node _audit/scripts/apply-data-fixes.mjs _audit/all-findings.json --apply
```

Expected: `✓ <file>: N changes applied` lines.

- [ ] **Step 2: Verify build still passes after fixes**

```bash
npx tsc --noEmit && npm run lint && npm run build 2>&1 | tail -10
```

Expected: tsc clean, lint same as before (no new errors), build succeeds with 53+ routes.

- [ ] **Step 3: Spot-check 3 fixed files manually**

```bash
git diff --stat
git diff src/data/symbols.ts | head -40
```

Confirm changes look sensible — chars replaced, duplicates dropped. If something looks wrong, `git checkout -- <file>` to revert and investigate.

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "audit: auto-fix literal-escape strings and visual duplicates from findings"
```

---

## Task 11: Phase C — write the state-of-website report

**Files:**
- Create: `_agent-reports/STATE-OF-WEBSITE.md`

- [ ] **Step 1: Dispatch the synthesis agent**

Use Agent tool, `subagent_type: "general-purpose"`. Prompt:

```
You are the Phase C Synthesis agent for the CopyChars visual audit.

Working directory: c:\Users\Nitin\OneDrive\Documents\Claude\Obsedian demo\copysymbols
Branch: agent/visual-audit (already checked out)

Inputs (read these first):
- _audit/all-findings.json — aggregated vision-agent findings
- _audit/page-list.json — full page list
- docs/superpowers/specs/2026-05-09-visual-audit-and-state-report-design.md — the spec, especially Section 7 for the report structure
- _agent-reports/CLEANUP-QUARANTINE.md (from Agent 3, on this branch) — context for what's already cleaned

Write _agent-reports/STATE-OF-WEBSITE.md with these exact sections (in order):

1. Executive summary (one paragraph): pages audited (46), total issues, breakdown by severity, what was auto-fixed in this PR
2. What this PR fixes automatically — bullet list of the auto-fix categories with counts (literal-escape strings replaced, visual duplicates removed, etc.)
3. Per-page table — markdown table with columns: Page | Desktop status | Mobile status | Issues | Auto-fixed | Severity. ✅ for clean, ⚠️ for issues. One row per page (46 rows).
4. Top 10 issues — for each: severity, page, evidence, screenshot reference (use markdown image syntax pointing at _audit/screenshots/...), suggested fix, status (auto-fixed Y/N).
5. Patterns across the site — paragraph-level synthesis. Look for systemic issues: e.g. "8 of 14 category pages have < 30 words of intro copy".
6. Recommendations grouped by effort:
   - 1-day: bullet list of fixable-in-next-PR items
   - 1-week: feature-level work (subscript-maker tool, /community build-out)
   - 1-month: rebuilds (e.g. /symbols/[category] with tabs/filters)
7. Subscript-maker tool stub — one paragraph teaser linking to "PR 6 (to be created)"
8. Appendix — link to _audit/all-findings.json, _audit/screenshots/, raw batch files

Be evidence-driven. Quote specific findings. Reference specific screenshots inline. Don't pad — if a page is clean, the table just shows ✅.

After writing the report:
1. git add _agent-reports/STATE-OF-WEBSITE.md
2. git commit -m "audit: state-of-website report (NN issues across 46 pages)"
3. git push origin agent/visual-audit

Output to me:
- Total issues found, by severity
- Number of pages with at least one issue
- Top 3 patterns you identified
- Confirm push succeeded
```

- [ ] **Step 2: Verify the report exists and looks reasonable**

```bash
ls -la _agent-reports/STATE-OF-WEBSITE.md
head -40 _agent-reports/STATE-OF-WEBSITE.md
```

Expected: file exists, starts with executive summary heading, mentions 46 pages.

---

## Task 12: Final verification & PR-ready

**Files:** none new

- [ ] **Step 1: Confirm working tree is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean` on `agent/visual-audit`.

- [ ] **Step 2: Build + lint + typecheck one more time**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -5 && npm run build 2>&1 | tail -5
```

Expected: all pass; lint same as before fixes (carry-overs OK, no new errors).

- [ ] **Step 3: Manual smoke test in dev**

```bash
npm run dev > /tmp/devserver.log 2>&1 &
sleep 6
```

Open http://localhost:3000/symbols/punctuation in a browser — confirm the smart quotes render correctly (no literal `“`). Open http://localhost:3000/symbols/superscript — confirm no duplicate cards. Open 3 other random category pages from the report's top-10-issues list to confirm fixes landed visually.

```bash
pkill -f 'next dev'
```

- [ ] **Step 4: Push (if any uncommitted local commits)**

```bash
git push origin agent/visual-audit
```

Expected: `Everything up-to-date` or a small push.

- [ ] **Step 5: Print compare URL for the user**

```bash
echo "PR ready: https://github.com/bsjuilla/copysymbols/compare/main...agent/visual-audit"
```

Note: this PR is built on top of `_audit-base` (which simulates main + the 3 other agent PRs merged). When the user merges those 3 PRs to main first, the diff against main will be clean. Until then, the diff will show 4 PRs' worth of changes — that's expected and the user knows.

---

## Self-review checklist (run after writing this plan)

- [x] Spec coverage: all 11 spec sections have at least one task — Section 1 (Context) → Task 1 motivation; Section 2 (Scope) → Task 2 page list; Section 3 (Pages) → Task 2; Section 4 (Approach) → Tasks 5/8/11; Section 5 (Checklist) → Task 8 prompt; Section 6 (Auto-fix) → Tasks 7/10; Section 7 (Report) → Task 11 prompt; Section 8 (Files) → noted throughout; Section 9 (Verification) → Task 12; Section 10 (Risks) → addressed in Task 1 conflict-resolution and Task 5 retry; Section 11 (Acceptance) → Task 12.
- [x] Placeholder scan: no TBDs, no "implement later", every code step has actual code or actual command.
- [x] Type consistency: `aggregate-findings.mjs` writes `{total_pages, total_issues, by_severity, by_category, findings}` — matches what `apply-data-fixes.mjs` reads (`data.findings`) and what the test asserts (`out.total_pages`, `out.total_issues`, `out.by_severity.high`).
- [x] Path consistency: `_audit/` everywhere, `agent/visual-audit` everywhere, `STATE-OF-WEBSITE.md` everywhere.
