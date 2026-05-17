import { emoji } from "@/data/emoji";

export const dynamic = "force-static";

const GENERATED_AT = new Date().toISOString();

export async function GET() {
  const body = JSON.stringify({
    version: "1.0",
    generatedAt: GENERATED_AT,
    emoji,
  });
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
