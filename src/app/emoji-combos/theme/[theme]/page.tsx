import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCombosByTheme, comboThemes } from "@/data/collections/emoji-combos";
import { canonical } from "@/lib/canonical";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForEmoji } from "@/lib/related";

interface Props {
  params: Promise<{ theme: string }>;
}

export async function generateStaticParams(): Promise<Array<{ theme: string }>> {
  return comboThemes.map((t) => ({ theme: t.id.toLowerCase() }));
}

export const dynamicParams = false;

function findTheme(slug: string) {
  return comboThemes.find((t) => t.id.toLowerCase() === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme } = await params;
  const t = findTheme(theme);
  if (!t) return {};
  const combos = getCombosByTheme(t.id);
  const sample = combos.slice(0, 3).map((c) => c.combo).join(" ");
  const title = `${t.name} Emoji Combos ${sample} — Copy & Paste`;
  const description = `${combos.length} ${t.name.toLowerCase()} emoji combos to copy and paste. ${t.description} Click any combo to grab it for your Instagram bio, TikTok caption, Discord, or anywhere you type.`;
  return {
    title,
    description,
    keywords: [
      `${t.name.toLowerCase()} emoji combos`,
      `${t.name.toLowerCase()} emoji combinations`,
      `${t.name.toLowerCase()} emojis copy paste`,
      "emoji combos copy paste",
      "aesthetic emoji combos",
    ],
    openGraph: {
      title,
      description,
      url: `https://www.copychars.com/emoji-combos/theme/${theme}`,
      type: "website",
      siteName: "CopyChars",
    },
    twitter: { card: "summary", title, description },
    ...canonical(`/emoji-combos/theme/${theme}`),
  };
}

export default async function ComboThemePage({ params }: Props) {
  const { theme } = await params;
  const t = findTheme(theme);
  if (!t) notFound();

  const combos = getCombosByTheme(t!.id);
  const nameLower = t!.name.toLowerCase();
  const otherThemes = comboThemes.filter((x) => x.id !== t!.id);

  const faqs = [
    {
      q: `What are ${nameLower} emoji combos?`,
      a: `${t!.name} emoji combos are short, ready-made sequences of emoji that capture a ${nameLower} vibe — ${t!.description.toLowerCase()} You copy the whole combo with one click and paste it as colourful emoji anywhere you write text.`,
    },
    {
      q: `How do I copy and paste an emoji combo?`,
      a: `Click any combo on this page to open it, then copy it to your clipboard. Paste it (Ctrl+V on Windows, Cmd+V on Mac, or long-press → Paste on mobile) into your bio, caption, comment or message.`,
    },
    {
      q: `Do ${nameLower} emoji combos work on Instagram, TikTok and Discord?`,
      a: `Yes. Emoji combos are standard Unicode emoji, so they render in Instagram bios and captions, TikTok captions and comments, Discord, X/Twitter, WhatsApp and almost anywhere you can type — no app or special keyboard needed.`,
    },
    {
      q: `What is an emoji combo?`,
      a: `An emoji combo (or emoji combination) is a curated little string of emoji — like 🌙✨ or 🎀💕🩰 — used to decorate a bio, set a mood on a post, or react in comments. Each one packs an aesthetic into a few characters.`,
    },
  ];

  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Emoji Combos", item: `${baseUrl}/emoji-combos` },
          { "@type": "ListItem", position: 3, name: `${t!.name} Combos`, item: `${baseUrl}/emoji-combos/theme/${theme}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${t!.name} Emoji Combos`,
        numberOfItems: combos.length,
        itemListElement: combos.slice(0, 100).map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${baseUrl}/emoji-combos/${c.slug}`,
        })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/emoji-combos" style={{ color: "var(--text3)", textDecoration: "none" }}>Emoji Combos</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{t!.name}</span>
        </div>

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10 }}>
            {t!.name} Emoji Combos
          </h1>
          <p style={{ fontSize: 14, color: "var(--text3)", fontFamily: "DM Mono, monospace", letterSpacing: "0.04em" }}>
            {combos.length} copy-and-paste {nameLower} combos
          </p>
        </header>

        {/* Definition block */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 40 }}>
          <div className="section-label" style={{ marginBottom: 10 }}>What are {nameLower} emoji combos?</div>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            <strong style={{ color: "var(--text)" }}>{t!.name} emoji combos</strong> are short, ready-made emoji sequences that capture a {nameLower} feeling — {t!.description.toLowerCase()} Tap any combo below to open it and <strong style={{ color: "var(--text)" }}>copy the whole thing</strong>, then paste it into your Instagram or TikTok bio, a caption, Discord, or anywhere you type.
          </p>
        </section>

        {/* Grid */}
        {combos.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>All {nameLower} combos</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {combos.map((c) => (
                <Link
                  key={c.slug}
                  href={`/emoji-combos/${c.slug}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <span className="symbol-char">{c.combo}</span>
                  <span className="symbol-name">{c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </section>

        {/* Other themes */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Browse other themes</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {otherThemes.map((x) => (
              <Link
                key={x.id}
                href={`/emoji-combos/theme/${x.id.toLowerCase()}`}
                className="cat-pill"
                style={{ textDecoration: "none" }}
              >
                {x.name}
              </Link>
            ))}
            <Link href="/emoji-combos" className="cat-pill" style={{ textDecoration: "none", color: "var(--accent)" }}>
              All Emoji Combos →
            </Link>
          </div>
        </section>

        <RelatedLinks
          links={relatedForEmoji()}
          heading="Related — emoji, aesthetics & bio tools"
        />
      </div>
    </>
  );
}
