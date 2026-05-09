#!/usr/bin/env node
import fs from 'node:fs';
import { execSync } from 'node:child_process';

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

fs.rmSync('_audit/_test', { recursive: true });

if (errors.length) { console.error('FAIL\n' + errors.join('\n')); process.exit(1); }
console.log('OK');
