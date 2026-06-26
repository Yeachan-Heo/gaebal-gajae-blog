import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MarkdownSnippet } from '@/components/ui/markdown'
import { NavigationActions, NavigationBar, NavigationButton, NavigationGroup, NavigationIconButton, NavigationLink, NavigationList } from '@/components/ui/navigation'
import { ReadingMeta } from '@/components/ui/reading-meta'
import { Body, Eyebrow, H1, Lead, Meta as MetaText, Title } from '@/components/ui/typography'
import { LocalizedText, type LangMap } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { tokenGroups, type TokenGroup, type TokenSwatch } from '../../foundry/src/lib/foundry-data'

const foundationsStoryText = {
  eyebrow: { ko: 'Foundations', en: 'Foundations', zh: '基础层', ja: '基礎レイヤー' },
  title: { ko: '토큰 칩보다 먼저 테마 사용 순서를 본다', en: 'Read theme usage order before token chips', zh: '先看主题使用顺序，再看 token 色块', ja: 'token チップより先にテーマの使い方の順序を見る' },
  body: { ko: 'gajae-code 테마는 색칩부터 읽지 않는다. 먼저 바닥과 프레임이 깔리고, 그 위에 현재 상태와 링크가 올라오고, 마지막에 증거 슬랩이 분리된다. 이 보드도 그 사용 순서부터 읽는다.', en: 'gajae-code themes are not read chip-first. The field and frame land first, current state and links rise next, and evidence is separated into its own slab last. This board follows that usage order first.', zh: 'gajae-code 的主题不是从色块开始阅读的。先铺开底面与框架，再抬起当前状态与链接，最后把证据分进独立 slab。这块板也先按这个顺序读。', ja: 'gajae-code のテーマはチップから読むものではない。まず地面とフレームが敷かれ、その上に現在状態とリンクが乗り、最後に証拠が独立 slab へ分かれる。このボードもその使用順序から読む。' },
  boardNoteTitle: { ko: '이 보드의 순서', en: 'Board order', zh: '这块板的顺序', ja: 'このボードの順序' },
  boardNoteBody: { ko: '긴 설명보다 먼저 다섯 단계 순서를 잡아두고, 아래 specimen에서 실제 표면 차이를 확인한다.', en: 'Anchor the five-step order first, then inspect the real surface differences in the specimens below.', zh: '先记住下面这五步顺序，再到 specimen 里确认真实表面差异。', ja: '長い説明より先に下の五段階を押さえ、そのあと specimen で実際の面の差を確認する。' },
  orderStripTitle: { ko: '읽는 순서', en: 'Reading order', zh: '阅读顺序', ja: '読む順序' },
  orderStripItems: [
    { ko: '바닥 / 프레임', en: 'Field / frame', zh: '底面 / 框架', ja: '地面 / フレーム' },
    { ko: '현재 상태', en: 'Current state', zh: '当前状态', ja: '現在状態' },
    { ko: '메시지 / 툴', en: 'Message / tool', zh: '消息 / 工具', ja: 'message / tool' },
    { ko: '본문 / 마크다운', en: 'Prose / markdown', zh: '正文 / markdown', ja: '本文 / markdown' },
    { ko: '증거 슬랩', en: 'Evidence slab', zh: '证据 slab', ja: '証拠 slab' },
  ],
  usageOrderEyebrow: { ko: 'Usage order from gajae-code', en: 'Usage order from gajae-code', zh: '来自 gajae-code 的使用顺序', ja: 'gajae-code から見た使用順序' },
  usageOrderTitle: { ko: '코드에서 먼저 쓰이는 면과 상태를 따라간다', en: 'Follow the surfaces and states the code spends first', zh: '先沿着代码最先花出去的表面与状态阅读', ja: 'コードが先に使う面と状態を追って読む' },
  usageOrderBody: { ko: '아래 다섯 단계는 docs/theme.md와 실제 컴포넌트 사용을 다시 읽어서 정리한 흐름이다. welcome surface, status line, loader, markdown, message block이 어떤 토큰을 먼저 쓰는지 따라가면 블로그에서도 색을 함부로 늘리지 않게 된다.', en: 'These five steps come from rereading docs/theme.md and the actual component usage. Track which tokens the welcome surface, status line, loader, markdown, and message blocks spend first, and the blog stops inventing extra colors.', zh: '下面五步是重新读过 docs/theme.md 与实际组件用法后整理出的流程。只要跟着看 welcome surface、status line、loader、markdown、message block 先花哪些 token，博客就不会再凭空发明额外颜色。', ja: '下の五段階は docs/theme.md と実際のコンポーネント使用を読み直して整理した流れだ。welcome surface、status line、loader、markdown、message block がどの token を先に使うかを追えば、ブログでも色を勝手に増やさなくて済む。' },
  upstreamLabel: { ko: 'gajae-code source', en: 'gajae-code source', zh: 'gajae-code 来源', ja: 'gajae-code source' },
  blogMapLabel: { ko: '블로그 매핑', en: 'Blog mapping', zh: '博客映射', ja: 'ブログ側の対応' },
  roleLabel: { ko: '역할', en: 'Role', zh: '角色', ja: '役割' },
  readingLabel: { ko: '읽히는 방식', en: 'How it reads', zh: '阅读方式', ja: '読まれ方' },
  specimenLabel: { ko: '현재 테마 specimen', en: 'Current theme specimen', zh: '当前主题 specimen', ja: '現在のテーマ specimen' },
  usage: { ko: '실사용 예시', en: 'Real usage examples', zh: '实际使用示例', ja: '実使用例' },
  blueCrab: { ko: 'Blue Crab', en: 'Blue Crab', zh: 'Blue Crab', ja: 'Blue Crab' },
  redClaw: { ko: 'Red Claw', en: 'Red Claw', zh: 'Red Claw', ja: 'Red Claw' },
  token: { ko: '토큰', en: 'Token', zh: 'Token', ja: 'Token' },
  navHome: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  navArchive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  navProjects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  navThemeToggle: { ko: '테마 전환', en: 'Toggle theme', zh: '切换主题', ja: 'テーマ切替' },
  cardTitle: { ko: '기본 문서 표면', en: 'Base document surface', zh: '基础文档表面', ja: '基本文書サーフェス' },
  cardBody: { ko: '기본 읽기 표면은 조용하고 평평해야 한다. 올라오는 차이는 텍스트와 한 단계 lifted surface로만 해결한다.', en: 'The base reading surface should stay quiet and flat. Any added emphasis should come from text and one lifted step only.', zh: '基础阅读表面要安静、平整。额外强调只通过文字和抬高一级的表面解决。', ja: '基本の読む面は静かでフラットであるべきだ。追加の強調は文字と一段 lifted した面だけで解決する。' },
  inkTitle: { ko: '문장 위계는 색까지 포함해 분리한다', en: 'Hierarchy includes color, not just size', zh: '层级不只靠大小，也靠颜色', ja: '階層はサイズだけでなく色でも分ける' },
  inkBody: { ko: '강한 제목, 본문, 조용한 메타가 같은 잉크로 뭉개지면 시스템이 아니라 한 장 포스터처럼 보인다.', en: 'If headings, body text, and quiet meta collapse into one ink, the page reads like a single poster rather than a system.', zh: '如果标题、正文和安静 meta 挤成一种墨色，页面就会像一张海报，而不是系统。', ja: '見出し、本文、静かな meta が一つのインクに潰れると、ページはシステムではなく一枚のポスターに見える。' },
  accentNote: { ko: 'blue-crab 화면에서는 blue가, red-claw 화면에서는 red가 주도해야 한다. 둘을 한 화면 문법으로 섞으면 바로 중성적이고 AI SaaS 같은 냄새가 난다.', en: 'Blue should lead in blue-crab, and red should lead in red-claw. Blend them into one shared page language and the result goes flat and AI-SaaS immediately.', zh: 'blue-crab 画面该由 blue 主导，red-claw 画面该由 red 主导。把两者混成一套共通页面语言，结果立刻会变得扁平又像 AI SaaS。', ja: 'blue-crab の画面では青が、red-claw の画面では赤が主導しなければならない。両者を一つの共通ページ文法に混ぜると、すぐに平板で AI SaaS っぽくなる。' },
  accentLegend: { ko: 'accent는 문구를 과장하는 장식이 아니라 현재 위치와 행동 우선순위를 찍는 신호다. soft 톤은 뒤판만 만들고, 읽히는 의미는 라벨과 경계선이 맡는다.', en: 'Accent is not decoration that exaggerates copy. It marks current position and action priority. Soft tones only create the backplate; the label and border still carry the meaning.', zh: 'accent 不是夸大文案的装饰，而是标出当前位置与行动优先级的信号。soft 色只负责背板，真正的含义仍由标签与边框承担。', ja: 'accent は文言を誇張する装飾ではなく、現在位置と行動の優先順位を示す合図だ。soft トーンは背板を作るだけで、意味はラベルと境界線が担う。' },
  evidenceTitle: { ko: '증거는 본문이 아니라 별도 슬랩이다', en: 'Evidence is a slab, not body prose', zh: '证据不是正文，而是独立 slab', ja: '証拠は本文ではなく独立 slab だ' },
  evidenceBody: { ko: 'repo 메타, build 상태, proof snippet은 종이 카드와 경쟁하지 않게 graphite 슬랩으로 보낸다.', en: 'Repo metadata, build state, and proof snippets move into the graphite slab so they do not compete with the paper card.', zh: 'repo 元数据、build 状态和 proof snippet 要送进 graphite slab，别和纸面卡片抢注意力。', ja: 'repo メタ、build 状態、proof snippet は紙カードと競合しないよう graphite slab に送る。' },
  verified: { ko: '성공 상태', en: 'Success state', zh: '成功状态', ja: '成功状態' },
  warning: { ko: '주의 상태', en: 'Caution state', zh: '注意状态', ja: '注意状態' },
  primaryAction: { ko: '현재 대표 액션', en: 'Current primary action', zh: '当前主动作', ja: '現在の主要アクション' },
  secondaryAction: { ko: '보조 이동', en: 'Secondary navigation', zh: '辅助移动', ja: '補助ナビゲーション' },
  proofSnippet: {
    ko: '<p>build 로그와 proof signal은 본문 장식이 아니라 확인용 receipt다.</p><ul><li>PASS · build</li><li>repo · metadata</li></ul>',
    en: '<p>Build logs and proof signals are verification receipts, not decoration on top of the page.</p><ul><li>PASS · build</li><li>repo · metadata</li></ul>',
    zh: '<p>build 日志与 proof signal 是确认收据，不是页面装饰。</p><ul><li>PASS · build</li><li>repo · metadata</li></ul>',
    ja: '<p>build ログと proof signal はページ装飾ではなく確認用の receipt です。</p><ul><li>PASS · build</li><li>repo · metadata</li></ul>',
  },
} as const

