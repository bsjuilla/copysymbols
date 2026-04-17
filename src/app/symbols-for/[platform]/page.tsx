import { notFound } from "next/navigation";
import PlatformPageClient from "./PlatformPageClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const platforms: Record<string, { name: string; description: string; emoji: string; color: string }> = {
  instagram: { name: "Instagram", description: "Cool symbols and special characters for your Instagram bio, captions and comments.", emoji: "📸", color: "#E1306C" },
  discord: { name: "Discord", description: "Unicode symbols, arrows and decorations for Discord usernames, server names and messages.", emoji: "🎮", color: "#5865F2" },
  whatsapp: { name: "WhatsApp", description: "Special characters and symbols that work perfectly in WhatsApp messages and status.", emoji: "💬", color: "#25D366" },
  twitter: { name: "Twitter / X", description: "Symbols and special characters for Twitter bios, tweets and usernames.", emoji: "🐦", color: "#1DA1F2" },
  tiktok: { name: "TikTok", description: "Trendy symbols and decorations for TikTok bios and comments.", emoji: "🎵", color: "#FF0050" },
  facebook: { name: "Facebook", description: "Special symbols for Facebook posts, comments and profile info.", emoji: "👤", color: "#1877F2" },
};

interface Props { params: Promise<{ platform: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const p = platforms[platform];
  if (!p) return {};
  return {
    title: "Symbols for " + p.name + " — Copy & Paste",
    description: p.description + " Click any symbol to copy instantly.",
  };
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const platformData = platforms[platform];
  if (!platformData) notFound();
  return (
    <>
      <CopyToast />
      <PlatformPageClient platform={platform} platformData={platformData} />
    </>
  );
}
