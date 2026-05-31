import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import RomanConverter from "@/components/RomanConverter";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForRoman } from "@/lib/related";
import { toRoman } from "@/lib/roman";

export const metadata: Metadata = {
  // No "| CopyChars" suffix — layout.tsx's title template appends it once.
  title: "Roman Numerals — Converter, Chart 1–3999 & Rules",
  description: "Convert numbers to Roman numerals and back with a free converter. Roman numerals chart 1–100, years and dates, the 7 symbols (I V X L C D M) and the rules — copy any numeral instantly.",
  keywords: ["roman numerals", "roman numeral converter", "roman numerals 1-100", "roman numerals chart", "number to roman numerals", "date in roman numerals", "roman numerals 1 to 1000"],
  ...canonical("/roman-numerals"),
};

const baseUrl = "https://www.copychars.com";

const BASE_SYMBOLS: [string, number][] = [
  ["I", 1], ["V", 5], ["X", 10], ["L", 50], ["C", 100], ["D", 500], ["M", 1000],
];
const SUBTRACTIVE: [string, number][] = [
  ["IV", 4], ["IX", 9], ["XL", 40], ["XC", 90], ["CD", 400], ["CM", 900],
];

const range = (from: number, to: number, step = 1) => {
  const out: number[] = [];
  for (let n = from; n <= to; n += step) out.push(n);
  return out;
};
const POPULAR_YEARS = [1500, 1700, 1800, 1900, 1950, 1969, 1984, 2000, 2010, 2020, 2024, 2025, 2026, 2030];

const faqs = [
  {
    q: "What are the Roman numerals 1 to 10?",
    a: "1 to 10 in Roman numerals are: I (1), II (2), III (3), IV (4), V (5), VI (6), VII (7), VIII (8), IX (9), X (10). Four and nine use subtractive notation (IV, IX) — a smaller symbol before a larger one means subtract.",
  },
  {
    q: "What is the Roman numeral for 2026?",
    a: "2026 is MMXXVI — that is M (1000) + M (1000) + X (10) + X (10) + V (5) + I (1). You can convert any year with the converter above.",
  },
  {
    q: "How do Roman numerals work?",
    a: "Seven letters carry fixed values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. You add symbols from largest to smallest (e.g. XV = 15). When a smaller value sits before a larger one it is subtracted, giving IV=4, IX=9, XL=40, XC=90, CD=400, CM=900. A symbol repeats at most three times in a row.",
  },
  {
    q: "Why is 4 written as IV and not IIII?",
    a: "Standard Roman numerals use subtractive notation: IV (5 − 1) instead of IIII, because a symbol should not repeat four times. The one common exception is clock and watch faces, which traditionally use IIII for 4 for visual balance.",
  },
  {
    q: "What is the largest Roman numeral?",
    a: "Using the standard letters I–M, the largest value is 3999 = MMMCMXCIX. Numbers of 4000 and above need a bar (vinculum) over a letter to multiply it by 1000, which is why most converters — including this one — cover 1 to 3999.",
  },
  {
    q: "How do I write a date in Roman numerals?",
    a: "Write each part — day, month and year — as its own numeral and separate them, for example 31 · 5 · 2026 becomes XXXI · V · MMXXVI. Use the Date → Roman box above to convert any date for a tattoo, ring engraving or anniversary.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Roman Numerals", item: `${baseUrl}/roman-numerals` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function Chart({ heading, note, numbers }: { heading: string; note?: string; numbers: number[] }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: note ? 4 : 14 }}>{heading}</h3>
      {note && <p style={{ fontSize: 13, color: "var(--text3)", margin: "0 0 14px" }}>{note}</p>}
      <CopySymbolGrid
        columns="repeat(auto-fill, minmax(96px, 1fr))"
        items={numbers.map(n => ({ symbol: toRoman(n), name: String(n) }))}
      />
    </section>
  );
}

export default function RomanNumeralsPage() {
  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>Roman Numerals</span>
        </div>

        <div className="section-label">Converter &amp; Chart</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
          Roman Numerals
        </h1>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "22px 26px", marginBottom: 32, maxWidth: 820 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            Roman numerals are an ancient number system built from seven letters — <strong style={{ color: "var(--text)" }}>I, V, X, L, C, D, M</strong>. Convert a number to Roman numerals or back below, browse the full chart, or turn a date into numerals for a tattoo or engraving. Every numeral is plain text you can copy and paste anywhere.
          </p>
        </div>

        {/* Converter */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Roman numeral converter</h2>
          <RomanConverter />
        </section>

        {/* Symbol reference */}
        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>The 7 Roman numeral symbols</h2>
          <CopySymbolGrid
            columns="repeat(auto-fill, minmax(96px, 1fr))"
            items={BASE_SYMBOLS.map(([sym, val]) => ({ symbol: sym, name: String(val) }))}
          />
          <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "8px 0 14px" }}>Subtractive pairs</h3>
          <CopySymbolGrid
            columns="repeat(auto-fill, minmax(96px, 1fr))"
            items={SUBTRACTIVE.map(([sym, val]) => ({ symbol: sym, name: String(val) }))}
          />
        </section>

        {/* Charts */}
        <section style={{ marginBottom: 40 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Roman numerals chart</h2>
          <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 24px" }}>Click any numeral to copy it.</p>
          <Chart heading="1 to 20" numbers={range(1, 20)} />
          <Chart heading="By tens (10–100)" numbers={range(10, 100, 10)} />
          <Chart heading="By hundreds (100–1000)" numbers={range(100, 1000, 100)} />
          <Chart heading="Thousands" numbers={[1000, 2000, 3000]} />
          <Chart heading="Popular years" note="Common years in Roman numerals — handy for copyright dates and tattoos." numbers={POPULAR_YEARS} />
        </section>

        {/* Rules */}
        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>How to read &amp; write Roman numerals</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text2)", fontSize: 15, lineHeight: 1.9 }}>
            <li><strong style={{ color: "var(--text)" }}>Add left to right:</strong> symbols go from largest to smallest and you add their values — VIII = 5 + 1 + 1 + 1 = 8.</li>
            <li><strong style={{ color: "var(--text)" }}>Subtract when smaller comes first:</strong> a smaller symbol before a larger one is subtracted — IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.</li>
            <li><strong style={{ color: "var(--text)" }}>Repeat at most three times:</strong> III is fine, but IIII is not — use IV instead.</li>
            <li><strong style={{ color: "var(--text)" }}>Only one subtraction per group,</strong> and only I, X and C are subtracted (never V, L or D).</li>
            <li><strong style={{ color: "var(--text)" }}>Range:</strong> standard numerals cover 1 to 3999 (MMMCMXCIX); larger numbers need a bar over the letter.</li>
          </ul>
        </section>

        {/* Uses */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Where Roman numerals are used</h2>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            Copyright and film release years (© MMXXVI), Super Bowl numbers, clock and watch faces, book chapters and page prefixes, monarch and pope names (Henry VIII, Pope John XXIII), sequels and editions, building cornerstones, and date tattoos. Because they are standard Unicode letters, the numerals you copy here paste cleanly into any document, caption or design.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>Roman numerals — FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks links={relatedForRoman()} heading="Related — number tools, symbols & converters" />
      </div>
    </>
  );
}
