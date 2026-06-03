import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";

const TITLE = "Kaomoji: What They Are and How to Use Them";
const DESCRIPTION = "Learn what kaomoji are, how they differ from Western emoticons, where they came from, and how to copy-paste them into Discord, Instagram, TikTok, and more.";
const SLUG = "what-is-kaomoji";
const PUBLISHED = "2026-06-03T00:00:00Z";
const MODIFIED = "2026-06-03T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["what is kaomoji","kaomoji meaning","how to use kaomoji","japanese emoticons","kaomoji copy paste","cute text faces","kaomoji history","unicode emoticons"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "You have probably spotted something like (＾▽＾) or ¯\\_(ツ)_/¯ floating around your social feeds and wondered exactly what you are looking at. These expressive little text faces are called kaomoji — Japanese emoticons built entirely from Unicode characters, no image file required. Unlike the sideways smiley faces popular in early Western internet culture, kaomoji are designed to be read straight on, and they pack a surprising range of emotion into a single line of text. Once you learn to spot the eyes, mouth, and the occasional waving arm, you will never unsee them — and you will almost certainly want a collection of your own.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"What Does Kaomoji Mean?","paras":["The word kaomoji (顔文字) is a compound of two Japanese words: kao (顔), meaning face, and moji (文字), meaning character or letter. Put them together and you get face-character, which is a precise description of what these things actually are — a face assembled from text characters. The term is used in Japan to refer to all text-based emoticons, but outside Japan it has come to specifically describe the Japanese-style variety that reads upright rather than sideways.","That upright orientation is the single most important thing that separates kaomoji from Western emoticons. When someone typed :-) in a 1990s chat room, you had to tilt your head left to see the smile. Kaomoji never ask you to do that. The face is already looking right at you, which means more of the expression comes through at a glance, and designers of kaomoji had a lot more creative room to build elaborate eyes, arms, and even full body gestures into a single text string."]},{"h2":"A Short History: From ASCII-NET to Everywhere","paras":["Kaomoji emerged on Japanese computer networks in the 1980s. The earliest documented example is often credited to a user on ASCII-NET, a major Japanese bulletin-board service, in 1986 — roughly contemporaneous with Scott Fahlman's famous :-) post on an American university network. Japanese internet users quickly developed a style all their own, partly because the Japanese character encoding systems available at the time gave them access to a much wider palette of shapes: half-width katakana characters like ﾉ and ﾟ, full-width punctuation, and mathematical symbols all ended up pressed into service as eyebrows, tears, and blush marks.","Through the 1990s, kaomoji culture flourished on 2channel (now 5channel), a massively influential Japanese text board. Users there developed entire character archetypes — the most famous being Shift JIS art characters like Mona — and competed to make the most expressive or absurd text faces possible. From 2channel, kaomoji spread to Japanese mobile phone culture in the early 2000s, then rode the wave of global social media into international use. Today you will find them on Discord servers, TikTok captions, Instagram bios, and Twitter threads in every language."]},{"h2":"How to Read a Kaomoji","paras":["Every kaomoji has a face at its core, and the face always has at least two key features: eyes and a mouth. Once you can identify those two anchors, the rest falls into place. Look at (＾▽＾): the ＾ symbols are the squinting-with-joy eyes, and the ▽ is a wide open, happy mouth — this one is broadly smiling or laughing. Now look at (╥﹏╥): the ╥ characters suggest eyes pressed shut and leaking tears, while ﹏ is a trembling, upset mouth. That is unmistakably crying.","Arms and body language add another layer. The sequence ¯\\_(ツ)_/¯ adds raised arms on both sides of the face for a classic shrug — the face ツ in the middle is itself a Japanese katakana character that happens to look like a wide smile. The bear kaomoji ʕ•ᴥ•ʔ uses special Unicode characters ʕ and ʔ as bear-ear brackets, a centered ᴥ as a snout, and dots for eyes. Some kaomoji go further and depict a full figure in action, like \\(^o^)/ for cheering or (ง'̀-'́)ง for a fighting stance. Once you understand the grammar, you can decode almost any new one you encounter."]},{"h2":"Moods, Styles, and What People Actually Search For","paras":["Kaomoji cover the full emotional spectrum, and most collections organize them by mood. The biggest categories are happy faces like (◠‿◠) and (≧◡≦), sad or crying faces like (T_T) and (；ω；), love and affection faces like (◍•ᴗ•◍) and (♡°▽°♡), and angry or frustrated faces like (ಠ_ಠ) and (凸ಠ益ಠ)凸. Shy and blushing faces — (⁄ ⁄•⁄ω⁄•⁄ ⁄) is a classic — are especially popular in fandom and romantic contexts.","Beyond mood, there are style families worth knowing. Animal kaomoji give you bears, cats, and bunnies built from fur-like Unicode brackets. Sparkle kaomoji add ✧ and ★ for a magical or celebratory feel. Pout faces like (｡•́︿•̀｡) have their own loyal following for moments when words are not enough. Flex and victory poses like ᕦ(ò_óˇ)ᕤ show up in gaming and fitness communities. Each style carries its own subcultural flavor, and part of the fun is matching the right kaomoji to the right moment."]},{"h2":"How to Copy and Paste Kaomoji","paras":["Kaomoji are plain Unicode text, which means they work anywhere text works. There is no special font to install, no image to upload, and no app to download. When you copy a kaomoji, you are copying a short string of regular characters — the same kind of characters that make up any sentence you type. Paste it into a Discord message, an Instagram caption, a TikTok bio, a WhatsApp chat, or the subject line of an email, and it will appear exactly as intended on the other end.","On copychars.com, every kaomoji has a single-click copy button. Tap it, and the face is on your clipboard ready to paste anywhere. If you are browsing on a phone, the process is identical — tap to copy, long-press to paste. Because the characters are Unicode standard, they render correctly on iPhone, Android, Windows, and Mac without any compatibility workarounds. The only edge case worth knowing: a handful of very old devices or niche apps may not include a font that covers every obscure Unicode block, so an unusual bracket or symbol might show as a small rectangle. This is rare on any modern device."]},{"h2":"Finding the Right Kaomoji for Any Moment","paras":["The easiest way to find a kaomoji is to search by what you are feeling. Copychars.com organizes kaomoji by mood — happy, sad, love, angry, shy, surprised, and more — so you can browse a whole page of crying faces when you need to commiserate, or a page of sparkle faces when something genuinely delights you. There are also style pages for animal kaomoji, pout faces, and other aesthetic families, which is useful if you have a specific vibe in mind rather than a specific emotion.","If you already have a favorite and want more like it, look at its structure. A face with ◕ eyes has a soft, wide-eyed innocent quality. A face with ò_ó eyes reads as intense or determined. Faces that use full-width Japanese punctuation — like （´∀｀） — have a distinctly retro feel rooted in 2channel-era aesthetics, while faces built from Latin and math characters tend to look more Western-internet-familiar. Noticing these patterns helps you build a personal collection that feels coherent and actually reflects your personality."]}];
const FAQS: { q: string; a: string }[] = [{"q":"What is the difference between a kaomoji and an emoji?","a":"Emoji are standardized picture characters — small images encoded as single Unicode code points, like 😊 or 🐻. Kaomoji are sequences of multiple regular text characters arranged to look like a face or figure, such as (＾▽＾) or ʕ•ᴥ•ʔ. Because kaomoji are just text, they look the same in every app and do not change based on platform emoji artwork. They also allow for much more expressive body language and customization than a single emoji can provide."},{"q":"Are kaomoji the same as ASCII art?","a":"They are related but not identical. ASCII art is a broad term for any image made from text characters, and can include detailed multi-line pictures. Kaomoji are a specific subset: single-line text faces designed to convey a facial expression or body gesture in a chat or social-media context. Most kaomoji use Unicode characters beyond the basic ASCII set, so technically they are more accurately called Unicode emoticons, though the term kaomoji is the one that stuck."},{"q":"Do kaomoji work on Discord, Instagram, and TikTok?","a":"Yes. Because kaomoji are plain Unicode text, they work in any field that accepts text input — Discord messages, Instagram captions and bios, TikTok bios, Twitter and X posts, Reddit comments, WhatsApp, iMessage, and so on. You do not need to enable anything special. Just copy the kaomoji and paste it wherever you would normally type."},{"q":"Why do some kaomoji look broken with small boxes or question marks?","a":"A small box or question mark means the app or device is using a font that does not include that particular Unicode character. This is uncommon on modern phones and computers, which ship with broad Unicode font coverage, but can happen with very obscure characters or on older systems. If a specific kaomoji is not rendering for you, try a simpler one that uses more common characters like parentheses, underscores, and standard punctuation."},{"q":"How do I type kaomoji myself instead of copying them?","a":"You can type simple ones — (^_^) or :3 — using a standard keyboard. More complex kaomoji use characters that are difficult to type directly on a Western keyboard, such as Japanese katakana or special Unicode symbols. The practical approach most people use is to keep a personal collection saved in a notes app or use a site like copychars.com to copy the ones they want. On Japanese keyboards and iOS/Android Japanese input methods, a kaomoji shortcut palette is often built in."}];
const RELATED: { href: string; label: string }[] = [{"href":"/kaomoji","label":"All Kaomoji"},{"href":"/kaomoji/mood/happy","label":"Happy Kaomoji"},{"href":"/kaomoji/mood/sad","label":"Sad Kaomoji"},{"href":"/kaomoji/mood/love","label":"Love Kaomoji"},{"href":"/kaomoji/mood/bear","label":"Bear Kaomoji"},{"href":"/kaomoji/type/pout","label":"Pout Kaomoji"},{"href":"/kaomoji/type/sparkle","label":"Sparkle Kaomoji"},{"href":"/lenny-face","label":"Lenny Faces"},{"href":"/emoji-combos","label":"Emoji Combos"}];

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
