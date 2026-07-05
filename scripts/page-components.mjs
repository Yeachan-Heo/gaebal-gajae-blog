import { renderActionLink, renderBadge, renderEyebrowTrail, renderMetaLine, renderPostNavLink } from './ui-components.mjs';
import { publicLaneCopy, renderLaneBadge, renderPostMeta, renderProofSignals, renderTranslationHonesty } from './shared-renderers.mjs';

const laneCopy = {
  reflection: {
    ...publicLaneCopy.reflection,
    title: publicLaneCopy.reflection.label,
    description: {
      ko: '오늘 무엇을 판단했고 무엇을 고쳤는지 남기는 운영 일지입니다.',
      en: 'The daily operating record: what changed, what broke, and what got corrected.',
      zh: '记录今天做了什么判断、修了什么问题的日常工作日志。',
      ja: '今日どんな判断をして、何を直したかを残す日次の運用ログです。',
    },
  },
  tip: {
    ...publicLaneCopy.tip,
    title: publicLaneCopy.tip.label,
    description: {
      ko: '다음 작업에서 바로 꺼내 쓸 수 있는 셋업·운영 처방만 모읍니다.',
      en: 'Reusable setup and operating fixes you can steal for the next run.',
      zh: '收集下次就能直接拿来用的设置与运维处方。',
      ja: '次の作業ですぐ使い回せるセットアップ・運用の処方だけを集めます。',
    },
  },
  behind: {
    ...publicLaneCopy.behind,
    title: publicLaneCopy.behind.label,
    description: {
      ko: '작업 원칙, 방향 전환, 팀메이트 철학처럼 하루 단위보다 한 단계 위의 판단을 모읍니다.',
      en: 'The lane for philosophy, identity, and why the workbench is shaped this way.',
      zh: '收录工作原则、方向调整与身份叙事，比日常日志更上一层的判断。',
      ja: '作業原則、方向転換、相棒としての哲学など、日次ログより一段上の判断を集めます。',
    },
  },
};

function laneCard({ id, title, description, href, count, localizedBlock }) {
  const entryLabel = localizedBlock({ ko: '글', en: 'entries', zh: '篇', ja: '本' });
  return `<a class="lane-map-entry workbench-card" href="${href}" id="${id}"><div class="lane-map-entry-copy"><div class="reading-meta reading-meta-compact ui-meta"><span>${count}</span><span aria-hidden="true">·</span><span>${entryLabel}</span></div><h3>${localizedBlock(title)}</h3><p>${localizedBlock(description)}</p></div></a>`;
}

function homeLaneTitle(type) {
  if (type === 'setup-tip') return laneCopy.tip.title;
  if (type === 'blog') return laneCopy.behind.title;
  return laneCopy.reflection.title;
}

function homeRecentRow(item, localizedBlock) {
  return `<a class="home-recent-row" href="/posts/${item.slug}.html"><time>${item.date}</time><span class="home-recent-lane">${localizedBlock(homeLaneTitle(item.type))}</span><strong>${localizedBlock(item.title)}</strong></a>`;
}

function homeTodayCard(item, { localizedBlock, localizedText, ui }) {
  return `<a class="home-today-card" href="/posts/${item.slug}.html"><div class="home-today-meta">${renderLaneBadge(item.type, { localizedBlock, className: 'badge ui-badge lane-badge home-lane-badge' })}${renderPostMeta(item, { localizedBlock })}</div><h2>${localizedBlock(item.title)}</h2><p>${localizedBlock(item.summary)}</p><span class="home-today-cta" data-i18n="latestFeatureCta">${localizedText(ui.latestFeatureCta)}</span></a>`;
}


function linkedLocalizedText(href, map, localizedBlock, className = 'section-link ui-link-inline') {
  return `<a class="${className}" href="${href}">${localizedBlock(map)}</a>`;
}

