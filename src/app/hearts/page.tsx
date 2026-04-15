import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import HeartsClient from "./HeartsClient";

export const metadata: Metadata = {
  title: "Heart Symbol Copy & Paste ❤ ♡ 💕 — All Heart Symbols",
  description: "Copy and paste every heart symbol. ❤ ♡ 💕 💖 🖤 💜 💙 ❣ ❥ and 100+ more. Click any heart to copy it instantly. Works on Instagram, TikTok, WhatsApp.",
  keywords: ["heart symbol copy paste","heart emoji copy","❤ copy","love symbol copy paste","heart text symbol","all heart symbols"],
};

export default function HeartsPage() {
  return (<><CopyToast /><HeartsClient /></>);
}
