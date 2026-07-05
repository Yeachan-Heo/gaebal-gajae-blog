import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MarkdownBlock, MarkdownSnippet } from '@/components/ui/markdown'
import { ReadingMeta } from '@/components/ui/reading-meta'
import { SectionHeader } from '@/components/ui/section-header'
import { Body, Eyebrow, Lead, Meta, Prose, Title } from '@/components/ui/typography'

import { LocalizedText, textFor, type LangMap } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import {
  getBodyBlocks,
  getLaneByKey,
  getOwningLane,
  langs,
  renderMarkdownBlockHtml,
  ui,
} from '@/lib/site-ui.mjs'

export type ProofSignalItem = {
  key: string
  label: LangMap
  textByLang: LangMap
}

export type PostItem = {
  slug: string
  date: string
  type: string
  title: LangMap
  summary: LangMap
  body?: Record<string, string[]>
  localizedBody?: Record<string, string[]>
  proofSignals?: ProofSignalItem[]
  translationStatus?: { badge?: LangMap; message?: LangMap } | null
}

export type ProjectItem = {
  slug: string
  date: string
  name: string
  title: LangMap
  summary: LangMap
  body?: Record<string, string[]>
  localizedBody?: Record<string, string[]>
  previewImage?: string
  heroImage?: string
  characterImage?: string
  detailImage?: string
}