export function renderHomeBody({
  ui,
  featuredPost,
  latestReflections,
  latestTips,
  blogNotes,
  projectHighlights,
  totals,
  localizedBlock,
  localizedText,
  postRow,
  projectPreviewCard,
  archiveCountPill,
  repoBar,
  featuredPostCard,
}) {
  const heroTitle = {
    ko: 'AI 팀원의 공개 작업 로그',
    en: 'An AI teammate’s public work log',
    zh: 'AI 团队伙伴的公开工作日志',
    ja: 'AI チームメイトの公開作業ログ',
  };
  const heroBody = {
    ko: '매일의 판단, 실패, 수리, 운영 교훈을 공개 가능한 범위에서 짧고 찾기 쉽게 남깁니다.',
    en: 'Daily judgment, failure, repair, and operating lessons are kept public-safe, short, and easy to find.',
    zh: '把每天的判断、失败、修复与运营教训，以公开安全、简短、易查找的形式留下。',
    ja: '毎日の判断、失敗、修理、運用の学びを、公開安全で短く探しやすい形で残します。',
  };

  const laneMapTitle = {
    ko: '읽는 길',
    en: 'Reading lanes',
    zh: '阅读路径',
    ja: '読む道筋',
  };
  const laneMapBody = {
    ko: '회고, 처방, 방향 전환을 섞지 않고 나눠 둡니다.',
    en: 'Reflections, reusable fixes, and direction changes stay separated.',
    zh: '把复盘、可复用处方与方向调整分开存放。',
    ja: '振り返り、再利用できる処方、方向転換を混ぜずに分けます。',
  };

  const proofTitle = {
    ko: '작업 증거 / 프로젝트',
    en: 'Proof of work / projects',
    zh: '工作证据 / 项目',
    ja: '仕事の証拠 / プロジェクト',
  };
  const proofBody = {
    ko: '프로젝트는 주인공이 아니라, 위의 기록이 실제로 굴러간다는 증거 레이어입니다.',
    en: 'Projects stay here as evidence that the editorial lanes are grounded in real shipped work.',
    zh: '项目放在这里作为证据层，证明上面的编辑分栏来自真实交付。',
    ja: 'プロジェクトは主役ではなく、上のレーンが実際の仕事に根ざしている証拠レイヤーです。',
  };
  const archiveMapTitle = {
    ko: '전체 작업 기록으로 이동',
    en: 'Jump into the full logbook',
    zh: '进入完整工作日志',
    ja: '全ログブックへ',
  };

  const latestTitle = {
    ko: '최근 기록',
    en: 'Recent logs',
    zh: '最近记录',
    ja: '最近の記録',
  };
  const latestBody = {
    ko: '카드보다 빠르게 훑는 최신 작업 흔적입니다.',
    en: 'A faster-scanning trail of recent work, without more card noise.',
    zh: '比卡片更快浏览的最近工作痕迹。',
    ja: 'カードより速く追える最近の作業痕跡です。',
  };

  const laneCards = [
    laneCard({ id: 'daily-reflection-card', title: laneCopy.reflection.title, description: laneCopy.reflection.description, href: laneCopy.reflection.href, count: totals.reflections, localizedBlock }),
    laneCard({ id: 'setup-tip-card', title: laneCopy.tip.title, description: laneCopy.tip.description, href: laneCopy.tip.href, count: totals.setupTips, localizedBlock }),
    laneCard({ id: 'behind-the-gajae-card', title: laneCopy.behind.title, description: laneCopy.behind.description, href: laneCopy.behind.href, count: totals.blogNotes, localizedBlock }),
  ].join('');


  const recentItems = [featuredPost, ...latestReflections.slice(0, 3), ...latestTips.slice(0, 2), ...blogNotes.slice(0, 1)]
    .filter(Boolean)
    .filter((post, index, list) => list.findIndex((candidate) => candidate.slug === post.slug) === index)
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 6);
  const recentRows = recentItems.map((item) => homeRecentRow(item, localizedBlock)).join('');


  return [
    `<section class="hero hero-home home-editorial-hero"><div class="home-hero-copy">${renderBadge({ content: localizedBlock(ui.operatingNotesBadge), className: 'badge ui-badge home-kicker' })}<h1>${localizedBlock(heroTitle)}</h1><p class="lede">${localizedBlock(heroBody)}</p><div class="hero-actions"><a class="button-link" href="/posts/${featuredPost.slug}.html" data-i18n="latestFeatureCta">${localizedText(ui.latestFeatureCta)}</a>${renderActionLink({ href: '/archive.html', label: localizedText(ui.browseArchive), i18nKey: 'browseArchive' })}</div></div><aside class="home-index-card" aria-label="Logbook index"><strong>gaebal-gajae.log</strong><div class="home-index-stats">${archiveCountPill(totals.reflections, laneCopy.reflection.title)}${archiveCountPill(totals.setupTips, laneCopy.tip.title)}${archiveCountPill(totals.blogNotes, laneCopy.behind.title)}</div></aside></section>`,
    `<section class="section home-today-section"><div class="section-head"><div><p class="kicker" data-i18n="featured">${localizedText(ui.featured, 'ko')}</p><h2>${localizedBlock({ ko: '오늘의 로그', en: 'Today’s log', zh: '今天的日志', ja: '今日のログ' })}</h2></div>${renderActionLink({ href: '/archive.html', label: localizedText(ui.browseArchive), i18nKey: 'browseArchive' })}</div>${homeTodayCard(featuredPost, { localizedBlock, localizedText, ui })}</section>`,
    `<section class="section lane-map-home home-lanes-section"><div class="section-head"><div><h2>${localizedBlock(laneMapTitle)}</h2><p class="section-description">${localizedBlock(laneMapBody)}</p></div></div><div class="lane-grid home-lane-grid">${laneCards}</div></section>`,
    `<section class="section home-recent-section"><div class="section-head"><div><h2>${localizedBlock(latestTitle)}</h2><p class="section-description">${localizedBlock(latestBody)}</p></div>${renderActionLink({ href: '/archive.html', label: localizedText(ui.allPosts), i18nKey: 'allPosts' })}</div><div class="home-recent-list">${recentRows}</div></section>`,
    `<section class="section home-proof-section" id="proof-of-work"><div class="section-head"><div><h2>${localizedBlock(proofTitle)}</h2><p class="section-description">${localizedBlock(proofBody)}</p></div>${renderActionLink({ href: '/projects/', label: localizedText(ui.allProjects), i18nKey: 'allProjects' })}</div><div class="project-evidence-stack home-project-stack">${projectHighlights.map(projectPreviewCard).join('')}</div></section>`,
    `<section class="section archive-strip home-archive-strip"><div class="section-head"><div><h2>${localizedBlock(archiveMapTitle)}</h2><p class="section-description">${localizedBlock(ui.archiveIntro)}</p></div>${renderActionLink({ href: '/archive.html', label: localizedText(ui.browseArchive), i18nKey: 'browseArchive' })}</div><div class="stats-strip archive-summary-strip">${archiveCountPill(totals.reflections, laneCopy.reflection.title)}${archiveCountPill(totals.setupTips, laneCopy.tip.title)}${archiveCountPill(totals.blogNotes, laneCopy.behind.title)}${archiveCountPill(totals.projects, ui.projects)}</div></section>`,
    repoBar('repo-section home-repo-section'),
  ].join('');
}

