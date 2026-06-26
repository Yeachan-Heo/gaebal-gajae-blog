import type { Meta, StoryObj } from '@storybook/nextjs'
import { Card } from '@/components/ui/card'
import { LocalizedText, type LangMap } from '@/components/ui/text'
import { Body, Display, Eyebrow, Lead, Title } from '@/components/ui/typography'

const overviewText = {
  eyebrow: { ko: '스토리북 검토 흐름', en: 'Storybook review flow', zh: 'Storybook 审查流程', ja: 'Storybook レビューの流れ' },
  title: { ko: '페이지보다 먼저 foundations와 primitives를 본다', en: 'Review foundations and primitives before pages', zh: '先看 foundations 和 primitives，再看页面', ja: 'ページより先に foundations と primitives を確認する' },
  lead: { ko: 'Storybook은 설명문 보드가 아니라 component workshop이다. stories는 interesting states를 보여주고, docs는 그 위에 설명을 얹는다.', en: 'Storybook is a component workshop, not a prose board. Stories show interesting states first, and docs add explanation on top.', zh: 'Storybook 不是说明文字板，而是 component workshop。stories 先展示 interesting states，docs 再补充解释。', ja: 'Storybook は説明文ボードではなく component workshop だ。stories が interesting states を先に見せ、docs がその上に説明を足す。' },
  reviewTitle: { ko: '이 순서로 본다', en: 'Review in this order', zh: '按这个顺序看', ja: 'この順序で見る' },
  foundations: { ko: 'Foundations — 색, 간격, 반경, 그림자', en: 'Foundations — color, spacing, radius, shadow', zh: 'Foundations — 颜色、间距、圆角、阴影', ja: 'Foundations — 色、間隔、半径、影' },
  typography: { ko: 'Typography — display, title, body, meta, prose rhythm', en: 'Typography — display, title, body, meta, prose rhythm', zh: 'Typography — display、title、body、meta、prose rhythm', ja: 'Typography — display、title、body、meta、prose rhythm' },
  primitives: { ko: 'Primitives — Card, Button, Badge, Reading Meta, Section Header', en: 'Primitives — Card, Button, Badge, Reading Meta, Section Header', zh: 'Primitives — Card、Button、Badge、Reading Meta、Section Header', ja: 'Primitives — Card、Button、Badge、Reading Meta、Section Header' },
  components: { ko: 'Components — Post Card, Lane Card, Project Card, Proof Panel', en: 'Components — Post Card, Lane Card, Project Card, Proof Panel', zh: 'Components — Post Card、Lane Card、Project Card、Proof Panel', ja: 'Components — Post Card、Lane Card、Project Card、Proof Panel' },
  patterns: { ko: 'Patterns — 페이지 레벨 검증', en: 'Patterns — page-level verification', zh: 'Patterns — 页面级验证', ja: 'Patterns — ページレベルの検証' },
  goodStateTitle: { ko: '좋은 Storybook 상태', en: 'Healthy Storybook state', zh: '良好的 Storybook 状态', ja: '良い Storybook の状態' },
  goodStateBodyOne: { ko: '한 스토리는 컴포넌트의 흥미로운 상태 하나를 보여준다.', en: 'One story should present one interesting component state.', zh: '一个 story 应该只展示一个有意思的组件状态。', ja: '1つの story は、コンポーネントの興味深い状態を1つだけ見せるべきだ。' },
  goodStateBodyTwo: { ko: 'args와 controls로 시각 계약을 바꿔보되, primitive 이름은 generic하게 유지한다.', en: 'Use args and controls to test the visual contract, while keeping primitive names generic.', zh: '可以用 args 和 controls 检查视觉契约，但 primitive 名称应保持 generic。', ja: 'args と controls で視覚契約を試しつつ、primitive 名は generic のまま保つ。' },
  goodStateBodyThree: { ko: 'page stories는 마지막 검증 레이어이며, 설계의 출발점이 아니다.', en: 'Page stories are the final verification layer, not the starting point of design.', zh: 'page stories 是最后的验证层，不是设计的起点。', ja: 'page stories は最後の検証レイヤーであり、設計の出発点ではない。' },
} satisfies Record<string, LangMap>

const meta = {
  title: 'Introduction/Design System Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Storybook is the design-system workshop. Review foundations and primitives first, then components, then page-level patterns. The goal is to judge the UI contract in isolation before it gets buried inside pages.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ReviewFlow: Story = {
  render: () => (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
      <div className="space-y-4">
        <Eyebrow><LocalizedText map={overviewText.eyebrow} /></Eyebrow>
        <Display as="h1" className="max-w-4xl"><LocalizedText map={overviewText.title} /></Display>
        <Lead><LocalizedText map={overviewText.lead} /></Lead>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <Title variant="section"><LocalizedText map={overviewText.reviewTitle} /></Title>
          <ol className="mt-4 grid gap-3 pl-5 text-[var(--ink-soft)]">
            <li><LocalizedText map={overviewText.foundations} /></li>
            <li><LocalizedText map={overviewText.typography} /></li>
            <li><LocalizedText map={overviewText.primitives} /></li>
            <li><LocalizedText map={overviewText.components} /></li>
            <li><LocalizedText map={overviewText.patterns} /></li>
          </ol>
        </Card>
        <Card className="p-5">
          <Title variant="section"><LocalizedText map={overviewText.goodStateTitle} /></Title>
          <div className="mt-4 space-y-3">
            <Body><LocalizedText map={overviewText.goodStateBodyOne} /></Body>
            <Body><LocalizedText map={overviewText.goodStateBodyTwo} /></Body>
            <Body><LocalizedText map={overviewText.goodStateBodyThree} /></Body>
          </div>
        </Card>
      </div>
    </div>
  ),
}