const usageOrderSections = [
  {
    id: 'frame',
    title: { ko: '1. 작업대 바닥과 상단 바를 먼저 잡는다', en: '1. Land the field and top bar first', zh: '1. 先落工作台底面与顶栏', ja: '1. まず作業台の地面と上部バーを置く' },
    body: { ko: 'gajae-code는 pageBg, cardBg, statusLineBg, border로 먼저 화면 프레임을 만든다. 우리도 카드보다 먼저 배경·상단 바·구조선을 맞춘다.', en: 'gajae-code builds the frame first with pageBg, cardBg, statusLineBg, and border. The blog should do the same: background, top bar, and structure lines before card decoration.', zh: 'gajae-code 会先用 pageBg、cardBg、statusLineBg 与 border 搭出整张框架。博客也应该先把背景、顶栏与结构线定住，再谈卡片装饰。', ja: 'gajae-code は pageBg、cardBg、statusLineBg、border で先に画面の骨格を作る。ブログも同じで、カード装飾より先に背景・上部バー・構造線を決める。' },
    upstream: 'export.pageBg · export.cardBg · colors.border · colors.borderMuted · colors.statusLineBg',
    mapping: '--bg · --surface · --surface-nav · --rule · --rule-muted · --card-border',
  },
  {
    id: 'active',
    title: { ko: '2. 현재 위치와 CTA만 accent를 쓴다', en: '2. Spend accent on current state and CTA only', zh: '2. accent 只花在当前位置与 CTA 上', ja: '2. accent は現在位置と CTA にだけ使う' },
    body: { ko: 'welcome, loader, status line에서 accent는 항상 먼저 멈춰야 하는 상태에만 붙는다. 링크와 버튼도 그 규칙을 따라야 한다.', en: 'Across the welcome surface, loader, and status line, accent only marks the state that should stop the eye first. Buttons and links should follow the same discipline.', zh: '在 welcome surface、loader、status line 里，accent 都只标记最该先让视线停下来的状态。按钮与链接也要守同一条纪律。', ja: 'welcome surface、loader、status line では、accent は最初に目を止めるべき状態にだけ付く。ボタンとリンクも同じ規律に従う。' },
    upstream: 'colors.accent · colors.borderAccent · colors.link · colors.selectedBg',
    mapping: '--accent · --link · --surface-selected · --card-border-accent',
  },
  {
    id: 'message',
    title: { ko: '3. 메시지·유틸·툴 표면을 따로 살린다', en: '3. Keep message, utility, and tool surfaces distinct', zh: '3. 让 message / utility / tool 表面继续分开', ja: '3. message・utility・tool の面を分けて生かす' },
    body: { ko: 'theme docs에서 userMessageBg, customMessageBg, toolPendingBg는 다 따로 요구된다. 이 셋을 하나의 검은 카드로 합치면 TUI 계층이 사라진다.', en: 'Theme docs require userMessageBg, customMessageBg, and toolPendingBg as separate slots. Collapse them into one dark card and the TUI layering disappears.', zh: 'theme docs 明确把 userMessageBg、customMessageBg、toolPendingBg 分成不同槽位。把它们压成一张黑卡，TUI 的层级就没了。', ja: 'theme docs では userMessageBg、customMessageBg、toolPendingBg を別スロットとして要求している。これを一枚の暗いカードに潰すと TUI の階層が消える。' },
    upstream: 'colors.userMessageBg · colors.customMessageBg · colors.toolPendingBg · colors.toolTitle · colors.toolOutput',
    mapping: '--surface-soft · --surface-muted · --surface-code · --surface-evidence-chip · --ink-terminal-soft',
  },
  {
    id: 'prose',
    title: { ko: '4. 문장과 마크다운은 별도 잉크 규칙으로 읽힌다', en: '4. Prose and markdown follow their own ink rules', zh: '4. 正文与 markdown 走独立的墨色规则', ja: '4. 本文と markdown は独自のインク規則で読む' },
    body: { ko: 'gajae-code는 mdHeading, mdLink, mdCodeBlockBorder, muted, dim을 따로 나눠 둔다. 블로그도 제목·본문·메타·링크·인용선을 한 잉크로 뭉개면 안 된다.', en: 'gajae-code splits mdHeading, mdLink, mdCodeBlockBorder, muted, and dim. The blog should not flatten headings, body, meta, links, and quote rules into one ink.', zh: 'gajae-code 会把 mdHeading、mdLink、mdCodeBlockBorder、muted、dim 分开。博客也不能把标题、正文、meta、链接、引文线压成一团墨色。', ja: 'gajae-code は mdHeading、mdLink、mdCodeBlockBorder、muted、dim を分けている。ブログも見出し、本文、meta、リンク、引用線を一つのインクに潰してはいけない。' },
    upstream: 'colors.text · colors.muted · colors.dim · colors.mdHeading · colors.mdLink · colors.mdQuoteBorder',
    mapping: '--ink-strong · --ink-soft · --ink-faint · --link · --rule · --surface-code',
  },
  {
    id: 'evidence',
    title: { ko: '5. 증거와 receipt는 마지막 dark slab로 보낸다', en: '5. Move evidence and receipts into the final dark slab', zh: '5. 最后把证据与 receipt 送进 dark slab', ja: '5. 証拠と receipt は最後に dark slab へ送る' },
    body: { ko: 'tool blocks, diff, proof output은 본문과 같은 종이 위에 두지 않는다. gajae-code처럼 별도 dark slab와 terminal ink 계층으로 분리해야 확인용 정보로 읽힌다.', en: 'Tool blocks, diffs, and proof output do not live on the same paper as the body. They need their own dark slab and terminal ink hierarchy to read as verification material, just like gajae-code.', zh: 'tool blocks、diff、proof output 不应该和正文躺在同一张纸上。像 gajae-code 一样，把它们分到独立 dark slab 与 terminal ink 层里，才会被读成验证材料。', ja: 'tool blocks、diff、proof output は本文と同じ紙の上に置かない。gajae-code のように独立した dark slab と terminal ink の階層へ分けてこそ、確認用の情報として読まれる。' },
    upstream: 'colors.toolPendingBg · colors.toolTitle · colors.toolOutput · colors.mdCodeBlockBorder',
    mapping: '--surface-evidence · --surface-evidence-code · --evidence-rule · --ink-terminal · --ink-terminal-soft',
  },
] as const

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Audit the blog palette in the same order gajae-code spends theme colors in code: frame first, current state second, message/tool surfaces third, prose and markdown fourth, and evidence last. Then inspect the token board for the current crab theme.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>
type ThemeMode = 'blue-crab' | 'red-claw'

function currentStoryTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'blue-crab'
  return document.documentElement.dataset.theme === 'red-claw' ? 'red-claw' : 'blue-crab'
}

function currentStoryLang(): keyof typeof foundationsStoryText.proofSnippet {
  if (typeof document === 'undefined') return 'ko'
  const lang = document.documentElement.lang
  if (lang === 'en' || lang === 'zh' || lang === 'ja') return lang
  return 'ko'
}

function storyDividerColor() {
  return 'color-mix(in srgb, var(--ink-strong) 10%, transparent)'
}

function storyShellStyle() {
  return {
    background: 'color-mix(in srgb, var(--paper-sheet-soft) 24%, var(--bg))',
    borderColor: 'color-mix(in srgb, var(--ink-strong) 10%, transparent)',
    boxShadow: '0 0 0 1px color-mix(in srgb, var(--ink-strong) 4%, transparent), 0 0.7rem 1.45rem rgba(0, 0, 0, 0.2)',
  }
}

function quietPanelStyle() {
  return {
    background: 'color-mix(in srgb, var(--paper-sheet-soft) 68%, var(--surface) 32%)',
    borderColor: 'color-mix(in srgb, var(--ink-strong) 11%, transparent)',
    boxShadow: '0 0 0 1px color-mix(in srgb, var(--ink-strong) 3%, transparent), 0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  }
}

function specimenPanelStyle() {
  return {
    background: 'color-mix(in srgb, var(--surface-raised) 82%, var(--paper-canvas))',
    borderColor: 'color-mix(in srgb, var(--ink-strong) 12%, transparent)',
  }
}

function specimenFrame(token: string) {
  if (token === 'surface-evidence' || token === 'surface-evidence-soft' || token === 'surface-evidence-chip' || token === 'surface-evidence-code') {
    return {
      background: 'color-mix(in srgb, var(--surface-evidence) 78%, var(--paper-canvas))',
      borderColor: 'color-mix(in srgb, var(--ink-terminal) 14%, transparent)',
    }
  }

  return {
    background: 'color-mix(in srgb, var(--paper-sheet-soft) 18%, var(--paper-canvas))',
    borderColor: storyDividerColor(),
  }
}

function tokenPreviewBackground(token: string) {
  if (token === 'ink-inverse') return 'var(--accent)'
  if (token === 'ink-terminal' || token === 'ink-terminal-soft') return 'var(--surface-evidence)'
  if (token === 'link') return 'color-mix(in srgb, var(--surface-raised) 76%, var(--paper-sheet-soft))'
  return 'color-mix(in srgb, var(--surface-raised) 72%, var(--paper-sheet-soft))'
}

function tokenPreviewText(token: string) {
  if (token === 'ink-inverse') return 'var(--ink-inverse)'
  if (token === 'ink-terminal' || token === 'ink-terminal-soft') return `var(--${token})`
  return `var(--${token})`
}

function borderPreviewSurface(token: string) {
  return token === 'evidence-rule'
    ? 'color-mix(in srgb, var(--surface-evidence) 82%, var(--paper-canvas))'
    : 'color-mix(in srgb, var(--surface-raised) 78%, var(--paper-sheet-soft))'
}

function borderPreviewInk(token: string) {
  return token === 'evidence-rule' ? 'var(--ink-terminal-soft)' : 'var(--ink-soft)'
}

function surfaceRoleSpecimen(token: string) {
  if (token === 'surface-nav') {
    return (
      <div className="space-y-2 rounded-[0.95rem] border p-2.5" style={{ background: 'color-mix(in srgb, var(--paper-sheet-soft) 14%, var(--paper-canvas))', borderColor: storyDividerColor() }}>
        <div className="flex items-center justify-between rounded-[0.85rem] border px-2.5 py-2" style={{ background: 'var(--surface-nav)', borderColor: 'color-mix(in srgb, var(--ink-strong) 12%, transparent)' }}>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-[0.8rem] border px-3 py-2" style={{ background: 'var(--surface-selected)', borderColor: 'color-mix(in srgb, var(--accent) 56%, transparent)' }}>
              <span className="h-2 w-7 rounded-full" style={{ background: 'color-mix(in srgb, var(--ink-strong) 92%, transparent)' }} />
            </span>
            <span className="h-2 w-10 rounded-full" style={{ background: 'color-mix(in srgb, var(--ink-strong) 28%, transparent)' }} />
            <span className="h-2 w-8 rounded-full" style={{ background: 'color-mix(in srgb, var(--ink-strong) 22%, transparent)' }} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[0.75rem] border" style={{ background: 'color-mix(in srgb, var(--surface-nav-group) 82%, var(--paper-sheet-soft))', borderColor: 'color-mix(in srgb, var(--ink-strong) 14%, transparent)' }}>
              <span className="h-3.5 w-3.5 rounded-full border" style={{ borderColor: 'color-mix(in srgb, var(--ink-strong) 76%, transparent)' }} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-[0.8rem] border p-1" style={{ background: 'var(--surface-nav-group)', borderColor: 'color-mix(in srgb, var(--ink-strong) 14%, transparent)' }}>
              <span className="h-7 w-7 rounded-[0.65rem] border" style={{ background: 'var(--surface-selected)', borderColor: 'color-mix(in srgb, var(--accent) 52%, transparent)' }} />
              <span className="h-7 w-7 rounded-[0.65rem]" style={{ background: 'color-mix(in srgb, var(--ink-strong) 9%, transparent)' }} />
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (token === 'surface-nav-group') {
    return (
      <div className="space-y-2 rounded-[0.95rem] border p-2.5" style={{ background: 'color-mix(in srgb, var(--paper-sheet-soft) 14%, var(--paper-canvas))', borderColor: storyDividerColor() }}>
        <div className="flex items-center justify-end rounded-[0.85rem] border px-2 py-2" style={{ background: 'var(--surface-nav)', borderColor: 'color-mix(in srgb, var(--ink-strong) 12%, transparent)' }}>
          <div className="inline-flex items-center gap-1 rounded-[0.8rem] border p-1" style={{ background: 'var(--surface-nav-group)', borderColor: 'color-mix(in srgb, var(--ink-strong) 14%, transparent)' }}>
            <span className="h-7 w-7 rounded-[0.65rem] border" style={{ background: 'var(--surface-selected)', borderColor: 'color-mix(in srgb, var(--accent) 52%, transparent)' }} />
            <span className="h-7 w-7 rounded-[0.65rem]" style={{ background: 'color-mix(in srgb, var(--ink-strong) 9%, transparent)' }} />
            <span className="h-7 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
          </div>
        </div>
      </div>
    )
  }

  if (token === 'surface-selected') {
    return (
      <div className="space-y-2 rounded-[0.95rem] border p-2.5" style={{ background: 'color-mix(in srgb, var(--paper-sheet-soft) 14%, var(--paper-canvas))', borderColor: storyDividerColor() }}>
        <div className="flex items-center gap-2 rounded-[0.85rem] border p-2" style={{ background: 'var(--surface-nav)', borderColor: 'color-mix(in srgb, var(--ink-strong) 12%, transparent)' }}>
          <span className="space-y-1 rounded-[0.75rem] border px-2.5 py-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 52%, transparent)', background: 'var(--surface-selected)' }}>
            <span className="block h-2 w-[4.5rem] rounded-full" style={{ background: 'color-mix(in srgb, var(--ink-strong) 92%, transparent)' }} />
            <span className="block h-1 w-8 rounded-full" style={{ background: 'var(--accent)' }} />
          </span>
          <span className="h-8 w-[3.5rem] rounded-[0.75rem]" style={{ background: 'color-mix(in srgb, var(--ink-strong) 10%, transparent)' }} />
        </div>
      </div>
    )
  }

  if (token === 'accent-soft' || token === 'success-soft' || token === 'warning-soft') {
    const railToken = token === 'accent-soft' ? 'accent' : token === 'success-soft' ? 'success' : 'warning'
    return (
      <div className="rounded-[0.95rem] border p-3" style={{ background: 'color-mix(in srgb, var(--paper-sheet-soft) 18%, var(--paper-canvas))', borderColor: storyDividerColor() }}>
        <div className="rounded-[0.85rem] border p-3" style={{ background: 'color-mix(in srgb, var(--surface-raised) 84%, var(--paper-canvas))', borderColor: 'color-mix(in srgb, var(--ink-strong) 12%, transparent)' }}>
          <span className="mb-3 block h-1.5 w-12 rounded-full" style={{ background: `var(--${railToken})` }} />
          <div className="rounded-[0.8rem] border px-3 py-3" style={{ background: `var(--${token})`, borderColor: 'color-mix(in srgb, var(--ink-strong) 12%, transparent)' }}>
            <div className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1" style={{ borderColor: `var(--${railToken})`, background: 'color-mix(in srgb, var(--paper-canvas) 82%, transparent)' }}>
              <span className="h-2 w-8 rounded-full" style={{ background: `var(--${railToken})` }} />
              <span className="h-2 w-2 rounded-full" style={{ background: `var(--${railToken})` }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function PreviewGlyph({ swatch }: { swatch: TokenSwatch }) {
  if (swatch.preview === 'surface') {
    return <span className="h-6 w-6 rounded-[0.55rem] border" style={{ borderColor: storyDividerColor(), background: `var(--${swatch.token})` }} />
  }

  if (swatch.preview === 'border') {
    return <span className="h-6 w-6 rounded-[0.55rem] border-2" style={{ borderColor: `var(--${swatch.token})` }} />
  }

  return <span className="text-sm font-black tracking-[-0.04em]" style={{ color: `var(--${swatch.token})` }}>Aa</span>
}

function TokenSpecimen({ swatch }: { swatch: TokenSwatch }) {
  if (swatch.preview === 'surface') {
    const roleSpecimen = surfaceRoleSpecimen(swatch.token)
    if (roleSpecimen) return roleSpecimen

    const frame = specimenFrame(swatch.token)
    return (
      <div className="rounded-[1rem] border p-3" style={frame}>
        <div className="h-10 rounded-[0.8rem] border" style={{ borderColor: storyDividerColor(), background: `var(--${swatch.token})` }} />
      </div>
    )
  }

  if (swatch.preview === 'border') {
    return (
      <div
        className="rounded-[1rem] border-2 px-4 py-3"
        style={{ background: borderPreviewSurface(swatch.token), borderColor: `var(--${swatch.token})` }}
      >
        <p className="text-sm leading-6" style={{ color: borderPreviewInk(swatch.token) }}>
          <LocalizedText map={swatch.usage} />
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-[1rem] border px-4 py-3"
      style={{ background: tokenPreviewBackground(swatch.token), borderColor: storyDividerColor() }}
    >
      <p className="text-sm font-semibold leading-6" style={{ color: tokenPreviewText(swatch.token) }}>
        <LocalizedText map={swatch.usage} />
      </p>
    </div>
  )
}


function ThemeSpecimen({ swatch }: { swatch: TokenSwatch }) {
  const theme = currentStoryTheme()
  const label = theme === 'blue-crab' ? foundationsStoryText.blueCrab : foundationsStoryText.redClaw

  return (
    <div data-theme={theme} className="rounded-[1rem] border p-3" style={quietPanelStyle()}>
      <MetaText className="mb-2"><LocalizedText map={label} /></MetaText>
      <TokenSpecimen swatch={swatch} />
    </div>
  )
}

function PrimerSwatches({ group }: { group: TokenGroup }) {
  if (group.id === 'base-surfaces') {
    return (
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="h-3 w-11 rounded-full border" style={{ borderColor: 'var(--rule-muted)', background: 'var(--paper-canvas)' }} />
        <span className="h-3 w-11 rounded-full border" style={{ borderColor: 'var(--rule-muted)', background: 'var(--surface)' }} />
        <span className="h-3 w-11 rounded-full border" style={{ borderColor: 'var(--rule-muted)', background: 'var(--surface-soft)' }} />
        <span className="h-3 w-11 rounded-full border" style={{ borderColor: 'var(--rule-muted)', background: 'var(--surface-muted)' }} />
        <span className="h-3 w-11 rounded-full border" style={{ borderColor: 'var(--rule-muted)', background: 'var(--surface-selected)' }} />
      </div>
    )
  }

  if (group.id === 'ink') {
    return (
      <div className="mt-4 flex gap-2">
        <span className="inline-flex h-8 w-10 items-center justify-center rounded-[0.8rem] border border-[var(--rule-muted)] bg-[var(--surface-message)] text-sm font-black" style={{ color: 'var(--ink-strong)' }}>Aa</span>
        <span className="inline-flex h-8 w-10 items-center justify-center rounded-[0.8rem] border border-[var(--rule-muted)] bg-[var(--surface-message)] text-sm font-black" style={{ color: 'var(--ink-soft)' }}>Aa</span>
        <span className="inline-flex h-8 w-10 items-center justify-center rounded-[0.8rem] border border-[var(--rule-muted)] bg-[var(--surface-message)] text-sm font-black" style={{ color: 'var(--ink-faint)' }}>Aa</span>
      </div>
    )
  }

  if (group.id === 'accent-status') {
    return (
      <div className="mt-4 flex gap-2">
        <span className="h-8 w-10 rounded-[0.8rem] border" style={{ borderColor: 'var(--card-border-strong)', background: 'var(--accent)' }} />
        <span className="h-8 w-10 rounded-[0.8rem] border" style={{ borderColor: 'var(--warning)', background: 'var(--warning)' }} />
        <span className="h-8 w-10 rounded-[0.8rem] border" style={{ borderColor: 'var(--success)', background: 'var(--success)' }} />
      </div>
    )
  }

  return (
    <div className="mt-4 flex gap-2">
      <span className="h-8 w-12 rounded-[0.8rem] border" style={{ borderColor: 'var(--evidence-rule)', background: 'var(--surface-evidence)' }} />
      <span className="h-8 w-12 rounded-[0.8rem] border" style={{ borderColor: 'var(--evidence-rule)', background: 'var(--surface-evidence-chip)' }} />
      <span className="h-8 w-12 rounded-[0.8rem] border" style={{ borderColor: 'var(--evidence-rule)', background: 'var(--surface-evidence-code)' }} />
    </div>
  )
}

function PrimerCard({ group }: { group: TokenGroup }) {
  return (
    <div className="rounded-[1.15rem] border p-4" style={quietPanelStyle()}>
      <Eyebrow><LocalizedText map={group.title} /></Eyebrow>
      <Body className="mt-2 text-[0.92rem] leading-7"><LocalizedText map={group.description} /></Body>
      <PrimerSwatches group={group} />
    </div>
  )
}

function PalettePrimer() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {tokenGroups.map((group) => (
        <PrimerCard key={group.id} group={group} />
      ))}
    </div>
  )
}

type UsageSection = (typeof usageOrderSections)[number]

function UsageOrderExample({ id }: { id: UsageSection['id'] }) {
  if (id === 'frame') {
    return (
      <div className="space-y-3">
        <NavigationBar className="static top-0 p-1.5">
          <NavigationList>
            <NavigationLink href="#" active><LocalizedText map={foundationsStoryText.navHome} /></NavigationLink>
            <NavigationLink href="#"><LocalizedText map={foundationsStoryText.navArchive} /></NavigationLink>
          </NavigationList>
          <NavigationActions>
            <NavigationIconButton aria-label="theme" title="theme">◐</NavigationIconButton>
          </NavigationActions>
        </NavigationBar>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-[1rem] border border-[var(--card-border)] bg-[var(--surface)] p-3" />
          <div className="rounded-[1rem] border border-[var(--card-border-strong)] bg-[var(--surface-raised)] p-3" />
        </div>
      </div>
    )
  }

  if (id === 'active') {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <NavigationLink href="#" active><LocalizedText map={foundationsStoryText.navHome} /></NavigationLink>
          <NavigationLink href="#"><LocalizedText map={foundationsStoryText.navArchive} /></NavigationLink>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href="#" variant="primary" size="sm"><LocalizedText map={foundationsStoryText.primaryAction} /></Button>
          <span className="inline-flex items-center rounded-full border border-[var(--card-border-accent)] bg-[var(--surface-selected)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--ink-strong)]">Current</span>
        </div>
      </div>
    )
  }

  if (id === 'message') {
    return (
      <div className="grid gap-2 md:grid-cols-3">
        <div className="rounded-[0.95rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-3">
          <MetaText>userMessageBg</MetaText>
        </div>
        <div className="rounded-[0.95rem] border border-[var(--rule-muted)] bg-[var(--surface-muted)] p-3">
          <MetaText>customMessageBg</MetaText>
        </div>
        <div className="rounded-[0.95rem] border border-[var(--rule-muted)] bg-[var(--surface-code)] p-3">
          <MetaText>toolPendingBg</MetaText>
        </div>
      </div>
    )
  }

  if (id === 'prose') {
    return (
      <div className="rounded-[1rem] border border-[var(--card-border)] bg-[var(--surface)] p-4">
        <Title as="h3" variant="card">Markdown hierarchy</Title>
        <Body className="mt-2">Links, quote rails, code chips, and quiet meta should not collapse into one ink value.</Body>
        <Body className="mt-3"><a href="#">Inline link</a> and <code className="rounded-[0.45rem] bg-[var(--surface-code)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--ink-strong)]">code</code></Body>
        <blockquote className="mt-4 border-l-2 border-[var(--rule)] pl-4 text-[var(--ink-soft)]">Quote rails use the structure color, not the accent.</blockquote>
        <MetaText className="mt-3">muted · dim · mdHeading · mdLink</MetaText>
      </div>
    )
  }

  return (
    <Card variant="evidence" className="overflow-hidden">
      <CardHeader>
        <ReadingMeta parts={['PASS · build', 'repo · metadata']} />
        <Title as="h3" variant="card" className="text-[var(--ink-terminal)]"><LocalizedText map={foundationsStoryText.evidenceTitle} /></Title>
      </CardHeader>
      <CardContent className="space-y-4">
        <Body className="text-[var(--ink-terminal-soft)]"><LocalizedText map={foundationsStoryText.evidenceBody} /></Body>
        <MarkdownSnippet html={foundationsStoryText.proofSnippet[currentStoryLang()]} tone="evidence" />
      </CardContent>
    </Card>
  )
}

function UsageOrderBoard() {
  const theme = currentStoryTheme()
  const themeLabel = theme === 'blue-crab' ? foundationsStoryText.blueCrab : foundationsStoryText.redClaw

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <Eyebrow><LocalizedText map={foundationsStoryText.usageOrderEyebrow} /></Eyebrow>
        <Title variant="section" className="border-0 pb-0 text-[1.55rem] md:text-[1.9rem]"><LocalizedText map={foundationsStoryText.usageOrderTitle} /></Title>
        <Body className="max-w-4xl text-[0.93rem] leading-7"><LocalizedText map={foundationsStoryText.usageOrderBody} /></Body>
      </div>
      <div className="overflow-hidden rounded-[1.4rem] border" style={storyShellStyle()}>
        {usageOrderSections.map((section) => (
          <div key={section.id} className="grid gap-4 border-t px-5 py-5 first:border-t-0 xl:grid-cols-[17rem_minmax(0,1fr)_23rem]" style={{ borderTopColor: storyDividerColor() }}>

            <div className="space-y-2">
              <Title as="h3" variant="card" className="text-[0.96rem] tracking-[-0.03em]"><LocalizedText map={section.title} /></Title>
              <Body className="text-[0.9rem] leading-7"><LocalizedText map={section.body} /></Body>
            </div>
            <div className="space-y-3">
              <div>
                <MetaText><LocalizedText map={foundationsStoryText.upstreamLabel} /></MetaText>
                <code className="mt-1 block text-[0.78rem] text-[var(--ink-faint)]">{section.upstream}</code>
              </div>
              <div>
                <MetaText><LocalizedText map={foundationsStoryText.blogMapLabel} /></MetaText>
                <code className="mt-1 block text-[0.78rem] text-[var(--ink-faint)]">{section.mapping}</code>
              </div>
            </div>
            <div data-theme={theme} className="rounded-[1rem] border p-3" style={specimenPanelStyle()}>
              <MetaText className="mb-3"><LocalizedText map={themeLabel} /></MetaText>
              <UsageOrderExample id={section.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TokenRow({ swatch }: { swatch: TokenSwatch }) {
  return (
    <div className="grid gap-4 border-t px-5 py-5 first:border-t-0 xl:grid-cols-[17rem_minmax(0,1fr)_24rem]" style={{ borderTopColor: storyDividerColor() }}>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] border border-[var(--rule-muted)] bg-[var(--paper-canvas)]">
            <PreviewGlyph swatch={swatch} />
          </span>
          <div className="min-w-0 space-y-1">
            <Title as="h3" variant="card" className="text-[1.02rem] tracking-[-0.03em]">{swatch.token}</Title>
            <code className="block text-[0.82rem] text-[var(--ink-faint)]">{`var(--${swatch.token})`}</code>
          </div>
        </div>
        <Body className="text-[0.92rem] leading-7"><LocalizedText map={swatch.usage} /></Body>
      </div>
      <div className="space-y-2">
        <MetaText><LocalizedText map={foundationsStoryText.readingLabel} /></MetaText>
        <Body className="text-[0.93rem] leading-7"><LocalizedText map={swatch.description} /></Body>
      </div>
      <div>
        <ThemeSpecimen swatch={swatch} />
      </div>
    </div>
  )
}

function BaseExamples() {
  return (
    <div className="space-y-4">
      <NavigationBar className="static">
        <NavigationList>
          <NavigationLink href="#" active><LocalizedText map={foundationsStoryText.navHome} /></NavigationLink>
          <NavigationLink href="#"><LocalizedText map={foundationsStoryText.navArchive} /></NavigationLink>
          <NavigationLink href="#"><LocalizedText map={foundationsStoryText.navProjects} /></NavigationLink>
        </NavigationList>
        <NavigationActions>
          <NavigationIconButton aria-label="theme" title="theme">◐</NavigationIconButton>
          <NavigationGroup>
            <NavigationButton active>KO</NavigationButton>
            <NavigationButton>EN</NavigationButton>
          </NavigationGroup>
        </NavigationActions>
      </NavigationBar>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <Title as="h3" variant="card"><LocalizedText map={foundationsStoryText.cardTitle} /></Title>
          <Body className="mt-3"><LocalizedText map={foundationsStoryText.cardBody} /></Body>
        </Card>
        <Card variant="strong" className="p-5">
          <Title as="h3" variant="card"><LocalizedText map={groupExampleTitle('base-surfaces')} /></Title>
          <Body className="mt-3"><LocalizedText map={foundationsStoryText.cardBody} /></Body>
        </Card>
      </div>
    </div>
  )
}

function InkExamples() {
  return (
    <Card className="p-5">
      <Eyebrow><LocalizedText map={groupExampleTitle('ink')} /></Eyebrow>
      <Title as="h3" variant="lead" className="mt-3"><LocalizedText map={foundationsStoryText.inkTitle} /></Title>
      <Lead className="mt-3"><LocalizedText map={foundationsStoryText.inkBody} /></Lead>
      <Body className="mt-4"><LocalizedText map={foundationsStoryText.cardBody} /></Body>
      <MetaText className="mt-4">2026-06-24 · Daily Reflection · Public work log</MetaText>
    </Card>
  )
}

function AccentExamples() {
  return (
    <div className="space-y-4">
      <NavigationBar className="static top-0 p-1.5">
        <NavigationList>
          <NavigationLink href="#" active><LocalizedText map={foundationsStoryText.navHome} /></NavigationLink>
          <NavigationLink href="#"><LocalizedText map={foundationsStoryText.navArchive} /></NavigationLink>
          <NavigationLink href="#"><LocalizedText map={foundationsStoryText.navProjects} /></NavigationLink>
        </NavigationList>
        <NavigationActions>
          <NavigationIconButton aria-label="theme" title="theme" active>◐</NavigationIconButton>
        </NavigationActions>
      </NavigationBar>
      <div className="flex flex-wrap gap-3">
        <Button href="#" variant="primary"><LocalizedText map={foundationsStoryText.primaryAction} /></Button>
        <Button href="#" variant="secondary"><LocalizedText map={foundationsStoryText.secondaryAction} /></Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="verified"><LocalizedText map={foundationsStoryText.verified} /></Badge>
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em]" style={{ borderColor: 'color-mix(in srgb, var(--warning) 48%, var(--ink-soft))', background: 'color-mix(in srgb, var(--warning-soft) 45%, transparent)', color: 'color-mix(in srgb, var(--warning) 72%, var(--ink-strong))' }}>
          <LocalizedText map={foundationsStoryText.warning} />
        </span>
      </div>
      <Body className="text-[0.9rem] leading-7 text-[var(--ink-soft)]"><LocalizedText map={foundationsStoryText.accentLegend} /></Body>
    </div>
  )
}

function EvidenceExamples() {
  return (
    <Card variant="evidence" className="overflow-hidden">
      <CardHeader>
        <ReadingMeta parts={['2026-06-24', 'repo · metadata']} />
        <Title as="h3" variant="card" className="text-[var(--ink-terminal)]"><LocalizedText map={foundationsStoryText.evidenceTitle} /></Title>
      </CardHeader>
      <CardContent className="space-y-4">
        <Body className="text-[var(--ink-terminal-soft)]"><LocalizedText map={foundationsStoryText.evidenceBody} /></Body>
        <MarkdownSnippet html={foundationsStoryText.proofSnippet[currentStoryLang()]} tone="evidence" />
      </CardContent>
    </Card>
  )
}

function groupExampleTitle(id: TokenGroup['id']) {
  if (id === 'base-surfaces') return { ko: '표면과 내비 specimen', en: 'Surface and navigation specimen', zh: '表面与导航 specimen', ja: 'サーフェスとナビ specimen' }
  if (id === 'ink') return { ko: '본문 위계 specimen', en: 'Copy hierarchy specimen', zh: '正文层级 specimen', ja: '本文階層 specimen' }
  if (id === 'accent-status') return { ko: '행동과 상태 specimen', en: 'Action and status specimen', zh: '动作与状态 specimen', ja: '行動と状態 specimen' }
  return { ko: '증거 슬랩 specimen', en: 'Evidence slab specimen', zh: '证据层 specimen', ja: '証拠 slab specimen' }
}

function GroupExamples({ group }: { group: TokenGroup }) {
  const renderExample = () => {
    if (group.id === 'base-surfaces') return <BaseExamples />
    if (group.id === 'ink') return <InkExamples />
    if (group.id === 'accent-status') return <AccentExamples />
    return <EvidenceExamples />
  }

  return (
    <div className="space-y-3">
      <MetaText><LocalizedText map={foundationsStoryText.usage} /></MetaText>
      <Title as="h3" variant="card" className="text-[1.05rem]"><LocalizedText map={groupExampleTitle(group.id)} /></Title>
      <div data-theme={currentStoryTheme()} className="rounded-[1.15rem] border p-4" style={quietPanelStyle()}>
        <MetaText className="mb-3"><LocalizedText map={currentStoryTheme() === 'blue-crab' ? foundationsStoryText.blueCrab : foundationsStoryText.redClaw} /></MetaText>
        {renderExample()}
      </div>
    </div>
  )
}

function GroupSection({ group }: { group: TokenGroup }) {
  return (
    <section className="grid gap-6 border-t pt-10 first:border-t-0 first:pt-0 xl:grid-cols-[18rem_minmax(0,1fr)]" style={{ borderTopColor: storyDividerColor() }}>

      <div className="space-y-3 xl:sticky xl:top-8 xl:self-start">
        <Eyebrow><LocalizedText map={group.title} /></Eyebrow>
        <Title variant="section" className="border-0 pb-0 text-[1.55rem] md:text-[1.9rem]"><LocalizedText map={group.title} /></Title>
        <Body className="text-[0.93rem] leading-7"><LocalizedText map={group.description} /></Body>
      </div>
      <div className="space-y-5">
        <div className="overflow-hidden rounded-[1.4rem] border" style={storyShellStyle()}>
          <div className="hidden border-b px-5 py-3 xl:grid xl:grid-cols-[17rem_minmax(0,1fr)_24rem]" style={{ borderBottomColor: storyDividerColor() }}>
            <MetaText><LocalizedText map={foundationsStoryText.roleLabel} /></MetaText>
            <MetaText><LocalizedText map={foundationsStoryText.readingLabel} /></MetaText>
            <MetaText><LocalizedText map={foundationsStoryText.specimenLabel} /></MetaText>
          </div>
          <div>
            {group.tokens.map((swatch) => (
              <TokenRow key={swatch.token} swatch={swatch} />
            ))}
          </div>
        </div>
        <GroupExamples group={group} />
      </div>
    </section>
  )
}

function LedgerSheet({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto max-w-[1280px] space-y-10 rounded-[1.35rem] border p-6 md:p-8 lg:p-10', className)} style={storyShellStyle()}>{children}</div>
}

export const Palette: Story = {
  render: () => (
    <div className="px-6 py-8 md:px-8 md:py-10">
      <LedgerSheet>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-start">
          <div className="space-y-4">
            <Eyebrow><LocalizedText map={foundationsStoryText.eyebrow} /></Eyebrow>
            <H1 className="max-w-4xl text-[1.75rem] leading-[1.04] md:text-[2.3rem]"><LocalizedText map={foundationsStoryText.title} /></H1>
            <Lead className="max-w-[42rem] text-[0.92rem] leading-7"><LocalizedText map={foundationsStoryText.body} /></Lead>
          </div>
          <div className="rounded-[1.2rem] border p-5" style={quietPanelStyle()}>
            <Eyebrow><LocalizedText map={foundationsStoryText.orderStripTitle} /></Eyebrow>
            <ol className="mt-3 space-y-2">
              {foundationsStoryText.orderStripItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-[0.84rem] leading-6 text-[var(--ink-soft)]">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--rule-muted)] text-[0.7rem] font-bold text-[var(--ink-faint)]">
                    {index + 1}
                  </span>
                  <LocalizedText map={item} />
                </li>
              ))}
            </ol>
            <Body className="mt-4 text-[0.84rem] leading-6"><LocalizedText map={foundationsStoryText.boardNoteBody} /></Body>
          </div>
        </div>

        <UsageOrderBoard />

        <PalettePrimer />

        <div className="space-y-10">
          {tokenGroups.map((group) => (
            <GroupSection key={group.id} group={group} />
          ))}
        </div>
      </LedgerSheet>
    </div>
  ),
}
