// Per-emoji detail page. Pre-rendered at build time via generateStaticParams
// so every emoji in src/data/emoji.ts (~1074 routes) ships as a static HTML
// document. This is the SEO win for "hotel emoji", "rocket emoji", etc.
//
// To add a new emoji: edit src/data/emoji.ts, then re-run `next build`.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  emoji,
  emojiCategories,
  getEmojiBySlug,
  type EmojiRecord,
} from "@/data/emoji";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return emoji.map((e) => ({ slug: e.id }));
}

// Pre-rendered routes 404 for unknown slugs at build time (no on-demand
// rendering). This keeps the surface area predictable and crawl-friendly.
export const dynamicParams = false;

function codepointsOf(glyph: string): string[] {
  return Array.from(glyph).map((ch) => {
    const cp = ch.codePointAt(0);
    return cp != null ? "U+" + cp.toString(16).toUpperCase().padStart(4, "0") : "";
  }).filter(Boolean);
}

function categoryName(catId: string): string {
  return emojiCategories.find((c) => c.id === catId)?.name ?? catId;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getEmojiBySlug(slug);
  if (!e) return {};
  const title = `${e.name} Emoji ${e.emoji} — Copy & Paste | CopyChars`;
  const description = `Copy the ${e.name} emoji (${e.emoji}) for free. Paste ${e.emoji} into Instagram, Twitter, WhatsApp, Discord or any app. Part of the ${categoryName(e.category)} category.`;
  const url = `https://www.copychars.com/emoji/${slug}`;
  return {
    title,
    description,
    keywords: [`${e.name.toLowerCase()} emoji`, `copy ${e.name.toLowerCase()} emoji`, `${e.name.toLowerCase()} emoji copy paste`, ...e.keywords],
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
    ...canonical(`/emoji/${slug}`),
  };
}

export default async function EmojiDetailPage({ params }: Props) {
  const { slug } = await params;
  const e = getEmojiBySlug(slug);
  if (!e) notFound();

  const catName = categoryName(e!.category);
  const cps = codepointsOf(e!.emoji);

  // Related — same category, exclude self, take 12.
  const related: EmojiRecord[] = emoji
    .filter((r) => r.category === e!.category && r.id !== e!.id)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Emoji", item: `${baseUrl}/emoji` },
          { "@type": "ListItem", position: 3, name: e!.name, item: `${baseUrl}/emoji/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${e!.name} Emoji`,
        description: `${e!.name} (${e!.emoji}) is a Unicode emoji in the ${catName} category. Codepoints: ${cps.join(" ")}.`,
        termCode: cps.join(" "),
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Unicode Emoji",
          url: "https://unicode.org/emoji/",
        },
        url: `${baseUrl}/emoji/${slug}`,
      },
    ],
  };

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
          <Link href="/emoji" style={{ color: "var(--text3)", textDecoration: "none" }}>Emoji</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href={`/emoji#${e!.category}`} style={{ color: "var(--text3)", textDecoration: "none" }}>{catName}</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{e!.name}</span>
        </div>

        {/* Main layout */}
        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>

          {/* Hero */}
          <div style={{ width: 320, flexShrink: 0 }}>
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
                <EmojiCopyButton glyph={e!.emoji} name={e!.name} />
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
                  {e!.name} Emoji
                </h1>
                <Link
                  href={`/emoji#${e!.category}`}
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {catName}
                </Link>
              </div>
            </div>
          </div>

          {/* Right pane */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this emoji</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                The <strong style={{ color: "var(--text)" }}>{e!.name} emoji</strong> ({e!.emoji}) is part of the {catName} category in the Unicode emoji standard. Click the {e!.emoji} above to copy it to your clipboard, then paste it into Instagram captions, Twitter posts, WhatsApp messages, Discord chats, work documents, or anywhere else you write text.
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Looking for the <strong style={{ color: "var(--text)" }}>{e!.name.toLowerCase()} emoji copy and paste</strong>? You&apos;re in the right place — every emoji on CopyChars works on iPhone, Android, Mac, Windows and the web.
              </p>
            </div>

            {/* Specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Unicode</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)", wordBreak: "break-all" }}>{cps.join(" ") || "—"}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Category</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{catName}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {e!.keywords.map((k) => (
                    <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
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
                <div className="section-label">More from this category</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {catName} Emoji
                </h2>
              </div>
              <Link href={`/emoji#${e!.category}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/emoji/${r.id}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{r.emoji}</span>
                  <span className="symbol-name">{r.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
