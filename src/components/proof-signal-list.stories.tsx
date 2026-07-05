import type { Meta, StoryObj } from '@storybook/nextjs'
import { ProofSignalList } from '@/components/blog-cards'
import { storySignals } from '@/components/storybook-fixtures'

const meta = {
  title: 'Components/Proof Panel',
  component: ProofSignalList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ProofSignalList is a composed evidence block. It should verify markdown rhythm, code styling, and the quieter hierarchy used in proof-heavy cards.',
      },
    },
  },
  args: {
    signals: storySignals,
    featured: false,
    tone: 'default',
  },
  argTypes: {
    signals: { control: false },
    featured: { control: 'boolean' },
    tone: { control: 'inline-radio', options: ['default', 'evidence'] },
  },
} satisfies Meta<typeof ProofSignalList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EvidenceTone: Story = {
  args: {
    tone: 'evidence',
  },
}

export const Featured: Story = {
  args: {
    featured: true,
    tone: 'evidence',
  },
}
