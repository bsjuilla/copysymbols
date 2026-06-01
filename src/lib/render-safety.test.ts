// Tests for the render-safety verdict (src/lib/render-safety.ts).
//
// No test framework configured — plain imports, throw on failure, console.log on
// pass. Run with: npx tsx src/lib/render-safety.test.ts
import { renderSafety, emojiVariation, type Verdict } from "./render-safety";

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

function expectOverall(glyph: string, expected: Verdict, label: string): void {
  const r = renderSafety(glyph);
  assert(r.overall === expected, `${label}: expected overall "${expected}", got "${r.overall}" for "${glyph}" (${JSON.stringify(r.byPlatform)})`);
}

// ── Safe, universal characters ───────────────────────────────────────────────
expectOverall("A", "safe", "plain ASCII letter");
expectOverall("→", "safe", "arrow (U+2192)");
expectOverall("★", "safe", "black star (U+2605)");
expectOverall("♡", "safe", "outline heart (U+2661)");
expectOverall("①", "safe", "circled number (enclosed alphanumerics)");

// ── Common fancy fonts — safe ────────────────────────────────────────────────
expectOverall("𝐚", "safe", "math bold a (U+1D41A)");
expectOverall("𝓪", "safe", "math bold-script a");

// ── Risky fancy fonts — flagged + safe swap offered ──────────────────────────
const fraktur = renderSafety("𝔞"); // Mathematical Fraktur Small A, U+1D51E
assert(fraktur.overall === "risky", `fraktur a: expected risky, got ${fraktur.overall}`);
assert(fraktur.byPlatform.windows === "safe", "fraktur a: Windows should be safe");
assert(fraktur.byPlatform.ios === "risky", "fraktur a: iPhone should be risky");
assert(fraktur.safer === "𝐚", `fraktur a: expected safer swap "𝐚" (bold), got "${fraktur.safer}"`);

const dstruck = renderSafety("𝕒"); // Double-struck Small A, U+1D552
assert(dstruck.overall === "risky", `double-struck a: expected risky, got ${dstruck.overall}`);
assert(typeof dstruck.safer === "string" && dstruck.safer.length > 0, "double-struck a: should offer a safer swap");

// fraktur gap letter (C lives in Letterlike Symbols ℭ) still maps + swaps
const frakturC = renderSafety("ℭ");
assert(frakturC.overall === "risky", "fraktur C (ℭ): expected risky");
assert(frakturC.safer === "𝐂", `fraktur C: expected safer "𝐂", got "${frakturC.safer}"`);

// ── Emoji ────────────────────────────────────────────────────────────────────
expectOverall("😀", "safe", "standard emoji grinning face (U+1F600)");
expectOverall("🫨", "risky", "new emoji shaking face (U+1FAE8)");

// ── Combining / zalgo ────────────────────────────────────────────────────────
expectOverall("́", "risky", "combining acute accent (zalgo mark)");

// ── Exotic script characters ─────────────────────────────────────────────────
expectOverall("𐰁", "box", "Old Turkic letter (U+10C01, astral exotic)");
expectOverall("ꕥ", "risky", "Vai symbol (U+A565, BMP exotic decorative)");

// ── Empty input ──────────────────────────────────────────────────────────────
assert(renderSafety("").overall === "safe", "empty input should be safe/neutral");

// ── A safe character must report safe on every platform ──────────────────────
const safeAll = renderSafety("→").byPlatform;
assert(
  safeAll.ios === "safe" && safeAll.android === "safe" && safeAll.windows === "safe" && safeAll.discord === "safe",
  "arrow should be safe on all four platforms",
);

// ── emojiVariation (VS-15 / VS-16 dual-presentation) ─────────────────────────
const cpsOf = (s: string) => Array.from(s, c => c.codePointAt(0)!);

const aries = emojiVariation("♈"); // U+2648 — has both presentations
assert(aries !== null, "♈ (zodiac) should have a text/emoji variation");
assert(cpsOf(aries!.text).join(",") === "9800,65038", `♈ text form should end in U+FE0E, got ${cpsOf(aries!.text)}`);
assert(cpsOf(aries!.emoji).join(",") === "9800,65039", `♈ emoji form should end in U+FE0F, got ${cpsOf(aries!.emoji)}`);

const heartSuit = emojiVariation("♥"); // U+2665 — dual
assert(heartSuit !== null, "♥ heart suit should have a variation");

const tm = emojiVariation("™"); // U+2122 — dual (curated extra)
assert(tm !== null, "™ should have a variation");

assert(emojiVariation("★") === null, "★ (U+2605) is text-only — no variation toggle");
assert(emojiVariation("♚") === null, "♚ chess king is text-only — no variation toggle");
assert(emojiVariation("A") === null, "plain letter has no variation");
assert(emojiVariation("😀") === null, "emoji-only char has no text/emoji toggle");
assert(emojiVariation("♈️") === null, "a char that already carries a selector is skipped");

console.log("render-safety.ts tests passed");
