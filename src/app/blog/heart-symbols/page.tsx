import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Heart Symbols ♥ ♡ Copy & Paste — Every Heart Character";
const DESCRIPTION = "Copy heart symbols instantly. Red hearts, outline hearts, coloured hearts, and text hearts. Complete list with meanings for bios and messages.";
const SLUG = "heart-symbols";
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
        Heart Symbols ♥ ♡ Copy & Paste — Every Heart Character
      </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>Copy heart symbols instantly. Red hearts, outline hearts, coloured hearts, and text hearts. Complete list with meanings for bios and messages.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p><strong>Heart symbols</strong> are the most searched special characters worldwide. From the classic text heart &#9829; to the red emoji &#10084;&#65039;, hearts appear in billions of messages, bios, and captions every day.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Text Heart Symbols</h2>
<p>These hearts are pure text &mdash; they work everywhere, even without emoji support:</p>
<ul style="padding-left:1.5rem;margin-bottom:1rem">
<li style="margin-bottom:0.5rem"><strong>&#9829; (U+2665)</strong> &mdash; Black Heart Suit. The classic playing-card heart, solid and filled.</li>
<li style="margin-bottom:0.5rem"><strong>&#9825; (U+2661)</strong> &mdash; White Heart Suit. Outline version, often used for &ldquo;unfavourited&rdquo; state.</li>
<li style="margin-bottom:0.5rem"><strong>&#10084; (U+2764)</strong> &mdash; Heavy Black Heart. Heavier than &#9829;, used interchangeably with the emoji &#10084;&#65039;.</li>
</ul>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Coloured Heart Meanings</h2>
<p>Each colour carries distinct meaning in internet culture: &#10084;&#65039; red = love/passion &bull; &#129505; orange = friendship &bull; &#128155; yellow = happiness &bull; &#128154; green = health/nature &bull; &#128153; blue = loyalty/calm &bull; &#128156; purple = luxury/creativity &bull; &#128420; black = dark aesthetic &bull; &#129292; white = purity/minimalism.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">How to Type &#9829;</h2>
<p><strong>Windows:</strong> Alt+3 (numpad) gives &#9829;.</p>
<p style="margin-top:0.75rem"><strong>HTML:</strong> &amp;hearts; or &amp;#9829; for &#9829;.</p>` }} />
    </div>
    </>
  );
}