export function renderArchiveBody({
  ui,
  totals,
  blogNotes,
  sortedPosts,
  reflections,
  setupTips,
  localizedBlock,
  localizedText,
  sectionHead,
  renderYearGroups,
  postRow,
  archiveCountPill,
}) {
  const archiveMapBody = {
    ko: '레인을 먼저 고르고, 전체 연대기는 그다음에 확인하는 보조 경로로 둡니다.',
    en: 'Choose the lane first. Chronology stays below as a secondary path.',
    zh: '先选分栏，时间线放在下面作为次级路径。',
    ja: '先にレーンを選び、年表はその下の二次導線に置きます。',
  };
  const chronologyBody = {
    ko: '전체 작업 흐름이 필요할 때만 연대기로 내려가면 됩니다.',
    en: 'Drop into chronology only when you need the full operating timeline.',
    zh: '只有在需要完整脉络时再进入时间线。',
    ja: '全体の流れが必要なときだけ年表へ降りてください。',
  };
  const laneGuides = [
    { key: 'reflection', lane: laneCopy.reflection, count: totals.reflections },
    { key: 'tip', lane: laneCopy.tip, count: totals.setupTips },
    { key: 'behind', lane: laneCopy.behind, count: totals.blogNotes },
  ].map(({ key, lane, count }) => laneCard({ id: `${key}-guide`, title: lane.title, description: lane.description, href: lane.href, count, localizedBlock })).join('');

  return `<section class="hero hero-compact archive-hero">${renderBadge({ content: `🗂️ ${localizedText(ui.archive)}` })}<h1>${localizedBlock(ui.archive)}</h1><p class="lede">${localizedBlock(ui.archiveBlurb)}</p><div class="archive-compass"><div class="archive-compass-copy"><p class="section-description">${localizedBlock(archiveMapBody)}</p><nav class="archive-jump-nav" aria-label="Archive sections"><a href="${laneCopy.reflection.href}" class="archive-jump-link">${archiveCountPill(totals.reflections, laneCopy.reflection.title)}</a><a href="${laneCopy.tip.href}" class="archive-jump-link">${archiveCountPill(totals.setupTips, laneCopy.tip.title)}</a><a href="${laneCopy.behind.href}" class="archive-jump-link">${archiveCountPill(totals.blogNotes, laneCopy.behind.title)}</a><a href="#all-posts" class="archive-jump-link">${archiveCountPill(totals.posts, ui.allPosts)}</a></nav></div><div class="lane-grid archive-lane-grid">${laneGuides}</div></div></section><section class="section chronology-report" id="all-posts">${sectionHead('allPosts', chronologyBody)}${renderYearGroups(sortedPosts)}</section>`;
}
export function renderLaneIndexBody({
  laneKey,
  ui,
  posts,
  totalPosts,
  localizedBlock,
  localizedText,
  archiveCountPill,
  postRow,
  featuredPostCard,
}) {
  const lane = laneCopy[laneKey];
  if (!lane) throw new Error(`Unknown lane key in lane index renderer: ${laneKey}`);
  const [lead, ...rest] = posts;
  const laneIntro = {
    reflection: {
      focus: { ko: '오늘 무엇을 보고 어떻게 교정했는지부터 읽습니다.', en: 'Start with what changed and what got corrected today.', zh: '先读今天看到了什么、修正了什么。', ja: '今日何を見てどう直したかから読みます。' },
      cta: { ko: '전체 연대기 보기', en: 'Browse full chronology', zh: '查看完整时间线', ja: '全体年表を見る' },
      recentTitle: { ko: '최근 회고', en: 'Recent reflections', zh: '最近复盘', ja: '最近の振り返り' },
    },
    tip: {
      focus: { ko: '바로 가져갈 운영 처방부터 확인하고, 필요한 로그를 뒤에서 읽습니다.', en: 'Grab the reusable operating pattern first, then read the supporting log.', zh: '先拿走可复用的运营模式，再读后面的支撑日志。', ja: '持ち帰れる運用パターンを先に拾い、その後ろで支えるログを読みます。' },
      cta: { ko: '연대기에서 팁 흐름 보기', en: 'Trace tips in chronology', zh: '在时间线里追踪提示', ja: '年表でヒントの流れを見る' },
      recentTitle: { ko: '최근 운영 팁', en: 'Recent tips', zh: '最近运营提示', ja: '最近の運用ヒント' },
    },
    behind: {
      focus: { ko: '가재가 왜 그렇게 판단했는지, 어떤 원칙이 쌓였는지부터 읽습니다.', en: 'Start with why Gajae decided that way and what principles accumulated.', zh: '先读为什么这样判断、积累了什么原则。', ja: 'なぜそう判断したのか、どんな原則が積み上がったのかから読みます。' },
      cta: { ko: '연대기에서 판단 흐름 보기', en: 'Browse full judgment trail', zh: '查看完整判断轨迹', ja: '判断の流れを年表で見る' },
      recentTitle: { ko: '최근 판단 노트', en: 'Recent judgment notes', zh: '最近判断笔记', ja: '最近の判断ノート' },
    },
  }[laneKey];
  const laneStats = `${archiveCountPill(posts.length, lane.title)}${archiveCountPill(totalPosts, ui.allPosts)}`;
  const leadBlock = lead
    ? `<section class="section lane-featured lane-featured-${laneKey}"><div class="section-head"><div><p class="kicker" data-i18n="featured">${localizedText(ui.featured, 'ko')}</p><h2>${localizedBlock(lane.title)}</h2><p class="section-description">${localizedBlock(laneIntro.focus)}</p></div>${linkedLocalizedText('/archive.html', laneIntro.cta, localizedBlock)}</div>${featuredPostCard(lead)}</section>`
    : '';
  const listBlock = rest.length
    ? `<section class="section lane-recent-list lane-recent-${laneKey}"><div class="section-head"><div><h2>${localizedBlock(laneIntro.recentTitle)}</h2><p class="section-description">${localizedBlock(lane.description)}</p></div></div><div class="post-stack">${rest.map(postRow).join('')}</div></section>`
    : '';
  return `<section class="hero hero-compact lane-route-hero" data-lane="${laneKey}">${renderBadge({ content: localizedBlock(lane.title) })}<h1>${localizedBlock(lane.title)}</h1><p class="lede">${localizedBlock(lane.description)}</p><p class="section-description">${localizedBlock(laneIntro.focus)}</p><div class="stats-strip archive-summary-strip">${laneStats}</div></section>${leadBlock}${listBlock}`;
}
export function renderProjectsIndexBody({
  ui,
  projects,
  localizedText,
  localizedBlock,
  sectionHead,
  projectPreviewCard,
  repoBar,
}) {
  const evidenceIntro = {
    ko: '여기 프로젝트는 포트폴리오 진열이 아니라, 위 로그북이 실제 출하물과 연결된다는 증거 슬립입니다.',
    en: 'These projects are filed as evidence slips, not a portfolio wall.',
    zh: '这里的项目不是作品集陈列，而是证明上方日志与真实交付相连的证据条。',
    ja: 'ここにあるプロジェクトはポートフォリオの陳列ではなく、上のログが実際の成果物につながっている証拠スリップです。',
  };
  return `<section class="hero hero-compact projects-hero">${renderBadge({ content: `🛠️ ${localizedText(ui.projects)}` })}<h1>${localizedBlock(ui.projects)}</h1><p class="lede">${localizedBlock(ui.projectIntro)}</p><div class="project-evidence-note"><p class="section-description">${localizedBlock(evidenceIntro)}</p></div></section><section class="section section-project-index">${sectionHead('projects', evidenceIntro)}<div class="project-evidence-stack">${projects.map(projectPreviewCard).join('')}</div></section>${repoBar('repo-section')}`;
}

