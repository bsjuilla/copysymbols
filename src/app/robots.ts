import { MetadataRoute } from "next";

// Block only app routes with no indexable value: /search (search results,
// also noindex), /community (empty UGC queue, noindex), /api (JSON endpoints).
//
// /_next/ is deliberately NOT blocked: every page links its stylesheet and JS
// from /_next/static/*, and Googlebot must fetch those to RENDER the page for
// its rendered-DOM index + layout/CWV signals. Blocking them made Googlebot
// render unstyled/broken pages — a real quality downgrade that fed GSC
// "Crawled - currently not indexed". The /_next/* sub-resources are never
// indexed as search results, so there is no "noise" downside to allowing them.
const SHARED_DISALLOW = ["/search", "/community", "/api"];

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
