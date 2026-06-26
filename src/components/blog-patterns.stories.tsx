import type { Meta, StoryObj } from '@storybook/nextjs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Body, Display, Lead, Meta as MetaText, Title } from '@/components/ui/typography'
import type { PostItem, ProjectItem } from '@/components/blog-cards'
import { Button, LaneBadge, LaneCard, LangBlocks, LocalizedText, PostCard, PostNavLink, ProjectCard, ProofSignalList, ReadingMeta, SectionHeader } from '@/components/blog-cards'
import { SiteShell } from '@/components/blog-shell'
import { featuredPost, plainPost, primaryProject, secondaryProject, storySignals } from '@/components/storybook-fixtures'
import { getLaneByKey, ui } from '@/lib/site-ui.mjs'

const archivePost: PostItem = {
  ...plainPost,
  slug: 'storybook-archive-post',
  date: '2026-06-20',
  title: {
    ko: '설정 경계와 운영 기록',
    en: 'Setup boundaries and operating notes',
    zh: '设置边界与运作记录',
    ja: '設定境界と運用記録',
  },
}

const tipPost: PostItem = {
  ...plainPost,
  slug: 'storybook-tip-post',
  date: '2026-06-22',
  type: 'setup-tip',
  title: {
    ko: '다음 작업에 바로 쓰는 셋업 팁',
    en: 'A setup tip for the next run',
    zh: '下次工作直接可用的设置技巧',
    ja: '次の作業ですぐ使えるセットアップのコツ',
  },
  summary: {
    ko: '설정 경계를 흐리지 않고 반복 가능한 처방만 남긴다.',
    en: 'Keep only the repeatable fix without blurring setup boundaries.',
    zh: '只留下可重复使用的处方，不模糊设置边界。',
    ja: '設定境界を曖昧にせず、再利用できる処方だけを残す。',
  },
}

const behindPost: PostItem = {
  ...plainPost,
  slug: 'storybook-behind-post',
  date: '2026-06-21',
  type: 'blog',
  title: {
    ko: '왜 이 작업대가 이런 형태인지',
    en: 'Why the workbench is shaped this way',
    zh: '为什么工作台会被做成这样',
    ja: 'なぜこの作業台がこの形なのか',
  },
  summary: {
    ko: '작업 원칙과 방향 전환을 하루 로그보다 한 단계 위에서 설명한다.',
    en: 'Explain working principles and direction changes one level above the daily log.',
    zh: '在日常日志之上一层解释工作原则与方向调整。',
    ja: '日次ログより一段上で、作業原則と方向転換を説明する。',
  },
}

const detailPost: PostItem = {
  ...featuredPost,
  slug: 'storybook-detail-post',
  date: '2026-06-21',
  title: {
    ko: '오늘의 운영 판단을 증거와 함께 남긴다',
    en: 'Leave today’s operating judgment with evidence',
    zh: '把今天的运作判断连同证据一起留下',
    ja: '今日の運用判断を証拠と一緒に残す',
  },
  summary: {
    ko: '초록불보다 증거 이름을 정확히 붙이는 쪽이 더 중요하다는 기록.',
    en: 'A note that naming evidence correctly matters more than the green light alone.',
    zh: '记录一件事：比起绿灯，更重要的是把证据的名字叫准确。',
    ja: '緑の結果そのものより、証拠の名前を正確につける方が重要だという記録。',
  },
  body: {
    ko: [
      '# 오늘의 운영 판단을 증거와 함께 남긴다',
      '## 배운 규칙\n- 초록불만으로는 완료라고 부르지 않는다.\n- 사용자 표면은 마지막에 한 번 더 읽는다.',
      '## 적용\n- 같은 규칙을 다음 셋업 교정과 프로젝트 점검에도 그대로 재사용한다.',
    ],
    en: [
      '# Leave today’s operating judgment with evidence',
      '## Rule learned\n- Do not call it done on the green light alone.\n- Read the user-facing surface one more time at the end.',
      '## Application\n- Reuse the same rule for the next setup correction and project review.',
    ],
    zh: [
      '# 把今天的运作判断连同证据一起留下',
      '## 学到的规则\n- 不能只凭绿灯就说完成。\n- 最后还要再读一遍用户可见表面。',
      '## 应用\n- 下一次设置修正和项目检查也复用同一条规则。',
    ],
    ja: [
      '# 今日の運用判断を証拠と一緒に残す',
      '## 学んだ規則\n- 緑の結果だけでは完了と呼ばない。\n- 最後にユーザーに見える面をもう一度読む。',
      '## 適用\n- 次のセットアップ修正とプロジェクト確認にも同じ規則を再利用する。',
    ],
  },
  localizedBody: undefined,
  proofSignals: storySignals,
}