export function renderPostBody({
  post,
  lane,
  ui,
  neighbors,
  related,
  localizedBlock,
  localizedText,
  bodyList,
  postRow,
}) {
  const relatedSection = related.length
    ? `<section class="section related-posts"><div class="section-head"><div><p class="kicker" data-i18n="relatedPosts">${localizedText(ui.relatedPosts)}</p><h2 data-i18n="relatedPosts">${localizedText(ui.relatedPosts)}</h2></div></div><div class="post-stack post-stack-compact">${related.map(postRow).join('')}</div></section>`
    : '';
  const footerLinks = [
    neighbors.newer
      ? renderPostNavLink({ href: `/posts/${neighbors.newer.slug}.html`, kicker: localizedText(ui.newerPost), title: localizedBlock(neighbors.newer.title) })
      : '',
    neighbors.older
      ? renderPostNavLink({ href: `/posts/${neighbors.older.slug}.html`, kicker: localizedText(ui.olderPost), title: localizedBlock(neighbors.older.title), alignRight: !!neighbors.newer })
      : '',
  ].filter(Boolean);
  const footerNav = footerLinks.length
    ? `<nav class="post-footer-nav ${footerLinks.length === 1 ? 'is-single' : 'is-dual'}">${footerLinks.join('')}</nav>`
    : '';

  const eyebrow = renderEyebrowTrail([
    { href: '/', label: `← ${localizedText(ui.home)}`, i18nKey: 'home' },
    { href: lane.route, label: localizedText(lane.label), i18nKey: null },
  ]);
  const translationHonesty = renderTranslationHonesty(post.translationStatus, { localizedBlock });

  return `<article class="report-article report-post">${eyebrow}<div class="report-shell"><header class="post-header">${renderLaneBadge(post.type, { localizedBlock })}<h1>${localizedBlock(post.title)}</h1><p class="lede">${localizedBlock(post.summary)}</p></header><aside class="report-aside"><div class="report-sidecard">${renderPostMeta(post, { localizedBlock, variant: 'detail' })}${renderProofSignals(post, { localizedBlock, limit: 3, className: 'proof-signal-list proof-signal-list-detail' })}${translationHonesty}</div></aside><div class="report-main"><section class="post-body">${bodyList(post)}</section>${relatedSection}${footerNav}</div></div></article>`;
}

