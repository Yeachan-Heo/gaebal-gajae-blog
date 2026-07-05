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
  const themeAliases = { "blue-crab": "light", "red-claw": "dark" };
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
  const currentLang = () => {
    const value = String(document.documentElement.lang || "ko").toLowerCase().split("-")[0];
    return labels[value] ? value : "ko";
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
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => updateThemeControls(normalizeTheme(document.documentElement.dataset.theme) || "light"), { once: true });
  } else {
    updateThemeControls(normalizeTheme(document.documentElement.dataset.theme) || "light");
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
