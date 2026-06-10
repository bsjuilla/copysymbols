import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Discord Symbols — Copy & Paste ★ ♥ → for Names & Bios";
const DESCRIPTION = "Discord symbols to copy and paste — stars ★, hearts ♥, arrows →, brackets 「」 and text art that work in your username, server name, bio and messages. One click to copy each.";
const SLUG = "discord-symbols";
const PUBLISHED = "2026-03-01T00:00:00Z";
const MODIFIED = "2026-05-09T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED.slice(0, 10),
  dateModified: MODIFIED.slice(0, 10),
  author: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  publisher: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  mainEntityOfPage: `https://www.copychars.com/blog/${SLUG}`,
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 28, fontSize: 13, color: "var(--text3)" }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
        <span>&#x203A;</span>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none" }}>Blog</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
        Discord Symbols — Special Characters That Work in Discord
      </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>All symbols, Unicode characters, and text art that work in Discord usernames, bios, and messages. Stars, hearts, arrows, brackets, and more.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>Discord supports the full Unicode standard, meaning thousands of special characters work in usernames, server names, channel names, bios, and messages. Here are the most useful symbols for Discord.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Symbols for Discord Usernames</h2>
<p>Popular choices for display names: &#9733; (star) &bull; &#9824; (spade) &bull; &#9876; (crossed swords) &bull; &#128305; (trident) &bull; &#10070; (diamond with dot) &bull; &#10216; &#10217; (angle brackets) &bull; &#12302; &#12303; (bold brackets).</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Bio and About Me Symbols</h2>
<p>For structuring your Discord bio: ─────────── (long dash line as section divider) &bull; &#9702; (white bullet) &bull; &#8250; (chevron) &bull; &#8810; &#8811; (double angle brackets).</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Symbols for Chat and Announcements</h2>
<p>In Discord messages: &#9888; (warning) &bull; &#9989; (success) &bull; &#10060; (error) &bull; &#128204; (pinned) &bull; &#128276; (notification) &bull; &#11088; (featured) &bull; &#128161; (tip) &bull; &#9654; (play button).</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Do Kaomoji Work on Discord?</h2>
<p>Yes &mdash; all kaomoji work perfectly since they are made from standard Unicode. Try &#175;\\_(&#12484;)_/&#175;, (&#9685;&#8255;&#9685;), or &#643;&#8226;&#7445;&#8226;&#643; in any Discord message or bio.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Nitro vs Non-Nitro</h2>
<p>Special Unicode characters work for <em>all</em> Discord users regardless of Nitro status. Nitro is only required for animated avatars and custom emoji &mdash; not for special text characters.</p>` }} />
    </div>
    </>
  );
}
