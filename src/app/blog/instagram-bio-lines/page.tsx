import type { Metadata } from "next";
import Link from "next/link";
import CopyToast from "@/components/CopyToast";
import BioLineItem from "./BioLineItem";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "How to Make a Line in Instagram Bio — Dividers Copy & Paste";
const DESCRIPTION = "Copy and paste aesthetic lines and dividers for your Instagram bio. Click any line to copy it instantly.";
const SLUG = "instagram-bio-lines";
const PUBLISHED = "2026-03-01T00:00:00Z";
const MODIFIED = "2026-05-09T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["instagram bio line","instagram bio divider","aesthetic line copy paste"],
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

const lines = [
  { s: "────────────────────", n: "Thin line" },
  { s: "════════════════════", n: "Double line" },
  { s: "━━━━━━━━━━━━━━━━━━━━", n: "Thick line" },
  { s: "꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷", n: "Cute wave" },
  { s: "ꕤ───────────────ꕤ", n: "Flower ends" },
  { s: "⊱────────────────⊱", n: "Ornament line" },
  { s: "〰〰〰〰〰〰〰〰〰〰", n: "Wavy" },
];

export default function BlogInstagramLines() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CopyToast />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>
          ← Blog
        </Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          How to Make a Line in Your Instagram Bio
        </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
          Instagram does not have a built-in divider feature, but Unicode line characters work perfectly in bios. Click any line below to copy it, then paste it straight into Instagram.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
          {lines.map(({ s, n }) => (
            <BioLineItem key={n} s={s} n={n} />
          ))}
        </div>
        <section style={{ marginBottom: 40, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>How to use</h2>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {[
              "Click any line above to copy it.",
              "Open Instagram and go to Edit Profile.",
              "Tap the Bio field and long-press to paste.",
              "Place the line between sections of your bio.",
              "Tap Save.",
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 6 }}>{step}</li>
            ))}
          </ol>
        </section>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/borders" className="cat-pill">All Borders</Link>
          <Link href="/bio-templates" className="cat-pill">Bio Templates</Link>
          <Link href="/symbols-for/instagram" className="cat-pill">Instagram Symbols</Link>
        </div>
      </div>
    </>
  );
}
