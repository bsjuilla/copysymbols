import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Lenny Face ( ͡° ͜ʖ ͡°) — Meaning, History & How to Type It";
const DESCRIPTION = "Lenny Face meaning explained: what ( ͡° ͜ʖ ͡°) means, its 2012 Ylilauta origin, the IPA characters behind it, popular variations, and easy ways to type it.";
const SLUG = "lenny-face-meaning";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["lenny face meaning","what does the lenny face mean","lenny face origin","( ͡° ͜ʖ ͡°) meaning","how to type lenny face","lenny face copy paste","lenny face history","dongers meaning"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Somewhere in the last decade, ( ͡° ͜ʖ ͡°) stopped being an obscure imageboard in-joke and became one of the most recognizable faces on the internet. People drop it into Discord servers, Twitch chats, group texts, and reply threads to say something no emoji quite captures: I know exactly what I am doing, and I am not sorry. It is called the Lenny Face, and it has a surprisingly well-documented origin story, a genuinely strange technical anatomy borrowed from the International Phonetic Alphabet, and a whole extended family of variations. This guide covers what it means, where it came from, and the practical ways to type it without memorizing Unicode code points.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"What Does the Lenny Face Mean?","paras":["The Lenny Face is the internet's all-purpose smirk. At its core, ( ͡° ͜ʖ ͡°) communicates smugness — the raised-eyebrow look of someone who just said something cheeky and wants you to know it was deliberate. Depending on context it can read as mischievous, knowing, mildly suggestive, or simply trollish. Drop it after a pun and it says the pun was intentional. Drop it after an ambiguous sentence and it retroactively makes the sentence sound like innuendo. That flexibility is exactly why it has survived more than a decade of meme turnover while thousands of other text faces faded away.","There is also a second, structural meaning: posting a Lenny Face is often less about the message and more about the gesture itself. In Twitch chats and Discord servers, a wall of Lenny Faces functions like applause or heckling — a way for a crowd to react in unison. It can derail a serious conversation on purpose, which is why some moderated communities ban it outright. If an emoji is a word, the Lenny Face is closer to a stage direction: it tells everyone how the previous line was meant to be performed."]},{"h2":"Where the Lenny Face Came From","paras":["Unlike most memes, the Lenny Face has a reasonably well-documented birthplace. Its first known appearance was in November 2012 on Ylilauta, a Finnish imageboard, in a thread celebrating a successful raid — users flooded the thread with the new face, and the site's moderators reportedly began banning people for spamming it, which only helped it stick. It was soon screenshotted and reposted to 4chan, and from there it spread to Reddit, Twitter, and the broader English-speaking internet within a matter of months.","The name came later. English-speaking communities christened the face Lenny — why that particular name stuck is murkier than the face's own history, and no convincing origin for it has ever been documented — and Reddit popularized the ironic spelling le lenny face. By 2013 it was a fixture of Twitch chat, where it merged with the emote-spam culture around League of Legends streams and spawned an entire family of elaborate descendants. A Finnish raid thread to global shorthand in under a year is a remarkable run for eleven characters."]},{"h2":"The Anatomy: IPA Letters and Misused Diacritics","paras":["Here is the genuinely interesting part: the Lenny Face is built almost entirely from characters that were never meant to make faces. Each eye is a degree sign (°, U+00B0) wearing a combining double inverted breve ( ͡ , U+0361) as an eyebrow. That breve is a real linguistics tool — in the International Phonetic Alphabet it ties two sounds together, the way t and ʃ join into the ch sound of chair. Whoever assembled the face repurposed a phonetic tie bar as a perfectly arched eyebrow.","The nose and mouth are even stranger. The central character ʖ is U+0296, the Latin letter inverted glottal stop, which older versions of the IPA used to write a lateral click consonant. Beneath it sits a combining double breve below ( ͜ , U+035C), another phonetic tie mark, doing duty as a coy smile. Combining marks have no width of their own, and these two are double diacritics designed to arc across a pair of adjacent characters — in the Lenny Face each one bridges a plain space and the character beside it, which is why the eyebrows hover neatly over the eyes, and why the face occasionally falls apart in fonts that handle combining marks badly."]},{"h2":"Variations and the Donger Family","paras":["Once the base face spread, remixing was inevitable. The wink variant ( ͡~ ͜ʖ ͡°) swaps one eye for a tilde. The flex ᕦ( ͡° ͜ʖ ͡°)ᕤ borrows arm characters from the Canadian Aboriginal Syllabics block. There are table-flipping Lennys, crying Lennys, bear Lennys, and chains of stacked Lennys marching across a chat window. Because the face is plain text, anyone can graft on new limbs by raiding other Unicode blocks for promising shapes — and people did, enthusiastically.","On Twitch, this remix culture acquired its own name: dongers. A donger is any elaborate single-line Unicode face, usually with raised arms, in the spirit of ヽ༼ຈل͜ຈ༽ﾉ — a cousin of the Lenny Face that borrows its eyes from the Lao alphabet and its nose from the Arabic letter lam. The chant “raise your dongers” took off in League of Legends stream chats around 2013 and 2014, and entire sites sprang up just to catalog donger variants. If kaomoji are Japan's expressive lineage of text faces, dongers are Twitch's chaotic western branch of the same family tree."]},{"h2":"Where It Works — and Where It Breaks","paras":["The Lenny Face is ordinary Unicode text, so it pastes anywhere text is accepted: Discord, X, Reddit, WhatsApp, iMessage, YouTube comments, even email subject lines. There is no image attachment and no special font requirement. Modern phones and browsers ship fonts that cover every character it uses, so on any current device it almost always looks exactly as intended.","The weak point is the combining marks. Some monospace fonts — the kind used in code editors and terminals — position U+0361 and U+035C poorly, so the eyebrows drift sideways or pile onto the wrong character. A few older systems show the marks as empty boxes. And platforms that restrict usernames to plain letters and numbers will reject or mangle it: you can usually post a Lenny in a message, but not in a handle. As a rule of thumb, any app that renders zalgo text correctly will render a Lenny Face correctly too, because both lean on the same Unicode machinery."]},{"h2":"How to Type It (Spoiler: You Don't)","paras":["Nobody types the Lenny Face character by character — it is eleven code points, several of which have no key on any standard keyboard. The universal answer is copy and paste: keep the lenny face collection on this site handy, tap copy, paste it wherever it is needed. For a face you use constantly, though, a text replacement shortcut is the better long-term move, and every major platform except one supports it natively.","On iPhone, go to Settings, then General, Keyboard, Text Replacement, and map a phrase like lenny to the full face. On Android, Gboard offers the same feature under Settings, Dictionary, Personal dictionary; Samsung Keyboard calls it Text shortcuts. On a Mac, it lives in System Settings under Keyboard, Text Replacements, and syncs to your iPhone via iCloud. Windows is the odd one out, with no built-in expander for hardware keyboards — the practical options are pinning the face in clipboard history (press the Windows key plus V) or installing a free text expander such as espanso or AutoHotkey. Set it up once and your keyboard gains a permanent smirk key."]}];
const FAQS: { q: string; a: string }[] = [{"q":"What does ( ͡° ͜ʖ ͡°) actually mean?","a":"It is a smug, knowing expression. People use it to signal that a message was cheeky or deliberately suggestive, to take credit for a bad pun, or simply to troll. Context decides the exact flavor — after a joke it reads as playful, in a serious thread it reads as derailment. There is no fixed dictionary meaning; the raised eyebrows and slight smile carry tone the same way a smirk does in person."},{"q":"Who created the Lenny Face?","a":"An anonymous user on Ylilauta, a Finnish imageboard, where the face first appeared in November 2012 in a thread celebrating a raid. No individual has ever been credibly identified as its inventor, and the name Lenny was attached later by English-speaking communities for reasons that remain undocumented. Like most text faces, it has a documented birthplace but no known author."},{"q":"Why does the Lenny Face look broken or misaligned on my screen?","a":"The face depends on two combining diacritical marks — characters with no width of their own that attach to neighboring characters. Fonts with poor combining-mark support, especially some monospace and older system fonts, draw them in the wrong position, so the eyebrows slide off the eyes. The fix is usually viewing the face in a different app or font; the underlying characters are identical everywhere."},{"q":"What are dongers?","a":"Donger is Twitch slang for an elaborate single-line Unicode face, typically with raised arms, like ヽ༼ຈل͜ຈ༽ﾉ. The term comes from League of Legends stream culture around 2013, where “raise your dongers” became a chat chant. The Lenny Face is part of the same extended family, and many dongers reuse its combining-mark eyebrow trick with characters borrowed from Lao, Arabic, Thai, and Canadian Aboriginal Syllabics."},{"q":"Is the Lenny Face an emoji?","a":"No. An emoji is a single picture character whose artwork changes from platform to platform. The Lenny Face is a sequence of ordinary Unicode characters — parentheses, degree signs, an IPA letter, and combining marks — so it looks essentially the same everywhere a font supports it. That consistency is part of its appeal: no operating system vendor can redesign it out from under you."}];
const RELATED: { href: string; label: string }[] = [{"href":"/lenny-face","label":"Lenny Face Collection"},{"href":"/kaomoji","label":"Kaomoji"},{"href":"/blog/what-is-kaomoji","label":"What Is Kaomoji?"},{"href":"/text-art","label":"Text Art"},{"href":"/emoji-combos","label":"Emoji Combos"}];

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
