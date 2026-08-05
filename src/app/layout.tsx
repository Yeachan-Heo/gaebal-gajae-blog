import Script from 'next/script';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getSite } from '@/lib/site-data.mjs';
import './globals.css';

const supportedThemes = new Set(['light', 'dark']);
const themeAliases: Record<string, 'light' | 'dark'> = { light: 'light', dark: 'dark' };

function normalizeTheme(raw: string | null | undefined) {
  const value = String(raw || '').toLowerCase();
  if (supportedThemes.has(value)) return value as 'light' | 'dark';
  return themeAliases[value] ?? null;
}

function themeColorScheme(theme: 'light' | 'dark') {
  return theme === 'dark' ? 'dark' : 'light';
}

const themeBootScript = `(() => {
  const supportedThemes = new Set(["light", "dark"]);
  const normalizeTheme = (raw) => {
    const value = String(raw || "").toLowerCase();
    return supportedThemes.has(value) ? value : null;
  };
  const themeColorScheme = (theme) => (theme === "dark" ? "dark" : "light");
  const readCookieTheme = () => {
    const match = document.cookie.match(/(?:^|; )gajae-blog-theme=([^;]+)/);
    return normalizeTheme(match ? decodeURIComponent(match[1]) : null);
  };

  try {
    const saved = normalizeTheme(window.localStorage.getItem("gajae-blog-theme"));
    const cookieTheme = readCookieTheme();
    const theme = saved || cookieTheme || "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = themeColorScheme(theme);
    if (document.body) document.body.style.colorScheme = themeColorScheme(theme);
  } catch {
    const theme = readCookieTheme() || "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = themeColorScheme(theme);
    if (document.body) document.body.style.colorScheme = themeColorScheme(theme);
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
      <body style={{ colorScheme: themeColorScheme(theme) }}>{children}</body>
    </html>
  );
}
