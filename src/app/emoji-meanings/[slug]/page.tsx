import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";
import { EMOJI_MEANINGS, getEmojiMeaning } from "@/data/emoji-meanings";
import { renderSafety } from "@/lib/render-safety";

export function generateStaticParams() {
  return EMOJI_MEANINGS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEmojiMeaning(slug);
  if (!e) return {};
  const title = `What Does ${e.emoji} Mean? ${e.name} Emoji Explained`;
  return {
    title,
    description: `${e.emoji} ${e.name}: ${e.short} Meaning, tone, an example, and one-click copy.`,
    keywords: e.keywords,
    ...canonical(`/emoji-meanings/${slug}`),
    openGraph: { title, description: e.short, url: `https://www.copychars.com/emoji-meanings/${slug}`, type: "article", siteName: "CopyChars" },
  };
}

const baseUrl = "https://www.copychars.com";

export default async function EmojiMeaningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEmojiMeaning(slug);
  if (!e) notFound();

  const safety = renderSafety(e.emoji);
  const related = e.related.map(getEmojiMeaning).filter((r): r is NonNullable<typeof r> => Boolean(r));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Emoji Meanings", item: `${baseUrl}/emoji-meanings` },
          { "@type": "ListItem", position: 3, name: e.name, item: `${baseUrl}/emoji-meanings/${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What does ${e.emoji} (${e.name}) mean?`,
            acceptedAnswer: { "@type": "Answer", text: `${e.meaning} Tone: ${e.tone}. Example — ${e.example}` },
          },
        ],
      },
    ],
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "44px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CopyToast />

      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
        <Link href="/emoji-meanings" style={{ color: "var(--text3)", textDecoration: "none" }}>Emoji Meanings</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: "var(--text2)" }}>{e.name}</span>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: "32px 24px", marginBottom: 28, textAlign: "center" }}>
        <EmojiCopyButton glyph={e.emoji} name={e.name} size="clamp(3rem, 9vw, 5rem)" />
      </div>

      <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.02em" }}>
        What does {e.emoji} mean?
      </h1>
      <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>{e.short}</p>
      <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 20 }}>{e.meaning}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        <span style={metaPill}><strong style={{ color: "var(--text)" }}>Tone:</strong> {e.tone}</span>
        <span style={{ ...metaPill, color: safety.overall === "safe" ? "#3fb950" : "#d29922", borderColor: safety.overall === "safe" ? "#3fb95040" : "#d2992240" }}>
          {safety.overall === "safe" ? "✓ Shows on all modern devices" : "⚠ Newer emoji — may box on old devices"}
        </span>
      </div>

      <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Example</div>
        <div style={{ fontSize: 15.5, color: "var(--text)" }}>{e.example}</div>
      </div>

      {e.origin && (
        <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.7, marginBottom: 24 }}>
          <strong style={{ color: "var(--text2)" }}>Origin:</strong> {e.origin}
        </p>
      )}

      {related.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Related meanings</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/emoji-meanings/${r.slug}`} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", textDecoration: "none", color: "inherit" }}>
                <span style={{ fontSize: "1.5rem", lineHeight: 1 }} aria-hidden>{r.emoji}</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{r.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/emoji-meanings" className="cat-pill">All Emoji Meanings</Link>
        <Link href="/emoji" className="cat-pill">Emoji</Link>
        <Link href="/emoji-combos" className="cat-pill">Emoji Combos</Link>
      </div>
    </div>
  );
}

const metaPill: React.CSSProperties = {
  fontSize: 13, color: "var(--text2)", background: "var(--surface)", border: "1px solid var(--border)",
  borderRadius: 100, padding: "5px 12px",
};
