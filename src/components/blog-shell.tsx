import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

import { UiBoot } from '@/components/ui-boot'
import { ui } from '@/lib/site-ui.mjs'





export function SiteShell({ navMatch, children, articleJsonLd }: { navMatch: string; children: ReactNode; articleJsonLd?: string | null }) {
  return (
    <>
      <UiBoot ui={ui} navMatch={navMatch} />
      {articleJsonLd ? <div dangerouslySetInnerHTML={{ __html: articleJsonLd }} suppressHydrationWarning /> : null}
      <main className="wrap site-shell">
        <SiteNav />
        {children}
      </main>
      <SiteFooter ui={ui} />
    </>
  )
}
