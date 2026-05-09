import type { Metadata } from "next";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Smiley Face Text Symbols ☺ ツ Copy & Paste",
  description: "Copy text smiley faces instantly. Classic :) emoticons, Unicode smileys ☺ ☻ ツ, and kawaii faces. Works everywhere — no emoji required.",
  ...canonical("/smiley-face-text"),
};

const unicodeSmileys = [
  { symbol: "☺", name: "White Smiling Face" },
  { symbol: "☻", name: "Black Smiling Face" },
  { symbol: "ツ", name: "Katakana Tu (smile)" },
  { symbol: "シ", name: "Katakana Si (grin)" },
  { symbol: "ϡ", name: "Coptic Letter Shima" },
  { symbol: "⌣", name: "Smile (arc)" },
  { symbol: "ʘ", name: "Bilabial Click" },
  { symbol: "ಠ", name: "Kannada Letter" },
  { symbol: "ω", name: "Omega (cute mouth)" },
  { symbol: "▽", name: "White Down Triangle" },
  { symbol: "◡", name: "Lower Half Circle" },
  { symbol: "益", name: "CJK Rage face" },
];

const classicFaces = [
  ":)", ":-)", ":D", ":-D", "xD", "=)", ":P", ";)", "T_T", ">_<", "*_*", "^_^", "^.^", ":o", "O_o",
];

export default function SmileyFaceTextPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Smiley Face Text ☺
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Classic text emoticons and Unicode smiley symbols. No emoji — just text characters that work everywhere.
      </p>
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Unicode Smileys</h2>
      <CopySymbolGrid items={unicodeSmileys} columns="repeat(auto-fill, minmax(140px, 1fr))" />
      <h2 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Classic Emoticons</h2>
      <CopySymbolGrid items={classicFaces.map(s => ({ symbol: s, name: s }))} columns="repeat(auto-fill, minmax(100px, 1fr))" />
    </div>
  );
}
