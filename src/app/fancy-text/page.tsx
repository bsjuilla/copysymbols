import FancyTextClient from "./FancyTextClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Fancy Text Generator — Copy & Paste Stylish Text",
  description: "Generate fancy text for Instagram, TikTok, Twitter, Discord and more. Convert normal text to bold, italic, cursive, bubble, strikethrough and 20+ styles. One click to copy.",
  keywords: ["fancy text generator","stylish text","cursive text generator","bold text copy paste","instagram fonts","discord fonts","fancy letters"],
  ...canonical("/fancy-text"),
};

export default function FancyTextPage() {
  return (
    <>
      <CopyToast />
      <FancyTextClient />
    </>
  );
}
