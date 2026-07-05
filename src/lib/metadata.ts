import type { Metadata } from 'next';

export function pageMetadata({ title, description }: { title: string; description: string }): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/assets/og/gaebal-gajae-blog-og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/og/gaebal-gajae-blog-og.png'],
    },
  };
}
