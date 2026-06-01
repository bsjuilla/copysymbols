import type { NextConfig } from "next";

// Content-Security-Policy.
// 'unsafe-inline' on script-src is unavoidable: Next.js injects inline runtime
// scripts and we render JSON-LD as inline <script type="application/ld+json">.
// Other directives (img, frame-ancestors, object) still provide meaningful
// protection.
//
// connect-src: 'self' plus the Supabase project origin (env-gated) so the
// community-combos UGC feature can submit/read over the Supabase REST API.
// If NEXT_PUBLIC_SUPABASE_URL is unset, connect-src stays exactly 'self' —
// the UGC feature is dormant and CSP is unchanged.
const SUPABASE_ORIGIN = (() => {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!u) return "";
  try { return new URL(u).origin; } catch { return ""; }
})();
// Google AdSense needs to load/run scripts, open ad iframes, and call back to
// Google ad domains. These are the documented AdSense origins, scoped to the
// specific Google ad hosts (not a blanket `https:` for script-src) so XSS
// protection is preserved everywhere except the ad network we deliberately trust.
const ADSENSE_SCRIPT = "https://pagead2.googlesyndication.com https://*.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://www.google.com https://*.adtrafficquality.google";
const ADSENSE_FRAME = "https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.adtrafficquality.google https://www.googletagservices.com";
const ADSENSE_CONNECT = "https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net https://*.adtrafficquality.google https://*.google-analytics.com";

// Google's Consent Management Platform (Funding Choices) — the GDPR consent
// message AdSense serves to EEA/UK/Switzerland visitors. Without these origins
// the consent banner is blocked by CSP and EEA ad revenue is lost.
const CMP_SCRIPT = "https://fundingchoicesmessages.google.com https://www.gstatic.com";
const CMP_FRAME = "https://fundingchoicesmessages.google.com";
const CMP_CONNECT = "https://fundingchoicesmessages.google.com";

