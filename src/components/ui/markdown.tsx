import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type MarkdownTone = 'default' | 'evidence'

function snippetToneClass(tone: MarkdownTone) {
  if (tone === 'evidence') {
    return 'text-sm text-[var(--ink-terminal-soft)] [&_p]:m-0 [&_p]:text-sm [&_p]:leading-6 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_li]:leading-6 [&_strong]:font-semibold [&_strong]:text-[var(--ink-terminal)] [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--evidence-rule)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded-[0.45rem] [&_code]:bg-[var(--surface-evidence-code)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-[var(--ink-terminal)]'
  }
  return 'text-sm text-[var(--ink-soft)] [&_p]:m-0 [&_p]:text-sm [&_p]:leading-6 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_li]:leading-6 [&_strong]:font-semibold [&_strong]:text-[var(--ink-strong)] [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--rule-strong)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded-[0.45rem] [&_code]:bg-[var(--surface-code)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-[var(--ink-strong)]'
}

export function MarkdownSnippet({ html, tone = 'default', className, ...props }: { html: string; tone?: MarkdownTone; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="markdown-snippet" className={cn(snippetToneClass(tone), className)} dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning {...props} />
}

export function MarkdownBlock({ html, className, ...props }: { html: string; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="markdown-block" className={cn('content-block', className)} dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning {...props} />
}