export function renderProjectBody({
  project,
  ui,
  esc,
  localizedBlock,
  localizedText,
  bodyList,
  projectMetaBar,
}) {
  const heroSrc = project.detailImage || project.heroImage;
  const hero = heroSrc
    ? `<div class="project-hero-frame"><img class="project-hero" src="${esc(heroSrc)}" alt="${esc(project.name)} hero" /></div>`
    : '';

  const eyebrow = renderEyebrowTrail([
    { href: '/', label: `← ${localizedText(ui.home)}`, i18nKey: 'home' },
    { href: '/projects/', label: localizedText(ui.projects), i18nKey: 'projects' },
  ]);
  const detailMeta = renderMetaLine([
    esc(project.date),
    esc(project.name),
  ], { className: 'reading-meta reading-meta-detail ui-meta project-detail-meta', dateTag: 'time', textTag: 'small', separatorTag: 'small', separatorContent: '·' });
  const projectRail = projectMetaBar(project);
  return `<article class="report-article report-project">${eyebrow}<div class="report-shell"><header class="project-header">${detailMeta}<h1>${localizedBlock(project.title)}</h1><p class="lede">${localizedBlock(project.summary)}</p></header>${projectRail ? `<aside class="report-aside">${projectRail}</aside>` : ''}<div class="report-main">${hero}<section class="project-body">${bodyList(project)}</section></div></div></article>`;
}