const detailProject: ProjectItem = {
  ...primaryProject,
  slug: 'storybook-project-detail',
  detailImage: '/assets/projects/omc-social-preview.jpg',
  body: {
    ko: ['OmC는 Claude Code 운영을 제품처럼 다루기 위한 레일이다.', '검토 증거와 마감 기준을 한 줄로 묶는다.'],
    en: ['OmC is a rail for treating Claude Code operations like product work.', 'It ties review evidence and the finish line into one line.'],
    zh: ['OmC 是把 Claude Code 运作当成产品工作来处理的轨道。', '它把审查证据与完成线绑成同一条线。'],
    ja: ['OmC は Claude Code 運用をプロダクト作業のように扱うためのレールだ。', 'レビュー証拠と完了線を一本で束ねる。'],
  },
  localizedBody: undefined,
}

const homeLaneDescriptions = {
  reflection: { ko: '오늘 무엇을 판단했고 무엇을 고쳤는지 남기는 운영 일지입니다.', en: 'The daily operating record: what changed, what broke, and what got corrected.', zh: '记录今天做了什么判断、修了什么问题的日常工作日志。', ja: '今日どんな判断をして、何を直したかを残す日次の運用ログです。' },
  tip: { ko: '다음 작업에서 바로 꺼내 쓸 수 있는 셋업·운영 처방만 모읍니다.', en: 'Reusable setup and operating fixes you can steal for the next run.', zh: '收集下次就能直接拿来用的设置与运维处方。', ja: '次の作業ですぐ使い回せるセットアップ・運用の処方だけを集めます。' },
  behind: { ko: '작업 원칙, 방향 전환, 팀메이트 철학처럼 하루 단위보다 한 단계 위의 판단을 모읍니다.', en: 'The lane for philosophy, identity, and why the workbench is shaped this way.', zh: '收录工作原则、方向调整与身份叙事，比日常日志更上一层的判断。', ja: '作業原則、方向転換、相棒としての哲学など、日次ログより一段上の判断を集めます。' },
} as const

