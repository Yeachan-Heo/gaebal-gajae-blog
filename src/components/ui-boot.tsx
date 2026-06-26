"use client";

import { useEffect } from 'react';

type UiMap = Record<string, Record<string, string>>;

const supportedLangs = ['ko', 'en', 'zh', 'ja'] as const;
const supportedThemes = ['blue-crab', 'red-claw'] as const;
const themeAliases: Record<string, (typeof supportedThemes)[number]> = { light: 'blue-crab', dark: 'red-claw' };
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
  if (!value) return null;
  if (supportedThemes.includes(value as (typeof supportedThemes)[number])) return value as (typeof supportedThemes)[number];
  return themeAliases[value] ?? null;
}

function themeColorScheme(theme: (typeof supportedThemes)[number]) {
  return 'dark';
}

export function UiBoot({ ui, navMatch }: { ui: UiMap; navMatch: string }) {
  useEffect(() => {
    const initialLang = () => {
      const qs = normalizeLang(new URLSearchParams(window.location.search).get('lang'));
      if (qs) return qs;
      const docLang = normalizeLang(document.documentElement.lang);
      if (docLang) return docLang;
      const saved = normalizeLang(window.localStorage.getItem('gajae-blog-lang'));
      if (saved) return saved;
      return 'ko';
    };

    const initialTheme = () => {
      const docTheme = normalizeTheme(document.documentElement.dataset.theme);
      if (docTheme) return docTheme;
      const saved = normalizeTheme(window.localStorage.getItem('gajae-blog-theme'));
      if (saved) return saved;
      return 'blue-crab';
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

    const updateThemeControl = (lang: string, theme: string) => {
      const toggle = document.querySelector<HTMLElement>('[data-theme-toggle]');
      if (!toggle) return;
      const nextTheme = theme === 'red-claw' ? 'blue-crab' : 'red-claw';
      const key = nextTheme === 'red-claw' ? toggle.getAttribute('data-theme-label-red-claw') : toggle.getAttribute('data-theme-label-blue-crab');
      const label = (key && ui[key]?.[lang]) || (key && ui[key]?.ko) || 'Toggle theme';
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
      toggle.setAttribute('aria-pressed', theme === 'blue-crab' ? 'true' : 'false');
      toggle.dataset.themeCurrent = theme;
    };

    const applyTheme = (theme?: string | null) => {
      const nextTheme = normalizeTheme(theme) || normalizeTheme(document.documentElement.dataset.theme) || initialTheme();
      if (!nextTheme) return;
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = themeColorScheme(nextTheme);
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
      const langButton = target?.closest<HTMLElement>('[data-lang-button]');
      if (langButton) {
        applyLang(langButton.getAttribute('data-lang-button'));
        return;
      }
      const themeToggle = target?.closest<HTMLElement>('[data-theme-toggle]');
      if (themeToggle) {
        const current = normalizeTheme(document.documentElement.dataset.theme || initialTheme()) || 'blue-crab';
        applyTheme(current === 'red-claw' ? 'blue-crab' : 'red-claw');
      }
    };

    document.addEventListener('click', onClick);
    applyTheme(initialTheme());
    applyLang(initialLang());
    syncNavState();

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [navMatch, ui]);

  return null;
}
