import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { UiBoot } from '@/components/ui-boot';
import { ui } from '@/lib/site-data.mjs';


export function PageShell({ navMatch, bodyHtml, articleJsonLd }: { navMatch: string; bodyHtml: string; articleJsonLd?: string | null }) {
  return (
    <>
      <UiBoot ui={ui} navMatch={navMatch} />
      {articleJsonLd ? <div dangerouslySetInnerHTML={{ __html: articleJsonLd }} suppressHydrationWarning /> : null}
      <main className="wrap site-shell">
        <SiteNav />
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
      </main>
      <SiteFooter ui={ui} />
    </>
  );
}
