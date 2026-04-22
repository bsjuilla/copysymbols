import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import NavClient from "@/components/NavClient";

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
  verification: { google: "yGoLQmu-h_wGHF5PgU0E5PrwzAav803ZRkX2x0XWmLw" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <span className="font-display" style={{ fontWeight: 700, color: "var(--accent)", fontSize: 15 }}>✦ CopyChars</span>
              <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>3000+ symbols, one click away.</p>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["symbols","emoji","kaomoji","text-art"].map(p => (
                <Link key={p} href={`/${p}`} className="nav-link" style={{ fontSize: 13, textTransform: "capitalize" }}>{p.replace("-"," ")}</Link>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
