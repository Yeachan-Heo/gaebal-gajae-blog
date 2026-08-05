import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Editorial Logbook Preview',
  description: '로컬 전용 가재 블로그 에디토리얼 로그북 디자인 시스템 프리뷰',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
