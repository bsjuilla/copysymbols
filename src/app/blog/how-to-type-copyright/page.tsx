import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

const TITLE = "How to Type the Copyright Symbol © on Mac, Windows & iPhone";
const DESCRIPTION = "Learn how to type the copyright symbol © on Mac (Option+G), Windows (Alt+0169), iPhone, Android, and in HTML. Step-by-step guide with shortcuts.";
const SLUG = "how-to-type-copyright";
const PUBLISHED = "2026-03-01T00:00:00Z";
const MODIFIED = "2026-05-09T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["how to type copyright symbol","copyright symbol mac","copyright symbol windows","© keyboard shortcut","copyright symbol html"],
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

export default function BlogCopyright() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link> › <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none" }}>Blog</Link> › How to Type ©
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        How to Type the Copyright Symbol © on Any Device
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>The copyright symbol © is one of the most searched symbols on the internet. Whether you need it for a website, document, or social media post, here is how to type it on every device — or just copy it below.</p>

      <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 14, padding: 24, marginBottom: 48, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>©</div>
        <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16 }}>Click the symbol above to copy it instantly</p>
        <Link href="/symbol/copyright" style={{ background: "var(--accent)", color: "var(--bg)", padding: "8px 20px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          See full copyright symbol page →
        </Link>
      </div>

      {[
        { os: "Mac", steps: ["Hold the Option key", "While holding Option, press G", "The © symbol appears"], shortcut: "Option + G", note: "This works in any Mac application — Pages, Word, TextEdit, browsers, and more." },
        { os: "Windows", steps: ["Make sure Num Lock is ON", "Hold the Alt key", "Type 0169 on the numpad (not the top row)", "Release Alt — © appears"], shortcut: "Alt + 0169 (numpad)", note: "This only works with the numpad keys, not the number keys above the letters." },
        { os: "iPhone / iPad", steps: ["Open any app with a keyboard", "Hold the letter C on the keyboard", "A popup appears with ©", "Slide to © and release"], shortcut: "Hold C key", note: "This is available in the default iOS keyboard on all iPhones." },
        { os: "Android", steps: ["Open any app with a keyboard", "Tap the ?123 key to switch to symbols", "Look for © in the symbols panel", "Or long-press C to see the option"], shortcut: "Symbols panel or hold C", note: "The exact location varies by Android keyboard app." },
      ].map(item => (
        <section key={item.os} style={{ marginBottom: 40 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>On {item.os}</h2>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 13, fontFamily: "var(--font-dm-mono), monospace", color: "var(--accent)", marginBottom: 12 }}>Shortcut: {item.shortcut}</div>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              {item.steps.map((s, i) => <li key={i} style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 4 }}>{s}</li>)}
            </ol>
            <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 12, marginBottom: 0 }}>💡 {item.note}</p>
          </div>
        </section>
      ))}

      <section style={{ marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>In HTML & Code</h2>
        <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
          {[["HTML Entity", "&copy;"],["HTML Number", "&#169;"],["Unicode", "U+00A9"],["CSS content", "\\00A9"]].map(([label, code]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 14, color: "var(--text2)" }}>{label}</span>
              <code style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 14, color: "var(--teal)" }}>{code}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Related symbols</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/symbol/registered" className="cat-pill">® Registered Trademark</Link>
          <Link href="/symbol/trademark" className="cat-pill">™ Trade Mark</Link>
          <Link href="/symbol/section" className="cat-pill">§ Section Sign</Link>
          <Link href="/symbols/legal" className="cat-pill">All Legal Symbols</Link>
        </div>
      </section>
    </div>
    </>
  );
}
