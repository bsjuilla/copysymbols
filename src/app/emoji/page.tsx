import EmojiPageClient from "./EmojiPageClient";
import CopyToast from "@/components/CopyToast";
import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";
export const metadata: Metadata = {
  title: "Emoji — Copy & Paste All Emoji",
  description: "Browse and copy hundreds of emoji by category. Smileys, animals, food, travel, symbols — click any emoji to copy it instantly.",
  keywords: ["emoji copy paste","copy emoji","emoji list","all emoji","emoji keyboard"],
  ...canonical("/emoji"),
};

export default function EmojiPage() {
  return (
    <>
      <CopyToast />
      {/* Contextual link to the timely Unicode 17.0 page (keeps it off orphan
          status and passes equity from this high-traffic hub). */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link
          href="/new-emoji-2026"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 100, padding: "8px 16px", fontSize: 14, color: "var(--accent)", textDecoration: "none" }}
        >
          ✨ New: Unicode 17.0 emoji (2026) — copy the 8 newest emoji →
        </Link>
      </div>
      <EmojiPageClient />
    </>
  );
}
