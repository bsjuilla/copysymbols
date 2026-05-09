import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import HeartsClient from "./HeartsClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Heart Symbol ❤ Copy & Paste — 100+ Hearts ♡ 💕 🖤 💜",
  description: "Click any heart to copy it instantly. ❤ ♡ 💕 💖 💗 💙 🖤 🤍 ❣ ❥ — red hearts, coloured hearts, outline hearts, text hearts. Works on Instagram, TikTok, WhatsApp.",
  keywords: ["heart symbol copy paste","heart emoji copy","❤ copy","love symbol","heart text symbol","black heart copy paste","pink heart symbol"],
  ...canonical("/hearts"),
};

export default function HeartsPage() {
  return (<><CopyToast /><HeartsClient /></>);
}
