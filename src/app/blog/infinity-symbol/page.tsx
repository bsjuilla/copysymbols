import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Infinity Symbol ∞ — Meaning, History and How to Type It",
  description: "The complete guide to the infinity symbol. Its mathematical meaning, historical origin, and keyboard shortcuts for Mac, Windows, HTML and LaTeX.",
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
        Infinity Symbol ∞ — Meaning, History and How to Type It
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>The complete guide to the infinity symbol. Its mathematical meaning, historical origin, and keyboard shortcuts for Mac, Windows, HTML and LaTeX.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>The <strong>infinity symbol &infin;</strong> (U+221E) represents a quantity larger than any real number. Beyond mathematics it has become a popular motif for tattoos, jewellery, and social media &mdash; representing endlessness and eternal potential.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Mathematical Meaning</h2>
<p>Introduced by English mathematician <strong>John Wallis in 1655</strong>, &infin; appears in calculus limits, improper integrals, and infinite series. In set theory, there are actually multiple infinities of different sizes (&alefsym;&sub0;, &alefsym;&sub1;, and so on &mdash; called cardinal numbers).</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">How to Type &infin;</h2>
<p><strong>Windows:</strong> Alt + 236 on the numpad.</p>
<p style="margin-top:0.75rem"><strong>Mac:</strong> Option + 5. Simple and fast.</p>
<p style="margin-top:0.75rem"><strong>HTML:</strong> &amp;infin; or &amp;#8734;</p>
<p style="margin-top:0.75rem"><strong>LaTeX:</strong> \\\\infty</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Origin of the &infin; Shape</h2>
<p>The exact origin is debated. Theories include: a variant of the Roman numeral M (1000, meaning &ldquo;very many&rdquo;), a stylised Ouroboros (the ancient snake eating its tail), or simply an aesthetically pleasing closed curve chosen by Wallis. The lemniscate &mdash; the figure-eight shape on its side &mdash; had been studied by mathematicians before Wallis adopted it.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">&infin; in Popular Culture</h2>
<p>The infinity symbol is one of the most popular tattoo designs worldwide, often placed on wrists or ankles. It appears in Marvel&rsquo;s Infinity Gauntlet storyline, in jewellery representing eternal love, and as a logo for brands seeking to convey limitless quality.</p>` }} />
    </div>
  );
}
