import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import BuilderClient from "./BuilderClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Symbol Builder — Build Custom Symbol Text & Names",
  description: "Build custom symbol text. Combine symbols with your name or text to create unique decorated phrases like ꧁✦ Your Name ✦꧂. Copy the result instantly.",
  keywords: ["symbol name generator","symbol text builder","decorated name copy paste","discord name symbols","aesthetic name builder"],
  ...canonical("/symbol-builder"),
};

export default function SymbolBuilderPage() {
  return (<><CopyToast /><BuilderClient /></>);
}
