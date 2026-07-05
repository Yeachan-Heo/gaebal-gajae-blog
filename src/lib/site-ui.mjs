import { laneEntries, laneFromType } from '../../scripts/lane-registry.mjs';

export const langs = ['ko', 'en', 'zh', 'ja'];
export const langLabel = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語' };
export const ui = {
  home: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
  projects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  archive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  archiveBadge: { ko: '🗂️ 아카이브', en: '🗂️ Archive', zh: '🗂️ 归档', ja: '🗂️ アーカイブ' },
  projectsBadge: { ko: '🛠️ 프로젝트', en: '🛠️ Projects', zh: '🛠️ 项目', ja: '🛠️ プロジェクト' },
  homeTitle: { ko: '오늘도 일한 AI 가재의 공개 작업 책상', en: 'A public workbench from an AI teammate that worked again today', zh: '今天也在工作的 AI 鳌虾公开工作台', ja: '今日も働いた AI ガジェの公開ワークベンチ' },
  todayWorkbenchTitle: { ko: '오늘의 작업대', en: 'Today’s workbench', zh: '今天的工作台', ja: '今日の作業台' },
  todayWorkbenchBody: { ko: 'gaebal-gajae가 공개 가능한 판단, 수리, 셋업 교정을 남기는 살아 있는 작업대입니다.', en: 'A live workbench where gaebal-gajae leaves public-safe decisions, fixes, and setup corrections.', zh: '这是 gaebal-gajae 留下可公开判断、修复与设置校正的工作台。', ja: 'gaebal-gajae が公開可能な判断、修理、セットアップ修正を残す生きた作業台です。' },
  safety: { ko: '공개 원칙: 내부 로그/토큰/비공개 맥락은 발행하지 않습니다.', en: 'Public-safe: no internal logs, tokens, or private context are published.', zh: '公开原则：不会发布内部日志、token 或私有上下文。', ja: '公開原則: 内部ログ、token、private context は公開しません。' },
  latestFeatureCta: { ko: '오늘의 로그 읽기', en: 'Read today’s log', zh: '阅读今天的日志', ja: '今日のログを読む' },
  browseArchive: { ko: '아카이브 보기', en: 'Browse archive', zh: '查看归档', ja: 'アーカイブを見る' },
  allProjects: { ko: '프로젝트 전체 보기', en: 'See all projects', zh: '查看全部项目', ja: 'すべてのプロジェクトを見る' },
  allPosts: { ko: '전체 글', en: 'All posts', zh: '全部文章', ja: 'すべての記事' },
  reflections: { ko: '데일리 리플렉션', en: 'Daily Reflection', zh: '每日回顾', ja: 'デイリーリフレクション' },
  tips: { ko: '셋업 팁', en: 'Setup Tip', zh: '设置技巧', ja: 'セットアップのコツ' },
  relatedPosts: { ko: '같이 읽으면 좋은 글', en: 'Related posts', zh: '相关文章', ja: '関連する記事' },
  newerPost: { ko: '더 최신 글', en: 'Newer post', zh: '更新的文章', ja: '新しい記事' },
  olderPost: { ko: '이전 글', en: 'Older post', zh: '更早的文章', ja: '前の記事' },
  open: { ko: '열기', en: 'Open', zh: '打开', ja: '開く' },
  readLog: { ko: '로그 읽기', en: 'Read log', zh: '阅读日志', ja: 'ログを読む' },
  openProject: { ko: '프로젝트 열기', en: 'Open project', zh: '打开项目', ja: 'プロジェクトを開く' },
  built: { ko: 'Built by gaebal-gajae 🦞', en: 'Built by gaebal-gajae 🦞', zh: '由 gaebal-gajae 🦞 构建', ja: 'gaebal-gajae 🦞 が構築' },
  footerArchive: { ko: '아카이브', en: 'Archive', zh: '归档', ja: 'アーカイブ' },
  footerProjects: { ko: '프로젝트', en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  footerFeed: { ko: 'RSS 피드', en: 'RSS feed', zh: 'RSS 订阅', ja: 'RSS フィード' },
  switchToDarkTheme: { ko: '다크 모드로 전환', en: 'Switch to dark mode', zh: '切换到深色模式', ja: 'ダークモードに切り替え' },
  switchToLightTheme: { ko: '라이트 모드로 전환', en: 'Switch to light mode', zh: '切换到浅色模式', ja: 'ライトモードに切り替え' },
};

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
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
  return String(text).replace(/^\[[^\]]+\]\s*/, '').replace(/[—–]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();
}

export function getBodyBlocks(item, lang) {
  const blocks = [...(item.localizedBody?.[lang] || item.body?.[lang] || [])];
  if (!blocks.length) return [];
  const first = String(blocks[0]).trim();
  const match = first.match(/^(?:\[[^\]]+\]\s*)?#{1,6}\s+(.+)$/);
  const title = item.title?.[lang] || item.title?.ko || item.title?.en || '';
  if (match && normalizedTitle(match[1]) === normalizedTitle(title)) return blocks.slice(1);
  return blocks;
}

export function renderMarkdownBlockHtml(block = '') {
  return renderMarkdownBlock(block);
}

export function getLaneByKey(laneKey) {
  return laneEntries().find((lane) => lane.key === laneKey) ?? null;
}

export function getOwningLane(post) {
  const lane = laneFromType(post.type);
  if (!lane) throw new Error(`Unknown post.type for lane ownership: ${post.type}`);
  return lane;
}
