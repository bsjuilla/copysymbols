#!/usr/bin/env node
import fs from 'node:fs';

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
