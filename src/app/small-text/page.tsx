import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import SmallTextClient from "./SmallTextClient";

export const metadata: Metadata = {
  title: "Small Text Generator — ˢᵐᵃˡˡ ᵗᵉˣᵗ Copy & Paste",
  description: "Convert text to small text, tiny text and superscript. ˢᵐᵃˡˡ ᵗᵉˣᵗ copy and paste. Works on Instagram bio, TikTok, Twitter, Discord. Free online tool.",
  keywords: ["small text generator","tiny text copy paste","superscript text generator","small letters copy paste","ˢᵐᵃˡˡ ᵗᵉˣᵗ"],
};

export default function SmallTextPage() {
  return (<><CopyToast /><SmallTextClient /></>);
}
