import { kaomojiCategories, kaomoji } from "@/data/kaomoji";
import KaomojiPageClient from "./KaomojiPageClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Kaomoji ʕ•ᴥ•ʔ Copy & Paste — Japanese Text Emoticons",
  description: "Copy kaomoji instantly. ¯\\_(ツ)_/¯ (◕‿◕) ʕ•ᴥ•ʔ (╥_╥) — happy, sad, angry, cute, bear faces. 100+ Japanese text emoticons that work everywhere.",
  keywords: ["kaomoji copy paste","japanese emoticons","text faces copy paste","shrug emoticon","(◕‿◕) copy","cute kaomoji","kaomoji japanese"],
  ...canonical("/kaomoji"),
};

export default function KaomojiPage() {
  return (
    <>
      <CopyToast />
      <KaomojiPageClient allKaomoji={kaomoji} categories={kaomojiCategories} />
    </>
  );
}
