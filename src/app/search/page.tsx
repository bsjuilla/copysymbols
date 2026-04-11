import SearchPageClient from "./SearchPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Symbols",
  description: "Search 3000+ special characters, symbols, emoji and kaomoji by name or keyword.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
