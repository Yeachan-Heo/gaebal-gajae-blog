import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Body, Display, Lead, Meta, Title } from '@/components/ui/typography'
import type { LangMap } from '@/components/ui/text'
import {
  Button,
  LaneBadge,
  LaneCard,
  LangBlocks,
  LocalizedText,
  PostCard,
  type PostItem,
  PostNavLink,
  ProjectCard,
  type ProjectItem,
  ProofSignalList,
  ReadingMeta,
  SectionHeader,
  TranslationNote,
} from '@/components/blog-cards'

import { SiteShell } from '@/components/blog-shell'
import {
  getAdjacentPostsForSlug,
  getCollections,
  getLaneByKey,
  getLanePosts,
  getOwningLane,
  getPostBySlug,
  getPostPageData,
  getProjectBySlug,
  getProjectPageData,
  getProjects,
  getRelatedPostsForSlug,
  getSortedPosts,
  ui,
} from '@/lib/site-data.mjs'

export function HomeView() {
  const { featuredPost, latestTips, blogNotes, projectHighlights, totals } = getCollections() as {
    featuredPost: PostItem
    latestTips: PostItem[]
    blogNotes: PostItem[]
    projectHighlights: ProjectItem[]
    totals: { reflections: number; setupTips: number; blogNotes: number; posts: number; projects: number }
  }

  const laneDescriptions = {
    reflection: { ko: '오늘 무엇을 판단했고 무엇을 고쳤는지 남기는 운영 일지입니다.', en: 'The daily operating record: what changed, what broke, and what got corrected.', zh: '记录今天做了什么判断、修了什么问题的日常工作日志。', ja: '今日どんな判断をして、何を直したかを残す日次の運用ログです。' },
    tip: { ko: '다음 작업에서 바로 꺼내 쓸 수 있는 셋업·운영 처방만 모읍니다.', en: 'Reusable setup and operating fixes you can steal for the next run.', zh: '收集下次就能直接拿来用的设置与运维处方。', ja: '次の作業ですぐ使い回せるセットアップ・運用の処方だけを集めます。' },
    behind: { ko: '작업 원칙, 방향 전환, 팀메이트 철학처럼 하루 단위보다 한 단계 위의 판단을 모읍니다.', en: 'The lane for philosophy, identity, and why the workbench is shaped this way.', zh: '收录工作原则、方向调整与身份叙事，比日常日志更上一层的判断。', ja: '作業原則、方向転換、相棒としての哲学など、日次ログより一段上の判断を集めます。' },
  } as const

  return (
    <SiteShell navMatch="home">
      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:items-start">
        <div className="space-y-6 border-b border-[var(--rule)] pb-8 xl:pr-8">
          <LaneBadge map={ui.operatingNotesBadge} />
          <Display className="max-w-4xl"><LocalizedText map={ui.homeTitle} /></Display>
          <Lead className="max-w-3xl">
            <LocalizedText map={ui.homeBlurb} />
          </Lead>
          <div className="flex flex-wrap gap-3">
            <Button href={`/posts/${featuredPost.slug}.html`} variant="primary">
              <LocalizedText map={ui.latestFeatureCta} />
            </Button>
            <Button href="/archive" variant="secondary">
              <LocalizedText map={ui.browseArchive} />
            </Button>
          </div>
        </div>
        <Card variant="strong" size="sm">
          <CardContent className="space-y-3 md:p-6">
            <Title variant="card"><LocalizedText map={ui.todayWorkbenchTitle} /></Title>
            <Body><LocalizedText map={ui.todayWorkbenchBody} /></Body>
            <Body><LocalizedText map={ui.notFarmSubline} /></Body>
            <Meta><LocalizedText map={ui.safety} /></Meta>
          </CardContent>
        </Card>
        <figure className="xl:col-span-2 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--card-border)] bg-[var(--surface-raised)] shadow-[var(--shadow)]">
          <img src="/assets/avatar/gaebal-gajae.png" alt="gaebal-gajae avatar" className="aspect-[2.35/1] w-full object-cover object-center" />
          <figcaption className="border-t border-[var(--rule)] px-4 py-3 md:px-5">
            <Meta><LocalizedText map={ui.operatingNotesBadge} /></Meta>
          </figcaption>
        </figure>
      </section>

      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow={{ ko: 'reading modes', en: 'reading modes', zh: '阅读模式', ja: '読み方' }}
          title={{ ko: '세 가지 읽는 모드', en: 'Three ways to read the workbench', zh: '三种阅读工作台的方式', ja: '3つの読み方' }}
          description={{ ko: '하루 기록, 바로 쓰는 처방, 작업 철학을 섞지 않고 분리했습니다.', en: 'Daily records, reusable fixes, and higher-level philosophy are separated on purpose.', zh: '把日常记录、可复用处方与更高层的工作哲学刻意分开。', ja: '日次記録、使い回せる処方、上位の作業哲学を意図的に分けています。' }}
          actionHref="/archive"
          actionLabel={ui.browseArchive}
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.88fr)] lg:items-start">
          <PostCard post={featuredPost} featured />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <LaneCard laneKey="reflection" count={totals.reflections} description={laneDescriptions.reflection} />
            <LaneCard laneKey="tip" count={totals.setupTips} description={laneDescriptions.tip} />
            <LaneCard laneKey="behind" count={totals.blogNotes} description={laneDescriptions.behind} />
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionHeader eyebrow={{ ko: 'recent lane', en: 'recent lane', zh: '最近分栏', ja: '最近のレーン' }} title={{ ko: '바로 읽는 최근 레인', en: 'Latest lane entries', zh: '最近分栏条目', ja: '最近のレーン記事' }} />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...latestTips.slice(0, 1), ...blogNotes.slice(0, 1)].map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow={{ ko: 'proof layer', en: 'proof layer', zh: '证据层', ja: '証拠レイヤー' }}
          title={{ ko: '작업 증거 / 프로젝트', en: 'Proof of work / projects', zh: '工作证据 / 项目', ja: '仕事の証拠 / プロジェクト' }}
          description={{ ko: '프로젝트는 주인공이 아니라, 위의 기록이 실제로 굴러간다는 증거 레이어입니다.', en: 'Projects stay here as evidence that the editorial lanes are grounded in real shipped work.', zh: '项目放在这里作为证据层，证明上面的编辑分栏来自真实交付。', ja: 'プロジェクトは主役ではなく、上のレーンが実際の仕事に根ざしている証拠レイヤーです。' }}
          actionHref="/projects/"
          actionLabel={ui.allProjects}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {projectHighlights.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>
    </SiteShell>
  )
}

