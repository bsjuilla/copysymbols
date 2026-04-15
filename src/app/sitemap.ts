import { MetadataRoute } from "next";
import { categories, symbols } from "@/data/symbols";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://copychars.com";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/emoji`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/kaomoji`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/text-art`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/fancy-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/text-repeater`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    // Mega pages
    { url: `${base}/hearts`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/stars`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/borders`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/lenny-face`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/bullet-points`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/bio-templates`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/emoji-combos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    // Tools
    { url: `${base}/small-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/strikethrough-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/aesthetic-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/mirror-text`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbol-builder`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    // Platform pages
    { url: `${base}/symbols-for/instagram`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbols-for/discord`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbols-for/whatsapp`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbols-for/twitter`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbols-for/tiktok`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/symbols-for/facebook`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    // Blog
    { url: `${base}/blog/how-to-type-copyright`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/currency-symbols-list`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/trademark-vs-registered`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/greek-alphabet-list`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/blog/instagram-bio-lines`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const categoryPages = categories.map(cat => ({
    url: `${base}/symbols/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const symbolPages = symbols.map(s => ({
    url: `${base}/symbol/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...symbolPages];
}
