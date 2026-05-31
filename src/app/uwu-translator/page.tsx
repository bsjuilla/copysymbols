import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import LiveTransform from "@/components/LiveTransform";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedForKaomoji } from "@/lib/related";
import { uwuify } from "@/lib/uwu";

export const metadata: Metadata = {
  title: "UwU Translator — Convert Text to UwU / OwO Speak",
  description: "Free UwU translator: turn any text into cute uwu / owo speak. r and l become w, n becomes ny, plus kaomoji faces. Type, copy and paste anywhere. owo",
  keywords: ["uwu translator", "owo translator", "uwu text", "uwuify", "uwu converter", "text to uwu"],
  ...canonical("/uwu-translator"),
};

const baseUrl = "https://www.copychars.com";

const EXAMPLES = ["Hello, how are you?", "I really love this song!", "You are so cute."];

const faqs = [
  {
    q: "What is an UwU translator?",
    a: "An UwU translator rewrites normal text into cute 'uwu speak': the letters r and l turn into w, n before a vowel becomes ny, words like 'love' become 'wuv', and playful kaomoji faces like uwu, owo and >w< are sprinkled in. Type anything above and copy the result.",
  },
  {
    q: "What is the difference between uwu and owo?",
    a: "Both are cute emoticons of a face. 'uwu' suggests a smug or content little smile, while 'owo' shows surprise or curiosity ('what's this?'). In uwu speak the whole style is named after them, and this translator mixes both faces into the output.",
  },
  {
    q: "How do I copy the uwu text?",
    a: "Type or paste your text in the box, then click 'Copy result' to copy the uwu version to your clipboard. Paste it into Discord, Instagram, TikTok comments, texts or anywhere you can type — it's plain text, so it works everywhere.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "UwU Translator", item: `${baseUrl}/uwu-translator` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function UwuTranslatorPage() {
  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>UwU Translator</span>
        </div>

        <div className="section-label">Text Converter</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
          UwU Translator
        </h1>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "22px 26px", marginBottom: 32, maxWidth: 820 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            Turn any text into cute <strong style={{ color: "var(--text)" }}>uwu / owo</strong> speak. Type below and the converter swaps r and l for w, turns n into ny, changes &ldquo;love&rdquo; into &ldquo;wuv,&rdquo; and adds playful kaomoji faces. Then copy and paste it anywhere.
          </p>
        </div>

        <section style={{ marginBottom: 44 }}>
          <LiveTransform mode="uwu" defaultText="Hello, I love you! owo" placeholder="Type something to uwu-ify…" />
        </section>

        <section style={{ marginBottom: 44 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Examples</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EXAMPLES.map((ex, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 4 }}>{ex}</div>
                <div style={{ fontSize: 15, color: "var(--text)" }}>{uwuify(ex)}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 18 }}>UwU translator — FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks links={relatedForKaomoji()} heading="Related — kaomoji, emoji & text tools" />
      </div>
    </>
  );
}
