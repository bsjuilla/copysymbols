import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AESTHETICS, getAesthetic, AESTHETIC_FONT } from "@/data/aesthetics";
import { findStyle } from "@/lib/fancy-text-styles";
import { canonical } from "@/lib/canonical";
import { relatedForEmoji } from "@/lib/related";
import CopyToast from "@/components/CopyToast";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import EmojiCopyButton from "@/components/EmojiCopyButton";
import RelatedLinks from "@/components/RelatedLinks";

interface Props { params: Promise<{ vibe: string }> }

export async function generateStaticParams(): Promise<Array<{ vibe: string }>> {
  return AESTHETICS.map(a => ({ vibe: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vibe } = await params;
  const a = getAesthetic(vibe);
  if (!a) return {};
  const title = `${a.name} Aesthetic Symbols — Copy & Paste for Bio`;
  const description = `${a.tagline}. Copy ${a.name} symbols, kaomoji, dividers and a bio template to paste into your Instagram, TikTok or Discord bio.`;
  return {
    title,
    description,
    keywords: a.searchTerms,
    openGraph: { title, description, url: `https://www.copychars.com/aesthetic/${vibe}`, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/aesthetic/${vibe}`),
  };
}

export default async function AestheticDetailPage({ params }: Props) {
  const { vibe } = await params;
  const a = getAesthetic(vibe);
  if (!a) notFound();

  const baseUrl = "https://www.copychars.com";
  const firstSentence = a!.description.split(". ")[0] + ".";

  // The vibe's signature font — the element that turns the page into a complete
  // "kit" (font + symbols + kaomoji + dividers + bio). Falls back to bold-script.
  const fontStyle = findStyle(AESTHETIC_FONT[a!.slug] ?? "bold-script") ?? findStyle("bold-script")!;
  const fontSamples = [a!.name.toLowerCase(), "your name", "aesthetic", "bestie"]
    .map(w => ({ symbol: fontStyle.transform(w), name: `"${w}"` }));

  const faqs = [
    {
      q: `What is the ${a!.name} aesthetic?`,
      a: firstSentence,
    },
    {
      q: `How do I use ${a!.name} symbols in my bio?`,
      a: `Click any symbol or divider above to copy it, then paste it into your Instagram, TikTok or Discord bio. They are real Unicode characters, so they work anywhere text does — bios, captions, usernames and messages.`,
    },
    {
      q: `Do ${a!.name} symbols work on Instagram and TikTok?`,
      a: `Yes — these are standard Unicode characters, so they render on Instagram, TikTok, Discord, Twitter/X and most modern apps. A few rare decorative glyphs may look slightly different depending on the device or font.`,
    },
    {
      q: `What kaomoji fit the ${a!.name} aesthetic?`,
      a: `Kaomoji like ${a!.kaomoji.slice(0, 3).join("  ")} match the ${a!.name} vibe. Copy any of them from the Kaomoji section above and drop them into your bio or captions.`,
    },
    {
      q: `What font goes with the ${a!.name} aesthetic?`,
      a: `The ${fontStyle.label} font matches the ${a!.name} vibe — for example ${fontStyle.transform(a!.name.toLowerCase())}. Copy a sample from the Font section above, or type your own name in it on the Fancy Text generator.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Aesthetic Symbols", item: `${baseUrl}/aesthetic` },
          { "@type": "ListItem", position: 3, name: a!.name, item: `${baseUrl}/aesthetic/${vibe}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${a!.name} Aesthetic Symbols`,
        itemListElement: a!.symbols.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a: ans }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: ans },
        })),
      },
    ],
  };

  const relatedAesthetics = a!.related
    .map(slug => getAesthetic(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/aesthetic" style={{ color: "var(--text3)", textDecoration: "none" }}>Aesthetic Symbols</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{a!.name}</span>
        </div>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: 12 }}>{a!.emoji}</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 8 }}>
            {a!.name} Aesthetic Symbols
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>
            {a!.tagline}
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text3)", lineHeight: 1.6, marginTop: 10 }}>
            The complete {a!.name.toLowerCase()} kit — a matching font, symbols, kaomoji, dividers and a ready-to-paste bio, all in one place.
          </p>
        </div>

        {/* ── DEFINITION BLOCK (AI-SEO lead) ──────────────────────────── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            {a!.description}
          </p>
        </div>

        {/* ── FONT ────────────────────────────────────────────────────── */}
        <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
          {a!.name} Font
        </h2>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 16, maxWidth: 640 }}>
          The signature {a!.name} look uses the <strong>{fontStyle.label}</strong> font. Tap a sample to copy it, or{" "}
          <Link href={`/fancy-text/${fontStyle.slug}`} style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            type your own name in {fontStyle.label}
          </Link>.
        </p>
        <CopySymbolGrid items={fontSamples} columns="repeat(auto-fill, minmax(160px, 1fr))" />

        {/* ── SYMBOLS ─────────────────────────────────────────────────── */}
        <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          {a!.name} Symbols
        </h2>
        <CopySymbolGrid items={a!.symbols.map(s => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(96px, 1fr))" />

        {/* ── KAOMOJI ─────────────────────────────────────────────────── */}
        <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          {a!.name} Kaomoji
        </h2>
        <CopySymbolGrid items={a!.kaomoji.map(k => ({ symbol: k, name: k }))} columns="repeat(auto-fill, minmax(150px, 1fr))" />

        {/* ── DIVIDERS ────────────────────────────────────────────────── */}
        <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          {a!.name} Dividers
        </h2>
        <CopySymbolGrid items={a!.dividers.map(d => ({ symbol: d, name: d }))} columns="repeat(auto-fill, minmax(280px, 1fr))" />

        {/* ── BIO TEMPLATE ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
            {a!.name} Bio Template
          </h2>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 16, maxWidth: 640 }}>
            Copy this ready-made bio, then replace the {`{PLACEHOLDERS}`} with your own details and paste it into your profile.
          </p>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 28px 24px", position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 160, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.10), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <pre style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "var(--text)", margin: "0 0 20px", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.8 }}>{a!.bioTemplate}</pre>
              <EmojiCopyButton glyph={a!.bioTemplate} name={`${a!.name} bio template`} size="2rem" />
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {faqs.map(({ q, a: ans }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{ans}</p>
            </div>
          ))}
        </section>

        {/* ── RELATED AESTHETICS ──────────────────────────────────────── */}
        {relatedAesthetics.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
              Related aesthetics
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {relatedAesthetics.map(r => (
                <Link
                  key={r.slug}
                  href={`/aesthetic/${r.slug}`}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
                >
                  <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{r.emoji}</span>
                  <span>
                    <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{r.name} aesthetic symbols</span>
                    <span style={{ display: "block", fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{r.tagline}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedLinks links={relatedForEmoji()} heading="Related — emoji, kaomoji & bio tools" />

      </div>
    </>
  );
}