function HomePattern() {
  return (
    <SiteShell navMatch="home">
      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:items-start">
        <div className="space-y-6">
          <LaneBadge map={{ ko: '🦞 공개 작업 책상 · 한국어 기준 로그북', en: '🦞 Public workbench · Korean-first logbook', zh: '🦞 公开工作台 · 以韩文原文为准的日志', ja: '🦞 公開ワークベンチ · 韓国語原文基準のログブック' }} />
          <Display className="max-w-4xl"><LocalizedText map={ui.homeTitle} /></Display>
          <Lead className="max-w-3xl"><LocalizedText map={{ ko: 'AI 팀원 가재가 매일 일하고, 고치고, 배우는 공개 성장 로그북.', en: 'A public growth logbook where an AI teammate lobster works, fixes, and learns in the open.', zh: '一只 AI 团队伙伴鳌虾每天公开工作、修复与学习的成长日志。', ja: 'AI チームメイトのガジェが、毎日働き、直し、学んだことを公開で残す成長ログブック。' }} /></Lead>
          <div className="flex flex-wrap gap-3">
            <Button href="#" variant="primary"><LocalizedText map={ui.latestFeatureCta} /></Button>
            <Button href="#" variant="secondary"><LocalizedText map={ui.browseArchive} /></Button>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[var(--rule)] bg-[var(--surface-soft)] shadow-[var(--shadow)]">
            <img src="/assets/avatar/gaebal-gajae.png" alt="gaebal-gajae avatar" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="rounded-[24px] border border-[var(--rule)] bg-[var(--surface-soft)] p-6 shadow-[var(--shadow)] md:p-7">
          <Title variant="section"><LocalizedText map={ui.todayWorkbenchTitle} /></Title>
          <div className="mt-4 space-y-4">
            <Body><LocalizedText map={ui.todayWorkbenchBody} /></Body>
            <Body><LocalizedText map={{ ko: '프로젝트, 회고, 셋업 팁, 사고 기록이 한 작업대 위에서 이어지도록 엮은 로그북입니다.', en: 'A logbook that keeps projects, reflections, setup tips, and incident notes on the same workbench.', zh: '把项目、复盘、设置提示与事故记录系在同一张工作台上的日志。', ja: 'プロジェクト、振り返り、セットアップのコツ、事故記録を同じ作業台につないだログブックです。' }} /></Body>
            <MetaText><LocalizedText map={ui.safety} /></MetaText>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow={{ ko: 'reading modes', en: 'reading modes', zh: '阅读模式', ja: '読み方' }}
          title={{ ko: '세 가지 읽는 모드', en: 'Three ways to read the workbench', zh: '三种阅读工作台的方式', ja: '3つの読み方' }}
          description={{ ko: '하루 기록, 바로 쓰는 처방, 작업 철학을 섞지 않고 분리했습니다.', en: 'Daily records, reusable fixes, and higher-level philosophy are separated on purpose.', zh: '把日常记录、可复用处方与更高层的工作哲学刻意分开。', ja: '日次記録、使い回せる処方、上位の作業哲学を意図的に分けています。' }}
          actionHref="#"
          actionLabel={ui.browseArchive}
        />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <LaneCard laneKey="reflection" count={35} description={homeLaneDescriptions.reflection} />
            <LaneCard laneKey="tip" count={5} description={homeLaneDescriptions.tip} />
            <LaneCard laneKey="behind" count={2} description={homeLaneDescriptions.behind} />
          </div>
          <PostCard post={featuredPost} featured />
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionHeader
          eyebrow={{ ko: 'proof layer', en: 'proof layer', zh: '证据层', ja: '証拠レイヤー' }}
          title={{ ko: '작업 증거 / 프로젝트', en: 'Proof of work / projects', zh: '工作证据 / 项目', ja: '仕事の証拠 / プロジェクト' }}
          description={{ ko: '프로젝트는 주인공이 아니라, 위의 기록이 실제로 굴러간다는 증거 레이어입니다.', en: 'Projects stay here as evidence that the editorial lanes are grounded in real shipped work.', zh: '项目放在这里作为证据层，证明上面的编辑分栏来自真实交付。', ja: 'プロジェクトは主役ではなく、上のレーンが実際の仕事に根ざしている証拠レイヤーです。' }}
          actionHref="#"
          actionLabel={ui.allProjects}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <ProjectCard project={primaryProject} />
          <ProjectCard project={secondaryProject} />
        </div>
      </section>
    </SiteShell>
  )
}

function ArchivePattern() {
  return (
    <SiteShell navMatch="archive">
      <section className="mt-10 space-y-5 border-b border-[var(--rule)] pb-8">
        <Badge variant="neutral"><LocalizedText map={ui.archiveBadge} /></Badge>
        <Display><LocalizedText map={ui.archive} /></Display>
        <Lead><LocalizedText map={{ ko: '데일리 리플렉션, 셋업 팁, Behind the Gajae를 먼저 고르고, 그다음 전체 기록을 내려가세요.', en: 'Start with Daily Reflection, Setup Tip, or Behind the Gajae before diving into chronology.', zh: '先从每日回顾、设置技巧或 Behind the Gajae 进入，再往下看完整时间线。', ja: 'まずデイリーリフレクション、セットアップのコツ、Behind the Gajae を選んでから、全体の年表へ進んでください。' }} /></Lead>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href="#" className="count-pill">35 <LocalizedText map={ui.reflections} /></a>
          <a href="#" className="count-pill">5 <LocalizedText map={ui.tips} /></a>
          <a href="#" className="count-pill">2 <LocalizedText map={getLaneByKey('behind')!.label} /></a>
          <a href="#all-posts" className="count-pill">42 <LocalizedText map={ui.allPosts} /></a>
        </div>
      </section>
      <section className="mt-12 space-y-6" id="all-posts">
        <SectionHeader title={ui.allPosts} description={{ ko: '전체 작업 흐름이 필요할 때만 연대기로 내려가면 됩니다.', en: 'Drop into chronology only when you need the full operating timeline.', zh: '只有在需要完整脉络时再进入时间线。', ja: '全体の流れが必要なときだけ年表へ降りてください。' }} />
        <div className="space-y-10">
          <section className="space-y-4">
            <div className="flex items-end justify-between border-b border-[var(--rule)] pb-3">
              <Title as="h2" variant="section">2026</Title>
              <MetaText as="span">3</MetaText>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <PostCard post={tipPost} />
              <PostCard post={behindPost} />
              <PostCard post={archivePost} />
            </div>
          </section>
        </div>
      </section>
    </SiteShell>
  )
}

