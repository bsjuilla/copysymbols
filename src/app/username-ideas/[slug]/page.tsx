import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import UsernameGeneratorClient from "../../username-generator/UsernameGeneratorClient";
import UsernameExamplesGrid from "./UsernameExamplesGrid";
import { canonical } from "@/lib/canonical";
import {
  USERNAME_IDEAS,
  getUsernameIdea,
  buildExamples,
} from "@/data/username-ideas";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return USERNAME_IDEAS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getUsernameIdea(slug);
  if (!page) return {};
  const url = `https://www.copychars.com/username-ideas/${slug}`;
  const kw = page.kind === "vibe"
    ? [`${page.slug} usernames`, `${page.slug} username ideas`, `${page.slug} username generator`, `${page.slug} names`, "aesthetic usernames", "fancy username generator"]
    : [`${page.name.toLowerCase()} username ideas`, `${page.name.toLowerCase()} name ideas`, `${page.name.toLowerCase()} username generator`, `fancy ${page.name.toLowerCase()} name`, "aesthetic usernames", "username generator"];
  return {
    title: page.title,
    description: page.description,
    keywords: kw,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "website",
      siteName: "CopyChars",
    },
    twitter: { card: "summary", title: page.title, description: page.description },
    ...canonical(`/username-ideas/${slug}`),
  };
}

export default async function UsernameIdeaPage({ params }: Props) {
  const { slug } = await params;
  const page = getUsernameIdea(slug);
  if (!page) notFound();

  const examples = buildExamples(page!, 24);
  const related = page!.related
    .map((s) => getUsernameIdea(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Username Ideas", item: `${baseUrl}/username-ideas` },
          { "@type": "ListItem", position: 3, name: page!.h1, item: `${baseUrl}/username-ideas/${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page!.faqs.map(({ q, a }) => ({
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
      <CopyToast />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/username-ideas" style={{ color: "var(--text3)", textDecoration: "none" }}>Username Ideas</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{page!.name}</span>
        </div>

        {/* Header */}
        <div className="section-label">{page!.kind === "vibe" ? "Username ideas by vibe" : "Username ideas by platform"}</div>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.03em" }}>
          {page!.h1}
        </h1>
        <p style={{ fontSize: 17, color: "var(--text2)", marginBottom: 24, lineHeight: 1.6, maxWidth: 640 }}>
          {page!.tagline}
        </p>
        {page!.intro.map((para, i) => (
          <p key={i} style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 16, maxWidth: 720 }}>
            {para}
          </p>
        ))}

        {/* Server-rendered example usernames */}
        <section style={{ marginTop: 36 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            {page!.h1} — examples
          </h2>
          <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 20 }}>
            Click any name to copy it. Want it with your own name? Use the generator below.
          </p>
          <UsernameExamplesGrid examples={examples} />
        </section>

        {/* Embedded live generator (vibe pre-selected) */}
        <section style={{ marginTop: 56, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Generate {page!.kind === "vibe" ? `${page!.name.toLowerCase()} usernames` : `${page!.name} usernames`} from your name
          </h2>
          <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 20 }}>
            Type your name or word and press Generate — the {page!.kind === "vibe" ? `${page!.name} vibe` : "vibe filter"} is already selected.
          </p>
          <UsernameGeneratorClient
            embedded
            initialName={page!.seeds[0]}
            initialVibe={page!.vibe ?? "all"}
          />
        </section>

        {/* Tips */}
        <section style={{ marginTop: 56, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            {page!.kind === "platform" ? `Using fancy names on ${page!.name}` : `Tips for ${page!.name.toLowerCase()} usernames`}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {page!.tips.map((t) => (
              <div key={t.h}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>{t.h}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{t.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {page!.faqs.map((f) => (
              <div key={f.q}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>More username ideas & text tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/username-ideas/${r.slug}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
                <div style={{ fontWeight: 500 }}>{r.h1}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{r.tagline}</div>
              </Link>
            ))}
            <Link href="/username-generator" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>✦ Username Generator</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>All vibes, one tool</div>
            </Link>
            <Link href="/fancy-text" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>𝓕 Fancy Text</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>Style your bio too</div>
            </Link>
            <Link href="/character-counter" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}># Character Counter</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>Check name limits</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
