import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Zodiac Signs ♈♉♊ — Every Symbol, Date and Meaning";
const DESCRIPTION = "All 12 zodiac sign symbols to copy and paste, with their dates, element, ruling planet, and meaning. Plus where the glyphs come from and how to use them in bios.";
const SLUG = "zodiac-signs-symbols";
const PUBLISHED = "2026-06-01T00:00:00Z";
const MODIFIED = "2026-06-01T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "zodiac symbols",
    "zodiac signs copy paste",
    "star sign symbols",
    "astrology symbols",
    "zodiac sign meanings",
    "horoscope symbols",
  ],
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

interface Sign {
  symbol: string;
  name: string;
  dates: string;
  element: string;
  planet: string;
  meaning: string;
}

const signs: Sign[] = [
  { symbol: "♈", name: "Aries", dates: "Mar 21 – Apr 19", element: "Fire", planet: "Mars", meaning: "The ram. Bold, driven, and quick to act." },
  { symbol: "♉", name: "Taurus", dates: "Apr 20 – May 20", element: "Earth", planet: "Venus", meaning: "The bull. Steady, grounded, and loyal." },
  { symbol: "♊", name: "Gemini", dates: "May 21 – Jun 20", element: "Air", planet: "Mercury", meaning: "The twins. Curious, talkative, and adaptable." },
  { symbol: "♋", name: "Cancer", dates: "Jun 21 – Jul 22", element: "Water", planet: "Moon", meaning: "The crab. Caring, intuitive, and protective." },
  { symbol: "♌", name: "Leo", dates: "Jul 23 – Aug 22", element: "Fire", planet: "Sun", meaning: "The lion. Confident, warm, and generous." },
  { symbol: "♍", name: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth", planet: "Mercury", meaning: "The maiden. Practical, precise, and helpful." },
  { symbol: "♎", name: "Libra", dates: "Sep 23 – Oct 22", element: "Air", planet: "Venus", meaning: "The scales. Fair, social, and seeking balance." },
  { symbol: "♏", name: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water", planet: "Pluto", meaning: "The scorpion. Intense, focused, and deep." },
  { symbol: "♐", name: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire", planet: "Jupiter", meaning: "The archer. Adventurous, honest, and open-minded." },
  { symbol: "♑", name: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth", planet: "Saturn", meaning: "The sea-goat. Ambitious, disciplined, and patient." },
  { symbol: "♒", name: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air", planet: "Uranus", meaning: "The water-bearer. Original, independent, and idealistic." },
  { symbol: "♓", name: "Pisces", dates: "Feb 19 – Mar 20", element: "Water", planet: "Neptune", meaning: "The fish. Imaginative, gentle, and empathetic." },
];

const copyItems = signs.map((s) => ({ symbol: s.symbol, name: s.name, use: s.dates }));

export default function ZodiacSignsSymbols() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          Zodiac Signs: Every Symbol, Date and Meaning
        </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>
          Each of the twelve zodiac signs has its own glyph — a simple drawn symbol that has stood in for the sign for centuries. They live in Unicode, so you can copy and paste them anywhere: a bio, a username, a caption, or a note. Tap any sign below to copy its symbol, then read on for the dates, element, and meaning behind each one.
        </p>

        <CopySymbolGrid items={copyItems} columns="repeat(auto-fill, minmax(120px, 1fr))" />

        <h2 style={sectionH2}>The 12 signs in detail</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {signs.map((s) => (
            <div key={s.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div aria-hidden="true" style={{ fontSize: "2rem", lineHeight: 1, width: 40, textAlign: "center", flexShrink: 0, color: "var(--accent)" }}>{s.symbol}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                  <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{s.name}</span>
                  <span style={{ fontSize: 12.5, color: "var(--text3)" }}>{s.dates}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text3)", marginBottom: 6 }}>{s.element} · ruled by {s.planet}</div>
                <p style={{ fontSize: 14.5, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{s.meaning}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={sectionH2}>Where the glyphs come from</h2>
        <p style={para}>
          The zodiac symbols aren&apos;t modern inventions. Most date back to medieval and early-modern astronomy, where they served as shorthand for the constellations along the ecliptic — the band of sky the Sun appears to travel through across the year. Each glyph is a stylised picture of the sign&apos;s figure: Aries is a ram&apos;s horns, Leo is a lion&apos;s mane and tail, Pisces is two fish tied together. Astronomers still use the same symbols today, which is why they earned a permanent place in Unicode.
        </p>

        <h2 style={sectionH2}>The four elements</h2>
        <p style={para}>
          The signs are grouped into four elements, and signs of the same element are said to share a temperament:
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 24px" }}>
          <li style={liStyle}><strong>Fire</strong> (Aries, Leo, Sagittarius) — energetic and spontaneous.</li>
          <li style={liStyle}><strong>Earth</strong> (Taurus, Virgo, Capricorn) — practical and grounded.</li>
          <li style={liStyle}><strong>Air</strong> (Gemini, Libra, Aquarius) — social and intellectual.</li>
          <li style={liStyle}><strong>Water</strong> (Cancer, Scorpio, Pisces) — emotional and intuitive.</li>
        </ul>

        <h2 style={sectionH2}>Using zodiac symbols in a bio</h2>
        <p style={para}>
          Putting your sign&apos;s glyph in a bio is a quick, recognisable way to share it. Pair it with a divider or a moon for an astrology theme — the <Link href="/aesthetic" style={inlineLink}>aesthetic symbol sets</Link> have plenty that fit. If a glyph shows up as a small box on some device, it means that phone&apos;s font is missing it; check it first with the <Link href="/render-test" style={inlineLink}>Render Test</Link>. For the full collection alongside planets and other astrology marks, see the <Link href="/symbols/zodiac" style={inlineLink}>zodiac symbols page</Link>.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/symbols/zodiac" className="cat-pill">Zodiac Symbols</Link>
          <Link href="/aesthetic" className="cat-pill">Aesthetic Symbols</Link>
          <Link href="/bio-templates" className="cat-pill">Bio Templates</Link>
          <Link href="/stars" className="cat-pill">Star Symbols</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const liStyle: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 };
const inlineLink: React.CSSProperties = { color: "var(--accent)", textDecoration: "none", fontWeight: 600 };
