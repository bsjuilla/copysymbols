import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

const TITLE = "Check Mark Symbol ✓ — Complete Guide to Tick Marks";
const DESCRIPTION = "Everything about the check mark symbol. Unicode values, keyboard shortcuts for every device, and when to use each variant.";
const SLUG = "check-mark-symbol";
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
        Check Mark Symbol ✓ — Complete Guide to Tick Marks
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>Everything about the check mark symbol. Unicode values, keyboard shortcuts for every device, and when to use each variant.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>The <strong>check mark symbol ✓</strong> is one of the most used special characters in the world. Whether you call it a tick, checkmark, or tick mark, this symbol communicates &ldquo;correct&rdquo;, &ldquo;done&rdquo;, or &ldquo;approved&rdquo; across almost every culture.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">All Check Mark Variants</h2>
<ul style="padding-left:1.5rem;margin-bottom:1rem"><li style="margin-bottom:0.5rem"><strong>&#10003; (U+2713)</strong> &mdash; The standard check mark. Lightweight and elegant.</li><li style="margin-bottom:0.5rem"><strong>&#10004; (U+2714)</strong> &mdash; The heavy check mark. Bolder and more prominent.</li><li style="margin-bottom:0.5rem"><strong>&#9989; (U+2705)</strong> &mdash; The emoji version. Appears green on most platforms.</li><li style="margin-bottom:0.5rem"><strong>&#9745; (U+2611)</strong> &mdash; Ballot box with check. Used in forms and lists.</li></ul>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Keyboard Shortcuts</h2>
<p><strong>Windows:</strong> Hold Alt and type 10003 on the numpad for &#10003;, or Alt+10004 for &#10004;.</p>
<p style="margin-top:0.75rem"><strong>Mac:</strong> No built-in shortcut. Use Character Viewer (Ctrl+Cmd+Space) or copy from this page.</p>
<p style="margin-top:0.75rem"><strong>iPhone &amp; Android:</strong> Copy from this page and paste wherever you need it.</p>
<p style="margin-top:0.75rem"><strong>HTML:</strong> &amp;check; or &amp;#10003; to display &#10003;.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Check Mark vs Tick &mdash; Is There a Difference?</h2>
<p>Not really &mdash; &ldquo;tick&rdquo; is the British English term and &ldquo;check mark&rdquo; is American English. They refer to the same symbol and are completely interchangeable in everyday use.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">When to Use &#9745; vs &#10003; vs &#9989;</h2>
<p>Use <strong>&#10003; or &#10004;</strong> in plain text, emails, and spreadsheets. Use <strong>&#9745;</strong> when you want to show a completed checkbox. Use <strong>&#9989;</strong> in social media and messaging apps where emoji are supported.</p>` }} />
    </div>
    </>
  );
}
