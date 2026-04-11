import TextArtClient from "./TextArtClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Art — Copy & Paste ASCII Art",
  description: "Copy and paste ASCII text art. Animals, objects, symbols and more — all made from text characters. Works anywhere.",
  keywords: ["text art","ascii art","copy paste art","text symbols art","unicode art"],
};

export default function TextArtPage() {
  return (
    <>
      <CopyToast />
      <TextArtClient />
    </>
  );
}
