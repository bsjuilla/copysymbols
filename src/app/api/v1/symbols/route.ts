import { symbols, categories } from "@/data/symbols";
import { apiJson, apiError, preflight, gate, params, clampInt } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

const CATS = new Set(categories.map((c) => c.id));
// Curated symbols only (exclude auto-generated gen-* ids, same as the sitemap).
const CORPUS = symbols.filter((s) => !s.id.startsWith("gen-"));

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/symbols?category=arrows&q=right&limit=50
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  const p = params(request);
  const category = p.get("category")?.toLowerCase();
  const q = p.get("q")?.trim().toLowerCase();
  const limit = clampInt(p.get("limit"), 50, 1, 200);

  if (category && !CATS.has(category)) {
    return apiError(400, `Unknown category "${category}". Valid: ${[...CATS].join(", ")}.`, "bad_request");
  }

  let rows = CORPUS;
  if (category) rows = rows.filter((s) => s.category === category);
  if (q) rows = rows.filter((s) => s.name.toLowerCase().includes(q) || s.keywords.some((kw) => kw.toLowerCase().includes(q)) || s.symbol === q);

  const out = rows.slice(0, limit).map((s) => ({
    id: s.id,
    symbol: s.symbol,
    name: s.name,
    category: s.category,
    unicode: s.unicode,
    html: s.html,
    css: s.css,
    keywords: s.keywords,
  }));

  return apiJson({ count: out.length, total: rows.length, results: out });
}
