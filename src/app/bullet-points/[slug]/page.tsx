import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  bullets,
  getBulletBySlug,
  getBulletsByCategory,
  bulletCategories,
  type BulletItem,
} from "@/data/collections/bullets";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return bullets.map(b => ({ slug: b.slug }));
}

export const dynamicParams = false;

function categoryMeta(categoryId: string) {
  return bulletCategories.find(c => c.id === categoryId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBulletBySlug(slug);
  if (!b) return {};
  const title = `${b.name} ${b.char} — Bullet Point Symbol Copy & Paste | CopyChars`;
  const description = `Copy the ${b.name} bullet (${b.char}) for free. ${b.usageNote} Paste into Word, Google Docs, Instagram, LinkedIn, Discord or anywhere you write lists.`;
  const url = `https://www.copychars.com/bullet-points/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${b.name.toLowerCase()} bullet`,
      `${b.char} copy paste`,
      `${b.name.toLowerCase()} symbol`,
      "bullet point copy paste",
      "list symbol",
      ...b.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/bullet-points/${slug}`),
  };
}

export default async function BulletDetailPage({ params }: Props) {
  const { slug } = await params;
  const b = getBulletBySlug(slug);
  if (!b) notFound();

  const catMeta = categoryMeta(b!.category);
  const related: BulletItem[] = getBulletsByCategory(b!.category)
    .filter(r => r.slug !== b!.slug)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const cps = Array.from(b!.char).map(ch => {
    const cp = ch.codePointAt(0);
    return cp != null ? "U+" + cp.toString(16).toUpperCase().padStart(4, "0") : "";
  }).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Bullet Points", item: `${baseUrl}/bullet-points` },
          { "@type": "ListItem", position: 3, name: b!.name, item: `${baseUrl}/bullet-points/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${b!.name} bullet`,
        description: `${b!.name} (${b!.char}) — ${b!.usageNote}`,
        termCode: b!.unicode || cps.join(" "),
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Unicode Bullet Point Symbols",
          url: `${baseUrl}/bullet-points`,
        },
        url: `${baseUrl}/bullet-points/${slug}`,
      },
    ],
  };

  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/bullet-points" style={{ color: "var(--text3)", textDecoration: "none" }}>Bullet Points</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{b!.name}</span>
        </div>

        {/* Hero + side panel */}
        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ width: 320, flexShrink: 0 }}>
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 28, padding: "56px 32px 40px", textAlign: "center" }}>
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%)", pointerEvents: "none", borderTopLeftRadius: 28, borderTopRightRadius: 28 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <EmojiCopyButton glyph={b!.char} name={b!.name} />
                <h1 className="font-display" style={{ marginTop: 24, marginBottom: 6, fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                  {b!.name} Bullet
                </h1>
                <Link href="/bullet-points" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {catMeta?.name ?? b!.category}
                </Link>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this bullet</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                The <strong style={{ color: "var(--text)" }}>{b!.name}</strong> ({b!.char}) is a Unicode bullet-point symbol in the <strong style={{ color: "var(--text)" }}>{catMeta?.name ?? b!.category}</strong> family. {b!.usageNote}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Visually, it looks like a {b!.looksLike}. Click the {b!.char} above to copy it to your clipboard, then paste it into Word, Google Docs, Notion, Instagram captions, LinkedIn posts, Discord messages, or anywhere else you write lists.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Unicode</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)", wordBreak: "break-all" }}>{b!.unicode || cps.join(" ") || "—"}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Category</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{catMeta?.name ?? b!.category}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {b!.keywords.map(k => (
                    <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to use */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-label">How to use</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            How to copy and paste the {b!.name} bullet
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{b!.char}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>One-click copy</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Tap the big {b!.char} at the top of this page. It copies to your clipboard instantly — paste it anywhere with Ctrl+V (Cmd+V on Mac).
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 12, fontFamily: "DM Mono, monospace", color: "var(--accent)", marginBottom: 8 }}>{b!.unicode || cps.join(" ") || "—"}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Unicode codepoint</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {b!.unicode
                  ? <>This bullet has the codepoint {b!.unicode}. Some apps accept it as a Unicode escape (e.g. <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>\u{b!.unicode.replace("U+", "")}</code> in JavaScript or <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>&amp;#x{b!.unicode.replace("U+", "")};</code> in HTML).</>
                  : <>This is a multi-codepoint combo. Best copied directly — escape sequences may break the sequence.</>}
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Works everywhere</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Word documents, Google Docs, Notion pages, Markdown lists, Instagram bios, LinkedIn posts, Discord channels, Slack messages, plain emails and printed PDFs.
              </p>
            </div>
          </div>
        </section>

        {/* When to use */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-label">When to use it</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
            When the {b!.name} bullet works best
          </h2>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, marginBottom: 12 }}>
            {b!.usageNote} {catMeta?.description}
          </p>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 0 }}>
            If you&apos;re writing a checklist, a feature comparison, an Instagram bio, a resume, or a technical document, the right bullet shape makes your list feel intentional rather than default. The {b!.name} reads as a {b!.looksLike} — pair it with body copy whose tone matches.
          </p>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More from this category</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {catMeta?.name ?? b!.category} bullets
                </h2>
              </div>
              <Link href="/bullet-points" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/bullet-points/${r.slug}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <span className="symbol-char">{r.char}</span>
                  <span className="symbol-name">{r.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ for SEO depth */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {[
            {
              q: `What is the ${b!.name} symbol?`,
              a: `The ${b!.name} (${b!.char}) is a Unicode character in the ${catMeta?.name ?? b!.category} family${b!.unicode ? `, with the codepoint ${b!.unicode}` : ""}. It looks like a ${b!.looksLike} and works as a list marker, decorative bullet, or visual separator in any text field that accepts Unicode.`,
            },
            {
              q: `How do I type ${b!.char} on a keyboard?`,
              a: `The fastest way is to click the ${b!.char} at the top of this page — it copies to your clipboard instantly. There&apos;s no standard keyboard shortcut for this bullet on most keyboards${b!.unicode ? `, but you can also enter it as the Unicode codepoint ${b!.unicode} via your operating system&apos;s character picker` : ""}.`,
            },
            {
              q: `Where does ${b!.char} render correctly?`,
              a: `${b!.char} is part of the Unicode standard, so it renders on iPhone, Android, Mac, Windows, Linux, modern browsers, Word, Google Docs, Notion, Instagram, LinkedIn, Discord, Slack, and almost every app made in the last decade. Older terminals or systems missing the relevant font may show a fallback box (□).`,
            },
            {
              q: `Can I use ${b!.char} in my Instagram or LinkedIn bio?`,
              a: `Yes — Unicode bullets work directly in Instagram bios, LinkedIn headlines, Twitter posts, TikTok bios, and YouTube descriptions. Just copy ${b!.char} from this page and paste it where you write your bio. No special formatting needed.`,
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
