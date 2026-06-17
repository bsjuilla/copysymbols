import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import NavClient from "@/components/NavClient";

// Google AdSense publisher ID (public — also appears in the loader URL).
const ADSENSE_CLIENT = "ca-pub-5652501264934418";

// Google Consent Mode v2 default state. Runs as a synchronous inline script
// BEFORE the async AdSense loader, so the page is compliant-by-default: in the
// EEA, UK and Switzerland every consent signal starts 'denied' until the user
// acts on Google's certified CMP (the GDPR message created in AdSense →
// Privacy & messaging), which then calls gtag('consent','update',…). Scoped to
// `region` so non-EEA traffic (US, India, etc.) keeps full personalized ads —
// they get no banner and no legal denied-default. `ads_data_redaction` strips
// ad identifiers while consent is denied. CSP already allows inline scripts
// ('unsafe-inline') and the Funding Choices CMP origins (see next.config.ts).
const EEA_UK_CH = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"];
const CONSENT_MODE_DEFAULT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(EEA_UK_CH)}});gtag('set','ads_data_redaction',true);`;

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
  // Google AdSense site-ownership meta tag (modern AdSense's primary verification
  // signal). Renders <meta name="google-adsense-account" content="ca-pub-..."> in
  // <head>, server-side and guaranteed crawlable.
  other: { "google-adsense-account": ADSENSE_CLIENT },
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
        {/* Fonts: preconnect + stylesheet, moved out of the globals.css @import
            (which was render-blocking and discovered late). React 19 hoists these
            into <head>; `precedence` makes the stylesheet a managed head resource.
            Identical families/weights — purely a critical-path speedup. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap"
        />
        {/* Consent Mode v2 default. A PLAIN synchronous inline <script>: it runs
            at parse time, the instant the parser reaches it — which is before the
            adsbygoogle.js below (it's `async`, so it only executes once downloaded,
            tens to hundreds of ms later). React 19 hoists the async ad tag into
            <head> and leaves this in <body>, so HTML position has them reversed,
            but EXECUTION order is consent-first (sync-now beats async-later). We do
            NOT route either through next/script — beforeInteractive defers this one
            and the ad tag must stay a raw, crawler-visible <script> for AdSense.
            The load-bearing GDPR compliance is Google's certified CMP (the Funding
            Choices "GDPR message" created in AdSense → Privacy & messaging, served
            via the ad tag, TCF v2.2); this snippet is the compliant-by-default
            Consent Mode layer the CMP then updates. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_MODE_DEFAULT }} />
        {/* Google AdSense loader as a RAW <script> (not next/script). next/script
            only emitted a <link rel=preload> + a JS-injected tag, which AdSense's
            crawler — reading raw HTML without running our JS — could not see, so
            verification failed. React 19 hoists this async script into <head> and
            renders it as a real tag in the server HTML. Paired with the
            google-adsense-account meta tag (metadata.other below) for verification.
            It also auto-renders the Funding Choices GDPR consent message for EEA
            visitors once that message is published in AdSense → Privacy & messaging. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
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
              <Link href="/about" className="nav-link" style={{ fontSize: 13 }}>About</Link>
              <Link href="/developers" className="nav-link" style={{ fontSize: 13 }}>API</Link>
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
