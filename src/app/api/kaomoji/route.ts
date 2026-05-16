import { allKaomoji } from "@/data/all-kaomoji";

export const dynamic = "force-static";

const GENERATED_AT = new Date().toISOString();

export async function GET() {
  // Strip the slug/isDuplicate wrapper fields to keep the public shape close to
  // the curated `Kaomoji` interface; duplicates are noindex'd in-site for the
  // same reason we drop them here.
  const kaomoji = allKaomoji
    .filter(k => !k.isDuplicate)
    .map(({ slug: _slug, isDuplicate: _dup, ...k }) => k);
  const body = JSON.stringify({
    version: "1.0",
    generatedAt: GENERATED_AT,
    kaomoji,
  });
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
