// Tests for the game name validator (src/lib/game-name-validator.ts).
// Run with: npx tsx src/lib/game-name-validator.test.ts
import { validateName } from "./game-name-validator";
import { getGameRule } from "../data/game-name-rules";

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

const ff = getGameRule("free-fire")!;
const valorant = getGameRule("valorant")!;
const discord = getGameRule("discord")!;
const roblox = getGameRule("roblox")!;

// ── Free Fire (12 chars, no emoji, symbols OK) ───────────────────────────────
const ffOk = validateName(ff, "Player");
assert(ffOk.verdict === "ok", `FF "Player" should be ok, got ${ffOk.verdict}`);
assert(ffOk.charCount === 6, `FF "Player" charCount should be 6, got ${ffOk.charCount}`);

const ffLong = validateName(ff, "SuperLongPlayerName"); // 19 > 12
assert(ffLong.verdict === "reject" && ffLong.tooLong, "FF over-12 name should reject (too long)");

const ffShort = validateName(ff, "ab"); // < minLen 3
assert(ffShort.verdict === "reject" && ffShort.tooShort, "FF 2-char name should reject (too short)");

const ffEmoji = validateName(ff, "Nova🔥"); // emoji stripped -> warn
assert(ffEmoji.verdict === "warn", `FF "Nova🔥" should warn (emoji stripped), got ${ffEmoji.verdict}`);
assert(ffEmoji.strippedEmoji.length === 1, "FF should flag 1 stripped emoji");

const ffSymbols = validateName(ff, "꧁Nova꧂"); // decorative symbols allowed
assert(ffSymbols.verdict === "ok", `FF "꧁Nova꧂" should be ok (symbols allowed), got ${ffSymbols.verdict}`);
assert(ffSymbols.charCount === 6, `FF "꧁Nova꧂" charCount should be 6, got ${ffSymbols.charCount}`);

// ── Valorant (strict: letters/numbers/space only, bans special chars) ────────
assert(validateName(valorant, "Nova").verdict === "ok", "Valorant plain name should be ok");
const valBanned = validateName(valorant, "No_va"); // underscore banned
assert(valBanned.verdict === "reject" && valBanned.rejectedChars.includes("_"), "Valorant should reject underscore");
const valFancy = validateName(valorant, "𝓝𝓸𝓿𝓪"); // fancy font -> non-ASCII -> reject
assert(valFancy.verdict === "reject", "Valorant should reject a fancy font name");
const valStar = validateName(valorant, "Nova★");
assert(valStar.verdict === "reject" && valStar.rejectedChars.includes("★"), "Valorant should reject ★");

// ── Discord display name (full Unicode allowed) ──────────────────────────────
const dcFancy = validateName(discord, "𝓝𝓸𝓿𝓪 🔥"); // fonts + emoji both allowed
assert(dcFancy.verdict === "ok", `Discord display "𝓝𝓸𝓿𝓪 🔥" should be ok, got ${dcFancy.verdict}`);

// ── Roblox (no symbols, no emoji) ────────────────────────────────────────────
assert(validateName(roblox, "Nova").verdict === "ok", "Roblox plain name should be ok");
assert(validateName(roblox, "Nova★").verdict === "reject", "Roblox should reject ★ (symbol)");

// empty input is neutral (not too-short until they type something meaningful)
const empty = validateName(ff, "");
assert(empty.charCount === 0 && empty.verdict === "ok", "empty name should be neutral");

console.log("game-name-validator.ts tests passed");
