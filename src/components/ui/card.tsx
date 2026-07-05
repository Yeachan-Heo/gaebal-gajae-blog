import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const cardVariants = ['default', 'strong', 'evidence'] as const
export type CardVariant = (typeof cardVariants)[number]

type CardSize = 'sm' | 'md'

export type CardProps = {
  children: ReactNode
  className?: string
  variant?: CardVariant
  href?: string
  size?: CardSize
}

function cardSizeClass(size: CardSize) {
  if (size === 'sm') return '[--card-spacing:1rem]'
  return '[--card-spacing:1.25rem] md:[--card-spacing:1.5rem]'
}

function cardVariantClass(variant: CardVariant) {
  if (variant === 'strong') return 'surface-card-strong'
  if (variant === 'evidence') return 'surface-card-evidence'
  return 'surface-card'
}

export function Card({ children, className, variant = 'default', size = 'md', href }: CardProps) {
  const cls = cn(cardVariantClass(variant), cardSizeClass(size), className)
  if (href) {
    return <a data-slot="card" data-variant={variant} data-size={size} href={href} className={cls}>{children}</a>
  }
  return <div data-slot="card" data-variant={variant} data-size={size} className={cls}>{children}</div>
}

export function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-header" className={cn('grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-[var(--card-spacing)] pt-[var(--card-spacing)]', className)} {...props}>{children}</div>
}

export function CardAction({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-action" className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props}>{children}</div>
}

export function CardContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-content" className={cn('space-y-4 p-[var(--card-spacing)]', className)} {...props}>{children}</div>
}

export function CardFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-footer" className={cn('flex items-center px-[var(--card-spacing)] pb-[var(--card-spacing)]', className)} {...props}>{children}</div>
}

export function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 data-slot="card-title" className={cn('text-balance font-black leading-tight tracking-[-0.03em] text-[var(--ink-strong)]', className)} {...props}>{children}</h3>
}

export function CardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="card-description" className={cn('text-pretty text-[0.98rem] leading-8 text-[var(--ink-soft)]', className)} {...props}>{children}</p>
}

export type CardLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>
