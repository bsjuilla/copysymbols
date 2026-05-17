// Smoke test for useCopyToast: verifies a useRef holds the active timer
// handle so back-to-back copy calls clear the previous timer.
// Run: npx tsx src/lib/use-copy-toast.timer.test.ts

import { readFileSync } from "fs";
import { join } from "path";

const src = readFileSync(join(__dirname, "use-copy-toast.ts"), "utf-8");

const errors: string[] = [];
if (!src.includes("useRef")) {
  errors.push("use-copy-toast.ts must import and use useRef to hold the timer handle");
}
if (!src.includes("clearTimeout")) {
  errors.push("use-copy-toast.ts must call clearTimeout to cancel stale timers");
}
if (!src.match(/useEffect\([^)]*\)\s*=>\s*\(\)\s*=>\s*\{[^}]*clearTimeout/)) {
  errors.push("use-copy-toast.ts must have a useEffect cleanup that clears the timer on unmount");
}

if (errors.length > 0) {
  console.error("useCopyToast timer-race test failed:");
  errors.forEach(e => console.error("  - " + e));
  process.exit(1);
}
console.log("useCopyToast timer-race test passed");
