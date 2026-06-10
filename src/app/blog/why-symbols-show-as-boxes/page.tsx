import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Why Symbols Show as Boxes (▯) — Tofu, Explained & Fixed";
const DESCRIPTION = "Why symbols show as boxes: what tofu (▯) really is, why fonts cause it, how it differs from broken text, and how to test a character before you send it.";
const SLUG = "why-symbols-show-as-boxes";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["why do symbols show as boxes","tofu unicode","empty box character meaning","unicode replacement character","missing glyph box","emoji shows as box fix","noto font no tofu","safe symbols for usernames"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "You paste a symbol into a bio, hit save, and where your carefully chosen character should be there sits an empty little rectangle. That box has a name — font engineers affectionately call it tofu, because a small white rectangle looks like a block of it — and it has a precise technical cause that is more interesting than it first appears. The good news up front: tofu is not corruption, not a virus, and usually not your fault. The character you sent arrived perfectly intact; the device showing the box just has no idea how to draw it. Here is exactly why it happens, where it happens most, and what you can actually do about it.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"Meet Tofu: The Box With a Name","paras":["Every font contains a special fallback glyph called .notdef — short for ‘not defined’ — that gets drawn whenever the font is asked to display a character it does not contain. In most fonts, .notdef is rendered as an empty rectangle, and somewhere along the way font engineers started calling it tofu, after the food it resembles. The nickname stuck hard enough that Google later named an entire font project after the mission of eliminating it. So when you see □ or ▯ where a symbol should be, you are looking at a deliberate, designed glyph whose whole job is to announce: there is a character here, but I cannot show it to you.","That last part matters. Tofu does not mean data was lost. The underlying character — its Unicode code point — survived the journey, and if you copy the box and paste it somewhere with better font coverage, the original symbol reappears as if nothing happened. Some browsers even print the character's code point in tiny hexadecimal digits inside the box, which is the renderer being as helpful as it can manage: it knows exactly which character this is, it just has no picture for it."]},{"h2":"Tofu vs �: Two Very Different Failures","paras":["The diamond with a question mark, �, looks like tofu's cousin but is an entirely different animal. That is U+FFFD, the Unicode replacement character, and it appears when text decoding fails — when software receives bytes it cannot interpret as valid text at all, usually because the text was saved in one character encoding and read back in another. Where tofu means ‘valid character, missing artwork,’ the replacement character means the data itself was mangled before fonts ever entered the picture.","The distinction tells you where to look for a fix. If you see boxes, the text is fine and the problem is font coverage on the displaying device — often fixable with a software update. If you see �, the original character is genuinely gone from that copy of the text, overwritten during a bad conversion, and no font update will ever bring it back; the only fix is returning to the source and copying it again. One is a rendering problem. The other is a plumbing problem."]},{"h2":"Why It Happens: Fonts, Glyphs, and Fallback","paras":["A font is, at heart, a collection of drawings — one glyph for each character it supports — and no single font covers all of Unicode, which now defines more than 150,000 characters across every writing system on earth. So operating systems keep a fallback chain: if the app's main font lacks a character, the system quietly tries its other installed fonts, walking down the list until something can draw it. You see seamless text every day only because this relay race succeeds invisibly, thousands of times per page.","Tofu is what happens when the relay race runs out of runners. The renderer asked every installed font for a glyph, none of them had one, and the end of the chain shrugged and served its .notdef box. That is why the same character can render beautifully on your phone and as a box on your friend's: it is not about the character, the app, or the message — it is about which fonts each device happens to have installed, which mostly comes down to its operating system and how recently it was updated."]},{"h2":"The Usual Suspects: Where Tofu Strikes Most","paras":["By far the most common case is brand-new emoji on un-updated phones. New emoji enter the Unicode standard roughly once a year, but the artwork only reaches a device through an operating system update — so for months after each release, anyone on older software sees the newest emoji as boxes or as broken-apart pieces. Rare Unicode blocks are the second classic: ancient scripts, obscure technical symbols, and niche punctuation often lack coverage in stock fonts, with Windows historically patchier than phones in the more exotic corners of the standard.","Two cases catch people by surprise. Fancy text — the 𝓼𝓬𝓻𝓲𝓹𝓽 and 𝖌𝖔𝖙𝖍𝖎𝖈 letter styles popular in usernames — is actually built from mathematical alphanumeric symbols, a Unicode block designed for equations, and some apps and embedded systems never bothered to support it. And the half-width katakana characters that give Japanese-style kaomoji their distinctive arms and sparkles are missing from a number of decorative and serif fonts, which can leave an otherwise charming text face with a rectangle for an arm."]},{"h2":"Noto: The Font Named After the Problem","paras":["Google's answer to tofu was to commission a font family whose explicit mission is a glyph for every Unicode character — and to name it Noto, short for ‘no tofu.’ Developed with the type foundry Monotype and expanded continuously since the early 2010s, Noto now spans hundreds of writing systems, from Latin and Chinese to scripts with only a few thousand living readers, and it serves as the backbone of text rendering on Android and ChromeOS.","Noto is a big part of why tofu keeps getting rarer, but it cannot eliminate the problem on its own. Apps can bundle their own limited fonts, older devices never receive new Noto releases, and Unicode itself keeps growing — every new version adds characters that all fonts, Noto included, must then catch up to. Tofu is best understood not as a bug being slowly fixed but as a permanent border zone between an expanding standard and billions of devices updating at different speeds."]},{"h2":"What You Can Fix — and What You Can't","paras":["Your side of the equation has real levers. Updating your operating system is the single biggest one, because emoji and symbol fonts ship with the OS — one update can turn dozens of boxes back into characters. If only one app shows boxes while others display the same text fine, that app is bundling its own font or overriding the system one; check its appearance settings, update it, or try its web version. And pasting the mystery text into a different app is the fastest diagnostic there is: it instantly tells you whether the problem lives in the device or in the app.","What you cannot fix is the other end of the conversation. If your username renders as boxes on a friend's five-year-old phone, no setting on your device will change that — their fonts simply predate the character. This is the honest argument for choosing widely supported symbols in anything public-facing: you control what you send, never what the reader's device can draw. For anything permanent — a username, a bio, a post that thousands of strangers will load — assume some of those readers are on old software, and pick characters accordingly."]},{"h2":"Check Before You Send","paras":["The practical move is to test a character's support before committing to it. CopyChars has a render test tool built for exactly this: paste in any character or emoji and it reports a per-platform verdict — how the character is likely to fare on iOS, Android, and Windows — and points you toward safer alternatives when a symbol is risky. Thirty seconds of checking beats discovering a box in your bio a week later, after half your followers have already seen it.","For usernames and bios, the safest strategy is to stick to the long-standardized blocks: hearts like ♥, stars like ★, arrows like →, and the common geometric and punctuation symbols that have lived in fonts for decades. These render virtually everywhere, including on ancient office computers. The symbol collections on this site are curated with exactly that bias — exotic, poorly supported glyphs are filtered out — so anything you copy from a category page already starts from a position of safety."]}];
const FAQS: { q: string; a: string }[] = [{"q":"What does a box with tiny numbers or letters inside mean?","a":"The same thing as an empty box, with extra information attached: no installed font has a glyph for the character, and the renderer — Firefox does this notably — is printing the character's Unicode code point in hexadecimal inside the box so it can be identified. It is a courtesy, not an error code. The character itself is intact; the device simply cannot draw it."},{"q":"Is � the same thing as tofu?","a":"No, and the difference matters. Tofu — an empty box — means the character arrived intact but no installed font can draw it, which is purely a display problem. The � replacement character means the text data itself was corrupted during an encoding mix-up, and the original character is gone from that copy. Boxes can be cured by font and OS updates; � can only be cured by recopying the text from its source."},{"q":"If I see a box, does the sender see one too?","a":"Usually not — the sender most likely sees the real symbol, which is exactly why they sent it. Tofu is produced by the displaying device, not embedded in the message, and every device renders the same character with its own fonts. One conversation can therefore contain a person seeing a brand-new emoji and a person seeing a rectangle, both looking at identical data."},{"q":"How do I fix symbols showing as boxes on my phone?","a":"Update your operating system first — emoji and symbol fonts ship with OS updates, and this resolves the majority of cases, especially newer emoji. If boxes appear in only one app, check that app's font or appearance settings, update the app, or try its web version. If a character still shows as a box after a full update, your device's fonts genuinely lack it, and the realistic fix is choosing a better-supported alternative."},{"q":"Are fancy text fonts safe for usernames and bios?","a":"Mostly, with caveats. Fancy text is built from mathematical alphanumeric characters that the major platforms — Instagram, TikTok, Discord, X — display without trouble. But some apps, older devices, and embedded displays lack those glyphs, and screen readers may announce the characters awkwardly, letter by letter. Use fancy styles for decoration rather than essential information, and run your exact string through a render-testing tool before settling on it."}];
const RELATED: { href: string; label: string }[] = [{"href":"/render-test","label":"Emoji Render Test"},{"href":"/how-to-copy-paste","label":"How to Copy and Paste"},{"href":"/blog/how-emoji-work","label":"How Emoji Work"},{"href":"/symbols","label":"All Symbols"},{"href":"/fancy-text","label":"Fancy Text"},{"href":"/new-emoji-2026","label":"New Emoji 2026"}];

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>&larr; Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          {TITLE}
        </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>{INTRO}</p>

        {SECTIONS.map((s, i) => (
          <section key={i}>
            <h2 style={sectionH2}>{s.h2}</h2>
            {s.paras.map((p, j) => (
              <p key={j} style={para}>{p}</p>
            ))}
          </section>
        ))}

        <h2 style={sectionH2}>Frequently asked questions</h2>
        <div style={{ marginBottom: 24 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <h3 style={faqQ}>{f.q}</h3>
              <p style={{ ...para, marginBottom: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          {RELATED.map((r) => (
            <Link key={r.href} href={r.href} className="cat-pill">{r.label}</Link>
          ))}
          <Link href="/blog" className="cat-pill">More Guides</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const faqQ: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" };
