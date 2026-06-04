import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "About CopyChars — Free Copy & Paste Symbols, Emoji & Kaomoji",
  description:
    "CopyChars is a free copy-and-paste library of Unicode symbols, emoji, kaomoji, fancy text and aesthetic bio tools. Learn what the site is, who it's for, and how we keep every character accurate.",
  ...canonical("/about"),
};

const CONTACT_EMAIL = "contact@copychars.com";
const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${baseUrl}/about`,
      url: `${baseUrl}/about`,
      name: "About CopyChars",
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#organization` },
      description:
        "About CopyChars — a free copy-and-paste library of Unicode symbols, emoji, kaomoji, fancy text and aesthetic bio tools.",
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "CopyChars",
      url: baseUrl,
      email: CONTACT_EMAIL,
      description:
        "CopyChars is a free online tool for copying and pasting Unicode special characters, symbols, emoji, kaomoji, fancy text and aesthetic decorations for bios, usernames, captions and documents.",
      logo: { "@type": "ImageObject", url: `${baseUrl}/favicon.svg` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "About", item: `${baseUrl}/about` },
      ],
    },
  ],
};

const h2: React.CSSProperties = { fontSize: 19, fontWeight: 700, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.01em" };
const linkStyle: React.CSSProperties = { color: "var(--accent)", textDecoration: "none", fontWeight: 600 };

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <div className="section-label">About</div>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800, color: "var(--text)", marginBottom: 14, letterSpacing: "-0.03em" }}>
          About CopyChars
        </h1>
        <p style={{ fontSize: 16.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 8 }}>
          CopyChars is a free copy-and-paste library for the characters that aren&apos;t on your keyboard. Special symbols, emoji, Japanese kaomoji, fancy fonts, aesthetic decorations — find the one you want, tap it once, and it&apos;s on your clipboard, ready to paste anywhere.
        </p>

        <div style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 30, marginTop: 32 }}>
          <section>
            <h2 style={h2}>What CopyChars is</h2>
            <p>
              Every keyboard can only reach a tiny slice of Unicode — the global standard that defines tens of thousands of characters. The rest (₹, ©, →, ♥, ★, α, ✿, ʕ•ᴥ•ʔ and far more) usually means hunting through a character map or memorising obscure Alt-codes. CopyChars exists to make that instant: a clean, searchable home for the symbols, emoji and text faces people actually use, each one a single click to copy. No account, no install, no friction.
            </p>
          </section>

          <section>
            <h2 style={h2}>What you can do here</h2>
            <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><Link href="/symbols" style={linkStyle}>Special characters &amp; symbols</Link> — arrows, currency, math, Greek letters, punctuation, shapes, stars, legal marks and more, organised by category.</li>
              <li><Link href="/emoji" style={linkStyle}>Emoji</Link> and ready-made <Link href="/emoji-combos" style={linkStyle}>emoji combos</Link> for bios and captions, browsable by vibe.</li>
              <li><Link href="/kaomoji" style={linkStyle}>Kaomoji</Link> — Japanese text faces like (＾▽＾) and ʕ•ᴥ•ʔ, sorted by mood and style.</li>
              <li><Link href="/fancy-text" style={linkStyle}>Fancy text</Link> generators that turn plain words into 𝓼𝓬𝓻𝓲𝓹𝓽, 𝔤𝔬𝔱𝔥𝔦𝔠, ꜱᴍᴀʟʟ ᴄᴀᴘꜱ and dozens of other styles.</li>
              <li><Link href="/aesthetic" style={linkStyle}>Aesthetic symbol kits</Link> and <Link href="/bio-templates" style={linkStyle}>bio templates</Link> for Instagram, TikTok and Discord.</li>
              <li>Handy tools — a <Link href="/username-generator" style={linkStyle}>username generator</Link>, character counter, and translators for Morse code, binary, braille and runes.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>How we keep characters accurate</h2>
            <p style={{ marginBottom: 10 }}>
              A symbol is only useful if it actually shows up when you paste it. Two things can go wrong: a character can be the wrong one (a look-alike that means something different), or it can render as an empty &ldquo;tofu&rdquo; box on a device whose fonts don&apos;t support it. We take both seriously.
            </p>
            <p>
              Everything on CopyChars is standard Unicode, identified by its official codepoint rather than guessed at. Our symbol sets are curated and machine-checked: we strip out replacement characters, private-use glyphs and rare exotic-script characters that commonly fail to display, and we favour characters with broad support across modern iOS, Android, Windows and macOS. When a guide tells you how to type something, the shortcuts and HTML entities are verified against the underlying Unicode data, not pulled from memory.
            </p>
          </section>

          <section>
            <h2 style={h2}>Who it&apos;s for</h2>
            <p>
              CopyChars is built for anyone decorating a space online or finishing a document: students dropping a degree sign or Greek letter into homework, creators styling an Instagram or TikTok bio, gamers building a username, developers grabbing an HTML entity, and people who just want to add a ♡ or a ʕ•ᴥ•ʔ to a message. Because everything is plain Unicode text, it works the same in a bio field, a caption, a Discord chat, a spreadsheet or a code comment.
            </p>
          </section>

          <section>
            <h2 style={h2}>Free, and how it stays that way</h2>
            <p>
              CopyChars is completely free to use, with no paywalls and no account required. The site is supported by advertising, which is what keeps every tool open to everyone. Your clipboard activity and anything you type into a generator stay in your browser — see our <Link href="/privacy" style={linkStyle}>Privacy Policy</Link> for the details on data and cookies.
            </p>
          </section>

          <section>
            <h2 style={h2}>Get in touch</h2>
            <p>
              Found a character that renders wrong, or want to suggest something we should add? We&apos;d genuinely like to hear it — email <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>. You can also share your own emoji combinations on the <Link href="/community-combos" style={linkStyle}>community combos</Link> page.
            </p>
          </section>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 40 }}>
          <Link href="/symbols" className="cat-pill">Browse Symbols</Link>
          <Link href="/emoji" className="cat-pill">Emoji</Link>
          <Link href="/kaomoji" className="cat-pill">Kaomoji</Link>
          <Link href="/blog" className="cat-pill">Guides</Link>
        </div>
      </article>
    </>
  );
}
