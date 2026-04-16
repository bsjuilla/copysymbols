import type { Metadata } from "next";
import Link from "next/link";
import CopyToast from "@/components/CopyToast";
import BioLineItem from "./BioLineItem";

export const metadata: Metadata = {
  title: "How to Make a Line in Instagram Bio — Dividers Copy & Paste",
  description: "Copy and paste aesthetic lines for your Instagram bio.",
};

const lines = [
  { s: "────────────────────", n: "Thin line" },
  { s: "════════════════════", n: "Double line" },
  { s: "━━━━━━━━━━━━━━━━━━━━", n: "Thick line" },
  { s: "꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷", n: "Cute wave" },
  { s: "ꕤ───────────────ꕤ", n: "Flower ends" },
  { s: "⊱────────────────⊱", n: "Ornament line" },
  { s: "〰〰〰〰〰〰〰〰〰〰", n: "Wavy" },
];

export default function BlogInstagramLines() {
  return (
    <>
      <CopyToast />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>← Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          How to Make a Line in Your Instagram Bio
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
          Copy any line below and paste it into your Instagram bio to create a divider between sections.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
          {lines.map(({ s, n }) => <BioLineItem key={n} s={s} n={n} />)}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/borders" className="cat-pill">All Borders</Link>
          <Link href="/bio-templates" className="cat-pill">Bio Templates</Link>
          <Link href="/symbols-for/instagram" className="cat-pill">Instagram Symbols</Link>
        </div>
      </div>
    </>
  );
}
