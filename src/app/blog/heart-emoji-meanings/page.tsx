import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

const TITLE = "Heart Emoji Meanings — What Every Colour and Type Means";
const DESCRIPTION = "What each heart emoji means: ❤️ red, 🧡 orange, 💛 yellow, 💚 green, 💙 blue, 💜 purple, 🖤 black, 🤍 white, 🩷 pink and the special hearts. Copy any of them.";
const SLUG = "heart-emoji-meanings";
const PUBLISHED = "2026-06-01T00:00:00Z";
const MODIFIED = "2026-06-01T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "heart emoji meanings",
    "what do heart emojis mean",
    "heart colors meaning",
    "purple heart meaning",
    "black heart meaning",
    "heart emoji copy paste",
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

interface HeartMeaning {
  emoji: string;
  name: string;
  meaning: string;
}

const colours: HeartMeaning[] = [
  { emoji: "❤️", name: "Red heart", meaning: "Classic, deep love and romance. The default heart for partners, family, and anything you genuinely love." },
  { emoji: "🧡", name: "Orange heart", meaning: "Warmth and care without romance. Often used for close friends, comfort, and a half-step between red and yellow." },
  { emoji: "💛", name: "Yellow heart", meaning: "Friendship and happiness. A bright, platonic heart — Snapchat also uses it to mark a best friend." },
  { emoji: "💚", name: "Green heart", meaning: "Nature, growth, and health, and sometimes light-hearted jealousy. Also a go-to for anything eco or for the colour green itself." },
  { emoji: "💙", name: "Blue heart", meaning: "Trust, loyalty, and calm. Reads as steady and platonic, and is popular for sports teams and causes in blue." },
  { emoji: "💜", name: "Purple heart", meaning: "Admiration, compassion, and a soft, gentle love. Strongly associated with fandoms, especially K-pop." },
  { emoji: "🖤", name: "Black heart", meaning: "Grief or dark humour, but just as often an aesthetic choice — edgy, minimalist, or simply matching a dark theme." },
  { emoji: "🤍", name: "White heart", meaning: "Purity, sincerity, and clean aesthetics. Common in soft, minimalist bios and for remembrance." },
  { emoji: "🩷", name: "Pink heart", meaning: "Sweet, cute affection — softer than red. A favourite for coquette and soft-girl aesthetics." },
  { emoji: "🤎", name: "Brown heart", meaning: "Warmth, comfort, and earthiness. Also used to celebrate brown skin tones and the colour itself." },
  { emoji: "🩵", name: "Light blue heart", meaning: "Gentle, airy affection. A pastel cousin of the blue heart, common in soft aesthetics." },
  { emoji: "🩶", name: "Grey heart", meaning: "Neutral, understated feeling. Suits muted, minimalist palettes and a low-key mood." },
];

const special: HeartMeaning[] = [
  { emoji: "❤️‍🔥", name: "Heart on fire", meaning: "Burning passion, intense desire, or being completely captivated by something." },
  { emoji: "❤️‍🩹", name: "Mending heart", meaning: "Healing, recovery, and self-care after being hurt. Getting better, slowly." },
  { emoji: "💔", name: "Broken heart", meaning: "Heartbreak, loss, or sadness — and sometimes playful drama about a minor letdown." },
  { emoji: "💕", name: "Two hearts", meaning: "Affection and a warm, bubbly mood. One of the most-used hearts for general love." },
  { emoji: "💞", name: "Revolving hearts", meaning: "Love that surrounds you — closeness and a swirl of affection between two people." },
  { emoji: "💓", name: "Beating heart", meaning: "A heart that is racing — excitement, a crush, or strong emotion in the moment." },
  { emoji: "💗", name: "Growing heart", meaning: "Feelings that are getting stronger — swelling affection and warmth." },
  { emoji: "💖", name: "Sparkling heart", meaning: "Bright, giddy love with a touch of sparkle. Cute and enthusiastic." },
  { emoji: "💘", name: "Heart with arrow", meaning: "Falling in love or being struck by Cupid — a new crush or infatuation." },
  { emoji: "💝", name: "Heart with ribbon", meaning: "Love given as a gift. Common around Valentine's Day and for presents." },
  { emoji: "💟", name: "Heart decoration", meaning: "A decorative heart used as a label or button — affection in a tidy, designed form." },
];

const textHearts = [
  { symbol: "♡", name: "White heart suit" },
  { symbol: "♥", name: "Black heart suit" },
  { symbol: "❤", name: "Heavy heart" },
  { symbol: "❥", name: "Rotated heart bullet" },
  { symbol: "❣", name: "Heart exclamation" },
  { symbol: "ღ", name: "Georgian heart (an)" },
];

function HeartList({ items }: { items: HeartMeaning[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
      {items.map((h) => (
        <div key={h.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div aria-hidden="true" style={{ fontSize: "1.6rem", lineHeight: 1.2, width: 34, textAlign: "center", flexShrink: 0 }}>{h.emoji}</div>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{h.name}</div>
            <p style={{ fontSize: 14.5, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{h.meaning}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeartEmojiMeanings() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          Heart Emoji Meanings: What Every Colour and Type Means
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>
          Heart emoji carry real shades of meaning, and the colour you choose changes the message. A red heart says one thing to a partner; a yellow heart says something gentler to a friend. None of these meanings are official rules — they are the conventions people have settled into — but knowing them helps you pick the right one. Here is what each heart tends to mean, with every one ready to copy.
        </p>

        <h2 style={sectionH2}>Heart colours and what they mean</h2>
        <HeartList items={colours} />

        <h2 style={sectionH2}>Special hearts</h2>
        <HeartList items={special} />

        <h2 style={sectionH2}>Text hearts you can copy</h2>
        <p style={para}>
          Alongside the colour emoji there are monochrome text hearts. These take the colour of your text instead of being drawn in red, which makes them popular for clean, aesthetic bios. Tap to copy.
        </p>
        <CopySymbolGrid items={textHearts} columns="repeat(auto-fill, minmax(150px, 1fr))" />

        <h2 style={sectionH2}>A few things worth knowing</h2>
        <ul style={{ paddingLeft: 20, margin: "0 0 24px" }}>
          <li style={liStyle}><strong>Meanings shift by context.</strong> A black heart from a friend joking around is not grief — tone and who is sending it matter more than the colour alone.</li>
          <li style={liStyle}><strong>The art differs by device.</strong> Each platform draws its own hearts, so your 💖 looks slightly different on someone else&apos;s phone. The character is the same; the picture is not.</li>
          <li style={liStyle}><strong>Newer hearts need newer phones.</strong> The pink, light-blue, and grey hearts were added in later Unicode versions, so very old devices may show a blank box.</li>
        </ul>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/hearts" className="cat-pill">All Heart Symbols</Link>
          <Link href="/blog/heart-symbols" className="cat-pill">Heart Symbols Guide</Link>
          <Link href="/emoji" className="cat-pill">Emoji</Link>
          <Link href="/couple-bio" className="cat-pill">Couple Bio Symbols</Link>
          <Link href="/aesthetic" className="cat-pill">Aesthetic Symbols</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const liStyle: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 };