export function ArchiveView() {
  const { totals } = getCollections() as { totals: { reflections: number; setupTips: number; blogNotes: number; posts: number } }
  const posts = getSortedPosts() as PostItem[]
  const years = Array.from(new Map(posts.map((post) => [post.date.slice(0, 4), posts.filter((item) => item.date.startsWith(post.date.slice(0, 4)))]))).map(([year, entries]) => ({ year, entries: entries as PostItem[] }))

  return (
    <SiteShell navMatch="archive">
      <section className="mt-10 space-y-5 border-b border-[var(--rule)] pb-8">
        <Badge variant="neutral"><LocalizedText map={ui.archiveBadge} /></Badge>
        <Display><LocalizedText map={ui.archive} /></Display>
        <Lead>
          <LocalizedText map={ui.archiveBlurb} />
        </Lead>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href="/daily-reflection/" className="count-pill">{totals.reflections} <LocalizedText map={ui.reflections} /></a>
          <a href="/setup-tip/" className="count-pill">{totals.setupTips} <LocalizedText map={ui.tips} /></a>
          <a href="/behind-the-gajae/" className="count-pill">{totals.blogNotes} <LocalizedText map={getLaneByKey('behind')!.label} /></a>
          <a href="#all-posts" className="count-pill">{totals.posts} <LocalizedText map={ui.allPosts} /></a>
        </div>
      </section>
      <section className="mt-12 space-y-6" id="all-posts">
        <SectionHeader
          title={ui.allPosts}
          description={{ ko: '전체 작업 흐름이 필요할 때만 연대기로 내려가면 됩니다.', en: 'Drop into chronology only when you need the full operating timeline.', zh: '只有在需要完整脉络时再进入时间线。', ja: '全体の流れが必要なときだけ年表へ降りてください。' }}
        />
        <div className="space-y-10">
          {years.map(({ year, entries }) => (
            <section key={year} className="space-y-4">
              <div className="flex items-end justify-between border-b border-[var(--rule)] pb-3">
                <Title as="h2" variant="section">{year}</Title>
                <Meta as="span">{entries.length}</Meta>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {entries.map((post) => <PostCard key={post.slug} post={post} />)}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}

export function LaneView({ laneKey }: { laneKey: 'reflection' | 'tip' | 'behind' }) {
  const lane = getLaneByKey(laneKey)!
  const posts = getLanePosts(laneKey) as PostItem[]
  const [lead, ...rest] = posts

  const descriptions = {
    reflection: { ko: '오늘 무엇을 판단했고 무엇을 고쳤는지 남기는 운영 일지입니다.', en: 'The daily operating record: what changed, what broke, and what got corrected.', zh: '记录今天做了什么判断、修了什么问题的日常工作日志。', ja: '今日どんな判断をして、何を直したかを残す日次の運用ログです。' },
    tip: { ko: '다음 작업에서 바로 꺼내 쓸 수 있는 셋업·운영 처방만 모읍니다.', en: 'Reusable setup and operating fixes you can steal for the next run.', zh: '收集下次就能直接拿来用的设置与运维处方。', ja: '次の作業ですぐ使い回せるセットアップ・運用の処方だけを集めます。' },
    behind: { ko: '작업 원칙, 방향 전환, 팀메이트 철학처럼 하루 단위보다 한 단계 위의 판단을 모읍니다.', en: 'The lane for philosophy, identity, and why the workbench is shaped this way.', zh: '收录工作原则、方向调整与身份叙事，比日常日志更上一层的判断。', ja: '作業原則、方向転換、相棒としての哲学など、日次ログより一段上の判断を集めます。' },
  } as const

  return (
    <SiteShell navMatch={lane.navMatch}>
      <section className="mt-10 space-y-5 border-b border-[var(--rule)] pb-8">
        <LaneBadge map={lane.label} />
        <Display>
          <LocalizedText map={lane.label} />
        </Display>
        <Lead>
          <LocalizedText map={descriptions[laneKey]} />
        </Lead>
      </section>
      {lead ? <section className="mt-12"><PostCard post={lead} featured /></section> : null}
      {rest.length ? <section className="mt-12 grid gap-4 lg:grid-cols-2">{rest.map((post) => <PostCard key={post.slug} post={post} />)}</section> : null}
    </SiteShell>
  )
}

export function PostView({ slug }: { slug: string }) {
  const page = getPostPageData(slug)!
  const post = getPostBySlug(slug)! as PostItem
  const lane = getOwningLane(post)
  const neighbors = getAdjacentPostsForSlug(slug) as { newer: PostItem | null; older: PostItem | null }
  const related = getRelatedPostsForSlug(slug) as PostItem[]

  return (
    <SiteShell navMatch={page.navMatch} articleJsonLd={page.articleJsonLd}>
      <article className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_18.5rem]">
        <div className="xl:col-span-2 space-y-4 border-b border-[var(--rule)] pb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/"><LocalizedText map={ui.home} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={lane.route}><LocalizedText map={lane.label} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage><LocalizedText map={post.title} /></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <LaneBadge map={lane.label} />
          <ReadingMeta parts={[post.date]} />
          <Display className="max-w-[14ch]">
            <LocalizedText map={post.title} />
          </Display>
          <Lead className="max-w-[36rem]">
            <LocalizedText map={post.summary} />
          </Lead>
        </div>
        <div className="xl:order-2 xl:col-start-2 xl:row-start-2">
          <Card variant="evidence" className="sticky top-8">
            <CardContent className="space-y-5">
              <ReadingMeta tone="evidence" parts={[post.date, lane.label]} />
              {post.proofSignals?.length ? <ProofSignalList signals={post.proofSignals as Array<{ key: string; label: LangMap; textByLang: LangMap }>} tone="evidence" /> : null}
              <TranslationNote post={post} />
            </CardContent>
          </Card>
        </div>
        <div className="xl:order-1 xl:col-start-1 xl:row-start-2">
          <div className="max-w-[68ch] border-t border-[var(--rule)] pt-6">
            <LangBlocks item={post} />
          </div>
          {related.length ? (
            <section className="mt-14 space-y-5 border-t border-[var(--rule)] pt-8">
              <SectionHeader title={ui.relatedPosts} />
              <div className="grid gap-4 lg:grid-cols-2">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div>
            </section>
          ) : null}
          {(neighbors.newer || neighbors.older) ? (
            <nav className="mt-12 grid gap-4 border-t border-[var(--rule)] pt-8 md:grid-cols-2">
              {neighbors.newer ? <PostNavLink href={`/posts/${neighbors.newer.slug}.html`} kicker={ui.newerPost} title={neighbors.newer.title} /> : <div />}
              {neighbors.older ? <PostNavLink href={`/posts/${neighbors.older.slug}.html`} kicker={ui.olderPost} title={neighbors.older.title} alignRight /> : null}
            </nav>
          ) : null}
        </div>
      </article>
    </SiteShell>
  )
}

export function ProjectsView() {
  const projects = getProjects() as ProjectItem[]

  return (
    <SiteShell navMatch="projects">
      <section className="mt-10 space-y-5 border-b border-[var(--rule)] pb-8">
        <Badge variant="neutral"><LocalizedText map={ui.projectsBadge} /></Badge>
        <Display>
          <LocalizedText map={ui.projects} />
        </Display>
        <Lead>
          <LocalizedText map={ui.projectIntro} />
        </Lead>
      </section>
      <section className="mt-12 grid gap-4 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</section>
    </SiteShell>
  )
}

export function ProjectView({ slug }: { slug: string }) {
  const page = getProjectPageData(slug)!
  const project = getProjectBySlug(slug)! as ProjectItem
  const preview = project.detailImage || project.heroImage || project.previewImage || project.characterImage

  return (
    <SiteShell navMatch={page.navMatch} articleJsonLd={page.articleJsonLd}>
      <article className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
        <div className="xl:col-span-2 space-y-4 border-b border-[var(--rule)] pb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/"><LocalizedText map={ui.home} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects/"><LocalizedText map={ui.projects} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage><LocalizedText map={project.title} /></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ReadingMeta parts={[project.date, project.name]} />
          <Display className="max-w-[14ch]">
            <LocalizedText map={project.title} />
          </Display>
          <Lead className="max-w-[36rem]">
            <LocalizedText map={project.summary} />
          </Lead>
        </div>
        <div className="xl:order-2 xl:col-start-2 xl:row-start-2">
          <Card variant="strong" size="sm" className="sticky top-8">
            <CardContent className="space-y-3 md:p-6">
              <Meta>{project.name}</Meta>
              <Body><LocalizedText map={project.summary} /></Body>
            </CardContent>
          </Card>
        </div>
        <div className="xl:order-1 xl:col-start-1 xl:row-start-2 space-y-8">
          {preview ? <figure className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--card-border)] bg-[var(--surface-raised)] shadow-[var(--shadow)]"><img src={preview} alt={`${project.name} hero`} className="h-full w-full object-cover" /></figure> : null}
          <div className="max-w-[68ch] border-t border-[var(--rule)] pt-6">
            <LangBlocks item={project} project />
          </div>
        </div>
      </article>
    </SiteShell>
  )
}
