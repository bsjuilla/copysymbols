import { emoji, emojiCategories } from "@/data/emoji";
import { getEmojiMeta } from "@/data/emoji-meta";
import { apiJson, apiError, preflight, gate, params, clampInt, codepoints } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

const CATS = new Set(emojiCategories.map((c) => c.id));

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/emoji?q=cat&category=animals&limit=30
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  const p = params(request);
  const q = p.get("q")?.trim().toLowerCase();
  const category = p.get("category")?.toLowerCase();
  const limit = clampInt(p.get("limit"), 30, 1, 100);

  if (category && !CATS.has(category)) {
    return apiError(400, `Unknown category "${category}". Valid: ${[...CATS].join(", ")}.`, "bad_request");
  }

  let rows = emoji;
  if (category) rows = rows.filter((e) => e.category === category);
  if (q) rows = rows.filter((e) => e.name.toLowerCase().includes(q) || e.keywords.some((kw) => kw.toLowerCase().includes(q)) || e.emoji === q);

  const out = rows.slice(0, limit).map((e) => {
    const m = getEmojiMeta(e.emoji);
    return {
      id: e.id,
      emoji: e.emoji,
      name: e.name,
      category: e.category,
      codepoints: codepoints(e.emoji),
      version: m?.v || null,
      year: m && m.y > 0 ? m.y : null,
      keywords: e.keywords,
      cldrKeywords: m?.kw ?? [],
    };
  });

  return apiJson({ count: out.length, total: rows.length, results: out });
}
