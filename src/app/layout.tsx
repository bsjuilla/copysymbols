import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import NavClient from "@/components/NavClient";

// Google AdSense publisher ID (public — also appears in the loader URL).
const ADSENSE_CLIENT = "ca-pub-5637152198888305";

// Next 16 moved themeColor out of the metadata export into a dedicated
// viewport export (see node_modules/next/dist/docs/.../generate-viewport.md).
// Keeping it in metadata emits an "Unsupported metadata themeColor" build
// warning on every page render.
export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: {
    default: "CopyChars — Copy & Paste Special Characters, Symbols & Emoji",
    template: "%s | CopyChars",
  },
  description:
    "Instantly copy and paste 3000+ special characters, symbols, arrows, currency signs, Greek letters, emoji, and kaomoji. One click to copy — works everywhere.",
  keywords: ["copy paste symbols","special characters","emoji copy","arrow symbols","currency symbols","greek letters","kaomoji"],
  openGraph: { type: "website", siteName: "CopyChars", locale: "en_US" },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "CopyChars" },
  verification: { google: "yGoLQmu-h_wGHF5PgU0E5PrwzAav803ZRkX2x0XWmLw" },
  // NOTE: do NOT set alternates.canonical here. A root-level canonical is
  // inherited by every child route that doesn't override it, causing every
  // page to advertise the homepage as its canonical (Google then de-dupes
  // them all into the homepage). Each page.tsx must declare its own
  // canonical via `canonical("/its-path")` from "@/lib/canonical".
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.copychars.com/#website",
      url: "https://www.copychars.com",
      name: "CopyChars",
      description: "Copy and paste 3000+ special characters, symbols, arrows, currency signs, Greek letters, emoji, and kaomoji.",
      publisher: { "@id": "https://www.copychars.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.copychars.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.copychars.com/#organization",
      name: "CopyChars",
      url: "https://www.copychars.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.copychars.com/favicon.svg",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Google AdSense loader (next/script, root layout = loads on every
            route exactly once). Required for site verification + ad serving. */}
        <Script
          id="adsbygoogle-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <header style={{ borderBottom: "1px solid var(--border)", background: "rgba(10,10,15,0.88)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
          <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.02em" }}>✦ CopyChars</span>
            </Link>
            <NavClient />
          </nav>
        </header>
        <main style={{ minHeight: "calc(100vh - 56px)" }}>{children}</main>
        <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", marginTop: 64 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
            <div>
              <span className="font-display" style={{ fontWeight: 700, color: "var(--accent)", fontSize: 15 }}>✦ CopyChars</span>
              <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>3000+ symbols, one click away.</p>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["symbols","emoji","kaomoji","flags","aesthetic","text-art"].map(p => (
                <Link key={p} href={`/${p}`} className="nav-link" style={{ fontSize: 13, textTransform: "capitalize" }}>{p.replace("-"," ")}</Link>
              ))}
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <Link href="/privacy" className="nav-link" style={{ fontSize: 13 }}>Privacy</Link>
              <Link href="/terms" className="nav-link" style={{ fontSize: 13 }}>Terms</Link>
              <Link href="/cookies" className="nav-link" style={{ fontSize: 13 }}>Cookies</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
