import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Sparkle Symbols ✨ ✦ ⭐ Copy & Paste — Star Sparkles",
  description: "Copy sparkle and star symbols instantly: ✨ ✦ ✧ ⭐ 🌟 💫 ★ ☆ and more aesthetic text sparkles for Instagram and TikTok bios, captions and social media posts.",
  ...canonical("/sparkle-symbols"),
};

const items = [
  { symbol: "✨", name: "Sparkles" },
  { symbol: "⭐", name: "Star" },
  { symbol: "🌟", name: "Glowing Star" },
  { symbol: "💫", name: "Dizzy" },
  { symbol: "✦", name: "Black Four Pointed Star" },
  { symbol: "✧", name: "White Four Pointed Star" },
  { symbol: "✶", name: "Six Pointed Black Star" },
  { symbol: "✷", name: "Six Pointed Pinwheel Star" },
  { symbol: "✸", name: "Eight Pointed Black Star" },
  { symbol: "✹", name: "Eight Pointed Stress Star" },
  { symbol: "✺", name: "Eight Pointed Star" },
  { symbol: "❇", name: "Sparkle" },
  { symbol: "❈", name: "Heavy Sparkle" },
  { symbol: "✴", name: "Eight Pointed Star" },
  { symbol: "⋆", name: "Star Operator" },
  { symbol: "⁂", name: "Asterism" },
  { symbol: "★", name: "Black Star" },
  { symbol: "☆", name: "White Star" },
];

const faqs = [
  { q: "What is the difference between ✨, ✦ and ★?", a: "✨ is the sparkles emoji — full colour, drawn by the platform, and the one people use to mean 'special' or 'magic'. ✦ and ✧ are small four-pointed text stars from the Dingbats block; they are monochrome and great for spacing between words. ★ and ☆ are the classic filled and outline stars. They all copy the same way, so the choice is about size and whether you want colour." },
  { q: "How do I make a sparkle trail like ⋆｡˚?", a: "A sparkle trail is just a few small star characters and dots arranged together, for example ⋆｡˚ or ✧･ﾟ. Copy one of the small stars (⋆ or ✦) and combine it with a dot (｡) or a Japanese half-width mark (･ﾟ). You can build your own or grab ready-made ones from the aesthetic symbol sets." },
  { q: "Do sparkle symbols work in Instagram and TikTok bios?", a: "Yes. The text sparkles (✦ ✧ ✶ ⋆ ★ ☆) are widely supported and paste cleanly into any bio. The emoji sparkles (✨ 🌟 💫) work too and add colour. Both are among the most common symbols in aesthetic bios." },
  { q: "Why does ✨ look different on my friend's phone?", a: "Emoji are drawn by each device's own art set, so the sparkles emoji looks slightly different on iPhone, Android, and Windows — same character, different picture. The monochrome text stars look the same everywhere because they follow your text font." },
];

const baseUrl = "https://www.copychars.com";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Symbols", item: `${baseUrl}/symbols` },
        { "@type": "ListItem", position: 3, name: "Sparkle Symbols", item: `${baseUrl}/sparkle-symbols` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Sparkle & Star Symbols",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${it.symbol} ${it.name}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function SparkleSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Sparkle Symbols ✨
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Click any sparkle to copy it. The small text stars (✦ ✧ ✶ ⋆) are monochrome and perfect for spacing inside a bio, while the emoji sparkles (✨ 🌟 💫) add colour. Popular for aesthetic bios, captions, and messages on Instagram, TikTok, and Discord.
      </p>
      <CopySymbolGrid items={items} columns="repeat(auto-fill, minmax(140px, 1fr))" />

      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={subH2}>How to use sparkle symbols</h2>
        <p style={proseP}>
          Sparkles are the workhorses of aesthetic text because they read as decorative without carrying a strong meaning. A single ✦ between two words creates a clean break; a pair wrapped around a name (<strong>✧ aria ✧</strong>) frames it; a short trail like <strong>⋆˚｡</strong> at the end of a line softens it. Because the text stars are monochrome, they layer well with other symbols — a moon, a flower, a heart — without fighting for attention the way two emoji would.
        </p>
        <h2 className="font-display" style={subH2}>Building your own sparkle trail</h2>
        <p style={proseP}>
          The trails you see in bios are not special characters; they are small stars and dots placed next to each other. Start with a four-pointed star (✦ or ✧), add a dot (｡) or a couple of half-width marks (･ﾟ), and mirror it on the other side. Combinations like <strong>✧･ﾟ: *</strong> and <strong>⋆｡˚꒷</strong> are built exactly this way. For ready-made trails sorted by vibe, see the aesthetic symbol sets.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 className="font-display" style={{ ...subH2, marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 }}>
        <Link href="/stars" className="cat-pill">Star Symbols</Link>
        <Link href="/flower-symbols" className="cat-pill">Flower Symbols</Link>
        <Link href="/hearts" className="cat-pill">Heart Symbols</Link>
        <Link href="/aesthetic" className="cat-pill">Aesthetic Symbols</Link>
        <Link href="/blog/aesthetic-instagram-bio" className="cat-pill">Aesthetic Bio Guide</Link>
      </div>
    </div>
  );
}

const subH2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.01em" };
const proseP: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 };
