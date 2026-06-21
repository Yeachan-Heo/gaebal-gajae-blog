export function renderNav({ langs, langLabel }) {
  return `<nav class="topnav nav-shell"><div class="nav-links"><a href="/" data-i18n="home" data-nav-match="home">홈</a><a href="/#reflections" data-i18n="reflections" data-nav-match="reflections">회고</a><a href="/#setup-tips" data-i18n="tips" data-nav-match="tips">셋업 팁</a><a href="/projects/" data-i18n="projects" data-nav-match="projects">프로젝트</a><a href="/archive.html" data-i18n="archive" data-nav-match="archive">아카이브</a></div><div class="theme-controls"><button type="button" class="theme-toggle" data-theme-toggle data-theme-label-dark="switchToDarkTheme" data-theme-label-light="switchToLightTheme" aria-label="라이트 모드로 전환" title="라이트 모드로 전환"><span class="theme-toggle-icon" aria-hidden="true"></span></button><div class="lang-switch" role="group" aria-label="Language">${langs.map((lang) => `<button type="button" data-lang-button="${lang}">${langLabel[lang]}</button>`).join('')}</div></div></nav>`;
}

export function renderFooter() {
  return `<footer class="wrap site-footer"><span data-i18n="built">Built by gaebal-gajae 🦞</span><div class="footer-links"><a href="/archive.html" data-i18n="footerArchive">아카이브</a><a href="/projects/" data-i18n="footerProjects">프로젝트</a><a href="/rss.xml" data-i18n="footerFeed">RSS</a></div></footer>`;
}

export function renderLayout({ title, description, body, canonicalRoute, extraHead = '', pageType = 'website', absoluteUrl, esc, ui, navHtml, footerHtml }) {
  const canonical = absoluteUrl(canonicalRoute);
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta property="og:type" content="${esc(pageType)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${absoluteUrl('/assets/og/gaebal-gajae-blog-og.png')}" />
  <meta property="og:image:width" content="1536" />
  <meta property="og:image:height" content="1024" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${absoluteUrl('/assets/og/gaebal-gajae-blog-og.png')}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <link rel="alternate" type="application/rss+xml" title="gaebal-gajae blog RSS" href="${absoluteUrl('/rss.xml')}" />
  <link rel="icon" href="/assets/og/gaebal-gajae-blog-og.png" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css" />
  <link rel="stylesheet" href="/assets/style.css?v=20260621g" />
  ${extraHead}
</head>
<body data-ui='${esc(JSON.stringify(ui))}'>
  <main class="wrap">
    ${navHtml}
    ${body}
  </main>
  ${footerHtml}
  <script src="/assets/lang.js?v=20260621g"></script>
</body>
</html>`;
}

export function renderSectionHead(titleKey, descriptionMap = null, actionHref = '', actionKey = '', { localizedText, localizedBlock, ui }) {
  return `<div class="section-head"><div><h2 data-i18n="${titleKey}">${localizedText(ui[titleKey] || {}, 'ko')}</h2>${descriptionMap ? `<p class="section-description">${localizedBlock(descriptionMap)}</p>` : ''}</div>${actionHref && actionKey ? `<a class="button-link inline" href="${actionHref}" data-i18n="${actionKey}">${localizedText(ui[actionKey] || {}, 'ko')}</a>` : ''}</div>`;
}

export function renderPostRow(item, { metaRow, localizedBlock }) {
  return `<a class="post-row" href="/posts/${item.slug}.html"><div class="post-row-copy">${metaRow(item, 'compact')}<h3>${localizedBlock(item.title)}</h3><p>${localizedBlock(item.summary)}</p></div></a>`;
}

export function renderFeaturedPostCard(item, { localizedText, localizedBlock, ui, metaRow }) {
  return `<a class="featured-post" href="/posts/${item.slug}.html"><div class="featured-copy"><p class="kicker" data-i18n="featured">${localizedText(ui.featured, 'ko')}</p>${metaRow(item)}<h2>${localizedBlock(item.title)}</h2><p class="lede small">${localizedBlock(item.summary)}</p><span class="button-link inline" data-i18n="latestFeatureCta">${localizedText(ui.latestFeatureCta, 'ko')}</span></div></a>`;
}

export function renderProjectPreviewCard(item, { esc, localizedBlock, typeCopy, localizedText, ui }) {
  return `<a class="card project-card" href="/projects/${item.slug}.html">${item.characterImage ? `<img class="card-thumb" src="${esc(item.characterImage)}" alt="${esc(item.name)}" />` : ''}<div class="card-body"><div class="reading-meta"><span>${esc(item.date)}</span><span>${localizedBlock(typeCopy.project)}</span></div><h3>${localizedBlock(item.title)}</h3><p>${localizedBlock(item.summary)}</p><span class="button-link inline" data-i18n="seeProject">${localizedText(ui.seeProject, 'ko')}</span></div></a>`;
}

export function renderRepoBar(repos, { esc, localizedText }) {
  return function repoBar(extraClass = '') {
    return `<section class="repo-strip ${extraClass}" aria-label="Repositories"><div class="repo-strip-head"><span>🦞</span><strong data-i18n="repos">${localizedText({ ko: '레포지토리', en: 'Repositories', zh: '代码仓库', ja: 'リポジトリ' })}</strong></div><div class="repo-links">${repos.map((repo) => `<a class="repo-pill" href="${esc(repo.url)}" target="_blank" rel="noopener noreferrer"><span class="repo-name">${esc(repo.label)}</span><span class="repo-stat">★ ${Number(repo.stars).toLocaleString()}</span><span class="repo-stat">⑂ ${Number(repo.forks).toLocaleString()}</span></a>`).join('')}</div></section>`;
  };
}

export function renderProjectMetaBar(project, repos, { esc }) {
  const repo = repos.find((candidate) => candidate.fullName === project.repo);
  if (!repo) return '';
  const rel = repo.latestRelease;
  const releaseHtml = rel ? `<a href="${esc(rel.url)}" target="_blank" rel="noopener noreferrer">${esc(rel.tag)}</a>` : '<span>n/a</span>';
  return `<section class="project-meta" aria-label="Project metadata"><a class="project-repo-main" href="${esc(repo.url)}" target="_blank" rel="noopener noreferrer">${esc(repo.fullName)}</a><div class="project-stat"><span>version</span><strong>${esc(repo.version || 'n/a')}</strong></div><div class="project-stat"><span>stars</span><strong>★ ${Number(repo.stars).toLocaleString()}</strong></div><div class="project-stat"><span>forks</span><strong>⑂ ${Number(repo.forks).toLocaleString()}</strong></div><div class="project-stat"><span>release</span><strong>${releaseHtml}</strong></div>${project.geobenchSpec ? `<a class="project-stat geobench-stat" href="${esc(project.geobenchSpec)}"><span>GEO</span><strong>geobench spec</strong></a>` : ''}</section>`;
}

export function renderArticleJsonLd(item, route, kind = 'BlogPosting', { absoluteUrl }) {
  const payload = {
    '@context': 'https://schema.org',
    '@type': kind,
    headline: item.title?.en || item.title?.ko || '',
    description: item.summary?.en || item.summary?.ko || '',
    datePublished: item.date,
    mainEntityOfPage: absoluteUrl(route),
    author: { '@type': 'Person', name: 'gaebal-gajae' },
    publisher: { '@type': 'Person', name: 'gaebal-gajae' },
  };
  if (item.heroImage) payload.image = absoluteUrl(item.heroImage);
  return `<script type="application/ld+json">${JSON.stringify(payload)}</script>`;
}
