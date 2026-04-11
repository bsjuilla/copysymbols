import { kaomojiCategories, kaomoji } from "@/data/kaomoji";
import KaomojiPageClient from "./KaomojiPageClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaomoji — Copy & Paste Japanese Emoticons",
  description: "Browse and copy 80+ kaomoji (Japanese text emoticons). Happy, sad, angry, surprised, cute — click any kaomoji to copy it instantly.",
  keywords: ["kaomoji","japanese emoticons","text faces","copy paste kaomoji","(◕‿◕)","ascii art faces"],
};

export default function KaomojiPage() {
  return (
    <>
      <CopyToast />
      <KaomojiPageClient allKaomoji={kaomoji} categories={kaomojiCategories} />
    </>
  );
}
