import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

const TITLE = "Bullet Point Symbols • Copy & Paste — All Bullet Characters";
const DESCRIPTION = "Copy bullet point symbols instantly. Round, square, arrow, and hollow bullets for lists, bios, and documents. Keyboard shortcuts included.";
const SLUG = "bullet-point-copy-paste";
const PUBLISHED = "2026-03-01T00:00:00Z";
const MODIFIED = "2026-05-09T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 28, fontSize: 13, color: "var(--text3)" }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
        <span>&#x203A;</span>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none" }}>Blog</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
        Bullet Point Symbols • Copy & Paste — All Bullet Characters
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>Copy bullet point symbols instantly. Round, square, arrow, and hollow bullets for lists, bios, and documents. Keyboard shortcuts included.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p><strong>Bullet points</strong> are essential for organising information in lists, bios, presentations, and documents. Beyond the standard round bullet &bull;, Unicode offers dozens of bullet-style symbols in different shapes.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">The Standard Bullet &bull;</h2>
<p>The <strong>bullet &bull; (U+2022)</strong> is the most universally recognised list marker. It renders consistently across all platforms, fonts, and operating systems and is the character to use for clean, professional lists.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Bullet Variants</h2>
<ul style="padding-left:1.5rem;margin-bottom:1rem">
<li style="margin-bottom:0.5rem"><strong>&#9679; (U+25CF)</strong> &mdash; Large filled circle. Bolder than &bull;, good for emphasis.</li>
<li style="margin-bottom:0.5rem"><strong>&#9675; (U+25CB)</strong> &mdash; Large hollow circle. Good for sub-bullets or open items.</li>
<li style="margin-bottom:0.5rem"><strong>&#9702; (U+25E6)</strong> &mdash; White bullet. Smaller hollow circle for nested lists.</li>
<li style="margin-bottom:0.5rem"><strong>&#9642; (U+25AA)</strong> &mdash; Small black square. Formal and structured feel.</li>
<li style="margin-bottom:0.5rem"><strong>&#9656; (U+25B8)</strong> &mdash; Right-pointing triangle. A &ldquo;play&rdquo;-style bullet.</li>
<li style="margin-bottom:0.5rem"><strong>&#9830; (U+25C6)</strong> &mdash; Black diamond. Elegant and decorative.</li>
<li style="margin-bottom:0.5rem"><strong>&#8250; (U+203A)</strong> &mdash; Angle quotation mark used as a chevron bullet.</li>
</ul>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Bullets for Instagram Bios</h2>
<p>&#9702; for soft/minimal &bull; &#9656; for forward-looking &bull; &#10022; for sparkle/aesthetic &bull; &bull; for clean professional. Pick one style and use it consistently throughout your bio.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">How to Type &bull; on Any Device</h2>
<p><strong>Windows:</strong> Alt+7 or Alt+0149. <strong>Mac:</strong> Option+8. <strong>HTML:</strong> &amp;bull; or &amp;#8226;.</p>` }} />
    </div>
    </>
  );
}
