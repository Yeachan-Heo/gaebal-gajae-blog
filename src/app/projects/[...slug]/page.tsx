import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/page-shell';
import { pageMetadata } from '@/lib/metadata';
import { getProjectPageData, getProjectSlugs } from '@/lib/site-data.mjs';

function normalizeSlug(parts: string[] | undefined) {
  if (!parts?.length) return null;
  if (parts.length !== 1) return null;
  const [raw] = parts;
  return raw.endsWith('.html') ? raw.slice(0, -5) : raw;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug: [`${slug}.html`] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const slug = normalizeSlug(slugParts);
  const page = slug ? getProjectPageData(slug) : null;
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugParts } = await params;
  const slug = normalizeSlug(slugParts);
  if (!slug) notFound();
  const page = getProjectPageData(slug);
  if (!page) notFound();
  return <PageShell navMatch={page.navMatch} bodyHtml={page.bodyHtml} />;
}
