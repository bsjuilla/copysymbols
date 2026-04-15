import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import StarsClient from "./StarsClient";

export const metadata: Metadata = {
  title: "Star Symbol Copy & Paste ★ ☆ ✦ ⭐ — All Star Symbols",
  description: "Copy and paste star symbols. ★ ☆ ✦ ✧ ✩ ⭐ 🌟 ⋆ 💫 and 80+ more. Click any star to copy instantly. Perfect for ratings, bios and decorations.",
  keywords: ["star symbol copy paste","star emoji copy","★ copy","star text symbol","five star copy paste","shooting star symbol"],
};

export default function StarsPage() {
  return (<><CopyToast /><StarsClient /></>);
}
