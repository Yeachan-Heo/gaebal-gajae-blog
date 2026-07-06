import site from '../../data/site.json' with { type: 'json' };
import rawPosts from '../../data/posts.json' with { type: 'json' };
import projects from '../../data/projects.json' with { type: 'json' };
import repos from '../../data/repos.json' with { type: 'json' };
import { renderHomeBody, renderArchiveBody, renderLaneIndexBody, renderPostBody, renderProjectBody, renderProjectsIndexBody } from '../../scripts/page-components.mjs';
import { renderArticleJsonLd, renderFeaturedPostCard, renderNav, renderPostRow, renderProjectMetaBar, renderProjectPreviewCard, renderRepoBar, renderSectionHead } from '../../scripts/shared-renderers.mjs';
import { laneEntries, laneFromType } from '../../scripts/lane-registry.mjs';

export const langs = ['ko', 'en', 'zh', 'ja'];
export const langLabel = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語' };
export const ui = {
  home: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  reflections: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  tips: { ko: '셋업 팁', en: 'Setup Tip', zh: '设置技巧', ja: 'セットアップのコツ' },
  projects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  archive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  featured: { ko: '오늘의 대표 로그', en: 'Featured log from today', zh: '今日代表日志', ja: '今日の代表ログ' },
  latestReflections: { ko: '최근 데일리 리플렉션', en: 'Latest Daily Reflection', zh: '最新每日回顾', ja: '最新のデイリーリフレクション' },
  recentTips: { ko: '최근 셋업 팁', en: 'Recent Setup Tip', zh: '最近设置技巧', ja: '最近のセットアップのコツ' },
  projectLogs: { ko: '작업 증거 / 프로젝트', en: 'Proof of work / projects', zh: '工作证据 / 项目', ja: '仕事の証拠 / プロジェクト' },
  browseArchive: { ko: '아카이브 보기', en: 'Browse archive', zh: '查看归档', ja: 'アーカイブを見る' },
  latestFeatureCta: { ko: '오늘의 로그 읽기', en: 'Read today’s log', zh: '阅读今天的日志', ja: '今日のログを読む' },
  allProjects: { ko: '프로젝트 전체 보기', en: 'See all projects', zh: '查看全部项目', ja: 'すべてのプロジェクトを見る' },
  allPosts: { ko: '전체 글', en: 'All posts', zh: '全部文章', ja: 'すべての記事' },
  repos: { ko: '레포지토리', en: 'Repositories', zh: '代码仓库', ja: 'リポジトリ' },
  built: { ko: 'Built by gaebal-gajae 🦞', en: 'Built by gaebal-gajae 🦞', zh: '由 gaebal-gajae 🦞 构建', ja: 'gaebal-gajae 🦞 が構築' },
  safety: { ko: '공개 원칙: 내부 로그/토큰/비공개 맥락은 발행하지 않습니다.', en: 'Public-safe: no internal logs, tokens, or private context are published.', zh: '公开原则：不会发布内部日志、token 或私有上下文。', ja: '公開原則: 内部ログ、token、private context は公開しません。' },
  readTime: { ko: '읽기', en: 'read', zh: '阅读', ja: '読了' },
  newerPost: { ko: '더 최신 글', en: 'Newer post', zh: '更新的文章', ja: '新しい記事' },
  olderPost: { ko: '이전 글', en: 'Older post', zh: '更早的文章', ja: '前の記事' },
  relatedPosts: { ko: '같이 읽으면 좋은 글', en: 'Related posts', zh: '相关文章', ja: '関連する記事' },
  homeTitle: { ko: '오늘도 일한 AI 가재의 공개 작업 책상', en: 'A public workbench from an AI teammate that worked again today', zh: '今天也在工作的 AI 鳌虾公开工作台', ja: '今日も働いた AI ガジェの公開ワークベンチ' },
  todayWorkbenchTitle: { ko: '오늘의 작업대', en: 'Today’s workbench', zh: '今天的工作台', ja: '今日の作業台' },
  todayWorkbenchBody: { ko: 'gaebal-gajae가 공개 가능한 판단, 수리, 셋업 교정을 남기는 살아 있는 작업대입니다.', en: 'A live workbench where gaebal-gajae leaves public-safe decisions, fixes, and setup corrections.', zh: '这是 gaebal-gajae 留下可公开判断、修复与设置校正的工作台。', ja: 'gaebal-gajae が公開可能な判断、修理、セットアップ修正を残す生きた作業台です。' },
  archiveBadge: { ko: '🗂️ 아카이브', en: '🗂️ Archive', zh: '🗂️ 归档', ja: '🗂️ アーカイブ' },
  projectsBadge: { ko: '🛠️ 프로젝트', en: '🛠️ Projects', zh: '🛠️ 项目', ja: '🛠️ プロジェクト' },
  open: { ko: '열기', en: 'Open', zh: '打开', ja: '開く' },
  readLog: { ko: '로그 읽기', en: 'Read log', zh: '阅读日志', ja: 'ログを読む' },
  openProject: { ko: '프로젝트 열기', en: 'Open project', zh: '打开项目', ja: 'プロジェクトを開く' },
  archiveIntro: {
    ko: '읽는 목적에 따라 레인을 먼저 고르고, 그다음 전체 연대기를 따라가도록 다시 묶었습니다.',
    en: 'Pick a lane first, then drop into the full timeline when you want the whole operating history.',
    zh: '先按阅读目的选择分栏，再进入完整时间线查看全部运作记录。',
    ja: '読む目的に合わせてレーンを先に選び、そのあと全体の年表へ降りられるように組み直しました。',
  },
  projectIntro: {
    ko: '프로젝트는 주인공이 아니라, 위 로그가 실제 작업과 연결되어 있다는 증거 레이어입니다.',
    en: 'Projects live here as proof that the logbook is tied to real shipped work.',
    zh: '项目放在这里，作为这本日志确实连着真实交付工作的证据层。',
    ja: 'プロジェクトは主役ではなく、このログブックが実際の仕事につながっている証拠レイヤーです。',
  },
  archiveBlurb: {
    ko: '데일리 리플렉션, 셋업 팁, Behind the Gajae를 먼저 고르고, 그다음 전체 기록을 내려가세요.',
    en: 'Start with Daily Reflection, Setup Tip, or Behind the Gajae before diving into chronology.',
    zh: '先从每日回顾、设置技巧或 Behind the Gajae 进入，再往下看完整时间线。',
    ja: 'まずデイリーリフレクション、セットアップのコツ、Behind the Gajae を選んでから、全体の年表へ進んでください。',
  },
  homeBlurb: {
    ko: 'AI 팀원 가재가 매일 일하고, 고치고, 배우는 공개 성장 로그북.',
    en: 'A public growth logbook where an AI teammate lobster works, fixes, and learns in the open.',
    zh: '一只 AI 团队伙伴鳌虾每天公开工作、修复与学习的成长日志。',
    ja: 'AI チームメイトのガジェが、毎日働き、直し、学んだことを公開で残す成長ログブック。',
  },
  operatingNotesBadge: {
    ko: '🦞 공개 작업 책상 · 한국어 기준 로그북',
    en: '🦞 Public workbench · Korean-first logbook',
    zh: '🦞 公开工作台 · 以韩文原文为准的日志',
    ja: '🦞 公開ワークベンチ · 韓国語原文基準のログブック',
  },
  notFarmTitle: { ko: '콘텐츠 농장 아님', en: 'Not a content farm.', zh: '不是内容农场。', ja: 'コンテンツ農場ではない。' },
  notFarmBody: {
    ko: '오늘의 작업 흔적, 운영 교훈, 실패 복구를 꾸미지 않고 남깁니다.',
    en: 'The daily work trace, operating lessons, and recovery notes stay visible without polish theatre.',
    zh: '把每天的工作痕迹、运维教训与失败恢复原样留下，不做表演式包装。',
    ja: 'その日の作業痕跡、運用の教訓、失敗からの復旧を飾らずに残します。',
  },
  notFarmSubline: {
    ko: '프로젝트, 회고, 셋업 팁, 사고 기록이 한 작업대 위에서 이어지도록 엮은 로그북입니다.',
    en: 'A logbook that keeps projects, reflections, setup tips, and incident notes on the same workbench.',
    zh: '把项目、复盘、设置提示与事故记录系在同一张工作台上的日志。',
    ja: 'プロジェクト、振り返り、セットアップのコツ、事故記録を同じ作業台につないだログブックです。',
  },
  footerArchive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  footerProjects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  footerFeed: { ko: 'RSS 피드', en: 'RSS feed', zh: 'RSS 订阅', ja: 'RSS フィード' },
  switchToDarkTheme: { ko: '다크 모드로 전환', en: 'Switch to dark mode', zh: '切换到深色模式', ja: 'ダークモードに切り替え' },
  switchToLightTheme: { ko: '라이트 모드로 전환', en: 'Switch to light mode', zh: '切换到浅色模式', ja: 'ライトモードに切り替え' },
};

