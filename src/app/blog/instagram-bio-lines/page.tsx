import type { Metadata } from "next";
import Link from "next/link";
import CopyToast from "@/components/CopyToast";
import BioLineItem from "./BioLineItem";

export const metadata: Metadata = {
  title: "How to Make a Line in Instagram Bio — Dividers & Separators Copy & Paste",
  description: "How to add lines, dividers and separators to your Instagram bio. Copy and paste aesthetic lines like ─────, ══════, ꒷꒦꒷ that work in Instagram bios.",
  keywords: ["instagram bio line","how to add line to instagram bio","instagram bio divider copy paste","aesthetic line instagram bio","separator instagram bio"],
};

const lines = [
  { s: "────────────────────", n: "Thin line" },
  { s: "════════════════════", n: "Double line" },
  { s: "━━━━━━━━━━━━━━━━━━━━", n: "Thick line" },
  { s: "꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷", n: "Cute wave" },
  { s: "ꕤ───────────────ꕤ", n: "Flower ends" },
  { s: "⊱────────────────⊱", n: "Ornament line" },
  { s: "〰〰〰〰〰〰〰〰〰〰", n: "Wavy" },
  { s: "·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩͙˚̩̥̩̥*̩̩͙·͙", n: "Crystal" },
];

export default function BlogInstagramLines() {
  return (
    <>
      <CopyToast />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>{" "}›{" "}
          <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none" }}>Blog</Link>
        </div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          How to Make a Line in Your Instagram Bio
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
          Instagram does not have a built-in line or divider feature for bios, but you can use Unicode line characters that work perfectly. Here are the best lines to use — click any to copy it, then paste it straight into your bio.
        </p>

        <section style={{ marginBottom: 40 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Copy & Paste Bio Lines</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lines.map(({ s, n }) => (
              <BioLineItem key={n} s={s} n={n} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How to Add It to Your Instagram Bio</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: "1", text: "Click any line above to copy it to your clipboard." },
              { step: "2", text: "Open the Instagram app and go to your profile." },
              { step: "3", text: "Tap Edit profile then tap the Bio field." },
              { step: "4", text: "Long-press in the bio field and tap Paste to insert the line." },
              { step: "5", text: "Position the line between sections of your bio, then tap Save." },
            ].map(({ step, text }) => (
              <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ minWidth: 28, height: 28, borderRadius: "50%", background: "var(--accent)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{step}</span>
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0, paddingTop: 4 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>Pro Tips</h2>
          <ul style={{ paddingLeft: 20 }}>
            {[
              "Instagram bios allow up to 150 characters — a line character uses only a few, so you can add several.",
              "Shorter lines look better on mobile since Instagram bio text wraps. Test how it looks on your phone.",
              "Combine lines with emoji for extra style — e.g. star four point star dash dash dash dash star four point star",
              "The thin horizontal line is the most popular because it looks clean on all devices.",
            ].map(tip => <li key={tip} style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 }}>{tip}</li>)}
          </ul>
        </section>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/borders" className="cat-pill">All Borders and Dividers</Link>
          <Link href="/bio-templates" className="cat-pill">Bio Templates</Link>
          <Link href="/symbols-for/instagram" className="cat-pill">Instagram Symbols</Link>
        </div>
      </div>
    </>
  );
}
