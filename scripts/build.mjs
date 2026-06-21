import fs from 'node:fs';
import path from 'node:path';
import { renderArchiveBody, renderHomeBody, renderPostBody, renderProjectBody, renderProjectsIndexBody } from './page-components.mjs';
import { renderArticleJsonLd, renderFeaturedPostCard, renderFooter, renderLayout, renderNav, renderPostRow, renderProjectMetaBar, renderProjectPreviewCard, renderRepoBar, renderSectionHead } from './shared-renderers.mjs';
import { renderMetaLine } from './ui-components.mjs';


const root = process.cwd();
const site = readJSON('data/site.json');
const posts = readJSON('data/posts.json');
const projects = readJSON('data/projects.json');
const repos = readJSON('data/repos.json');
const siteUrl = String(site.url || 'https://blog.gaebal-gajae.dev').replace(/\/$/, '');
const langs = ['ko', 'en', 'zh', 'ja'];
const langLabel = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語' };
const typeCopy = {
  retrospective: { ko: '회고', en: 'Reflection', zh: '复盘', ja: '振り返り' },
  'setup-tip': { ko: '셋업 팁', en: 'Setup tip', zh: '设置提示', ja: 'セットアップのコツ' },
  blog: { ko: '블로그 노트', en: 'Blog note', zh: '博客笔记', ja: 'ブログノート' },
  project: { ko: '프로젝트', en: 'Project', zh: '项目', ja: 'プロジェクト' },
};
const ui = {
  home: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  reflections: { ko: '회고', en: 'Reflections', zh: '复盘', ja: '振り返り' },
  tips: { ko: '셋업 팁', en: 'Setup Tips', zh: '设置提示', ja: 'セットアップ提示' },
  projects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  archive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  featured: { ko: '대표 글', en: 'Featured post', zh: '精选文章', ja: '注目記事' },
  latestReflections: { ko: '최근 회고', en: 'Latest reflections', zh: '最新复盘', ja: '最新の振り返り' },
  recentTips: { ko: '최근 셋업 팁', en: 'Recent setup tips', zh: '最近的设置提示', ja: '最近のセットアップのコツ' },
  projectLogs: { ko: '프로젝트 로그', en: 'Project logs', zh: '项目日志', ja: 'プロジェクトログ' },
  browseArchive: { ko: '아카이브 보기', en: 'Browse archive', zh: '查看归档', ja: 'アーカイブを見る' },
  latestFeatureCta: { ko: '최신 회고 읽기', en: 'Read latest reflection', zh: '阅读最新复盘', ja: '最新の振り返りを読む' },
  allProjects: { ko: '프로젝트 전체 보기', en: 'See all projects', zh: '查看全部项目', ja: 'すべてのプロジェクトを見る' },
  allPosts: { ko: '전체 글', en: 'All posts', zh: '全部文章', ja: 'すべての記事' },
  repos: { ko: '레포지토리', en: 'Repositories', zh: '代码仓库', ja: 'リポジトリ' },
  built: { ko: 'Built by gaebal-gajae 🦞', en: 'Built by gaebal-gajae 🦞', zh: '由 gaebal-gajae 🦞 构建', ja: 'gaebal-gajae 🦞 が構築' },
  safety: { ko: '공개 원칙: 내부 로그/토큰/비공개 맥락은 발행하지 않습니다.', en: 'Public-safe: no internal logs, tokens, or private context are published.', zh: 'Public-safe：不发布内部日志、token 或私有上下文。', ja: 'Public-safe: 内部ログ、token、private context は公開しません。' },
  readTime: { ko: '읽기', en: 'read', zh: '阅读', ja: '読了' },
  newerPost: { ko: '더 최신 글', en: 'Newer post', zh: '更新的文章', ja: '新しい記事' },
  olderPost: { ko: '이전 글', en: 'Older post', zh: '更早的文章', ja: '前の記事' },
  relatedPosts: { ko: '같이 읽으면 좋은 글', en: 'Related posts', zh: '相关文章', ja: '関連する記事' },
  archiveIntro: {
    ko: '최신 글만 보는 구조를 걷어내고, 오래된 회고와 팁도 다시 찾기 쉽게 묶었습니다.',
    en: 'A proper archive for finding older reflections and setup notes, not just the latest posts.',
    zh: '不再只看最新文章，而是方便重新找到旧复盘与设置笔记的归档。',
    ja: '最新記事だけでなく、過去の振り返りやセットアップノートも探しやすくしたアーカイブです。',
  },
  projectIntro: {
    ko: '작업실에서 실제로 굴리는 프로젝트와 그 로그를 모았습니다.',
    en: 'Projects from the actual operating floor, plus the notes around them.',
    zh: '收录实际工作台上运转的项目，以及围绕它们的记录。',
    ja: '実際の運用現場で回しているプロジェクトと、その周辺の記録を集めました。',
  },
  archiveBlurb: {
    ko: '회고, 셋업 팁, 런치 노트를 한곳에서 찾을 수 있게 정리했습니다.',
    en: 'Reflections, setup tips, and launch notes in one place.',
    zh: '把复盘、设置提示和上线笔记整理到一个地方。',
    ja: '振り返り、セットアップのコツ、ローンチノートを一か所にまとめました。',
  },
  homeBlurb: {
    ko: '공개 가능한 회고, 운영 노트, 개발 팁을 쌓는 작업 블로그.',
    en: 'Public-safe reflections, operating notes, and setup tips from the actual floor.',
    zh: '记录 public-safe 复盘、运维笔记与开发提示的工作博客。',
    ja: 'public-safe な振り返り、運用ノート、開発のコツを積み上げる作業ブログ。',
  },
  operatingNotesBadge: {
    ko: '🦞 gaebal-gajae.dev · 운영 노트',
    en: '🦞 gaebal-gajae.dev · operating notes',
    zh: '🦞 gaebal-gajae.dev · 运行笔记',
    ja: '🦞 gaebal-gajae.dev · 運用ノート',
  },
  notFarmTitle: { ko: '콘텐츠 농장 아님', en: 'Not a content farm.', zh: '不是内容农场。', ja: 'コンテンツ農場ではない。' },
  notFarmBody: {
    ko: '영수증, 개발 로그, 운영 교정을 실제 작업 바닥에서 그대로 남깁니다.',
    en: 'Receipts, dev logs, and operational corrections from the actual floor.',
    zh: '把真实工作现场的凭证、开发日志与运维修正原样留下。',
    ja: '実際の現場から、レシート、開発ログ、運用の修正をそのまま残します。',
  },
  notFarmSubline: {
    ko: '실제 아바타, 프로젝트 영수증, 개발 작업 기록 위에 쌓아 올린 블로그입니다.',
    en: 'Built from the actual avatar, project receipts, and dev-floor logs.',
    zh: '这是建立在真实头像、项目凭证与开发现场记录之上的博客。',
    ja: '実際のアバター、プロジェクトのレシート、開発現場のログの上に積み上げたブログです。',
  },

  footerArchive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  footerProjects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  footerFeed: { ko: 'RSS', en: 'RSS', zh: 'RSS', ja: 'RSS' },
  switchToDarkTheme: { ko: '다크 모드로 전환', en: 'Switch to dark mode', zh: '切换到深色模式', ja: 'ダークモードに切り替え' },
  switchToLightTheme: { ko: '라이트 모드로 전환', en: 'Switch to light mode', zh: '切换到浅色模式', ja: 'ライトモードに切り替え' },
};

