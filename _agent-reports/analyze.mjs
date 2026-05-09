// One-off analysis script for code-audit. Uses node:fs globSync (no extra deps).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SRC = path.join(ROOT, "src");

function readText(p) { return fs.readFileSync(p, "utf8"); }
function listFiles(pattern, cwd) {
  return fs.globSync(pattern, { cwd }).map(f => f.replace(/\\/g, "/"));
}

// ---------- 1. Routes ----------
const pageFiles = listFiles("app/**/page.tsx", SRC).sort();
const finalRoutes = pageFiles.map(f => {
  // app/page.tsx -> /
  // app/foo/page.tsx -> /foo
  // app/foo/bar/page.tsx -> /foo/bar
  let r = f.replace(/^app/, "").replace(/\/page\.tsx$/, "");
  if (r === "") r = "/";
  return r;
});

// ---------- 2. Sitemap ----------
const sitemapTxt = readText(path.join(SRC, "app/sitemap.ts"));
const urlMatches = [...sitemapTxt.matchAll(/url:\s*(?:base|`\$\{base\}([^`]*)`)/g)];
const staticSitemap = urlMatches.map(m => {
  const tail = m[1];
  if (tail === undefined || tail === "") return "/";
  return tail;
});

// ---------- 3. Drift ----------
const staticRoutes = finalRoutes.filter(r => !r.includes("["));
const dynamicRoutes = finalRoutes.filter(r => r.includes("["));
const dynamicPatternMatchers = dynamicRoutes.map(r => new RegExp("^" + r.replace(/\[[^\]]+\]/g, "[^/]+") + "$"));

const sitemapSet = new Set(staticSitemap);
const missingFromSitemap = staticRoutes.filter(r => !sitemapSet.has(r));
const sitemapOrphans = staticSitemap.filter(u => {
  if (staticRoutes.includes(u)) return false;
  return !dynamicPatternMatchers.some(re => re.test(u));
});

// ---------- 4. Internal hrefs ----------
const tsxFiles = listFiles("**/*.{ts,tsx}", SRC).filter(f => !f.endsWith(".d.ts"));
const allHrefs = new Set();
const hrefSources = {};
const hrefRe1 = /href=["'](\/[^"'#?\s]*)/g;
const hrefRe2 = /href=\{`(\/[^`#?]*?)\$\{/g;
const hrefRe3 = /href=\{`(\/[^`#?\s]*?)`\}/g;
for (const f of tsxFiles) {
  const src = readText(path.join(SRC, f));
  for (const m of [...src.matchAll(hrefRe1), ...src.matchAll(hrefRe3)]) {
    const url = m[1];
    if (!url) continue;
    const clean = url.split("?")[0].split("#")[0];
    if (clean.startsWith("/")) {
      allHrefs.add(clean);
      (hrefSources[clean] ||= []).push(f);
    }
  }
  for (const m of src.matchAll(hrefRe2)) {
    const prefix = m[1];
    const clean = prefix.split("?")[0].split("#")[0];
    if (clean && clean !== "/") {
      const key = clean + "[VAR]";
      allHrefs.add(key);
      (hrefSources[key] ||= []).push(f);
    }
  }
}

function hrefMatches(href) {
  if (href.endsWith("[VAR]")) {
    const prefix = href.replace("[VAR]", "");
    if (staticRoutes.includes(prefix)) return true;
    return dynamicPatternMatchers.some(re => re.test(prefix + "x"));
  }
  if (staticRoutes.includes(href)) return true;
  if (dynamicPatternMatchers.some(re => re.test(href))) return true;
  return false;
}
const brokenHrefs = [...allHrefs].filter(h => !hrefMatches(h)).sort();

// ---------- 5. Data file duplicates ----------
function loadSymbols(f) {
  const src = readText(path.join(SRC, "data", f));
  const out = [];
  const re = /\{\s*id:\s*"([^"]*)",\s*symbol:\s*"([^"]*)",\s*name:\s*"([^"]*)"/g;
  for (const m of src.matchAll(re)) out.push({ id: m[1], symbol: m[2], name: m[3] });
  return out;
}
function loadKaomoji(f) {
  const src = readText(path.join(SRC, "data", f));
  const out = [];
  const re = /\{\s*id:\s*"([^"]*)",\s*face:\s*"([^"]*)",\s*name:\s*"([^"]*)"/g;
  for (const m of src.matchAll(re)) out.push({ id: m[1], face: m[2], name: m[3] });
  return out;
}

const symA = loadSymbols("symbols.ts");
const symB = loadSymbols("generated-symbols.ts");
const symC = loadSymbols("extra-symbols.ts");
const kaoA = loadKaomoji("kaomoji.ts");
const kaoB = loadKaomoji("generated-kaomoji.ts");

function dupReport(a, b, key) {
  const setA = new Map();
  for (const r of a) setA.set(r[key], r);
  const dups = [];
  for (const r of b) if (setA.has(r[key])) dups.push({ value: r[key], a: setA.get(r[key]), b: r });
  return dups;
}

function internalDups(arr, key) {
  const seen = new Map();
  const dups = [];
  for (const r of arr) {
    if (seen.has(r[key])) dups.push({ value: r[key], records: [seen.get(r[key]), r] });
    else seen.set(r[key], r);
  }
  return dups;
}

const dupAB = dupReport(symA, symB, "symbol");
const dupAC = dupReport(symA, symC, "symbol");
const dupBC = dupReport(symB, symC, "symbol");
const dupKAB = dupReport(kaoA, kaoB, "face");

const internal = {
  "symbols.ts": internalDups(symA, "symbol"),
  "generated-symbols.ts": internalDups(symB, "symbol"),
  "extra-symbols.ts": internalDups(symC, "symbol"),
  "kaomoji.ts": internalDups(kaoA, "face"),
  "generated-kaomoji.ts": internalDups(kaoB, "face"),
};
const internalIdDups = {
  "symbols.ts": internalDups(symA, "id"),
  "generated-symbols.ts": internalDups(symB, "id"),
  "extra-symbols.ts": internalDups(symC, "id"),
  "kaomoji.ts": internalDups(kaoA, "id"),
  "generated-kaomoji.ts": internalDups(kaoB, "id"),
};

// ---------- 6. Record shape ----------
function parseRecordKeys(src) {
  const out = [];
  let i = 0; let depth = 0; let inArray = false; let recordStart = -1;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "/" && src[i+1] === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }
    if (ch === "/" && src[i+1] === "*") { i += 2; while (i < src.length-1 && !(src[i] === "*" && src[i+1] === "/")) i++; i += 2; continue; }
    if (ch === '"') { i++; while (i < src.length && src[i] !== '"') { if (src[i] === "\\") i++; i++; } i++; continue; }
    if (ch === "'") { i++; while (i < src.length && src[i] !== "'") { if (src[i] === "\\") i++; i++; } i++; continue; }
    if (ch === "`") { i++; while (i < src.length && src[i] !== "`") { if (src[i] === "\\") i++; i++; } i++; continue; }
    if (!inArray && ch === "[" && src.slice(Math.max(0,i-200), i).includes("=")) { inArray = true; i++; continue; }
    if (inArray) {
      if (ch === "{") {
        if (depth === 0) recordStart = i;
        depth++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0 && recordStart !== -1) {
          out.push(src.slice(recordStart, i+1));
          recordStart = -1;
        }
      } else if (ch === "]" && depth === 0) {
        inArray = false;
      }
    }
    i++;
  }
  return out;
}
function topLevelKeys(rec) {
  const inner = rec.slice(1, -1);
  const keys = new Set();
  let i = 0; let depth = 0;
  while (i < inner.length) {
    const ch = inner[i];
    if (ch === "/" && inner[i+1] === "/") { while (i < inner.length && inner[i] !== "\n") i++; continue; }
    if (ch === '"') { i++; while (i < inner.length && inner[i] !== '"') { if (inner[i] === "\\") i++; i++; } i++; continue; }
    if (ch === "'") { i++; while (i < inner.length && inner[i] !== "'") { if (inner[i] === "\\") i++; i++; } i++; continue; }
    if (ch === "`") { i++; while (i < inner.length && inner[i] !== "`") { if (inner[i] === "\\") i++; i++; } i++; continue; }
    if (ch === "{" || ch === "[" || ch === "(") depth++;
    else if (ch === "}" || ch === "]" || ch === ")") depth--;
    else if (depth === 0) {
      const m = inner.slice(i).match(/^([a-zA-Z_$][\w$]*)\s*:/);
      if (m) { keys.add(m[1]); i += m[0].length; continue; }
    }
    i++;
  }
  return [...keys];
}
function shapeAnalysis(filename) {
  const src = readText(path.join(SRC, "data", filename));
  const recs = parseRecordKeys(src);
  const keysList = recs.map(topLevelKeys);
  const counts = new Map();
  for (const ks of keysList) {
    const sig = ks.slice().sort().join(",");
    counts.set(sig, (counts.get(sig) || 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a,b) => b[1] - a[1]);
  const majority = sorted[0]?.[0] || "";
  const variants = sorted.filter(([s]) => s !== majority);
  return { total: recs.length, majority, majority_count: sorted[0]?.[1] || 0, variants: variants.slice(0, 10), variantTotal: variants.reduce((s, [,c]) => s+c, 0) };
}
const shapes = {
  "symbols.ts": shapeAnalysis("symbols.ts"),
  "generated-symbols.ts": shapeAnalysis("generated-symbols.ts"),
  "extra-symbols.ts": shapeAnalysis("extra-symbols.ts"),
  "kaomoji.ts": shapeAnalysis("kaomoji.ts"),
  "generated-kaomoji.ts": shapeAnalysis("generated-kaomoji.ts"),
};

// ---------- 7. Dead components ----------
const componentFiles = listFiles("components/**/*.{ts,tsx}", SRC);
const dead = [];
for (const c of componentFiles) {
  const base = path.basename(c, path.extname(c));
  const otherFiles = tsxFiles.filter(f => f !== c);
  const otherText = otherFiles.map(f => fs.readFileSync(path.join(SRC, f), "utf8")).join("\n");
  const re1 = new RegExp(`from\\s+["'][^"']*${base}["']`);
  const re2 = new RegExp(`import\\s*\\{[^}]*\\b${base}\\b[^}]*\\}\\s*from\\s*["'][^"']*["']`);
  const re3 = new RegExp(`<${base}[\\s/>]`);  // direct usage
  if (!re1.test(otherText) && !re2.test(otherText) && !re3.test(otherText)) {
    dead.push(c);
  }
}

// ---------- output ----------
const out = {
  routes: { count: finalRoutes.length, static: staticRoutes, dynamic: dynamicRoutes },
  sitemap: { static_count: staticSitemap.length, missingFromSitemap, sitemapOrphans },
  brokenHrefs: brokenHrefs.map(h => ({ href: h, sources: hrefSources[h] || [] })),
  duplicates_across_files: {
    "symbols.ts__vs__generated-symbols.ts": { count: dupAB.length, examples: dupAB.slice(0,5) },
    "symbols.ts__vs__extra-symbols.ts":    { count: dupAC.length, examples: dupAC.slice(0,5) },
    "generated-symbols.ts__vs__extra-symbols.ts": { count: dupBC.length, examples: dupBC.slice(0,5) },
    "kaomoji.ts__vs__generated-kaomoji.ts": { count: dupKAB.length, examples: dupKAB.slice(0,5) },
  },
  internal_duplicates_by_value: Object.fromEntries(Object.entries(internal).map(([k,v]) => [k, { count: v.length, examples: v.slice(0,5) }])),
  internal_duplicates_by_id: Object.fromEntries(Object.entries(internalIdDups).map(([k,v]) => [k, { count: v.length, examples: v.slice(0,5) }])),
  shapes,
  dead_components: dead,
  data_counts: {
    "symbols.ts": symA.length,
    "generated-symbols.ts": symB.length,
    "extra-symbols.ts": symC.length,
    "kaomoji.ts": kaoA.length,
    "generated-kaomoji.ts": kaoB.length,
  },
};
console.log(JSON.stringify(out, null, 2));
