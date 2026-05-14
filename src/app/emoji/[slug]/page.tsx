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

  // Build unique, content-rich description for this specific emoji.
  const meaningKeywords = e!.keywords
    .filter(k => !["emoji", e!.category, e!.name.toLowerCase()].includes(k.toLowerCase()))
    .slice(0, 4);
  const cpString = cps.join(" ");

  // Category-specific opening sentence varies the page copy across all categories.
  const categoryOpeners: Record<string, string> = {
    smileys:    `The ${e!.name} emoji (${e!.emoji}) is a face and expression emoji in the Unicode standard, used to convey specific emotions, moods, and reactions in digital conversations.`,
    people:     `The ${e!.name} emoji (${e!.emoji}) represents a person, gesture, or body-language expression in the Unicode emoji standard, widely used to personalise messages and add human context.`,
    animals:    `The ${e!.name} emoji (${e!.emoji}) depicts an animal or nature element from the Unicode emoji standard, popular in wildlife content, pet posts, and nature-themed messaging.`,
    food:       `The ${e!.name} emoji (${e!.emoji}) represents a food or drink item in the Unicode emoji standard, used in recipes, restaurant recommendations, and food-focused social media.`,
    travel:     `The ${e!.name} emoji (${e!.emoji}) is a travel, place, or transport emoji in the Unicode standard, used to describe destinations, journeys, and modes of getting around.`,
    objects:    `The ${e!.name} emoji (${e!.emoji}) represents an everyday object or symbol in the Unicode emoji standard, used to reference tools, tech, and tangible items in digital communication.`,
    activities: `The ${e!.name} emoji (${e!.emoji}) is an activities, sports, or hobbies emoji in the Unicode standard, used in posts about recreation, fitness, and leisure.`,
  };
  const opener = categoryOpeners[e!.category] ??
    `The ${e!.name} emoji (${e!.emoji}) is a Unicode emoji in the ${catName} category, used across digital platforms to add visual expression to text.`;

  const usageLine = meaningKeywords.length > 0
    ? `People commonly use ${e!.emoji} in contexts relating to ${meaningKeywords.join(", ")}.`
    : `It is recognised and rendered on iOS, Android, macOS, Windows, and all major web browsers.`;

  const techLine = `Its Unicode codepoint${cps.length > 1 ? "s are" : " is"} ${cpString} — part of the ${catName} block in the Unicode standard. You can copy ${e!.emoji} by clicking the button above, then paste it anywhere with Ctrl+V (Windows / Linux) or Cmd+V (Mac).`;

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
                {opener} {usageLine}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                {techLine} Paste it into Instagram captions, Twitter / X posts, WhatsApp messages, Discord, TikTok bios, or any other app — the <strong style={{ color: "var(--text)" }}>{e!.name.toLowerCase()} emoji copy paste</strong> works on iPhone, Android, Mac, and Windows without any additional software.
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
