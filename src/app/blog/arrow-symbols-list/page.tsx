import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Arrow Symbols — Complete List of 200+ Copy Paste Arrows",
  description: "Every Unicode arrow symbol with name and code. Right, left, up, down, double, curved, bold, and decorative arrows. Click any to copy.",
  ...canonical("/blog/arrow-symbols-list"),
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
        Arrow Symbols — Complete List of 200+ Copy Paste Arrows
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>Every Unicode arrow symbol with name and code. Right, left, up, down, double, curved, bold, and decorative arrows. Click any to copy.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>Arrow symbols are among the most searched special characters. Whether you need a simple right arrow &rarr; for a document, a double arrow &rArr; for a maths proof, or a bold filled arrow &amp;#10145; for social media, Unicode has you covered.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Basic Direction Arrows</h2>
<p>The four basic arrows are &rarr; &larr; &uarr; &darr; (U+2192, U+2190, U+2191, U+2193). These are the most universally supported and work in every font and app. Bidirectional variants: &harr; (horizontal) and &varr; (vertical).</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Double Arrows</h2>
<p>Double arrows &rArr; &lArr; &hArr; are used in mathematics and logic. &rArr; means &ldquo;implies&rdquo; (if A then B). &hArr; means &ldquo;if and only if&rdquo;.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Bold and Filled Arrows</h2>
<p>For visual emphasis &mdash; in presentations or social media bios &mdash; the bold filled arrows &#10145; &#11013; &#11014; &#11015; are ideal. They render clearly at small sizes.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Curved Arrows</h2>
<p>Curved arrows &#8631; &#8630; represent redo and undo. Circular arrows &#8635; &#8634; represent refresh and repeat.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Keyboard Shortcuts</h2>
<p><strong>Windows:</strong> Alt+26 for &rarr;, Alt+27 for &larr;, Alt+24 for &uarr;, Alt+25 for &darr;.</p>
<p style="margin-top:0.75rem"><strong>HTML:</strong> &amp;rarr; &amp;larr; &amp;uarr; &amp;darr; for the four basic arrows.</p>` }} />
    </div>
  );
}
