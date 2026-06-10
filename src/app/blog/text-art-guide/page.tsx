import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Text Art & ASCII Art — History and How to Use It";
const DESCRIPTION = "Text art and ASCII art explained: from 1898 typewriter art to BBS scenes, Shift_JIS faces, and braille pixel images — plus where multi-line art works today.";
const SLUG = "text-art-guide";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["text art","ascii art","ascii art history","braille text art","how to make text art","text art copy paste","shift jis art","typewriter art","copypasta art"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Long before screens could show images everywhere, people were making pictures out of characters — and they never stopped. Text art covers everything from a one-line shrug to multi-screen murals of swans, dragons, and meme faces, all assembled from the same letters, punctuation, and symbols you type every day. It is one of the oldest folk art forms of the computer age, with roots that actually predate computers by half a century. This guide traces that history — typewriters, teletypes, bulletin boards, Japanese textboards, and the braille-block renaissance on Twitch — then gets practical about where multi-line art still works, where it falls apart, and how to start making your own.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"What Counts as Text Art?","paras":["Text art is any picture built from text characters instead of pixels. The smallest pieces are emoticon-scale: a shrug, a table flip, a Lenny Face. One step up are single-line scenes — a row of fish swimming toward a fishing line, a cat peeking over a fence of underscores. At the large end sit multi-line murals: portraits, logos, landscapes, and meme faces drawn across dozens of rows, where each character acts as one coarse pixel of shading. Same medium, wildly different scales.","Strictly speaking, ASCII art is the subset built only from the 95 printable ASCII characters — the letters, digits, and punctuation on a US keyboard. Modern text art draws on a far bigger palette: box-drawing characters, block elements, braille patterns, full-width Japanese symbols, and thousands of other Unicode shapes. The two terms get used interchangeably, but the distinction matters in practice, because the wider the character palette, the more places the art can break."]},{"h2":"Typewriter Art: The Pre-Computer Era","paras":["People were drawing with keyboards before most homes had electricity. Artistic typing competitions and published examples date to the late 1800s, only a couple of decades after the typewriter became a commercial product. The most famous early piece is a butterfly composed by stenographer Flora Stacey in 1898, built from punctuation marks and careful paper-turning — typists would rotate and shift the page to place characters at angles no ordinary line of type could reach.","Typewriter art remained a genuine hobbyist scene for decades, with magazines and secretarial journals publishing portraits assembled from commas, periods, and lowercase letters. The constraints will feel familiar to anyone who has made ASCII art since: a fixed grid, a tiny symbol set, and shading achieved by choosing denser or lighter characters. The medium changed; the craft barely did."]},{"h2":"Teletypes, BBSes, and the ANSI Scene","paras":["Radio teletype operators carried the tradition into the mid-twentieth century, trading pictures encoded on punched tape that printed line by line — RTTY art was a slow-scan image format made of letters, swapped between amateur radio operators the way trading cards are. When hobbyist computing arrived, the same instinct moved onto bulletin board systems in the late 1970s and 1980s, where dial-up users decorated login screens and posts with ASCII pictures, and line-printer art of calendars and portraits circulated through university computer labs.","The 1990s BBS world pushed further with ANSI art, which added color and cursor positioning through escape codes, producing screens closer to stained glass than typing. Art groups — ACiD and iCE were the giants — released monthly art packs and competed for prestige, building one of the first organized digital art scenes. The web eventually killed the BBS, and the scene shrank but never vanished; its block-character techniques resurface today anywhere text is the only available medium."]},{"h2":"Shift_JIS Art and the Japanese Lineage","paras":["Japan developed a parallel tradition with a different toolbox. Textboards like 2channel, founded in 1999, used the Shift_JIS character encoding, which offers full-width characters, Japanese punctuation, and a huge symbol set that sits on a grid quite unlike Western type. The resulting style — Shift_JIS art, or SJIS art — achieves smooth curves and delicate linework that classic ASCII cannot match, and produced beloved recurring characters such as Mona, a cat-like figure who became a 2channel mascot.","The same boards refined kaomoji, the single-line Japanese emoticons like (＾▽＾) that read upright instead of sideways. Kaomoji are best understood as text art's portable cousins: the same idea of drawing with characters, compressed into one line so it fits inside a chat message. Much of what gets pasted around today — expressive faces, decorative borders, sparkle frames — descends as much from this Japanese lineage as from Western ASCII."]},{"h2":"Braille Blocks: The Modern Pixel Trick","paras":["The current favorite tool for big text art is one Louis Braille never anticipated. Unicode's Braille Patterns block, starting at U+2800, contains all 256 combinations of an eight-dot braille cell — a 2-by-4 grid of dots per character. Treat each dot as a pixel and every braille character becomes a tiny image tile; a few hundred of them can reproduce a photo, a logo, or a meme face with surprising fidelity. Characters like ⣿, with all eight dots raised, act as solid blocks, while sparser patterns shade edges and gradients.","Braille art has two practical superpowers. First, density: eight dots per character means far more resolution per line than letter-based shading can manage. Second, braille characters tend to render at uniform width even in proportional fonts, so the art survives in places that scramble classic ASCII. That combination is exactly why ⣿-based images dominate Twitch and Discord copypasta — they are the highest-resolution pictures you can smuggle through a plain text box."]},{"h2":"Copypasta Culture: Where Text Art Lives Now","paras":["Today's text art circulates mostly as copypasta — blocks of text copied and pasted between Twitch chats, Discord servers, and Reddit threads, usually as a crowd reaction or a running joke. A streamer fumbles a play and the chat floods with the same braille-art image fifty times in a minute. The art is rarely credited and constantly mutated, which makes it a genuine folk tradition: authorship dissolves, variants compete, and the funniest version survives.","There is etiquette. Multi-line art is loud — it shoves other people's messages off screen — so most communities tolerate it in moderation and ban it as spam in volume. Discord servers often confine it to designated channels; Twitch channels run slow mode or followers-only mode partly to blunt pasta floods. Reading the room is part of the craft: one perfectly timed paste lands, the same paste repeated ten times gets you muted."]},{"h2":"Where It Works, Where It Breaks, and How to Start","paras":["The classic failure mode: art that looks perfect in your editor turns to mush the moment you post it. The cause is fonts. Multi-line ASCII art is aligned for monospace fonts, where every character occupies identical width; most chat apps and social feeds use proportional fonts, where an i is narrower than a W, so the columns drift and the picture shears apart. Mobile adds a second trap — narrow screens wrap long lines, folding art in half. Braille art and small pieces under roughly forty characters wide survive these conditions far better than wide letter-based murals.","To start making your own, work small. Copy a few one-line pieces from the text art collection on this site and study how they use shape characters; rebuild a border or a tiny animal before attempting a mural. The symbol builder lets you assemble and preview decorated text from thousands of Unicode shapes, and the borders collection covers frame-style art that decorates rather than depicts. Always test in the destination app before committing — and keep a private note of pieces that survive there, because that personal library quickly becomes your most valuable text-art tool."]}];
const FAQS: { q: string; a: string }[] = [{"q":"What is the difference between ASCII art and text art?","a":"ASCII art uses only the 95 printable characters of the original ASCII standard — basic letters, digits, and punctuation. Text art is the umbrella term that also includes Unicode-based styles: braille-block images, box-drawing borders, Shift_JIS art, kaomoji, and emoji combos. All ASCII art is text art, but most of what gets shared in chats today uses characters far beyond the ASCII range."},{"q":"Why does my text art look scrambled when I paste it?","a":"Almost always fonts. Art aligned in a monospace editor assumes every character has the same width; chat apps and social feeds use proportional fonts that give each character its own width, so the columns shear sideways. Line wrapping on narrow phone screens makes it worse. Braille-pattern art is more robust because braille characters keep a uniform width in most fonts — which is a big part of why it took over chat copypasta."},{"q":"What are the ⣿ characters in Twitch and Discord copypasta?","a":"They come from Unicode's Braille Patterns block at U+2800, which encodes all 256 combinations of a 2-by-4 dot grid. Each character works as an eight-pixel tile, so a paragraph of braille characters can render a recognizable image — the closest thing plain text has to a bitmap. The fully raised ⣿ acts as a solid block, while lighter patterns form gradients and outlines."},{"q":"Is it OK to post text art in any chat?","a":"It pastes anywhere text is allowed, but whether it is welcome depends on the room. Multi-line art pushes other messages off screen, so many Discord servers and subreddits treat repeated pastes as spam, and Twitch channels use slow mode to limit floods. One well-timed paste in a community that enjoys the joke is fine; spamming is the fastest way to get text art banned for everyone."},{"q":"How do I make text art myself?","a":"Start at emoticon scale and work upward. Study small pieces to learn which characters create which shapes, then modify them — swap the eyes, change the border, extend a pattern. The text art collection on this site is good raw material, and the symbol builder helps you hunt through Unicode blocks for shapes. For large braille images, people typically run a picture through an image-to-braille converter, then clean up the output by hand."}];
const RELATED: { href: string; label: string }[] = [{"href":"/text-art","label":"Text Art Collection"},{"href":"/symbol-builder","label":"Symbol Builder"},{"href":"/borders","label":"Borders"},{"href":"/kaomoji","label":"Kaomoji"},{"href":"/lenny-face","label":"Lenny Faces"},{"href":"/blog/what-is-kaomoji","label":"What Is Kaomoji?"}];

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
