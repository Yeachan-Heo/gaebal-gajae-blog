import type { Meta, StoryObj } from '@storybook/nextjs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { NavigationActions, NavigationBar, NavigationButton, NavigationGroup, NavigationIconButton, NavigationLink, NavigationList } from '@/components/ui/navigation'
import { ReadingMeta } from '@/components/ui/reading-meta'
import { SectionHeader } from '@/components/ui/section-header'
import { Separator } from '@/components/ui/separator'
import { LocalizedText, textFor } from '@/components/ui/text'

const utilityText = {
  breadcrumbHome: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  breadcrumbLane: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  navHome: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  navReflection: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  navTip: { ko: '셋업 팁', en: 'Setup Tip', zh: '设置技巧', ja: 'セットアップのコツ' },
  langKo: { ko: '한국어', en: 'Korean', zh: '韩文', ja: '韓国語' },
  langEn: { ko: '영어', en: 'English', zh: '英文', ja: '英語' },
  separatorBlog: { ko: '블로그', en: 'Blog', zh: '博客', ja: 'ブログ' },
  separatorDocs: { ko: '문서', en: 'Docs', zh: '文档', ja: 'ドキュメント' },
  separatorSource: { ko: '소스', en: 'Source', zh: '源码', ja: 'ソース' },
  themeToggle: { ko: '테마 전환', en: 'Toggle theme', zh: '切换主题', ja: 'テーマ切替' },
} as const
const meta = {
  title: 'Primitives/Utility',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Utility primitives connect the base visual system to repeated blog-specific UI chores: metadata rows, section headers, breadcrumb trails, and navigation shells.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ReadingMetaDefault: Story = {
  render: () => <ReadingMeta parts={['2026-06-24', { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' }, { ko: '공개 작업 로그', en: 'Public work log', zh: '公开工作日志', ja: '公開作業ログ' }]} />,
}

export const ReadingMetaEvidence: Story = {
  render: () => <ReadingMeta tone="evidence" parts={['PASS', { ko: '검증 완료', en: 'Verified receipt', zh: '验证完成', ja: '検証完了' }]} />,
}

export const HeaderWithEyebrow: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-[var(--rule)] bg-[var(--surface-soft)] p-6 md:p-8">
      <SectionHeader
        eyebrow={{ ko: '패턴 검토', en: 'Pattern review', zh: '模式审查', ja: 'パターンレビュー' }}
        title={{ ko: '세 가지 읽는 모드', en: 'Three ways to read', zh: '三种阅读方式', ja: '3つの読み方' }}
        description={{ ko: '하루 기록, 바로 쓰는 처방, 작업 철학을 섞지 않고 분리합니다.', en: 'Daily records, reusable fixes, and philosophy stay separated on purpose.', zh: '每日记录、可复用修复与工作哲学会被有意分开，不混在一起。', ja: '日々の記録、再利用できる修正、作業哲学を意図的に分けて混ぜません。' }}
        actionHref="#"
        actionLabel={{ ko: '전체 보기', en: 'Browse all', zh: '查看全部', ja: 'すべて見る' }}
      />
    </div>
  ),
}

export const BreadcrumbTrail: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"><LocalizedText map={utilityText.breadcrumbHome} /></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/daily-reflection/"><LocalizedText map={utilityText.breadcrumbLane} /></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>2026-06-21 KST</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const NavigationShell: Story = {
  render: () => (
    <NavigationBar className="static">
      <NavigationList>
        <NavigationLink href="#" active><LocalizedText map={utilityText.navHome} /></NavigationLink>
        <NavigationLink href="#"><LocalizedText map={utilityText.navReflection} /></NavigationLink>
        <NavigationLink href="#"><LocalizedText map={utilityText.navTip} /></NavigationLink>
      </NavigationList>
      <NavigationActions>
        <NavigationIconButton aria-label={textFor(utilityText.themeToggle)} title={textFor(utilityText.themeToggle)}>◐</NavigationIconButton>
        <NavigationGroup>
          <NavigationButton active><LocalizedText map={utilityText.langKo} /></NavigationButton>
          <NavigationButton><LocalizedText map={utilityText.langEn} /></NavigationButton>
        </NavigationGroup>
      </NavigationActions>
    </NavigationBar>
  ),
}

export const Separators: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-sm text-[var(--ink-soft)]">
      <div className="flex items-center gap-3">
        <span><LocalizedText map={utilityText.separatorBlog} /></span>
        <Separator orientation="vertical" />
        <span><LocalizedText map={utilityText.separatorDocs} /></span>
        <Separator orientation="vertical" />
        <span><LocalizedText map={utilityText.separatorSource} /></span>
      </div>
      <Separator />
      <LocalizedText map={{ ko: '구분선도 primitive로 관리하면 페이지마다 border 규칙이 흔들리지 않습니다.', en: 'A shared separator keeps page borders from drifting.', zh: '把分隔线也作为 primitive 管理后，各页面的边框规则就不会漂移。', ja: '区切り線も primitive として管理すると、ページごとの border ルールがぶれません。' }} />
    </div>
  ),
}
