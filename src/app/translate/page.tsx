import { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import { translators } from "@/lib/translators";

const TITLE = "Free Online Translators — Text to Wingdings, Braille, Pig Latin";
const DESCRIPTION = "Free online translators for Wingdings, Braille, Pig Latin, Morse code and more. Type once in your browser, get the encoded output and copy it to your clipboard.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...canonical("/translate"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://www.copychars.com/translate", type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: "https://www.copychars.com/translate",
  hasPart: translators.map(t => ({
    "@type": "WebApplication",
    name: `${t.pair.from} to ${t.pair.to} Translator`,
    url: `https://www.copychars.com/translate/${t.id}`,
    applicationCategory: "UtilityApplication",
  })),
};

export default function TranslateIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <h1 className="font-display" style={{ fontSize: 36, color: "var(--accent)", marginBottom: 8 }}>Translators</h1>
        <p style={{ color: "var(--text2)", marginBottom: 32 }}>
          Free, browser-only text converters. No signup, no upload — just type, copy, paste.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {translators.map(t => (
            <Link
              key={t.id}
              href={`/translate/${t.id}`}
              style={{
                display: "block",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 20,
                textDecoration: "none",
                color: "var(--text)",
              }}
            >
              <h2 style={{ fontSize: 18, marginBottom: 8, color: "var(--accent)" }}>
                {t.pair.from} → {t.pair.to}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text2)", margin: 0 }}>{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
