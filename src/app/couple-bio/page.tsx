import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";
import { relatedForEmoji } from "@/lib/related";
import { loveSymbols, coupleCombos, coupleKaomoji, matchingBios } from "@/data/couple";
import CopyToast from "@/components/CopyToast";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import EmojiCopyButton from "@/components/EmojiCopyButton";
import RelatedLinks from "@/components/RelatedLinks";

const title = "Couple Bio Symbols & Matching Bios — Copy & Paste";
const description =
  "Matching bios for couples, love symbols, couple emoji combos and love kaomoji to copy and paste for Instagram, TikTok and Discord.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "matching bios for couples",
    "couple bio copy paste",
    "love symbols copy paste",
    "couple emojis",
    "couple bio symbols",
  ],
  openGraph: { title, description, url: "https://www.copychars.com/couple-bio", type: "article", siteName: "CopyChars" },
  twitter: { card: "summary", title, description },
  ...canonical("/couple-bio"),
};

const faqs = [
  {
    q: "What are matching bios for couples?",
    a: "Matching bios are short, paired profile descriptions that two partners use together — like “his queen” and “her king” — so your Instagram, TikTok or Discord bios visibly connect. Copy one block into each partner’s profile and replace the placeholders with your own names.",
  },
  {
    q: "How do I use couple symbols in my bio?",
    a: "Tap any love symbol, emoji combo or kaomoji above to copy it, then paste it straight into your bio, caption or username. They are real Unicode characters, so they work anywhere text does and you can mix several to frame your matching bios.",
  },
  {
    q: "Do couple emojis work on Instagram and TikTok?",
    a: "Yes — these are standard Unicode emoji and characters, so they render on Instagram, TikTok, Discord, Twitter/X and most modern apps. A few decorative glyphs may look slightly different depending on your device or font.",
  },
  {
    q: "What symbols mean love?",
    a: "The heart is the universal symbol of love: ❤ ♡ ♥ ❤️, along with variants like ❤️‍🔥 and the infinity sign ∞ for everlasting love. Copy any of them from the Love symbols section above to add romance to your couple bio.",
  },
];

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Couple Bio Symbols", item: `${baseUrl}/couple-bio` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Couple Bio Symbols & Emoji",
      itemListElement: [...loveSymbols, ...coupleCombos].map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const h2Style = { fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 } as const;

export default function CoupleBioPage() {
  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>Couple Bio Symbols</span>
        </div>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: 12 }}>💑</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 8 }}>
            Couple Bio Symbols &amp; Matching Bios
          </h1>
        </div>

        {/* ── LEAD (answer-first) ─────────────────────────────────────── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            Copy love symbols, couple emoji combos and matching bios for you and your partner&apos;s profiles.
            Everything below is one tap to copy, so you can pair up your Instagram, TikTok and Discord bios in seconds.
          </p>
        </div>

        {/* ── LOVE SYMBOLS ────────────────────────────────────────────── */}
        <h2 className="font-display" style={h2Style}>Love symbols</h2>
        <CopySymbolGrid items={loveSymbols.map(s => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(96px, 1fr))" />

        {/* ── COUPLE EMOJI COMBOS ─────────────────────────────────────── */}
        <h2 className="font-display" style={h2Style}>Couple emoji combos</h2>
        <CopySymbolGrid items={coupleCombos.map(s => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(110px, 1fr))" />

        {/* ── LOVE KAOMOJI ────────────────────────────────────────────── */}
        <h2 className="font-display" style={h2Style}>Love kaomoji</h2>
        <CopySymbolGrid items={coupleKaomoji.map(s => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(150px, 1fr))" />

        {/* ── MATCHING BIOS ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="font-display" style={{ ...h2Style, marginBottom: 8 }}>Matching bios for couples</h2>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 24, maxWidth: 640 }}>
            Each pair gives Partner 1 and Partner 2 a matching bio. Copy one into each profile, then replace
            placeholders like {`{PARTNER}`}, {`{NAME}`} and {`{DATE}`} with your own details.
          </p>

          <div style={{ display: "grid", gap: 20 }}>
            {matchingBios.map(m => (
              <div key={m.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 24px 20px" }}>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{m.label}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {([
                    { tag: "Partner 1", bio: m.partnerA },
                    { tag: "Partner 2", bio: m.partnerB },
                  ] as const).map(({ tag, bio }) => (
                    <div key={tag} style={{ flex: "1 1 240px", minWidth: 0, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px" }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 12 }}>{tag}</div>
                      <pre style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "1rem", color: "var(--text)", margin: "0 0 16px", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.7 }}>{bio}</pre>
                      <EmojiCopyButton glyph={bio} name={`${m.label} — ${tag} bio`} size="1.4rem" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </section>

        <RelatedLinks links={relatedForEmoji()} heading="Related — symbols, emoji & bio tools" />

      </div>
    </>
  );
}
