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

// Normalise field names: some vision agents used `type`/`description` instead of
// `category`/`evidence`. Mutate in place so downstream scripts see one schema.
for (const finding of findings) {
  for (const issue of finding.issues || []) {
    if (issue.type && !issue.category) issue.category = issue.type;
    if (issue.description && !issue.evidence) issue.evidence = issue.description;
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