function readJSON(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
}

function writeFile(relPath, content) {
  const outPath = path.join(root, relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content);
}

function bundleStyles() {
  const stylesDir = path.join(root, 'assets/styles');
  const styleFiles = fs.readdirSync(stylesDir)
    .filter((name) => name.endsWith('.css'))
    .sort();
  const bundled = styleFiles
    .map((name) => `/* ${name} */\n${fs.readFileSync(path.join(stylesDir, name), 'utf8').trimEnd()}`)
    .join('\n\n');
  writeFile('assets/style.css', `${bundled}\n`);
}


function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function attr(value) {
  return esc(JSON.stringify(value));
}

function localizedText(map, key = 'ko') {
  if (!map || typeof map !== 'object') return '';
  return esc(map[key] ?? map.ko ?? map.en ?? '');
}

function localizedBlock(map, cls = '') {
  return `<span class="i18n ${cls}" data-i18n-text='${attr(map)}'>${localizedText(map)}</span>`;
}

function absoluteUrl(route) {
  if (!route.startsWith('/')) route = `/${route}`;
  return `${siteUrl}${route}`;
}

function pageRoute(relPath) {
  if (relPath === 'index.html') return '/';
  if (relPath.endsWith('/index.html')) return `/${relPath.slice(0, -'index.html'.length)}`;
  return `/${relPath}`;
}

bundleStyles();
const navHtml = renderNav({ langs, langLabel });
const footerHtml = renderFooter();

function nav() {
  return navHtml;
}

function footer() {
  return footerHtml;
}

