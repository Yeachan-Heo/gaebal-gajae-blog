import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

import { UiBoot } from '@/components/ui-boot'
import { ui } from '@/lib/site-ui.mjs'





function jsonLdPayload(markup?: string | null) {
  if (!markup) return null
  const match = markup.match(/<script[^>]*>([\s\S]*)<\/script>/i)
  return match?.[1] ?? markup
}

export function SiteShell({ navMatch, children, articleJsonLd }: { navMatch: string; children: ReactNode; articleJsonLd?: string | null }) {
  return (
    <>
      <UiBoot ui={ui} navMatch={navMatch} />
      {articleJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdPayload(articleJsonLd) || '' }} suppressHydrationWarning /> : null}
      <main className="wrap site-shell">
        <SiteNav />
        {children}
      </main>
      <SiteFooter ui={ui} />
    </>
  )
}
