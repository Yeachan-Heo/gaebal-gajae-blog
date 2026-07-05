import type { ReactNode } from 'react'
import { LocalizedText } from '@/components/ui/text'
import { Muted } from '@/components/ui/typography'
import { SiteNav } from '@/components/site-nav'

import { UiBoot } from '@/components/ui-boot'
import { ui } from '@/lib/site-ui.mjs'




function FooterBar() {
  return (
    <footer className="mx-auto mt-14 flex max-w-[1120px] flex-col gap-3 px-4 pb-10 md:flex-row md:items-center md:justify-between md:px-6">
      <Muted as="span"><LocalizedText map={ui.built} /></Muted>
      <div className="flex flex-wrap gap-4">
        <Muted as="a" href="/archive"><LocalizedText map={ui.footerArchive} /></Muted>
        <Muted as="a" href="/projects/"><LocalizedText map={ui.footerProjects} /></Muted>
        <Muted as="a" href="/rss.xml"><LocalizedText map={ui.footerFeed} /></Muted>
      </div>
    </footer>
  )
}

export function SiteShell({ navMatch, children, articleJsonLd }: { navMatch: string; children: ReactNode; articleJsonLd?: string | null }) {
  return (
    <>
      <UiBoot ui={ui} navMatch={navMatch} />
      {articleJsonLd ? <div dangerouslySetInnerHTML={{ __html: articleJsonLd }} suppressHydrationWarning /> : null}
      <main className="mx-auto max-w-[1120px] px-4 pb-16 pt-6 md:px-6 md:pb-24 md:pt-8">
        <SiteNav />
        {children}
      </main>
      <FooterBar />
    </>
  )
}
