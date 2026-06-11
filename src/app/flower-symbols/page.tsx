import type { Metadata } from "next";
import Link from "next/link";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Flower Symbols ✿ ❀ ❁ Copy & Paste — All Floral Signs",
  description: "Copy flower symbols and emoji instantly: ✿ ❀ ❁ ✾ 🌸 🌺 🌻 🌹 and more floral text characters for Instagram bios, captions, Discord and your text messages.",
  ...canonical("/flower-symbols"),
};

const items = [
  { symbol: "✿", name: "White Florette" },
  { symbol: "❀", name: "Black Florette" },
  { symbol: "❁", name: "Eight Petalled Flower" },
  { symbol: "✾", name: "Six Petalled Black Flower" },
  { symbol: "✽", name: "Heavy Eight Teardrop" },
  { symbol: "❋", name: "Heavy Eight Petal" },
  { symbol: "🌸", name: "Cherry Blossom" },
  { symbol: "🌺", name: "Hibiscus" },
  { symbol: "🌻", name: "Sunflower" },
  { symbol: "🌹", name: "Rose" },
  { symbol: "🌷", name: "Tulip" },
  { symbol: "💐", name: "Bouquet" },
  { symbol: "🌼", name: "Blossom" },
  { symbol: "🪷", name: "Lotus" },
  { symbol: "☘", name: "Shamrock" },
  { symbol: "🍀", name: "Four Leaf Clover" },
];

const faqs = [
  { q: "What is the difference between a flower symbol and a flower emoji?", a: "A flower symbol like ✿ or ❀ is a single text character from the Unicode Dingbats block. It is monochrome and takes the colour of the surrounding text, so it sits neatly inside a line of writing. A flower emoji like 🌸 or 🌹 is a full-colour pictograph that the platform draws as a small image. Both copy and paste the same way; the text symbols suit minimalist bios, while the emoji suit captions and messages." },
  { q: "How do I type a flower symbol without copying it?", a: "There is no single keyboard shortcut, which is why copying is easiest. On Windows you can hold Alt and type a character code on the numpad; on Mac you can use the Character Viewer (Control+Command+Space) and search for 'flower'. On phones, the flower emoji live in the emoji keyboard under the plants and nature tab." },
  { q: "Will flower symbols show up on every device?", a: "The text symbols (✿ ❀ ❁ ✾ ✽ ❋) are old, widely supported Dingbats and render almost everywhere. The newer flower emoji such as 🪷 (lotus) were added in later Unicode versions, so very old phones may show a blank box. If you need to be sure, paste it into the Render Test first." },
  { q: "Which flower symbol is best for an Instagram bio?", a: "For a soft, aesthetic bio, ✿ and ❀ are the most popular because they are clean and monochrome. Pair one with a divider line or a moon for a cohesive theme. Save the colourful emoji like 🌸 and 🌷 for captions where a pop of colour fits." },
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
        { "@type": "ListItem", position: 3, name: "Flower Symbols", item: `${baseUrl}/flower-symbols` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Flower Symbols",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${it.symbol} ${it.name}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function FlowerSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Flower Symbols ✿
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Click any flower symbol to copy it. The text flowers (✿ ❀ ❁) are monochrome Unicode characters that blend into a line of writing, while the emoji flowers (🌸 🌹 🌻) add a splash of colour. All of them work in Instagram and TikTok bios, captions, Discord, and anywhere else you type.
      </p>
      <CopySymbolGrid items={items} columns="repeat(auto-fill, minmax(140px, 1fr))" />

      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={subH2}>How to use flower symbols</h2>
        <p style={proseP}>
          Flower symbols do their best work as accents, not decoration for its own sake. In a bio, one flower on each side of your name (<strong>✿ luna ✿</strong>) frames it without crowding it. In a caption, a single 🌷 or 🌸 at the end adds a soft finish. As a list marker, ❀ replaces a plain bullet for a gentler look. The rule of thumb is the same one good designers use: if a symbol is not adding meaning or rhythm, it is adding clutter.
        </p>
        <h2 className="font-display" style={subH2}>Text flowers vs emoji flowers</h2>
        <p style={proseP}>
          The six text symbols at the start of the grid come from the Dingbats block that has been part of Unicode since its early days, which is why they render reliably on practically any device and take on the colour of your text. The pictographs that follow — cherry blossom, hibiscus, sunflower, rose, tulip — are emoji, drawn in full colour by each platform&apos;s own art. If you want a symbol that disappears into your text styling, choose a text flower. If you want a small picture that stands out, choose an emoji.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 className="font-display" style={{ ...subH2, marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 }}>
        <Link href="/sparkle-symbols" className="cat-pill">Sparkle Symbols</Link>
        <Link href="/hearts" className="cat-pill">Heart Symbols</Link>
        <Link href="/stars" className="cat-pill">Star Symbols</Link>
        <Link href="/aesthetic" className="cat-pill">Aesthetic Symbols</Link>
        <Link href="/blog/aesthetic-instagram-bio" className="cat-pill">Aesthetic Bio Guide</Link>
      </div>
    </div>
  );
}

const subH2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.01em" };
const proseP: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 };
