import type { Metadata } from "next";
import BioBuilderClient from "./BioBuilderClient";

export const metadata: Metadata = {
  title: "Bio Builder — Create Aesthetic Bios for Instagram, Discord & TikTok",
  description: "Build your perfect Instagram, Discord, or TikTok bio with symbols and dividers. Live phone preview. Copy your finished bio with one click. Free, no sign-up.",
  keywords: ["instagram bio builder","discord bio maker","aesthetic bio creator","bio with symbols","tiktok bio generator","bio template builder"],
  alternates: { canonical: "https://www.copychars.com/bio-builder" },
};

export default function BioBuilderPage() {
  return <BioBuilderClient />;
}
