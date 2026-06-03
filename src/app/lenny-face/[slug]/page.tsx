import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  lennyFaces,
  getLennyBySlug,
  getLennyByMood,
  lennyMoods,
  type LennyItem,
} from "@/data/collections/lenny";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return lennyFaces.map(l => ({ slug: l.slug }));
}

export const dynamicParams = false;

function moodMeta(moodId: string) {
  return lennyMoods.find(m => m.id === moodId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getLennyBySlug(slug);
  if (!l) return {};
  const title = `${l.name} Lenny Face ${l.face} — Copy & Paste`;
  const description = `Copy the ${l.name} Lenny ${l.face} for free. ${l.usageNote} Paste into Discord, Reddit, Twitter, WhatsApp or anywhere you write text.`;
  const url = `https://www.copychars.com/lenny-face/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${l.name.toLowerCase()} lenny`,
      `${l.name.toLowerCase()} kaomoji`,
      `lenny face copy paste`,
      `( ͡° ͜ʖ ͡°) ${l.mood}`,
      ...l.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/lenny-face/${slug}`),
  };
}

export default async function LennyDetailPage({ params }: Props) {
  const { slug } = await params;
  const l = getLennyBySlug(slug);
  if (!l) notFound();

  const mood = moodMeta(l!.mood);
  const related: LennyItem[] = getLennyByMood(l!.mood)
    .filter(r => r.slug !== l!.slug)
    .slice(0, 12);

  const parent = l!.variantOf ? getLennyBySlug(l!.variantOf) : null;

  const baseUrl = "https://www.copychars.com";
  const faqs = [
    { q: `What does ${l!.face} mean?`, a: `${l!.name} is read as the ${mood?.name ?? l!.mood} variant of the Lenny face family. ${l!.usageNote}` },
    { q: `How do I type the Lenny face on a keyboard?`, a: `There's no keyboard shortcut for Lenny — it's built from combining diacritics that aren't on standard layouts. Copy ${l!.face} from this page (one click on the big copy button above) and paste it anywhere with Ctrl+V (Cmd+V on Mac).` },
    { q: `Will ${l!.face} render correctly on every platform?`, a: `On modern iOS, Android, Mac, Windows, Linux and web browsers — yes. Older systems or apps with limited Unicode support may render the combining marks as separate characters or omit them entirely, breaking the eyebrow placement. Test in your target app before relying on it.` },
    { q: `Where did Lenny faces come from?`, a: `The original ( ͡° ͜ʖ ͡°) appeared on 4chan in 2012 and spread through Reddit, Discord, and the wider internet as a versatile reaction face. The "Lenny" name comes from a comment that called the leering smile "Lenny". Hundreds of variants now exist — this site catalogs the most useful 150.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Lenny Faces", item: `${baseUrl}/lenny-face` },
          { "@type": "ListItem", position: 3, name: l!.name, item: `${baseUrl}/lenny-face/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${l!.name} Lenny Face`,
        description: `${l!.name} ${l!.face} — ${l!.usageNote}`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Lenny Faces — text emoticons",
          url: `${baseUrl}/lenny-face`,
        },
        url: `${baseUrl}/lenny-face/${slug}`,
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

  // Scale the hero font based on face length so long dongers don't overflow.
  const heroSize = Array.from(l!.face).length > 16 ? "clamp(1.2rem, 3.5vw, 2.2rem)" : "clamp(1.8rem, 5vw, 3.4rem)";

  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/lenny-face" style={{ color: "var(--text3)", textDecoration: "none" }}>Lenny Faces</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{l!.name}</span>
        </div>

        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ width: 360, flexShrink: 0, maxWidth: "100%" }}>
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 28, padding: "56px 24px 40px", textAlign: "center", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <EmojiCopyButton glyph={l!.face} name={l!.name} size={heroSize} />
                <h1 className="font-display" style={{ marginTop: 24, marginBottom: 6, fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                  {l!.name}
                </h1>
                <Link href="/lenny-face" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {mood?.name ?? l!.mood}
                </Link>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>About this Lenny</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: "var(--text)" }}>{l!.name}</strong> is a Lenny Face in the <strong style={{ color: "var(--text)" }}>{mood?.name ?? l!.mood}</strong> mood. {l!.usageNote}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click the face above to copy it to your clipboard, then paste into Discord, Reddit, Twitter/X, WhatsApp, Twitch chat, or anywhere else you write text. Lenny faces are built from standard Unicode characters and combining diacritics — no special keyboard required. {mood?.description}
                {parent && (
                  <> This is a variant of <Link href={`/lenny-face/${parent.slug}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>{parent.name}</Link>.</>
                )}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Mood</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{mood?.name ?? l!.mood}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Length</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)" }}>{Array.from(l!.face).length} chars</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {l!.keywords.map(k => (
                    <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label">When to use it</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Reading the {l!.name}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>The vibe</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {l!.usageNote}
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Where it works best</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Lenny faces are at home in Discord, Reddit threads, Twitch chat, Steam reviews, and the comment sections of any platform that doesn&apos;t auto-convert emoticons. They survive paste cleanly across iOS, Android, Mac, Windows, and Linux because they&apos;re built from standard Unicode code points.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Pasting fidelity</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                The combining diacritics (U+0361 inverted breve, U+035C breve below) attach to the surrounding characters. If a destination editor strips combining marks, the eyebrows disappear. Most modern apps preserve them — Slack and Microsoft Word are the main offenders.
              </p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More from this mood</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {mood?.name ?? l!.mood} Lennys
                </h2>
              </div>
              <Link href="/lenny-face" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/lenny-face/${r.slug}`}
                  className="kaomoji-card"
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  prefetch={false}
                >
                  <div className="kaomoji-face">{r.face}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--accent)" }}>open →</div>
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
