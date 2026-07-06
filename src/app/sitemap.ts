import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

type PublicInsight = {
  slug?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
};

export const revalidate = 3600;

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: absoluteUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/services"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: absoluteUrl("/industries"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/insights"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: absoluteUrl("/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/privacy-policy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: absoluteUrl("/terms-of-use"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

function dateOrNow(value?: string) {
  if (!value) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

async function getPublishedInsights(): Promise<PublicInsight[]> {
  try {
    const response = await fetch(absoluteUrl("/api/insights"), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const json = await response.json();
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.insights)) return json.insights;
    return [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await getPublishedInsights();

  const insightRoutes: MetadataRoute.Sitemap = insights
    .filter((insight) => Boolean(insight.slug))
    .map((insight) => ({
      url: absoluteUrl(`/insights/${insight.slug}`),
      lastModified: dateOrNow(insight.updatedAt || insight.publishedAt || insight.createdAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...insightRoutes];
}
