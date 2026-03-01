import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tripadverts.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-01"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-03-01"),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-03-01"),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-03-01"),
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date("2026-03-01"),
    },
  ];
}
