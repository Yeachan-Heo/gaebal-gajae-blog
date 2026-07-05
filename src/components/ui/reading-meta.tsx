import { Small } from '@/components/ui/typography'
import { LocalizedText, type LangMap } from '@/components/ui/text'
import { cn } from '@/lib/utils'

export type ReadingMetaProps = {
  parts: Array<LangMap | string>
  separator?: string
  className?: string
  tone?: 'default' | 'evidence'
}

export function ReadingMeta({ parts, separator = '·', className, tone = 'default' }: ReadingMetaProps) {
  return (
    <Small as="div" data-slot="reading-meta" className={cn('flex flex-wrap items-center gap-2', tone === 'evidence' ? 'text-[var(--ink-terminal-soft)]' : 'text-[var(--ink-faint)]', className)}>
      {parts.map((part, index) => (
        <span key={index} className="inline-flex items-center gap-2">
          {index > 0 ? <span aria-hidden="true">{separator}</span> : null}
          {typeof part === 'string' ? part : <LocalizedText map={part} />}
        </span>
      ))}
    </Small>
  )
}
