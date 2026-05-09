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
    console.log(`OK  ${urlPath}`);
  } catch (err) {
    fail++;
    failures.push({ urlPath, slug, error: err.message });
    console.error(`FAIL ${urlPath} -- ${err.message}`);
  }
}

await browser.close();

console.log(`\nDone -- ${ok} ok, ${fail} failed`);
if (failures.length) {
  fs.writeFileSync('_audit/screenshot-failures.json', JSON.stringify(failures, null, 2));
  process.exit(1);
}
