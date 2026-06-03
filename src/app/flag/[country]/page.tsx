import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForFlag } from "@/lib/related";
import { FLAGS, getFlag, flagEmoji, flagCodePoints } from "@/data/flags";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";
import TwemojiImg from "@/components/TwemojiImg";
import { twemojiSvgUrl } from "@/lib/twemoji";

interface Props { params: Promise<{ country: string }> }

export async function generateStaticParams(): Promise<Array<{ country: string }>> {
  return FLAGS.map(f => ({ country: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const f = getFlag(country);
  if (!f) return {};
  const glyph = flagEmoji(f.a2);
  // No "| CopyChars" suffix here — layout.tsx's title template adds it once.
  // (Including it would double the suffix, as the legacy emoji pages do.)
  const title = `${f.name} Flag Emoji ${glyph} — Copy & Paste`;
  const description = `Copy the ${f.name} flag emoji (${glyph}) for free. Paste the ${f.name} flag into Instagram, TikTok, WhatsApp, Discord or any app. ISO code ${f.a2} / ${f.a3}, Unicode ${flagCodePoints(f.a2)}.`;
  const url = `https://www.copychars.com/flag/${f.slug}`;
  const lower = f.name.toLowerCase();
  return {
    title,
    description,
    keywords: [
      `${lower} flag`,
      `${lower} flag emoji`,
      `${lower} flag copy paste`,
      `${lower} flag emoji copy`,
      `${f.a2.toLowerCase()} flag`,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/flag/${f.slug}`),
  };
}

const REGION_OPENERS: Record<string, (name: string, glyph: string) => string> = {
  Africa: (n, g) => `The ${n} flag emoji (${g}) represents ${n}, a country in Africa, in the Unicode emoji standard.`,
  Americas: (n, g) => `The ${n} flag emoji (${g}) represents ${n}, a country or territory in the Americas, in the Unicode emoji standard.`,
  Asia: (n, g) => `The ${n} flag emoji (${g}) represents ${n}, a country or territory in Asia, in the Unicode emoji standard.`,
  Europe: (n, g) => `The ${n} flag emoji (${g}) represents ${n}, a country or territory in Europe, in the Unicode emoji standard.`,
  Oceania: (n, g) => `The ${n} flag emoji (${g}) represents ${n}, a country or territory in Oceania, in the Unicode emoji standard.`,
  Antarctica: (n, g) => `The ${n} flag emoji (${g}) represents the ${n} territory in the Unicode emoji standard.`,
};

export default async function FlagDetailPage({ params }: Props) {
  const { country } = await params;
  const f = getFlag(country);
  if (!f) notFound();

  const flag = f!;
  const glyph = flagEmoji(flag.a2);
  const cps = flagCodePoints(flag.a2);

  // Neighbours: same region, rotated to start just after this country and wrap
  // around — so every page shows a DIFFERENT, non-templated set (avoids the
  // "thin/duplicate" signal you get when every page lists the same first N).
  const regionList = FLAGS.filter(n => n.region === flag.region);
  const selfIdx = regionList.findIndex(n => n.slug === flag.slug);
  const neighbours = [
    ...regionList.slice(selfIdx + 1),
    ...regionList.slice(0, selfIdx),
  ].slice(0, 23);

  const baseUrl = "https://www.copychars.com";

  // FAQ — the SAME array drives the visible Q&A and the FAQPage schema, so the
  // structured data always matches on-page text (Google requirement).
  const faqs = [
    {
      q: `How do I copy the ${flag.name} flag emoji?`,
      a: `Click the ${glyph} flag button above to copy the ${flag.name} flag emoji to your clipboard, then paste it anywhere with Ctrl+V (Windows / Linux) or Cmd+V (Mac). It works in Instagram, TikTok, WhatsApp, Discord, and any app that supports emoji.`,
    },
    {
      q: `Why does the ${flag.name} flag show as the letters ${flag.a2} instead of a flag?`,
      a: `On Windows, flag emoji render as the two-letter country code (${flag.a2}) because the built-in Segoe UI Emoji font does not include flag artwork. The character itself is still correct — it is the regional indicator pair ${cps} — and it displays as a real ${flag.name} flag on iPhone, iPad, Mac, Android, and most web browsers.`,
    },
    {
      q: `What is the Unicode for the ${flag.name} flag emoji?`,
      a: `The ${flag.name} flag is encoded as two Regional Indicator Symbols, ${cps}, which spell its ISO 3166-1 code ${flag.a2}. Combined, they form the single flag emoji ${glyph}.`,
    },
    {
      q: `Can I use the ${flag.name} flag emoji on Instagram and iPhone?`,
      a: `Yes. The ${flag.name} flag emoji ${glyph} is part of the Unicode emoji standard, so you can paste it into Instagram bios and captions, iPhone and Android messages, TikTok, Discord, and more — no app or download needed.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Flags", item: `${baseUrl}/flags` },
          { "@type": "ListItem", position: 3, name: `${flag.name} Flag`, item: `${baseUrl}/flag/${flag.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(f2 => ({
          "@type": "Question",
          name: f2.q,
          acceptedAnswer: { "@type": "Answer", text: f2.a },
        })),
      },
      {
        "@type": "DefinedTerm",
        name: `${flag.name} Flag Emoji`,
        description: `${flag.name} (${glyph}) is the Unicode flag emoji for ${flag.name}, built from the regional indicators ${cps} (ISO 3166-1 code ${flag.a2} / ${flag.a3}).`,
        termCode: cps,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Unicode Flag Emoji",
          url: "https://unicode.org/emoji/",
        },
        url: `${baseUrl}/flag/${flag.slug}`,
      },
    ],
  };

  const opener = (REGION_OPENERS[flag.region] ?? REGION_OPENERS.Asia)(flag.name, glyph);

  return (
    <>
      <CopyToast />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/flags" style={{ color: "var(--text3)", textDecoration: "none" }}>Flags</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href={`/flags#${flag.region.toLowerCase()}`} style={{ color: "var(--text3)", textDecoration: "none" }}>{flag.region}</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{flag.name}</span>
        </div>

        {/* Main layout */}
        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>

          {/* Hero */}
          <div style={{ width: 320, flexShrink: 0, maxWidth: "100%" }}>
            <div
              style={{
                position: "relative",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 28,
                padding: "56px 32px 40px",
                textAlign: "center",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 200,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%)",
                  pointerEvents: "none",
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <EmojiCopyButton glyph={glyph} name={`${flag.name} flag`} imageSrc={twemojiSvgUrl(glyph)} />
                <h1
                  className="font-display"
                  style={{
                    marginTop: 24,
                    marginBottom: 6,
                    fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                    fontWeight: 800,
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {flag.name} Flag Emoji
                </h1>
                <Link
                  href={`/flags#${flag.region.toLowerCase()}`}
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {flag.region}
                </Link>
              </div>
            </div>
          </div>

          {/* Right pane */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About the {flag.name} flag</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                {opener} Flag emoji are not single characters — they are built from two{" "}
                <strong style={{ color: "var(--text)" }}>regional indicator symbols</strong> that spell the country&apos;s ISO 3166-1 code. For {flag.name} that code is <strong style={{ color: "var(--text)" }}>{flag.a2}</strong> (alpha-2) / {flag.a3} (alpha-3), so the flag is the code points {cps} joined together to render as {glyph}.
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click the flag above to copy it, then paste it with Ctrl+V or Cmd+V. The <strong style={{ color: "var(--text)" }}>{flag.name.toLowerCase()} flag copy paste</strong> works in Instagram bios, TikTok and Twitter / X posts, WhatsApp, Discord and more, on iPhone, Android and Mac. On Windows you may see the two letters <strong style={{ color: "var(--text)" }}>{flag.a2}</strong> instead of the flag — that is a font limitation in Segoe UI Emoji, not an error; the character is still the correct {flag.name} flag and shows properly on other devices.
              </p>
            </div>

            {/* Specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Unicode (regional indicators)</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)", wordBreak: "break-all" }}>{cps}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>ISO Alpha-2</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{flag.a2}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>ISO Alpha-3</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{flag.a3}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Continent</div>
                <Link href={`/flags#${flag.region.toLowerCase()}`} style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)", textDecoration: "none" }}>{flag.region}</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ — visible text mirrors the FAQPage schema above. */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>FAQ</div>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            {flag.name} flag emoji — questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "18px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: 0, marginBottom: 8 }}>{item.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Neighbouring flags (same continent) */}
        {neighbours.length > 0 && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More flags</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {flag.region} flag emoji
                </h2>
              </div>
              <Link href={`/flags#${flag.region.toLowerCase()}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
              {neighbours.map((n) => (
                <Link
                  key={n.slug}
                  href={`/flag/${n.slug}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <TwemojiImg glyph={flagEmoji(n.a2)} size={29} />
                  <span className="symbol-name">{n.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedLinks
          links={relatedForFlag()}
          heading="Related — emoji, symbols & bio tools"
        />
      </div>
    </>
  );
}
