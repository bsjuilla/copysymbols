import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import { symbols } from "@/data/symbols";
import { platformIds, getPlatform } from "@/data/collections/platforms";
import SymbolCopyButtons from "@/components/SymbolCopyButtons";
import CopyToast from "@/components/CopyToast";

export const dynamicParams = false;

const curatedSymbols = symbols.filter(s => !s.id.startsWith("gen-"));
const symbolById = new Map(curatedSymbols.map(s => [s.id, s]));

interface Props {
  params: Promise<{ slug: string; platform: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string; platform: string }>> {
  const out: { slug: string; platform: string }[] = [];
  for (const s of curatedSymbols) {
    for (const p of platformIds) {
      out.push({ slug: s.id, platform: p });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, platform } = await params;
  const s = symbolById.get(slug);
  const p = getPlatform(platform);
  if (!s || !p) return { title: "Not found" };
  // Short per-page title — root layout's metadata.title.template
  // auto-appends the brand suffix, so we keep this short for SERP fit.
  const title = `${s.name} for ${p.name} — Copy & Paste`;
  // Vary description per platform using tagline + bioLimit so each of the
  // 6 platform variants ships unique copy (avoid boilerplate dup penalty).
  const description = `Add ${s.name} ${s.symbol} to your ${p.name} bio (limit ${p.bioLimit} chars) — ${p.tagline.toLowerCase()}. One-tap copy and ${p.name}-friendly related symbols.`;
  return {
    title,
    description,
    ...canonical(`/symbol/${s.id}/in-${p.id}`),
    openGraph: {
      title,
      description,
      url: `https://www.copychars.com/symbol/${s.id}/in-${p.id}`,
      type: "website",
      siteName: "CopyChars",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function SymbolInPlatformPage({ params }: Props) {
  const { slug, platform } = await params;
  const s = symbolById.get(slug);
  const p = getPlatform(platform);
  if (!s || !p) notFound();

  // Related: prefer 3 from same category; fallback to first 3 curated symbols
  // excluding the current one if no category match exists.
  const sameCategory = curatedSymbols
    .filter(x => x.id !== s!.id && s!.category && x.category === s!.category)
    .slice(0, 3);
  const related =
    sameCategory.length > 0
      ? sameCategory
      : curatedSymbols.filter(x => x.id !== s!.id).slice(0, 3);

  // Spread by code points so combining sequences count correctly.
  const charCount = Array.from(s!.symbol).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.copychars.com" },
      { "@type": "ListItem", position: 2, name: s!.name, item: `https://www.copychars.com/symbol/${s!.id}` },
      { "@type": "ListItem", position: 3, name: p!.name, item: `https://www.copychars.com/symbols-for/${p!.id}` },
      { "@type": "ListItem", position: 4, name: `${s!.name} for ${p!.name}`, item: `https://www.copychars.com/symbol/${s!.id}/in-${p!.id}` },
    ],
  };

  return (
    <>
      <CopyToast />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            marginBottom: 24,
            fontSize: 13,
            color: "var(--text3)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href={`/symbol/${s!.id}`} style={{ color: "var(--text3)", textDecoration: "none" }}>{s!.name}</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href={`/symbols-for/${p!.id}`} style={{ color: "var(--text3)", textDecoration: "none" }}>{p!.name}</Link>
        </nav>

        <h1
          className="font-display"
          style={{ fontSize: 32, color: "var(--accent)", marginBottom: 16, letterSpacing: "-0.02em" }}
        >
          {s!.name} for {p!.name}
        </h1>

        {/* Hero: big symbol + unicode codepoint */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 32,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 96, lineHeight: 1, marginBottom: 16, color: "var(--text)" }}>{s!.symbol}</div>
          {s!.unicode && (
            <div
              style={{
                color: "var(--text3)",
                fontSize: 13,
                fontFamily: "DM Mono, monospace",
                letterSpacing: "0.06em",
              }}
            >
              {s!.unicode}
            </div>
          )}
          {/* Copy buttons — same component used on the parent symbol detail page. */}
          <SymbolCopyButtons symbol={s!} />
        </div>

        {/* Platform-specific paragraph */}
        <p style={{ color: "var(--text2)", marginBottom: 16, lineHeight: 1.7 }}>
          The {s!.name} symbol ({s!.symbol}) renders correctly in {p!.name} usernames, bios,
          and messages. Copy it from the box above, then paste anywhere in your {p!.name} profile
          or post — it&apos;s real Unicode, not an image, so it stays text-selectable and searchable.
        </p>

        {p!.bioLimit ? (
          <p style={{ color: "var(--text3)", fontSize: 14, marginBottom: 24 }}>
            {p!.name} bio character limit: <strong style={{ color: "var(--text2)" }}>{p!.bioLimit}</strong>.
            This symbol counts as {charCount} character{charCount === 1 ? "" : "s"}.
          </p>
        ) : null}

        {/* Related symbols */}
        {related.length > 0 && (
          <>
            <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 16, color: "var(--text)" }}>
              Related symbols for {p!.name}
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/symbol/${r.id}/in-${p!.id}`}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{r.symbol}</span>
                  <span style={{ fontSize: 13 }}>{r.name}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
