import { MetadataRoute } from "next";

// /_next/ paths (build chunks, image-optimization, RSC) are routinely picked
// up by Googlebot and end up in GSC's "Crawled - currently not indexed"
// bucket, wasting crawl budget on assets that are never user-facing URLs.
// Disallowing them stops the noise without breaking rendering (Google does
// not need to fetch /_next/static/* to render JS-rendered pages — Next ships
// the HTML pre-rendered).
const SHARED_DISALLOW = ["/search", "/community", "/api", "/_next/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Applebot",
          "Googlebot",
          "Bingbot",
          "ChatGPT-User",
          "Claude-User",
          "Perplexity-User",
        ],
        allow: "/",
        disallow: SHARED_DISALLOW,
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "anthropic-ai",
          "cohere-ai",
          "Meta-ExternalAgent",
          "Diffbot",
        ],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: SHARED_DISALLOW,
      },
    ],
    sitemap: "https://www.copychars.com/sitemap.xml",
  };
}
