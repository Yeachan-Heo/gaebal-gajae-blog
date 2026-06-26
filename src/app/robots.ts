import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/site-data.mjs';

export default function robots(): MetadataRoute.Robots {
  const site = getSite();
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
