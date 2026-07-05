import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';
import { getHomePageData } from '@/lib/site-data.mjs';
import { pageMetadata } from '@/lib/metadata';

const page = getHomePageData();

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function HomePage() {
  return <PageShell navMatch={page.navMatch} bodyHtml={page.bodyHtml} />;
}