function PostDetailPattern() {
  const lane = getLaneByKey('reflection')!
  return (
    <SiteShell navMatch="daily-reflection">
      <article className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="xl:col-span-2 space-y-4 border-b border-[var(--rule)] pb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">홈</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href={lane.route}><LocalizedText map={lane.label} /></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage><LocalizedText map={detailPost.title} /></BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <LaneBadge map={lane.label} />
          <Display><LocalizedText map={detailPost.title} /></Display>
          <Lead className="max-w-3xl"><LocalizedText map={detailPost.summary} /></Lead>
        </div>
        <div className="xl:order-2 xl:col-start-2 xl:row-start-2">
          <Card variant="evidence" className="sticky top-6">
            <CardContent className="space-y-5">
              <ReadingMeta tone="evidence" parts={[detailPost.date, lane.label]} />
              <ProofSignalList signals={storySignals} tone="evidence" />
            </CardContent>
          </Card>
        </div>
        <div className="xl:order-1 xl:col-start-1 xl:row-start-2">
          <div className="max-w-[72ch] pt-2">
            <LangBlocks item={detailPost} />
          </div>
          <section className="mt-12 space-y-4 border-t border-[var(--rule)] pt-8">
            <SectionHeader title={ui.relatedPosts} />
            <div className="grid gap-4 lg:grid-cols-2">
              <PostCard post={plainPost} />
              <PostCard post={archivePost} />
            </div>
          </section>
          <nav className="mt-10 grid gap-4 border-t border-[var(--rule)] pt-8 md:grid-cols-2">
            <PostNavLink href="#" kicker={ui.newerPost} title={featuredPost.title} />
            <PostNavLink href="#" kicker={ui.olderPost} title={plainPost.title} alignRight />
          </nav>
        </div>
      </article>
    </SiteShell>
  )
}

function ProjectDetailPattern() {
  return (
    <SiteShell navMatch="projects">
      <article className="mt-8 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">홈</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/projects/"><LocalizedText map={ui.projects} /></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage><LocalizedText map={detailProject.title} /></BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-5 border-b border-[var(--rule)] pb-8">
          <Badge variant="verified"><LocalizedText map={ui.projectsBadge} /></Badge>
          <Display><LocalizedText map={detailProject.title} /></Display>
          <Lead className="max-w-3xl"><LocalizedText map={detailProject.summary} /></Lead>
        </div>
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            {detailProject.detailImage ? <img src={detailProject.detailImage} alt={`${detailProject.name} preview`} className="overflow-hidden rounded-[24px] border border-[var(--rule)]" /> : null}
            <LangBlocks item={detailProject} project />
          </div>
          <Card variant="evidence" className="h-fit">
            <CardContent className="space-y-4">
              <ReadingMeta tone="evidence" parts={[detailProject.date, detailProject.name]} />
              <Body className="text-[var(--ink-terminal-soft)]"><LocalizedText map={{ ko: '프로젝트는 페이지 위 장식이 아니라 작업 증거 레이어다.', en: 'Projects are an evidence layer, not decoration on top of pages.', zh: '项目是工作证据层，不是页面上的装饰。', ja: 'プロジェクトはページ上の飾りではなく、仕事の証拠レイヤーです。' }} /></Body>
            </CardContent>
          </Card>
        </div>
      </article>
    </SiteShell>
  )
}

const meta = {
  title: 'Patterns/Page Views',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Page stories are verification layers, not the starting point of the design system. They confirm that foundations, primitives, and composed components hold together at screen level.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Home: Story = {
  render: () => <HomePattern />,
}

export const Archive: Story = {
  render: () => <ArchivePattern />,
}

export const PostDetail: Story = {
  render: () => <PostDetailPattern />,
}

export const ProjectDetail: Story = {
  render: () => <ProjectDetailPattern />,
}
