import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import StarsClient from "./StarsClient";

export const metadata: Metadata = {
  title: "Star Symbol ★ Copy & Paste — 100+ Stars ☆ ✦ ⭐ 🌟",
  description: "Click any star symbol to copy it instantly. ★ ☆ ✦ ✧ ⭐ 🌟 💫 ✨ — filled stars, outline stars, sparkle stars, gold stars. Free, no sign-up, works everywhere.",
  keywords: ["star symbol copy paste","star emoji copy","★ copy","star text symbol","five star copy paste","gold star symbol","star copy paste instagram"],
};

export default function StarsPage() {
  return (<><CopyToast /><StarsClient /></>);
}
