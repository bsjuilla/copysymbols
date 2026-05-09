import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import SuperSubClient from "./SuperSubClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Superscript & Subscript Generator — ˣ² and X₂ copy paste",
  description: "Type any text and instantly convert it to superscript (ˣ², ʰᵉˡˡᵒ) or subscript (X₂, H₂O). One-click copy. Works on Instagram, TikTok, Discord, and anywhere Unicode is supported.",
  keywords: [
    "superscript generator",
    "subscript generator",
    "superscript text",
    "subscript text",
    "small text superscript",
    "x squared copy paste",
    "h2o subscript",
    "tiny letters above",
    "superscript numbers",
  ],
  ...canonical("/superscript-generator"),
};

export default function SuperscriptGeneratorPage() {
  return (
    <>
      <CopyToast />
      <SuperSubClient />
    </>
  );
}
