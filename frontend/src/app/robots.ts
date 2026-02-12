import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/ocr'],
        disallow: ['/login', '/register']
      }
    ],
    sitemap: 'https://creator-ocr.com/sitemap.xml'
  };
}