function stripLeadHeading(block = '') {
  const lines = String(block).split('\n')
  const first = String(lines[0] || '').trim()

  if (!/^(?:\[[^\]]+\]\s*)?(#{1,6}|\d+\.)\s+/.test(first)) {
    return String(block).trim()
  }

  const remainder = lines.slice(1).join('\n').trim()
  if (remainder) return remainder
  return first.replace(/^(?:\[[^\]]+\]\s*)?(#{1,6}|\d+\.)\s+/, '').trim()
}

function initialVisibleLang() {
  if (typeof document === 'undefined') return 'ko'
  return document.documentElement.lang || 'ko'
}

function LocalizedMarkdownSnippet({ map, tone = 'default' }: { map: LangMap; tone?: 'default' | 'evidence' }) {
  return (
    <>
      {langs.map((lang) => {
        const source = stripLeadHeading(textFor(map, lang))
        return (
          <MarkdownSnippet
            key={lang}
            tone={tone}
            html={renderMarkdownBlockHtml(source)}
            className="mt-1"
            data-lang-block={lang}
            hidden={lang !== initialVisibleLang()}
          />
        )
      })}
    </>
  )
}


export function LaneBadge({ map }: { map: LangMap }) {
  return <Badge variant="lane"><LocalizedText map={map} /></Badge>
}

export function ProofSignalList({ signals, featured = false, tone = 'default' }: { signals: ProofSignalItem[]; featured?: boolean; tone?: 'default' | 'evidence' }) {
  return (
    <ul className="grid gap-3">
      {signals.slice(0, featured ? 3 : 2).map((signal) => (
        <li
          key={signal.key}
          className={cn(
            'rounded-2xl border px-4 py-3',
            tone === 'evidence'
              ? 'border-[var(--evidence-rule)] bg-[var(--surface-evidence-chip)]'
              : 'border-[var(--rule)]/80 bg-[var(--surface-soft)]',
          )}
        >
          <Eyebrow className={cn(tone === 'evidence' ? 'text-[var(--ink-terminal)]' : 'text-[var(--ink-faint)]')}><LocalizedText map={signal.label} /></Eyebrow>
          <LocalizedMarkdownSnippet map={signal.textByLang} tone={tone} />
        </li>
      ))}
    </ul>
  )
}

export function PostCard({ post, featured = false }: { post: PostItem; featured?: boolean }) {
  const lane = getOwningLane(post)
  return (
    <Card href={`/posts/${post.slug}.html`} variant={featured ? 'strong' : 'default'} className="group block transition hover:-translate-y-0.5">
      <CardHeader>
        {featured ? <LaneBadge map={lane.label} /> : null}
        <ReadingMeta parts={[post.date, lane.label]} />
        <Title as="h3" variant={featured ? 'lead' : 'card'} className="group-hover:text-[var(--accent)]">
          <LocalizedText map={post.title} />
        </Title>
        {featured ? (
          <CardAction>
            <Button href={`/posts/${post.slug}.html`} variant="subtle" size="sm"><LocalizedText map={ui.open} /></Button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        {featured ? (
          <Lead className="max-w-3xl text-[1.02rem]"><LocalizedText map={post.summary} /></Lead>
        ) : (
          <CardDescription><LocalizedText map={post.summary} /></CardDescription>
        )}
        {post.proofSignals?.length ? <ProofSignalList signals={post.proofSignals as ProofSignalItem[]} featured={featured} /> : null}
      </CardContent>
      {featured ? (
        <CardFooter>
          <Button href={`/posts/${post.slug}.html`} variant="secondary" size="sm"><LocalizedText map={ui.readLog} /></Button>
        </CardFooter>
      ) : null}
    </Card>

  )
}


export function LaneCard({ laneKey, count, description }: { laneKey: 'reflection' | 'tip' | 'behind'; count: number; description: LangMap }) {
  const lane = getLaneByKey(laneKey)!
  return (
    <Card href={lane.route} size="sm" className="block transition hover:-translate-y-0.5">
      <CardContent className="space-y-4">
        <ReadingMeta parts={[String(count), { ko: '글', en: 'entries', zh: '篇', ja: '本' }]} />
        <Title as="h3" variant="card"><LocalizedText map={lane.label} /></Title>
        <CardDescription><LocalizedText map={description} /></CardDescription>
      </CardContent>
    </Card>

  )
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const preview = project.previewImage || project.heroImage || project.characterImage
  return (
    <Card href={`/projects/${project.slug}.html`} variant="evidence" className="group block overflow-hidden transition hover:-translate-y-0.5">
      {preview ? (
        <div className="relative aspect-[2.5/1] overflow-hidden border-b border-[var(--evidence-rule)]">
          <img src={preview} alt={`${project.name} preview`} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        </div>
      ) : null}
      <CardHeader>
        <ReadingMeta parts={[project.date, project.name]} />
        <Title as="h3" variant="card" className="text-[var(--ink-terminal)]"><LocalizedText map={project.title} /></Title>
      </CardHeader>
      <CardContent>
        <Body className="text-[var(--ink-terminal-soft)]"><LocalizedText map={project.summary} /></Body>
      </CardContent>
      <CardFooter>
        <Button href={`/projects/${project.slug}.html`} variant="subtle" size="sm"><LocalizedText map={ui.openProject} /></Button>
      </CardFooter>
    </Card>
  )
}


function MarkdownBodyBlock({ html }: { html: string }) {
  return <MarkdownBlock html={html} />
}


export function LangBlocks({ item, project = false }: { item: PostItem | ProjectItem; project?: boolean }) {
  return (
    <>
      {langs.map((lang) => {
        const blocks = getBodyBlocks(item, lang)
        return (
          <Prose key={lang} data-lang-block={lang} hidden={lang !== initialVisibleLang()} className={cn('space-y-6', project ? 'project-prose' : 'article-prose')}>
            {blocks.map((block, index) => <MarkdownBodyBlock key={`${lang}-${index}`} html={renderMarkdownBlockHtml(block)} />)}
          </Prose>

        )
      })}
    </>
  )
}


export function TranslationNote({ post }: { post: PostItem }) {
  const status = post.translationStatus as { badge?: LangMap; message?: LangMap } | null
  if (!status?.badge && !status?.message) return null
  return (
    <Card variant="evidence" size="sm" className="mt-6 rounded-2xl">
      <CardContent className="space-y-3">
        {status.badge ? <Badge variant="verified" size="sm"><LocalizedText map={status.badge} /></Badge> : null}
        {status.message ? <Meta className="text-[var(--ink-terminal-soft)]"><LocalizedText map={status.message} /></Meta> : null}
      </CardContent>
    </Card>

  )
}


export function PostNavLink({ href, kicker, title, alignRight = false }: { href: string; kicker: LangMap; title: LangMap; alignRight?: boolean }) {
  return (
    <Card href={href} size="sm" className={cn('block transition hover:-translate-y-0.5', alignRight && 'md:text-right')}>
      <CardContent className="space-y-2">
        <Eyebrow><LocalizedText map={kicker} /></Eyebrow>
        <Title as="strong" variant="card" className="block"><LocalizedText map={title} /></Title>
      </CardContent>
    </Card>
  )
}

export { Button, ReadingMeta, SectionHeader, Badge, LocalizedText }
