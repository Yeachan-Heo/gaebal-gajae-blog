"use client";

import { useEffect } from 'react';

type UiMap = Record<string, Record<string, string>>;

const supportedLangs = ['ko', 'en', 'zh', 'ja'] as const;
const supportedThemes = ['light', 'dark'] as const;
const aliases: Record<string, string> = { 'zh-cn': 'zh', 'zh-tw': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh', 'ja-jp': 'ja', 'ko-kr': 'ko', 'en-us': 'en', 'en-gb': 'en' };

function normalizeLang(raw: string | null | undefined) {
  const value = String(raw || '').toLowerCase();
  if (!value) return null;
  if (aliases[value]) return aliases[value];
  const base = value.split('-')[0];
  return supportedLangs.includes(base as (typeof supportedLangs)[number]) ? base : null;
}

function normalizeTheme(raw: string | null | undefined) {
  const value = String(raw || '').toLowerCase();
  return supportedThemes.includes(value as (typeof supportedThemes)[number]) ? value as (typeof supportedThemes)[number] : null;
}

export function UiBoot({ ui, navMatch }: { ui: UiMap; navMatch: string }) {
  useEffect(() => {
    const initialLang = () => {
      const qs = normalizeLang(new URLSearchParams(window.location.search).get('lang'));
      if (qs) return qs;
      const saved = normalizeLang(window.localStorage.getItem('gajae-blog-lang'));
      if (saved) return saved;
      const docLang = normalizeLang(document.documentElement.lang);
      return docLang || 'ko';
    };

    const initialTheme = () => {
      const docTheme = normalizeTheme(document.documentElement.dataset.theme);
      if (docTheme) return docTheme;
      const saved = normalizeTheme(window.localStorage.getItem('gajae-blog-theme'));
      return saved || 'light';
    };

    const syncLangUrl = (lang: string) => {
      const url = new URL(window.location.href);
      if (!url.searchParams.has('lang')) return;
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    };

    const syncNavState = () => {
      document.querySelectorAll<HTMLElement>('[data-nav-match]').forEach((link) => {
        const active = link.getAttribute('data-nav-match') === navMatch;
        link.classList.toggle('active', active);
        link.setAttribute('aria-current', active ? 'page' : 'false');
      });
    };

    const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
    const mobileToggle = document.querySelector<HTMLElement>('[data-mobile-nav-toggle]');
    const setMobileNav = (open: boolean) => {
      if (!mobileNav || !mobileToggle) return;
      mobileNav.hidden = !open;
      mobileNav.dataset.open = open ? 'true' : 'false';
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    const closeMobileNav = () => setMobileNav(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobileNav();
    };
    const onResize = () => {
      if (window.innerWidth >= 761) closeMobileNav();
    };

    const updateThemeControl = (lang: string, theme: string) => {
      document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((toggle) => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const key = nextTheme === 'dark' ? toggle.getAttribute('data-theme-label-dark') : toggle.getAttribute('data-theme-label-light');
        const label = (key && ui[key]?.[lang]) || (key && ui[key]?.ko) || 'Toggle theme';
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
        toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        toggle.dataset.themeCurrent = theme;
      });
    };

    const applyTheme = (theme?: string | null) => {
      const nextTheme = normalizeTheme(theme) || normalizeTheme(document.documentElement.dataset.theme) || initialTheme();
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      if (document.body) document.body.style.colorScheme = nextTheme;
      window.localStorage.setItem('gajae-blog-theme', nextTheme);
      document.cookie = `gajae-blog-theme=${nextTheme}; Max-Age=31536000; Path=/; SameSite=Lax`;
      updateThemeControl(document.documentElement.lang || initialLang(), nextTheme);
    };

    const applyLang = (lang?: string | null) => {
      const nextLang = normalizeLang(lang) || document.documentElement.lang || 'ko';
      document.documentElement.lang = nextLang;
      document.querySelectorAll<HTMLElement>('[data-i18n-text]').forEach((el) => {
        const raw = el.getAttribute('data-i18n-text');
        if (!raw) return;
        try {
          const map = JSON.parse(raw);
          el.textContent = map[nextLang] || map.ko || map.en || '';
        } catch {}
      });
      document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria-label');
        const label = key && ui[key]?.[nextLang];
        if (label) {
          el.setAttribute('aria-label', label);
          el.setAttribute('title', label);
        }
      });
      document.querySelectorAll<HTMLElement>('[data-lang-block]').forEach((el) => {
        el.hidden = el.getAttribute('data-lang-block') !== nextLang;
      });
      document.querySelectorAll<HTMLElement>('[data-lang-button]').forEach((btn) => {
        const active = btn.getAttribute('data-lang-button') === nextLang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      window.localStorage.setItem('gajae-blog-lang', nextLang);
      syncLangUrl(nextLang);
      syncNavState();
      updateThemeControl(nextLang, document.documentElement.dataset.theme || initialTheme());
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const mobileToggle = target?.closest<HTMLElement>('[data-mobile-nav-toggle]');
      if (mobileToggle) {
        setMobileNav(mobileNav?.dataset.open !== 'true');
        return;
      }
      const mobileLink = target?.closest<HTMLElement>('[data-mobile-nav] a');
      if (mobileLink) closeMobileNav();
      const langButton = target?.closest<HTMLElement>('[data-lang-button]');
      if (langButton) {
        applyLang(langButton.getAttribute('data-lang-button'));
        return;
      }
      const themeToggle = target?.closest<HTMLElement>('[data-theme-toggle]');
      if (themeToggle) {
        const current = normalizeTheme(document.documentElement.dataset.theme || initialTheme()) || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    setMobileNav(false);
    applyTheme(initialTheme());
    applyLang(initialLang());
    syncNavState();

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [navMatch, ui]);

  return null;
}
