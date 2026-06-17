import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import { STYLES } from "@/lib/fancy-text-styles";
import { allKaomoji } from "@/data/all-kaomoji";
import { emoji } from "@/data/emoji";

const kaomojiCount = allKaomoji.filter((k) => !k.isDuplicate).length;

export const metadata: Metadata = {
  title: "CopyChars API — Fancy Text, Kaomoji & Emoji JSON API for Developers",
  description:
    "A free JSON API for Unicode: fancy-text fonts, a username generator, kaomoji, emoji metadata, symbols and a render-safety checker. Build it into Discord bots and apps.",
  keywords: ["fancy text api", "unicode api", "kaomoji api", "emoji api", "username generator api", "discord bot api", "text styling api"],
  ...canonical("/developers"),
};

const BASE = "https://www.copychars.com/api/v1";

const ENDPOINTS: { method: string; path: string; desc: string; example: string }[] = [
  { method: "GET", path: "/fancy-text", desc: `Convert any text into ${STYLES.length} Unicode font styles (bold, script, gothic, bubble…).`, example: `${BASE}/fancy-text?text=alex&style=bold-script` },
  { method: "GET", path: "/username", desc: "Generate fancy usernames from a name + vibe (mixes fonts and ornament packs).", example: `${BASE}/username?name=luna&vibe=aesthetic&count=12` },
  { method: "GET", path: "/kaomoji", desc: `Search ${kaomojiCount} Japanese text emoticons by mood or keyword.`, example: `${BASE}/kaomoji?mood=happy&limit=10` },
  { method: "GET", path: "/emoji", desc: `Search ${emoji.length} emoji with official Unicode metadata — version, release year, codepoints, CLDR keywords.`, example: `${BASE}/emoji?q=cat&limit=5` },
  { method: "GET", path: "/symbols", desc: "Special characters by category, with Unicode / HTML / CSS codes.", example: `${BASE}/symbols?category=arrows&limit=20` },
  { method: "GET", path: "/render-check", desc: "Check whether text will render or show as boxes — a per-character verdict for iOS, Android, Windows and Discord.", example: `${BASE}/render-check?text=%F0%9D%96%8B%F0%9D%96%97%F0%9D%96%86%F0%9D%96%8A` },
  { method: "GET", path: "/meta", desc: "Live dataset counts and valid filter values (auto-updates with the site).", example: `${BASE}/meta` },
];

const baseUrl = "https://www.copychars.com";
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebAPI",
  name: "CopyChars API",
  description: "A free JSON API for Unicode fancy text, usernames, kaomoji, emoji metadata, symbols and render-safety checks.",
  documentation: `${baseUrl}/developers`,
  provider: { "@type": "Organization", name: "CopyChars", url: baseUrl },
};

const mono: React.CSSProperties = { fontFamily: "DM Mono, ui-monospace, monospace" };

export default function DevelopersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="section-label">For developers</div>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.03em" }}>
          CopyChars API
        </h1>
        <p style={{ fontSize: 17, color: "var(--text2)", lineHeight: 1.6, marginBottom: 16, maxWidth: 680 }}>
          A simple JSON API over the same Unicode data that powers this site: {STYLES.length} fancy-text fonts, a username
          generator, {kaomojiCount.toLocaleString()} kaomoji, {emoji.length.toLocaleString()} emoji with official metadata,
          symbols, and a render-safety checker. No Unicode tables to maintain yourself — perfect for Discord bots,
          username tools and social-media apps.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
          <a href={`${BASE}/meta`} className="cat-pill" target="_blank" rel="noopener noreferrer">Try the meta endpoint →</a>
          <a href={`${BASE}/openapi.json`} className="cat-pill" target="_blank" rel="noopener noreferrer">OpenAPI spec</a>
        </div>

        {/* Endpoints */}
        <section style={{ marginTop: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>Endpoints</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ENDPOINTS.map((e) => (
              <div key={e.path} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: "var(--teal)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 7px" }}>{e.method}</span>
                  <span style={{ ...mono, fontSize: 14, color: "var(--text)" }}>/api/v1{e.path}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: "0 0 10px" }}>{e.desc}</p>
                <a href={e.example} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 12.5, color: "var(--accent)", textDecoration: "none", wordBreak: "break-all" }}>
                  {e.example}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Access / pricing */}
        <section style={{ marginTop: 44, borderTop: "1px solid var(--border)", paddingTop: 36 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Access &amp; usage</h2>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75, marginBottom: 12 }}>
            The API returns plain JSON over HTTPS and accepts simple query parameters — call it from any language with a
            standard HTTP request. Responses include a <span style={mono}>count</span> and a <span style={mono}>results</span> array;
            errors return an <span style={mono}>{`{ error }`}</span> object with the right HTTP status.
          </p>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75 }}>
            For production use with usage tiers and an API key, subscribe through RapidAPI (listing coming soon). For
            questions or a custom plan, email <a href="mailto:contact@copychars.com" style={{ color: "var(--accent)", textDecoration: "none" }}>contact@copychars.com</a>.
          </p>
        </section>

        <section style={{ marginTop: 36, borderTop: "1px solid var(--border)", paddingTop: 28 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/fancy-text" className="cat-pill">Fancy Text tool</Link>
            <Link href="/username-generator" className="cat-pill">Username Generator</Link>
            <Link href="/kaomoji" className="cat-pill">Kaomoji</Link>
            <Link href="/render-test" className="cat-pill">Render Test</Link>
          </div>
        </section>
      </div>
    </>
  );
}