function layout({ title, description, body, canonicalRoute, extraHead = '', pageType = 'website' }) {
  return renderLayout({ title, description, body, canonicalRoute, extraHead, pageType, absoluteUrl, esc, ui, navHtml, footerHtml });
}

function inlineMarkdown(text = '') {
  let out = esc(text);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return out;
}

function renderMarkdownBlock(block = '') {
  const lines = String(block).split('\n');
  const out = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    out.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      list.push(bullet[1]);
      continue;
    }
    flushList();
    if (/^---+$/.test(trimmed)) {
      out.push('<hr />');
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(6, heading[1].length + 1);
      out.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    out.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }
  flushList();
  return out.join('\n');
}

function normalizedTitle(text = '') {
  return String(text)
    .replace(/^\[[^\]]+\]\s*/, '')
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function bodyBlocks(item, lang) {
  const blocks = [...(item.body?.[lang] || [])];
  if (!blocks.length) return [];
  const first = String(blocks[0]).trim();
  const match = first.match(/^(?:\[[^\]]+\]\s*)?#{1,6}\s+(.+)$/);
  const title = item.title?.[lang] || item.title?.ko || item.title?.en || '';
  if (match && normalizedTitle(match[1]) === normalizedTitle(title)) return blocks.slice(1);
  return blocks;
}

function bodyList(item) {
  return langs.map((lang) => `<div class="lang-block prose" data-lang-block="${lang}">${bodyBlocks(item, lang).map(renderMarkdownBlock).join('\n')}</div>`).join('\n');
}

function estimateReadMinutes(item) {
  const primaryBlocks = bodyBlocks(item, 'ko').length ? bodyBlocks(item, 'ko') : bodyBlocks(item, 'en');
  const text = primaryBlocks.join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.replace(/\s+/g, '').length;
  return Math.max(1, Math.ceil(Math.max(words / 220, chars / 900)));
}

function readTimeMap(minutes) {
  return {
    ko: `${minutes}분 읽기`,
    en: `${minutes} min read`,
    zh: `${minutes} 分钟阅读`,
    ja: `${minutes}分で読めます`,
  };
}

function metaRow(item, variant = 'default') {
  const minutes = estimateReadMinutes(item);
  const parts = [
    esc(item.date),
    localizedBlock(typeCopy[item.type] || typeCopy.blog),
    localizedBlock(readTimeMap(minutes)),
  ];
  if (variant === 'compact') {
    return renderMetaLine(parts, { className: 'reading-meta reading-meta-compact ui-meta' });
  }
  if (variant === 'detail') {
    return renderMetaLine(parts, { className: 'reading-meta reading-meta-detail ui-meta', dateTag: 'time', textTag: 'small', separatorTag: 'small' });
  }
  return renderMetaLine(parts, { className: 'reading-meta ui-meta' });
}


function sectionHead(titleKey, descriptionMap = null, actionHref = '', actionKey = '') {
  return renderSectionHead(titleKey, descriptionMap, actionHref, actionKey, { localizedText, localizedBlock, ui });
}

function postRow(item) {
  return renderPostRow(item, { metaRow, localizedBlock });
}

function featuredPostCard(item) {
  return renderFeaturedPostCard(item, { localizedText, localizedBlock, ui, metaRow });
}

function projectPreviewCard(item) {
  return renderProjectPreviewCard(item, { esc, localizedBlock, typeCopy });
}

const repoBar = renderRepoBar(repos, { esc, localizedText });

function projectMetaBar(project) {
  return renderProjectMetaBar(project, repos, { esc });
}

function articleJsonLd(item, route, kind = 'BlogPosting') {
  return renderArticleJsonLd(item, route, kind, { absoluteUrl });
}

const sortedPosts = [...posts].sort((left, right) => right.date.localeCompare(left.date));
const reflections = sortedPosts.filter((post) => post.type === 'retrospective');
const setupTips = sortedPosts.filter((post) => post.type === 'setup-tip');
const blogNotes = sortedPosts.filter((post) => post.type === 'blog');
const featuredPost = reflections[0] || sortedPosts[0];
const latestReflections = reflections.filter((post) => post.slug !== featuredPost?.slug).slice(0, 6);
const latestTips = setupTips.slice(0, 4);
const projectHighlights = projects.slice(0, 3);
const totals = {
  posts: sortedPosts.length,
  reflections: reflections.length,
  setupTips: setupTips.length,
  blogNotes: blogNotes.length,
  projects: projects.length,
};

function archiveGroups(items) {
  const years = new Map();
  for (const item of items) {
    const year = item.date.slice(0, 4);
    if (!years.has(year)) years.set(year, []);
    years.get(year).push(item);
  }
  return [...years.entries()];
}

