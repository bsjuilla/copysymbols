import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import LennyClient from "./LennyClient";

export const metadata: Metadata = {
  title: "Lenny Face ( ͡° ͜ʖ ͡°) Copy & Paste — 200+ Lenny Faces",
  description: "Copy and paste Lenny faces. ( ͡° ͜ʖ ͡°) ¯\\_(ツ)_/¯ (づ｡◕‿‿◕｡)づ and 200+ more. Click any Lenny face to copy instantly. All Lenny face variations.",
  keywords: ["lenny face copy paste","( ͡° ͜ʖ ͡°) copy","lenny face generator","text faces copy paste","donger copy paste"],
};

export default function LennyFacePage() {
  return (<><CopyToast /><LennyClient /></>);
}
