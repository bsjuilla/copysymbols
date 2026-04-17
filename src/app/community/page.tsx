import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
  title: "Symbol Forge — Community Creations Hub",
  description: "Discover, create and share emoji, symbols and text art made by the community. Like, comment and copy creations from creators worldwide.",
  keywords: ["community symbols","user created emoji","symbol community","create emoji online","text art community"],
};

export default function CommunityPage() {
  return (
    <>
      <CopyToast />
      <CommunityClient />
    </>
  );
}
