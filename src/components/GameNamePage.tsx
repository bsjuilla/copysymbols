import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import { getGameRule } from "@/data/game-name-rules";
import { GAMING_SYMBOL_SETS, type GamingFaq } from "@/data/gaming-symbols";
import { relatedForGaming } from "@/lib/related";
import CopyToast from "@/components/CopyToast";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import RelatedLinks from "@/components/RelatedLinks";
import GameNameChecker from "@/app/game-name-checker/GameNameChecker";

// Discord has name rules but no gaming-symbols set — a small curated fallback so
// the /discord-name page is as rich as the others.
const DISCORD_SYMBOLS = ["✦", "★", "☆", "꧁", "꧂", "༒", "彡", "⚔", "☠", "♛", "乂", "ღ", "⊹", "✧", "「", "」", "『", "』"];
const DISCORD_EXAMPLES = ["꧁༒NAME༒꧂", "✦ NAME ✦", "⚔ NAME ⚔", "「 NAME 」", "彡 NAME"];
const DISCORD_INTRO =
  "Discord display names and server nicknames accept the full Unicode range, so you can mix fancy fonts, symbols and emoji freely — unlike your @username, which only allows plain letters, numbers, dots and underscores. The symbols and ready-made names below paste straight into your display name.";
const DISCORD_FAQS: GamingFaq[] = [
  { q: "Can I use symbols in my Discord name?", a: "Yes — in your display name and server nicknames you can use the full range of Unicode symbols and fancy fonts. Your @username is the exception: it only allows a–z, 0–9, dots and underscores, so styled text won't save there." },
  { q: "How do I get a fancy font in my Discord name?", a: "Type your name into a fancy-text generator, copy the styled version, then paste it into Settings → Profile → Display Name (or right-click your name in a server to set a nickname). The Game Name Checker above confirms it fits Discord's rules." },
  { q: "Can I have an invisible Discord name?", a: "An invisible display name works using the Hangul Filler character (U+3164) — copy it from the checker above. An invisible @username does not work, because that field rejects it." },
];

/** Clean display name for titles ("BGMI / PUBG Mobile" → "BGMI"). */
function shortNameOf(name: string): string {
  return name.split(/\s*[(/]/)[0].trim();
}

export function gameNameMetadata(slug: string): Metadata {
  const rule = getGameRule(slug)!;
  const short = shortNameOf(rule.name);
  const title = `${short} Stylish Name — Symbols, Fonts & Rules`;
  const description = `Make a stylish ${short} name: copy decorative symbols and fancy fonts, check it against the ${rule.maxLen}-character limit and ${short}'s rules, and grab a tested invisible name. Free, no sign-up.`;
  return {
    title,
    description,
    keywords: [
      `${short.toLowerCase()} stylish name`,
      `${short.toLowerCase()} name symbols`,
      `${short.toLowerCase()} name copy paste`,
      `${short.toLowerCase()} name generator`,
      `${short.toLowerCase()} stylish name 2026`,
      "stylish gaming name",
    ],
    openGraph: { title, description, url: `https://www.copychars.com/${slug}-name`, type: "article", siteName: "CopyChars" },
    ...canonical(`/${slug}-name`),
  };
}

export default function GameNamePage({ slug }: { slug: string }) {
  const rule = getGameRule(slug)!;
  const set = GAMING_SYMBOL_SETS.find((s) => s.slug === slug);
  const short = shortNameOf(rule.name);

  const symbols = set?.symbols ?? DISCORD_SYMBOLS;
  const examples = set?.nameExamples ?? DISCORD_EXAMPLES;
  const intro = set?.intro ?? DISCORD_INTRO;
  const faqs = set?.faqs ?? DISCORD_FAQS;

  const baseUrl = "https://www.copychars.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Gaming Symbols", item: `${baseUrl}/gaming-symbols` },
          { "@type": "ListItem", position: 3, name: `${short} Name`, item: `${baseUrl}/${slug}-name` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${short} name symbols`,
        itemListElement: symbols.slice(0, 25).map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CopyToast />

      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
        <Link href="/gaming-symbols" style={{ color: "var(--text3)", textDecoration: "none" }}>Gaming Symbols</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: "var(--text2)" }}>{short} Name</span>
      </div>

      <div style={{ fontSize: "2.6rem", lineHeight: 1, marginBottom: 12 }}>{rule.icon}</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.03em" }}>
        {short} Stylish Name
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.7 }}>{intro}</p>

      {/* Checker locked to this game (input + verdict + invisible name + rules box) */}
      <h2 className="font-display" style={sectionH2}>Check &amp; build your {short} name</h2>
      <p style={para}>Type a name to see if it fits {short}&rsquo;s limit and rules before you use a rename.</p>
      <GameNameChecker lockedGame={slug} />

      {/* Symbols */}
      <h2 className="font-display" style={{ ...sectionH2, marginTop: 48 }}>{short} name symbols</h2>
      <p style={para}>Tap any symbol to copy it, then drop it into your name. Keep an eye on the character count above — every symbol counts toward {short}&rsquo;s {rule.maxLen}-character limit.</p>
      <CopySymbolGrid items={symbols.map((s) => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(88px, 1fr))" />

      {/* Ready-made names */}
      <h2 className="font-display" style={{ ...sectionH2, marginTop: 40 }}>Ready-made {short} names</h2>
      <p style={para}>Copy a template and replace <strong>NAME</strong> with your own.</p>
      <CopySymbolGrid items={examples.map((e) => ({ symbol: e, name: "name template" }))} columns="repeat(auto-fill, minmax(200px, 1fr))" />

      {/* FAQ */}
      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={sectionH2}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/game-name-checker" className="cat-pill">All-game Name Checker</Link>
        <Link href="/gaming-symbols" className="cat-pill">Gaming Symbols</Link>
        <Link href="/fancy-text" className="cat-pill">Fancy Text</Link>
        <Link href="/username-generator" className="cat-pill">Username Generator</Link>
      </div>

      <RelatedLinks links={relatedForGaming()} heading="Related — gaming names & symbols" />
    </div>
  );
}

const sectionH2: React.CSSProperties = { fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 };
const para: React.CSSProperties = { fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 16, maxWidth: 660 };
