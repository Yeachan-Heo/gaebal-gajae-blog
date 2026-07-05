import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = ['primary', 'secondary', 'subtle'] as const
export type ButtonVariant = (typeof buttonVariants)[number]

type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: ButtonVariant
  href: string
  size?: ButtonSize
  iconStart?: ReactNode
  iconEnd?: ReactNode
  isLoading?: boolean
  external?: boolean
}

function buttonSizeClass(size: ButtonSize) {
  if (size === 'sm') return 'min-h-9 px-4 text-sm'
  if (size === 'lg') return 'min-h-12 px-6 text-base'
  return 'min-h-11 px-5 text-sm'
}

function buttonVariantClass(variant: ButtonVariant) {
  if (variant === 'primary') return 'button-primary'
  if (variant === 'secondary') return 'button-secondary'
  return 'button-subtle'
}

export function Button({ href, children, variant = 'subtle', size = 'md', iconStart, iconEnd, isLoading = false, external = false, className, target, rel, ...props }: ButtonProps) {
  const computedTarget = external ? '_blank' : target
  const computedRel = external ? 'noreferrer noopener' : rel
  const trailingIcon = isLoading ? null : (iconEnd ?? (external ? <span aria-hidden data-icon="inline-end">↗</span> : null))

  return (
    <a
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={isLoading ? 'true' : 'false'}
      href={href}
      target={computedTarget}
      rel={computedRel}
      aria-busy={isLoading || undefined}
      className={cn(buttonVariantClass(variant), buttonSizeClass(size), isLoading && 'pointer-events-none opacity-80', className)}
      {...props}
    >
      {isLoading ? <span aria-hidden data-icon="inline-start" className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : iconStart ? <span aria-hidden data-icon="inline-start">{iconStart}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden data-icon="inline-end">{trailingIcon}</span> : null}
    </a>
  )
}
