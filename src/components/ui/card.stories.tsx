import type { Meta, StoryObj } from '@storybook/nextjs'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ReadingMeta } from '@/components/ui/reading-meta'
import { LocalizedText, type LangMap } from '@/components/ui/text'

const cardStoryText = {
  open: { ko: '열기', en: 'Open', zh: '打开', ja: '開く' },
  primaryAction: { ko: '주요 액션', en: 'Primary action', zh: '主要操作', ja: '主要アクション' },
  secondaryAction: { ko: '보조 액션', en: 'Secondary', zh: '次要操作', ja: '補助アクション' },
} as const
const cardStoryArgsText = {
  defaultTitle: { ko: '가재가 남긴 운영 기록', en: 'An operating note left by Gajae', zh: 'Gajae 留下的运作记录', ja: 'ガジェが残した運用記録' },
  defaultDescription: { ko: '기본 Card 위에 메타, 제목, 설명을 조합하는 방식이 대표 primitive 계약이다.', en: 'The representative primitive contract combines meta, title, and description on top of the base Card.', zh: '代表性的 primitive 契约，是在基础 Card 上组合 meta、title 与 description。', ja: '代表的な primitive 契約は、基本 Card の上に meta・title・description を組み合わせる形です。' },
  strongTitle: { ko: '오늘의 대표 로그', en: 'Featured log from today', zh: '今天的代表日志', ja: '今日の代表ログ' },
  evidenceTitle: { ko: '검증 메타와 증거를 담는 slab', en: 'A slab for verification meta and evidence', zh: '承载验证元信息与证据的 slab', ja: '検証メタと証拠を載せる slab' },
  evidenceDescription: { ko: '증거 카드에서만 더 어두운 표면과 조용한 메타 톤을 쓴다.', en: 'Only evidence cards use the darker surface and quieter meta tone.', zh: '只有证据卡片使用更深的表面与更安静的 meta 语气。', ja: '暗い表面と静かな meta トーンは証拠カードだけで使います。' },
} as const
const cardStoryBodyText = {
  body: { ko: 'slot spacing과 action 위치를 같은 primitive 계약으로 검토한다.', en: 'Review slot spacing and action placement under the same primitive contract.', zh: '在同一 primitive 契约下检查 slot 间距与 action 位置。', ja: 'slot の間隔と action の位置を同じ primitive 契約で確認する。' },
} as const
const cardStoryMetaText = {
  lane: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
} as const
type CardStoryArgs = {
  variant?: 'default' | 'strong' | 'evidence'
  size?: 'sm' | 'md'
  href?: string
  title: string | LangMap
  description: string | LangMap
  showMeta: boolean
  showActions: boolean
}


function CardDemo({ title, description, showMeta, showActions, variant = 'default', size = 'md', href = '#' }: CardStoryArgs) {
  return (
    <Card variant={variant} size={size} href={href} className="w-[min(100%,32rem)]">
      <CardHeader>
        {showMeta ? <ReadingMeta parts={['2026-06-24', cardStoryMetaText.lane]} /> : null}
        <CardTitle className={variant === 'evidence' ? 'text-[var(--ink-terminal)]' : undefined}>{typeof title === 'string' ? title : <LocalizedText map={title} />}</CardTitle>
        <CardDescription className={variant === 'evidence' ? 'text-[var(--ink-terminal-soft)]' : undefined}>{typeof description === 'string' ? description : <LocalizedText map={description} />}</CardDescription>
        {showActions ? (
          <CardAction>
            <Button href="#" variant="subtle" size="sm"><LocalizedText map={cardStoryText.open} /></Button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        <p className={variant === 'evidence' ? 'text-[var(--ink-terminal-soft)]' : 'text-[var(--ink-soft)]'}>
          <LocalizedText map={cardStoryBodyText.body} />
        </p>
      </CardContent>
      {showActions ? (
        <CardFooter className="gap-3">
          <Button href="#" variant="primary"><LocalizedText map={cardStoryText.primaryAction} /></Button>
          <Button href="#" variant="secondary"><LocalizedText map={cardStoryText.secondaryAction} /></Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

const meta = {
  title: 'Primitives/Card',
  component: CardDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Storybook stories should capture the interesting states of the base Card primitive. The primitive stays generic; blog-specific meaning lives in higher-level components.',
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    href: '#',
    title: cardStoryArgsText.defaultTitle,
    description: cardStoryArgsText.defaultDescription,
    showMeta: true,
    showActions: true,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'strong', 'evidence'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    href: { control: 'text' },
    title: { control: 'object' },
    description: { control: 'object' },
    showMeta: { control: 'boolean' },
    showActions: { control: 'boolean' },
  },

} satisfies Meta<typeof CardDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Strong: Story = {
  args: {
    variant: 'strong',
    title: cardStoryArgsText.strongTitle,
  },
}

export const Evidence: Story = {
  args: {
    variant: 'evidence',
    title: cardStoryArgsText.evidenceTitle,
    description: cardStoryArgsText.evidenceDescription,
  },
}

export const WithoutFooter: Story = {
  args: {
    showActions: false,
  },
}

export const Compact: Story = {
  args: {
    size: 'sm',
    showActions: false,
  },
}
