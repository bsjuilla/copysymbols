import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import AestheticClient from "./AestheticClient";

export const metadata: Metadata = {
  title: "Aesthetic Text Generator — ａｅｓｔｈｅｔｉｃ Copy & Paste",
  description: "Convert text to aesthetic styles. ａｅｓｔｈｅｔｉｃ wide text, s p a c e d text, and more. Copy and paste for Instagram, TikTok and Discord. Free online tool.",
  keywords: ["aesthetic text generator","vaporwave text","wide text copy paste","spaced text generator","ａｅｓｔｈｅｔｉｃ text"],
};

export default function AestheticPage() {
  return (<><CopyToast /><AestheticClient /></>);
}
