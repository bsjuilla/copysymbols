import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Morse Code Alphabet — Full Chart & How to Read It";
const DESCRIPTION = "Morse code alphabet chart with every letter A to Z and digit 0 to 9, plus timing rules, the real story of SOS, and how people actually learn it by ear.";
const SLUG = "morse-code-alphabet";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["morse code alphabet","morse code chart","morse code letters","morse code numbers","how to read morse code","learn morse code","international morse code","sos in morse code"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Morse code looks like noise until someone shows you the system, and then it clicks fast: every letter of the alphabet is a short pattern of two sounds, a quick dit and a longer dah, written down as dots and dashes. The full chart fits on an index card. E is a single dot. T is a single dash. SOS is three short, three long, three short. This guide lays out the complete International Morse alphabet, letters A through Z and digits 0 through 9, then covers the timing rules that make it readable, where the code came from, and how people actually learn it in practice — which has surprisingly little to do with staring at a chart.";

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "How to Read the Chart",
    paras: [
      "Morse code has exactly two elements. The short one is a dit, written as a dot (·); the long one is a dah, written as a dash (−). Every letter is a unique sequence of one to four of these elements, every digit is a sequence of exactly five, and that is the entire inventory. There is no uppercase or lowercase, and no separate alphabet for sending versus receiving. When operators say a pattern aloud they voice it as sound, so A (·−) is spoken di-dah and C (−·−·) is dah-di-dah-dit.",
      "Two reading habits help from the start. First, the patterns were assigned roughly by frequency: the most common English letters got the shortest codes, which is why E and T, the two most frequent letters, are a single element each. Second, length carries meaning. A dah lasts exactly three times as long as a dit, so −− and ·− are different letters, not sloppy variations of each other. With those two ideas in place, the chart below stops looking like static.",
    ],
  },
  {
    h2: "The Letters: A to Z",
    paras: [
      "Here is the complete International Morse alphabet. Read each pattern left to right, element by element.",
      "A ·−, B −···, C −·−·, D −··, E ·, F ··−·, G −−·, H ····, I ··",
      "J ·−−−, K −·−, L ·−··, M −−, N −·, O −−−, P ·−−·, Q −−·−, R ·−·",
      "S ···, T −, U ··−, V ···−, W ·−−, X −··−, Y −·−−, Z −−··",
      "A few patterns are worth noticing because they anchor the rest. E (·) and T (−) are the one-element letters. I (··), A (·−), N (−·), and M (−−) are the four possible two-element combinations. The four-element codes carry rarer letters like Q, X, Y, and Z, while J (·−−−) is the only letter that climbs from a single dit into three dahs. Learners also lean on lucky coincidences: S (···) and O (−−−) are easy to hold onto precisely because SOS drills them in.",
    ],
  },
  {
    h2: "The Numbers: 0 to 9",
    paras: [
      "Digits are more orderly than letters: every single one is exactly five elements long.",
      "1 ·−−−−, 2 ··−−−, 3 ···−−, 4 ····−, 5 ·····",
      "6 −····, 7 −−···, 8 −−−··, 9 −−−−·, 0 −−−−−",
      "The pattern is elegant enough to learn in a minute. For 1 through 5, the digit tells you how many dits to send first, and dahs fill the remaining slots, so 3 is three dits then two dahs (···−−). From 6 through 9 the logic mirrors: subtract five, send that many dahs, then fill with dits, so 7 is two dahs and three dits (−−···). Zero is five dahs, the longest signal on the chart. Once you see the symmetry, you never need to memorize the digits individually again.",
    ],
  },
  {
    h2: "Timing Is Everything",
    paras: [
      "Morse has formal timing rules, all expressed in multiples of one unit, where a unit is the length of a single dit. A dah is three units. The silence between dits and dahs inside one letter is one unit. The silence between letters is three units, and the silence between words is seven. These ratios are the actual standard rather than folklore; they are written into the ITU recommendation that defines International Morse code to this day.",
      "Spacing carries as much meaning as the beeps. The same six elements ··· −−− read as the two letters S and O when separated by a three-unit gap, but squeeze that gap down and a listener hears something else entirely. Operators measure speed in words per minute using the reference word PARIS, which conveniently works out to exactly 50 units including its trailing word space. At 20 words per minute, that means 1,000 units every minute, with each dit lasting about 60 milliseconds. Rhythm, not memorization, is what makes sending readable.",
    ],
  },
  {
    h2: "Where Morse Code Came From",
    paras: [
      "Samuel F. B. Morse, a painter turned inventor, developed the electric telegraph with machinist and collaborator Alfred Vail through the 1830s and 1840s. The code that bears Morse's name owes a great deal to Vail, who worked out much of the practical signaling scheme. On May 24, 1844, the pair opened America's first long-distance telegraph line by sending the message What hath God wrought from Washington to Baltimore, and within a decade telegraph wires were spreading across continents.",
      "What Americans tapped out in 1844, though, is not quite the code in the chart above. The original American Morse used internal spaces and varying dash lengths that worked poorly on undersea cables and early radio. German telegrapher Friedrich Clemens Gerke streamlined it in 1848, European nations standardized that revision in 1865, and the result, International Morse code, is the version the entire world uses now, maintained by the International Telecommunication Union. American Morse survives mostly among historical reenactors and a few devoted hobbyists.",
    ],
  },
  {
    h2: "SOS Is Not an Acronym",
    paras: [
      "SOS does not stand for save our souls, save our ship, or anything else. It was adopted at the 1906 International Radiotelegraph Convention in Berlin precisely because the pattern is unmistakable: three dits, three dahs, three dits, sent as one continuous sequence with no letter spacing (···−−−···). Officially it is a single nine-element distress signal rather than three letters; SOS is simply the most convenient way to write it down. The expansions came later, invented by the public because the letters seemed to beg for a meaning.",
      "The signal earned its fame quickly. When the Titanic went down in 1912, its radio operators sent both the older distress call CQD and the newer SOS as the ship flooded. Morse has carried quieter distress messages too: in 1966, captured U.S. Navy pilot Jeremiah Denton blinked the word TORTURE in Morse code with his eyes during a televised propaganda interview in North Vietnam, telling the world what his captors would not allow him to say.",
    ],
  },
  {
    h2: "How People Learn Morse Today",
    paras: [
      "Nobody fluent in Morse reads it off a chart. The code is learned as sound, and the two standard training techniques both attack the same trap: counting dots in your head, which collapses above a few words per minute. The Koch method starts you at full target speed with just two characters and adds a new one each time your accuracy passes roughly 90 percent. Farnsworth timing sends each character fast but stretches the silence between characters, so your brain absorbs the true rhythm of every letter from day one while the gaps shrink as you improve.",
      "And people genuinely still learn it. Amateur radio operators keep Morse alive on the airwaves by the thousands (they call it CW, for continuous wave) long after the United States dropped it as a licensing requirement in 2007, because it punches through noise and weak signals that defeat voice transmission. It has a second life in accessibility: Google added a Morse input mode to its Gboard keyboard in 2018, developed with Tania Finlayson, who has used Morse to communicate for most of her life. Add flashlight signals, tapped messages through walls, and a steady supply of puzzle hunts, and a code approaching two centuries old is doing remarkably well.",
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is SOS in Morse code?",
    a: "Three dits, three dahs, three dits: ···−−−···, sent as one continuous string with no gaps between the letters. It was adopted internationally in 1906 because it is simple to send and nearly impossible to misread, not because it abbreviates any phrase. If you ever need it with a flashlight: three short flashes, three long, three short, pause, repeat.",
  },
  {
    q: "Why is E just a single dot?",
    a: "Shorter codes went to more frequent letters so messages would transmit faster. E is the most common letter in English, so it received the shortest possible code, with T, the next most common, taking the single dah. According to the story told since the 1840s, Alfred Vail estimated letter frequencies by counting the movable type in a printer's cases, reasoning that printers stocked the most copies of the letters they used most often.",
  },
  {
    q: "How long does it take to learn Morse code?",
    a: "Most people can memorize all the letters within a couple of weeks of short daily practice. Copying live code by ear is the real skill: reaching a comfortable speed of 15 to 20 words per minute typically takes a few months of regular listening practice with the Koch method or Farnsworth timing. The classic mistake that slows learners down is memorizing the chart visually instead of learning each letter as a rhythm.",
  },
  {
    q: "Is Morse code still used officially?",
    a: "Commercial shipping retired Morse in 1999, when satellite-based distress systems took over under the Global Maritime Distress and Safety System. It survives officially in a few corners: navies still train signalmen on flashing lamps, and aviation radio beacons identify themselves in Morse. Unofficially it thrives in amateur radio, where thousands of operators use it daily by choice.",
  },
  {
    q: "Does Morse code cover punctuation and other languages?",
    a: "Yes. International Morse includes punctuation, such as ·−·−·− for the period, −−··−− for the comma, and ··−−·· for the question mark, plus codes for several accented letters. Other writing systems have their own adaptations, such as the Wabun code for Japanese kana and Cyrillic Morse for Russian, which map the same dit-dah patterns onto their own alphabets.",
  },
];

const RELATED: { href: string; label: string }[] = [
  { href: "/morse-code", label: "Morse Code Translator" },
  { href: "/binary-translator", label: "Binary Translator" },
  { href: "/runes", label: "Rune Symbols" },
  { href: "/alphabets", label: "Alphabets" },
  { href: "/blog/greek-alphabet-list", label: "Greek Alphabet List" },
];

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
