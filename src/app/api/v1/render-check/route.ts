import { renderSafety } from "@/lib/render-safety";
import { apiJson, apiError, preflight, gate, params, codepoints } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

function graphemes(input: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(input), (s) => s.segment);
  }
  return Array.from(input);
}

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/render-check?text=𝖋𝖗𝖆𝖐  — per-character will-it-render verdict per platform
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  const p = params(request);
  const text = p.get("text");
  if (!text) return apiError(400, "Missing required query parameter: text", "bad_request");
  if (text.length > 200) return apiError(400, "text must be 200 characters or fewer", "bad_request");

  const characters = graphemes(text)
    .filter((g) => g.trim().length > 0)
    .map((g) => {
      const safety = renderSafety(g);
      return {
        grapheme: g,
        codepoints: codepoints(g),
        platforms: safety.byPlatform,
        reason: safety.reason,
        safer: safety.safer ?? null,
      };
    });

  return apiJson({ input: text, count: characters.length, characters });
}
