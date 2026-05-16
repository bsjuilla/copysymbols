import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Copyright Symbol © Copy & Paste — ™ ® © All IP Symbols",
  description: "Copy the copyright symbol © instantly. Includes trademark ™, registered ® and all IP symbols. Shortcuts: Windows Alt+0169, Mac Option+G, iPhone hold C.",
  ...canonical("/copyright-symbol"),
};

const items = [
  { symbol: "©", name: "Copyright Sign", unicode: "U+00A9", use: "Copyright protection" },
  { symbol: "™", name: "Trade Mark Sign", unicode: "U+2122", use: "Unregistered trademark" },
  { symbol: "®", name: "Registered Trade Mark", unicode: "U+00AE", use: "Registered trademark" },
  { symbol: "℠", name: "Service Mark", unicode: "U+2120", use: "Service mark" },
  { symbol: "℗", name: "Sound Recording Copyright", unicode: "U+2117", use: "Phonogram copyright" },
  { symbol: "§", name: "Section Sign", unicode: "U+00A7", use: "Legal section" },
  { symbol: "¶", name: "Pilcrow", unicode: "U+00B6", use: "Paragraph mark" },
  { symbol: "†", name: "Dagger", unicode: "U+2020", use: "Footnote reference" },
  { symbol: "⚖", name: "Scales of Justice", unicode: "U+2696", use: "Law and justice" },
];

const baseUrl = "https://www.copychars.com";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Symbols", item: `${baseUrl}/symbols` },
        { "@type": "ListItem", position: 3, name: "Copyright Symbol", item: `${baseUrl}/copyright-symbol` },
      ],
    },
    {
      "@type": "DefinedTerm",
      name: "Copyright Symbol",
      termCode: "U+00A9",
      description: "The copyright symbol © (U+00A9) is used in legal notices, documents, and content attribution worldwide. Related IP marks include ™ (U+2122), ® (U+00AE), ℠ (U+2120), and ℗ (U+2117).",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Unicode Symbols",
        url: `${baseUrl}/symbols`,
      },
      url: `${baseUrl}/copyright-symbol`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I type the copyright symbol on Windows?", acceptedAnswer: { "@type": "Answer", text: "Hold Alt and type 0169 on the numeric keypad to produce ©." } },
        { "@type": "Question", name: "How do I type the copyright symbol on Mac?", acceptedAnswer: { "@type": "Answer", text: "Press Option + G to produce ©." } },
        { "@type": "Question", name: "How do I type the copyright symbol on iPhone or Android?", acceptedAnswer: { "@type": "Answer", text: "Hold the C key on the iPhone keyboard — © appears in the popup. The same long-press works on most Android keyboards." } },
        { "@type": "Question", name: "What is the HTML entity for the copyright symbol?", acceptedAnswer: { "@type": "Answer", text: "Use &copy; or the numeric reference &#169; to render © in HTML." } },
        { "@type": "Question", name: "How do I get the copyright symbol in Microsoft Word?", acceptedAnswer: { "@type": "Answer", text: "Type (c) and Word autocorrects it to ©." } },
      ],
    },
  ],
};

export default function CopyrightSymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Copyright Symbol ©
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any symbol to copy it instantly. Used in legal notices, documents, and content attribution worldwide.
      </p>
      <CopySymbolGrid items={items} />
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Keyboard Shortcuts for ©</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 0169" },
            { platform: "Mac", method: "Option + G" },
            { platform: "iPhone", method: "Hold C key — © appears" },
            { platform: "Android", method: "Hold C on most keyboards" },
            { platform: "HTML", method: "&copy; or &#169;" },
            { platform: "Word", method: "(c) autocorrects to ©" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/legal",label:"All Legal Symbols"},{href:"/blog/trademark-vs-registered",label:"™ vs ® Explained"},{href:"/blog/how-to-type-copyright",label:"Type © Guide"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
