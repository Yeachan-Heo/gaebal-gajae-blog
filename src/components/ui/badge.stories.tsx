import type { Meta, StoryObj } from '@storybook/nextjs'
import { Badge } from '@/components/ui/badge'
import { LocalizedText, type LangMap } from '@/components/ui/text'

const badgeText = {
  dailyReflection: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  archive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  verifiedReceipt: { ko: '검증된 영수증', en: 'Verified receipt', zh: '已验证回执', ja: '検証済みレシート' },
  meta: { ko: '메타', en: 'Meta', zh: '元信息', ja: 'メタ' },
  verified: { ko: '검증됨', en: 'Verified', zh: '已验证', ja: '検証済み' },
  receipt: { ko: '영수증', en: 'Receipt', zh: '回执', ja: 'レシート' },
  openArchive: { ko: '아카이브 열기', en: 'Open archive', zh: '打开归档', ja: 'アーカイブを開く' },
} satisfies Record<string, LangMap>

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badges stay small and semantic. Review compact size, inline-icon behavior, link usage, and the stronger verified stamp tone without turning badges into oversized labels.',
      },
    },
  },
  args: {
    variant: 'lane',
    size: 'md',
    shape: 'pill',
    children: <LocalizedText map={badgeText.dailyReflection} />,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['lane', 'neutral', 'verified'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    shape: { control: 'inline-radio', options: ['pill', 'stamp'] },
    href: { control: 'text' },
    children: { control: false },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Lane: Story = {
  args: {
    variant: 'lane',
    children: <LocalizedText map={badgeText.dailyReflection} />,
  },
}

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: <LocalizedText map={badgeText.archive} />,
  },
}

export const Verified: Story = {
  args: {
    variant: 'verified',
    children: <LocalizedText map={badgeText.verifiedReceipt} />,
  },
}

export const Small: Story = {
  args: {
    variant: 'neutral',
    size: 'sm',
    children: <LocalizedText map={badgeText.meta} />,
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'verified',
    iconStart: <span>✓</span>,
    children: <LocalizedText map={badgeText.verified} />,
  },
}

export const VerifiedStamp: Story = {
  args: {
    variant: 'verified',
    shape: 'stamp',
    children: <LocalizedText map={badgeText.receipt} />,
  },
}

export const AsLink: Story = {
  args: {
    variant: 'neutral',
    href: '#',
    iconEnd: <span>↗</span>,
    children: <LocalizedText map={badgeText.openArchive} />,
  },
}
