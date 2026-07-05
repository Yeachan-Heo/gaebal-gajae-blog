import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ComponentProps } from 'react'
import { PostCard } from '@/components/blog-cards'
import { featuredPost, plainPost } from '@/components/storybook-fixtures'

type PostCardStoryArgs = ComponentProps<typeof PostCard>

const meta = {
  title: 'Components/Post Card',
  component: PostCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'PostCard is a blog-domain component built from Card, Typography, ReadingMeta, Badge, and proof signal primitives. Stories should compare the interesting states of the composed card, not redefine the primitive contract.',
      },
    },
  },
  args: {
    post: plainPost,
    featured: false,
  },
  argTypes: {
    post: { control: false },
    featured: { control: 'boolean' },
  },
} satisfies Meta<PostCardStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Featured: Story = {
  args: {
    post: featuredPost,
    featured: true,
  },
}

export const Comparison: Story = {
  render: () => (
    <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <PostCard post={featuredPost} featured />
      <PostCard post={plainPost} />
    </div>
  ),
}
