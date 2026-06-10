// One-shot: insert the visible <PostMeta/> byline into every blog post.
// Idempotent (skips files already containing PostMeta). Reports per-file status.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const blogDir = "src/app/blog";
const IMPORT_ANCHOR = 'import { canonical } from "@/lib/canonical";';
const IMPORT_LINE = 'import PostMeta from "@/components/PostMeta";';
const ELEMENT = "<PostMeta published={PUBLISHED} modified={MODIFIED} />";

let ok = 0, skipped = 0, failed = [];
for (const entry of readdirSync(blogDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = join(blogDir, entry.name, "page.tsx");
  if (!existsSync(file)) continue;
  let src = readFileSync(file, "utf8");

  if (src.includes("PostMeta")) { skipped++; continue; }
  if (!src.includes(IMPORT_ANCHOR) || !src.includes("const PUBLISHED") || !src.includes("</h1>")) {
    failed.push(entry.name);
    continue;
  }
  src = src.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + "\n" + IMPORT_LINE);
  // insert after the FIRST closing </h1>
  src = src.replace("</h1>", "</h1>\n        " + ELEMENT);
  writeFileSync(file, src, "utf8");
  ok++;
}
console.log(`inserted: ${ok}, already-had: ${skipped}, FAILED: ${failed.length}${failed.length ? " -> " + failed.join(", ") : ""}`);
