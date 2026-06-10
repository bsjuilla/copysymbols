import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "All Currency Symbols List — Copy & Paste $ € £ ¥ ₹ ₿";
const DESCRIPTION = "Complete list of all world currency symbols with their country, currency name and Unicode. Copy any currency symbol with one click.";
const SLUG = "currency-symbols-list";
const PUBLISHED = "2026-03-01T00:00:00Z";
const MODIFIED = "2026-05-09T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["currency symbols list","all currency symbols","money symbols copy paste","$ € £ ¥ symbols","world currency symbols"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

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

const currencies = [
  { s: "＄", n: "Dollar", country: "USA, Canada, Australia & more", unicode: "U+0024" },
  { s: "€", n: "Euro", country: "Eurozone (19 EU countries)", unicode: "U+20AC" },
  { s: "£", n: "Pound Sterling", country: "United Kingdom", unicode: "U+00A3" },
  { s: "¥", n: "Yen / Yuan", country: "Japan / China", unicode: "U+00A5" },
  { s: "₹", n: "Indian Rupee", country: "India", unicode: "U+20B9" },
  { s: "₿", n: "Bitcoin", country: "Cryptocurrency (global)", unicode: "U+20BF" },
  { s: "₽", n: "Russian Ruble", country: "Russia", unicode: "U+20BD" },
  { s: "₩", n: "South Korean Won", country: "South Korea", unicode: "U+20A9" },
  { s: "¢", n: "Cent", country: "USA (1/100 dollar)", unicode: "U+00A2" },
  { s: "₺", n: "Turkish Lira", country: "Turkey", unicode: "U+20BA" },
  { s: "₴", n: "Ukrainian Hryvnia", country: "Ukraine", unicode: "U+20B4" },
  { s: "₦", n: "Nigerian Naira", country: "Nigeria", unicode: "U+20A6" },
  { s: "฿", n: "Thai Baht", country: "Thailand", unicode: "U+0E3F" },
  { s: "₱", n: "Philippine Peso", country: "Philippines", unicode: "U+20B1" },
  { s: "₫", n: "Vietnamese Dong", country: "Vietnam", unicode: "U+20AB" },
  { s: "₲", n: "Paraguayan Guaraní", country: "Paraguay", unicode: "U+20B2" },
  { s: "₡", n: "Costa Rican Colón", country: "Costa Rica", unicode: "U+20A1" },
  { s: "₸", n: "Kazakhstani Tenge", country: "Kazakhstan", unicode: "U+20B8" },
];

export default function BlogCurrency() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link> › <Link href="/symbols/currency" style={{ color: "var(--text3)", textDecoration: "none" }}>Currency Symbols</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        Complete List of Currency Symbols — Copy & Paste $ € £ ¥
      </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
        Every world currency symbol in one place, with the country, currency name and Unicode code point. Click any symbol to go to its detail page and copy it.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 48 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Symbol","Currency Name","Country / Region","Unicode"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: "var(--text3)", fontWeight: 500, fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencies.map((c, i) => (
              <tr key={c.n} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td style={{ padding: "12px 14px", fontSize: "1.8rem" }}>{c.s}</td>
                <td style={{ padding: "12px 14px", color: "var(--text)", fontWeight: 500 }}>{c.n}</td>
                <td style={{ padding: "12px 14px", color: "var(--text2)" }}>{c.country}</td>
                <td style={{ padding: "12px 14px" }}><span className="code-tag">{c.unicode}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginBottom: 32 }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>Browse all currency symbols</h2>
        <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16 }}>Visit our dedicated currency symbols page to copy any symbol with one click, see keyboard shortcuts, and get HTML codes.</p>
        <Link href="/symbols/currency" style={{ background: "var(--accent)", color: "var(--bg)", padding: "8px 20px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          Browse Currency Symbols →
        </Link>
      </div>
    </div>
    </>
  );
}
