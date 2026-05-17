// Test: every gen-zodiac-* entry whose glyph is a planet glyph must have
// that planet name embedded in its slug (the "id" field, which becomes the URL).
//
// Pass-1 audit found 5 mismatches where the slug claimed one planet but the
// `symbol` field carried a different planet's glyph (e.g. slug says "uranus"
// but symbol is "♄" Saturn). Pages are noindex'd so SEO is unaffected, but
// users following any cached link to /symbol/gen-zodiac-uranus-... see the
// wrong planet. This test enforces slug↔glyph correspondence.

import { generatedSymbols } from "./generated-symbols";

// Planet glyph → canonical planet name (must appear in slug)
const PLANET_GLYPHS: Record<string, string> = {
  "☿": "mercury",
  "♀": "venus",
  "♁": "earth",
  "♂": "mars",
  "♃": "jupiter",
  "♄": "saturn",
  "♅": "uranus",
  "♆": "neptune",
  "♇": "pluto",
};

const PLANET_NAMES = Object.values(PLANET_GLYPHS);

const mismatches: { id: string; symbol: string; name: string; expectedPlanet: string; wrongPlanetInSlug: string }[] = [];

for (const sym of generatedSymbols) {
  if (!sym.id.startsWith("gen-zodiac-")) continue;
  const expectedPlanet = PLANET_GLYPHS[sym.symbol];
  if (!expectedPlanet) continue; // not a planet glyph — skip
  const slugLower = sym.id.toLowerCase();
  // Find any *other* planet name embedded in the slug — that's the bug we're guarding against.
  // A slug like "gen-zodiac-2642" (hex codepoint, no planet word) is consistent and fine.
  const wrongPlanet = PLANET_NAMES.find(p => p !== expectedPlanet && slugLower.includes(p));
  if (wrongPlanet) {
    mismatches.push({ id: sym.id, symbol: sym.symbol, name: sym.name, expectedPlanet, wrongPlanetInSlug: wrongPlanet });
  }
}

if (mismatches.length > 0) {
  console.error(`Found ${mismatches.length} zodiac slug/glyph mismatch(es):`);
  for (const m of mismatches) {
    console.error(`  id="${m.id}" symbol="${m.symbol}" name="${m.name}" — slug contains wrong planet "${m.wrongPlanetInSlug}", should be "${m.expectedPlanet}"`);
  }
  throw new Error(`zodiac slug/glyph mismatches: ${mismatches.length}`);
}

console.log(`zodiac slug test passed (${generatedSymbols.filter(s => s.id.startsWith("gen-zodiac-")).length} zodiac entries checked)`);
