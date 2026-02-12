import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creator-ocr.com';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.8
    },
    {
      url: `${baseUrl}/ocr`,
      lastModified: new Date(),
      priority: 0.9
    }
  ];
}
