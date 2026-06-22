(function () {
  const supportedLangs = ['ko', 'en', 'zh', 'ja'];
  const supportedThemes = ['dark', 'light'];
  const aliases = { 'zh-cn': 'zh', 'zh-tw': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh', 'ja-jp': 'ja', 'ko-kr': 'ko', 'en-us': 'en', 'en-gb': 'en' };

  function parseJSONAttr(el, name) {
    try {
      return JSON.parse(el.getAttribute(name) || '{}');
    } catch {
      return {};
    }
  }

  function normalizeLang(raw) {
    const value = String(raw || '').toLowerCase();
    if (aliases[value]) return aliases[value];
    const base = value.split('-')[0];
    return supportedLangs.includes(base) ? base : 'ko';
  }

  function normalizeTheme(raw) {
    const value = String(raw || '').toLowerCase();
    return supportedThemes.includes(value) ? value : 'dark';
  }

  function currentUi() {
    return parseJSONAttr(document.body, 'data-ui');
  }

  function initialLang() {
    const qs = new URLSearchParams(location.search).get('lang');
    if (qs) return normalizeLang(qs);
    const saved = localStorage.getItem('gajae-blog-lang');
    if (saved) return normalizeLang(saved);
    return normalizeLang((navigator.languages && navigator.languages[0]) || navigator.language || 'ko');
  }

  function initialTheme() {
    const saved = localStorage.getItem('gajae-blog-theme');
    if (saved) return normalizeTheme(saved);
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function syncLangUrl(lang) {
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState({}, '', url);
  }

  function currentNavMatch() {
    const { pathname, hash } = window.location;
    if (pathname === '/' || pathname === '/index.html') {
      if (hash === '#reflections') return 'reflections';
      if (hash === '#setup-tips') return 'tips';
      return 'home';
    }
    if (pathname.startsWith('/projects/')) return 'projects';
    if (pathname === '/archive.html' || pathname.startsWith('/posts/')) return 'archive';
    return 'home';
  }

  function syncNavState() {
    const current = currentNavMatch();
    document.querySelectorAll('[data-nav-match]').forEach((link) => {
      const active = link.getAttribute('data-nav-match') === current;
      link.classList.toggle('active', active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  function updateThemeControl(lang, theme) {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    const ui = currentUi();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const key = nextTheme === 'dark' ? toggle.getAttribute('data-theme-label-dark') : toggle.getAttribute('data-theme-label-light');
    const label = ui[key]?.[lang] || ui[key]?.ko || 'Toggle theme';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    toggle.dataset.themeCurrent = theme;
  }

  function applyTheme(theme) {
    const nextTheme = normalizeTheme(theme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('gajae-blog-theme', nextTheme);
    updateThemeControl(document.documentElement.lang || initialLang(), nextTheme);
  }

  function applyLang(lang) {
    const nextLang = normalizeLang(lang);
    document.documentElement.lang = nextLang;
    document.querySelectorAll('[data-i18n-text]').forEach((el) => {
      const map = parseJSONAttr(el, 'data-i18n-text');
      el.textContent = map[nextLang] || map.ko || map.en || '';
    });
    const ui = currentUi();
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (ui[key]) el.textContent = ui[key][nextLang] || ui[key].ko || el.textContent;
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (ui[key]) el.setAttribute('aria-label', ui[key][nextLang] || ui[key].ko || el.getAttribute('aria-label') || '');
    });
    document.querySelectorAll('[data-lang-block]').forEach((el) => {
      el.hidden = el.getAttribute('data-lang-block') !== nextLang;
    });
    document.querySelectorAll('[data-lang-button]').forEach((btn) => {
      const active = btn.getAttribute('data-lang-button') === nextLang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    localStorage.setItem('gajae-blog-lang', nextLang);
    syncLangUrl(nextLang);
    syncNavState();
    updateThemeControl(nextLang, document.documentElement.dataset.theme || initialTheme());
  }

  window.gajaeBlogSetLang = applyLang;
  window.gajaeBlogSetTheme = applyTheme;

  document.addEventListener('click', (event) => {
    const langButton = event.target.closest('[data-lang-button]');
    if (langButton) {
      applyLang(langButton.getAttribute('data-lang-button'));
      return;
    }
    const themeToggle = event.target.closest('[data-theme-toggle]');
    if (themeToggle) {
      const current = normalizeTheme(document.documentElement.dataset.theme || initialTheme());
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }
  });

  applyTheme(initialTheme());
  applyLang(initialLang());
  syncNavState();

  window.addEventListener('hashchange', syncNavState);
})();