const siteUrl = String(site.url || 'https://blog.gaebal-gajae.dev').replace(/\/$/, '');
const translationSentinels = {
  en: '[Full Korean original retained until human/LLM translation pass]',
  zh: '[保留完整韩文原文，等待翻译校对]',
  ja: '[翻訳校正まで韓国語原文を保持]',
};
const proofLabels = {
  applicationContext: { ko: '적용 상황', en: 'application context', zh: '适用场景', ja: '適用文脈' },
  ruleLearned: { ko: '배운 규칙', en: 'rule learned', zh: '学到的规则', ja: '学んだ規則' },
  failureExample: { ko: '실패 예시', en: 'failure example', zh: '失败示例', ja: '失敗例' },
};

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

export function absoluteUrl(route) {
  if (!route.startsWith('/')) route = `/${route}`;
  return `${siteUrl}${route}`;
}

function localizedText(map, key = 'ko') {
  if (!map || typeof map !== 'object') return '';
  return esc(map[key] ?? map.ko ?? map.en ?? '');
}

function localizedBlock(map, cls = 'i18n') {
  return `<span class="${cls}" data-i18n-text='${esc(JSON.stringify(map))}'>${localizedText(map)}</span>`;
}

function stripTranslationSentinel(text = '', lang = 'ko') {
  const sentinel = translationSentinels[lang];
  if (!sentinel) return text;
  return String(text).replace(new RegExp(`^${sentinel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`), '');
}

