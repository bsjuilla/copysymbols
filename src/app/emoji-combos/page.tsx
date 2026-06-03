import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import EmojoCombosClient from "./EmojiCombosClient";
import Link from "next/link";
import { comboThemes } from "@/data/collections/emoji-combos";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Emoji Combinations Copy & Paste 🌙✨ 💀🔥 — Popular Emoji Combos",
  description: "Copy and paste popular emoji combinations. 🌙✨ 💀🔥 🫶🏽✨ 🎧🖤 and hundreds more. Browse by mood and vibe. Click any combo to copy instantly.",
  keywords: ["emoji combinations copy paste","emoji combos","popular emoji combos","aesthetic emoji combos","emoji combo list"],
  ...canonical("/emoji-combos"),
};

export default function EmojiCombosPage() {
  return (
    <>
      <CopyToast />
      {/* Inbound link to the community UGC page (hub -> spoke). */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link
          href="/community-combos"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 100, padding: "8px 16px", fontSize: 14, color: "var(--accent)", textDecoration: "none" }}
        >
          ✨ Community combos — browse &amp; submit your own →
        </Link>

        {/* Browse by theme — hub→spoke links to per-theme combo collection pages. */}
        <div className="section-label" style={{ margin: "22px 0 10px" }}>Browse combos by theme</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {comboThemes.map(t => (
            <Link key={t.id} href={`/emoji-combos/theme/${t.id.toLowerCase()}`} className="cat-pill" style={{ textDecoration: "none" }}>
              {t.name}
            </Link>
          ))}
        </div>
      </div>
      <EmojoCombosClient />
    </>
  );
}
