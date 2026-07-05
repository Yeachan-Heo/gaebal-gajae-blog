import type { Cell, PreviewCard as PreviewCardData, TripleRow } from '@/lib/foundry-data';

import clsx from 'clsx';
import type { ReactNode } from 'react';

function cellText(value: Cell): string {
  return typeof value === 'string' ? value : value.ko || value.en || Object.values(value)[0] || '';
}

export function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="space-y-5" id={id}>
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--ink-strong)]">{title}</h2>
        <p className="max-w-3xl text-base leading-7 text-[var(--ink-soft)]">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function DataTable({ headers, rows }: { headers: string[]; rows: TripleRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[36rem] w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="border-b border-[var(--muted-rule-strong)] pb-2 text-left text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={cellText(a)}>
              <th scope="row" className="border-b border-[var(--muted-rule)] py-3 pr-4 text-left align-top text-[var(--ink-strong)]">
                {cellText(a)}
              </th>
              <td className="border-b border-[var(--muted-rule)] py-3 align-top text-[var(--ink-soft)]">{cellText(b)}</td>
              <td className="border-b border-[var(--muted-rule)] py-3 align-top text-[var(--ink-soft)]">{cellText(c)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SwatchCard({ token, description }: { token: string; description: Cell }) {

  return (
    <article className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--muted-rule)] bg-[color-mix(in_srgb,var(--paper-sheet-raised)_90%,transparent)] p-4">
      <div className="h-16 rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--muted-rule-strong)_70%,transparent)]" style={{ background: `var(--${token})` }} />
      <div className="grid gap-1">
        <strong className="text-[var(--ink-strong)]">{token}</strong>
        <code className="text-sm text-[var(--ink-soft)]">{`var(--${token})`}</code>
        <p className="text-sm leading-6 text-[var(--ink-soft)]">{cellText(description)}</p>

      </div>
    </article>
  );
}

function cardClassName(card: PreviewCardData) {
  return clsx(
    'card component-guide p-4',
    `card-variant-${card.variant}`,
    card.modifiers?.includes('featured') && 'card-featured',
    card.modifiers?.includes('with-rail') && 'card-with-rail',
    card.modifiers?.includes('with-corner') && 'card-with-corner',
    card.modifiers?.includes('wide') && 'md:col-span-2'
  );
}

export function PreviewCard({ card }: { card: PreviewCardData }) {
  return (
    <article className={cardClassName(card)}>
      <p className="preview-type-label">{card.label}</p>
      <h3 className="text-3xl font-black tracking-tight text-[var(--ink-strong)]">{cellText(card.title)}</h3>
      <p className="font-bold leading-7 text-[var(--ink-strong)]">{cellText(card.role)}</p>
      {card.legend ? (
        <div className="flex flex-wrap gap-2">
          {card.legend.map((item) => (
            <span key={cellText(item)} className="badge ui-badge status-stamp status-stamp-neutral">{cellText(item)}</span>
          ))}
        </div>
      ) : null}
      {card.bullets ? (
        <ul className="grid gap-2 pl-5 text-[var(--ink-soft)]">
          {card.bullets.map((item) => (
            <li key={cellText(item)}>{cellText(item)}</li>
          ))}
        </ul>
      ) : null}
      <p className="text-[var(--ink-soft)]"><strong className="text-[var(--ink-strong)]">허용 차이:</strong> {cellText(card.note)}</p>
    </article>
  );
}
