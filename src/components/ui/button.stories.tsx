import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@/components/ui/button'
import { LocalizedText, type LangMap } from '@/components/ui/text'

const buttonText = {
  primaryAction: { ko: '기본 액션', en: 'Primary action', zh: '主要操作', ja: '主要アクション' },
  readLog: { ko: '오늘 기록 읽기', en: 'Read today’s log', zh: '阅读今日记录', ja: '今日の記録を読む' },
  browseArchive: { ko: '아카이브 보기', en: 'Browse archive', zh: '查看归档', ja: 'アーカイブを見る' },
  inspectProof: { ko: '근거 확인', en: 'Inspect proof', zh: '查看依据', ja: '根拠を確認' },
  launchReview: { ko: '검토 시작', en: 'Launch review', zh: '开始审查', ja: 'レビューを始める' },
  inspect: { ko: '확인', en: 'Inspect', zh: '查看', ja: '確認' },
  openLane: { ko: '레인 열기', en: 'Open lane', zh: '打开分区', ja: 'レーンを開く' },
  openGitHub: { ko: 'GitHub 열기', en: 'Open GitHub', zh: '打开 GitHub', ja: 'GitHub を開く' },
  generatingProof: { ko: '근거 생성 중', en: 'Generating proof', zh: '正在生成依据', ja: '根拠を生成中' },
} satisfies Record<string, LangMap>

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Buttons stay generic and predictable. Review variant, size, loading, icon, and external-link states here instead of inventing ad-hoc CTA styles inside pages.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    href: '#',
    children: <LocalizedText map={buttonText.primaryAction} />,
    external: false,
    isLoading: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'subtle'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    href: { control: 'text' },
    children: { control: false },
    external: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: <LocalizedText map={buttonText.readLog} />,
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
    children: <LocalizedText map={buttonText.browseArchive} />,
  },
}

export const Subtle: Story = {
  args: {
    ...Primary.args,
    variant: 'subtle',
    children: <LocalizedText map={buttonText.inspectProof} />,
  },
}

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
    children: <LocalizedText map={buttonText.launchReview} />,
  },
}

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
    children: <LocalizedText map={buttonText.inspect} />,
  },
}

export const WithIcon: Story = {
  args: {
    ...Secondary.args,
    iconStart: <span>↳</span>,
    children: <LocalizedText map={buttonText.openLane} />,
  },
}

export const ExternalLink: Story = {
  args: {
    ...Subtle.args,
    href: 'https://github.com',
    external: true,
    children: <LocalizedText map={buttonText.openGitHub} />,
  },
}

export const Loading: Story = {
  args: {
    ...Primary.args,
    isLoading: true,
    children: <LocalizedText map={buttonText.generatingProof} />,
  },
}
