import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  borders,
  getBorderBySlug,
  getBordersByCategory,
  borderCategories,
  type BorderItem,
} from "@/data/collections/borders";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return borders.map(b => ({ slug: b.slug }));
}

export const dynamicParams = false;

function categoryMeta(categoryId: string) {
  return borderCategories.find(c => c.id === categoryId);
}

function widthLabel(w: string): string {
  switch (w) {
    case "single": return "Single-stroke";
    case "double": return "Double-stroke";
    case "thick": return "Heavy / thick";
    case "dashed": return "Dashed";
    case "varies": return "Mixed / decorative";
    default: return w;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBorderBySlug(slug);
  if (!b) return {};
  const previewChar = b.char.slice(0, 24);
  const title = `${b.name} — Border & Divider Copy & Paste`;
  const description = `Copy the ${b.name} (${previewChar}) for free. ${b.usageNote} Paste into Discord, Instagram bio, Notion, Tumblr or anywhere you write text.`;
  const url = `https://www.copychars.com/borders/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${b.name.toLowerCase()} divider`,
      `${b.name.toLowerCase()} border`,
      `${b.name.toLowerCase()} line copy paste`,
      "aesthetic divider",
      "text divider",
      "bio divider",
      ...b.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/borders/${slug}`),
  };
}

export default async function BorderDetailPage({ params }: Props) {
  const { slug } = await params;
  const b = getBorderBySlug(slug);
  if (!b) notFound();

  const catMeta = categoryMeta(b!.category);
  const related: BorderItem[] = getBordersByCategory(b!.category)
    .filter(r => r.slug !== b!.slug)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const previewChar = b!.char.length > 32 ? b!.char.slice(0, 32) + "…" : b!.char;
  const charLength = Array.from(b!.char).length;

  // Long combos render in monospace at a smaller, full-width size; single
  // characters get the large hero treatment.
  const isWide = charLength > 4;

  const faqs = [
    {
      q: `What is the ${b!.name} divider?`,
      a: `${b!.name} is a ${widthLabel(b!.width).toLowerCase()} text divider in the ${catMeta?.name ?? b!.category} family. ${b!.usageNote}`,
    },
    {
      q: `Will ${b!.name} render correctly on every platform?`,
      a: `${b!.name} is built from Unicode characters supported across iOS, Android, Windows, Mac, Linux, and all modern browsers. Some older fonts or apps without full Unicode support may fall back to placeholder boxes (□) for less common glyphs. In monospaced contexts (terminal, code blocks) the alignment will be pixel-perfect.`,
    },
    {
      q: `Can I use ${b!.name} in an Instagram bio?`,
      a: `Yes — paste it as a regular line in your bio. Instagram allows up to 150 characters in the bio, so check the length first (this divider is ${charLength} chars). Pair it with line breaks for a clean multi-section bio.`,
    },
    {
      q: `How is this different from the standard <hr> rule?`,
      a: `An HTML <hr> is a semantic horizontal rule rendered by the browser at a fixed thickness and width. ${b!.name} is plain text — you control its width by how many characters you paste, and it works inside any text field (bios, captions, messages, plain emails) where HTML doesn't.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Borders & Dividers", item: `${baseUrl}/borders` },
          { "@type": "ListItem", position: 3, name: b!.name, item: `${baseUrl}/borders/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${b!.name} border`,
        description: `${b!.name} — ${b!.usageNote}`,
        termCode: b!.unicode || "",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Text Borders & Dividers",
          url: `${baseUrl}/borders`,
        },
        url: `${baseUrl}/borders/${slug}`,
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

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/borders" style={{ color: "var(--text3)", textDecoration: "none" }}>Borders & Dividers</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{b!.name}</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: isWide ? "32px 28px" : "48px 32px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.10), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              {isWide ? (
                <pre style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(0.95rem, 2vw, 1.4rem)", color: "var(--text)", margin: 0, textAlign: "center", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.5 }}>
                  {b!.char}
                </pre>
              ) : (
                <div style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "var(--text)", lineHeight: 1 }}>{b!.char}</div>
              )}
              <EmojiCopyButton glyph={b!.char} name={b!.name} />
              <div style={{ textAlign: "center" }}>
                <h1 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 4 }}>
                  {b!.name}
                </h1>
                <Link href="/borders" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {catMeta?.name ?? b!.category}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* About + specs */}
        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: 280 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this divider</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                The <strong style={{ color: "var(--text)" }}>{b!.name}</strong> is a {widthLabel(b!.width).toLowerCase()} divider in the <strong style={{ color: "var(--text)" }}>{catMeta?.name ?? b!.category}</strong> family. {b!.usageNote}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click <strong style={{ color: "var(--text)" }}>Copy {previewChar}</strong> above to copy the divider to your clipboard, then paste it into your Instagram or TikTok bio, Discord channel, Notion page, Tumblr post, Markdown <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>&lt;hr&gt;</code> fallback, or wherever you need a clean text break. {catMeta?.description}
              </p>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 220, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Width</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "var(--teal)" }}>{widthLabel(b!.width)}</div>
            </div>
            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Length</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "var(--accent)" }}>{charLength} char{charLength === 1 ? "" : "s"}</div>
            </div>
            {b!.unicode && (
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Unicode</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "var(--teal)" }}>{b!.unicode}</div>
              </div>
            )}
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

        {/* Where it works */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-label">Where it works</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Using {b!.name} in your bio, posts and docs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Instagram & TikTok bios</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Drop {b!.name} between sections of your bio to separate name, role, location, and links. Most {b!.width === "thick" ? "thick" : b!.width === "dashed" ? "dashed" : "single-stroke"} dividers render consistently across iOS and Android in the bio context.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Discord & Slack channels</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Pin a divider message between sections of a channel topic or use it inside long messages to break up regions. Discord renders Unicode dividers in monospace inside code blocks (``` ``` wraps) for pixel-perfect alignment.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Notion, Obsidian, and Markdown</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                When the standard <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>---</code> hr looks too plain, paste this divider as a regular paragraph for a more typographic break. Use sparingly — they don&apos;t collapse like real horizontal rules.
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More from this category</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {catMeta?.name ?? b!.category}
                </h2>
              </div>
              <Link href="/borders" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/borders/${r.slug}`}
                  prefetch={false}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textDecoration: "none", color: "inherit", transition: "border-color 0.15s" }}
                >
                  <pre style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--text)", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1, minWidth: 0 }}>{r.char}</pre>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>open →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {[
            {
              q: `What is the ${b!.name} divider?`,
              a: `${b!.name} is a ${widthLabel(b!.width).toLowerCase()} text divider in the ${catMeta?.name ?? b!.category} family. ${b!.usageNote}`,
            },
            {
              q: `Will ${b!.name} render correctly on every platform?`,
              a: `${b!.name} is built from Unicode characters supported across iOS, Android, Windows, Mac, Linux, and all modern browsers. Some older fonts or apps without full Unicode support may fall back to placeholder boxes (□) for less common glyphs. In monospaced contexts (terminal, code blocks) the alignment will be pixel-perfect.`,
            },
            {
              q: `Can I use ${b!.name} in an Instagram bio?`,
              a: `Yes — paste it as a regular line in your bio. Instagram allows up to 150 characters in the bio, so check the length first (this divider is ${charLength} chars). Pair it with line breaks for a clean multi-section bio.`,
            },
            {
              q: `How is this different from the standard <hr> rule?`,
              a: `An HTML <hr> is a semantic horizontal rule rendered by the browser at a fixed thickness and width. ${b!.name} is plain text — you control its width by how many characters you paste, and it works inside any text field (bios, captions, messages, plain emails) where HTML doesn't.`,
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
