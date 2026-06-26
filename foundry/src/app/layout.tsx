import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Style Foundry Workbench',
  description: '가재 블로그 디자인 시스템 워크벤치',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
