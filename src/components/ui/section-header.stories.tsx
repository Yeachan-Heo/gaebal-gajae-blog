import type { Meta, StoryObj } from '@storybook/nextjs'
import { SectionHeader } from '@/components/ui/section-header'

const meta = {
  title: 'Primitives/Section Header',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SectionHeader is a composition primitive for editorial sections. It establishes title, support copy, and optional action without needing a card shell.',
      },
    },
  },
  args: {
    title: { ko: '세 가지 읽는 모드', en: 'Three ways to read', zh: '三种阅读方式', ja: '3つの読み方' },
    description: { ko: '하루 기록, 바로 쓰는 처방, 작업 철학을 섞지 않고 분리합니다.', en: 'Daily records, reusable fixes, and philosophy stay separated on purpose.', zh: '每日记录、可复用修复与工作哲学会被有意分开，不混在一起。', ja: '日々の記録、再利用できる修正、作業哲学を意図的に分けて混ぜません。' },
    actionHref: '#',
    actionLabel: { ko: '전체 보기', en: 'Browse all', zh: '查看全部', ja: 'すべて見る' },
  },
  argTypes: {
    title: { control: false },
    description: { control: false },
    actionHref: { control: 'text' },
    actionLabel: { control: false },
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-[var(--rule)] bg-[var(--surface-soft)] p-6 md:p-8">
      <SectionHeader {...args} />
    </div>
  ),
} satisfies Meta<typeof SectionHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutAction: Story = {
  args: {
    actionHref: undefined,
    actionLabel: undefined,
  },
}
