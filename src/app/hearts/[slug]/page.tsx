import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  hearts,
  getHeartBySlug,
  getHeartsByCategory,
  heartCategories,
  type HeartItem,
} from "@/data/collections/hearts";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return hearts.map(h => ({ slug: h.slug }));
}

export const dynamicParams = false;

function categoryMeta(categoryId: string) {
  return heartCategories.find(c => c.id === categoryId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const h = getHeartBySlug(slug);
  if (!h) return {};
  const title = `${h.name} ${h.char} — Heart Symbol Copy & Paste | CopyChars`;
  const description = `Copy the ${h.name} heart (${h.char}) for free. ${h.usageNote} Paste into Instagram, TikTok, WhatsApp, Discord or anywhere you write text.`;
  const url = `https://www.copychars.com/hearts/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${h.name.toLowerCase()} heart`,
      `${h.char} copy paste`,
      `${h.name.toLowerCase()} symbol`,
      "heart symbol copy paste",
      "love emoji",
      ...h.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/hearts/${slug}`),
  };
}

export default async function HeartDetailPage({ params }: Props) {
  const { slug } = await params;
  const h = getHeartBySlug(slug);
  if (!h) notFound();

  const catMeta = categoryMeta(h!.category);
  const related: HeartItem[] = getHeartsByCategory(h!.category)
    .filter(r => r.slug !== h!.slug)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const cps = Array.from(h!.char).map(ch => {
    const cp = ch.codePointAt(0);
    return cp != null ? "U+" + cp.toString(16).toUpperCase().padStart(4, "0") : "";
  }).filter(Boolean);
  const charLength = Array.from(h!.char).length;
  const isMultiline = h!.char.includes("\n");
  const isWide = charLength > 6 || isMultiline;

  const faqs = [
    { q: `What does the ${h!.name} symbol mean?`, a: `${h!.name} ${h!.char} is a heart in the ${catMeta?.name ?? h!.category} family. ${h!.usageNote}` },
    { q: `How do I type ${h!.char} on a keyboard?`, a: `Click the ${h!.char} at the top of this page — it copies to your clipboard instantly. On Mac you can also press Option+Shift+2 for ™, but there is no built-in keyboard shortcut for most hearts${h!.unicode ? `. You can enter it via Unicode input as ${h!.unicode}` : ""}.` },
    { q: `Is ${h!.name} appropriate for a non-romantic context?`, a: h!.category === "Romance" ? `This heart reads as explicitly romantic. For friends, family or platonic use, prefer 💛, 💜, 🩷, or the plain ♡ outline heart.` : h!.category === "Combo" ? `Yes — combo hearts read as decorative aesthetic rather than romantic. They suit bios, captions, and casual posts.` : `Yes — most hearts read as friendly affection or general "love" rather than strictly romantic. Context (and the recipient) shapes the read.` },
    { q: `Will ${h!.char} render correctly on every device?`, a: `On modern iOS (≥14), Android (≥11), Mac, Windows 10+, and modern browsers — yes. Some newer hearts (🩷 🩵 🩶 added 2022, 🫀 🫁 🫶 added 2021-22) and ZWJ combos (❤️‍🔥) require recent OS versions; older devices may show fallbacks.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Heart Symbols", item: `${baseUrl}/hearts` },
          { "@type": "ListItem", position: 3, name: h!.name, item: `${baseUrl}/hearts/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${h!.name} heart`,
        description: `${h!.name} (${h!.char}) — ${h!.usageNote}`,
        termCode: h!.unicode || cps.join(" "),
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Heart Symbols & Emoji",
          url: `${baseUrl}/hearts`,
        },
        url: `${baseUrl}/hearts/${slug}`,
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
          <Link href="/hearts" style={{ color: "var(--text3)", textDecoration: "none" }}>Heart Symbols</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{h!.name}</span>
        </div>

        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ width: isWide ? "100%" : 360, flexShrink: 0, maxWidth: "100%" }}>
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 28, padding: isWide ? "40px 28px 32px" : "56px 24px 40px", textAlign: "center", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                {isMultiline ? (
                  <pre style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(0.9rem, 2vw, 1.3rem)", color: "var(--text)", margin: "0 0 24px", textAlign: "center", whiteSpace: "pre", lineHeight: 1.4 }}>
                    {h!.char}
                  </pre>
                ) : (
                  <div style={{ fontSize: isWide ? "clamp(1.5rem, 4vw, 2.6rem)" : "clamp(2.4rem, 7vw, 4rem)", color: "var(--text)", lineHeight: 1.1, marginBottom: 24, wordBreak: "break-word" }}>{h!.char}</div>
                )}
                <EmojiCopyButton glyph={h!.char} name={h!.name} />
                <h1 className="font-display" style={{ marginTop: 24, marginBottom: 6, fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                  {h!.name}
                </h1>
                <Link href="/hearts" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {catMeta?.name ?? h!.category}
                </Link>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this heart</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                The <strong style={{ color: "var(--text)" }}>{h!.name}</strong> is a heart symbol in the <strong style={{ color: "var(--text)" }}>{catMeta?.name ?? h!.category}</strong> family. {h!.usageNote}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click the {h!.char} above to copy it to your clipboard, then paste it into Instagram bios, TikTok captions, WhatsApp messages, Discord channels, Twitter/X posts, or anywhere else you write text. {catMeta?.description}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Unicode</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)", wordBreak: "break-all" }}>{h!.unicode || cps.join(" ") || "—"}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Category</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{catMeta?.name ?? h!.category}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {h!.keywords.map(k => (
                    <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
                  ))}
                </div>
              </div>
              {h!.altForms && h!.altForms.length > 0 && (
                <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Visually similar</div>
                  <div style={{ fontSize: 22, color: "var(--text)", letterSpacing: "0.1em" }}>{h!.altForms.join("   ")}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label">Where it works</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Using {h!.name} in your bios, captions and messages
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{isMultiline ? "♥" : h!.char}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Bios & dating profiles</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Hearts are the universal "what I&apos;m about" signal in Instagram and TikTok bios. Drop {h!.char} between sections — name, role, link in bio — to soften the layout. On Hinge/Bumble bios, hearts make a profile read warm rather than transactional.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Compatibility</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {h!.category === "Anatomical" || h!.category === "Colored"
                  ? "This is an emoji glyph that renders in color on modern devices. Older iOS/Android (pre-2022 for newer color hearts) may show fallbacks or tofu boxes."
                  : h!.category === "Combo"
                    ? "Built from standard Unicode — works on every modern device. The visual depends on the font in the destination app."
                    : h!.category === "Script"
                      ? "This is a letter from a non-Latin script (Tamil/Georgian/Korean/Hebrew) used decoratively because it resembles a heart. It will render correctly anywhere Unicode is supported, but screen-readers will pronounce the letter, not 'heart'."
                      : "Renders consistently across iOS, Android, Mac, Windows, Linux and the web. Variation selectors (U+FE0E text, U+FE0F emoji) may be needed to force a specific presentation."}
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Tone & meaning</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {h!.category === "Romance"
                  ? "Reads as explicitly romantic. Reserve for partners, romantic crushes, anniversaries, or wedding content. Platonic use can read as flirtatious — be intentional."
                  : h!.category === "Anatomical"
                    ? "Reads as biological/medical or 'literal heart' — used in health, fitness, cardiology contexts as much as romance. Stronger and more clinical than ❤️."
                    : h!.category === "Pixel"
                      ? "Reads as retro, nostalgic, or ironic depending on context. Pair with gaming, 8-bit, or Y2K aesthetic content."
                      : h!.category === "Combo"
                        ? "Decorative — reads as 'aesthetic' more than 'romantic'. Suits soft-girl, cottagecore, kawaii, and y2k bio styles where the whole combo carries the meaning."
                        : "Versatile — readable as friendly, romantic, or aesthetic depending on context. The most reliable heart character for ambiguous-relationship texts."}
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
                  More {catMeta?.name ?? h!.category}
                </h2>
              </div>
              <Link href="/hearts" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/hearts/${r.slug}`}
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
