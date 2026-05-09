import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import StrikeClient from "./StrikeClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Strikethrough Text Generator — S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ Copy & Paste",
  description: "Generate strikethrough text online. Type your text and get the Unicode strikethrough, underline and overline versions instantly. Copy and paste anywhere.",
  keywords: ["strikethrough text generator","strikethrough copy paste","s̶t̶r̶i̶k̶e̶ text","underline text generator","crossed out text copy paste"],
  ...canonical("/strikethrough-text"),
};

export default function StrikethroughPage() {
  return (<><CopyToast /><StrikeClient /></>);
}
