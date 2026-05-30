import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForScript } from "@/lib/related";
import { SCRIPTS, getScript } from "@/data/scripts";
import { canonical } from "@/lib/canonical";
import CopySymbolGrid from "@/components/CopySymbolGrid";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return SCRIPTS.map(s => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getScript(slug);
  if (!s) return {};
  // No "| CopyChars" suffix — layout.tsx's title template appends it once.
  const title = `${s.name} Symbols & Letters — Copy & Paste (${s.nativeName})`;
  const description = `Copy and paste ${s.name} letters and symbols — ${s.groups.map(g => g.label.toLowerCase()).slice(0, 4).join(", ")}. Every character is real Unicode that pastes anywhere, with romanization. ${s.name} alphabet, click to copy.`;
  const url = `https://www.copychars.com/alphabets/${slug}`;
  return {
    title,
    description,
    keywords: s.keywords,
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/alphabets/${slug}`),
  };
}

export default async function ScriptSpoke({ params }: Props) {
  const { slug } = await params;
  const s = getScript(slug);
  if (!s) notFound();

  const sc = s!;
  const siblings = SCRIPTS.filter(x => x.slug !== sc.slug);
  const baseUrl = "https://www.copychars.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Alphabets", item: `${baseUrl}/alphabets` },
          { "@type": "ListItem", position: 3, name: `${sc.name} Symbols`, item: `${baseUrl}/alphabets/${sc.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: sc.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "DefinedTerm",
        name: `${sc.name} Script`,
        description: sc.intro,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "World Scripts & Alphabets",
          url: `${baseUrl}/alphabets`,
        },
        url: `${baseUrl}/alphabets/${sc.slug}`,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 28, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <Link href="/alphabets" style={{ color: "var(--text3)", textDecoration: "none" }}>Alphabets</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: "var(--text2)" }}>{sc.name}</span>
      </div>

      {/* Header */}
      <div className="section-label">Copy &amp; Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 10 }}>
        {sc.name} Symbols &amp; Letters
      </h1>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <span lang={sc.slug === "japanese" ? "ja" : sc.slug === "chinese" ? "zh" : sc.slug === "korean" ? "ko" : sc.slug === "russian" ? "ru" : "ar"} style={{ fontSize: 13, padding: "5px 12px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--accent)", background: "var(--surface)" }}>{sc.nativeName}</span>
        <span style={{ fontSize: 13, padding: "5px 12px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--surface)" }}>{sc.family}</span>
        {sc.direction === "rtl" && (
          <span style={{ fontSize: 13, padding: "5px 12px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--surface)" }}>Right-to-left</span>
        )}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "22px 26px", marginBottom: 40, maxWidth: 820 }}>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>{sc.intro}</p>
      </div>

      {/* Groups */}
      {sc.groups.map(g => (
        <section key={g.label} style={{ marginBottom: 36 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: g.note ? 4 : 14 }}>
            {sc.name} {g.label}
          </h2>
          {g.note && <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 14px" }}>{g.note}</p>}
          <CopySymbolGrid
            columns="repeat(auto-fill, minmax(110px, 1fr))"
            items={g.items.map(i => ({
              symbol: i.char,
              name: i.name ?? i.roman ?? "",
              use: i.name && i.roman ? i.roman : undefined,
            }))}
          />
        </section>
      ))}

      {/* FAQ — visible text mirrors the FAQPage schema above. */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>
          {sc.name} script — FAQ
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sc.faqs.map((f, i) => (
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
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>More alphabets</h2>
          <Link href="/alphabets" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          {siblings.map(x => (
            <Link
              key={x.slug}
              href={`/alphabets/${x.slug}`}
              className="symbol-card"
              style={{ textDecoration: "none", color: "inherit" }}
              prefetch={false}
            >
              <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{x.nativeName}</span>
              <span className="symbol-name">{x.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <RelatedLinks links={relatedForScript()} heading="Related — symbols, fancy text & tools" />
    </div>
  );
}
