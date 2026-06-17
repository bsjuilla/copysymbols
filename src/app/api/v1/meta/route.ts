import { STYLES } from "@/lib/fancy-text-styles";
import { allKaomoji } from "@/data/all-kaomoji";
import { kaomojiCategories } from "@/data/kaomoji";
import { emoji, emojiCategories } from "@/data/emoji";
import { symbols, categories } from "@/data/symbols";
import { ORNAMENTS } from "@/lib/username-ornaments";
import { ALL_VIBES } from "@/lib/username-generate";
import { apiJson, preflight, gate } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/meta — live dataset counts + endpoint catalogue. Because every
// number here is read straight from the same data modules the website renders
// from, this always reflects the latest deploy (the API auto-updates with the
// site). Use it as a health check and to discover valid filter values.
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  return apiJson({
    name: "CopyChars API",
    version: "v1",
    docs: "https://www.copychars.com/developers",
    counts: {
      fancyTextStyles: STYLES.length,
      kaomoji: allKaomoji.filter((k) => !k.isDuplicate).length,
      emoji: emoji.length,
      symbols: symbols.filter((s) => !s.id.startsWith("gen-")).length,
      usernameOrnaments: ORNAMENTS.length,
    },
    filters: {
      fancyTextStyles: STYLES.map((s) => s.slug),
      kaomojiMoods: kaomojiCategories.map((c) => c.id),
      emojiCategories: emojiCategories.map((c) => c.id),
      symbolCategories: categories.map((c) => c.id),
      usernameVibes: ALL_VIBES,
    },
    endpoints: [
      "GET /api/v1/fancy-text?text=&style=all",
      "GET /api/v1/username?name=&vibe=all&count=24",
      "GET /api/v1/kaomoji?mood=&q=&limit=30&random=false",
      "GET /api/v1/emoji?q=&category=&limit=30",
      "GET /api/v1/symbols?category=&q=&limit=50",
      "GET /api/v1/render-check?text=",
      "GET /api/v1/meta",
    ],
  });
}
