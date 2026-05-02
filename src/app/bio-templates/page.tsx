import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import BioClient from "./BioClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Aesthetic Bio Templates Copy & Paste — Instagram, TikTok, Discord",
  description: "Copy and paste aesthetic bio templates for Instagram, TikTok, Discord, Twitter. Ready-made bios with symbols, dividers and decorations. Click to copy instantly.",
  keywords: ["aesthetic bio copy paste","instagram bio template copy paste","discord bio copy paste","tiktok bio template","cute bio copy paste"],
  ...canonical("/bio-templates"),
};

export default function BioPage() {
  return (<><CopyToast /><BioClient /></>);
}
