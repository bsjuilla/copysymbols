import TextArtClient from "./TextArtClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Text Art — Copy & Paste ASCII Art",
  description: "Copy and paste ASCII and text art — animals, objects, hearts, borders and more, each one click to copy. Works in Discord, Instagram, messages and bios alike.",
  keywords: ["text art","ascii art","copy paste art","text symbols art","unicode art"],
  ...canonical("/text-art"),
};

export default function TextArtPage() {
  return (
    <>
      <CopyToast />
      <TextArtClient />
    </>
  );
}
