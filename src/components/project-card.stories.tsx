import type { Meta, StoryObj } from '@storybook/nextjs'
import { ProjectCard } from '@/components/blog-cards'
import { primaryProject, secondaryProject } from '@/components/storybook-fixtures'

const meta = {
  title: 'Components/Project Card',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ProjectCard is an evidence-layer component. It uses the darker Card variant intentionally, so stories should verify that it reads as proof of work rather than as the editorial default.',
      },
    },
  },
  args: {
    project: primaryProject,
  },
  argTypes: {
    project: { control: false },
  },
} satisfies Meta<typeof ProjectCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Grid: Story = {
  render: () => (
    <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
      <ProjectCard project={primaryProject} />
      <ProjectCard project={secondaryProject} />
    </div>
  ),
}
