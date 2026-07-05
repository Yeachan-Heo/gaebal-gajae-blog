import type { Metadata } from 'next';
import { LaneView } from '@/components/blog-ui';
import { pageMetadata } from '@/lib/metadata';
import { getLanePageData } from '@/lib/site-data.mjs';

const page = getLanePageData('reflection')!;

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function DailyReflectionPage() {
  return <LaneView laneKey="reflection" />;
}
