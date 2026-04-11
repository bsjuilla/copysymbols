import { notFound } from "next/navigation";
import PlatformPageClient from "./PlatformPageClient";
import CopyToast from "@/components/CopyToast";
import type { Metadata } from "next";

const platforms: Record<string, { name: string; description: string; emoji: string; color: string }> = {
  instagram: { name: "Instagram", description: "Cool symbols and special characters for your Instagram bio, captions and comments.", emoji: "📸", color: "#E1306C" },
  discord: { name: "Discord", description: "Unicode symbols, arrows and decorations for Discord usernames, server names and messages.", emoji: "🎮", color: "#5865F2" },
  whatsapp: { name: "WhatsApp", description: "Special characters and symbols that work perfectly in WhatsApp messages and status.", emoji: "💬", color: "#25D366" },
  twitter: { name: "Twitter / X", description: "Symbols and special characters for Twitter bios, tweets and usernames.", emoji: "🐦", color: "#1DA1F2" },
  tiktok: { name: "TikTok", description: "Trendy symbols and decorations for TikTok bios and comments.", emoji: "🎵", color: "#FF0050" },
  facebook: { name: "Facebook", description: "Special symbols for Facebook posts, comments and profile info.", emoji: "👤", color: "#1877F2" },
};

interface Props { params: { platform: string } }

export function generateStaticParams() {
  return Object.keys(platforms).map(p => ({ platform: p }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = platforms[params.platform];
  if (!p) return {};
  return {
    title: `Symbols for ${p.name} — Copy & Paste`,
    description: p.description + " Click any symbol to copy instantly.",
    keywords: [`symbols for ${params.platform}`, `${params.platform} symbols`, `${params.platform} bio symbols`, `copy paste ${params.platform}`],
  };
}

export default function PlatformPage({ params }: Props) {
  const platform = platforms[params.platform];
  if (!platform) notFound();
  return (
    <>
      <CopyToast />
      <PlatformPageClient platform={params.platform} platformData={platform} />
    </>
  );
}
