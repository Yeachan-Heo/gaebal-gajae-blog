import { getRssXml } from '@/lib/site-data.mjs';

export function GET() {
  return new Response(getRssXml(), {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
    },
  });
}