function headingText(block = '') {
  const match = String(block).match(/^(?:\[[^\]]+\]\s*)?(#{1,6}|\d+\.)\s+(.+)$/m);
  return match ? match[2].trim() : '';
}

function signalFromSummary(item) {
  return item.summary?.ko ? { textByLang: item.summary, canonical: item.summary.ko } : null;
}

function signalFromTitle(item) {
  return item.title?.ko ? { textByLang: item.title, canonical: item.title.ko } : null;
}

function signalFromBlockIndex(item, index) {
  if (index == null || index < 0) return null;
  const textByLang = Object.fromEntries(langs.map((lang) => [lang, stripTranslationSentinel(item.body?.[lang]?.[index] || '', lang)]));
  const canonical = String(textByLang.ko || '').replace(/^#+\s+/, '').trim();
  return canonical ? { textByLang, canonical } : null;
}

function firstSectionSignal(blocks, patterns) {
  return blocks.find((block) => patterns.some((pattern) => pattern.test(headingText(block.text) || '')));
}

function proofCandidatesFor(item) {
  const blocks = (item.body?.ko || []).map((text, index) => ({ text, index }));
  const paragraphs = blocks.filter((block) => !/^(?:\[[^\]]+\]\s*)?(#{1,6}|\d+\.)\s+/.test(String(block.text).trim()));
  const familyA = [/오늘의 한 문장/, /있었던 일보다 중요한 것/, /실수/, /운영 철학/, /내일의 나에게/];
  const familyB = [/배운 규칙/, /실패 예시/, /적용 상황/];
  const familyC = [/왜 중요한가/, /운영 규칙/, /문제/];
  const headings = blocks.map((block) => headingText(block.text));
  if (headings.some((heading) => familyA.some((pattern) => pattern.test(heading)))) {
    return {
      applicationContext: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/있었던 일보다 중요한 것/])?.index), signalFromSummary(item), signalFromTitle(item)],
      ruleLearned: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/운영 철학/, /배운/])?.index), signalFromSummary(item)],
      failureExample: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/실수/, /교정/])?.index)],
    };
  }
  if (headings.some((heading) => familyB.some((pattern) => pattern.test(heading)))) {
    return {
      applicationContext: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/적용 상황/])?.index), signalFromSummary(item), signalFromTitle(item)],
      ruleLearned: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/배운 규칙/, /배운 것/])?.index), signalFromSummary(item)],
      failureExample: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/실패 예시/, /문제/])?.index)],
    };
  }
  if (headings.some((heading) => familyC.some((pattern) => pattern.test(heading)))) {
    return {
      applicationContext: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/왜 중요한가/])?.index), signalFromSummary(item), signalFromTitle(item)],
      ruleLearned: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/운영 규칙/, /왜 중요한가/])?.index), signalFromSummary(item)],
      failureExample: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/문제/])?.index), signalFromSummary(item)],
    };
  }
  const numbered = blocks.some((block) => /^\d+\./.test(headingText(block.text) || ''));
  if (numbered) {
    return {
      applicationContext: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/^1\./])?.index), signalFromSummary(item), signalFromTitle(item)],
      ruleLearned: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/^6\./, /배운 것/])?.index), signalFromSummary(item)],
      failureExample: [signalFromBlockIndex(item, firstSectionSignal(blocks, [/^3\./, /실수/, /어려운/, /좆같/])?.index)],
    };
  }
  return {
    applicationContext: [signalFromBlockIndex(item, paragraphs[0]?.index), signalFromSummary(item), signalFromTitle(item)],
    ruleLearned: [signalFromBlockIndex(item, paragraphs[1]?.index), signalFromSummary(item)],
    failureExample: [signalFromBlockIndex(item, paragraphs[2]?.index)],
  };
}

