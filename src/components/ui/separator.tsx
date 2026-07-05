import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      data-slot="separator"
      data-orientation={orientation}
      aria-orientation={orientation}
      className={cn(
        orientation === 'vertical' ? 'h-5 w-px shrink-0 bg-[var(--rule)]' : 'h-px w-full bg-[var(--rule)]',
        className,
      )}
      {...props}
    />
  )
}
