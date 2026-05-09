import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Instagram Symbols — Copy & Paste for Bios and Captions",
  description: "The best symbols for Instagram bios and captions. Stars, hearts, arrows, flowers, dividers, and aesthetic text that actually works on Instagram.",
  ...canonical("/blog/instagram-symbols"),
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
        Instagram Symbols — Copy & Paste for Bios and Captions
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>The best symbols for Instagram bios and captions. Stars, hearts, arrows, flowers, dividers, and aesthetic text that actually works on Instagram.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>Instagram supports Unicode text everywhere &mdash; bios, captions, comments, story text, and display names. This means thousands of special characters work on the platform.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Best Symbols for Instagram Bios</h2>
<p>The most popular symbol categories for Instagram bios are: arrows (&rarr; &darr; &#10148;) to point to links, stars (&#10022; &#10023; &#11088;) for decoration, hearts (&#9825; &#9829; &#128149;) for personality, flowers (&#10047; &#10048; &#127800;) for aesthetic, and dividers (&#9472; &#9552; &#9473; &#9476;) to separate sections.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Popular Aesthetic Combinations</h2>
<p>&#10022; &#10023; &#10022; &mdash; minimal star divider</p>
<p style="margin-top:0.5rem">&#43865; NAME &#43866; &mdash; styled name with decorative brackets</p>
<p style="margin-top:0.5rem">&#10217; item &mdash; chevron bullet point style</p>
<p style="margin-top:0.5rem">&#9475; &#9475; &#9475; &mdash; vertical list layout</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Line Breaks in Instagram Bios</h2>
<p>Instagram removes empty lines in bios. To create visual spacing, use line characters like ─────── as visible separators between sections, or put a dot &bull; or period on otherwise blank lines.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Do Symbols Affect Instagram Reach?</h2>
<p>Symbols in captions do not directly affect the algorithm. However, bios with clear visual structure tend to get more profile visits because they are easier to scan and read at a glance.</p>` }} />
    </div>
  );
}
