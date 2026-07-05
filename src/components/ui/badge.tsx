import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const badgeVariants = ['lane', 'neutral', 'verified'] as const
export type BadgeVariant = (typeof badgeVariants)[number]

type BadgeSize = 'sm' | 'md'
type BadgeShape = 'pill' | 'stamp'

export type BadgeProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  variant?: BadgeVariant
  href?: string
  size?: BadgeSize
  shape?: BadgeShape
  iconStart?: ReactNode
  iconEnd?: ReactNode
}

function badgeSizeClass(size: BadgeSize) {
  if (size === 'sm') return 'px-2.5 py-0.5 text-[0.7rem] tracking-[0.18em]'
  return 'px-3 py-1 text-xs tracking-[0.2em]'
}

function badgeShapeClass(shape: BadgeShape) {
  if (shape === 'stamp') return 'rounded-[0.9rem] px-3.5 tracking-[0.14em]'
  return 'rounded-full'
}

function badgeVariantClass(variant: BadgeVariant) {
  if (variant === 'neutral') return 'badge-neutral'
  if (variant === 'verified') return 'badge-verified'
  return 'badge-lane'
}

export function Badge({ children, variant = 'lane', href, size = 'md', shape = 'pill', iconStart, iconEnd, className, ...props }: BadgeProps) {
  const cls = cn(badgeVariantClass(variant), badgeSizeClass(size), badgeShapeClass(shape), className)
  const content = (
    <>
      {iconStart ? <span aria-hidden data-icon="inline-start">{iconStart}</span> : null}
      <span>{children}</span>
      {iconEnd ? <span aria-hidden data-icon="inline-end">{iconEnd}</span> : null}
    </>
  )

  if (href) {
    return <a data-slot="badge" data-variant={variant} data-size={size} data-shape={shape} href={href} className={cls} {...props}>{content}</a>
  }

  return <span data-slot="badge" data-variant={variant} data-size={size} data-shape={shape} className={cls} {...props}>{content}</span>
}
