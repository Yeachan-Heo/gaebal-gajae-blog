import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { NavigationActions, NavigationBar, NavigationButton, NavigationGroup, NavigationIconButton, NavigationLink, NavigationList } from '@/components/ui/navigation'
import { ReadingMeta } from '@/components/ui/reading-meta'
import { SectionHeader } from '@/components/ui/section-header'
import { Separator } from '@/components/ui/separator'
import { Body, Display, Eyebrow, H1, H2, H3, H4, Lead, Meta, Prose, Small, Muted, Title } from '@/components/ui/typography'
import { LocalizedText, textFor, type LangMap } from '@/components/ui/text'
import { pageMetadata } from '@/lib/metadata'
import { SiteShell } from '@/components/blog-ui'
import { contractRows, previewCards, swatches, type Cell, variantRows } from '../../../foundry/src/lib/foundry-data'

export const metadata: Metadata = pageMetadata({
  title: 'Style Foundry Preview · 개발가재 블로그',
  description: '가재 블로그 디자인 시스템 미리보기',
})

const previewHeroText = {
  badge: { ko: '스타일 파운드리 프리뷰', en: 'Style Foundry Preview', zh: '样式工坊预览', ja: 'スタイルファウンドリープレビュー' },
  title: { ko: '가재 블로그 디자인 시스템 프리뷰', en: 'Gajae blog design system preview', zh: 'Gajae 博客设计系统预览', ja: 'ガジェブログのデザインシステムプレビュー' },
  lead: {
    ko: '페이지 평가 전에 foundation → typography → primitive → component → pattern 순서로 읽게 만드는 검토용 보드다.',
    en: 'A review board that reads foundation → typography → primitive → component → pattern before page taste judgments.',
    zh: '这是一个在评价页面之前先按 foundation → typography → primitive → component → pattern 顺序阅读的审查板。',
    ja: 'ページの好みを判断する前に foundation → typography → primitive → component → pattern の順で確認するレビュー用ボードです。',
  },
  reviewOrder: { ko: '검토 순서', en: 'Review order', zh: '检查顺序', ja: '確認順序' },
  typography: { ko: '타이포', en: 'Typography', zh: '字体', ja: 'タイポグラフィ' },
  primitives: { ko: 'primitives', en: 'Primitives', zh: '基础 primitive', ja: '基本 primitive' },
  patterns: { ko: 'patterns', en: 'Patterns', zh: '模式', ja: 'パターン' },
} as const
const previewSampleText = {
  primaryLg: { ko: '주요 버튼 lg', en: 'Primary lg', zh: '主要按钮 lg', ja: '主要ボタン lg' },
  secondaryMd: { ko: '보조 버튼 md', en: 'Secondary md', zh: '次要按钮 md', ja: '補助ボタン md' },
  subtleSm: { ko: '서브틀 버튼 sm', en: 'Subtle sm', zh: '细按钮 sm', ja: 'サブトルボタン sm' },
  lane: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  archive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  verifiedReceipt: { ko: '검증 영수증', en: 'Verified receipt', zh: '验证回执', ja: '検証レシート' },
} as const
const previewReviewText = {
  eyebrow: { ko: '권장 순서', en: 'Recommended order', zh: '推荐顺序', ja: '推奨順序' },
  foundationsLabel: { ko: 'Foundations', en: 'Foundations', zh: '基础层', ja: '基礎レイヤー' },
  typographyLabel: { ko: 'Typography', en: 'Typography', zh: '文字体系', ja: '文字体系' },
  primitivesLabel: { ko: 'Primitives', en: 'Primitives', zh: '基础 primitive', ja: '基本 primitive' },
  componentsLabel: { ko: 'Components', en: 'Components', zh: '组件', ja: 'コンポーネント' },
  patternsLabel: { ko: 'Patterns', en: 'Patterns', zh: '模式', ja: 'パターン' },
  rule1: { ko: '색, 간격, 그림자, radius가 역할별로 분리됐는지 본다.', en: 'Check whether color, spacing, shadow, and radius are separated by role.', zh: '先看颜色、间距、阴影、圆角是否按角色分离。', ja: '色、間隔、影、radius が役割ごとに分離されているかを見る。' },
  rule2: { ko: 'display / title / body / meta가 서로 다른 리듬으로 읽히는지 본다.', en: 'Check whether display, title, body, and meta read with different rhythms.', zh: '看 display / title / body / meta 是否带着不同节奏被阅读。', ja: 'display / title / body / meta が異なるリズムで読まれるかを見る。' },
  rule3: { ko: 'Card / Button / Badge 같은 generic UI가 도메인 이름 없이 서 있는지 본다.', en: 'Check whether generic UI such as Card, Button, and Badge stands on its own without domain naming.', zh: '看 Card / Button / Badge 这类通用 UI 是否能脱离领域名称独立成立。', ja: 'Card / Button / Badge のような generic UI がドメイン名なしでも立つかを見る。' },
  rule4: { ko: 'PostCard, ProjectCard가 primitive 조합으로만 만들어졌는지 본다.', en: 'Check whether PostCard and ProjectCard are built only from primitive composition.', zh: '看 PostCard 与 ProjectCard 是否只是 primitive 的组合。', ja: 'PostCard と ProjectCard が primitive の組み合わせだけで作られているかを見る。' },
  rule5: { ko: 'Hero, Archive, Detail이 카드 남발 없이 위계를 만드는지 본다.', en: 'Check whether Hero, Archive, and Detail create hierarchy without card overuse.', zh: '看 Hero、Archive、Detail 是否在不滥用卡片的情况下形成层级。', ja: 'Hero、Archive、Detail がカード乱用なしで階層を作れているかを見る。' },
  criteriaEyebrow: { ko: '판단 기준', en: 'Review criteria', zh: '判断标准', ja: '判断基準' },
  goodLabel: { ko: '좋은 상태:', en: 'Good state:', zh: '好的状态：', ja: '良い状態:' },
  goodBody: { ko: '페이지를 보기 전에도 token / type / primitive 계약이 설명된다.', en: 'The token, type, and primitive contracts are understandable before opening a page.', zh: '即使还没看页面，也能先解释清 token / type / primitive 契约。', ja: 'ページを見る前でも token / type / primitive 契約が説明できる。' },
  badLabel: { ko: '나쁜 상태:', en: 'Bad state:', zh: '坏的状态：', ja: '悪い状態:' },
  badBody: { ko: '페이지 하나 고친 뒤 나중에 공통점을 억지로 빼낸다.', en: 'You tweak one page first and only later force common rules out of it.', zh: '先改某一页，之后才勉强从中抽取共通规则。', ja: '1ページを先に直してから、あとで無理やり共通規則を抜き出す。' },
  note: { ko: 'preview에서 설명하지 못하는 규칙은 실제 페이지에 아직 반영하지 않는 게 원칙이다.', en: 'If a rule cannot be explained in preview, it should not yet land in production pages.', zh: '在 preview 里说不清的规则，就不该先落进正式页面。', ja: 'preview で説明できない規則は、まだ実ページへ入れないのが原則です。' },
} as const
const previewTypographyText = {
  eyebrow: { ko: 'semantic text primitives', en: 'Semantic text primitives', zh: '语义文本 primitive', ja: 'セマンティックな text primitive' },
  display: { ko: '실제로 읽히는 제목 위계', en: 'A title hierarchy that actually reads', zh: '真正能读进去的标题层级', ja: '実際に読みやすいタイトル階層' },
  lead: { ko: 'Lead는 summary나 intro에서만 쓰고, 본문 설명까지 전부 같은 강도로 키우지 않는다.', en: 'Use Lead for summaries or intros only; do not raise every explanatory sentence to the same intensity.', zh: 'Lead 只用于摘要和导语，不要把所有说明句都抬到同样强度。', ja: 'Lead は summary や intro だけに使い、本文説明まで同じ強さへ持ち上げない。' },
  h1: { ko: 'H1은 페이지 안의 주 선언이다', en: 'H1 is the page’s main declaration', zh: 'H1 是页面中的主声明', ja: 'H1 はページ内の主宣言です' },
  h2: { ko: 'H2는 큰 구간을 나눈다', en: 'H2 divides major sections', zh: 'H2 划分大区块', ja: 'H2 は大きな区切りを作る' },
  h3: { ko: 'H3는 세부 구간 제목이다', en: 'H3 is a sub-section heading', zh: 'H3 是细分区块标题', ja: 'H3 は細かな区切り見出しです' },
  h4: { ko: 'H4는 보조 제목이다', en: 'H4 is a supporting heading', zh: 'H4 是辅助标题', ja: 'H4 は補助見出しです' },
  body: { ko: 'Body는 문장을 운반하고, Meta는 증거와 위치를 조용히 붙인다. 긴 글은 prose 규칙이 따로 있어야 카드 데모처럼 보이지 않는다.', en: 'Body carries sentences, while Meta quietly attaches evidence and location. Longform needs its own prose rules so it does not look like a card demo.', zh: 'Body 运送句子，Meta 则安静地附着证据与位置。长文必须有独立的 prose 规则，才不会像卡片演示板。', ja: 'Body は文を運び、Meta は証拠と位置を静かに添える。長文はカードデモのように見えないよう、独自の prose 規則が必要です。' },
  meta: { ko: 'Meta · 2026-06-24 · 데일리 리플렉션', en: 'Meta · 2026-06-24 · Daily Reflection', zh: 'Meta · 2026-06-24 · 每日回顾', ja: 'Meta · 2026-06-24 · デイリーリフレクション' },
  proseEyebrow: { ko: 'prose rule', en: 'Prose rule', zh: 'prose 规则', ja: 'prose ルール' },
  proseTitle: { ko: '긴 글은 card보다 prose가 먼저다', en: 'Longform starts with prose before cards', zh: '长文先有 prose，再考虑卡片', ja: '長文は card より prose が先です' },
  proseBody: { ko: '사람 편집물처럼 읽히게 하려면 긴 문단은 기본 문서면에 두고, 요약이나 증거만 카드로 빼야 한다.', en: 'To read like edited work, long paragraphs belong on the base document surface while summaries and evidence are the parts that move into cards.', zh: '想让它像编辑过的内容一样可读，长段落应放在基础文档面上，只有摘要或证据才抽到卡片里。', ja: '編集された読み物のように読ませるには、長い段落は基本文書面に置き、要約や証拠だけをカードへ出す。' },
  proseList1: { ko: '본문 measure는 너무 넓지도, 너무 좁지도 않게 유지', en: 'Keep body measure neither too wide nor too narrow', zh: '让正文 measure 既不过宽也不过窄', ja: '本文 measure は広すぎず狭すぎず保つ' },
  proseList2: { ko: 'meta는 작은 톤으로 뒤로 물림', en: 'Let meta fall back in a smaller tone', zh: '让 meta 以更小的语气退到后方', ja: 'meta は小さなトーンで後ろへ下げる' },
  proseList3: { ko: '강조는 badge가 아니라 heading rhythm으로 먼저 해결', en: 'Solve emphasis with heading rhythm before reaching for badges', zh: '强调应先靠 heading 节奏，而不是先靠 badge', ja: '強調は badge より先に heading のリズムで解決する' },
} as const
const previewPrimitiveText = {
  eyebrow: { ko: '핵심 원칙', en: 'Core principle', zh: '核心原则', ja: '中核原則' },
  title: { ko: 'Card가 기본 UI primitive, 그 위에 역할 컴포넌트를 얹는다', en: 'Card is the base UI primitive, and role components sit on top of it', zh: 'Card 是基础 UI primitive，其上再叠加角色组件', ja: 'Card が基本 UI primitive で、その上に役割コンポーネントを載せる' },
  liveEyebrow: { ko: '실물 확인', en: 'Live review', zh: '实物确认', ja: '実物確認' },
  liveTitle: { ko: 'primitive는 여기서 실제 상태를 같이 본다', en: 'Review primitive states together here', zh: '在这里一起看 primitive 的实际状态', ja: 'primitive の実際の状態をここで一緒に見る' },
  meta: { ko: 'Meta · 2026-06-24 · Primitive review', en: 'Meta · 2026-06-24 · Primitive review', zh: 'Meta · 2026-06-24 · primitive 审查', ja: 'Meta · 2026-06-24 · primitive レビュー' },
  cardTitle: { ko: 'sm 카드 간격', en: 'sm card spacing', zh: 'sm 卡片间距', ja: 'sm カード間隔' },
  cardBody: { ko: '기본 primitive는 variant와 size만으로 상태를 설명할 수 있어야 한다.', en: 'Base primitives should explain their state through variant and size alone.', zh: '基础 primitive 应该仅靠 variant 与 size 就能说明状态。', ja: '基本 primitive は variant と size だけで状態を説明できるべきです。' },
  tableEyebrow: { ko: '계약표', en: 'Contract table', zh: '契约表', ja: '契約表' },
} as const
const previewUtilityText = {
  navEyebrow: { ko: 'navigation shell', en: 'Navigation shell', zh: '导航外壳', ja: 'ナビゲーションシェル' },
  navHome: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  navReflection: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  navArchive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  langKo: { ko: '한국어', en: 'Korean', zh: '韩文', ja: '韓国語' },
  langEn: { ko: '영어', en: 'English', zh: '英文', ja: '英語' },
  navNote: { ko: 'navigation은 페이지마다 다른 클래스 조합이 아니라 primitive 집합으로 반복돼야 한다.', en: 'Navigation should repeat as a primitive set instead of a different class mix on every page.', zh: 'navigation 不该在每个页面都重新拼类名，而应该重复使用同一组 primitive。', ja: 'navigation はページごとに別クラスを組むのではなく、同じ primitive セットとして繰り返されるべきです。' },
  quietEyebrow: { ko: 'quiet utility text', en: 'Quiet utility text', zh: '安静的 utility 文本', ja: '静かな utility テキスト' },
  breadcrumbHome: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  breadcrumbLane: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  quietNote: { ko: 'LocalizedText가 실제 언어 전환을 맡고, Small / Label / Muted는 톤과 위계를 맡는다.', en: 'LocalizedText handles the actual language switch, while Small / Label / Muted handle tone and hierarchy.', zh: 'LocalizedText 负责真正的语言切换，Small / Label / Muted 负责语气与层级。', ja: 'LocalizedText が実際の言語切替を担い、Small / Label / Muted はトーンと階層を担う。' },
} as const
const previewComponentText = {
  noteLabel: { ko: '허용 차이:', en: 'Allowed difference:', zh: '允许差异：', ja: '許容差分:' },
  themeToggle: { ko: '테마 전환', en: 'Toggle theme', zh: '切换主题', ja: 'テーマ切替' },
} as const
const previewTableText = {
  layer: { ko: '레이어', en: 'Layer', zh: '层级', ja: 'レイヤー' },
  canonicalName: { ko: '정식 이름', en: 'Canonical name', zh: '正式名称', ja: '正式名' },
  filePath: { ko: '파일 위치', en: 'File path', zh: '文件位置', ja: 'ファイル位置' },
  contract: { ko: '계약', en: 'Contract', zh: '契约', ja: '契約' },
  shape: { ko: '형태', en: 'Shape', zh: '形态', ja: '形' },
  meaning: { ko: '의미', en: 'Meaning', zh: '意义', ja: '意味' },
  variant: { ko: 'variant', en: 'Variant', zh: 'variant', ja: 'variant' },
  when: { ko: '언제', en: 'When', zh: '何时', ja: 'いつ' },
  readingMode: { ko: '읽히는 방식', en: 'Reading mode', zh: '阅读方式', ja: '読まれ方' },
  pattern: { ko: 'pattern', en: 'Pattern', zh: 'pattern', ja: 'pattern' },
  baseSurface: { ko: '기본 면', en: 'Base surface', zh: '基础表面', ja: '基本面' },
  remainingCard: { ko: '카드가 남아야 하는 곳', en: 'Where cards should remain', zh: '卡片应保留的位置', ja: 'カードが残るべき場所' },
  primitive: { ko: 'Primitive', en: 'Primitive', zh: '基础 primitive', ja: '基本 primitive' },
  component: { ko: 'Component', en: 'Component', zh: '组件', ja: 'コンポーネント' },
  shell: { ko: 'Shell', en: 'Shell', zh: '外壳', ja: 'シェル' },
  patternRow: { ko: 'Pattern', en: 'Pattern', zh: '模式', ja: 'パターン' },
  homeHero: { ko: 'Home hero', en: 'Home hero', zh: '首页 hero', ja: 'ホーム hero' },
  archiveList: { ko: 'Archive list', en: 'Archive list', zh: '归档列表', ja: 'アーカイブ一覧' },
  postDetail: { ko: 'Post detail', en: 'Post detail', zh: '文章详情', ja: '記事詳細' },
  projectDetail: { ko: 'Project detail', en: 'Project detail', zh: '项目详情', ja: 'プロジェクト詳細' },
  plainEditorial: { ko: 'plain editorial section', en: 'plain editorial section', zh: '普通编辑区块', ja: '素の編集セクション' },
  plainHeadingList: { ko: 'plain heading + list rhythm', en: 'plain heading + list rhythm', zh: '普通标题 + 列表节奏', ja: '素の見出し + リストのリズム' },
  plainProse: { ko: 'plain prose column', en: 'plain prose column', zh: '普通 prose 列', ja: '素の prose カラム' },
  plainTitleProse: { ko: 'plain title + prose', en: 'plain title + prose', zh: '普通标题 + prose', ja: '素のタイトル + prose' },
  featuredEvidence: { ko: 'featured entry, project evidence', en: 'featured entry, project evidence', zh: '代表条目 + 项目证据', ja: '注目記事 + プロジェクト証拠' },
  postRowsOnly: { ko: 'individual post rows only', en: 'individual post rows only', zh: '仅文章行', ja: '記事行のみ' },
  evidencePanelOnly: { ko: 'right-side evidence panel only', en: 'right-side evidence panel only', zh: '仅右侧证据面板', ja: '右側の証拠パネルのみ' },
  previewMediaOnly: { ko: 'project preview/media only', en: 'project preview/media only', zh: '仅项目预览 / 媒体', ja: 'プロジェクト preview / media のみ' },
} as const
function cellText(cell: Cell) {
  return typeof cell === 'string' ? cell : <LocalizedText map={cell as LangMap} />
}
function DataTable({ headers, rows }: { headers: Cell[]; rows: Array<[Cell, Cell, Cell]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[36rem] w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={typeof header === 'string' ? header : Object.values(header)[0]} scope="col" className="border-b border-[var(--rule)] pb-2 text-left text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
                {cellText(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c], index) => (
            <tr key={typeof a === 'string' ? a : `${index}-${Object.values(a)[0]}`}>
              <th scope="row" className="border-b border-[var(--rule)] py-3 pr-4 text-left align-top text-[var(--ink-strong)]">{cellText(a)}</th>
              <td className="border-b border-[var(--rule)] py-3 align-top text-[var(--ink-soft)]">{cellText(b)}</td>
              <td className="border-b border-[var(--rule)] py-3 align-top text-[var(--ink-soft)]">{cellText(c)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function StyleFoundryPreviewPage() {
  return (
    <SiteShell navMatch="home">
      <section className="mt-8 space-y-6 rounded-[28px] border border-[var(--rule)] bg-[var(--surface)] px-6 py-8 shadow-[var(--shadow)] md:px-8 md:py-10">
        <Badge variant="lane"><LocalizedText map={previewHeroText.badge} /></Badge>
        <Display className="max-w-4xl"><LocalizedText map={previewHeroText.title} /></Display>
        <Lead className="max-w-3xl"><LocalizedText map={previewHeroText.lead} /></Lead>
        <div className="flex flex-wrap gap-3">
          <Button href="#review-order" variant="secondary"><LocalizedText map={previewHeroText.reviewOrder} /></Button>
          <Button href="#typography" variant="secondary"><LocalizedText map={previewHeroText.typography} /></Button>
          <Button href="#primitives" variant="secondary"><LocalizedText map={previewHeroText.primitives} /></Button>
          <Button href="#patterns" variant="secondary"><LocalizedText map={previewHeroText.patterns} /></Button>
        </div>
      </section>

      <section className="mt-12 space-y-6" id="review-order">
        <SectionHeader title={{ ko: 'Review order', en: 'Review order', zh: 'Review order', ja: 'Review order' }} description={{ ko: '디자인 시스템을 파악할 때는 페이지부터 보지 않고, 계층을 위에서 아래로 읽는다.', en: 'Do not start from pages. Read the system from abstract layers down to composed views.', zh: '不要从页面开始，先从抽象层往下读。', ja: 'ページから見ずに、抽象レイヤーから下へ読みます。' }} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="p-5">
            <Eyebrow><LocalizedText map={previewReviewText.eyebrow} /></Eyebrow>
            <ol className="mt-3 grid gap-3 pl-5 text-[var(--ink-soft)]">
              <li><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.foundationsLabel} /></strong> — <LocalizedText map={previewReviewText.rule1} /></li>
              <li><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.typographyLabel} /></strong> — <LocalizedText map={previewReviewText.rule2} /></li>
              <li><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.primitivesLabel} /></strong> — <LocalizedText map={previewReviewText.rule3} /></li>
              <li><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.componentsLabel} /></strong> — <LocalizedText map={previewReviewText.rule4} /></li>
              <li><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.patternsLabel} /></strong> — <LocalizedText map={previewReviewText.rule5} /></li>
            </ol>
          </Card>
          <Card className="p-5">
            <Eyebrow><LocalizedText map={previewReviewText.criteriaEyebrow} /></Eyebrow>
            <div className="mt-3 space-y-4">
              <Body><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.goodLabel} /></strong> <LocalizedText map={previewReviewText.goodBody} /></Body>
              <Body><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewReviewText.badLabel} /></strong> <LocalizedText map={previewReviewText.badBody} /></Body>
              <Meta><LocalizedText map={previewReviewText.note} /></Meta>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 space-y-6" id="foundations">
        <SectionHeader title={{ ko: 'Foundations / tokens', en: 'Foundations / tokens', zh: 'Foundations / tokens', ja: 'Foundations / tokens' }} description={{ ko: '색은 장식이 아니라 역할이다. paper는 기본 면, graphite는 증거 면, accent는 semantic signal일 때만 쓴다.', en: 'Color stays semantic: paper for default reading, graphite for proof, accent only for explicit signals.', zh: '颜色按语义分工：paper 为默认阅读面，graphite 为证据层，accent 只用于明确信号。', ja: '色は役割で使い分けます。paper は通常面、graphite は証拠面、accent は明示的なシグナルだけです。' }} />
        <div className="grid gap-4 md:grid-cols-2">
          {swatches.map((swatch) => (
            <Card key={swatch.token} className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 p-4">
              <div className="h-16 rounded-2xl border border-[var(--rule)]" style={{ background: `var(--${swatch.token})` }} />
              <div className="space-y-1">
                <strong className="text-[var(--ink-strong)]">{swatch.token}</strong>
                <code className="block text-sm text-[var(--ink-soft)]">{`var(--${swatch.token})`}</code>
                <p className="text-sm leading-6 text-[var(--ink-soft)]">{cellText(swatch.description)}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6" id="typography">
        <SectionHeader title={{ ko: 'Typography contract', en: 'Typography contract', zh: 'Typography contract', ja: 'Typography contract' }} description={{ ko: 'AI틱함을 줄이려면 카드보다 먼저 텍스트 위계가 정리돼야 한다. display, title, body, meta는 같은 톤으로 말하면 안 된다.', en: 'To avoid AI-flatness, text hierarchy must be explicit before any card styling.', zh: '要减少 AI 式平铺感，必须先明确文字层级。', ja: 'AIっぽい平坦さを減らすには、まず文字階層を明確にします。' }} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <Card className="space-y-5 p-6">
            <Eyebrow><LocalizedText map={previewTypographyText.eyebrow} /></Eyebrow>
            <Display as="h2" className="text-5xl md:text-6xl"><LocalizedText map={previewTypographyText.display} /></Display>
            <Lead><LocalizedText map={previewTypographyText.lead} /></Lead>
            <H1><LocalizedText map={previewTypographyText.h1} /></H1>
            <H2><LocalizedText map={previewTypographyText.h2} /></H2>
            <H3><LocalizedText map={previewTypographyText.h3} /></H3>
            <H4><LocalizedText map={previewTypographyText.h4} /></H4>
            <Body><LocalizedText map={previewTypographyText.body} /></Body>
            <Meta><LocalizedText map={previewTypographyText.meta} /></Meta>
          </Card>
          <Card className="p-6">
            <Eyebrow><LocalizedText map={previewTypographyText.proseEyebrow} /></Eyebrow>
            <Prose className="mt-4 max-w-[66ch]">
              <div className="content-block">
                <H2><LocalizedText map={previewTypographyText.proseTitle} /></H2>
                <LocalizedText as="p" map={previewTypographyText.proseBody} />
                <ul>
                  <LocalizedText as="li" map={previewTypographyText.proseList1} />
                  <LocalizedText as="li" map={previewTypographyText.proseList2} />
                  <LocalizedText as="li" map={previewTypographyText.proseList3} />
                </ul>
              </div>
            </Prose>
          </Card>
        </div>
      </section>

      <section className="mt-12 space-y-6" id="primitives">
        <SectionHeader title={{ ko: 'Primitive contract', en: 'Primitive contract', zh: 'Primitive contract', ja: 'Primitive contract' }} description={{ ko: 'shadcn/ui처럼 가장 자주 재사용되는 generic UI는 src/components/ui/* 에 둔다.', en: 'Generic reusable UI lives under src/components/ui/*, following the shadcn-style split.', zh: '最常复用的通用 UI 放在 src/components/ui/* 下。', ja: '最も再利用される汎用 UI は src/components/ui/* に置きます。' }} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Card className="space-y-4 p-5">
            <Eyebrow><LocalizedText map={previewPrimitiveText.eyebrow} /></Eyebrow>
            <Title as="h2" variant="section"><LocalizedText map={previewPrimitiveText.title} /></Title>
            <ol className="grid gap-3 pl-5 text-[var(--ink-soft)]">
              <li><strong className="text-[var(--ink-strong)]">ui/Card</strong> — variant: default / strong / evidence, size: sm / md</li>
              <li><strong className="text-[var(--ink-strong)]">ui/Button</strong> — variant: primary / secondary / subtle, size: sm / md / lg</li>
              <li><strong className="text-[var(--ink-strong)]">ui/Badge</strong> — variant: lane / neutral / verified, size: sm / md</li>
              <li><strong className="text-[var(--ink-strong)]">ui/Typography</strong> — Display / H1 / H2 / H3 / H4 / Lead / Body / Meta / Label / Small / Muted / Prose</li>
              <li><strong className="text-[var(--ink-strong)]">ui/Utility</strong> — ReadingMeta / SectionHeader / Navigation / Breadcrumb / Separator / Markdown</li>
            </ol>
          </Card>
          <Card className="p-5">
            <Eyebrow><LocalizedText map={previewPrimitiveText.liveEyebrow} /></Eyebrow>
            <Title as="h2" variant="section" className="mb-4"><LocalizedText map={previewPrimitiveText.liveTitle} /></Title>
            <div className="grid gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button href="#" variant="primary" size="lg"><LocalizedText map={previewSampleText.primaryLg} /></Button>
                <Button href="#" variant="secondary" size="md"><LocalizedText map={previewSampleText.secondaryMd} /></Button>
                <Button href="#" variant="subtle" size="sm"><LocalizedText map={previewSampleText.subtleSm} /></Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="lane" size="md"><LocalizedText map={previewSampleText.lane} /></Badge>
                <Badge variant="neutral" size="sm"><LocalizedText map={previewSampleText.archive} /></Badge>
                <Badge variant="verified" size="md"><LocalizedText map={previewSampleText.verifiedReceipt} /></Badge>
              </div>
              <Card size="sm" className="max-w-xl">
                <div className="space-y-3 p-[var(--card-spacing)]">
                  <Meta><LocalizedText map={previewPrimitiveText.meta} /></Meta>
                  <Title as="h3" variant="card"><LocalizedText map={previewPrimitiveText.cardTitle} /></Title>
                  <Body><LocalizedText map={previewPrimitiveText.cardBody} /></Body>
                </div>
              </Card>
            </div>
            <div className="space-y-3 border-t border-[var(--rule)] pt-4">
              <Eyebrow><LocalizedText map={previewPrimitiveText.tableEyebrow} /></Eyebrow>
              <DataTable headers={[previewTableText.layer, previewTableText.canonicalName, previewTableText.filePath]} rows={[
                [previewTableText.primitive, 'Card / Button / Badge / Typography / ReadingMeta / SectionHeader / Markdown / LocalizedText', 'src/components/ui/*'],
                [previewTableText.component, 'PostCard / LaneCard / ProjectCard / ProofSignalList', 'src/components/blog-cards.tsx'],
                [previewTableText.shell, 'NavBar / FooterBar / SiteShell', 'src/components/blog-shell.tsx'],
                [previewTableText.patternRow, 'HomeView / ArchiveView / PostView / ProjectView', 'src/components/blog-patterns.tsx'],
              ]} />
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 space-y-6" id="utility">
        <SectionHeader title={{ ko: 'Utility primitives', en: 'Utility primitives', zh: 'Utility primitives', ja: 'Utility primitives' }} description={{ ko: 'Label / Small / Muted가 실제로 붙는 곳과, navigation / breadcrumb / separator처럼 반복되는 조립 도구를 같이 본다.', en: 'Review where Label, Small, and Muted land in practice, along with repeated utility primitives such as navigation, breadcrumb, and separator.', zh: '一起检查 Label / Small / Muted 的实际落点，以及 navigation / breadcrumb / separator 这类高频工具 primitive。', ja: 'Label / Small / Muted の実際の使い所と、navigation / breadcrumb / separator のような反復ユーティリティ primitive を確認します。' }} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <Card className="space-y-4 p-5">
            <Eyebrow><LocalizedText map={previewUtilityText.navEyebrow} /></Eyebrow>
            <NavigationBar className="static">
              <NavigationList>
                <NavigationLink href="#" active><LocalizedText map={previewUtilityText.navHome} /></NavigationLink>
                <NavigationLink href="#"><LocalizedText map={previewUtilityText.navReflection} /></NavigationLink>
                <NavigationLink href="#"><LocalizedText map={previewUtilityText.navArchive} /></NavigationLink>
              </NavigationList>
              <NavigationActions>
                <NavigationIconButton aria-label={textFor(previewComponentText.themeToggle)} title={textFor(previewComponentText.themeToggle)}>◐</NavigationIconButton>
                <NavigationGroup>
                  <NavigationButton active><LocalizedText map={previewUtilityText.langKo} /></NavigationButton>
                  <NavigationButton><LocalizedText map={previewUtilityText.langEn} /></NavigationButton>
                </NavigationGroup>
              </NavigationActions>
            </NavigationBar>
            <Muted><LocalizedText map={previewUtilityText.navNote} /></Muted>
          </Card>
          <Card className="space-y-4 p-5">
            <Eyebrow><LocalizedText map={previewUtilityText.quietEyebrow} /></Eyebrow>
            <ReadingMeta parts={['2026-06-24', { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' }, { ko: '공개 작업 로그', en: 'Public work log', zh: '公开工作日志', ja: '公開作業ログ' }]} />
            <Separator />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/"><LocalizedText map={previewUtilityText.breadcrumbHome} /></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/daily-reflection/"><LocalizedText map={previewUtilityText.breadcrumbLane} /></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>2026-06-21 KST</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Small><LocalizedText map={previewUtilityText.quietNote} /></Small>
          </Card>
        </div>
      </section>
      <section className="mt-12 space-y-6" id="components">
        <SectionHeader title={{ ko: 'Component contract', en: 'Component contract', zh: 'Component contract', ja: 'Component contract' }} description={{ ko: '컴포넌트는 콘텐츠 taxonomy를 새 primitive처럼 만들지 않고, 기존 Card 체계의 허용 차이 안에서만 분기한다.', en: 'Components stay inside the allowed Card system instead of inventing a new primitive per content lane.', zh: '组件不为每种内容发明新 primitive，而是在既有 Card 体系内分化。', ja: 'コンポーネントはレーンごとに新 primitive を作らず、既存 Card システム内で差分を作ります。' }} />
        <Card className="p-4">
          <DataTable headers={[previewTableText.contract, previewTableText.shape, previewTableText.meaning]} rows={contractRows} />
        </Card>
        <Card className="p-4">
          <DataTable headers={[previewTableText.variant, previewTableText.when, previewTableText.readingMode]} rows={variantRows} />
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          {previewCards.map((card) => (
            <Card key={card.label} variant={card.variant === 'evidence' || card.variant === 'reference' ? 'evidence' : card.variant === 'lead' ? 'strong' : 'default'} className="space-y-4 p-5">
              <Eyebrow>{card.label}</Eyebrow>
              <Title as="h3" variant="lead">{cellText(card.title)}</Title>
              <Body className="font-semibold text-[var(--ink-strong)]">{cellText(card.role)}</Body>
              {card.bullets ? <ul className="grid gap-2 pl-5 text-[var(--ink-soft)]">{card.bullets.map((item, index) => <li key={typeof item === 'string' ? item : `${card.label}-${index}`}>{cellText(item)}</li>)}</ul> : null}
              {card.legend ? <div className="flex flex-wrap gap-2">{card.legend.map((item, index) => <Badge key={typeof item === 'string' ? item : `${card.label}-legend-${index}`} variant="neutral">{cellText(item)}</Badge>)}</div> : null}
              <Meta><strong className="text-[var(--ink-strong)]"><LocalizedText map={previewComponentText.noteLabel} /></strong> {cellText(card.note)}</Meta>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6" id="patterns">
        <SectionHeader title={{ ko: 'Pattern review', en: 'Pattern review', zh: 'Pattern review', ja: 'Pattern review' }} description={{ ko: '페이지에 반영할 때는 card 수를 늘리는 방식이 아니라, 기본 문서면 위에 필요한 표면만 올리는지를 본다.', en: 'When reviewing pages, check whether cards are selective overlays on top of a base document surface.', zh: '检查页面时，要看卡片是否只是建立在基础文档面上的必要叠层。', ja: 'ページでは、カードが基本文書面の上に必要最小限だけ載っているかを見ます。' }} />
        <Card className="p-5">
          <DataTable headers={[previewTableText.pattern, previewTableText.baseSurface, previewTableText.remainingCard]} rows={[
            [previewTableText.homeHero, previewTableText.plainEditorial, previewTableText.featuredEvidence],
            [previewTableText.archiveList, previewTableText.plainHeadingList, previewTableText.postRowsOnly],
            [previewTableText.postDetail, previewTableText.plainProse, previewTableText.evidencePanelOnly],
            [previewTableText.projectDetail, previewTableText.plainTitleProse, previewTableText.previewMediaOnly],
          ]} />
        </Card>
      </section>
    </SiteShell>
  )
}