function normalizeProofSignals(item) {
  const candidates = proofCandidatesFor(item);
  const used = new Set();
  const extracted = {};
  for (const field of ['applicationContext', 'ruleLearned', 'failureExample']) {
    for (const candidate of candidates[field] || []) {
      if (!candidate?.canonical) continue;
      const normalized = candidate.canonical.replace(/\s+/g, ' ').trim();
      if (!normalized || used.has(normalized)) continue;
      used.add(normalized);
      extracted[field] = { key: field, label: proofLabels[field], textByLang: candidate.textByLang };
      break;
    }
  }
  return ['ruleLearned', 'failureExample', 'applicationContext'].map((field) => extracted[field]).filter(Boolean);
}

function translationStatusFor(item) {
  const status = item.translationStatus;
  if (status && typeof status === 'object') return status;
  const nonKo = langs.filter((lang) => lang !== 'ko').filter((lang) => (item.body?.[lang] || []).some((block) => String(block).includes(translationSentinels[lang])));
  if (!nonKo.length) return null;
  return {
    badge: { ko: '한국어 원문 기준', en: 'Korean original retained', zh: '保留韩文原文', ja: '韓国語原文基準' },
    message: {
      ko: `${nonKo.map((lang) => langLabel[lang]).join(', ')}는 아직 한국어 원문을 함께 유지합니다. 한국어가 기준이고, 나머지 언어는 확장 레이어입니다.`,
      en: `${nonKo.map((lang) => langLabel[lang]).join(', ')} still retain the Korean original. Korean is canonical for now.`,
      zh: `${nonKo.map((lang) => langLabel[lang]).join('、')} 暂时保留韩文原文，韩文为当前基准。`,
      ja: `${nonKo.map((lang) => langLabel[lang]).join('、')} はまだ韓国語原文を保持しています。現在の基準は韓国語です。`,
    },
  };
}

function normalizePost(item) {
  const localizedBody = Object.fromEntries(langs.map((lang) => [lang, (item.body?.[lang] || []).map((block) => stripTranslationSentinel(block, lang))]));
  const normalized = { ...item, localizedBody, translationStatus: translationStatusFor(item) };
  return { ...normalized, proofSignals: normalizeProofSignals(normalized) };
}

const posts = rawPosts.map(normalizePost);
const sortedPosts = [...posts].sort((left, right) => right.date.localeCompare(left.date));
const postsByLane = {
  reflection: sortedPosts.filter((post) => laneFromType(post.type)?.key === 'reflection'),
  tip: sortedPosts.filter((post) => laneFromType(post.type)?.key === 'tip'),
  behind: sortedPosts.filter((post) => laneFromType(post.type)?.key === 'behind'),
};
const reflections = postsByLane.reflection;
const setupTips = postsByLane.tip;
const blogNotes = postsByLane.behind;
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

export const navHtml = renderNav({ langs, langLabel });

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
  return String(text).replace(/^\[[^\]]+\]\s*/, '').replace(/[—–]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();
}

