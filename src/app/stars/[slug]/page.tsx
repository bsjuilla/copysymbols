import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  stars,
  getStarBySlug,
  getStarsByCategory,
  starCategories,
  type StarItem,
} from "@/data/collections/stars";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return stars.map(s => ({ slug: s.slug }));
}

export const dynamicParams = false;

function categoryMeta(categoryId: string) {
  return starCategories.find(c => c.id === categoryId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getStarBySlug(slug);
  if (!s) return {};
  const title = `${s.name} ${s.char} — Star Symbol Copy & Paste | CopyChars`;
  const description = `Copy the ${s.name} (${s.char}) for free. ${s.usageNote} Paste into Instagram, TikTok, Discord, Word docs or anywhere you write text.`;
  const url = `https://www.copychars.com/stars/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${s.name.toLowerCase()} star`,
      `${s.char} copy paste`,
      `${s.name.toLowerCase()} symbol`,
      "star symbol copy paste",
      "star emoji",
      ...s.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/stars/${slug}`),
  };
}

export default async function StarDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = getStarBySlug(slug);
  if (!s) notFound();

  const catMeta = categoryMeta(s!.category);
  const related: StarItem[] = getStarsByCategory(s!.category)
    .filter(r => r.slug !== s!.slug)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const cps = Array.from(s!.char).map(ch => {
    const cp = ch.codePointAt(0);
    return cp != null ? "U+" + cp.toString(16).toUpperCase().padStart(4, "0") : "";
  }).filter(Boolean);

  const faqs = [
    { q: `What does the ${s!.name} symbol mean?`, a: `${s!.name} is a Unicode star character${s!.unicode ? ` at codepoint ${s!.unicode}` : ""} in the ${catMeta?.name ?? s!.category} family. ${s!.usageNote}` },
    { q: `How do I type ${s!.char} on a keyboard?`, a: `The easiest method is to click the ${s!.char} at the top of this page — it copies to your clipboard instantly. There's no dedicated key on most keyboards${s!.unicode ? `, but you can enter it via Unicode input methods using ${s!.unicode}` : ""}.` },
    { q: `Will ${s!.char} display correctly on Instagram and TikTok?`, a: `Yes — both Instagram and TikTok render this character natively in bios, captions, and comments on iOS, Android, and desktop web. The visual may vary slightly between system fonts but the meaning is universal.` },
    { q: `Is ${s!.name} the same as the ⭐ emoji?`, a: `Not exactly. ⭐ (U+2B50) is an emoji that renders as a colored yellow/gold star on most platforms. ${s!.name} (${s!.char}) is${s!.category === "Classic" || s!.category === "Outlined" ? " a text-style glyph rendered in the surrounding text colour, not as an emoji" : " a different glyph in the star family with its own shape and use case"}.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Star Symbols", item: `${baseUrl}/stars` },
          { "@type": "ListItem", position: 3, name: s!.name, item: `${baseUrl}/stars/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${s!.name} star`,
        description: `${s!.name} (${s!.char}) — ${s!.usageNote}`,
        termCode: s!.unicode || cps.join(" "),
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Unicode Star Symbols",
          url: `${baseUrl}/stars`,
        },
        url: `${baseUrl}/stars/${slug}`,
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

  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/stars" style={{ color: "var(--text3)", textDecoration: "none" }}>Star Symbols</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{s!.name}</span>
        </div>

        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ width: 320, flexShrink: 0 }}>
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 28, padding: "56px 32px 40px", textAlign: "center", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <EmojiCopyButton glyph={s!.char} name={s!.name} />
                <h1 className="font-display" style={{ marginTop: 24, marginBottom: 6, fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                  {s!.name}
                </h1>
                <Link href="/stars" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {catMeta?.name ?? s!.category}
                </Link>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this star</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                The <strong style={{ color: "var(--text)" }}>{s!.name}</strong> ({s!.char}) is a Unicode star symbol in the <strong style={{ color: "var(--text)" }}>{catMeta?.name ?? s!.category}</strong> family. {s!.usageNote}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click the {s!.char} above to copy it to your clipboard, then paste it into Instagram bios, TikTok captions, Twitter/X posts, Discord channels, Notion pages, Word documents, slide decks, or anywhere else you write text. {catMeta?.description}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Unicode</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)", wordBreak: "break-all" }}>{s!.unicode || cps.join(" ") || "—"}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Category</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{catMeta?.name ?? s!.category}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {s!.keywords.map(k => (
                    <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
                  ))}
                </div>
              </div>
              {s!.altForms && s!.altForms.length > 0 && (
                <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Visually similar</div>
                  <div style={{ fontSize: 22, color: "var(--text)", letterSpacing: "0.1em" }}>{s!.altForms.join("   ")}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label">Where it works</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Using {s!.name} in your bio, captions and docs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s!.char}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Social bios</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Drop {s!.char} into Instagram, TikTok, X (Twitter), LinkedIn, or YouTube bios to flag a section, mark a featured link, or just decorate. {s!.category === "Combo" ? "This is a multi-character combo — count the chars against the bio length limit." : "Single-character stars don't eat much of your bio length."}
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 12, fontFamily: "DM Mono, monospace", color: "var(--accent)", marginBottom: 8 }}>{s!.unicode || cps.join(" ") || "—"}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Rendering</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {s!.category === "Stylized"
                  ? "This is a newer Unicode codepoint — older Windows and Android may show a tofu box. Provide a font fallback like Segoe UI Symbol or Noto Sans Symbols 2."
                  : s!.category === "Combo"
                    ? "This combo is built from standard Unicode characters and works on every modern device. The visual depends on font choice — most renderers handle it gracefully."
                    : "Renders as a text glyph on every modern device. No emoji conversion unless explicitly forced via U+FE0F."}
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>★ ☆ ★ ☆ ★</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Rating widgets</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Pair filled stars (★ ✪ ✬) with hollow ones (☆ ✩ ⭒) to build a static rating display. Same baseline, same width — pixel-perfect alignment for product reviews, scorecards, and rubrics.
              </p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More from this category</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {catMeta?.name ?? s!.category}
                </h2>
              </div>
              <Link href="/stars" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/stars/${r.slug}`}
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

        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {faqs.map(({ q, a }) => (
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
