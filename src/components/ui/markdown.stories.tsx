import type { Meta, StoryObj } from '@storybook/nextjs'
import { MarkdownBlock, MarkdownSnippet } from '@/components/ui/markdown'
import { renderMarkdownBlockHtml } from '@/lib/site-ui.mjs'

const snippetHtml = renderMarkdownBlockHtml('**배운 규칙**\n- `owner_confirmation_required` 는 판단을 올리는 신호다.')
const proseHtml = renderMarkdownBlockHtml('# 배운 규칙\n\n긴 글은 카드보다 prose가 먼저다.\n\n- meta는 뒤로 물리고\n- 강조는 heading rhythm으로 해결한다\n\n> 문서면이 먼저다.')

const meta = {
  title: 'Primitives/Markdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Markdown rendering is part of the primitive contract in this blog because prose and proof snippets come from markdown sources. Review body rhythm and compact snippet tone here before checking page-level rendering.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ProofSnippet: Story = {
  render: () => (
    <div className="max-w-xl rounded-[24px] border border-[var(--rule)] bg-[var(--surface-soft)] p-5">
      <MarkdownSnippet html={snippetHtml} />
    </div>
  ),
}

export const EvidenceSnippet: Story = {
  render: () => (
    <div className="max-w-xl rounded-[24px] border border-[var(--evidence-rule)] bg-[var(--surface-evidence)] p-5">
      <MarkdownSnippet html={snippetHtml} tone="evidence" />
    </div>
  ),
}

export const BodyBlock: Story = {
  render: () => (
    <div className="max-w-[66ch]">
      <MarkdownBlock html={proseHtml} />
    </div>
  ),
}
