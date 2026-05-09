import TextRepeaterClient from "./TextRepeaterClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Text Repeater — Repeat Any Text Multiple Times",
  description: "Repeat any text, word, symbol or emoji multiple times instantly. Choose how many times to repeat and what separator to use. One click to copy.",
  keywords: ["text repeater","repeat text","word repeater","symbol repeater","emoji repeater","copy paste repeat"],
  ...canonical("/text-repeater"),
};

export default function TextRepeaterPage() {
  return (
    <>
      <CopyToast />
      <TextRepeaterClient />
    </>
  );
}
