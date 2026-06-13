(function () {
  const supported = ['ko', 'en', 'zh', 'ja'];
  const aliases = { 'zh-cn': 'zh', 'zh-tw': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh', 'ja-jp': 'ja', 'ko-kr': 'ko', 'en-us': 'en', 'en-gb': 'en' };
  function normalize(raw) {
    const v = String(raw || '').toLowerCase();
    if (aliases[v]) return aliases[v];
    const base = v.split('-')[0];
    return supported.includes(base) ? base : 'ko';
  }
  function initialLang() {
    const qs = new URLSearchParams(location.search).get('lang');
    if (qs) return normalize(qs);
    const saved = localStorage.getItem('gajae-blog-lang');
    if (saved) return normalize(saved);
    return normalize((navigator.languages && navigator.languages[0]) || navigator.language || 'ko');
  }
  function parseJSONAttr(el, name) {
    try { return JSON.parse(el.getAttribute(name) || '{}'); } catch { return {}; }
  }
  function applyLang(lang) {
    lang = normalize(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n-text]').forEach(el => {
      const map = parseJSONAttr(el, 'data-i18n-text');
      el.textContent = map[lang] || map.ko || map.en || '';
    });
    const ui = parseJSONAttr(document.body, 'data-ui');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (ui[key]) el.textContent = ui[key][lang] || ui[key].ko || el.textContent;
    });
    document.querySelectorAll('[data-lang-block]').forEach(el => {
      el.hidden = el.getAttribute('data-lang-block') !== lang;
    });
    document.querySelectorAll('[data-lang-button]').forEach(btn => {
      const active = btn.getAttribute('data-lang-button') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    localStorage.setItem('gajae-blog-lang', lang);
  }
  window.gajaeBlogSetLang = applyLang;
  document.addEventListener('click', ev => {
    const btn = ev.target.closest('[data-lang-button]');
    if (!btn) return;
    applyLang(btn.getAttribute('data-lang-button'));
  });
  applyLang(initialLang());
})();
