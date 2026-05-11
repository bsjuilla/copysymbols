import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Stale /symbol/<id> URLs Google indexed before generated-symbols.ts was
      // regenerated (2026-05-09 batch). These IDs no longer exist in data and
      // 404 in production. Redirect to the closest equivalent so any inbound
      // link equity is preserved and GSC stops reporting them.
      { source: "/symbol/gen-greek-uppercase-delta-with-macron-1778250469107", destination: "/symbol/delta", permanent: true },
      { source: "/symbol/gen-greek-uppercase-alpha-with-macron-1778250469107", destination: "/symbol/gen-greek-alpha-1777389154567", permanent: true },
      { source: "/symbol/gen-shapes-permille-sign-1778250487269", destination: "/symbol/gen-math-2030", permanent: true },
      { source: "/symbol/gen-shapes-fits-1778250487269", destination: "/symbol/gen-math-2031", permanent: true },
    ];
  },
};

export default nextConfig;
