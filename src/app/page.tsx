import type { Metadata } from 'next';
import { HomeView } from '@/components/blog-ui';
import { getHomePageData } from '@/lib/site-data.mjs';
import { pageMetadata } from '@/lib/metadata';

const page = getHomePageData();

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function HomePage() {
  return <HomeView />;
}
