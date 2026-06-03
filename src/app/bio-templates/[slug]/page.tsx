import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  bioTemplates,
  getBioTemplateBySlug,
  getBioTemplatesByVibe,
  bioVibes,
  bioPlatforms,
  type BioTemplate,
} from "@/data/collections/bio-templates";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return bioTemplates.map(b => ({ slug: b.slug }));
}

export const dynamicParams = false;

function vibeMeta(vibeId: string) {
  return bioVibes.find(v => v.id === vibeId);
}

function platformMeta(platformId: string) {
  return bioPlatforms.find(p => p.id === platformId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBioTemplateBySlug(slug);
  if (!b) return {};
  const pMeta = platformMeta(b.platform);
  const title = `${b.name} — ${pMeta?.name ?? b.platform} Bio Template`;
  const description = `Ready-to-paste ${b.vibe.toLowerCase()} bio template for ${pMeta?.name ?? b.platform}. ${b.vibeNote} Fill in ${b.placeholders.length} placeholders and paste.`;
  const url = `https://www.copychars.com/bio-templates/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${b.platform} bio template`,
      `${b.vibe.toLowerCase()} bio template`,
      `${pMeta?.name?.toLowerCase() ?? b.platform} bio copy paste`,
      "aesthetic bio template",
      "bio generator",
      ...b.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/bio-templates/${slug}`),
  };
}

export default async function BioTemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const b = getBioTemplateBySlug(slug);
  if (!b) notFound();

  const vibe = vibeMeta(b!.vibe);
  const pMeta = platformMeta(b!.platform);
  const related: BioTemplate[] = getBioTemplatesByVibe(b!.vibe)
    .filter(r => r.slug !== b!.slug)
    .slice(0, 9);

  const baseUrl = "https://www.copychars.com";
  const overLimit = pMeta && b!.charCount > pMeta.charLimit;

  const faqs = [
    { q: `Can I just copy this template and paste it into ${pMeta?.name ?? b!.platform}?`, a: `Yes — but replace the {PLACEHOLDER} fields first. Paste the template into a notes app, swap each {NAME}, {ROLE}, {CITY} (etc.) with your own text, then copy the filled-in version and paste it into your ${pMeta?.name ?? b!.platform} bio. ${pMeta?.name === "TikTok" ? "TikTok's 80-char limit is tight — count your filled version before saving." : ""}` },
    { q: `Will the line breaks show on ${pMeta?.name ?? b!.platform}?`, a: pMeta?.name === "Twitter / X" ? "Twitter/X preserves line breaks in your bio but renders them as space on the public profile view in some clients. The breaks survive the data but visual presentation varies." : pMeta?.name === "TikTok" ? "TikTok bios render line breaks correctly on iOS and Android. Web view sometimes collapses them — preview before saving." : "Yes — Instagram, LinkedIn, Bumble, and YouTube About sections all preserve \\n line breaks in bios." },
    { q: `Why does this template use ${b!.vibe.toLowerCase()} decorations?`, a: `${vibe?.description ?? `The ${b!.vibe.toLowerCase()} aesthetic signals a specific mood — the decorations are part of that signal.`} ${b!.vibeNote}` },
    { q: `Can I edit the decorations or shorten the template?`, a: "Absolutely. Templates are starting points — keep what works, drop what doesn't. If you need a shorter version, remove a line or two; if you want a different feel, swap the decorations (✦ → ♡, ─ → ━, etc.). Browse other templates on this page for decoration ideas." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Bio Templates", item: `${baseUrl}/bio-templates` },
          { "@type": "ListItem", position: 3, name: b!.name, item: `${baseUrl}/bio-templates/${slug}` },
        ],
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

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/bio-templates" style={{ color: "var(--text3)", textDecoration: "none" }}>Bio Templates</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{b!.name}</span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="section-label">{pMeta?.name ?? b!.platform} · {vibe?.name ?? b!.vibe}</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginTop: 6 }}>
            {b!.name}
          </h1>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.7, maxWidth: 700, marginTop: 8 }}>
            {b!.vibeNote}
          </p>
        </div>

        {/* Hero with template */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 28px 24px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 160, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.10), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <pre style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "var(--text)", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.7, marginBottom: 20 }}>{b!.template}</pre>
            <EmojiCopyButton glyph={b!.template} name={b!.name} />
          </div>
        </div>

        {/* Specs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 40 }}>
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 6 }}>Platform</div>
            <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 14, color: "var(--accent)" }}>{pMeta?.name ?? b!.platform}</div>
          </div>
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 6 }}>Vibe</div>
            <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 14, color: "var(--teal)" }}>{vibe?.name ?? b!.vibe}</div>
          </div>
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 6 }}>Length</div>
            <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 14, color: overLimit ? "#ff6b6b" : "var(--text)" }}>
              {b!.charCount} / {pMeta?.charLimit ?? "?"}
            </div>
          </div>
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-dm-mono), monospace", color: "var(--text3)", marginBottom: 6 }}>Placeholders</div>
            <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 14, color: "var(--text)" }}>{b!.placeholders.length}</div>
          </div>
        </div>

        {/* Placeholders list */}
        {b!.placeholders.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <div className="section-label">Fill in these placeholders</div>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>What to swap in</h2>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 16 }}>
              The template has {b!.placeholders.length} placeholder{b!.placeholders.length === 1 ? "" : "s"} wrapped in <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>{`{CURLY_BRACES}`}</code>. Copy the template, then find-and-replace each placeholder with your own text. Remember the platform&apos;s character limit when picking word lengths.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {b!.placeholders.map(p => (
                <span key={p} style={{ fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text2)", background: "var(--surface)", fontFamily: "var(--font-dm-mono), monospace" }}>{`{${p}}`}</span>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginBottom: 48 }}>
          <div className="section-label">Use it on {pMeta?.name ?? b!.platform}</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            How to use this template
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>1 · Copy</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Click the Copy button above to grab the full template — symbols, line breaks, and placeholders included.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>2 · Personalise</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Paste it into a notes app first. Replace each <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>{`{PLACEHOLDER}`}</code> with your text. Keep the symbols and line breaks intact — they&apos;re what makes the template feel intentional.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>3 · Paste in {pMeta?.name ?? b!.platform}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                {pMeta?.description ?? "Paste into your bio field and save."} {overLimit ? `⚠ This template is over the ${pMeta?.charLimit}-char limit — trim or shorten placeholders before saving.` : `Your filled-in version should land near the ${pMeta?.charLimit}-char limit; trim words if it spills over.`}
              </p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More {vibe?.name ?? b!.vibe} templates</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  Same vibe, different platforms
                </h2>
              </div>
              <Link href="/bio-templates" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
              {related.map(r => {
                const rPlatform = platformMeta(r.platform);
                return (
                  <Link
                    key={r.slug}
                    href={`/bio-templates/${r.slug}`}
                    prefetch={false}
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 16px 14px", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "inherit", transition: "border-color 0.15s" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-dm-mono), monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>{rPlatform?.name ?? r.platform}</div>
                    </div>
                    <pre style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, color: "var(--text3)", margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.5, maxHeight: 80, overflow: "hidden" }}>{r.template}</pre>
                  </Link>
                );
              })}
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
