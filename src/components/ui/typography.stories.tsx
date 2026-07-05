import type { Meta, StoryObj } from '@storybook/nextjs'
import { Blockquote, Body, Code, Display, Eyebrow, H1, H2, H3, H4, Lead, List, Meta as MetaText, Muted, P, Prose, Small, Title } from '@/components/ui/typography'
import { LocalizedText } from '@/components/ui/text'

const typographyStoryText = {
  scaleEyebrow: { ko: 'Typography contract', en: 'Typography contract', zh: '文字体系契约', ja: '文字体系の契約' },
  scaleDisplay: { ko: '가재 블로그가 사람 편집물처럼 읽히게 하는 제목 위계', en: 'A title hierarchy that lets the blog read like edited work', zh: '让博客像经过编辑一样可读的标题层级', ja: '編集された読み物のように読めるタイトル階層' },
  scaleLead: { ko: 'Lead는 intro와 summary만 맡고, 모든 문장을 같은 강도로 키우지 않는다.', en: 'Lead handles intros and summaries only; not every sentence should be amplified equally.', zh: 'Lead 只负责导语与摘要，不该把所有句子都放大成同一强度。', ja: 'Lead は導入と要約だけを担当し、すべての文を同じ強さで持ち上げません。' },
  scaleTitle: { ko: 'Section title은 방향을 정한다', en: 'Section titles set direction', zh: 'Section title 决定阅读方向', ja: 'Section title は方向を決める' },
  scaleBody: { ko: 'Body는 실제 문장을 운반한다. 카드 설명, 본문 요약, 보조 설명 모두 같은 display 톤으로 부풀리지 않는 게 핵심이다.', en: 'Body carries the actual sentence load. Card descriptions, summaries, and support copy should not all inflate into display tone.', zh: 'Body 负责运送真实句子。卡片说明、正文摘要与辅助说明都不该膨胀成 display 语气。', ja: 'Body は実際の文章を運びます。カード説明、本文要約、補助コピーをすべて display トーンに膨らませないのが要点です。' },
  scaleMeta: { ko: 'Meta · 2026-06-24 · setup-tip', en: 'Meta · 2026-06-24 · setup-tip', zh: 'Meta · 2026-06-24 · 设置技巧', ja: 'Meta · 2026-06-24 · セットアップのコツ' },
  heading1: { ko: 'H1은 페이지 안의 주 선언이다', en: 'H1 is the main declaration inside a page', zh: 'H1 是页面内的主声明', ja: 'H1 はページ内の主宣言です' },
  heading1Body: { ko: 'H1/H2/H3/H4를 따로 두는 방식은 shadcn typography 예시와 가깝고, markdown 본문과 UI 카피가 같은 규칙을 재사용하기 좋다.', en: 'Keeping H1/H2/H3/H4 separate is closer to the shadcn typography example and helps markdown prose and UI copy share rules.', zh: '将 H1/H2/H3/H4 分开更接近 shadcn typography 示例，也更适合让 markdown 正文与 UI 文案复用同一规则。', ja: 'H1/H2/H3/H4 を分ける形は shadcn typography の例に近く、markdown 本文と UI コピーが同じ規則を再利用しやすくなります。' },
  heading2: { ko: 'H2는 큰 구간을 나눈다', en: 'H2 divides major sections', zh: 'H2 划分大区块', ja: 'H2 は大きな区切りを作る' },
  heading2Body: { ko: 'Daily Reflection에서 배운 규칙, 실수/교정 같은 블록 경계를 읽기 쉽게 만드는 데 적합하다.', en: 'It works well for readable block boundaries such as rules learned or mistake/correction sections in Daily Reflection.', zh: '它适合在 Daily Reflection 里划分“学到的规则”“失误/修正”这类清晰区块。', ja: 'Daily Reflection の「学んだ規則」「失敗/修正」のような区切りを読みやすくするのに向いています。' },
  heading3: { ko: 'H3는 세부 구간 제목이다', en: 'H3 is for sub-sections', zh: 'H3 用于细分区块', ja: 'H3 は細かな区切りの見出しです' },
  heading3Body: { ko: '카드 내부 부제나 proof panel 하위 설명처럼 너무 강하지 않은 수준의 계층에 쓴다.', en: 'Use it for layers that should not be too strong, such as card subheads or proof-panel support headings.', zh: '用于不该过强的层级，比如卡片内副标题或 proof panel 的辅助标题。', ja: 'カード内部の小見出しや proof panel の補助見出しのように、強すぎない階層に使います。' },
  heading4: { ko: 'H4는 보조 제목이다', en: 'H4 is a supporting heading', zh: 'H4 是辅助标题', ja: 'H4 は補助見出しです' },
  small: { ko: 'Small은 서브 레이블, Muted는 조용한 메모에 가깝다.', en: 'Small behaves like a sub-label, while Muted is closer to a quiet note.', zh: 'Small 更像子标签，Muted 更接近安静的注记。', ja: 'Small はサブラベル寄りで、Muted は静かな注記に近いです。' },
  muted: { ko: 'Muted text는 방향 설명보다는 부수 주석에 남겨두는 편이 맞다.', en: 'Muted text works better as side notes than as directional copy.', zh: 'Muted text 更适合留给边注，而不是承担方向性说明。', ja: 'Muted text は方向説明よりも補助的な注釈に残す方が合っています。' },
  proseTitle: { ko: '긴 글은 카드보다 prose가 먼저다', en: 'Longform starts with prose before cards', zh: '长文应先有 prose，再考虑卡片', ja: '長文はカードより先に prose が来る' },
  proseBody: { ko: '사람이 편집한 듯 읽히려면 긴 글은 기본 문서면 위에서 리듬을 가져야 한다. 카드가 기본이 되면 전체 화면이 데모 보드처럼 느껴진다.', en: 'If it should read like edited work, longform needs rhythm on a base document surface. When cards become the default, the whole screen starts to feel like a demo board.', zh: '如果希望它像编辑过的内容一样可读，长文就必须先在基础文档面上建立节奏。卡片一旦变成默认容器，整个页面就会像演示板。', ja: '編集された読み物のように読ませたいなら、長文はまず文書面の上でリズムを持つ必要があります。カードが既定になると、画面全体がデモボードのように見えます。' },
  proseQuote: { ko: '“문서가 먼저이고, 카드는 강조가 필요할 때만 쓴다.”', en: '“Document first. Use cards only when emphasis is required.”', zh: '“先有文档面，卡片只在需要强调时使用。”', ja: '「文書が先で、カードは強調が必要なときだけ使う。」' },
  proseList1: { ko: 'measure는 대략 66ch 안팎에서 유지', en: 'Keep measure roughly around 66ch', zh: '将 measure 大致控制在 66ch 左右', ja: 'measure はおよそ 66ch 前後に保つ' },
  proseList2: { ko: 'meta는 조용히 뒤로 물리고', en: 'Let meta recede quietly', zh: '让 meta 安静地退到后方', ja: 'meta は静かに後ろへ退かせる' },
  proseList3: { ko: '강조는 heading rhythm과 spacing으로 해결', en: 'Solve emphasis with heading rhythm and spacing first', zh: '优先用 heading 节奏与间距解决强调', ja: '強調はまず heading のリズムと余白で解決する' },
  proseBody2: { ko: 'inline code는 owner_confirmation_required 같은 운영 규칙을 읽을 때 튀지 않으면서도 구분돼야 한다.', en: 'Inline code should stay distinct without shouting when readers scan operating rules like owner_confirmation_required.', zh: '阅读 owner_confirmation_required 这类运作规则时，inline code 应该能区分出来，但不要大喊大叫。', ja: 'owner_confirmation_required のような運用ルールを読むとき、inline code は目立ちすぎずに区別できる必要があります。' },
  proseHeading2: { ko: '본문과 UI 카피는 분리한다', en: 'Separate prose from UI copy', zh: '把正文和 UI 文案分开', ja: '本文と UI コピーは分ける' },
  proseBody3: { ko: 'Display, Lead는 화면 도입부에, H2/H3/P/List/Blockquote는 본문 흐름에 두는 편이 지금 환경에 더 맞다.', en: 'Display and Lead fit the page intro; H2/H3/P/List/Blockquote fit the body flow better in this system.', zh: '在这个系统里，Display 和 Lead 更适合页面导入，H2/H3/P/List/Blockquote 更适合正文流。', ja: 'このシステムでは Display と Lead は導入部に、H2/H3/P/List/Blockquote は本文の流れに置く方が合っています。' },
} as const

const meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'shadcn/ui does not ship typography styles by default; it demonstrates a semantic pattern of reusable heading and text recipes. For this blog, typography primitives should cover both editorial UI text and longer prose blocks without relying on ad-hoc page classes.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Scale: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
      <Eyebrow><LocalizedText map={typographyStoryText.scaleEyebrow} /></Eyebrow>
      <Display><LocalizedText map={typographyStoryText.scaleDisplay} /></Display>
      <Lead><LocalizedText map={typographyStoryText.scaleLead} /></Lead>
      <Title variant="section"><LocalizedText map={typographyStoryText.scaleTitle} /></Title>
      <Body><LocalizedText map={typographyStoryText.scaleBody} /></Body>
      <MetaText><LocalizedText map={typographyStoryText.scaleMeta} /></MetaText>
    </div>
  ),
}

export const SemanticHeadings: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
      <H1><LocalizedText map={typographyStoryText.heading1} /></H1>
      <P><LocalizedText map={typographyStoryText.heading1Body} /></P>
      <H2><LocalizedText map={typographyStoryText.heading2} /></H2>
      <P><LocalizedText map={typographyStoryText.heading2Body} /></P>
      <H3><LocalizedText map={typographyStoryText.heading3} /></H3>
      <P><LocalizedText map={typographyStoryText.heading3Body} /></P>
      <H4><LocalizedText map={typographyStoryText.heading4} /></H4>
      <Small><LocalizedText map={typographyStoryText.small} /></Small>
      <Muted><LocalizedText map={typographyStoryText.muted} /></Muted>
    </div>
  ),
}

export const ProseRhythm: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Prose className="max-w-[66ch]">
        <div className="content-block">
          <H2><LocalizedText map={typographyStoryText.proseTitle} /></H2>
          <P><LocalizedText map={typographyStoryText.proseBody} /></P>
          <Blockquote><LocalizedText map={typographyStoryText.proseQuote} /></Blockquote>
          <List>
            <LocalizedText as="li" map={typographyStoryText.proseList1} />
            <LocalizedText as="li" map={typographyStoryText.proseList2} />
            <LocalizedText as="li" map={typographyStoryText.proseList3} />
          </List>
          <P><LocalizedText map={typographyStoryText.proseBody2} /> <Code>owner_confirmation_required</Code></P>
          <H3><LocalizedText map={typographyStoryText.proseHeading2} /></H3>
          <P><LocalizedText map={typographyStoryText.proseBody3} /></P>
        </div>
      </Prose>
    </div>
  ),
}
