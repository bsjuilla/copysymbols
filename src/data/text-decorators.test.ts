import { decorators } from "./text-decorators";

if (decorators.length < 25) throw new Error(`Expected >=25 decorators, got ${decorators.length}`);
for (const d of decorators) {
  if (!d.id || !d.name || typeof d.wrap !== "function") throw new Error(`Malformed decorator: ${JSON.stringify(d)}`);
  const result = d.wrap("hello");
  if (!result.includes("hello")) throw new Error(`Decorator "${d.id}" did not include input in output: ${result}`);
}
console.log(`text-decorators smoke test passed (${decorators.length} decorators)`);
