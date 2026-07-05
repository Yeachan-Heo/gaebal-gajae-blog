import { SiteNav } from '@/components/site-nav';
import { UiBoot } from '@/components/ui-boot';
import { footerHtml, ui } from '@/lib/site-data.mjs';


export function PageShell({ navMatch, bodyHtml, articleJsonLd }: { navMatch: string; bodyHtml: string; articleJsonLd?: string | null }) {
  return (
    <>
      <UiBoot ui={ui} navMatch={navMatch} />
      {articleJsonLd ? <div dangerouslySetInnerHTML={{ __html: articleJsonLd }} suppressHydrationWarning /> : null}
      <main className="wrap">
        <SiteNav />
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
      </main>
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} suppressHydrationWarning />
    </>
  );
}
