import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

const TITLE = "How to Make an Aesthetic Instagram Bio — Symbols, Fonts & Layout";
const DESCRIPTION = "A step-by-step guide to building an aesthetic Instagram bio: copy-paste dividers and symbols, fancy fonts for your name, spacing tricks, and layout examples that actually render.";
const SLUG = "aesthetic-instagram-bio";
const PUBLISHED = "2026-06-01T00:00:00Z";
const MODIFIED = "2026-06-01T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "aesthetic instagram bio",
    "instagram bio symbols",
    "cute instagram bio",
    "instagram bio fonts",
    "aesthetic bio copy paste",
    "instagram bio ideas",
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

const dividers = [
  { symbol: "─────────────", name: "Thin line" },
  { symbol: "˚｡⋆୧ ⋆｡˚", name: "Sparkle break" },
  { symbol: "⋆˚࿔ ⋆˚࿔", name: "Star trail" },
  { symbol: "✧･ﾟ: *✧･ﾟ:*", name: "Twinkle" },
  { symbol: "꒰ ꒱ ꒰ ꒱", name: "Soft brackets" },
  { symbol: "·˚ ༘ ೀ⋆｡˚", name: "Petal line" },
];

const bioSymbols = [
  { symbol: "✿", name: "Flower", use: "Hobbies, soft themes" },
  { symbol: "✦", name: "Sparkle star", use: "Section markers" },
  { symbol: "❀", name: "Blossom", use: "Cute accents" },
  { symbol: "♡", name: "Outline heart", use: "Relationships, likes" },
  { symbol: "☾", name: "Crescent moon", use: "Dreamy / night themes" },
  { symbol: "⋆", name: "Small star", use: "Spacing between words" },
  { symbol: "❥", name: "Heart bullet", use: "Relationships, likes" },
  { symbol: "✧", name: "Hollow sparkle", use: "Minimal accents" },
];

export default function AestheticInstagramBio() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          How to Make an Aesthetic Instagram Bio
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>
          An aesthetic Instagram bio is mostly three things working together: a styled name, a few well-chosen symbols, and clean spacing. Instagram has no built-in formatting, so every &ldquo;font&rdquo; and divider you see is really a Unicode character pasted in. This guide walks through each part and gives you copy-paste pieces that render correctly on phones, not just on desktop.
        </p>

        <h2 style={sectionH2}>1. Style your name with a Unicode font</h2>
        <p style={para}>
          The display name at the top of your profile is the first thing people read, so it carries the most weight. You can&apos;t change the font inside Instagram, but you can paste in characters from a different Unicode block that <em>look</em> like a cursive, bold, or bubble font. Type your name into the <Link href="/fancy-text" style={inlineLink}>Fancy Text Generator</Link>, pick a style, and copy the result into the Name field under Edit Profile.
        </p>
        <p style={para}>
          A few tips that save you trouble later: keep your <strong>username (handle)</strong> in normal letters so people can tag and search you, and only style the <strong>display name</strong>. Pick one font and stick with it — mixing three different styles reads as cluttered rather than aesthetic. If you want ideas for a whole name, the <Link href="/username-generator" style={inlineLink}>Username Generator</Link> builds styled name variants from any word.
        </p>

        <h2 style={sectionH2}>2. Add dividers between sections</h2>
        <p style={para}>
          Dividers turn a wall of text into something scannable. Tap one below to copy it, then paste it on its own line between the parts of your bio (for example, between your tagline and your link line).
        </p>
        <CopySymbolGrid items={dividers} columns="repeat(auto-fill, minmax(150px, 1fr))" />

        <h2 style={sectionH2}>3. Sprinkle in a few symbols</h2>
        <p style={para}>
          Symbols give a bio personality, but restraint matters: two or three that match your theme look intentional, while ten look like spam. Pick ones that say something about you — a paw for a pet account, a moon for a dreamy aesthetic, a flower for a soft theme.
        </p>
        <CopySymbolGrid items={bioSymbols} columns="repeat(auto-fill, minmax(160px, 1fr))" />
        <p style={para}>
          Want more options? Browse the full <Link href="/aesthetic" style={inlineLink}>aesthetic symbol sets</Link> sorted by vibe, or grab ready-made layouts from <Link href="/bio-templates" style={inlineLink}>Bio Templates</Link>.
        </p>

        <h2 style={sectionH2}>4. Structure: a layout that works</h2>
        <p style={para}>
          Instagram bios allow line breaks if you add them in the app (or paste a bio that already contains them). A reliable four-line structure:
        </p>
        <ol style={{ paddingLeft: 20, margin: "0 0 16px" }}>
          {[
            "Line 1 — who you are or your vibe (e.g. ✿ digital artist ✿).",
            "Line 2 — a short detail or location.",
            "A divider line on its own.",
            "Line 4 — your call to action, pointing at the link.",
          ].map((s, i) => (
            <li key={i} style={liStyle}>{s}</li>
          ))}
        </ol>
        <p style={para}>
          Keep each line short. Bios are read on a narrow phone screen, and a line that wraps awkwardly breaks the clean look you&apos;re going for.
        </p>

        <h2 style={sectionH2}>5. How to apply it</h2>
        <ol style={{ paddingLeft: 20, margin: "0 0 24px" }}>
          {[
            "Copy your styled name, dividers, and symbols using the buttons above.",
            "Open Instagram and tap Edit Profile.",
            "Paste your name into the Name field and your bio into the Bio field.",
            "Add line breaks by tapping Enter where you want them.",
            "Tap Done and check it on your live profile — not just the edit screen.",
          ].map((s, i) => (
            <li key={i} style={liStyle}>{s}</li>
          ))}
        </ol>

        <h2 style={sectionH2}>Common mistakes to avoid</h2>
        <ul style={{ paddingLeft: 20, margin: "0 0 24px" }}>
          <li style={liStyle}><strong>Symbols that show as boxes.</strong> Some rare characters don&apos;t exist in the fonts on every phone. Test anything unusual with the <Link href="/render-test" style={inlineLink}>Render Test</Link> before you commit to it.</li>
          <li style={liStyle}><strong>Styling your handle.</strong> A fancy-font username can&apos;t always be searched or tagged. Style the display name instead.</li>
          <li style={liStyle}><strong>Overloading it.</strong> If every word has a symbol, the eye has nowhere to rest. Less is genuinely more here.</li>
        </ul>

        <p style={{ ...para, marginBottom: 32 }}>
          That&apos;s the whole formula: one font for your name, a divider or two, a couple of on-theme symbols, and tight spacing. Start from the pieces above and adjust until it feels like you.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/aesthetic" className="cat-pill">Aesthetic Symbols</Link>
          <Link href="/bio-templates" className="cat-pill">Bio Templates</Link>
          <Link href="/fancy-text" className="cat-pill">Fancy Text</Link>
          <Link href="/symbols-for/instagram" className="cat-pill">Instagram Symbols</Link>
          <Link href="/borders" className="cat-pill">Dividers &amp; Borders</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const liStyle: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 };
const inlineLink: React.CSSProperties = { color: "var(--accent)", textDecoration: "none", fontWeight: 600 };
