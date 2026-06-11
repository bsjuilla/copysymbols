import SearchPageClient from "./SearchPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Symbols",
  description: "Search over 3000 special characters, symbols, emoji and kaomoji by name or keyword. Click any result to copy it instantly — no app and no sign-up needed.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
