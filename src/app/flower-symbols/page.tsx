import type { Metadata } from "next";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Flower Symbols ✿ ❀ ❁ Copy & Paste — All Floral Signs",
  description: "Copy flower symbols instantly. ✿ ❀ ❁ ✾ 🌸 🌺 🌻 — floral text symbols and emoji flowers for bios, captions, and messages.",
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

export default function FlowerSymbolsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Flower Symbols ✿
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any flower symbol to copy it. Perfect for Instagram bios, captions, TikTok, and social media.
      </p>
      <CopySymbolGrid items={items} columns="repeat(auto-fill, minmax(140px, 1fr))" />
    </div>
  );
}
