// Smoke test: verifies the hook module exports a callable.
// Full DOM/React behavior is not tested (no JSDOM or React renderer
// configured in this repo). Run with: npx tsx src/lib/use-copy-toast.test.ts
import { useCopyToast } from "./use-copy-toast";

if (typeof useCopyToast !== "function") {
  throw new Error("useCopyToast must be a function");
}
console.log("useCopyToast smoke test passed");
