import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  emojiCombos,
  getComboBySlug,
  getCombosByTheme,
  comboThemes,
  type ComboItem,
} from "@/data/collections/emoji-combos";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import EmojiCopyButton from "@/components/EmojiCopyButton";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return emojiCombos.map(c => ({ slug: c.slug }));
}

export const dynamicParams = false;

function themeMeta(themeId: string) {
  return comboThemes.find(t => t.id === themeId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getComboBySlug(slug);
  if (!c) return {};
  const title = `${c.name} ${c.combo} — Emoji Combo Copy & Paste | CopyChars`;
  const description = `Copy the ${c.name} emoji combo (${c.combo}) for free. ${c.vibe} Paste into Instagram bio, TikTok caption, Twitter or anywhere you write text.`;
  const url = `https://www.copychars.com/emoji-combos/${slug}`;
  return {
    title,
    description,
    keywords: [
      `${c.name.toLowerCase()} emoji combo`,
      `${c.theme.toLowerCase()} emoji combo`,
      `${c.combo} copy paste`,
      "emoji aesthetic",
      "bio emojis",
      ...c.keywords,
    ],
    openGraph: { title, description, url, type: "article", siteName: "CopyChars" },
    twitter: { card: "summary", title, description },
    ...canonical(`/emoji-combos/${slug}`),
  };
}

export default async function ComboDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = getComboBySlug(slug);
  if (!c) notFound();

  const theme = themeMeta(c!.theme);
  const related: ComboItem[] = getCombosByTheme(c!.theme)
    .filter(r => r.slug !== c!.slug)
    .slice(0, 12);

  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Emoji Combos", item: `${baseUrl}/emoji-combos` },
          { "@type": "ListItem", position: 3, name: c!.name, item: `${baseUrl}/emoji-combos/${slug}` },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: `${c!.name} emoji combo`,
        description: `${c!.name} — ${c!.vibe}`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Emoji Combos for Bios & Captions",
          url: `${baseUrl}/emoji-combos`,
        },
        url: `${baseUrl}/emoji-combos/${slug}`,
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
          <Link href="/emoji-combos" style={{ color: "var(--text3)", textDecoration: "none" }}>Emoji Combos</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>{c!.name}</span>
        </div>

        <div className="detail-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap" }}>
          <div style={{ width: 360, flexShrink: 0, maxWidth: "100%" }}>
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 28, padding: "56px 24px 40px", textAlign: "center", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12), transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <EmojiCopyButton glyph={c!.combo} name={c!.name} size="clamp(2.4rem, 6vw, 4rem)" />
                <h1 className="font-display" style={{ marginTop: 24, marginBottom: 6, fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                  {c!.name}
                </h1>
                <Link href="/emoji-combos" style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  {theme?.name ?? c!.theme}
                </Link>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>The vibe</div>
              <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: "var(--text)" }}>{c!.name}</strong> is a <strong style={{ color: "var(--text)" }}>{theme?.name ?? c!.theme}</strong> emoji combo. {c!.vibe}
              </p>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                Click the {c!.combo} above to copy the full combo to your clipboard, then paste it into Instagram bios, TikTok captions, Twitter/X posts, YouTube descriptions, Tumblr blogs, or anywhere else you write text. {theme?.description}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Theme</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--accent)" }}>{theme?.name ?? c!.theme}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Emoji count</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "var(--teal)" }}>{c!.emojiCount}</div>
              </div>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px 18px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace", color: "var(--text3)", marginBottom: 6 }}>Keywords</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {c!.keywords.map(k => (
                    <span key={k} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--bg)" }}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label">Where it works</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            Using {c!.name} {c!.combo} in your posts
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c!.combo}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Instagram & TikTok bio</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Drop {c!.combo} into your bio to flag your aesthetic. Pair it with a one-line role and a link. The {c!.emojiCount}-emoji combo takes minimal bio space and reads instantly to anyone scanning.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Captions & comments</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Use it as a caption opener or signature on themed posts. {c!.combo} works as visual punctuation between a hook and a tagline, or as a self-contained reaction in comments.
              </p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Compatibility</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                Renders on iOS, Android, Mac, Windows, and the web. Note: some combos use ZWJ sequences (zero-width joiner) or variation selectors — if a paste destination strips these, the visual may degrade slightly. Test before relying on it for a critical post.
              </p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <div>
                <div className="section-label">More from this theme</div>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
                  More {theme?.name ?? c!.theme} combos
                </h2>
              </div>
              <Link href="/emoji-combos" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/emoji-combos/${r.slug}`}
                  className="symbol-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                  prefetch={false}
                >
                  <span className="symbol-char">{r.combo}</span>
                  <span className="symbol-name">{r.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {[
            { q: `What does the ${c!.name} emoji combo mean?`, a: `${c!.name} is a ${theme?.name ?? c!.theme}-themed combo. ${c!.vibe}` },
            { q: `How do I add emoji combos to my Instagram bio?`, a: `Click the ${c!.combo} above to copy it. Open Instagram → your profile → Edit Profile → Bio. Paste the combo into your bio field with Ctrl+V (Cmd+V on Mac, or long-press → Paste on mobile). Save. The combo renders as colored emojis everywhere your bio appears.` },
            { q: `Will this combo render on every device?`, a: `On modern iOS (≥14), Android (≥11), Mac, Windows 10+, and the web — yes. Older systems may show some emojis as a fallback or a placeholder box. The ${c!.emojiCount} emojis in this combo are standard Unicode and have wide compatibility.` },
            { q: `Can I use this combo on TikTok or Twitter?`, a: `Yes — both platforms render emoji combos natively in bios, captions, and comments. TikTok captions support up to 2,200 characters, Twitter posts 280, Twitter bio 160. This combo is short enough to fit any of those.` },
          ].map(({ q, a }) => (
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
