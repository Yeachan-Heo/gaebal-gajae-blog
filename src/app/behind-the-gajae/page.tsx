import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';
import { pageMetadata } from '@/lib/metadata';
import { getLanePageData } from '@/lib/site-data.mjs';

const page = getLanePageData('behind')!;

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function BehindPage() {
  return <PageShell navMatch={page.navMatch} bodyHtml={page.bodyHtml} />;
}
