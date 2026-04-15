import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import EmojoCombosClient from "./EmojiCombosClient";

export const metadata: Metadata = {
  title: "Emoji Combinations Copy & Paste 🌙✨ 💀🔥 — Popular Emoji Combos",
  description: "Copy and paste popular emoji combinations. 🌙✨ 💀🔥 🫶🏽✨ 🎧🖤 and hundreds more. Browse by mood and vibe. Click any combo to copy instantly.",
  keywords: ["emoji combinations copy paste","emoji combos","popular emoji combos","aesthetic emoji combos","emoji combo list"],
};

export default function EmojiCombosPage() {
  return (<><CopyToast /><EmojoCombosClient /></>);
}
