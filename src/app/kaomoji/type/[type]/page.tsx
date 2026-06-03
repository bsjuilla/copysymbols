import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForKaomoji } from "@/lib/related";
import { kaomojiTypes, getKaomojiTypeById, getKaomojiForType } from "@/data/kaomoji-types";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import KaomojiCard from "@/components/KaomojiCard";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams(): Promise<Array<{ type: string }>> {
  return kaomojiTypes.map((t) => ({ type: t.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const t = getKaomojiTypeById(type);
  if (!t) return {};
  const count = getKaomojiForType(t).length;
  const title = `${t.name} Kaomoji ${t.hero} — Copy & Paste Text Faces`;
  const description = `${count} ${t.name.toLowerCase()} kaomoji to copy and paste. ${t.blurb} One click copies the face — paste it into Instagram, Discord, TikTok or anywhere.`;
  return {
    title,
    description,
    keywords: [
      `${t.name.toLowerCase()} kaomoji`,
      `kaomoji ${t.name.toLowerCase()}`,
      `${t.name.toLowerCase()} text face`,
      "kaomoji copy paste",
    ],
    openGraph: {
      title,
      description,
      url: `https://www.copychars.com/kaomoji/type/${type}`,
      type: "website",
      siteName: "CopyChars",
    },
    twitter: { card: "summary", title, description },
    ...canonical(`/kaomoji/type/${type}`),
  };
}

export default async function KaomojiTypePage({ params }: Props) {
  const { type } = await params;
  const t = getKaomojiTypeById(type);
  if (!t) notFound();

  const items = getKaomojiForType(t!);
  const nameLower = t!.name.toLowerCase();
  const otherTypes = kaomojiTypes.filter((x) => x.id !== type);

  const faqs = [
    ...(t!.faqExtra ?? []),
    {
      q: `How do I copy and paste a ${nameLower} kaomoji?`,
      a: `Click any face on this page and it copies to your clipboard instantly. Then paste it (Ctrl+V on Windows, Cmd+V on Mac, or long-press → Paste on mobile) into your bio, caption, comment, or chat.`,
    },
    {
      q: `Do ${nameLower} kaomoji work on Discord, Instagram and TikTok?`,
      a: `Yes. Kaomoji are plain Unicode text, so they work in Discord, Instagram bios and captions, TikTok comments, WhatsApp, X and almost any app that accepts typed text — no special keyboard or app needed.`,
    },
    {
      q: `What is a kaomoji?`,
      a: `A kaomoji is a Japanese-style emoticon built from letters, punctuation and symbols to draw a little face, like ${t!.hero}. The word combines 顔 (kao, “face”) and 文字 (moji, “character”). You read them straight, without tilting your head.`,
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
          { "@type": "ListItem", position: 2, name: "Kaomoji", item: `${baseUrl}/kaomoji` },
          { "@type": "ListItem", position: 3, name: `${t!.name} Kaomoji`, item: `${baseUrl}/kaomoji/type/${type}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${t!.name} Kaomoji`,
        numberOfItems: Math.min(items.length, 100),
        itemListElement: items.slice(0, 100).map((k, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: k.name,
          item: `${baseUrl}/kaomoji/${k.slug}`,
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
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/kaomoji" style={{ color: "var(--text3)", textDecoration: "none" }}>Kaomoji</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{t!.name}</span>
        </div>

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontSize: "clamp(2.2rem, 7vw, 3.4rem)",
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: 18,
              wordBreak: "break-word",
            }}
          >
            {t!.hero}
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 8 }}>
            {t!.name} Kaomoji
          </h1>
          <p style={{ fontSize: 14, color: "var(--text3)", fontFamily: "DM Mono, monospace", letterSpacing: "0.04em" }}>
            {items.length} copy-and-paste {nameLower} text faces
          </p>
        </header>

        {/* Definition block */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 40 }}>
          <div className="section-label" style={{ marginBottom: 10 }}>What are {nameLower} kaomoji?</div>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            {t!.blurb}
          </p>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
            Click any face below to <strong style={{ color: "var(--text)" }}>copy it instantly</strong>, then paste it wherever you type. Every kaomoji here is plain Unicode text, so it works on modern phones, desktops and browsers — no app or special keyboard needed.
          </p>
        </section>

        {/* Grid */}
        {items.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>All {nameLower} kaomoji</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
              {items.map((k) => (
                <KaomojiCard key={k.slug} kaomoji={k} slug={k.slug} />
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

        {/* Other styles */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>More kaomoji styles</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {otherTypes.map((x) => (
              <Link
                key={x.id}
                href={`/kaomoji/type/${x.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "var(--text2)",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "var(--text3)" }}>{x.hero}</span>
                <span>{x.name} Kaomoji</span>
              </Link>
            ))}
            <Link
              href="/kaomoji"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                padding: "8px 16px",
                fontSize: 13,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              All Kaomoji →
            </Link>
          </div>
        </section>

        <RelatedLinks
          links={relatedForKaomoji()}
          heading="Related — emoji, Lenny faces & bio tools"
        />
      </div>
    </>
  );
}
