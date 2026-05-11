import { notFound } from "next/navigation";
import PlatformPageClient from "./PlatformPageClient";
import CopyToast from "@/components/CopyToast";
import { canonical } from "@/lib/canonical";
import type { Metadata } from "next";
import { platformIds, getPlatform } from "@/data/collections/platforms";

interface Props { params: Promise<{ platform: string }> }

export async function generateStaticParams(): Promise<Array<{ platform: string }>> {
  return platformIds.map(id => ({ platform: id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const p = getPlatform(platform);
  if (!p) return {};
  const symbolCount = p.categories.reduce((sum, c) => sum + c.symbols.length, 0);
  const title = `${symbolCount}+ Symbols for ${p.name} — Copy & Paste | CopyChars`;
  const description = `${p.tagline} ${symbolCount}+ symbols across ${p.categories.length} categories. Click any symbol to copy it instantly. ${p.bioLimit}-char ${p.name} bio limit covered.`;
  return {
    title,
    description,
    keywords: [
      `${p.name.toLowerCase()} symbols copy paste`,
      `${p.name.toLowerCase()} bio symbols`,
      `${p.name.toLowerCase()} aesthetic symbols`,
      `symbols for ${p.name.toLowerCase()}`,
      `${p.name.toLowerCase()} fonts copy paste`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.copychars.com/symbols-for/${platform}`,
      type: "article",
      siteName: "CopyChars",
    },
    twitter: { card: "summary", title, description },
    ...canonical(`/symbols-for/${platform}`),
  };
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const platformData = getPlatform(platform);
  if (!platformData) notFound();
  return (
    <>
      <CopyToast />
      <PlatformPageClient platform={platformData!} />
    </>
  );
}
