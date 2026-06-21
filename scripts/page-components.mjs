export function renderHomeBody({
  site,
  ui,
  featuredPost,
  latestReflections,
  latestTips,
  projectHighlights,
  totals,
  localizedBlock,
  localizedText,
  sectionHead,
  postRow,
  projectPreviewCard,
  archiveCountPill,
  repoBar,
  featuredPostCard,
}) {
  const reflectionIntro = {
    ko: '매일 쌓인 기록 중 최신 회고부터 바로 읽을 수 있게 정리했습니다.',
    en: 'The latest reflections, separated from tips and project pages.',
    zh: '把最新复盘从提示与项目页中分开，便于直接阅读。',
    ja: 'ヒントやプロジェクトページと分けて、最新の振り返りから読めるようにしました。',
  };
  const tipsIntro = {
    ko: '바로 가져다 쓰기 좋은 운영/셋업 팁만 따로 모았습니다.',
    en: 'Practical setup and operating notes, separated from the diary lane.',
    zh: '把可直接拿来用的设置与运维提示单独整理出来。',
    ja: '日記レーンから切り離して、すぐ使えるセットアップと運用のコツだけを集めました。',
  };
  const launchNotesLabel = {
    ko: '런치 노트',
    en: 'Launch notes',
    zh: '上线笔记',
    ja: 'ローンチノート',
  };

  return [
    `<section class="hero hero-home"><div class="badge">${localizedBlock(ui.operatingNotesBadge)}</div><h1>${localizedBlock(site.title)}</h1><p class="lede">${localizedBlock(ui.homeBlurb)}</p><p class="meta" data-i18n="safety">${localizedText(ui.safety)}</p><div class="hero-actions"><a class="button-link" href="/posts/${featuredPost.slug}.html" data-i18n="latestFeatureCta">${localizedText(ui.latestFeatureCta)}</a><a class="section-link" href="/archive.html" data-i18n="browseArchive">${localizedText(ui.browseArchive)}</a></div><div class="hero-board"><img class="avatar-hero" src="/assets/avatar/gaebal-gajae.png" alt="gaebal-gajae avatar" /><div class="hero-copy"><strong>${localizedBlock(ui.notFarmTitle)}</strong><p>${localizedBlock(ui.notFarmBody)}</p><p>${localizedBlock(ui.notFarmSubline)}</p></div></div></section>`,
    `<section class="section section-featured">${sectionHead('featured', ui.archiveBlurb, '/archive.html', 'browseArchive')}${featuredPostCard(featuredPost)}</section>`,
    `<section class="section" id="reflections">${sectionHead('latestReflections', reflectionIntro, '/archive.html#archive-reflections', 'archive')}<div class="post-stack">${latestReflections.map(postRow).join('')}</div></section>`,
    `<section class="section" id="setup-tips">${sectionHead('recentTips', tipsIntro, '/archive.html#archive-setup-tips', 'archive')}<div class="post-stack post-stack-compact">${latestTips.map(postRow).join('')}</div></section>`,
    `<section class="section" id="projects">${sectionHead('projectLogs', ui.projectIntro, '/projects/', 'allProjects')}<div class="project-preview-grid">${projectHighlights.map(projectPreviewCard).join('')}</div></section>`,
    `<section class="section archive-strip"><div class="section-head"><div><h2 data-i18n="archive">${localizedText(ui.archive)}</h2><p class="section-description">${localizedBlock(ui.archiveIntro)}</p></div><a class="section-link" href="/archive.html" data-i18n="browseArchive">${localizedText(ui.browseArchive)}</a></div><div class="stats-strip archive-summary-strip">${archiveCountPill(totals.posts, ui.allPosts)}${archiveCountPill(totals.reflections, ui.reflections)}${archiveCountPill(totals.setupTips, ui.tips)}${archiveCountPill(totals.blogNotes, launchNotesLabel)}${archiveCountPill(totals.projects, ui.projects)}</div></section>`,
    repoBar('repo-section'),
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
  const launchNotesLabel = {
    ko: '런치 노트',
    en: 'Launch notes',
    zh: '上线笔记',
    ja: 'ローンチノート',
  };
  const blogNotesSection = blogNotes.length
    ? `<section class="section" id="archive-blog-notes"><div class="section-head"><div><p class="kicker">Notes</p><h2>${localizedBlock(launchNotesLabel)}</h2></div></div><div class="post-stack post-stack-compact">${blogNotes.map(postRow).join('')}</div></section>`
    : '';
  const archiveJumpLinks = [
    { href: '#all-posts', content: archiveCountPill(totals.posts, ui.allPosts) },
    { href: '#archive-reflections', content: archiveCountPill(totals.reflections, ui.reflections) },
    { href: '#archive-setup-tips', content: archiveCountPill(totals.setupTips, ui.tips) },
    ...(blogNotes.length
      ? [{ href: '#archive-blog-notes', content: archiveCountPill(totals.blogNotes, launchNotesLabel) }]
      : []),
  ];

  return `<section class="hero hero-compact"><div class="badge">🗂️ ${localizedText(ui.archive)}</div><h1>${localizedBlock(ui.archive)}</h1><p class="lede">${localizedBlock(ui.archiveBlurb)}</p><nav class="archive-jump-nav" aria-label="Archive sections">${archiveJumpLinks.map((item) => `<a href="${item.href}" class="archive-jump-link">${item.content}</a>`).join('')}</nav></section><section class="section" id="all-posts">${sectionHead('allPosts', ui.archiveIntro)}${renderYearGroups(sortedPosts)}</section><section class="section" id="archive-reflections">${sectionHead('reflections', null)}<div class="post-stack">${reflections.map(postRow).join('')}</div></section><section class="section" id="archive-setup-tips">${sectionHead('tips', null)}<div class="post-stack post-stack-compact">${setupTips.map(postRow).join('')}</div></section>${blogNotesSection}`;
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
  return `<section class="hero hero-compact"><div class="badge">🛠️ ${localizedText(ui.projects)}</div><h1>${localizedBlock(ui.projects)}</h1><p class="lede">${localizedBlock(ui.projectIntro)}</p></section><section class="section">${sectionHead('projects', null)}<div class="project-preview-grid">${projects.map(projectPreviewCard).join('')}</div></section>${repoBar('repo-section')}`;
}

export function renderPostBody({
  post,
  ui,
  neighbors,
  related,
  localizedBlock,
  localizedText,
  metaRow,
  bodyList,
  postRow,
}) {
  const relatedSection = related.length
    ? `<section class="article-section related-posts"><div class="section-head"><div><p class="kicker" data-i18n="relatedPosts">${localizedText(ui.relatedPosts)}</p><h2 data-i18n="relatedPosts">${localizedText(ui.relatedPosts)}</h2></div></div><div class="post-stack post-stack-compact">${related.map(postRow).join('')}</div></section>`
    : '';

  return `<article class="post-article"><p class="eyebrow"><a href="/">← <span data-i18n="home">${localizedText(ui.home)}</span></a> · <a href="/archive.html" data-i18n="archive">${localizedText(ui.archive)}</a></p>${metaRow(post)}<h1>${localizedBlock(post.title)}</h1><p class="lede">${localizedBlock(post.summary)}</p>${bodyList(post)}${relatedSection}<nav class="post-footer-nav">${neighbors.newer ? `<a class="post-nav-link" href="/posts/${neighbors.newer.slug}.html"><span data-i18n="newerPost">${localizedText(ui.newerPost)}</span><strong>${localizedBlock(neighbors.newer.title)}</strong></a>` : '<span></span>'}${neighbors.older ? `<a class="post-nav-link align-right" href="/posts/${neighbors.older.slug}.html"><span data-i18n="olderPost">${localizedText(ui.olderPost)}</span><strong>${localizedBlock(neighbors.older.title)}</strong></a>` : '<span></span>'}</nav></article>`;
}

export function renderProjectBody({
  project,
  ui,
  typeCopy,
  esc,
  localizedBlock,
  localizedText,
  bodyList,
  projectMetaBar,
}) {
  const hero = project.heroImage
    ? `<img class="project-hero" src="${esc(project.heroImage)}" alt="${esc(project.name)} hero" />`
    : '';

  return `<article class="post-article"><p class="eyebrow"><a href="/">← <span data-i18n="home">${localizedText(ui.home)}</span></a> · <a href="/projects/" data-i18n="projects">${localizedText(ui.projects)}</a></p><div class="reading-meta"><span>${esc(project.date)}</span><span>${localizedBlock(typeCopy.project)}</span><span>${esc(project.name)}</span></div><h1>${localizedBlock(project.title)}</h1><p class="lede">${localizedBlock(project.summary)}</p>${hero}${projectMetaBar(project)}${bodyList(project)}</article>`;
}