import { LocalizedText } from '@/components/ui/text'

const notFoundTitle = { ko: '페이지를 찾지 못했습니다.', en: 'Page not found.', zh: '未找到页面。', ja: 'ページが見つかりません。' }
const notFoundBody = { ko: '요청한 페이지를 찾지 못했습니다.', en: 'The page you requested could not be found.', zh: '找不到你请求的页面。', ja: 'リクエストしたページが見つかりませんでした。' }

export default function NotFound() {
  return (
    <main className="wrap py-16">
      <h1 className="text-5xl font-black tracking-tight"><LocalizedText map={notFoundTitle} /></h1>
      <p className="mt-4 text-lg text-[var(--ink-soft)]"><LocalizedText map={notFoundBody} /></p>
    </main>
  )
}
