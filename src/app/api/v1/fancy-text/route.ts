import { STYLES, findStyle } from "@/lib/fancy-text-styles";
import { apiJson, apiError, preflight, gate, params } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

// GET /api/v1/fancy-text?text=hello&style=bold-script   (style=all for every style)
export async function GET(request: Request) {
  const denied = gate(request);
  if (denied) return denied;

  const p = params(request);
  const text = p.get("text");
  const style = (p.get("style") ?? "all").toLowerCase();

  if (!text) return apiError(400, "Missing required query parameter: text", "bad_request");
  if (text.length > 200) return apiError(400, "text must be 200 characters or fewer", "bad_request");

  const styles = style === "all" ? STYLES : (findStyle(style) ? [findStyle(style)!] : []);
  if (styles.length === 0) {
    return apiError(404, `Unknown style "${style}". Use style=all or one of the slugs from /api/v1/meta.`, "not_found");
  }

  return apiJson({
    input: text,
    count: styles.length,
    results: styles.map((s) => ({ slug: s.slug, label: s.label, group: s.group, output: s.transform(text) })),
  });
}
