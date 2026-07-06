import type { Metadata } from 'next';
import { LaneView } from '@/components/blog-patterns';
import { pageMetadata } from '@/lib/metadata';
import { getLanePageData } from '@/lib/site-data.mjs';

const page = getLanePageData('behind')!;

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function BehindPage() {
  return <LaneView laneKey="behind" />;
}
