import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForGaming } from "@/lib/related";
import {
  GAMING_SYMBOL_SETS,
  getGamingSet,
  gamingSetsByKind,
} from "@/data/gaming-symbols";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import GamingCopyGrid from "@/components/GamingCopyGrid";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return GAMING_SYMBOL_SETS.map(s => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const set = getGamingSet(slug);
  if (!set) return {};
  // No "| CopyChars" suffix — layout.tsx's title template appends it once.
  const title = set.kind === "game"
    ? `${set.name} Name Symbols — Copy & Paste Stylish Names`
    : `${set.name} — Copy & Paste for Gaming Names`;
  const description = `Copy stylish ${set.name} ${set.kind === "game" ? "name symbols" : "symbols"} and ready-made name templates. ${set.tagline}. Paste into your in-game name, clan tag, or bio — works on Android, iOS, PC.`;
  const url = `https://www.copychars.com/gaming-symbols/${slug}`;
  return {
    title,
    description,
    keywords: set.keywords,
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/gaming-symbols/${slug}`),
  };
}

export default async function GamingSymbolSpoke({ params }: Props) {
  const { slug } = await params;
  const set = getGamingSet(slug);
  if (!set) notFound();

  const s = set!;
  const h1 = s.kind === "game" ? `${s.name} Name Symbols` : s.name;

  // Siblings of the same kind (rotated to start after self → unique per page).
  const sameKind = gamingSetsByKind(s.kind);
  const selfIdx = sameKind.findIndex(x => x.slug === s.slug);
  const siblings = [
    ...sameKind.slice(selfIdx + 1),
    ...sameKind.slice(0, selfIdx),
  ].slice(0, 9);

  const baseUrl = "https://www.copychars.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Gaming Symbols", item: `${baseUrl}/gaming-symbols` },
          { "@type": "ListItem", position: 3, name: h1, item: `${baseUrl}/gaming-symbols/${s.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "DefinedTerm",
        name: h1,
        description: s.intro,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Gaming Name Symbols",
          url: `${baseUrl}/gaming-symbols`,
        },
        url: `${baseUrl}/gaming-symbols/${s.slug}`,
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
          <Link href="/gaming-symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Gaming Symbols</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{s.name}</span>
        </div>

        {/* Header */}
        <div className="section-label">{s.kind === "game" ? "Gaming name symbols" : "Gaming symbols"}</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
          {h1}
        </h1>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "22px 26px", marginBottom: 40, maxWidth: 820 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>{s.intro}</p>
        </div>

        {/* Symbols */}
        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            {s.name} symbols
          </h2>
          <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 16px" }}>
            Click any symbol to copy it. Mix and match to build your own name.
          </p>
          <GamingCopyGrid items={s.symbols} variant="symbol" />
        </section>

        {/* Name templates */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Ready-made {s.name} name ideas
          </h2>
          <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 16px" }}>
            Click to copy a template, then replace <strong style={{ color: "var(--text2)" }}>NAME</strong> with your own.
          </p>
          <GamingCopyGrid items={s.nameExamples} variant="template" />
        </section>

        {/* FAQ — visible text mirrors the FAQPage schema above. */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>
            {s.name} name symbols — FAQ
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {s.faqs.map((f, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Siblings */}
        {siblings.length > 0 && (
          <section style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
              <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                {s.kind === "game" ? "More games" : "More symbol styles"}
              </h2>
              <Link href="/gaming-symbols" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {siblings.map(x => (
                <Link
                  key={x.slug}
                  href={`/gaming-symbols/${x.slug}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{x.symbols.slice(0, 3).join(" ")}</span>
                  <span className="symbol-name">{x.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedLinks links={relatedForGaming()} heading="Related — symbols, fancy text & username tools" />
      </div>
    </>
  );
}
