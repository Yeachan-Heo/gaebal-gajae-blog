import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function NavigationBar({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      data-slot="navigation-bar"
      className={cn('sticky top-4 z-20 flex flex-col gap-3 rounded-[1.15rem] border border-[var(--card-border)] bg-[var(--surface)] p-2 shadow-[var(--shadow)] md:flex-row md:items-center md:justify-between', className)}
      {...props}
    >
      {children}
    </nav>
  )
}

export function NavigationList({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="navigation-list" className={cn('flex flex-wrap gap-1.5', className)} {...props}>{children}</div>
}

export function NavigationActions({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="navigation-actions" className={cn('flex flex-wrap items-center gap-1.5', className)} {...props}>{children}</div>
}

export function NavigationGroup({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="navigation-group" className={cn('flex flex-wrap gap-1 rounded-[0.95rem] border border-[var(--rule-muted)] bg-[var(--surface-soft)] p-1', className)} {...props}>{children}</div>
}

export function NavigationLink({ active = false, className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; active?: boolean; children: ReactNode }) {
  return (
    <a
      data-slot="navigation-link"
      data-active={active ? 'true' : 'false'}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-[0.9rem] border px-3 py-2 text-[0.82rem] font-semibold tracking-[-0.01em] transition',
        active ? 'border-[var(--card-border-accent)] bg-[var(--surface-nav-active)] text-[var(--ink-strong)]' : 'border-transparent text-[var(--ink-soft)] hover:border-[var(--rule-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--ink-strong)]',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export function NavigationButton({ active = false, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      data-slot="navigation-button"
      data-active={active ? 'true' : 'false'}
      className={cn(
        'rounded-[0.8rem] px-2.5 py-1.5 text-[0.78rem] font-semibold tracking-[-0.01em] transition',
        active ? 'text-[var(--ink-strong)]' : 'text-[var(--ink-soft)] hover:text-[var(--ink-strong)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function NavigationIconButton({ active = false, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      data-slot="navigation-icon-button"
      data-active={active ? 'true' : 'false'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-[0.9rem] border border-[var(--rule-muted)] bg-[var(--surface-soft)] text-sm text-[var(--ink-soft)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--ink-strong)]',
        active ? 'border-[var(--card-border-accent)] bg-[var(--surface-nav-active)] text-[var(--ink-strong)]' : '',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
