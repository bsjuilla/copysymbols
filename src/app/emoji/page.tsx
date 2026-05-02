import EmojiPageClient from "./EmojiPageClient";
import CopyToast from "@/components/CopyToast";
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
      <EmojiPageClient />
    </>
  );
}