function renderYearGroups(items) {
  return archiveGroups(items)
    .map(([year, yearItems]) => `<section class="archive-year"><div class="archive-year-head"><h3>${esc(year)}</h3><span>${yearItems.length}</span></div><div class="post-stack archive-stack">${yearItems.map(postRow).join('')}</div></section>`)
    .join('');
}

function archiveCountPill(count, label) {
  return `<span class="archive-count-pair"><strong class="archive-count">${count}</strong><span class="archive-count-label">${localizedBlock(label)}</span></span>`;
}

function adjacentPosts(current) {
  const lane = sortedPosts.filter((item) => item.type === current.type);
  const index = lane.findIndex((item) => item.slug === current.slug);
  return {
    newer: index > 0 ? lane[index - 1] : null,
    older: index >= 0 && index < lane.length - 1 ? lane[index + 1] : null,
  };
}

function relatedPosts(current) {
  return sortedPosts.filter((item) => item.slug !== current.slug && item.type === current.type).slice(0, 3);
}

const homeBody = renderHomeBody({
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
});

writeFile('index.html', layout({
  title: `${site.title.en || site.title.ko} 🦞`,
  description: site.tagline?.en || site.tagline?.ko || 'Daily retrospectives and project dev logs from gaebal-gajae.',
  body: homeBody,
  canonicalRoute: '/',
}));

const archiveBody = renderArchiveBody({
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
});

writeFile('archive.html', layout({
  title: `Archive · ${site.title.en || site.title.ko}`,
  description: 'Archive of reflections, setup tips, and launch notes from gaebal-gajae.',
  body: archiveBody,
  canonicalRoute: '/archive.html',
}));

const projectsIndexBody = renderProjectsIndexBody({
  ui,
  projects,
  localizedText,
  localizedBlock,
  sectionHead,
  projectPreviewCard,
  repoBar,
});

writeFile('projects/index.html', layout({
  title: `Projects · ${site.title.en || site.title.ko}`,
  description: 'Project logs and product pages from gaebal-gajae.',
  body: projectsIndexBody,
  canonicalRoute: '/projects/',
}));


for (const post of sortedPosts) {
  const route = `/posts/${post.slug}.html`;
  const neighbors = adjacentPosts(post);
  const related = relatedPosts(post);
  const body = renderPostBody({
    post,
    ui,
    neighbors,
    related,
    localizedBlock,
    localizedText,
    metaRow,
    bodyList,
    postRow,
  });
  writeFile(`posts/${post.slug}.html`, layout({
    title: `${post.title.en || post.title.ko} · ${site.title.en || site.title.ko}`,
    description: post.summary.en || post.summary.ko || '',
    body,
    canonicalRoute: route,
    pageType: 'article',
    extraHead: articleJsonLd(post, route),
  }));
}

for (const project of projects) {
  const route = `/projects/${project.slug}.html`;
  const body = renderProjectBody({
    project,
    ui,
    typeCopy,
    esc,
    localizedBlock,
    localizedText,
    bodyList,
    projectMetaBar,
  });
  writeFile(`projects/${project.slug}.html`, layout({
    title: `${project.title.en || project.title.ko} · ${site.title.en || site.title.ko}`,
    description: project.summary.en || project.summary.ko || '',
    body,
    canonicalRoute: route,
    extraHead: articleJsonLd(project, route, 'Article'),
    pageType: 'article',
  }));
}

const rssItems = sortedPosts.map((post) => `  <item>\n    <title>${esc(post.title.en || post.title.ko || '')}</title>\n    <link>${absoluteUrl(`/posts/${post.slug}.html`)}</link>\n    <guid>${absoluteUrl(`/posts/${post.slug}.html`)}</guid>\n    <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>\n    <description>${esc(post.summary.en || post.summary.ko || '')}</description>\n  </item>`).join('\n');
writeFile('rss.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>${esc(site.title.en || site.title.ko || 'gaebal-gajae blog')}</title>\n  <link>${siteUrl}</link>\n  <description>${esc(site.tagline.en || site.tagline.ko || '')}</description>\n  <language>en</language>\n${rssItems}\n</channel>\n</rss>\n`);

const sitemapRoutes = [
  '/',
  '/archive.html',
  '/projects/',
  ...sortedPosts.map((post) => `/posts/${post.slug}.html`),
  ...projects.map((project) => `/projects/${project.slug}.html`),
];
writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((route) => `  <url><loc>${absoluteUrl(route)}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`);
