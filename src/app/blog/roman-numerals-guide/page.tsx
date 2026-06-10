import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Roman Numerals — Chart, Rules & How to Read Them";
const DESCRIPTION = "Roman numerals explained: the seven symbols, the rules for reading and writing them, a chart from 1 to 3,999, and why clock faces use IIII instead of IV.";
const SLUG = "roman-numerals-guide";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["roman numerals","roman numerals chart","roman numeral rules","how to read roman numerals","roman numerals 1 to 100","mcmxciv meaning","why do clocks use iiii","roman numerals converter"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Roman numerals never quite left. They number Super Bowls and WrestleManias, date movies in the closing credits, distinguish kings and popes who share a name, and mark the hours on watch faces — all with an alphabet of just seven letters. Reading them is a skill you can pick up in about ten minutes, because the whole system runs on two rules: add when values descend, subtract in exactly six special cases. This guide walks through the seven symbols, the rules, a chart of every value worth knowing, and the genuinely odd corners of the system, like why nearly every clock face writes 4 as IIII and what the Romans did about zero (nothing, as it turns out).";

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "The Seven Symbols",
    paras: [
      "Everything in the system is built from seven capital letters: I is 1, V is 5, X is 10, L is 50, C is 100, D is 500, and M is 1,000. There is no symbol for anything larger in standard modern usage, and none for zero. Generations of students have kept the order straight with mnemonics like I Value Xylophones Like Cows Dig Milk, which is silly and works.",
      "Notice the structure: the symbols alternate between powers of ten (I, X, C, M) and their halfway points (V, L, D). That alternation is why no symbol ever needs to repeat more than three times. You never write VV for 10, because X exists, and in the standard modern convention you never write IIII for 4, because the subtractive pair IV says it in two characters. The halfway symbols V, L, and D never repeat at all.",
    ],
  },
  {
    h2: "Two Rules: Add, Then Subtract",
    paras: [
      "Rule one: read left to right, and when symbols stay level or descend in value, add them up. VIII is 5 plus 3, so 8. MMXXVI is 1,000 plus 1,000 plus 10 plus 10 plus 5 plus 1, which is the year 2026. Most numerals you meet in the wild are pure addition, which is why they feel half-readable even before you learn rule two.",
      "Rule two: when a smaller symbol sits in front of a larger one, subtract it. Modern convention permits exactly six subtractive pairs: IV (4) and IX (9), XL (40) and XC (90), CD (400) and CM (900). Only I, X, and C may be subtracted, each only from the next two symbols above it, and never two at a time, so 8 is always VIII and never IIX. The Romans themselves were far looser about all this; surviving inscriptions show IIII, XXXX, and stranger forms. The strict rules are a later standardization that settled in over the medieval and early modern centuries.",
      "Put both rules together and any numeral unwinds mechanically. Take MCMXCIV, a fixture of 1990s movie credits: M is 1,000; CM is 900 because C sits before M; XC is 90; IV is 4. Total, 1994. Reading is just walking left to right and asking one question at each symbol: is the next one bigger than this one?",
    ],
  },
  {
    h2: "The Chart: Values Worth Knowing",
    paras: [
      "One through twenty covers most everyday sightings, from chapter numbers to clock faces:",
      "1 I, 2 II, 3 III, 4 IV, 5 V, 6 VI, 7 VII, 8 VIII, 9 IX, 10 X",
      "11 XI, 12 XII, 13 XIII, 14 XIV, 15 XV, 16 XVI, 17 XVII, 18 XVIII, 19 XIX, 20 XX",
      "The tens repeat the same shape an order of magnitude up: 10 X, 20 XX, 30 XXX, 40 XL, 50 L, 60 LX, 70 LXX, 80 LXXX, 90 XC, 100 C.",
      "Beyond that, the landmarks: 200 CC, 400 CD, 500 D, 900 CM, 1,000 M, 2,000 MM. Years assemble from these parts — 1994 is MCMXCIV, 2000 is MM, 2026 is MMXXVI — and the largest number standard notation can express is 3,999, written MMMCMXCIX.",
    ],
  },
  {
    h2: "The Clock-Face Mystery: IIII Instead of IV",
    paras: [
      "Look at almost any clock or watch with Roman numerals and the four o'clock position reads IIII, not IV. This is not a mistake; it is a convention older than the strict subtraction rules, and nobody can prove why it stuck. The most repeated explanation is visual balance: IIII sits opposite VIII on the dial, and the heavier four-stroke numeral mirrors the eight far better than a slim IV would. With IIII, the dial also divides into three tidy zones of four hours each: one written with I alone, one using V, one using X.",
      "Other theories make better stories than evidence. One legend claims France's Louis XIV preferred IIII and ordered clockmakers to comply, a tale told with equal confidence about other kings and documented for none of them. Another notes that Romans tended to avoid IV because it begins IVPPITER, the Latin spelling of Jupiter, making IIII the genuinely classical form. All anyone can say for certain is that IIII was common in ancient inscriptions and early clockmakers kept it. The famous counterexample is in London: the Great Clock at Westminster, home of Big Ben, uses IV.",
    ],
  },
  {
    h2: "Zero, Fractions, and Other Gaps",
    paras: [
      "Roman numerals have no zero. The system is a tallying notation rather than a positional one, so nothing ever needs to hold an empty place the way 0 does in 105. When Romans had to express that nothing remained, they used words. Centuries later, medieval scribes computing calendar tables in Latin wrote nulla, meaning nothing, or just the letter N, where a zero belonged. A true numeral zero only reached Europe with Hindu-Arabic numerals, the system that would eventually displace Roman numerals for arithmetic altogether.",
      "Fractions existed, but in base twelve. The basic unit was the uncia, one twelfth (and the ancestor of both the inch and the ounce), written as a single dot. Dots accumulated up to five twelfths, and S, for semis, covered one half, with S plus dots continuing toward a whole. Twelfths divide cleanly by two, three, four, and six, which suited merchants doing mental arithmetic. For numbers past 3,999, later scribes drew a bar called a vinculum above a numeral to multiply it by 1,000, so a V with a bar over it meant 5,000 — a convention you will almost never need outside old documents.",
    ],
  },
  {
    h2: "Where You Still See Them",
    paras: [
      "The NFL adopted Roman numerals at Super Bowl V in 1971, with the first four games renumbered retroactively, partly because the season straddles two calendar years and a single year label would be ambiguous. The streak broke exactly once: the 2016 game was billed as Super Bowl 50 rather than L, after the league concluded that a lone L made for an awkward logo, and the numerals returned with LI the following year. Hollywood, meanwhile, has long stamped copyright dates in closing credits as numerals, which is why MCMXCIV scrolls past at the end of films from 1994.",
      "Elsewhere they signal continuity and rank: monarchs and popes (Elizabeth II, Benedict XVI), sequels (Rocky II, Final Fantasy VII), outline headings, and the front matter of books, where pages run i, ii, iii in lowercase before the Arabic numbers begin at chapter one. The common thread is that Roman numerals now carry ceremony rather than arithmetic. Nobody calculates with them anymore; they are typography with a classical accent.",
    ],
  },
  {
    h2: "How to Type Roman Numerals",
    paras: [
      "For almost every purpose, just type capital letters: I, V, X, L, C, D, M. They are on every keyboard, render in every font, survive every copy-paste, and are exactly what publishers, the NFL, and Hollywood use. There is no special keyboard mode to hunt for, and if you need book-style page numbering, the same letters in lowercase do the job.",
      "Unicode does include dedicated Roman numeral characters at code points U+2160 through U+217F: single characters like Ⅰ, Ⅳ, and Ⅻ, plus lowercase versions. They exist mainly for compatibility with East Asian character sets, where a numeral like Ⅻ needs to fit in a single character cell, and that is the rare context where they belong. In ordinary text they cause more trouble than they solve: a search for XII will not match a document containing Ⅻ, fonts support them unevenly, and screen readers handle them unpredictably. Stick with plain letters, and when you need a value converted in either direction, the Roman numeral converter on this site does it instantly.",
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is IIII on a clock face wrong?",
    a: "No. IIII is the traditional clockmaking convention, used for centuries on everything from tower clocks to luxury watches, and it predates the strict modern subtraction rules. IV is equally correct as a numeral, and a few famous clocks, including the Great Clock at Westminster, do use it. A watchmaker choosing IIII is following tradition, not making an error.",
  },
  {
    q: "What is the largest number you can write in Roman numerals?",
    a: "In standard modern notation, 3,999, written MMMCMXCIX, because symbols repeat at most three times and nothing larger than M exists. Medieval and early modern scribes extended the system with a vinculum, a bar drawn over a numeral to multiply it by 1,000, which made values like 50,000 expressible. Outside historical documents you will essentially never encounter that extension.",
  },
  {
    q: "How do you write 2026 in Roman numerals?",
    a: "MMXXVI: two Ms for 2,000, two Xs for 20, then VI for 6. Nearby years like 2025 (MMXXV), 2027 (MMXXVII), and 2030 (MMXXX) are just as regular, though any year ending in 4 or 9 brings a subtractive pair back — 2024 is MMXXIV and 2029 is MMXXIX.",
  },
  {
    q: "Did the Romans have a zero?",
    a: "No. The system counts things, and the Romans saw no need for a symbol meaning none, since words handled that. Medieval scholars writing calendar calculations in Latin later used nulla, or its initial N, where a zero would fall. The digit zero entered European arithmetic with Hindu-Arabic numerals, and that positional system ultimately replaced Roman numerals for any serious calculation.",
  },
  {
    q: "Why is 1994 written as MCMXCIV?",
    a: "Break it into place values: 1,000 is M, 900 is CM (100 before 1,000), 90 is XC (10 before 100), and 4 is IV (1 before 5). Chain them together and you get MCMXCIV. The year shows up constantly as an example because it packs three of the six subtractive pairs into one number, making it a perfect stress test for reading skills.",
  },
];

const RELATED: { href: string; label: string }[] = [
  { href: "/roman-numerals", label: "Roman Numeral Converter" },
  { href: "/symbols/math", label: "Math Symbols" },
  { href: "/blog/math-symbols-list", label: "Math Symbols List" },
  { href: "/character-counter", label: "Character Counter" },
  { href: "/alphabets", label: "Alphabets" },
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
