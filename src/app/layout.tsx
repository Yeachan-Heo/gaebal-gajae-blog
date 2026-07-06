import Script from 'next/script';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getSite } from '@/lib/site-data.mjs';
import './globals.css';

const supportedThemes = new Set(['light', 'dark']);
const themeAliases: Record<string, 'light' | 'dark'> = { 'blue-crab': 'light', 'red-claw': 'dark' };

function normalizeTheme(raw: string | null | undefined) {
  const value = String(raw || '').toLowerCase();
  if (supportedThemes.has(value)) return value as 'light' | 'dark';
  return themeAliases[value] ?? null;
}

function themeColorScheme(theme: 'light' | 'dark') {
  return theme;
}

const themeBootScript = `(() => {
  const supportedThemes = new Set(["light", "dark"]);
  const themeAliases = { "blue-crab": "light", "red-claw": "dark" };
  const normalizeTheme = (raw) => {
    const value = String(raw || "").toLowerCase();
    if (supportedThemes.has(value)) return value;
    return themeAliases[value] || null;
  };
  const readCookieTheme = () => {
    const match = document.cookie.match(/(?:^|; )gajae-blog-theme=([^;]+)/);
    return normalizeTheme(match ? decodeURIComponent(match[1]) : null);
  };

  try {
    const saved = normalizeTheme(window.localStorage.getItem("gajae-blog-theme"));
    const cookieTheme = readCookieTheme();
    const theme = saved || cookieTheme || "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = readCookieTheme() || "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }
})();`;

const interactionBootScript = `(() => {
  const supportedThemes = new Set(["light", "dark"]);
  const supportedLangs = new Set(["ko", "en", "zh", "ja"]);
  const themeAliases = { "blue-crab": "light", "red-claw": "dark" };
  const langAliases = { "zh-cn": "zh", "zh-tw": "zh", "zh-hans": "zh", "zh-hant": "zh", "ja-jp": "ja", "ko-kr": "ko", "en-us": "en", "en-gb": "en" };
  const labels = {
    ko: { dark: "다크 모드로 전환", light: "라이트 모드로 전환" },
    en: { dark: "Switch to dark mode", light: "Switch to light mode" },
    zh: { dark: "切换到深色模式", light: "切换到浅色模式" },
    ja: { dark: "ダークモードに切り替え", light: "ライトモードに切り替え" },
  };
  const normalizeTheme = (raw) => {
    const value = String(raw || "").toLowerCase();
    if (supportedThemes.has(value)) return value;
    return themeAliases[value] || null;
  };
  const normalizeLang = (raw) => {
    const value = String(raw || "").toLowerCase();
    if (!value) return null;
    if (langAliases[value]) return langAliases[value];
    const base = value.split("-")[0];
    return supportedLangs.has(base) ? base : null;
  };
  const initialLang = () => {
    const qs = normalizeLang(new URLSearchParams(window.location.search).get("lang"));
    if (qs) return qs;
    try {
      const saved = normalizeLang(window.localStorage.getItem("gajae-blog-lang"));
      if (saved) return saved;
    } catch {}
    return normalizeLang(document.documentElement.lang) || "ko";
  };
  const currentLang = () => normalizeLang(document.documentElement.lang) || "ko";
  const parseMap = (el) => {
    try { return JSON.parse(el.getAttribute("data-i18n-text") || "{}"); } catch { return {}; }
  };
  const syncLangUrl = (lang) => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("lang")) return;
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
  };
  const updateThemeControls = (theme) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const label = labels[currentLang()][nextTheme];
    document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
      toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      toggle.dataset.themeCurrent = theme;
    });
  };
  const applyTheme = (raw) => {
    const theme = normalizeTheme(raw) || normalizeTheme(document.documentElement.dataset.theme) || "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("gajae-blog-theme", theme);
      document.cookie = "gajae-blog-theme=" + encodeURIComponent(theme) + "; Max-Age=31536000; Path=/; SameSite=Lax";
    } catch {}
    updateThemeControls(theme);
  };
  const applyLang = (raw) => {
    const lang = normalizeLang(raw) || currentLang();
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n-text]").forEach((el) => {
      const map = parseMap(el);
      el.textContent = map[lang] || map.ko || map.en || el.textContent || "";
    });
    document.querySelectorAll("[data-lang-block]").forEach((el) => {
      el.hidden = el.getAttribute("data-lang-block") !== lang;
    });
    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      const active = button.getAttribute("data-lang-button") === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelectorAll("[data-lang-current]").forEach((el) => {
      el.textContent = lang.toUpperCase();
    });
    try { window.localStorage.setItem("gajae-blog-lang", lang); } catch {}
    syncLangUrl(lang);
    updateThemeControls(normalizeTheme(document.documentElement.dataset.theme) || "light");
  };
  const setMobileNavOpen = (open) => {
    document.querySelectorAll("[data-mobile-nav-panel]").forEach((panel) => {
      panel.hidden = !open;
    });
    document.querySelectorAll("[data-mobile-nav-toggle]").forEach((toggle) => {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.classList.toggle("active", open);
    });
  };
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const langButton = target.closest("[data-lang-button]");
    if (langButton) {
      applyLang(langButton.getAttribute("data-lang-button"));
      document.querySelectorAll(".lang-menu[open]").forEach((menu) => { menu.open = false; });
      return;
    }
    const themeToggle = target.closest("[data-theme-toggle]");
    if (themeToggle) {
      const current = normalizeTheme(document.documentElement.dataset.theme) || "light";
      applyTheme(current === "dark" ? "light" : "dark");
      return;
    }
    const mobileToggle = target.closest("[data-mobile-nav-toggle]");
    if (mobileToggle) {
      setMobileNavOpen(mobileToggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    if (target.closest("[data-mobile-nav-panel] a")) setMobileNavOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileNavOpen(false);
  });
  const boot = () => {
    applyLang(initialLang());
    updateThemeControls(normalizeTheme(document.documentElement.dataset.theme) || "light");
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();`;

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title.ko,
    template: `%s`,
  },
  description: site.tagline.ko,
  openGraph: {
    type: 'website',
    title: site.title.ko,
    description: site.tagline.ko,
    images: ['/assets/og/gaebal-gajae-blog-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og/gaebal-gajae-blog-og.png'],
  },
  icons: {
    icon: '/assets/og/gaebal-gajae-blog-og.png',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const theme = normalizeTheme(cookieStore.get('gajae-blog-theme')?.value) || 'light';

  return (
    <html lang="ko" data-theme={theme} suppressHydrationWarning>
      <head>
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
      </head>
      <body style={{ colorScheme: themeColorScheme(theme) }}>
        <script id="interaction-boot" dangerouslySetInnerHTML={{ __html: interactionBootScript }} />
        {children}
      </body>
    </html>
  );
}
