import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  textArt,
  getTextArtBySlug,
  getTextArtByCategory,
  textArtCategories,
  type TextArtItem,
} from "@/data/collections/text-art";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return textArt.map(t => ({ slug: t.slug }));
}

export const dynamicParams = false;

function categoryMeta(categoryId: string) {
  return textArtCategories.find(c => c.id === categoryId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTextArtBySlug(slug);
  if (!t) return {};
  const title = `${t.name} ASCII Text Art — Copy & Paste`;
  const description = `Copy the ${t.name} text art for free. ${t.vibeNote} Paste into Discord, Reddit, terminals or anywhere monospaced text renders.`;
  const url = `https://www.copychars.com/text-art/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${t.name.toLowerCase()} ascii art`,
      `${t.name.toLowerCase()} text art`,
      `copy ascii art`,
      `${t.category.toLowerCase()} text art`,
      ...t.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/text-art/${slug}`),
  };
}

export default async function TextArtDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = getTextArtBySlug(slug);
  if (!t) notFound();

  const catMeta = categoryMeta(t!.category);
  const related: TextArtItem[] = getTextArtByCategory(t!.category)
    .filter(r => r.slug !== t!.slug)
    .slice(0, 9);

  const baseUrl = "https://www.copychars.com";
  const isMultiline = t!.lines > 1;

  const faqs = [
    { q: `What is the ${t!.name} text art?`, a: `${t!.name} is a piece of ${catMeta?.name?.toLowerCase() ?? t!.category.toLowerCase()} ASCII/Unicode art — ${t!.lines} ${t!.lines === 1 ? "line" : "lines"} of text characters arranged to draw a picture. ${t!.vibeNote}` },
    { q: `Why doesn't the art look right when I paste it into Twitter/Instagram?`, a: isMultiline ? `Multi-line text art needs a monospaced font (where every character is the same width) to align. Twitter, Instagram, TikTok, and most native mobile text fields use proportional fonts where ' ' is narrower than 'M'. The columns misalign and the art breaks. Use Discord/Slack code blocks, terminals, or paste into a monospaced editor instead.` : `Single-line art usually copies fine. If something looks off, check that the destination supports the full Unicode block — some older fonts miss specific characters and substitute boxes.` },
    { q: `Can I use this in my Discord status or username?`, a: `Single-line text art works in Discord status messages and (sometimes) usernames depending on Discord's current filter rules. Multi-line art doesn't fit a status. For longer art, post it inside a code block in a channel.` },
    { q: `How do I make my own text art?`, a: `Start with a monospaced editor and a reference image. ASCII art uses characters like \\\\ / | _ - ( ) for outlines and # @ % . for shading. Unicode art uses box-drawing characters (─ │ ┌ ┐ └ ┘) for clean rectangles and ░ ▒ ▓ █ for filled shading. Browse the rest of this collection for inspiration.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Text Art", item: `${baseUrl}/text-art` },
          { "@type": "ListItem", position: 3, name: t!.name, item: `${baseUrl}/text-art/${slug}` },
        ],
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
          <Link href="/text-art" style={{ color: "var(--text3)", textDecoration: "none" }}>Text Art</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{t!.name}</span>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: isMultiline ? "32px 20px" : "48px 32px", position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.10), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <pre style={{ fontFamily: "DM Mono, monospace", fontSize: isMultiline ? "clamp(0.85rem, 1.6vw, 1.15rem)" : "clamp(1.4rem, 4vw, 2.4rem)", color: "var(--text)", margin: 0, textAlign: "center", whiteSpace: "pre", lineHeight: isMultiline ? 1.3 : 1.2, overflow: "auto", maxWidth: "100%" }}>
                {t!.art}
              </pre>
              <EmojiCopyButton glyph={t!.art} name={t!.name} />
              <div style={{ textAlign: "center" }}>
                <h1 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 4 }}>
                  {t!.name}
                </h1>
                <Link href="/text-art" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {catMeta?.name ?? t!.category}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: 280 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this text art</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: "var(--text)" }}>{t!.name}</strong> is a piece of {catMeta?.name?.toLowerCase() ?? t!.category.toLowerCase()} text art. {t!.vibeNote}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click <strong style={{ color: "var(--text)" }}>Copy</strong> above to copy the full {t!.lines}-line art to your clipboard. {isMultiline ? "Multi-line ASCII art needs a monospaced font to render correctly — Discord, Slack code blocks, terminals, and IRC clients work; Twitter, Instagram bios, and proportional-font fields will collapse the alignment." : "This is single-line text art — paste it anywhere Unicode is supported, including Twitter, Instagram captions, Discord, SMS, and email."}
              </p>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 220, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Lines</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)" }}>{t!.lines}</div>
            </div>
            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Category</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "var(--accent)" }}>{catMeta?.name ?? t!.category}</div>
            </div>
            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {t!.keywords.map(k => (
                  <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label">Where it works</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Using {t!.name} in chats and posts
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{isMultiline ? "Discord & Slack code blocks" : "Discord & Twitter"}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {isMultiline
                  ? "Wrap the art in triple backticks (```...```) to force monospace rendering. Without code blocks, proportional fonts will misalign the columns."
                  : "Paste directly into any text input. Single-line text art keeps its shape in proportional fonts because there are no columns to align."}
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Terminal &amp; CLI tools</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Drop into shell scripts, MOTDs, ASCII banners, and CLI help text. Cascadia Code, Fira Code, IBM Plex Mono, and Menlo all render this art cleanly at the same column widths.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Compatibility</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Built from standard Unicode characters — copies cleanly across iOS, Android, Mac, Windows, Linux, and the web. Some pieces use Japanese full-width or box-drawing chars; the destination font must include those glyph blocks for the art to render correctly.
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
                  More {catMeta?.name ?? t!.category}
                </h2>
              </div>
              <Link href="/text-art" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/text-art/${r.slug}`}
                  prefetch={false}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "inherit", minHeight: 120, transition: "border-color 0.15s" }}
                >
                  <pre style={{ fontFamily: "DM Mono, monospace", fontSize: r.lines > 1 ? "0.7rem" : "1.1rem", color: "var(--text)", margin: 0, whiteSpace: "pre", overflow: "hidden", textAlign: "center", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1.2 }}>{r.art}</pre>
                  <div style={{ fontSize: 11, color: "var(--text3)", textAlign: "center" }}>{r.name}</div>
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
