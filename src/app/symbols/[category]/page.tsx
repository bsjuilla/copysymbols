import { notFound } from "next/navigation";
import { categories, getSymbolsByCategory } from "@/data/symbols";
import CopyToast from "@/components/CopyToast";
import SymbolCard from "@/components/SymbolCard";
import Link from "next/link";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  if (!cat) return {};
  return {
    title: `${cat.name} Symbols — Copy & Paste`,
    description: `Copy and paste ${cat.name.toLowerCase()} symbols. Click any symbol to copy instantly.`,
    alternates: { canonical: `https://www.copychars.com/symbols/${category}` },
  };
}

const categoryRelated: Record<string, {
  blog?: { href: string; label: string; desc: string }[];
  tools?: { href: string; label: string; desc: string }[];
  pages?: { href: string; label: string }[];
}> = {
  arrows: {
    blog: [
      { href: "/blog/arrow-symbols-list", label: "All Arrow Symbols", desc: "Complete list of every arrow symbol with copy buttons" },
    ],
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build custom arrow combos for your bio" },
      { href: "/fancy-text", label: "Fancy Text", desc: "Style your text with arrows and decorations" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Arrows for Instagram" },
      { href: "/symbols-for/discord", label: "🎮 Arrows for Discord" },
      { href: "/borders", label: "─ Aesthetic Borders" },
    ],
  },
  currency: {
    blog: [
      { href: "/blog/currency-symbols-list", label: "All Currency Symbols", desc: "Every world currency with Unicode and country" },
    ],
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Combine currency symbols in your text" },
    ],
    pages: [
      { href: "/symbols-for/twitter", label: "🐦 Currency for Twitter" },
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols/legal", label: "© Legal Symbols" },
    ],
  },
  math: {
    blog: [
      { href: "/blog/math-symbols-list", label: "Math Symbols List", desc: "All mathematical symbols explained with uses" },
    ],
    tools: [
      { href: "/small-text", label: "Small Text", desc: "Convert numbers and text to superscript" },
      { href: "/fancy-text", label: "Fancy Text", desc: "Bold and italic math symbols" },
    ],
    pages: [
      { href: "/symbols/greek", label: "α Greek Letters" },
      { href: "/symbols/superscript", label: "² Superscript" },
      { href: "/pi-symbol", label: "π Pi Symbol" },
      { href: "/infinity-symbol", label: "∞ Infinity Symbol" },
    ],
  },
  greek: {
    blog: [
      { href: "/blog/greek-alphabet-list", label: "Greek Alphabet List", desc: "All 24 Greek letters with names and uses" },
    ],
    tools: [
      { href: "/fancy-text", label: "Fancy Text", desc: "Greek-style decorative text" },
      { href: "/small-text", label: "Small Text", desc: "Tiny Greek letters for bios" },
    ],
    pages: [
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols-for/discord", label: "🎮 Greek for Discord" },
    ],
  },
  legal: {
    blog: [
      { href: "/blog/how-to-type-copyright", label: "How to Type the Copyright Symbol", desc: "Mac, Windows, iPhone and Android shortcuts" },
      { href: "/blog/trademark-vs-registered", label: "™ vs ® vs © — What's the Difference?", desc: "Plain-English guide to legal symbols" },
    ],
    tools: [
      { href: "/copyright-symbol", label: "© Copyright Symbol", desc: "Dedicated page for the copyright sign" },
    ],
    pages: [
      { href: "/symbols/punctuation", label: "« Punctuation" },
      { href: "/symbols-for/instagram", label: "📸 Legal symbols for Instagram" },
    ],
  },
  shapes: {
    blog: [
      { href: "/blog/star-symbols", label: "Star Symbols Guide", desc: "Every star symbol and how to use them" },
      { href: "/blog/heart-symbols", label: "Heart Symbols Guide", desc: "All heart symbols copy paste" },
    ],
    tools: [
      { href: "/stars", label: "★ Star Symbols", desc: "Dedicated star symbol collection" },
      { href: "/hearts", label: "❤ Heart Symbols", desc: "100+ heart symbols to copy" },
      { href: "/sparkle-symbols", label: "✦ Sparkle Symbols", desc: "Decorative sparkle collection" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Shapes for Instagram" },
      { href: "/bio-templates", label: "Bio Templates" },
      { href: "/borders", label: "─ Aesthetic Borders" },
    ],
  },
  punctuation: {
    blog: [],
    tools: [
      { href: "/fancy-text", label: "Fancy Text", desc: "Decorate your text with punctuation" },
      { href: "/strikethrough-text", label: "Strikethrough Text", desc: "Add strikethrough to any text" },
    ],
    pages: [
      { href: "/symbols/legal", label: "© Legal Symbols" },
      { href: "/symbols/technical", label: "⌘ Technical Symbols" },
    ],
  },
  music: {
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build music symbol combos" },
      { href: "/emoji-combos", label: "Emoji Combos", desc: "Music-themed emoji combinations" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Music symbols for Instagram" },
      { href: "/symbols-for/tiktok", label: "🎵 Music symbols for TikTok" },
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
    ],
  },
  chess: {
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Combine chess pieces in text" },
    ],
    pages: [
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
      { href: "/symbols/zodiac", label: "♈ Zodiac Symbols" },
      { href: "/symbols-for/discord", label: "🎮 Symbols for Discord" },
    ],
  },
  zodiac: {
    tools: [
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build zodiac symbol combos for your bio" },
      { href: "/bio-templates", label: "Bio Templates", desc: "Ready-made bios with zodiac symbols" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Zodiac for Instagram" },
      { href: "/symbols-for/tiktok", label: "🎵 Zodiac for TikTok" },
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
    ],
  },
  weather: {
    tools: [
      { href: "/emoji-combos", label: "Emoji Combos", desc: "Weather-themed emoji combinations" },
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build weather symbol combos" },
    ],
    pages: [
      { href: "/symbols-for/instagram", label: "📸 Weather for Instagram" },
      { href: "/symbols/shapes", label: "★ Shapes & Stars" },
      { href: "/symbols/zodiac", label: "♈ Zodiac Symbols" },
    ],
  },
  technical: {
    blog: [],
    tools: [
      { href: "/fancy-text", label: "Fancy Text", desc: "Technical symbol text styles" },
    ],
    pages: [
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols/superscript", label: "² Superscript" },
      { href: "/symbols-for/discord", label: "🎮 Technical for Discord" },
    ],
  },
  superscript: {
    tools: [
      { href: "/superscript-generator", label: "ˣ² Super & Subscript Generator", desc: "Type any text, get instant superscript and subscript" },
      { href: "/small-text", label: "ˢ Small Text", desc: "Small caps + superscript + subscript in one tool" },
      { href: "/fancy-text", label: "Fancy Text", desc: "More Unicode text styles" },
    ],
    pages: [
      { href: "/symbols/math", label: "∑ Math Symbols" },
      { href: "/symbols/greek", label: "α Greek Letters" },
    ],
  },
  ui: {
    tools: [
      { href: "/checkmark", label: "✓ Checkmark Symbols", desc: "Every checkmark and tick symbol" },
      { href: "/symbol-builder", label: "✦ Symbol Builder", desc: "Build UI symbol combos" },
    ],
    pages: [
      { href: "/symbols-for/discord", label: "🎮 UI for Discord" },
      { href: "/symbols/technical", label: "⌘ Technical Symbols" },
    ],
  },
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find(c => c.id === category);
  if (!cat) notFound();

  const catSymbols = getSymbolsByCategory(category);
  const related = categoryRelated[category] ?? {};
  const hasBlog = related.blog && related.blog.length > 0;
  const hasTools = related.tools && related.tools.length > 0;
  const hasPages = related.pages && related.pages.length > 0;

  // JSON-LD: BreadcrumbList + ItemList of the symbols on this page.
  // Helps Google understand listing intent so the page is indexed as a
  // catalogue rather than dismissed as thin content.
  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Symbols", item: `${baseUrl}/symbols` },
          { "@type": "ListItem", position: 3, name: `${cat!.name} Symbols`, item: `${baseUrl}/symbols/${category}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${cat!.name} Symbols`,
        description: `${cat!.description}. ${catSymbols.length} symbols to copy and paste.`,
        numberOfItems: catSymbols.length,
        itemListElement: catSymbols.slice(0, 100).map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${baseUrl}/symbol/${s.id}`,
        })),
      },
    ],
  };

  return (
    <>
      <CopyToast />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .cat-blog-link { display: flex; justify-content: space-between; align-items: center; gap: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; text-decoration: none; transition: border-color 0.15s; }
        .cat-blog-link:hover { border-color: var(--accent); }
        .cat-tool-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 16px; text-decoration: none; display: block; transition: border-color 0.15s, transform 0.15s; }
        .cat-tool-card:hover { border-color: var(--accent); transform: translateY(-2px); }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Symbols</Link>
          <span>›</span>
          <span style={{ color: "var(--text2)" }}>{cat!.name}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{cat!.icon}</div>
          <div className="section-label">{catSymbols.length} symbols</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 8 }}>
            {cat!.name} Symbols
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>
            {cat!.description}. Click any symbol to copy it instantly.
          </p>
        </div>

        {/* Symbol grid */}
        <div className="symbols-grid" style={{ marginBottom: 64 }}>
          {catSymbols.map(s => (
            <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />
          ))}
        </div>

        {/* Cross-links */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 48, marginBottom: 48, display: "flex", flexDirection: "column", gap: 40 }}>

          {hasBlog && (
            <div>
              <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                📖 Related Guides
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {related.blog!.map(post => (
                  <Link key={post.href} href={post.href} className="cat-blog-link">
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{post.label}</div>
                      <div style={{ fontSize: 13, color: "var(--text3)" }}>{post.desc}</div>
                    </div>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {hasTools && (
            <div>
              <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                🛠 You Might Also Like
              </h2>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {related.tools!.map(tool => (
                  <Link key={tool.href} href={tool.href} className="cat-tool-card">
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{tool.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{tool.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {hasPages && (
            <div>
              <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                ⚡ Quick Links
              </h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {related.pages!.map(p => (
                  <Link key={p.href} href={p.href} className="cat-pill">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* More Categories */}
        <section>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>More Categories</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.filter(c => c.id !== category).map(c => (
              <Link key={c.id} href={`/symbols/${c.id}`} className="cat-pill">
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
