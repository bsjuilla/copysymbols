import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import MirrorClient from "./MirrorClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Mirror Text Generator — Flip & Reverse Text Copy & Paste",
  description: "Flip your text upside down or reverse it. ʇxǝʇ pǝddᴉlɟ — type anything and get the mirrored Unicode version instantly. Copy and paste anywhere.",
  keywords: ["mirror text generator","flip text upside down","reverse text generator","upside down text copy paste","flipped text"],
  ...canonical("/mirror-text"),
};

export default function MirrorPage() {
  return (<><CopyToast /><MirrorClient /></>);
}
