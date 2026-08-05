import type { ReactNode } from 'react'
import { LocalizedText, textFor } from '@/components/ui/text'
import { Muted } from '@/components/ui/typography'
import { NavigationActions, NavigationBar, NavigationButton, NavigationGroup, NavigationIconButton, NavigationLink, NavigationList } from '@/components/ui/navigation'
import { UiBoot } from '@/components/ui-boot'
import { getLaneByKey, langLabel, ui } from '@/lib/site-ui.mjs'

const navLinks = [
  { href: '/', key: 'home', label: ui.home },
  { href: '/daily-reflection/', key: 'daily-reflection', label: getLaneByKey('reflection')!.label },
  { href: '/setup-tip/', key: 'setup-tip', label: getLaneByKey('tip')!.label },
  { href: '/behind-the-gajae/', key: 'behind-the-gajae', label: getLaneByKey('behind')!.label },
  { href: '/projects/', key: 'projects', label: ui.projects },
  { href: '/archive.html', key: 'archive', label: ui.archive },
]

function NavLinks({ navMatch, className }: { navMatch: string; className?: string }) {
  return (
    <NavigationList className={className}>
      {navLinks.map((link) => (
        <NavigationLink key={link.key} href={link.href} data-nav-match={link.key} active={navMatch === link.key}>
          <LocalizedText map={link.label} />
        </NavigationLink>
      ))}
    </NavigationList>
  )
}

function NavActions() {
  return (
    <NavigationActions>
      <NavigationIconButton
        data-theme-toggle
        data-theme-label-dark="switchToDarkTheme"
        data-theme-label-light="switchToLightTheme"
        aria-label={textFor(ui.switchToDarkTheme)}
        title={textFor(ui.switchToDarkTheme)}
      >
        ◐
      </NavigationIconButton>
      <NavigationGroup>
        {(['ko', 'en', 'zh', 'ja'] as const).map((lang) => (
          <NavigationButton key={lang} data-lang-button={lang} active={lang === 'ko'}>
            {langLabel[lang]}
          </NavigationButton>
        ))}
      </NavigationGroup>
    </NavigationActions>
  )
}

function NavBar({ navMatch }: { navMatch: string }) {
  return (
    <NavigationBar>
      <div className="root-nav-desktop flex min-w-0 flex-1">
        <NavLinks navMatch={navMatch} />
      </div>
      <div className="root-nav-desktop">
        <NavActions />
      </div>
      <NavigationIconButton
        className="root-nav-mobile-toggle"
        data-mobile-nav-toggle
        data-i18n-aria-label="menu"
        aria-controls="root-mobile-nav"
        aria-expanded="false"
        aria-label={textFor(ui.menu)}
        title={textFor(ui.menu)}
      >
        ☰
      </NavigationIconButton>
      <div id="root-mobile-nav" className="root-nav-mobile-panel" data-mobile-nav data-open="false" hidden>
        <NavLinks navMatch={navMatch} />
        <NavActions />
      </div>
    </NavigationBar>
  )
}

function FooterBar() {
  return (
    <footer className="mx-auto mt-14 flex max-w-[1120px] flex-col gap-3 px-4 pb-10 md:flex-row md:items-center md:justify-between md:px-6">
      <Muted as="span"><LocalizedText map={ui.built} /></Muted>
      <div className="flex flex-wrap gap-4">
        <Muted as="a" href="/archive.html"><LocalizedText map={ui.footerArchive} /></Muted>
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
        <NavBar navMatch={navMatch} />
        {children}
      </main>
      <FooterBar />
    </>
  )
}
