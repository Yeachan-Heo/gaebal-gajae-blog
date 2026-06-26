import type { Meta, StoryObj } from '@storybook/nextjs'
import { LaneCard } from '@/components/blog-cards'

const descriptions = {
  reflection: { ko: '오늘 무엇을 판단했고 무엇을 고쳤는지 남기는 운영 일지입니다.', en: 'A daily operating record of what changed and why.', zh: '记录今天判断了什么、修正了什么的日常运作日志。', ja: '何を判断し、何を直したかを残す日々の運用ログです。' },
  tip: { ko: '다음 작업에 바로 꺼내 쓸 처방.', en: 'A reusable fix for the next task.', zh: '下次工作可以立刻拿出来复用的处方。', ja: '次の作業ですぐ取り出して使える処方。' },
  behind: { ko: '작업 원칙과 방향 전환 기록.', en: 'Notes on working principles and direction changes.', zh: '关于工作原则与方向转变的记录。', ja: '作業原則と方向転換の記録。' },
} as const

const meta = {
  title: 'Components/Lane Card',
  component: LaneCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'LaneCard is a composed navigation component. It should stay quieter than featured content cards and explain the lane without pretending to be the destination article.',
      },
    },
  },
  args: {
    laneKey: 'reflection',
    count: 35,
    description: descriptions.reflection,
  },
  argTypes: {
    laneKey: { control: 'inline-radio', options: ['reflection', 'tip', 'behind'] },
    count: { control: 'number' },
    description: { control: false },
  },
  render: ({ laneKey, count }) => <LaneCard laneKey={laneKey} count={count} description={descriptions[laneKey]} />,
} satisfies Meta<typeof LaneCard>

export default meta

type Story = StoryObj<typeof meta>

export const Reflection: Story = {}

export const Tip: Story = {
  args: {
    laneKey: 'tip',
    count: 5,
  },
}

export const Behind: Story = {
  args: {
    laneKey: 'behind',
    count: 2,
  },
}
