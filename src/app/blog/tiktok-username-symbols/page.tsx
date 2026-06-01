import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

const TITLE = "Best Symbols for TikTok Usernames and Bios — Copy & Paste";
const DESCRIPTION = "The symbols that actually work in a TikTok username and bio, how to add them, and what TikTok blocks. Copy-paste aesthetic symbols and fancy fonts for your @ and profile.";
const SLUG = "tiktok-username-symbols";
const PUBLISHED = "2026-06-01T00:00:00Z";
const MODIFIED = "2026-06-01T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "tiktok username symbols",
    "tiktok bio symbols",
    "symbols for tiktok",
    "tiktok name fonts",
    "aesthetic tiktok username",
    "tiktok symbols copy paste",
  ],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED.slice(0, 10),
  dateModified: MODIFIED.slice(0, 10),
  author: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  publisher: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  mainEntityOfPage: `https://www.copychars.com/blog/${SLUG}`,
};

const bioSymbols = [
  { symbol: "✿", name: "Flower" },
  { symbol: "✦", name: "Sparkle star" },
  { symbol: "♡", name: "Outline heart" },
  { symbol: "❀", name: "Blossom" },
  { symbol: "⊹", name: "Tiny cross" },
  { symbol: "⋆", name: "Small star" },
  { symbol: "❥", name: "Heart bullet" },
  { symbol: "✧", name: "Hollow sparkle" },
];

const dividers = [
  { symbol: "·  ·  ·", name: "Dot spacer" },
  { symbol: "❀ ｡˚", name: "Flower dust" },
  { symbol: "✦ ⋆ ｡", name: "Star dust" },
  { symbol: "─ ⋆ ─", name: "Line star" },
];

export default function TikTokUsernameSymbols() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          Best Symbols for TikTok Usernames and Bios
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>
          TikTok has two name fields and they follow different rules. Knowing which is which saves a lot of frustration when a symbol you paste suddenly disappears. This guide covers what works in each, gives you copy-paste symbols and fonts, and explains the limits TikTok actually enforces.
        </p>

        <h2 style={sectionH2}>Username vs nickname — they&apos;re different</h2>
        <p style={para}>
          Your <strong>username</strong> is the @handle people use to find and tag you. TikTok restricts it to lowercase letters, numbers, underscores, and periods, so fancy symbols and fonts will not save there. Your <strong>nickname</strong> is the bigger display name above it, and that field is far more relaxed — it accepts most Unicode symbols and styled fonts. When people talk about a &ldquo;symbol username&rdquo; on TikTok, they almost always mean the nickname.
        </p>

        <h2 style={sectionH2}>Symbols for your nickname and bio</h2>
        <p style={para}>
          These render reliably on phones, which is where nearly all of TikTok is viewed. Tap to copy, then paste into your nickname or bio.
        </p>
        <CopySymbolGrid items={bioSymbols} columns="repeat(auto-fill, minmax(150px, 1fr))" />

        <h2 style={sectionH2}>Style your nickname with a font</h2>
        <p style={para}>
          A styled nickname is just your name pasted in characters from a different Unicode block. Type your name into the <Link href="/fancy-text" style={inlineLink}>Fancy Text Generator</Link>, pick a look, and paste the result into the nickname field. Stick to one font — a clean cursive or bold reads as styled, while three mixed fonts read as messy. For full name ideas, the <Link href="/username-generator" style={inlineLink}>Username Generator</Link> builds styled variants from any word.
        </p>

        <h2 style={sectionH2}>Dividers and spacers for your bio</h2>
        <p style={para}>
          TikTok bios are short, so a small spacer between sections does more than a long divider. Drop one of these on its own line:
        </p>
        <CopySymbolGrid items={dividers} columns="repeat(auto-fill, minmax(120px, 1fr))" />

        <h2 style={sectionH2}>What TikTok blocks (and how to avoid surprises)</h2>
        <ul style={{ paddingLeft: 20, margin: "0 0 24px" }}>
          <li style={liStyle}><strong>Symbols vanish from the @handle.</strong> That field strips anything that is not a letter, number, underscore, or period. Style the nickname instead.</li>
          <li style={liStyle}><strong>Some characters show as boxes.</strong> Very rare Unicode blocks are not in every phone&apos;s fonts. Test anything unusual with the <Link href="/render-test" style={inlineLink}>Render Test</Link> before you save it.</li>
          <li style={liStyle}><strong>Fancy fonts hurt searchability.</strong> If your nickname is in heavy script, people may struggle to find or mention you. Keep at least your @handle in normal letters.</li>
        </ul>

        <p style={{ ...para, marginBottom: 32 }}>
          The short version: keep your @handle simple, and put your symbols and font into the nickname and bio. Start from the pieces above and keep it to two or three accents so it reads clean on a small screen.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/symbols-for/tiktok" className="cat-pill">Symbols for TikTok</Link>
          <Link href="/fancy-text" className="cat-pill">Fancy Text</Link>
          <Link href="/username-generator" className="cat-pill">Username Generator</Link>
          <Link href="/aesthetic" className="cat-pill">Aesthetic Symbols</Link>
          <Link href="/blog/aesthetic-instagram-bio" className="cat-pill">Aesthetic Bio Guide</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const liStyle: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 };
const inlineLink: React.CSSProperties = { color: "var(--accent)", textDecoration: "none", fontWeight: 600 };
