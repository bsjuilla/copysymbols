import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Cursed Text (Zalgo) — How It Works & How to Make It";
const DESCRIPTION = "Cursed text (Zalgo) explained: how Unicode combining marks stack into glitchy letters, where zalgo works or breaks, accessibility notes, and how to make it.";
const SLUG = "cursed-text-zalgo";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["cursed text","zalgo text","what is zalgo text","how does zalgo text work","zalgo meaning","glitch text","combining diacritical marks","cursed text generator"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Scroll through Discord or X around Halloween and you will run into text that looks haunted — letters drowning under stacks of accent marks, words d̷r̶i̷p̶p̴i̶n̶g̸ down into the line below. People call it cursed text, glitch text, or zalgo. It looks like a rendering error or a hack, but it is neither: every drip and spike is an ordinary Unicode character behaving exactly as designed, just pushed far past sensible limits. This guide explains the mechanics — combining marks and grapheme clusters — where the zalgo name actually comes from, where the effect works and where it gets stripped, and how to generate or remove it yourself.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"What Is Cursed Text?","paras":["Cursed text is normal text overloaded with combining diacritical marks — the small accents, hooks, and squiggles that languages use to modify letters. A French é is an e with one acute accent. A zalgo letter is an e with thirty accents at once, stacked above, below, and through the letter until it stops looking like writing and starts looking like a transmission from somewhere unpleasant. Nothing about the base text changes; the word underneath every pile of marks is still perfectly intact.","The style goes by several names. Zalgo is the oldest and most specific, tied to a creepypasta entity we will meet in a moment. Cursed text and glitch text are broader, newer labels, often used for lighter versions with just one or two marks per letter. Some communities draw a line — cursed for a subtle wrongness, zalgo for the full dripping-from-the-ceiling effect — but in practice the terms blur together, and every generator, including the one on this site, produces the whole spectrum from a single slider."]},{"h2":"The Unicode Mechanics: Combining Marks","paras":["Unicode sets aside whole blocks of characters that have no width and no standalone existence: combining marks. The core block, Combining Diacritical Marks, runs from U+0300 to U+036F and contains the grave accent, the acute, the tilde, the ring, the hook, and dozens more, with several further blocks extending the inventory. A combining mark attaches to whatever character precedes it: type e followed by U+0301 and a font is expected to draw é. This is how software supports the accent combinations of hundreds of languages without needing a precomposed character for every possibility.","Here is the loophole zalgo exploits: the Unicode standard places no upper limit on how many combining marks can attach to a single base letter. Marks are simply stored in sequence after their base, and a renderer is expected to keep stacking them. So a z followed by twenty marks above and twenty below is, formally, a valid — if absurd — piece of text. Fonts and text engines were built to honor that rule, and most do, which is exactly why the effect travels so well from one platform to another."]},{"h2":"Grapheme Clusters: Why One Letter Can Be 30 Code Points","paras":["Text systems need a concept for what a person perceives as a single character, because it is often not a single code point. Unicode calls this a grapheme cluster: a base character plus everything that combines with it. A country flag emoji is two code points; some family emoji are seven or more joined together; and a heavily zalgoed letter can be one base letter plus thirty combining marks — thirty-one code points that your cursor treats as one unit when you arrow past it.","The distinction has real consequences. When you select, delete, or count cursed text, different software disagrees about what a character even is: a backspace might remove one mark or the whole cluster depending on the app. It is also why zalgo balloons message sizes invisibly — a ten-letter word at high intensity can quietly weigh several hundred bytes, all of it carried by marks you perceive as decoration on ten characters."]},{"h2":"He Comes: Where the Name Zalgo Came From","paras":["The name has nothing to do with Unicode. Zalgo is a creepypasta entity that traces back to cartoonist Dave Kelly, who around 2004 posted defaced versions of innocent newspaper comics on the Something Awful forums — strips like Nancy and Archie redrawn so the characters' eyes bled, the dialogue decayed, and panels ended with the name ZALGO. The meme went wide around 2009, when 4chan and other forums picked up the imagery along with the catchphrase “He Comes”.","In the fiction, Zalgo is a presence that corrupts whatever medium it touches. So when people began abusing combining marks to make text look corrupted, the existing meme supplied a ready-made name — and corrupted text became the signature way to invoke the character. The famous copypasta about the Nezperdian hive-mind of chaos, itself half-buried under diacritics, sealed the association. Today the entity lives on mostly through its typography: one of the rare memes where the special effect outlived the story."]},{"h2":"Where Zalgo Works — and Where It Gets Stripped","paras":["Cursed text travels well on platforms that render Unicode faithfully. Discord shows it, though it limits truly extreme stacking and may collapse messages packed with combining marks to protect performance — if that happens, dial the intensity down. X and Tumblr generally render it faithfully, which is why both have a long zalgo posting tradition. Reddit renders it in most contexts, although individual subreddits often configure their moderation bots to remove it on sight.","Elsewhere it dies quietly. Many online games filter chat to a safe character set and silently strip the marks, leaving plain text. Some web forms reject or normalize it. Instagram is a partial case: captions and comments usually keep light zalgo, but usernames allow only letters, numbers, periods, and underscores, so cursed handles are impossible there. And because heavy zalgo overflows the line it sits on, marks can scribble across neighboring rows of a page — some sites strip it specifically because it vandalizes their layout. To check how a given device handles it, the render test page on this site shows instantly whether marks render, stack, or fall apart."]},{"h2":"The Honest Caveats: Accessibility, Spam Filters, Character Counts","paras":["Screen readers do not get the joke. Depending on the software, a zalgoed word is announced letter by letter with every diacritic named aloud, read out as garbled noise, or skipped entirely. For a blind or low-vision reader, your spooky message lands somewhere between exhausting and invisible. The polite rule: never use cursed text for information that matters — names, times, instructions, links — and keep it away from anywhere accessibility is the point, such as alt text or official announcements.","Moderation systems are also unamused. Because zalgo is a classic flooding tactic, many communities treat heavy use as spam, and automated filters remove it without appeal. Finally, character limits see what the computer sees, not what you see: each combining mark is its own code point, so one decorated letter can count as dozens of characters. A short zalgo sentence can blow through a 280-character limit before it looks like you have written anything at all. Pasting your text into the character counter on this site shows the real count before you post."]},{"h2":"How to Make It — and How to Undo It","paras":["Making cursed text by hand would mean memorizing combining-mark code points, so nobody does. The zalgo text generator on this site handles the assembly: type your text, set the intensity slider from 1 (a faint wrongness) to 5 (full possession), and choose whether the marks pile above the line, through the middle, or below it. Light settings with marks only below read as melting; marks only above read as static or flames. Copy the result and paste it anywhere it survives.","Undoing zalgo is simpler than it looks, because the original text sits untouched underneath. Stripping every character in Unicode's combining-mark categories restores the clean string — that is all any un-zalgo tool does. The flip side is worth remembering: search engines and find-in-page generally do not strip the marks for you, so a zalgoed name or keyword will not match searches for the plain version. Decoration costs discoverability, which is one more reason to keep the effect on punchlines rather than information."]}];
const FAQS: { q: string; a: string }[] = [{"q":"Is zalgo text dangerous or a virus?","a":"No. Cursed text is ordinary Unicode — the same kind of characters as any accented word, just stacked excessively. It cannot execute code or infect a device. Text-rendering bugs have occasionally let specific character sequences crash apps (a well-known 2018 iOS bug involved certain Telugu characters), but those were software flaws that got patched, not properties of zalgo. The worst zalgo typically does is lag a busy chat or break a page layout."},{"q":"Why does one zalgo letter count as many characters?","a":"Each combining mark is a separate Unicode code point stored after the base letter. Your eye groups them into one glyph — what Unicode calls a grapheme cluster — but length checks usually count code points or bytes. A letter wearing 25 marks therefore counts as 26 characters against a post or bio limit. The character counter on this site shows the real numbers so you can see exactly what a platform will measure."},{"q":"Where does the word Zalgo come from?","a":"From a creepypasta entity created by cartoonist Dave Kelly, who posted corrupted edits of newspaper comics around 2004 that ended with the name ZALGO. The meme spread widely around 2009 alongside the phrase “He Comes”. Because the fictional Zalgo corrupts everything it touches, the name attached itself naturally to the corrupted-looking text style, and the text style became the standard way of invoking the character."},{"q":"Why does cursed text overlap other lines on the page?","a":"Combining marks are drawn relative to their base letter with no regard for line spacing. Stack enough of them and they extend far above and below the line they belong to, painting over neighboring text. Most apps do not expand line height to fit, because text layout assumes marks stay close to their letter. That overflow is the signature dripping look — and the reason some sites strip zalgo entirely."},{"q":"Does zalgo work on Instagram and TikTok?","a":"Partially. Both usually render light cursed text in captions, comments, and bios, though heavy stacking may be clipped visually. Usernames are a hard no on Instagram, which permits only letters, numbers, periods, and underscores, and TikTok is similarly restrictive about handles. When in doubt, post a low-intensity version first — and keep it out of anything searchable, since searches for the plain word will not match the decorated version."}];
const RELATED: { href: string; label: string }[] = [{"href":"/zalgo-text","label":"Zalgo Text Generator"},{"href":"/render-test","label":"Render Test"},{"href":"/character-counter","label":"Character Counter"},{"href":"/fancy-text","label":"Fancy Text"},{"href":"/blog/discord-fonts","label":"Discord Fonts"}];

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
