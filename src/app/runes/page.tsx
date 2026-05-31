import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import LiveTransform from "@/components/LiveTransform";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForScript } from "@/lib/related";
import { RUNES } from "@/lib/runes";

export const metadata: Metadata = {
  title: "Runes — Elder Futhark Symbols Copy & Paste + Name Converter",
  description: "Copy and paste Elder Futhark runes, the 24 Viking / Norse runic letters with their names and sounds. Convert your name or any text to runes with the rune translator. Real Unicode.",
  keywords: ["runes copy paste", "elder futhark", "viking runes", "norse runes", "rune symbols", "name in runes", "rune translator"],
  ...canonical("/runes"),
};

const baseUrl = "https://www.copychars.com";

const faqs = [
  {
    q: "What are Elder Futhark runes?",
    a: "Elder Futhark is the oldest form of the runic alphabet, used by Germanic and Norse peoples from roughly 150 to 800 AD. It has 24 runes, each with a sound value and a name (such as Fehu 'f' or Ansuz 'a'). The name 'Futhark' comes from the first six runes: F, U, Th, A, R, K.",
  },
  {
    q: "How do I write my name in runes?",
    a: "Type your name into the converter above and it transliterates each letter to its closest Elder Futhark rune, then click copy. Because runes are not a perfect one-to-one match for English, this is an approximation — for example c and k both map to Kaunan, and 'th' becomes the single rune Thurisaz.",
  },
  {
    q: "Do rune symbols work on phones and computers?",
    a: "Yes. These are standard Unicode characters from the Runic block, so they copy and paste into messages, bios, captions and documents. Most devices render them through a fallback font; if a rune shows as a box on an older system, the character is still correct and displays on others.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Runes", item: `${baseUrl}/runes` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function RunesPage() {
  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>Runes</span>
        </div>

        <div className="section-label">Copy &amp; Paste</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
          Runes — Elder Futhark
        </h1>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "22px 26px", marginBottom: 32, maxWidth: 820 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            The Elder Futhark is the oldest runic alphabet — 24 Viking-age runes, each with a name and a sound. Convert your name to runes below, or copy any rune from the chart. Every rune is real Unicode that pastes anywhere you write text.
          </p>
        </div>

        {/* Name → runes */}
        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Write your name in runes</h2>
          <LiveTransform mode="runes" defaultText="Ragnar" placeholder="Type your name or any text…" />
        </section>

        {/* Rune chart */}
        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>The 24 Elder Futhark runes</h2>
          <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 16px" }}>Click any rune to copy it. Each shows its name and sound.</p>
          <CopySymbolGrid
            columns="repeat(auto-fill, minmax(120px, 1fr))"
            items={RUNES.map(r => ({ symbol: r.rune, name: r.name, use: r.latin }))}
          />
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>Runes — FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks links={relatedForScript()} heading="Related — alphabets, symbols & tools" />
      </div>
    </>
  );
}
