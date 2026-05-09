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

  // Transform 1: literal escape strings — replace "\\uXXXX" with actual char.
  // Build the regex from explicit chars to avoid escape-layering ambiguity.
  // Pattern matches: quote, two literal backslash chars, "u", four hex, quote.
  if (issues.some(i => i.category === 'literal-escape')) {
    const before = content;
    const BS = String.fromCharCode(92);
    // Need 4 backslashes in the regex SOURCE STRING to match 2 actual backslash bytes:
    // `\\\\` in regex syntax = two `\\` regex escapes = match two literal `\` chars.
    const literalEscapeRe = new RegExp('"' + BS + BS + BS + BS + 'u([0-9A-Fa-f]{4})"', 'g');
    content = content.replace(literalEscapeRe, (_, hex) => {
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
      console.log(`OK ${file}: ${changes} changes applied`);
    } else {
      console.log(`[dry-run] ${file}: would apply ${changes} changes`);
    }
    totalChanges += changes;
  }
}

console.log(`\nTotal changes: ${totalChanges} (${apply ? 'applied' : 'dry-run'})`);
