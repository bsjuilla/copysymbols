import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Smiley Face Text Symbols ☺ ツ Copy & Paste",
  description: "Copy text smiley faces instantly. Classic :) emoticons, Unicode smileys ☺ ☻ ツ, and kawaii faces. Works everywhere — no emoji required.",
  ...canonical("/smiley-face-text"),
};

const unicodeSmileys = [
  { symbol: "☺", name: "White Smiling Face" },
  { symbol: "☻", name: "Black Smiling Face" },
  { symbol: "ツ", name: "Katakana Tsu (smile)" },
  { symbol: "シ", name: "Katakana Shi (grin)" },
  { symbol: "ϡ", name: "Coptic Letter Shima" },
  { symbol: "⌣", name: "Smile (arc)" },
  { symbol: "ʘ", name: "Bilabial Click" },
  { symbol: "ಠ", name: "Kannada Letter" },
  { symbol: "ω", name: "Omega (cute mouth)" },
  { symbol: "▽", name: "White Down Triangle" },
  { symbol: "◡", name: "Lower Half Circle" },
  { symbol: "益", name: "CJK Rage face" },
];

const classicFaces = [
  ":)", ":-)", ":D", ":-D", "xD", "=)", ":P", ";)", "T_T", ">_<", "*_*", "^_^", "^.^", ":o", "O_o",
];

const faqs = [
  { q: "What is a text smiley face?", a: "A text smiley is a face made from ordinary characters rather than a colour emoji. Some are Western emoticons you read sideways, like :) and :D, where the colon is the eyes and the bracket is the mouth. Others are single Unicode characters such as ☺ or ツ. Because they are plain text, they work in places that strip emoji and they never change colour or style between devices." },
  { q: "How do I type the ツ smiley?", a: "ツ is the Japanese katakana character 'tsu', which happens to look like a grinning face. The easiest way is to click it above to copy it. It is popular in gaming names and bios because it reads as a cheeky smile and works almost everywhere as plain text." },
  { q: "Why use text smileys instead of emoji?", a: "Three reasons. They look identical on every device because they follow your text font, not a platform's emoji art. They work in fields that block or strip emoji, such as some usernames and form inputs. And the sideways emoticons carry a retro, low-key tone that a bright emoji does not." },
  { q: "What does ^_^ mean?", a: "^_^ is a happy or content face, with the carets as closed, smiling eyes. It comes from the Japanese kaomoji style, which you read straight rather than sideways. Variants include ^.^ and the wider ^o^ for a more excited expression." },
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
        { "@type": "ListItem", position: 3, name: "Smiley Face Text", item: `${baseUrl}/smiley-face-text` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Smiley Face Text Symbols",
      itemListElement: [
        ...unicodeSmileys.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${it.symbol} ${it.name}`,
        })),
        ...classicFaces.map((s, i) => ({
          "@type": "ListItem",
          position: unicodeSmileys.length + i + 1,
          name: s,
        })),
      ],
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

export default function SmileyFaceTextPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Smiley Face Text ☺
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Classic text emoticons and Unicode smiley symbols. No emoji — just text characters that work everywhere.
      </p>
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Unicode Smileys</h2>
      <CopySymbolGrid items={unicodeSmileys} columns="repeat(auto-fill, minmax(140px, 1fr))" />
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Classic Emoticons</h2>
      <CopySymbolGrid items={classicFaces.map(s => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(100px, 1fr))" />

      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={subH2}>Sideways, straight, and single-character faces</h2>
        <p style={proseP}>
          Text smileys come in three flavours. The Western <strong>emoticon</strong> is read with your head tilted left, building a face from punctuation: <strong>:)</strong>, <strong>;)</strong>, <strong>:D</strong>. The Japanese <strong>kaomoji</strong> is read straight on, so the eyes and mouth sit the right way up: <strong>^_^</strong>, <strong>&gt;_&lt;</strong>, <strong>*_*</strong>. And then there are <strong>single Unicode characters</strong> that already look like a face on their own, such as ☺ or ツ. All three are just text, so they paste anywhere and keep the same look on every screen.
        </p>
        <h2 className="font-display" style={subH2}>Where to use them</h2>
        <p style={proseP}>
          Text faces shine in places that resist emoji. A gaming username often allows ツ but not 😀. A form field, a code comment, or an older chat app may strip colour emoji but keep <strong>:)</strong>. And the low-key, slightly retro feel of an emoticon suits a caption where a bright yellow emoji would feel like too much. For a much larger collection of straight-read faces, the kaomoji library has hundreds sorted by mood.
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
        <Link href="/kaomoji" className="cat-pill">Kaomoji Faces</Link>
        <Link href="/lenny-face" className="cat-pill">Lenny Faces</Link>
        <Link href="/emoji" className="cat-pill">Emoji</Link>
        <Link href="/gaming-symbols" className="cat-pill">Gaming Symbols</Link>
      </div>
    </div>
  );
}

const subH2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.01em" };
const proseP: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 };
