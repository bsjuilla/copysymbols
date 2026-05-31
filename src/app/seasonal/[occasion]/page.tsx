import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForSeasonal } from "@/lib/related";
import { SEASONS, getSeason } from "@/data/seasonal";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import GamingCopyGrid from "@/components/GamingCopyGrid";

interface Props { params: Promise<{ occasion: string }> }

export async function generateStaticParams(): Promise<Array<{ occasion: string }>> {
  return SEASONS.map(s => ({ occasion: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occasion } = await params;
  const s = getSeason(occasion);
  if (!s) return {};
  // No "| CopyChars" suffix — layout.tsx's title template appends it once.
  const title = `${s.name} Emojis & Symbols ${s.emoji} — Copy & Paste`;
  const description = `Copy and paste ${s.name} emojis and symbols — ${s.tagline.toLowerCase()}. Ready-made combos for bios, captions and messages. Real Unicode, works on iPhone, Android, Windows & Mac.`;
  const url = `https://www.copychars.com/seasonal/${s.slug}`;
  return {
    title,
    description,
    keywords: s.keywords,
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/seasonal/${s.slug}`),
  };
}

export default async function SeasonalSpoke({ params }: Props) {
  const { occasion } = await params;
  const s = getSeason(occasion);
  if (!s) notFound();

  const season = s!;
  const siblings = SEASONS.filter(x => x.slug !== season.slug);
  const baseUrl = "https://www.copychars.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Seasonal", item: `${baseUrl}/seasonal` },
          { "@type": "ListItem", position: 3, name: season.name, item: `${baseUrl}/seasonal/${season.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: season.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "DefinedTerm",
        name: `${season.name} Symbols`,
        description: season.intro,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Seasonal & Holiday Symbols",
          url: `${baseUrl}/seasonal`,
        },
        url: `${baseUrl}/seasonal/${season.slug}`,
      },
    ],
  };

  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 28, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/seasonal" style={{ color: "var(--text3)", textDecoration: "none" }}>Seasonal</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{season.name}</span>
        </div>

        {/* Header */}
        <div className="section-label">Copy &amp; Paste</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 10 }}>
          {season.name} Emojis &amp; Symbols
        </h1>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 13, padding: "5px 12px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--accent)", background: "var(--surface)" }}>{season.dateLabel}</span>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "22px 26px", marginBottom: 40, maxWidth: 820 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>{season.intro}</p>
        </div>

        {/* Symbols */}
        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{season.name} emojis &amp; symbols</h2>
          <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 16px" }}>Click any symbol to copy it.</p>
          <GamingCopyGrid items={season.symbols} variant="symbol" />
        </section>

        {/* Combos */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{season.name} emoji combos</h2>
          <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 16px" }}>Ready-made strings for your bio or caption — click to copy.</p>
          <GamingCopyGrid items={season.combos} variant="template" />
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>{season.name} symbols — FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {season.faqs.map((f, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Siblings */}
        <section style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>More occasions</h2>
            <Link href="/seasonal" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
            {siblings.map(x => (
              <Link
                key={x.slug}
                href={`/seasonal/${x.slug}`}
                className="symbol-card"
                style={{ textDecoration: "none", color: "inherit" }}
                prefetch={false}
              >
                <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{x.emoji}</span>
                <span className="symbol-name">{x.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <RelatedLinks links={relatedForSeasonal()} heading="Related — emoji, combos & bio tools" />
      </div>
    </>
  );
}
