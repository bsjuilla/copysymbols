import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForGaming } from "@/lib/related";
import { GAME_NAME_RULES } from "@/data/game-name-rules";
import GameNameChecker from "./GameNameChecker";

const TITLE = "Game Name Checker — Will Your Stylish Name Be Accepted?";
const DESCRIPTION =
  "Check whether your Free Fire, BGMI, Valorant, Discord, Roblox or Fortnite name will be accepted before you pay to rename: character limit, banned symbols, stripped emoji, and the invisible-name character that works for each game.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "game name checker",
    "free fire name not working",
    "is my name allowed",
    "invisible game name",
    "free fire name length",
    "valorant name rules",
    "discord display name symbols",
    "roblox display name not working",
  ],
  ...canonical("/game-name-checker"),
};

const baseUrl = "https://www.copychars.com";

const faqs = [
  {
    q: "Why does my Free Fire / BGMI name get rejected?",
    a: "The two most common reasons are length and emoji. Free Fire limits the name to about 12 characters and BGMI to about 14, and every decorative symbol counts toward that limit. Colour emoji (🔥💀) are also stripped from the name field, while decorative symbols like ★ ♛ ꧁ ꧂ work. Type your name above and the checker shows the live character count and flags anything that will be removed.",
  },
  {
    q: "How do I make an invisible (blank) game name?",
    a: "Paste an invisible character into the name field instead of letters. The most reliable one is U+3164 (Hangul Filler), which the checker lets you copy with one tap for the games that support it (Free Fire, BGMI, Discord display names). If a game update starts rejecting it, copy the fallback U+2800 (Braille Blank). Invisible names do not work on Valorant, Roblox or Fortnite, which filter them out.",
  },
  {
    q: "Which games let you use fancy fonts and symbols in your name?",
    a: "Free Fire, BGMI and Discord display names keep most decorative Unicode symbols. Discord display names and server nicknames even keep fancy fonts and emoji. Valorant (Riot ID), Roblox and Fortnite are strict — they mostly allow only letters, numbers and spaces, so fancy fonts and symbols are usually rejected. The checker tells you which characters each game will keep.",
  },
  {
    q: "Will it tell me for sure if my name works?",
    a: "It's an honest guide based on each game's documented rules as of the date shown, but games change these limits with updates, so treat it as a strong hint rather than a guarantee. For the safest result, also confirm your symbols actually render with the Render Test, and avoid spending a paid rename until you've tested a name you're confident in.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Game Name Checker", item: `${baseUrl}/game-name-checker` },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Game Name Checker",
      url: `${baseUrl}/game-name-checker`,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function GameNameCheckerPage() {
  const games = GAME_NAME_RULES.map((g) => g.name).join(", ");
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CopyToast />

      <div className="section-label">Gaming tool</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Game Name Checker
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.7 }}>
        Before you spend diamonds or a rename card, check whether your stylish name will actually be accepted. Pick your game and type the name — this shows the live character count, flags emoji and symbols the game will strip or reject, and gives you the invisible-name character that works for each one. Covers {games}.
      </p>

      <GameNameChecker />

      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/gaming-symbols" className="cat-pill">Gaming Symbols</Link>
        <Link href="/username-generator" className="cat-pill">Username Generator</Link>
        <Link href="/fancy-text" className="cat-pill">Fancy Text</Link>
        <Link href="/render-test" className="cat-pill">Render Test</Link>
        <Link href="/invisible-character" className="cat-pill">Invisible Character</Link>
      </div>

      <RelatedLinks links={relatedForGaming()} heading="Related — gaming names & symbols" />
    </div>
  );
}
