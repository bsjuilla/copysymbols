import { MetadataRoute } from "next";
import { categories, symbols } from "@/data/symbols";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://copysymbols.com";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/symbols`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/emoji`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/kaomoji`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/text-art`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
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
