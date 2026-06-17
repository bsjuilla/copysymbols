// Shared helpers for the public JSON API (src/app/api/v1/*). Keeps every
// endpoint's auth, CORS, caching and error shape identical.

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-RapidAPI-Proxy-Secret, X-RapidAPI-Key",
};

// Deterministic endpoints may be CDN-cached; random/auth ones must not.
const CACHE_DEFAULT = "public, max-age=0, s-maxage=600, stale-while-revalidate=86400";

export function apiJson(body: unknown, opts: { status?: number; cache?: string } = {}): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status: opts.status ?? 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": opts.cache ?? CACHE_DEFAULT,
      ...CORS,
    },
  });
}

function codeFor(status: number): string {
  return status === 400 ? "bad_request"
    : status === 401 ? "unauthorized"
    : status === 404 ? "not_found"
    : status === 429 ? "rate_limited"
    : "error";
}

export function apiError(status: number, message: string, code?: string): Response {
  return apiJson({ error: { status, code: code ?? codeFor(status), message } }, { status, cache: "no-store" });
}

/** CORS preflight response for OPTIONS. */
export function preflight(): Response {
  return new Response(null, { status: 204, headers: CORS });
}

/**
 * Access gate. When RAPIDAPI_PROXY_SECRET is set (production monetization via
 * RapidAPI), only requests carrying the matching X-RapidAPI-Proxy-Secret header
 * — i.e. forwarded by RapidAPI from a paying subscriber — are served. When the
 * env var is UNSET, the API is open (local dev + soft public launch). Returns an
 * error Response to reject, or null to allow.
 */
export function gate(request: Request): Response | null {
  const secret = process.env.RAPIDAPI_PROXY_SECRET;
  if (!secret) return null;
  if (request.headers.get("x-rapidapi-proxy-secret") === secret) return null;
  return apiError(
    401,
    "This API is served through RapidAPI. Subscribe at https://rapidapi.com (search CopyChars) to get an access key.",
    "unauthorized",
  );
}

export function params(request: Request): URLSearchParams {
  return new URL(request.url).searchParams;
}

export function clampInt(raw: string | null, def: number, min: number, max: number): number {
  const n = parseInt(raw ?? "", 10);
  if (Number.isNaN(n)) return def;
  return Math.max(min, Math.min(max, n));
}

/** "U+1F600 U+200D …" style codepoint list for a glyph. */
export function codepoints(glyph: string): string[] {
  return Array.from(glyph).map((c) => "U+" + (c.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0"));
}
