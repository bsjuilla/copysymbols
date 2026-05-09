import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import CommunityClient from "./CommunityClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Symbol Forge — Community Creations Hub",
  description: "Discover, create and share emoji, symbols and text art made by the community. Like, comment and copy creations from creators worldwide.",
  keywords: ["community symbols","user created emoji","symbol community","create emoji online","text art community"],
  // Community page is currently empty (0 creations). Excluded from sitemap to
  // avoid "Crawled — currently not indexed" noise; canonical here in case
  // Google discovers it via internal links so it doesn't fall back to "/".
  ...canonical("/community"),
  robots: { index: false, follow: true },
};

export default function CommunityPage() {
  return (
    <>
      <CopyToast />
      <CommunityClient />
    </>
  );
}
