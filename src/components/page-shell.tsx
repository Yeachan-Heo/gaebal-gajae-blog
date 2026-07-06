import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { UiBoot } from '@/components/ui-boot';
import { ui } from '@/lib/site-data.mjs';


function jsonLdPayload(markup?: string | null) {
  if (!markup) return null;
  const match = markup.match(/<script[^>]*>([\s\S]*)<\/script>/i);
  return match?.[1] ?? markup;
}

export function PageShell({ navMatch, bodyHtml, articleJsonLd }: { navMatch: string; bodyHtml: string; articleJsonLd?: string | null }) {
  return (
    <>
      <UiBoot ui={ui} navMatch={navMatch} />
      {articleJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdPayload(articleJsonLd) || '' }} suppressHydrationWarning /> : null}
      <main className="wrap site-shell">
        <SiteNav />
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
      </main>
      <SiteFooter ui={ui} />
    </>
  );
}
