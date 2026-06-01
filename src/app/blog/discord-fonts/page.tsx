import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

const TITLE = "How to Get Fancy Fonts in Your Discord Name and Messages";
const DESCRIPTION = "Discord has no font setting, but Unicode 'fancy text' lets you style your username, nickname, and messages. Here's how it works, what to watch out for, and styles to copy.";
const SLUG = "discord-fonts";
const PUBLISHED = "2026-06-01T00:00:00Z";
const MODIFIED = "2026-06-01T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "discord fonts",
    "discord font generator",
    "how to change discord font",
    "discord name fonts",
    "fancy text discord",
    "discord nickname symbols",
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

const styles = [
  { symbol: "𝐍𝐢𝐠𝐡𝐭𝐟𝐚𝐥𝐥", name: "Bold serif" },
  { symbol: "𝓝𝓲𝓰𝓱𝓽𝓯𝓪𝓵𝓵", name: "Cursive script" },
  { symbol: "𝕹𝖎𝖌𝖍𝖙𝖋𝖆𝖑𝖑", name: "Gothic / fraktur" },
  { symbol: "Ⓝⓘⓖⓗⓣⓕⓐⓛⓛ", name: "Bubble" },
  { symbol: "𝙽𝚒𝚐𝚑𝚝𝚏𝚊𝚕𝚕", name: "Monospace" },
  { symbol: "ɴɪɢʜᴛꜰᴀʟʟ", name: "Small caps" },
];

const accents = [
  { symbol: "⚔", name: "Crossed swords" },
  { symbol: "༒", name: "Tibetan ornament" },
  { symbol: "꧁ ꧂", name: "Fancy brackets" },
  { symbol: "☠", name: "Skull" },
  { symbol: "▰▱", name: "Block bars" },
  { symbol: "⫷ ⫸", name: "Angle frame" },
];

export default function DiscordFonts() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          How to Get Fancy Fonts in Your Discord Name and Messages
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>
          Discord doesn&apos;t have a font setting. There&apos;s no menu where you switch your name to cursive or bold. What people are actually doing when their name looks like a fancy font is pasting in characters from a different part of Unicode that happen to be shaped like styled letters. Once you know that, styling your name or messages takes about ten seconds.
        </p>

        <h2 style={sectionH2}>Why there&apos;s no real &ldquo;Discord font&rdquo;</h2>
        <p style={para}>
          Discord renders everything in its own interface font. You can&apos;t change that font, and a normal letter you type will always display in it. But Unicode — the standard that defines every character your device can show — includes thousands of letter-like symbols beyond the basic alphabet: mathematical bold letters, script letters, circled letters, and more. To Discord these are just ordinary characters, so when you paste &ldquo;𝓱𝓮𝓵𝓵𝓸&rdquo; it shows it exactly as written. It looks like a cursive font; it&apos;s really cursive-shaped Unicode characters.
        </p>

        <h2 style={sectionH2}>Style your name or nickname</h2>
        <p style={para}>
          Type your name into the <Link href="/fancy-text" style={inlineLink}>Fancy Text Generator</Link>, pick a style, and copy it. Then in Discord:
        </p>
        <ol style={{ paddingLeft: 20, margin: "0 0 20px" }}>
          {[
            "For your global username: User Settings → My Account → Edit, and paste it into the display name.",
            "For a single server: right-click your name in the member list → Edit Server Profile → set a nickname.",
            "Paste, save, and check how it looks in the member list.",
          ].map((s, i) => (
            <li key={i} style={liStyle}>{s}</li>
          ))}
        </ol>
        <p style={para}>Here are a few styles to copy directly — tap to copy:</p>
        <CopySymbolGrid items={styles} columns="repeat(auto-fill, minmax(150px, 1fr))" />

        <h2 style={sectionH2}>Style your messages</h2>
        <p style={para}>
          The same paste trick works in any message box, but Discord <em>also</em> has real built-in formatting using Markdown, which is the better choice for normal chat because it stays readable and searchable:
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
          <li style={liStyle}>Wrap text in <code style={code}>**double asterisks**</code> for <strong>bold</strong>.</li>
          <li style={liStyle}>Use <code style={code}>*single asterisks*</code> for <em>italics</em>.</li>
          <li style={liStyle}>Use <code style={code}>__underscores__</code> to underline.</li>
          <li style={liStyle}>Use <code style={code}>`backticks`</code> for inline code styling.</li>
        </ul>
        <p style={para}>
          Reach for Unicode fancy text when you want a decorative one-off — a server announcement title or a profile line — and Markdown for everything you actually want people to read and search.
        </p>

        <h2 style={sectionH2}>Decorative accents for names</h2>
        <p style={para}>
          Gamers often frame a name with symbols. A couple on each side is plenty.
        </p>
        <CopySymbolGrid items={accents} columns="repeat(auto-fill, minmax(140px, 1fr))" />
        <p style={para}>
          For a bigger set built for usernames, see <Link href="/gaming-symbols" style={inlineLink}>Gaming Name Symbols</Link> and the <Link href="/blog/discord-symbols" style={inlineLink}>Discord symbols guide</Link>.
        </p>

        <h2 style={sectionH2}>Two things to keep in mind</h2>
        <ul style={{ paddingLeft: 20, margin: "0 0 24px" }}>
          <li style={liStyle}><strong>Searchability.</strong> A fancy-text name can be harder for friends to @-mention or search, because the characters aren&apos;t the plain letters they&apos;d type. If people need to find you, keep your base username normal and style a nickname instead.</li>
          <li style={liStyle}><strong>Screen readers.</strong> Assistive tech often reads mathematical and script characters oddly, letter by letter or not at all. It&apos;s a kind thing to keep important text in normal letters.</li>
        </ul>

        <p style={{ ...para, marginBottom: 32 }}>
          That&apos;s the whole trick: Discord has no fonts, but Unicode gives you the look of one. Generate a style, paste it where you want it, and frame it with a symbol or two.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/fancy-text" className="cat-pill">Fancy Text Generator</Link>
          <Link href="/username-generator" className="cat-pill">Username Generator</Link>
          <Link href="/gaming-symbols" className="cat-pill">Gaming Symbols</Link>
          <Link href="/blog/discord-symbols" className="cat-pill">Discord Symbols</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const liStyle: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 };
const inlineLink: React.CSSProperties = { color: "var(--accent)", textDecoration: "none", fontWeight: 600 };
const code: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 5, padding: "1px 6px", fontSize: 13.5, fontFamily: "monospace" };
