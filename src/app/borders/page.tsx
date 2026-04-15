import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import BordersClient from "./BordersClient";

export const metadata: Metadata = {
  title: "Aesthetic Borders & Dividers Copy & Paste — Lines for Discord, Bio & Text",
  description: "Copy and paste aesthetic borders, dividers and lines. ─────, ══════, ꒷꒦꒷, ┌──✦──┐ and hundreds more. Perfect for Discord, Instagram bio and text decoration.",
  keywords: ["aesthetic borders copy paste","dividers copy paste","discord dividers","text borders copy paste","line symbols copy paste","bio dividers"],
};

export default function BordersPage() {
  return (<><CopyToast /><BordersClient /></>);
}
