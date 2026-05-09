#!/usr/bin/env node
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const dir = '_audit/_fix-test';
fs.mkdirSync(dir, { recursive: true });

// Build the fixture string using explicit char codes so backslash count is unambiguous.
// What the content-bot would write to disk for an entry whose symbol-string starts
// with a literal backslash + u + 4 hex is the byte sequence: " \ \ u 2 0 1 C "
// i.e. quote, two literal backslashes, u, four hex, quote — because esc() doubles backslashes.
const BS = String.fromCharCode(92);            // "\"
const SMART_LEFT_DQUOTE = String.fromCharCode(0x201C); // "“"
const STAR = String.fromCharCode(0x2605);     // "★"

const fixtureSource = [
  'export const items = [',
  `  { id: "good-1", symbol: "${SMART_LEFT_DQUOTE}", name: "Smart Quote", category: "punctuation" },`,
  `  { id: "bad-1", symbol: "${BS}${BS}u201C", name: "Broken Quote", category: "punctuation" },`,
  `  { id: "dupe-a", symbol: "${STAR}", name: "Star", category: "shapes" },`,
  `  { id: "dupe-b", symbol: "${STAR}", name: "Star", category: "shapes" },`,
  '];',
  '',
].join('\n');

fs.writeFileSync(`${dir}/data.ts`, fixtureSource);

// Confirm the fixture has exactly two backslashes in front of u201C
const written = fs.readFileSync(`${dir}/data.ts`, 'utf8');
if (!written.includes(`${BS}${BS}u201C`)) {
  console.error('FIXTURE BROKEN — expected literal "\\\\u201C" pattern in fixture; got:');
  console.error(written);
  process.exit(2);
}

fs.writeFileSync(`${dir}/all-findings.json`, JSON.stringify({
  findings: [
    { page: '/p', issues: [
      { severity: 'high', category: 'literal-escape', evidence: `shows ${BS}${BS}u201C in card "Broken Quote"`, suggested_fix: 'data-fix', target_file: `${dir}/data.ts` },
      { severity: 'medium', category: 'visual-duplicate', evidence: `two ${STAR} cards with same name`, suggested_fix: 'data-fix', target_file: `${dir}/data.ts` },
    ]}
  ],
}));

execSync(`node _audit/scripts/apply-data-fixes.mjs ${dir}/all-findings.json --apply`);

const after = fs.readFileSync(`${dir}/data.ts`, 'utf8');
const errors = [];

if (after.includes(`${BS}${BS}u201C`)) errors.push('literal escape "\\\\u201C" not replaced');

// After the escape fix, bad-1's symbol is now identical to good-1's, so the dedupe
// transform correctly removes one. Final state: exactly 1 smart-quote line.
const smartCount = (after.match(new RegExp(`symbol: "${SMART_LEFT_DQUOTE}"`, 'g')) || []).length;
if (smartCount !== 1) errors.push(`expected 1 smart-quote line after fix+dedupe, got ${smartCount}`);

const starCount = (after.match(new RegExp(`"${STAR}"`, 'g')) || []).length;
if (starCount !== 1) errors.push(`expected 1 star after dedupe, got ${starCount}`);

fs.rmSync(dir, { recursive: true });

if (errors.length) { console.error('FAIL\n' + errors.map(e => '  - ' + e).join('\n')); process.exit(1); }
console.log('OK');
