import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForKaomoji } from "@/lib/related";
import {
  allKaomoji,
  getKaomojiBySlug,
  getKaomojiByMood,
  type KaomojiWithSlug,
} from "@/data/all-kaomoji";
import { kaomojiCategories } from "@/data/kaomoji";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return allKaomoji.map((k) => ({ slug: k.slug }));
}

export const dynamicParams = false;

function moodName(moodId: string): string {
  return kaomojiCategories.find((c) => c.id === moodId)?.name ?? moodId;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const k = getKaomojiBySlug(slug);
  if (!k) return {};
  const title = `${k.name} Kaomoji — Copy & Paste ${k.face}`;
  const description = `Copy & paste the ${k.name} kaomoji — ${k.face} — in one click. A cute Japanese text face for the ${moodName(k.mood)} mood that works in Discord, TikTok, Instagram bios and messages. Tap to copy, then paste anywhere.`;
  const url = `https://www.copychars.com/kaomoji/${slug}`;
  return {
    title,
    description,
    keywords: [`${k.name.toLowerCase()} kaomoji`, `${k.name.toLowerCase()} emoticon`, `copy ${k.name.toLowerCase()}`, ...k.keywords],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "CopyChars",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    // Duplicate-named kaomoji (e.g. 4x "Rage Face") would otherwise compete
    // for the same canonical signal — GSC reported /kaomoji/delighted-2 as
    // such on 2026-05-09. First occurrence stays indexed; -2, -3, ... go noindex.
    ...(k.isDuplicate ? { robots: { index: false, follow: true } } : {}),
    ...canonical(`/kaomoji/${slug}`),
  };
}

export default async function KaomojiDetailPage({ params }: Props) {
  const { slug } = await params;
  const k = getKaomojiBySlug(slug);
  if (!k) notFound();

  const mName = moodName(k!.mood);

  const related: KaomojiWithSlug[] = getKaomojiByMood(k!.mood)
    .filter((r) => r.slug !== k!.slug)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Kaomoji", item: `${baseUrl}/kaomoji` },
          { "@type": "ListItem", position: 3, name: k!.name, item: `${baseUrl}/kaomoji/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${k!.name} Kaomoji`,
        description: `${k!.name} ${k!.face} is a Japanese text emoticon (kaomoji) in the ${mName} mood. Built from Unicode characters and works in any app.`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Kaomoji — Japanese Text Emoticons",
          url: `${baseUrl}/kaomoji`,
        },
        url: `${baseUrl}/kaomoji/${slug}`,
      },
    ],
  };

  // Kaomoji can be wide. Scale font size down for very long faces so they
  // still fit the hero card on mobile.
  const heroSize = k!.face.length > 16 ? "clamp(1.4rem, 4vw, 2.6rem)" : "clamp(2rem, 6vw, 4rem)";

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
          <Link href="/kaomoji" style={{ color: "var(--text3)", textDecoration: "none" }}>Kaomoji</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{k!.name}</span>
        </div>

        {/* Main layout */}
        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>

          {/* Hero */}
          <div style={{ width: 360, flexShrink: 0, maxWidth: "100%" }}>
            <div
              style={{
                position: "relative",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 28,
                padding: "56px 24px 40px",
                textAlign: "center",
                overflow: "hidden",
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
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <EmojiCopyButton glyph={k!.face} name={k!.name} size={heroSize} />
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
                  {k!.name} Kaomoji
                </h1>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {mName}
                </span>
              </div>
            </div>
          </div>

          {/* Right pane */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this kaomoji</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: "var(--text)" }}>{k!.name}</strong> is a Japanese kaomoji (顔文字) in the {mName} mood. Click the face above to copy it to your clipboard, then paste it into Discord, Twitter, Instagram, WhatsApp, or any text field. Kaomoji are read straight — no head-tilting required.
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Want to <strong style={{ color: "var(--text)" }}>copy and paste {k!.name.toLowerCase()} kaomoji</strong>? You&apos;re in the right place — every kaomoji on CopyChars is built from standard Unicode characters and works on every modern device.
              </p>
            </div>

            {/* Specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Mood</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{mName}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Length</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)" }}>{Array.from(k!.face).length} chars</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {k!.keywords.map((kw) => (
                    <span key={kw} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More from this mood</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {mName} Kaomoji
                </h2>
              </div>
              <Link href="/kaomoji" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/kaomoji/${r.slug}`}
                  className="kaomoji-card"
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  prefetch={false}
                >
                  <div className="kaomoji-face">{r.face}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--accent)" }}>open page →</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedLinks
          links={relatedForKaomoji()}
          heading="Related — Lenny faces, emoji & bio tools"
        />
      </div>
    </>
  );
}
