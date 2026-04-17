import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Symbol Guides & How-To Articles",
  description: "Learn how to type and use special characters. Guides on copyright symbols, currency symbols, Greek letters, trademark symbols, and more.",
};

const posts = [
  {
    href: "/blog/how-to-type-copyright",
    title: "How to Type the Copyright Symbol © on Any Device",
    desc: "Mac, Windows, iPhone, Android and HTML shortcuts for the © copyright sign.",
    icon: "©",
    category: "How-To",
  },
  {
    href: "/blog/trademark-vs-registered",
    title: "™ vs ® vs © — What is the Difference?",
    desc: "Plain-English explanation of trademark, registered trademark and copyright. When to use each.",
    icon: "™",
    category: "Explained",
  },
  {
    href: "/blog/currency-symbols-list",
    title: "All Currency Symbols — Complete List $ € £ ¥ ₹",
    desc: "Every world currency symbol with country, name and Unicode. Copy any with one click.",
    icon: "€",
    category: "Reference",
  },
  {
    href: "/blog/greek-alphabet-list",
    title: "Complete Greek Alphabet — α β γ Copy & Paste",
    desc: "All 24 Greek letters with uppercase, lowercase, names and their uses in math and science.",
    icon: "Ω",
    category: "Reference",
  },
  {
    href: "/blog/instagram-bio-lines",
    title: "How to Make a Line in Your Instagram Bio",
    desc: "Copy and paste aesthetic dividers and separators that work in Instagram bios.",
    icon: "─",
    category: "How-To",
  },
];

const categoryColors: Record<string, string> = {
  "How-To": "#c8a96e",
  "Explained": "#a78bfa",
  "Reference": "#4ecdc4",
};

export default function BlogIndexPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Guides & articles</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Symbol Guides
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 48, lineHeight: 1.6 }}>
        How-to guides, explanations and reference articles about special characters and symbols.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {posts.map(post => (
          <Link key={post.href} href={post.href} style={{ textDecoration: "none" }}>
            <div
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start", transition: "all 0.18s", cursor: "pointer" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = ""; el.style.boxShadow = ""; }}
            >
              <div style={{ fontSize: "2.5rem", lineHeight: 1, flexShrink: 0, width: 48, textAlign: "center" }}>{post.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: `${categoryColors[post.category]}22`, color: categoryColors[post.category] }}>
                    {post.category}
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{post.desc}</p>
              </div>
              <span style={{ color: "var(--accent)", fontSize: 18, flexShrink: 0, paddingTop: 4 }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