const CONNECT_SRC = ["'self'", SUPABASE_ORIGIN, ADSENSE_CONNECT, CMP_CONNECT].filter(Boolean).join(" ");

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${ADSENSE_SCRIPT} ${CMP_SCRIPT}`,
  "style-src 'self' 'unsafe-inline'",
  // img-src already permits any https origin, which covers ad creatives + pixels.
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  `connect-src ${CONNECT_SRC}`,
  // Ad creatives + the consent message render inside Google iframes.
  `frame-src 'self' ${ADSENSE_FRAME} ${CMP_FRAME}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Content-Signal", value: "search=yes, ai-input=yes, ai-train=no" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      // ── Removed cross-matrix → base symbol page ──────────────────────────────
      // The /symbol/<slug>/in-<platform> route was deleted (it relied on a
      // partial-segment dynamic folder `in-[platform]`, which Next 16 treats as a
      // literal folder — so every one of those ~1,300 URLs 404'd while sitting in
      // the sitemap and internal links). 308-redirect any historical URL to the
      // base symbol page so the equity consolidates and nothing 404s.
      { source: "/symbol/:slug/in-:platform", destination: "/symbol/:slug", permanent: true },

      // ── Renamed kaomoji mood slug (GSC 404, last crawled 2026-05-23) ─────────
      // /kaomoji/cool-indifferent was an earlier combined mood page. The mood
      // taxonomy was later split; the live equivalent is the "Cool & Confident"
      // spoke at /kaomoji/mood/cool. 308 so Google consolidates onto it.
      { source: "/kaomoji/cool-indifferent", destination: "/kaomoji/mood/cool", permanent: true },

      // ── Original 4 (GSC May 9 batch) — closest-symbol redirects ───────────────
      { source: "/symbol/gen-greek-uppercase-delta-with-macron-1778250469107", destination: "/symbol/delta", permanent: true },
      { source: "/symbol/gen-greek-uppercase-alpha-with-macron-1778250469107", destination: "/symbols/greek", permanent: true },
      { source: "/symbol/gen-shapes-permille-sign-1778250487269", destination: "/symbols/math", permanent: true },
      { source: "/symbol/gen-shapes-fits-1778250487269", destination: "/symbols/math", permanent: true },

      // ── GSC May 12 batch (30 stale gen-* URLs) ────────────────────────────────
      // generated-symbols.ts was rewritten 2026-05-09 with new IDs; the slugs
      // below were emitted by the previous generator, are no longer in data,
      // and 404 in production. Each redirects to its category index so Google
      // sees a 301 (drop the 404 from index) and inbound link equity lands on
      // a topical page instead of evaporating.

      // Weather & Nature
      { source: "/symbol/gen-weather-waning-gibbous-moon-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-rose-1777060278274", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-foggy-weather-1777060278274", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-sunflower-1777060278274", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-thermometer-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-cloud-with-rain-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-globe-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-full-moon-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-sun-behind-clouds-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-waning-crescent-moon-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-galaxy-1776974700561", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-tree-1777060278274", destination: "/symbols/weather", permanent: true },
      { source: "/symbol/gen-weather-cherry-blossom-1777060278274", destination: "/symbols/weather", permanent: true },

      // Legal & Trade
      { source: "/symbol/gen-legal-file-cabinet-1777368394176", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-chart-increasing-1777368394176", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-roman-numeral-10-1778250478808", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-2-of-10-vertical-forms-for-various-technical-use-and-female-sign-1778250478808", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-document-1777368394176", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-double-vertical-line-1777368394176", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-triple-reference-mark-used-as-a-legal-symbol-1777407285677", destination: "/symbols/legal", permanent: true },
      { source: "/symbol/gen-legal-double-reference-mark-used-as-a-legal-symbol-1777407285677", destination: "/symbols/legal", permanent: true },

      // Currency
      { source: "/symbol/gen-currency-mauritius-rupee-1777191472606", destination: "/symbols/currency", permanent: true },
      { source: "/symbol/gen-currency-bangladeshi-taka-1777191472606", destination: "/symbols/currency", permanent: true },
      { source: "/symbol/gen-currency-pakistani-rupee-sign-variant-1777191472606", destination: "/symbols/currency", permanent: true },
      { source: "/symbol/gen-currency-qatari-rial-note-variant-1777191472606", destination: "/symbols/currency", permanent: true },

      // Arrows
      { source: "/symbol/gen-arrows-counterclockwise-arrows-button-1777232687086", destination: "/symbols/arrows", permanent: true },
      { source: "/symbol/gen-arrows-right-pointing-index-1777232687086", destination: "/symbols/arrows", permanent: true },
      { source: "/symbol/gen-arrows-double-horizontal-line-with-up-and-down-arrowheads-1777211813913", destination: "/symbols/arrows", permanent: true },

      // Math / Shapes / Greek / Technical
      { source: "/symbol/gen-math-natural-numbers-1777232703471", destination: "/symbols/math", permanent: true },
      { source: "/symbol/gen-shapes-input-symbol-for-numbers-2-1777060271800", destination: "/symbols/shapes", permanent: true },
      { source: "/symbol/gen-greek-lowercase-delta-with-dot-1778250469107", destination: "/symbol/delta", permanent: true },
      { source: "/symbol/gen-technical-exclamation-mark-with-dot-above-1778184785744", destination: "/symbols/technical", permanent: true },

      // Renamed/dropped slugs Google still has cached
      { source: "/symbol/pi-lower", destination: "/symbol/pi", permanent: true },
      { source: "/symbol/zero-width", destination: "/symbols/technical", permanent: true },

      // Misleading gen-zodiac-* slugs — id text didn't match the glyph/name
      // (e.g. id said "uranus" but the symbol was Saturn). The 5 data entries
      // were renamed with a "-v2" suffix to fix the mislabeling.
      //
      // These 301s now point to the indexable /symbols/zodiac hub rather than
      // the corrected gen-zodiac-*-v2 detail pages. Reason: every gen-* detail
      // page emits robots:{index:false} (symbol/[slug]/page.tsx), so a 301 to a
      // -v2 slug pushed inbound link equity straight into a noindex'd page where
      // it's absorbed, not passed on (ruflo audit 2026-05-29, P2). Redirecting
      // to the category hub preserves the equity AND matches how every other
      // stale gen-zodiac-* slug is already handled by staleGenRedirect().
      { source: "/symbol/gen-zodiac-uranus-1777453978473", destination: "/symbols/zodiac", permanent: true },
      { source: "/symbol/gen-zodiac-mars-symbol-1777710194996", destination: "/symbols/zodiac", permanent: true },
      { source: "/symbol/gen-zodiac-jupiter-symbol-1777710194996", destination: "/symbols/zodiac", permanent: true },
      { source: "/symbol/gen-zodiac-saturn-symbol-1777710194996", destination: "/symbols/zodiac", permanent: true },
      { source: "/symbol/gen-zodiac-venus-symbol-1777710194996", destination: "/symbols/zodiac", permanent: true },
    ];
  },
};

export default nextConfig;
