import { Button, type ButtonVariant } from '@/components/ui/button'
import { Lead, Label, Title } from '@/components/ui/typography'
import { LocalizedText, type LangMap } from '@/components/ui/text'
import { cn } from '@/lib/utils'

export type SectionHeaderProps = {
  eyebrow?: LangMap | null
  title: LangMap
  description?: LangMap | null
  actionHref?: string
  actionLabel?: LangMap | null
  actionVariant?: ButtonVariant
  className?: string
}

export function SectionHeader({ eyebrow, title, description, actionHref, actionLabel, actionVariant = 'subtle', className }: SectionHeaderProps) {
  return (
    <div data-slot="section-header" className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div className="space-y-2">
        {eyebrow ? <Label as="p"><LocalizedText map={eyebrow} /></Label> : null}
        <Title variant="section"><LocalizedText map={title} /></Title>
        {description ? <Lead className="max-w-3xl text-base"><LocalizedText map={description} /></Lead> : null}
      </div>
      {actionHref && actionLabel ? <Button href={actionHref} variant={actionVariant}><LocalizedText map={actionLabel} /></Button> : null}
    </div>
  )
}
