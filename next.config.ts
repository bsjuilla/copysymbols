import type { NextConfig } from "next";

// Content-Security-Policy.
// 'unsafe-inline' on script-src is unavoidable: Next.js injects inline runtime
// scripts and we render JSON-LD as inline <script type="application/ld+json">.
// For a static-export site with no user input, this is acceptable — there's
// no path for an attacker to inject runtime scripts. Other directives (img,
// frame-ancestors, object) still provide meaningful protection.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
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
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      // ── Original 4 (GSC May 9 batch) — closest-symbol redirects ───────────────
      { source: "/symbol/gen-greek-uppercase-delta-with-macron-1778250469107", destination: "/symbol/delta", permanent: true },
      { source: "/symbol/gen-greek-uppercase-alpha-with-macron-1778250469107", destination: "/symbol/gen-greek-alpha-1777389154567", permanent: true },
      { source: "/symbol/gen-shapes-permille-sign-1778250487269", destination: "/symbol/gen-math-2030", permanent: true },
      { source: "/symbol/gen-shapes-fits-1778250487269", destination: "/symbol/gen-math-2031", permanent: true },

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
    ];
  },
};

export default nextConfig;
