import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Small } from '@/components/ui/typography'

export function Breadcrumb({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav data-slot="breadcrumb" aria-label="breadcrumb" className={className} {...props}>{children}</nav>
}

export function BreadcrumbList({ className, children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol data-slot="breadcrumb-list" className={cn('flex flex-wrap items-center gap-2', className)} {...props}>{children}</ol>
}

export function BreadcrumbItem({ className, children, ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-2', className)} {...props}>{children}</li>
}

export function BreadcrumbLink({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  return <a data-slot="breadcrumb-link" className={cn('text-[var(--ink-faint)] hover:text-[var(--link)]', className)} {...props}><Small as="span">{children}</Small></a>
}

export function BreadcrumbPage({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span data-slot="breadcrumb-page" aria-current="page" className={cn('text-[var(--ink-strong)]', className)} {...props}><Small as="span">{children}</Small></span>
}

export function BreadcrumbSeparator({ className, children = '·', ...props }: HTMLAttributes<HTMLSpanElement> & { children?: ReactNode }) {
  return <span data-slot="breadcrumb-separator" aria-hidden="true" className={cn('text-[var(--ink-faint)]', className)} {...props}>{children}</span>
}