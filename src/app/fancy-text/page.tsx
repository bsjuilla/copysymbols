import FancyTextClient from "./FancyTextClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";
import { STYLES } from "@/lib/fancy-text-styles";

export const metadata: Metadata = {
  title: `Fancy Text Generator — ${STYLES.length} Stylish Unicode Fonts to Copy & Paste`,
  description: `Generate fancy text in ${STYLES.length} styles: bold, italic, script, old-english, bubble, squared, strikethrough, faux Cyrillic and more. Works on Instagram, TikTok, X, Discord, WhatsApp. One click to copy.`,
  keywords: ["fancy text generator","stylish text","cursive text generator","bold text copy paste","instagram fonts","discord fonts","fancy letters","unicode font converter","aesthetic text generator","old english text"],
  ...canonical("/fancy-text"),
};

const faqs = [
  {
    q: "What is a fancy text generator?",
    a: `A fancy text generator converts plain text into stylish Unicode characters that look like fonts but are actually different code points. The ${STYLES.length} styles on this page (bold, italic, script, old-english, bubble, squared, and more) come from real Unicode blocks — Mathematical Alphanumeric Symbols, Enclosed Alphanumerics, and combining marks — so the output is plain text, not formatting or images.`,
  },
  {
    q: "Where can I use the fancy text I copy?",
    a: "Anywhere that accepts text input: Instagram bios and captions, TikTok captions and bios, Discord usernames and messages, X (Twitter) posts, WhatsApp messages, Facebook posts, Tumblr, Reddit, YouTube comments and descriptions, LinkedIn posts. The text is real Unicode characters, so it pastes the same way as regular text.",
  },
  {
    q: "Why does my fancy text show as boxes or question marks on some devices?",
    a: "A small number of older devices or apps don't ship the fonts that render the more obscure Unicode blocks — for example, Mathematical Bold Italic on a basic feature phone. On modern iOS, Android, Windows, and Mac, every style on this page renders correctly. If yours doesn't, try the Sans Bold or Bold style — those use the most widely-supported Unicode block.",
  },
  {
    q: "Can I use fancy text in my Instagram username?",
    a: "Mostly no. Instagram restricts usernames to ASCII letters, numbers, periods, and underscores. Fancy Unicode characters work in your bio and captions but not your @handle. The same restriction applies to TikTok usernames. Discord, X, and WhatsApp display names accept full Unicode.",
  },
  {
    q: "Is there a difference between cursive and script text?",
    a: "On this page they're the same family — Mathematical Script characters (U+1D49C onward). \"Cursive\" and \"Script\" both render as italic, calligraphic letters. Bold Cursive and Bold Script use a heavier weight from the same Unicode block.",
  },
  {
    q: "Does fancy text work on Twitter / X?",
    a: "Yes. X (Twitter) accepts the full Unicode range and the character count uses Unicode code points, so a bold letter (𝐀) costs 2 weighted characters versus 1 for plain A. Plan a tweet using fancy text for the first few words only — for emphasis — and keep the rest plain to maximize what fits in 280 characters.",
  },
  {
    q: "What is faux Cyrillic / faux Greek?",
    a: "Latin letters replaced by visually similar Cyrillic or Greek characters — so \"Russia\" becomes \"Яцssiа\". The result reads as English to someone glancing at it but uses entirely different code points. Useful for stylised usernames, brand riffs, and avoiding text-replacement filters.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FancyTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <FancyTextClient />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 16 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {faqs.map(f => (
              <div key={f.q}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
