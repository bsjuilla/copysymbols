import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";
import { USERNAME_IDEAS } from "@/data/username-ideas";

export const metadata: Metadata = {
  title: "Username Ideas — Aesthetic, Cute, Edgy & by Platform",
  description:
    "Browse username ideas by vibe (aesthetic, cute, edgy, soft, Y2K) and by platform (Discord, Roblox, TikTok, Instagram). 100+ examples per page plus a free generator. One click to copy.",
  keywords: [
    "username ideas", "aesthetic usernames", "cute usernames", "edgy usernames",
    "discord username ideas", "roblox username ideas", "tiktok username ideas",
    "instagram username ideas", "fancy username generator", "name ideas",
  ],
  ...canonical("/username-ideas"),
};

const vibePages = USERNAME_IDEAS.filter((p) => p.kind === "vibe");
const platformPages = USERNAME_IDEAS.filter((p) => p.kind === "platform");

const baseUrl = "https://www.copychars.com";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Username Ideas", item: `${baseUrl}/username-ideas` },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Username Ideas",
      url: `${baseUrl}/username-ideas`,
      description: "Username ideas by vibe and by platform, each with 100+ examples and a free generator.",
      hasPart: USERNAME_IDEAS.map((p) => ({
        "@type": "WebPage",
        name: p.h1,
        url: `${baseUrl}/username-ideas/${p.slug}`,
      })),
    },
  ],
};

function Card({ slug, h1, tagline }: { slug: string; h1: string; tagline: string }) {
  return (
    <Link
      href={`/username-ideas/${slug}`}
      style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px", textDecoration: "none", color: "var(--text)", display: "block", transition: "border-color 0.15s" }}
    >
      <div className="font-display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{h1}</div>
      <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.5 }}>{tagline}</div>
    </Link>
  );
}

export default function UsernameIdeasHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="section-label">Username ideas</div>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.03em" }}>
          Username Ideas
        </h1>
        <p style={{ fontSize: 17, color: "var(--text2)", marginBottom: 16, lineHeight: 1.6, maxWidth: 680 }}>
          Pick a direction below — a <strong style={{ color: "var(--text)" }}>vibe</strong> (the overall look) or a <strong style={{ color: "var(--text)" }}>platform</strong> (where you&apos;ll use it). Each page has 100+ ready-to-copy example usernames plus a generator that restyles your own name in that vibe.
        </p>
        <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7, maxWidth: 680 }}>
          Every name is real Unicode text — not an image — so one click copies it straight into a Discord display name, Instagram or TikTok nickname, Roblox display name, or any bio field.
        </p>

        {/* By vibe */}
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>By vibe</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 44 }}>
          {vibePages.map((p) => (
            <Card key={p.slug} slug={p.slug} h1={p.h1} tagline={p.tagline} />
          ))}
        </div>

        {/* By platform */}
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>By platform</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 44 }}>
          {platformPages.map((p) => (
            <Card key={p.slug} slug={p.slug} h1={p.h1} tagline={p.tagline} />
          ))}
        </div>

        {/* CTA to generator */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 28px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Just want to roll the dice?</div>
            <div style={{ fontSize: 14, color: "var(--text3)" }}>The full generator mixes every font and ornament across all vibes.</div>
          </div>
          <Link href="/username-generator" style={{ background: "var(--accent)", color: "white", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
            Open the Username Generator →
          </Link>
        </div>

        {/* Editorial cross-link (cool username ideas owned by the blog) */}
        <p style={{ fontSize: 14, color: "var(--text3)", marginTop: 28, lineHeight: 1.7 }}>
          Looking for inspiration rather than a tool? Read our guide to{" "}
          <Link href="/blog/cool-username-ideas" style={{ color: "var(--accent)", textDecoration: "none" }}>cool username ideas</Link>{" "}
          for naming strategies, or browse{" "}
          <Link href="/fancy-text" style={{ color: "var(--accent)", textDecoration: "none" }}>fancy text fonts</Link>{" "}
          to style your whole bio.
        </p>
      </div>
    </>
  );
}
