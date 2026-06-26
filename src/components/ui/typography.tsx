import type { ComponentPropsWithoutRef, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TypographyProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export const titleVariants = ['page', 'section', 'card', 'lead'] as const
export type TitleVariant = (typeof titleVariants)[number]

function elementFor<T extends ElementType>(as: T | undefined, fallback: T) {
  return (as || fallback) as ElementType
}

function titleClass(variant: TitleVariant) {
  if (variant === 'page') return 'text-4xl md:text-6xl leading-[0.98] tracking-[-0.05em]'
  if (variant === 'section') return 'text-[1.9rem] md:text-[2.35rem] leading-[1.05] tracking-[-0.04em]'
  if (variant === 'lead') return 'text-[2rem] md:text-[2.7rem] leading-[1.02] tracking-[-0.045em]'
  return 'text-[1.45rem] md:text-[1.85rem] leading-[1.08] tracking-[-0.035em]'
}

export function Eyebrow<T extends ElementType = 'p'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'p' as T)
  return <Component data-slot="eyebrow" className={cn('font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]', className)} {...props}>{children}</Component>
}

export function Display<T extends ElementType = 'h1'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'h1' as T)
  return <Component data-slot="display" className={cn('max-w-4xl text-balance text-4xl font-[820] leading-[0.96] tracking-[-0.055em] text-[var(--ink-strong)] md:text-6xl', className)} {...props}>{children}</Component>
}

export function H1<T extends ElementType = 'h1'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'h1' as T)
  return <Component data-slot="h1" className={cn('scroll-m-20 text-balance text-[2.35rem] font-[820] tracking-[-0.045em] text-[var(--ink-strong)] md:text-[3.35rem]', className)} {...props}>{children}</Component>
}

export function H2<T extends ElementType = 'h2'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'h2' as T)
  return <Component data-slot="h2" className={cn('scroll-m-20 border-b border-[var(--rule)] pb-2 text-[1.85rem] font-bold tracking-[-0.04em] text-[var(--ink-strong)] first:mt-0', className)} {...props}>{children}</Component>
}

export function H3<T extends ElementType = 'h3'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'h3' as T)
  return <Component data-slot="h3" className={cn('scroll-m-20 text-[1.45rem] font-bold tracking-[-0.03em] text-[var(--ink-strong)]', className)} {...props}>{children}</Component>
}

export function H4<T extends ElementType = 'h4'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'h4' as T)
  return <Component data-slot="h4" className={cn('scroll-m-20 text-[1.15rem] font-semibold tracking-[-0.02em] text-[var(--ink-strong)]', className)} {...props}>{children}</Component>
}

export function Title<T extends ElementType = 'h2'>({ as, className, children, variant = 'card', ...props }: TypographyProps<T> & { variant?: TitleVariant }) {
  const Component = elementFor(as, 'h2' as T)
  return <Component data-slot="title" className={cn('text-balance font-[780] text-[var(--ink-strong)]', titleClass(variant), className)} {...props}>{children}</Component>
}

export function Lead<T extends ElementType = 'p'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'p' as T)
  return <Component data-slot="lead" className={cn('max-w-3xl text-pretty text-[1.02rem] leading-8 text-[var(--ink-soft)] md:text-[1.08rem]', className)} {...props}>{children}</Component>
}

export function P<T extends ElementType = 'p'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'p' as T)
  return <Component data-slot="p" className={cn('leading-8 text-[var(--ink-soft)] [&:not(:first-child)]:mt-6', className)} {...props}>{children}</Component>
}

export function Body<T extends ElementType = 'p'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'p' as T)
  return <Component data-slot="body" className={cn('text-pretty text-[0.99rem] leading-8 text-[var(--ink-soft)]', className)} {...props}>{children}</Component>
}

export function Blockquote<T extends ElementType = 'blockquote'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'blockquote' as T)
  return <Component data-slot="blockquote" className={cn('mt-6 border-l-2 border-[var(--rule-strong)] pl-6 italic text-[var(--ink-soft)]', className)} {...props}>{children}</Component>
}

export function List({ className, children, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul data-slot="list" className={cn('my-6 ml-6 list-disc [&>li]:mt-2 [&>li]:leading-8 [&>li]:text-[var(--ink-soft)]', className)} {...props}>{children}</ul>
}

export function Code<T extends ElementType = 'code'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'code' as T)
  return <Component data-slot="code" className={cn('rounded-[0.45rem] bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--ink-strong)]', className)} {...props}>{children}</Component>
}

export function Meta<T extends ElementType = 'p'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'p' as T)
  return <Component data-slot="meta" className={cn('font-mono text-[0.8rem] leading-6 tracking-[-0.01em] text-[var(--ink-faint)]', className)} {...props}>{children}</Component>
}

export function Label<T extends ElementType = 'span'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'span' as T)
  return <Component data-slot="label" className={cn('font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-faint)]', className)} {...props}>{children}</Component>
}

export function Small<T extends ElementType = 'small'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'small' as T)
  return <Component data-slot="small" className={cn('text-[0.82rem] font-medium leading-none text-[var(--ink-faint)]', className)} {...props}>{children}</Component>
}

export function Muted<T extends ElementType = 'p'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'p' as T)
  return <Component data-slot="muted" className={cn('text-[0.92rem] text-[var(--ink-faint)]', className)} {...props}>{children}</Component>
}

export function Prose<T extends ElementType = 'div'>({ as, className, children, ...props }: TypographyProps<T>) {
  const Component = elementFor(as, 'div' as T)
  return <Component data-slot="prose" className={cn('prose-flow', className)} {...props}>{children}</Component>
}
