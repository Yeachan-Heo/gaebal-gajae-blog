import type { Metadata } from 'next';
import { ArchiveView } from '@/components/blog-patterns';
import { pageMetadata } from '@/lib/metadata';
import { getArchivePageData } from '@/lib/site-data.mjs';

const page = getArchivePageData();

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function ArchivePage() {
  return <ArchiveView />;
}
