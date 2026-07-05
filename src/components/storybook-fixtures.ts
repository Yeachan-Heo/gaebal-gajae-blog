import type { PostItem, ProjectItem, ProofSignalItem } from '@/components/blog-cards'

export const storySignals: ProofSignalItem[] = [
  {
    key: 'ruleLearned',
    label: { ko: '배운 규칙', en: 'Rule learned', zh: '学到的规则', ja: '学んだ規則' },
    textByLang: {
      ko: '**규칙**\n- 증거가 없으면 완료라고 부르지 않는다.',
      en: '**Rule**\n- Do not call it done without evidence.',
      zh: '**规则**\n- 没有证据，就不要说它完成了。',
      ja: '**規則**\n- 証拠がないなら完了と呼ばない。',
    },
  },
  {
    key: 'failureExample',
    label: { ko: '실수 / 교정', en: 'Failure / correction', zh: '失误 / 修正', ja: '失敗 / 修正' },
    textByLang: {
      ko: '- 초록불만 보고 넘기지 않고, 사용자 표면을 다시 확인했다.',
      en: '- We did not trust the green light alone and re-checked the user-facing surface.',
      zh: '- 没有只看绿灯就放行，而是重新检查了用户可见表面。',
      ja: '- 緑の結果だけを信じず、ユーザーに見える面を再確認した。',
    },
  },
  {
    key: 'applicationContext',
    label: { ko: '적용 상황', en: 'Application context', zh: '适用场景', ja: '適用文脈' },
    textByLang: {
      ko: '- 같은 규칙을 다음 셋업 교정에도 그대로 재사용한다.',
      en: '- Reuse the same rule for the next setup correction.',
      zh: '- 下一次设置修正也复用同一条规则。',
      ja: '- 次のセットアップ修正にも同じ規則を再利用する。',
    },
  },
]

export const plainPost: PostItem = {
  slug: 'storybook-plain-post',
  date: '2026-06-24',
  type: 'retrospective',
  title: {
    ko: '가재가 남긴 운영 기록',
    en: 'An operating note left by Gajae',
    zh: 'Gajae 留下的运作记录',
    ja: 'ガジェが残した運用記録',
  },
  summary: {
    ko: '하루 작업에서 무엇을 판단했고 무엇을 바로잡았는지 짧게 요약한다.',
    en: 'A short summary of what changed and what got corrected in a day of work.',
    zh: '简要总结这一天的工作里做了什么判断、修正了什么。',
    ja: 'その日の作業で何を判断し、何を直したかを短くまとめる。',
  },
  body: { ko: [], en: [], zh: [], ja: [] },
}

export const featuredPost: PostItem = {
  ...plainPost,
  slug: 'storybook-featured-post',
  title: {
    ko: '오늘의 대표 로그',
    en: 'Featured log from today',
    zh: '今日代表日志',
    ja: '今日の代表ログ',
  },
  summary: {
    ko: '대표 카드에서는 proof signal과 CTA가 같이 보여야 한다.',
    en: 'The featured card should surface proof signals and CTA together.',
    zh: '代表卡片应该同时展示 proof signal 与 CTA。',
    ja: '注目カードでは proof signal と CTA が一緒に見えるべきです。',
  },
  proofSignals: storySignals,
}

export const primaryProject: ProjectItem = {
  slug: 'storybook-omc',
  date: '2026-06-13',
  name: 'OmC / oh-my-claudecode',
  title: {
    ko: 'OmC: Claude Code 운영의 레일',
    en: 'OmC: Rails for Claude Code Operations',
    zh: 'OmC：Claude Code 运维轨道',
    ja: 'OmC：Claude Code 運用のレール',
  },
  summary: {
    ko: '멀티 에이전트 Claude Code 운영을 빠르게, 검증 가능하게 굴리기 위한 프로젝트.',
    en: 'A project for running multi-agent Claude Code work quickly and verifiably.',
    zh: '用于快速、可验证地运行多 agent Claude Code 工作的项目。',
    ja: 'multi-agent Claude Code 作業を速く、検証可能に回すためのプロジェクト。',
  },
  body: { ko: [], en: [], zh: [], ja: [] },
  previewImage: '/assets/projects/omc-social-preview.jpg',
}

export const secondaryProject: ProjectItem = {
  slug: 'storybook-omx',
  date: '2026-06-13',
  name: 'OmX / oh-my-codex',
  title: {
    ko: 'OmX: Codex CLI를 운영 가능한 도구로 만들기',
    en: 'OmX: Making Codex CLI Operational',
    zh: 'OmX：让 Codex CLI 可运维',
    ja: 'OmX：Codex CLI を運用可能にする',
  },
  summary: {
    ko: 'setup/update·hook·config 경계를 운영 기준으로 다듬는 프로젝트.',
    en: 'A project that tightens setup/update, hook, and config boundaries for operations.',
    zh: '把 setup/update、hook、config 边界打磨成可运维形态的项目。',
    ja: 'setup/update・hook・config の境界を運用基準で整えるプロジェクト。',
  },
  body: { ko: [], en: [], zh: [], ja: [] },
  previewImage: '/assets/projects/omc-social-preview.jpg',
}
