import { generateUsernames, ALL_VIBES, type VibeFilter } from "@/lib/username-generate";
import { apiJson, apiError, preflight, gate, params, clampInt } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/username?name=luna&vibe=aesthetic&count=24
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  const p = params(request);
  const name = p.get("name");
  const vibe = (p.get("vibe") ?? "all").toLowerCase() as VibeFilter;
  const count = clampInt(p.get("count"), 24, 1, 50);

  if (!name) return apiError(400, "Missing required query parameter: name", "bad_request");
  if (name.length > 40) return apiError(400, "name must be 40 characters or fewer", "bad_request");
  if (!ALL_VIBES.includes(vibe)) {
    return apiError(400, `Unknown vibe "${vibe}". Valid vibes: ${ALL_VIBES.join(", ")}.`, "bad_request");
  }

  // Results are randomly sampled per request — never cache.
  const results = generateUsernames(name, vibe, count);
  return apiJson({ name, vibe, count: results.length, results }, { cache: "no-store" });
}
