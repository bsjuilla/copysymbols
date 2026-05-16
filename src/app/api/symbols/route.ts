// Public developer API. Devs fetch this from CodePen / sandboxes — hence the
// permissive CORS header. `force-static` lets Next emit a flat JSON file in
// .next/server so it ships from the CDN with no per-request work.
import { symbols, categories } from "@/data/symbols";

export const dynamic = "force-static";

const GENERATED_AT = new Date().toISOString();

export async function GET() {
  const body = JSON.stringify({
    version: "1.0",
    generatedAt: GENERATED_AT,
    categories,
    // gen-* are auto-generated, low-quality entries that are noindex'd in the
    // site itself; exclude them from the public API for the same reason.
    symbols: symbols.filter(s => !s.id.startsWith("gen-")),
  });
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
