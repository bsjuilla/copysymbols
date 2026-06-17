import { allKaomoji } from "@/data/all-kaomoji";
import { kaomojiCategories } from "@/data/kaomoji";
import { apiJson, apiError, preflight, gate, params, clampInt } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

const MOODS = new Set(kaomojiCategories.map((c) => c.id));
// Indexable corpus excludes the noindex'd duplicate-name variants.
const CORPUS = allKaomoji.filter((k) => !k.isDuplicate);

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/kaomoji?mood=happy&q=bear&limit=20&random=true
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  const p = params(request);
  const mood = p.get("mood")?.toLowerCase();
  const q = p.get("q")?.trim().toLowerCase();
  const limit = clampInt(p.get("limit"), 30, 1, 100);
  const random = p.get("random") === "true" || p.get("random") === "1";

  if (mood && !MOODS.has(mood)) {
    return apiError(400, `Unknown mood "${mood}". Valid moods: ${[...MOODS].join(", ")}.`, "bad_request");
  }

  let rows = CORPUS;
  if (mood) rows = rows.filter((k) => k.mood === mood);
  if (q) rows = rows.filter((k) => k.name.toLowerCase().includes(q) || k.keywords.some((kw) => kw.toLowerCase().includes(q)) || k.face.includes(q));

  let out = rows;
  if (random) out = [...rows].sort(() => Math.random() - 0.5);
  out = out.slice(0, limit);

  return apiJson(
    {
      count: out.length,
      total: rows.length,
      results: out.map((k) => ({ slug: k.slug, name: k.name, face: k.face, mood: k.mood, keywords: k.keywords })),
    },
    random ? { cache: "no-store" } : {},
  );
}