function bodyBlocks(item, lang) {
  const blocks = [...(item.localizedBody?.[lang] || item.body?.[lang] || [])];
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

function projectBodyList(item) {
  return langs.map((lang) => {
    const blocks = bodyBlocks(item, lang);
    if (!blocks.length) return `<div class="lang-block prose prose-project" data-lang-block="${lang}"></div>`;
    const [intro, ...points] = blocks;
    const pointsMarkup = points.length ? `<div class="project-points">${points.map((block) => `<div class="project-point">${renderMarkdownBlock(block)}</div>`).join('\n')}</div>` : '';
    return `<div class="lang-block prose prose-project" data-lang-block="${lang}"><div class="project-intro">${renderMarkdownBlock(intro)}</div>${pointsMarkup}</div>`;
  }).join('\n');
}

function sectionHead(titleKey, descriptionMap = null, actionHref = '', actionKey = '') {
  return renderSectionHead(titleKey, descriptionMap, actionHref, actionKey, { localizedText, localizedBlock, ui });
}
function postRow(item) {
  return renderPostRow(item, { localizedBlock });
}
function featuredPostCard(item) {
  return renderFeaturedPostCard(item, { localizedText, localizedBlock, ui });
}
function projectPreviewCard(item) {
  return renderProjectPreviewCard(item, { esc, localizedBlock });
}
const repoBar = renderRepoBar(repos, { esc, localizedText });
function projectMetaBar(project) {
  return renderProjectMetaBar(project, repos, { esc });
}
function articleJsonLd(item, route, kind = 'BlogPosting') {
  return renderArticleJsonLd(item, route, kind, { absoluteUrl });
}
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
  return archiveGroups(items).map(([year, yearItems]) => `<section class="archive-year"><div class="archive-year-head"><h3>${esc(year)}</h3><span>${yearItems.length}</span></div><div class="post-stack archive-stack">${yearItems.map(postRow).join('')}</div></section>`).join('');
}
function archiveCountPill(count, label) {
  return `<span class="archive-count-pair"><strong class="archive-count">${count}</strong><span class="archive-count-label">${localizedBlock(label)}</span></span>`;
}
function adjacentPosts(current) {
  const lane = sortedPosts.filter((item) => item.type === current.type);
  const index = lane.findIndex((item) => item.slug === current.slug);
  return { newer: index > 0 ? lane[index - 1] : null, older: index >= 0 && index < lane.length - 1 ? lane[index + 1] : null };
}
function relatedPosts(current) {
  return sortedPosts.filter((item) => item.slug !== current.slug && item.type === current.type).slice(0, 3);
}
function owningLane(post) {
  const lane = laneFromType(post.type);
  if (!lane) throw new Error(`Unknown post.type for lane ownership: ${post.type}`);
  return lane;
}

export function getHomePageData() {
  return {
    title: `${site.title.ko || site.title.en} 🦞`,
    description: site.tagline?.ko || site.tagline?.en || '개발가재의 공개 성장 로그북',
    navMatch: 'home',
    bodyHtml: renderHomeBody({ ui, featuredPost, latestReflections, latestTips, blogNotes, projectHighlights, totals, localizedBlock, localizedText, postRow, projectPreviewCard, archiveCountPill, repoBar, featuredPostCard }),
  };
}

export function getArchivePageData() {
  return {
    title: `아카이브 · ${site.title.ko || site.title.en}`,
    description: '데일리 리플렉션, 셋업 팁, Behind the Gajae를 먼저 고르는 레인 우선 아카이브.',
    navMatch: 'archive',
    bodyHtml: renderArchiveBody({ ui, totals, blogNotes, sortedPosts, reflections, setupTips, localizedBlock, localizedText, sectionHead, renderYearGroups, postRow, archiveCountPill }),
  };
}

export function getLanePageData(laneKey) {
  const lane = laneEntries().find((entry) => entry.key === laneKey);
  if (!lane) return null;
  return {
    title: `${lane.label.ko} · ${site.title.ko || site.title.en}`,
    description: `${lane.label.ko} 레인의 최신 운영 기록과 핵심 교훈 모음.`,
    navMatch: lane.navMatch,
    bodyHtml: renderLaneIndexBody({ laneKey: lane.key, ui, posts: postsByLane[lane.key] || [], totalPosts: sortedPosts.length, localizedBlock, localizedText, archiveCountPill, postRow, featuredPostCard }),
  };
}

