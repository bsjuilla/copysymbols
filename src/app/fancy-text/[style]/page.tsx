import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import FancyTextClient from "../FancyTextClient";
import { canonical } from "@/lib/canonical";
import { STYLES, findStyle } from "@/lib/fancy-text-styles";

interface Props { params: Promise<{ style: string }> }

export async function generateStaticParams() {
  return STYLES.map(s => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style } = await params;
  const s = findStyle(style);
  if (!s) return {};
  return {
    title: `${s.label} Text Generator — Copy & Paste ${s.example}`,
    description: `${s.description} Convert any text to ${s.label.toLowerCase()} (${s.example}). Works on Instagram, TikTok, Discord, X, WhatsApp. One click to copy.`,
    keywords: [
      `${s.label.toLowerCase()} text generator`,
      `${s.label.toLowerCase()} text copy paste`,
      `${s.label.toLowerCase()} font`,
      `${s.label.toLowerCase()} unicode`,
      "fancy text generator",
    ],
    ...canonical(`/fancy-text/${s.slug}`),
  };
}

export default async function FancyTextStylePage({ params }: Props) {
  const { style } = await params;
  const s = findStyle(style);
  if (!s) notFound();

  // Per-style FAQ (3 entries — focused on the specific style for AI citations)
  const faqs = [
    {
      q: `What is ${s.label.toLowerCase()} text?`,
      a: `${s.description} The output (${s.example}) is real Unicode text — not formatting or images — so it pastes anywhere you can type.`,
    },
    {
      q: `Where can I use ${s.label.toLowerCase()} text?`,
      a: `Anywhere that accepts Unicode input: Instagram bios and captions, TikTok captions, Discord usernames and messages, X (Twitter) posts, WhatsApp, Tumblr, Reddit comments, YouTube descriptions, LinkedIn posts. Some platforms (Instagram and TikTok @handles, certain forms) restrict to ASCII — those won't render the styled characters.`,
    },
    {
      q: `Is ${s.label.toLowerCase()} text safe to use in usernames?`,
      a: `Yes on Discord, X (Twitter) display names, WhatsApp display names, and Tumblr. No on Instagram and TikTok @handles, which require ASCII letters/numbers/periods/underscores. Always check the platform's username rules — some count Unicode characters as multiple bytes against length limits.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <FancyTextClient initialFocusSlug={s.slug} showHubLink />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 16 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>About {s.label.toLowerCase()} text</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {faqs.map(f => (
              <div key={f.q}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
