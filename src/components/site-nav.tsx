"use client";

import { useId, useState } from 'react';
import { SiteIcon } from '@/components/site-icons';

const lanes = [
  { href: '/daily-reflection/', navMatch: 'daily-reflection', label: 'Daily' },
  { href: '/setup-tip/', navMatch: 'setup-tip', label: 'Tips' },
  { href: '/behind-the-gajae/', navMatch: 'behind-the-gajae', label: 'Behind' },
];

const langs = ['ko', 'en', 'zh', 'ja'] as const;

type NavLink = {
  href: string;
  navMatch: string;
  label: string;
  i18n?: string;
};

const navLinks: NavLink[] = [
  ...lanes,
  { href: '/projects/', navMatch: 'projects', label: '프로젝트', i18n: 'projects' },
  { href: '/archive', navMatch: 'archive', label: '아카이브', i18n: 'archive' },
];

function BrandLink() {
  return (
    <a className="nav-brand" href="/" data-nav-match="home" aria-label="gaebal-gajae home">
      <span aria-hidden="true">🦞</span>
      <strong>gaebal-gajae</strong>
    </a>
  );
}

function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-toggle
      data-theme-label-dark="switchToDarkTheme"
      data-theme-label-light="switchToLightTheme"
      aria-label="다크 모드로 전환"
      title="다크 모드로 전환"
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
    </button>
  );
}

function LangMenu() {
  return (
    <details className="lang-menu">
      <summary aria-label="Language">
        <span data-lang-current>KO</span>
        <span className="lang-menu-chevrons">
          <SiteIcon name="chevronDown" className="lang-menu-chevron lang-menu-chevron-down" size={14} />
          <SiteIcon name="chevronUp" className="lang-menu-chevron lang-menu-chevron-up" size={14} />
        </span>
      </summary>
      <div className="lang-menu-panel" role="group" aria-label="Language">
        {langs.map((lang) => (
          <button type="button" data-lang-button={lang} key={lang}>
            <span className="lang-option-label">{lang.toUpperCase()}</span>
            <SiteIcon name="check" className="lang-option-check" size={16} strokeWidth={2.4} />
          </button>
        ))}
      </div>
    </details>
  );
}

function NavLinks({ className = 'nav-links' }: { className?: string }) {
  return (
    <div className={className}>
      {navLinks.map((link) => (
        <a href={link.href} data-nav-match={link.navMatch} data-i18n={link.i18n} key={link.navMatch}>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  return (
    <nav className="topnav responsive-nav">
      <div className="nav-mode nav-mode-desktop">
        <BrandLink />
        <NavLinks />
        <div className="theme-controls nav-tools">
          <ThemeToggle />
          <LangMenu />
        </div>
      </div>

      <div className="nav-mode nav-mode-mobile">
        <div className="mobile-nav-bar">
          <BrandLink />
          <button
            type="button"
            className={mobileOpen ? 'mobile-nav-toggle active' : 'mobile-nav-toggle'}
            data-mobile-nav-toggle
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span>Menu</span>
          </button>
        </div>
        <div className="mobile-nav-panel" id={panelId} data-mobile-nav-panel hidden={!mobileOpen}>
          <NavLinks className="mobile-nav-links" />
          <div className="mobile-nav-actions">
            <div className="mobile-nav-action-row">
              <span>Theme</span>
              <ThemeToggle />
            </div>
            <div className="mobile-nav-action-row">
              <span>Language</span>
              <LangMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
