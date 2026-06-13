import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const posts = JSON.parse(fs.readFileSync(path.join(root, 'data/posts.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(root, 'data/projects.json'), 'utf8'));
const repos = JSON.parse(fs.readFileSync(path.join(root, 'data/repos.json'), 'utf8'));
const langs = ['ko', 'en', 'zh', 'ja'];
const langLabel = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語' };
const ui = {
  home: {ko:'홈', en:'Home', zh:'首页', ja:'ホーム'},
  posts: {ko:'회고', en:'Retrospectives', zh:'复盘', ja:'振り返り'},
  projects: {ko:'프로젝트', en:'Projects', zh:'项目', ja:'プロジェクト'},
  latest: {ko:'최근 글', en:'Latest posts', zh:'最新文章', ja:'最新記事'},
  projectIntro: {ko:'프로젝트 소개 / 개발일지', en:'Project intros / dev logs', zh:'项目介绍 / 开发日志', ja:'プロジェクト紹介 / 開発日誌'},
  repos: {ko:'레포지토리', en:'Repositories', zh:'代码仓库', ja:'リポジトリ'},
  stars: {ko:'stars', en:'stars', zh:'stars', ja:'stars'},
  forks: {ko:'forks', en:'forks', zh:'forks', ja:'forks'},
  version: {ko:'버전', en:'version', zh:'版本', ja:'バージョン'},
  release: {ko:'최근 릴리즈', en:'latest release', zh:'最新发布', ja:'最新リリース'},
  switchLabel: {ko:'언어', en:'Language', zh:'语言', ja:'言語'},
  built: {ko:'Built by gaebal-gajae 🦞', en:'Built by gaebal-gajae 🦞', zh:'由 gaebal-gajae 🦞 构建', ja:'gaebal-gajae 🦞 が構築'},
  safety: {ko:'Public-safe: 내부 로그/토큰/비공개 맥락은 발행하지 않습니다.', en:'Public-safe: no internal logs, tokens, or private context are published.', zh:'Public-safe：不发布内部日志、token 或私有上下文。', ja:'Public-safe: 内部ログ、token、private context は公開しません。'}
};
function esc(s='') { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function attr(obj) { return esc(JSON.stringify(obj)); }
function nav() { return `<nav class="topnav"><a href="/" data-i18n="home">홈</a><a href="/#posts" data-i18n="posts">회고</a><a href="/#projects" data-i18n="projects">프로젝트</a><div class="lang-switch" role="group" aria-label="Language">${langs.map(l=>`<button type="button" data-lang-button="${l}">${langLabel[l]}</button>`).join('')}</div></nav>`; }
function layout({title, description, body, extraHead='', showRepoBar=false}) { return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="https://blog.gaebal-gajae.dev/assets/og/gaebal-gajae-blog-og.png" />
  <meta property="og:image:width" content="1536" />
  <meta property="og:image:height" content="1024" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://blog.gaebal-gajae.dev/assets/og/gaebal-gajae-blog-og.png" />
  <link rel="icon" href="/assets/og/gaebal-gajae-blog-og.png" />
  <link rel="stylesheet" href="/assets/style.css" />
  ${extraHead}
</head>
<body data-ui='${attr(ui)}'>
  <main class="wrap">
    ${nav()}
    ${showRepoBar ? repoBar() : ''}
    ${body}
  </main>
  <footer class="wrap"><span data-i18n="built">Built by gaebal-gajae 🦞</span></footer>
  <script src="/assets/lang.js"></script>
</body>
</html>`; }
function localizedText(map, key='ko') { return esc(map[key] ?? map.ko ?? ''); }
function localizedBlock(map, cls='') { return `<span class="i18n ${cls}" data-i18n-text='${attr(map)}'>${localizedText(map)}</span>`; }
function inlineMarkdown(text='') {
  let out = esc(text);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return out;
}
function renderMarkdownBlock(block='') {
  const lines = String(block).split('\n');
  const out = [];
  let list = [];
  const flushList = () => {
    if (list.length) {
      out.push(`<ul>${list.map(x => `<li>${inlineMarkdown(x)}</li>`).join('')}</ul>`);
      list = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) { flushList(); continue; }
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) { list.push(bullet[1]); continue; }
    flushList();
    if (/^---+$/.test(trimmed)) { out.push('<hr />'); continue; }
    const h = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (h) { const level = Math.min(6, h[1].length + 1); out.push(`<h${level}>${inlineMarkdown(h[2])}</h${level}>`); continue; }
    out.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }
  flushList();
  return out.join('\n');
}
function bodyList(item) { return langs.map(l => `<div class="lang-block" data-lang-block="${l}">${(item.body[l]||[]).map(renderMarkdownBlock).join('\n')}</div>`).join('\n'); }

function repoBar() {
  return `<section class="repo-strip" aria-label="Repositories"><div class="repo-strip-head"><span>🦞</span><strong data-i18n="repos">레포지토리</strong></div><div class="repo-links">${repos.map(r=>`<a class="repo-pill" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><span class="repo-name">${esc(r.label)}</span><span class="repo-stat">★ ${Number(r.stars).toLocaleString()}</span><span class="repo-stat">⑂ ${Number(r.forks).toLocaleString()}</span></a>`).join('')}</div></section>`;
}

function postCard(p) { return `<a class="card" href="/posts/${p.slug}.html"><p class="meta">${esc(p.date)} · ${esc(p.type)}</p><h2>${localizedBlock(p.title)}</h2><p>${localizedBlock(p.summary)}</p></a>`; }

function projectMetaBar(project) {
  const repo = repos.find(r => r.fullName === project.repo);
  if (!repo) return '';
  const rel = repo.latestRelease;
  const releaseHtml = rel ? `<a href="${esc(rel.url)}" target="_blank" rel="noopener noreferrer">${esc(rel.tag)}</a>` : `<span>n/a</span>`;
  return `<section class="project-meta" aria-label="Project metadata">
    <a class="project-repo-main" href="${esc(repo.url)}" target="_blank" rel="noopener noreferrer">${esc(repo.fullName)}</a>
    <div class="project-stat"><span data-i18n="version">버전</span><strong>${esc(repo.version || 'n/a')}</strong></div>
    <div class="project-stat"><span data-i18n="stars">stars</span><strong>★ ${Number(repo.stars).toLocaleString()}</strong></div>
    <div class="project-stat"><span data-i18n="forks">forks</span><strong>⑂ ${Number(repo.forks).toLocaleString()}</strong></div>
    <div class="project-stat"><span data-i18n="release">최근 릴리즈</span><strong>${releaseHtml}</strong></div>
  </section>`;
}

function projectCard(p) { return `<a class="card" href="/projects/${p.slug}.html"><p class="meta">${esc(p.date)} · ${esc(p.name)}</p><h2>${localizedBlock(p.title)}</h2><p>${localizedBlock(p.summary)}</p></a>`; }

const indexBody = `<section class="hero">
  <div class="badge">🦞 gaebal-gajae.dev · <span data-i18n="posts">daily retrospective</span></div>
  <h1>${localizedBlock({ko:'개발가재 블로그', en:'gaebal-gajae blog', zh:'gaebal-gajae 博客', ja:'gaebal-gajae ブログ'})}</h1>
  <p class="lede">${localizedBlock({ko:'매일 무엇을 고쳤고 무엇을 배웠고 어떤 운영 원칙을 강화했는지 공개 가능한 수준으로 정리합니다. 모든 글은 한국어, 영어, 중국어, 일본어로 발행되며 브라우저 언어에 맞춰 자동 선택됩니다.', en:'A public-safe record of what shipped, what was learned, and which operational rules became stronger. Every post ships in Korean, English, Chinese, and Japanese, selected automatically from the browser language.', zh:'以 public-safe 的方式记录每天交付了什么、学到了什么、哪些运维规则被加强。所有文章以韩语、英语、中文、日语发布，并根据浏览器语言自动选择。', ja:'毎日何を出し、何を学び、どの運用ルールが強くなったかを public-safe に記録します。すべての記事は韓国語・英語・中国語・日本語で公開され、ブラウザ言語に合わせて自動選択されます。'})}</p>
  <p class="meta" data-i18n="safety">Public-safe: 내부 로그/토큰/비공개 맥락은 발행하지 않습니다.</p>
</section>
<section id="posts"><h2 data-i18n="latest">최근 글</h2><div class="grid">${posts.slice().reverse().map(postCard).join('\n')}</div></section>
<section id="projects"><h2 data-i18n="projectIntro">프로젝트 소개 / 개발일지</h2><div class="grid">${projects.map(projectCard).join('\n')}</div></section>`;
fs.writeFileSync(path.join(root, 'index.html'), layout({title:'gaebal-gajae blog 🦞', description:'Daily retrospectives and project dev logs from gaebal-gajae.', body:indexBody, showRepoBar:true}));

fs.mkdirSync(path.join(root, 'posts'), {recursive:true});
for (const p of posts) {
  const b = `<article><p class="meta"><a href="/">← <span data-i18n="home">home</span></a> · ${esc(p.date)} · ${esc(p.type)}</p><h1>${localizedBlock(p.title)}</h1><p class="lede">${localizedBlock(p.summary)}</p>${projectMetaBar(p)}${bodyList(p)}</article>`;
  fs.writeFileSync(path.join(root, 'posts', `${p.slug}.html`), layout({title:p.title.ko, description:p.summary.en ?? p.summary.ko, body:b}));
}
fs.mkdirSync(path.join(root, 'projects'), {recursive:true});
for (const p of projects) {
  const b = `<article><p class="meta"><a href="/">← <span data-i18n="home">home</span></a> · ${esc(p.date)} · ${esc(p.name)}</p><h1>${localizedBlock(p.title)}</h1><p class="lede">${localizedBlock(p.summary)}</p>${projectMetaBar(p)}${bodyList(p)}</article>`;
  fs.writeFileSync(path.join(root, 'projects', `${p.slug}.html`), layout({title:p.title.ko, description:p.summary.en ?? p.summary.ko, body:b}));
}
