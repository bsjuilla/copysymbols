import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Star Symbols ★ ☆ Copy & Paste — Every Star Character",
  description: "Copy star symbols instantly. Filled stars, outline stars, sparkle stars, and emoji stars. Complete guide with Unicode values and uses.",
};

export default function BlogPost() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 28, fontSize: 13, color: "var(--text3)" }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
        <span>&#x203A;</span>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none" }}>Blog</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
        Star Symbols ★ ☆ Copy & Paste — Every Star Character
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>Copy star symbols instantly. Filled stars, outline stars, sparkle stars, and emoji stars. Complete guide with Unicode values and uses.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p><strong>Star symbols</strong> are among the most versatile special characters. From the classic five-pointed &#9733; to decorative sparkle variants &#10022; &#10023;, stars appear in ratings, bios, bullet points, and decorative text.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Types of Star Symbols</h2>
<p><strong>&#9733; Black Star (U+2605)</strong> &mdash; The filled five-pointed star. Used in ratings (&#9733;&#9733;&#9733;&#9733;&#9734;), bullet points, and decoration.</p>
<p style="margin-top:0.75rem"><strong>&#9734; White Star (U+2606)</strong> &mdash; The outline five-pointed star. Used alongside &#9733; to show empty/unselected states.</p>
<p style="margin-top:0.75rem"><strong>&#10022; Black Four Pointed Star (U+2726)</strong> &mdash; A four-pointed diamond-like star. Popular in aesthetic bios.</p>
<p style="margin-top:0.75rem"><strong>&#10024; Sparkles (U+2728)</strong> &mdash; Three golden sparkle stars. Very popular on social media.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Stars for Instagram Bios</h2>
<p>Popular combinations: &#10022; &#10023; &#10022; as a divider, &#9733;&#24425; as a stylised star effect, &#11088; to indicate featured content, and &#10038; &#10039; &#10040; for decorative borders.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">How to Type &#9733;</h2>
<p><strong>Windows:</strong> Alt+9733 for &#9733;, Alt+9734 for &#9734;.</p>
<p style="margin-top:0.75rem"><strong>HTML:</strong> &amp;#9733; for &#9733;, &amp;#9734; for &#9734;.</p>` }} />
    </div>
  );
}
