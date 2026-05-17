import { readFileSync } from "fs";
import { join } from "path";

const src = readFileSync(join(__dirname, "SymbolCopyButtons.tsx"), "utf-8");

const errors: string[] = [];
if (!src.includes("useCopyToast")) {
  errors.push("SymbolCopyButtons.tsx must import useCopyToast from @/lib/use-copy-toast");
}
if (src.includes("navigator.clipboard.writeText")) {
  errors.push("SymbolCopyButtons.tsx should not call navigator.clipboard.writeText directly — use the hook");
}
if (src.includes("getElementById(\"global-toast\")")) {
  errors.push("SymbolCopyButtons.tsx should not manipulate #global-toast directly — use the hook");
}
console.log(errors.length === 0 ? "SymbolCopyButtons refactor test passed" : (errors.forEach(e => console.error(e)), process.exit(1)));