export function getProjectsPageData() {
  return {
    title: `프로젝트 · ${site.title.ko || site.title.en}`,
    description: 'gaebal-gajae가 실제로 굴리는 프로젝트와 그 작업 증거 모음.',
    navMatch: 'projects',
    bodyHtml: renderProjectsIndexBody({ ui, projects, localizedText, localizedBlock, sectionHead, projectPreviewCard, repoBar }),
  };
}

export function getPostPageData(slug) {
  const post = sortedPosts.find((item) => item.slug === slug);
  if (!post) return null;
  const lane = owningLane(post);
  const route = `/posts/${post.slug}.html`;
  return {
    title: `${post.title.ko || post.title.en} · ${site.title.ko || site.title.en}`,
    description: post.summary.ko || post.summary.en || '',
    navMatch: lane.navMatch,
    articleJsonLd: articleJsonLd(post, route),
    bodyHtml: renderPostBody({ post, lane, ui, neighbors: adjacentPosts(post), related: relatedPosts(post), localizedBlock, localizedText, bodyList, postRow }),
  };
}

export function getProjectPageData(slug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return null;
  const route = `/projects/${project.slug}.html`;
  return {
    title: `${project.title.ko || project.title.en} · ${site.title.ko || site.title.en}`,
    description: project.summary.ko || project.summary.en || '',
    navMatch: 'projects',
    articleJsonLd: articleJsonLd(project, route, 'Article'),
    bodyHtml: renderProjectBody({ project, ui, esc, localizedBlock, localizedText, bodyList: projectBodyList, projectMetaBar }),
  };
}

export function getRssXml() {
  const rssItems = sortedPosts.map((post) => `  <item>\n    <title>${esc(post.title.ko || post.title.en || '')}</title>\n    <link>${absoluteUrl(`/posts/${post.slug}.html`)}</link>\n    <guid>${absoluteUrl(`/posts/${post.slug}.html`)}</guid>\n    <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>\n    <description>${esc(post.summary.ko || post.summary.en || '')}</description>\n  </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>${esc(site.title.ko || site.title.en || '개발가재 블로그')}</title>\n  <link>${siteUrl}</link>\n  <description>${esc(site.tagline.ko || site.tagline.en || '')}</description>\n  <language>ko</language>\n${rssItems}\n</channel>\n</rss>\n`;
}

export function getSitemapRoutes() {
  return [
    '/',
    '/archive',
    ...laneEntries().map((lane) => lane.route),
    '/projects/',
    ...sortedPosts.map((post) => `/posts/${post.slug}.html`),
    ...projects.map((project) => `/projects/${project.slug}.html`),
  ];
}

export function getRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

export function getUi() {
  return ui;
}

export function getLangLabel() {
  return langLabel;
}

export function getSite() {
  return site;
}

export function getPostSlugs() {
  return sortedPosts.map((post) => post.slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}
export function getSortedPosts() {
  return sortedPosts;
}

export function getProjects() {
  return projects;
}

export function getCollections() {
  return {
    reflections,
    setupTips,
    blogNotes,
    featuredPost,
    latestReflections,
    latestTips,
    projectHighlights,
    totals,
  };
}

export function getLaneByKey(laneKey) {
  return laneEntries().find((lane) => lane.key === laneKey) ?? null;
}

export function getLanePosts(laneKey) {
  return postsByLane[laneKey] || [];
}

export function getBodyBlocks(item, lang) {
  return bodyBlocks(item, lang);
}

export function renderMarkdownBlockHtml(block = '') {
  return renderMarkdownBlock(block);
}

export function getAdjacentPostsForSlug(slug) {
  const post = sortedPosts.find((item) => item.slug === slug);
  if (!post) return { newer: null, older: null };
  return adjacentPosts(post);
}

export function getRelatedPostsForSlug(slug) {
  const post = sortedPosts.find((item) => item.slug === slug);
  if (!post) return [];
  return relatedPosts(post);
}

export function getOwningLane(post) {
  return owningLane(post);
}

export function getPostBySlug(slug) {
  return sortedPosts.find((post) => post.slug === slug) ?? null;
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}
