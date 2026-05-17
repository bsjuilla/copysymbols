import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

const TITLE = "Math Symbols — Complete Unicode Mathematics Reference";
const DESCRIPTION = "Complete list of math symbols. Operators, comparison, calculus, set theory, and logic symbols with Unicode values and HTML codes.";
const SLUG = "math-symbols-list";
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
        Math Symbols — Complete Unicode Mathematics Reference
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>Complete list of math symbols. Operators, comparison, calculus, set theory, and logic symbols with Unicode values and HTML codes.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>Mathematics uses hundreds of symbols that cannot be typed on a standard keyboard. This complete reference covers every major category of mathematical notation.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Basic Operators</h2>
<p>+ &minus; &times; &divide; &mdash; plus, minus, multiply, divide.</p>
<p style="margin-top:0.5rem"><strong>&plusmn; (U+00B1)</strong> &mdash; plus or minus, used in measurement uncertainty.</p>
<p style="margin-top:0.5rem"><strong>&#8723; (U+2213)</strong> &mdash; minus or plus, the reverse of &plusmn;.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Comparison Symbols</h2>
<p>= &ne; &lt; &gt; &le; &ge; &mdash; equal, not equal, less/greater than, and their or-equal variants.</p>
<p style="margin-top:0.5rem"><strong>&asymp; (U+2248)</strong> &mdash; approximately equal, used for rounded values.</p>
<p style="margin-top:0.5rem"><strong>&equiv; (U+2261)</strong> &mdash; identical to / defined as.</p>
<p style="margin-top:0.5rem"><strong>&prop; (U+221D)</strong> &mdash; proportional to.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Calculus Symbols</h2>
<p><strong>&int; (U+222B)</strong> &mdash; integral. <strong>&part; (U+2202)</strong> &mdash; partial derivative. <strong>&nabla; (U+2207)</strong> &mdash; del/nabla operator. <strong>&infin; (U+221E)</strong> &mdash; infinity. <strong>&sum; (U+2211)</strong> &mdash; summation. <strong>&prod; (U+220F)</strong> &mdash; product.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Set Theory</h2>
<p><strong>&isin; (U+2208)</strong> element of &bull; <strong>&notin; (U+2209)</strong> not element of &bull; <strong>&sub; (U+2282)</strong> subset of &bull; <strong>&cup; (U+222A)</strong> union &bull; <strong>&cap; (U+2229)</strong> intersection &bull; <strong>&empty; (U+2205)</strong> empty set.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Logic Symbols</h2>
<p><strong>&and; (U+2227)</strong> AND &bull; <strong>&or; (U+2228)</strong> OR &bull; <strong>&not; (U+00AC)</strong> NOT &bull; <strong>&rArr; (U+21D2)</strong> implies &bull; <strong>&hArr; (U+21D4)</strong> iff &bull; <strong>&#8756; (U+2234)</strong> therefore &bull; <strong>&#8757; (U+2235)</strong> because.</p>` }} />
    </div>
    </>
  );
}
