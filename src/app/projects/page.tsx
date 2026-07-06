import type { Metadata } from 'next';
import { ProjectsView } from '@/components/blog-patterns';
import { pageMetadata } from '@/lib/metadata';
import { getProjectsPageData } from '@/lib/site-data.mjs';

const page = getProjectsPageData();

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.description });

export default function ProjectsPage() {
  return <ProjectsView />;
}
