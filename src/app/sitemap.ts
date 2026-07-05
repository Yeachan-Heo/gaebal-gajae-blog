import type { MetadataRoute } from 'next';
import { absoluteUrl, getSitemapRoutes } from '@/lib/site-data.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapRoutes().map((route: string) => ({ url: absoluteUrl(route) }));
}
