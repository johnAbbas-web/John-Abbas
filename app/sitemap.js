import { siteUrl } from "./lib/data";

// Single-page site: only the canonical root belongs here. Fragment URLs are
// ignored by search engines and just add noise to Search Console.
export default function sitemap() {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
