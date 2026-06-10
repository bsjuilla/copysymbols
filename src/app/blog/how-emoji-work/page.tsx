import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "How Emoji Work — Unicode, ZWJ & Skin Tones Explained";
const DESCRIPTION = "How emoji work under the hood: Unicode code points, ZWJ sequences, skin-tone modifiers, variation selectors, and why emoji look different on every phone.";
const SLUG = "how-emoji-work";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["how emoji work","what is unicode","emoji code points","zwj sequence","zero width joiner emoji","emoji skin tone modifiers","variation selector vs16","why do emoji look different on android","how are new emoji approved"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Every emoji you send makes a quiet, remarkable journey. You tap a picture on a keyboard, but no picture is actually sent — what travels is a number, defined by a global standard called Unicode, which the receiving device then redraws using its own built-in artwork. That one fact explains nearly everything strange about emoji: why the same face looks different on an iPhone and a Galaxy, why a family emoji can shatter into four separate people, why brand-new emoji arrive as empty boxes, and why a country flag is secretly two letters standing very close together. Here is how the whole machine works, piece by piece.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"Unicode: The Number Behind Every Character","paras":["Unicode is the universal character standard — a giant, carefully governed table that assigns a unique number, called a code point, to every character in every writing system: Latin letters, Chinese ideographs, Arabic script, mathematical symbols, and yes, emoji. The grinning face 😀 is code point U+1F600. When you send it, your device transmits that number, and the receiving device looks it up and draws whatever artwork its own fonts assign to U+1F600. The standard is maintained by the Unicode Consortium, a nonprofit based in California whose members include the major technology companies, and which publishes updates on a roughly annual cycle.","The crucial distinction here is between a character and a glyph. Unicode defines characters — abstract identities like ‘grinning face’ — but deliberately does not define what they look like. The drawing, called a glyph, is left to whoever makes the font. For letters this is familiar: an A in Times New Roman and an A in Helvetica are the same character wearing different glyphs. Emoji work exactly the same way; we simply notice it more, because emoji glyphs are tiny full-color illustrations rather than abstract letterforms."]},{"h2":"Why Emoji Look Different on Every Phone","paras":["Apple, Google, Microsoft, and Samsung each maintain their own emoji font — Apple Color Emoji, Noto Color Emoji, Segoe UI Emoji, and Samsung's One UI set, respectively. Each is a complete, independently drawn art library covering thousands of characters. When your message arrives on another platform, your artwork does not come along for the ride; the recipient's device substitutes its own version. Most of the time the designs agree closely enough that nothing meaningful is lost in translation.","Sometimes they do not. The most famous case is the pistol emoji: in 2016 Apple redrew 🔫 as a toy water gun, other vendors eventually followed, and for a stretch in between the same message could show a bright plastic toy on one phone and a realistic weapon on another. Subtler mismatches in the grimacing, flushed, and pleading faces have caused their share of misread texts over the years too. The practical lesson is that an emoji's broad meaning is stable, but its exact facial expression is a matter of which company drew it."]},{"h2":"ZWJ Sequences: Emoji Glued Together","paras":["Some of the most complex emoji are not single characters at all, but several emoji fused together by an invisible character called the Zero Width Joiner, or ZWJ (U+200D). The family emoji 👨‍👩‍👧 is literally man + ZWJ + woman + ZWJ + girl — five characters in a row that supporting platforms render as a single image. The rainbow flag 🏳️‍🌈 is a white flag, a variation selector, a ZWJ, and a rainbow. Dozens of profession, family, and flag emoji are built this way, which lets the standard offer rich combinations without minting a brand-new code point for every variant.","ZWJ sequences also explain a glitch you have probably seen in the wild: when a platform does not support a particular sequence, the glue fails and the emoji falls apart into its ingredients. Instead of one family you see 👨 👩 👧 standing politely in a row; instead of a rainbow flag you see a white flag sitting next to a rainbow. Nothing was corrupted in transit — the receiving device simply does not know that particular recipe, so it draws each component it does recognize, in order."]},{"h2":"Skin Tones and Variation Selectors","paras":["Skin tones are another layer of combination. Five modifier characters, U+1F3FB through U+1F3FF, are based on the Fitzpatrick scale used in dermatology; placed immediately after a compatible emoji, they recolor it from light to dark. A 👍🏽 is really two characters — thumbs up plus a medium-tone modifier — drawn as one. The modifiers were added to Unicode in 2015, and the unmodified default deliberately stays cartoon yellow so that no real-world tone is treated as the standard. On a platform that does not understand a modifier, you see the yellow emoji followed by a small color swatch.","Then there are variation selectors, which answer a question you may not have known existed: should this character be drawn as plain monochrome text or as full-color emoji? Many symbols predate emoji entirely — the smiling face ☺ has been in Unicode since 1993 — and can legitimately be rendered either way. An invisible VS15 (U+FE0E) after the character requests text style; VS16 (U+FE0F) requests emoji style. That is the entire difference between ☺ and ☺️: the same character, with one trailing invisible request. It is also why some symbols mysteriously appear black-and-white in one app and colorful in another — the two apps are simply making different default choices."]},{"h2":"Country Flags: Two Letters in a Trench Coat","paras":["There is no ‘Japanese flag’ character in Unicode — in fact, there is no single flag character for any country. Instead, the standard defines twenty-six regional indicator symbols, one per letter of the alphabet, and a flag is a pair of them spelling a two-letter country code: 🇯🇵 is regional indicator J followed by regional indicator P. Platforms that support flag emoji recognize the pair and draw the corresponding flag. Platforms that do not simply show the two letters — which is why flags on most Windows systems appear as letter pairs like JP rather than as waving banners.","The design is deliberate diplomacy. Countries appear, dissolve, and dispute one another's existence, and the Unicode Consortium has no appetite for refereeing geopolitics. By encoding flags as letter pairs tied to an external country-code standard, Unicode never has to formally add or remove a nation — vendors decide which pairs they draw. The flags of England, Scotland, and Wales use a different and even more elaborate mechanism involving a black flag followed by invisible tag characters, which is part of why those three are supported in fewer places."]},{"h2":"How a New Emoji Gets Approved","paras":["Anyone can propose an emoji. A proposal goes to the Unicode Consortium's emoji subcommittee and must make a data-backed case: evidence that people would actually use the character, that it is visually distinctive at small sizes, and that it fills a genuine expressive gap. There are explicit exclusions — no brands or logos, no specific people, nothing too narrow to matter globally. Most proposals are declined, and the successful few are folded into the next version of the standard on its roughly annual release cycle.","Approval is only the halfway point. Once a new emoji is published in the standard, every vendor still has to design its own artwork, add it to its emoji font, and ship that font inside an operating system update — a pipeline that typically takes months. This is the gap in which brand-new emoji appear as empty boxes or broken-apart pairs on phones that have not updated yet: the character is real and the message is intact, but the device has no drawing for it until the update arrives."]},{"h2":"A Short History: From 176 Pixel Drawings to a Global Standard","paras":["The set most often credited as the first true emoji was created in 1999 by Japanese designer Shigetaka Kurita for NTT DoCoMo's i-mode mobile internet service: 176 tiny 12-by-12-pixel pictographs covering weather, hearts, moods, and transport. Rival Japanese carriers soon built competing, incompatible sets of their own, and for a decade emoji remained a largely Japanese phenomenon held together by messy cross-carrier translation tables.","The turning point came in October 2010, when Unicode 6.0 absorbed the Japanese carrier emoji into the global standard — more than seven hundred characters, each with a proper code point at last. Apple unlocked its emoji keyboard for all iPhone users with iOS 5 in 2011, having previously limited it to Japan, and Android and Windows followed with system-wide support. A regional texting habit became a worldwide layer of human communication. Today the standard defines nearly four thousand emoji, with a modest, carefully curated batch added in most years."]}];
const FAQS: { q: string; a: string }[] = [{"q":"Why does the same emoji look different on iPhone and Android?","a":"Because Unicode only standardizes the character — its identity and its number — not the artwork. Apple and Google each draw and ship their own emoji fonts, so your phone renders every incoming emoji with its own art library, regardless of what the sender saw. Usually the designs are close, but expressions can drift enough to change tone, which is why a face that looks playful on one platform can read as pained on another."},{"q":"What is a ZWJ sequence in simple terms?","a":"It is several emoji joined by an invisible character — the Zero Width Joiner — so that they render as one image. The family emoji 👨‍👩‍👧 is man + joiner + woman + joiner + girl. If the receiving device knows the sequence, you see a single family; if it does not, the glue fails and the parts display side by side. Nothing is broken — the device simply does not have that combination in its font."},{"q":"Why do brand-new emoji show up as boxes?","a":"A new emoji is approved in the Unicode standard months before phone makers ship artwork for it in a software update. Until your device updates, it receives a perfectly valid character that it has no drawing for, so it renders a fallback box — the missing-glyph symbol. The fix is updating your operating system, or checking an emoji in a render-testing tool before using it somewhere important."},{"q":"Can anyone propose a new emoji?","a":"Yes. The Unicode Consortium accepts public proposals, and several well-known emoji began as submissions from individuals. A proposal must include evidence of expected usage, an explanation of why existing emoji cannot express the idea, and sample artwork, and it must avoid the exclusion criteria — no logos, brands, deities, or specific living people. The review process is rigorous, and the majority of proposals are declined."},{"q":"How many emoji are there?","a":"Counting every skin tone, gender variant, and ZWJ combination, the standard defines nearly four thousand distinct emoji as of the mid-2020s, with a curated batch — typically a few dozen — added in most years. How many you can actually see depends on your device: older phones simply lack the artwork for the newest additions, which is why keeping your operating system updated matters."}];
const RELATED: { href: string; label: string }[] = [{"href":"/emoji","label":"All Emoji"},{"href":"/new-emoji-2026","label":"New Emoji 2026"},{"href":"/render-test","label":"Emoji Render Test"},{"href":"/flags","label":"Flag Emoji"},{"href":"/emoji-meanings","label":"Emoji Meanings"},{"href":"/blog/hand-emoji-meanings","label":"Hand Emoji Meanings"}];

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
