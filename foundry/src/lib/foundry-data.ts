export type LocalizedText = Record<string, string>;
export type Cell = string | LocalizedText;
export type TripleRow = [Cell, Cell, Cell];
export type TokenPreview = 'surface' | 'text' | 'border';
export type TokenSwatch = {
  token: string;
  preview: TokenPreview;
  usage: LocalizedText;
  description: LocalizedText;
};
export type TokenGroup = {
  id: 'base-surfaces' | 'ink' | 'accent-status' | 'evidence';
  title: LocalizedText;
  description: LocalizedText;
  tokens: readonly TokenSwatch[];
};

export type PreviewCard = {
  label: string;
  title: Cell;
  role: Cell;
  note: Cell;
  variant: 'default' | 'lead' | 'tip' | 'evidence' | 'report' | 'reference';
  modifiers?: Array<'featured' | 'with-rail' | 'with-corner' | 'wide'>;
  legend?: Cell[];
  bullets?: Cell[];
};

export const tokenGroups: readonly TokenGroup[] = [
  {
    id: 'base-surfaces',
    title: { ko: 'Base surfaces', en: 'Base surfaces', zh: '基础表面', ja: '基本サーフェス' },
    description: { ko: 'blue-crab / red-claw 작업대에서 바탕 면, 읽기 면, 메시지 패널, 선택 상태를 gajae-code TUI 값 그대로 서로 다른 높이로 분리한다.', en: 'Separate the field shell, reading sheets, message plates, and selected states by distinct height using the exact gajae-code TUI values for blue-crab and red-claw.', zh: '在 blue-crab / red-claw 工作台里，用 gajae-code TUI 的原始值把底面、阅读面、消息面板与选中状态按不同高度分开。', ja: 'blue-crab / red-claw の作業台で、gajae-code TUI の元値をそのまま使い、地面、読む面、メッセージ面、選択状態を異なる高さで分ける。' },
    tokens: [
      { token: 'paper-canvas', preview: 'surface', usage: { ko: '전체 작업대 바탕', en: 'Workbench field', zh: '整张工作台底面', ja: '作業台全体の地面' }, description: { ko: 'gajae-code export.pageBg를 그대로 쓰는 작업대 바탕면. blue-crab은 abyss, red-claw는 ink 바닥을 그대로 쓴다.', en: 'Workbench field that uses gajae-code export.pageBg directly. Blue-crab keeps its abyss floor, while red-claw keeps its ink floor.', zh: '直接使用 gajae-code export.pageBg 的工作台底面。blue-crab 保留 abyss 底面，red-claw 保留 ink 底面。', ja: 'gajae-code の export.pageBg をそのまま使う作業台の地面。blue-crab は abyss、red-claw は ink の床をそのまま保つ。' } },
      { token: 'surface', preview: 'surface', usage: { ko: '기본 카드 / 본문 섹션', en: 'Base cards and body sections', zh: '基础卡片 / 正文区块', ja: '基本カード / 本文セクション' }, description: { ko: '가장 자주 쓰는 읽기 표면. 배경보다 한 단계만 올라오고, 액센트보다 먼저 나서지 않는다.', en: 'Default reading surface. It rises only one step above the field and never shouts before the accent.', zh: '最常用的阅读表面。它只比底面高一层，且不会先于 accent 喊出来。', ja: 'もっとも多く使う読む面。地面より一段だけ上がり、accent より先に叫ばない。' } },
      { token: 'surface-soft', preview: 'surface', usage: { ko: '메시지 패널 / 미디어 프레임', en: 'Message panels and media frames', zh: '消息面板 / 媒体框', ja: 'メッセージパネル / メディアフレーム' }, description: { ko: 'JSON colors.userMessageBg를 그대로 받는 중간 표면. blue-crab에서는 info panel처럼 살짝 들리고, red-claw에서는 red workbench 안쪽의 뜨거운 판으로 읽힌다.', en: 'Intermediate surface that takes JSON colors.userMessageBg directly. In blue-crab it reads like a lifted info panel, while red-claw turns into the hotter plate inside the red workbench.', zh: '直接承接 JSON colors.userMessageBg 的中间表面。blue-crab 像被抬起的信息面板，red-claw 则像红色工作台内部更热的一块板。', ja: 'JSON の colors.userMessageBg をそのまま受ける中間面。blue-crab では持ち上がった情報パネルに、red-claw では赤い作業台の内側にある熱いプレートとして読まれる。' } },
      { token: 'surface-muted', preview: 'surface', usage: { ko: '조용한 유틸 패널 / 보조 플레이트', en: 'Quiet utility panels and support plates', zh: '安静工具面板 / 辅助面', ja: '静かなユーティリティ面 / 補助プレート' }, description: { ko: 'JSON colors.customMessageBg와 toolPendingBg가 기대는 mantle 계열 바닥. 주 표면보다 한 단계 눌러서 보조 정보가 뒤로 물러난다.', en: 'Mantle-level base that JSON colors.customMessageBg and toolPendingBg lean on. It sits one step behind the main reading surface so support information recedes.', zh: 'JSON colors.customMessageBg 与 toolPendingBg 依附的 mantle 底面。它比主阅读表面再退一层，让辅助信息后退。', ja: 'JSON の colors.customMessageBg と toolPendingBg が寄りかかる mantle レベルの土台。主読む面より一段引くことで補助情報を後ろへ下げる。' } },
      { token: 'surface-raised', preview: 'surface', usage: { ko: '강조 카드 / docs preview', en: 'Lifted cards and docs previews', zh: '抬起卡片 / docs 预览', ja: '持ち上げたカード / docs プレビュー' }, description: { ko: 'export.infoBg에 맞춘 한 단계 lifted 표면. blue-crab은 차가운 네이비, red-claw는 깊은 적갈색으로 올라온다.', en: 'One-step lifted surface aligned to export.infoBg. Blue-crab rises as cold navy, while red-claw rises as deep heated red-brown.', zh: '与 export.infoBg 对齐、抬高一级的表面。blue-crab 提升为冷海军蓝，red-claw 则提升为更深的赤褐色。', ja: 'export.infoBg に合わせた一段 lifted の表面。blue-crab は冷たいネイビーへ、red-claw は深い赤褐色へ持ち上がる。' } },
      { token: 'surface-selected', preview: 'surface', usage: { ko: '현재 선택 / 활성 상태', en: 'Selected and active state', zh: '当前选择 / 激活状态', ja: '現在選択 / アクティブ状態' }, description: { ko: 'TUI colors.selectedBg를 그대로 받는 상태 표면. blue-crab은 밝은 네이비, red-claw는 brand red보다 어두운 deep red 판으로 분명히 갈라진다.', en: 'State surface that takes TUI colors.selectedBg directly. Blue-crab becomes a brighter navy, while red-claw becomes a deeper red plate that stays darker than the brand accent.', zh: '直接承接 TUI colors.selectedBg 的状态表面。blue-crab 会成为更亮的海军蓝，red-claw 则成为比品牌红更深的深红板面。', ja: 'TUI の colors.selectedBg をそのまま受ける状態面。blue-crab は明るいネイビーに、red-claw はブランド赤より暗い deep red の板へとはっきり分かれる。' } },
      { token: 'surface-nav', preview: 'surface', usage: { ko: '상단 인덱스 바', en: 'Top index bar', zh: '顶部索引条', ja: '上部インデックスバー' }, description: { ko: '작업대 전체 위에 얹히는 상단 스트립. 앱 탭보다 TUI 상단 바에 가깝게 읽힌다.', en: 'Top strip that sits above the workbench, reading closer to a TUI top bar than app tabs.', zh: '压在工作台上方的顶部条，更接近 TUI 顶栏而不是应用标签。', ja: '作業台の上に乗る上部ストリップ。アプリのタブより TUI の上部バーに近く読む。' } },
      { token: 'surface-nav-group', preview: 'surface', usage: { ko: '언어 / 토글 묶음 배경', en: 'Locale and toggle cluster', zh: '语言 / 切换簇背景', ja: '言語 / トグル群の背景' }, description: { ko: '상단 바 안에서 작은 조작 묶음을 한 덩어리로 잡는 보조 표면.', en: 'Support surface that groups tiny controls inside the top bar.', zh: '把顶部条里小控制组拢成一块的辅助表面。', ja: '上部バーの小さな操作群を一塊にまとめる補助面。' } },
    ],
  },
  {
    id: 'ink',
    title: { ko: 'Ink', en: 'Ink', zh: '文字色', ja: 'インク' },
    description: { ko: '제목, 본문, 조용한 메타, 링크, 경계선은 모두 다른 밀도로 읽혀야 한다.', en: 'Headings, body prose, quiet metadata, links, and rules must read at different densities.', zh: '标题、正文、安静 meta、链接与分隔线必须以不同密度被读到。', ja: '見出し、本文、静かな meta、リンク、区切り線は異なる密度で読まれるべきです。' },
    tokens: [
      { token: 'ink-strong', preview: 'text', usage: { ko: '제목 / 핵심 레이블', en: 'Headings and key labels', zh: '标题 / 关键标签', ja: '見出し / 重要ラベル' }, description: { ko: '가장 먼저 멈춰 세우는 검은 잉크. 페이지의 골격을 만든다.', en: 'Primary stopping ink that builds the skeleton of the page.', zh: '第一眼停下来的深色墨水，负责页面骨架。', ja: '最初に視線を止める濃いインク。ページの骨格を作る。' } },
      { token: 'ink-soft', preview: 'text', usage: { ko: '본문 / 설명 문장', en: 'Body and support copy', zh: '正文 / 说明文字', ja: '本文 / 説明文' }, description: { ko: '길게 읽어도 피곤하지 않은 문장 톤. strong와 거리를 벌려야 리듬이 생긴다.', en: 'Prose tone for long reading. It needs real distance from strong ink to create rhythm.', zh: '适合长文阅读的正文色。必须和 strong ink 拉开距离，节奏才会出现。', ja: '長文でも疲れにくい本文トーン。strong ink と距離があって初めてリズムが出る。' } },
      { token: 'ink-faint', preview: 'text', usage: { ko: '메타 / eyebrow / 조용한 주석', en: 'Meta, eyebrow, and quiet notes', zh: 'meta / eyebrow / 安静注释', ja: 'meta / eyebrow / 静かな注記' }, description: { ko: '본문과 경쟁하지 않는 낮은 밀도의 보조 정보.', en: 'Low-density support information that never competes with the body.', zh: '不会和正文抢注意力的低密度辅助信息。', ja: '本文と競合しない低密度の補助情報。' } },
      { token: 'ink-inverse', preview: 'text', usage: { ko: '강한 액센트 위 문자', en: 'Text on strong accent fills', zh: '强强调底上的文字', ja: '強いアクセント面の上の文字' }, description: { ko: '버튼이나 stamp 같은 강한 채움 위에서만 쓰는 반전 잉크.', en: 'Inverse ink reserved for buttons and stamped accent fills.', zh: '只在按钮或 stamp 这类强填充面上使用的反相文字色。', ja: 'ボタンや stamp のような強い塗り面でだけ使う反転インク。' } },
      { token: 'link', preview: 'text', usage: { ko: '텍스트 링크 / subtle action', en: 'Text links and subtle actions', zh: '文本链接 / 轻动作', ja: 'テキストリンク / subtle action' }, description: { ko: '행동이지만 primary button처럼 떠들지 않는 연결 색.', en: 'Connection color for actions that should not become button-noise.', zh: '是动作色，但不会像主按钮那样喧哗的连接色。', ja: '行動だが、primary button ほど騒がしくならない接続色。' } },
      { token: 'rule', preview: 'border', usage: { ko: '분리선 / rail / 표 구획', en: 'Rules, rails, and table dividers', zh: '分隔线 / rail / 表格区分', ja: '区切り線 / rail / 表区分' }, description: { ko: '기본 구조선은 theme border 값을 직접 받는다. 더 조용한 하위 구획만 muted border로 내린다.', en: 'Primary structure lines take the theme border directly; only quieter subdivisions fall back to muted border.', zh: '主结构线直接使用主题 border；只有更安静的次级区分才退回 muted border。', ja: '基本の構造線はテーマの border を直接使い、さらに静かな下位区分だけを muted border へ落とす。' } },
    ],
  },
  {
    id: 'accent-status',
    title: { ko: 'Accent & status', en: 'Accent & status', zh: '强调与状态', ja: 'アクセントと状態' },
    description: { ko: 'blue-crab과 red-claw는 같은 semantic 슬롯을 쓰더라도 화면 인상을 섞지 않는다. blue-crab 화면은 blue 계열이, red-claw 화면은 red 계열이 각각 주도하고, warning만 그 위에서 더 짧고 뜨겁게 쓴다.', en: 'Even when blue-crab and red-claw reuse the same semantic slots, their visual impression should not blend. Blue-crab screens stay blue-led, red-claw screens stay red-led, and warning remains the only hotter signal layered on top.', zh: '即使 blue-crab 与 red-claw 复用同一套 semantic 槽位，它们的视觉印象也不能混在一起。blue-crab 画面保持 blue 主导，red-claw 画面保持 red 主导，而 warning 只是叠在其上的更热信号。', ja: 'blue-crab と red-claw が同じ semantic スロットを再利用しても、画面印象は混ぜない。blue-crab の画面は青が、red-claw の画面は赤がそれぞれ主導し、warning だけがその上でさらに熱い合図になる。' },
    tokens: [
      { token: 'accent', preview: 'text', usage: { ko: 'primary action / 강조 링크', en: 'Primary actions and emphasized links', zh: '主要动作 / 强调链接', ja: 'primary action / 強調リンク' }, description: { ko: '테마 서명색. blue-crab 화면에서는 blue가, red-claw 화면에서는 red가 대표 CTA와 현재 위치를 잡는다.', en: 'Theme-signature color. Blue leads the primary CTA and current-state cues in blue-crab, while red leads them in red-claw.', zh: '主题签名色。在 blue-crab 画面里由 blue 负责主 CTA 与当前位置，在 red-claw 画面里则交给 red。', ja: 'テーマ署名色。blue-crab の画面では青が、red-claw の画面では赤が主 CTA と現在位置を握る。' } },
      { token: 'accent-soft', preview: 'surface', usage: { ko: '선택 / 코드 / 얕은 강조 wash', en: 'Selection, code, and soft accent wash', zh: '选区 / 代码 / 轻强调薄层', ja: '選択 / コード / 淡い accent wash' }, description: { ko: '강한 채움이 아니라 힌트 수준에서만 보이는 테마별 accent 얇은 막.', en: 'Thin theme-specific accent wash that stays at hint level instead of becoming a filled panel.', zh: '只停留在提示级别、不会变成整块填充面的主题专属 accent 薄层。', ja: '強い塗り面にはならず、ヒント程度にだけ見えるテーマ別 accent の薄膜。' } },
      { token: 'success', preview: 'text', usage: { ko: '검증 완료 / 통과 신호', en: 'Verified pass signal', zh: '验证完成 / 通过信号', ja: '検証完了 / 通過シグナル' }, description: { ko: '통과와 재현 가능 상태를 말할 때만 뜨는 sage 신호.', en: 'Sage signal reserved for passes and reproducible completion.', zh: '只在通过与可复现完成时升起的 sage 信号。', ja: '通過と再現可能な完了を示すときだけ立ち上がる sage シグナル。' } },
      { token: 'success-soft', preview: 'surface', usage: { ko: 'verified 배경 / rail', en: 'Verified backgrounds and rails', zh: 'verified 背景 / rail', ja: 'verified 背景 / rail' }, description: { ko: 'success 신호 밑에 조용히 깔리는 얇은 받침 면.', en: 'Quiet backing wash under the success signal.', zh: '静静垫在 success 信号下面的一层薄背景。', ja: 'success シグナルの下に静かに敷かれる薄い受け面。' } },
      { token: 'warning', preview: 'text', usage: { ko: '주의 / incident signal', en: 'Warning and incident signal', zh: '注意 / incident 信号', ja: '注意 / incident シグナル' }, description: { ko: '메인 accent보다 더 뜨겁고 짧은 ember 경고. 카드 전체를 칠하지 말고 rail이나 stamp로만 쓴다.', en: 'Hotter ember warning than the main accent. Keep it to rails and stamps instead of painting the whole card.', zh: '比主 accent 更炽热、更短促的 ember 警示。只用在 rail 或 stamp 上，别涂满整张卡片。', ja: '主 accent より熱く短い ember 警告。カード全体を塗らず、rail や stamp にだけ使う。' } },
      { token: 'warning-soft', preview: 'surface', usage: { ko: 'incident 보조 wash', en: 'Incident support wash', zh: 'incident 辅助薄层', ja: 'incident 補助 wash' }, description: { ko: 'warning을 카드 전체 경보로 만들지 않게 잡아주는 얇은 ember 받침 면.', en: 'Thin ember wash that keeps warning from taking over the whole card.', zh: '防止 warning 占领整张卡片的一层薄 ember 底面。', ja: 'warning がカード全体を占領しないよう抑える薄い ember の受け面。' } },
    ],
  },
  {
    id: 'evidence',
    title: { ko: 'Evidence', en: 'Evidence', zh: '证据层', ja: '証拠レイヤー' },
    description: { ko: 'repo, build, proof signal처럼 확인용 정보는 gajae-code의 dark-base slab 흐름을 그대로 따라 별도 증거층에 묶는다.', en: 'Repo, build, and proof metadata stay in a separate evidence layer that follows the same dark-base slab behavior as gajae-code.', zh: 'repo、build、proof 这类确认信息会沿用 gajae-code 的 dark-base slab 逻辑，被束进独立证据层。', ja: 'repo、build、proof のような確認情報は、gajae-code の dark-base slab の流れをそのまま継いだ独立証拠レイヤーに束ねる。' },
    tokens: [
      { token: 'surface-evidence', preview: 'surface', usage: { ko: 'proof panel / 증거 카드 바닥', en: 'Proof panels and evidence-card base', zh: 'proof panel / 证据卡底面', ja: 'proof panel / 証拠カードの土台' }, description: { ko: '증거 계층의 가장 깊은 graphite 바닥.', en: 'Deep graphite floor for the evidence layer.', zh: '证据层最深的石墨底面。', ja: '証拠レイヤーでもっとも深い graphite の土台。' } },
      { token: 'surface-evidence-soft', preview: 'surface', usage: { ko: '증거 헤더 / 상단 띠', en: 'Evidence headers and lifted top strips', zh: '证据头部 / 上方条带', ja: '証拠ヘッダー / 上部ストリップ' }, description: { ko: '증거 카드 안에서 한 단계 떠 있는 상단면.', en: 'Lifted sub-surface used for headers inside evidence cards.', zh: '证据卡内部抬起一层的头部表面。', ja: '証拠カード内部で一段持ち上がるヘッダー面。' } },
      { token: 'surface-evidence-chip', preview: 'surface', usage: { ko: 'proof signal item', en: 'Proof signal items', zh: 'proof signal 条目', ja: 'proof signal 項目' }, description: { ko: 'dark slab 안에서 receipt 조각을 나누는 작은 조각면.', en: 'Small receipt-like chip inside the dark evidence slab.', zh: '在深色证据层内部切分 receipt 的小表面。', ja: 'dark slab の中で receipt を区切る小さなチップ面。' } },
      { token: 'ink-terminal', preview: 'text', usage: { ko: 'evidence 제목 / 강한 terminal 텍스트', en: 'Evidence headings and strong terminal text', zh: '证据标题 / 强 terminal 文本', ja: '証拠見出し / 強い terminal テキスト' }, description: { ko: 'dark slab 위에서 가장 또렷하게 읽혀야 하는 역상 텍스트.', en: 'Most legible reverse text on the evidence slab.', zh: '在深色证据层上最清楚的反相文字色。', ja: 'dark slab の上で最もくっきり読ませる反転文字色。' } },
      { token: 'ink-terminal-soft', preview: 'text', usage: { ko: 'evidence 본문 / receipt 디테일', en: 'Evidence body and receipt detail', zh: '证据正文 / receipt 细节', ja: '証拠本文 / receipt ディテール' }, description: { ko: '증거 카드 안에서 긴 설명을 지탱하는 보조 잉크.', en: 'Supporting ink for longer evidence explanation.', zh: '支撑证据卡长说明的辅助文字色。', ja: '証拠カード内の長めの説明を支える補助インク。' } },
      { token: 'evidence-rule', preview: 'border', usage: { ko: 'evidence divider / chip 경계', en: 'Evidence dividers and chip borders', zh: '证据分隔线 / chip 边界', ja: '証拠の区切り線 / chip 境界' }, description: { ko: '어두운 바닥에서도 receipt 구조를 보이게 만드는 선.', en: 'Divider that preserves receipt structure on the dark slab.', zh: '让深色证据层里仍能看出 receipt 结构的边界线。', ja: '暗い slab の上でも receipt 構造を見せる境界線。' } },
      { token: 'surface-evidence-code', preview: 'surface', usage: { ko: 'evidence code / inline receipt chip', en: 'Evidence code and inline receipt chips', zh: '证据 code / 行内 receipt chip', ja: '証拠 code / インライン receipt chip' }, description: { ko: '증거 문맥 안에서 code와 inline receipt를 받치는 작은 패널.', en: 'Small panel behind code and inline receipt details inside evidence contexts.', zh: '在证据语境中承载 code 与行内 receipt 的小面板。', ja: 'evidence 文脈の中で code と inline receipt を支える小パネル。' } },
    ],
  },
] as const;

export const swatches = tokenGroups.flatMap((group) => group.tokens);

export const contractRows: TripleRow[] = [
  [{ ko: '컴포넌트', en: 'Component', zh: '组件', ja: 'コンポーネント' }, 'Card', { ko: '본문을 읽는 기본 표면은 하나로 잡는다', en: 'Use one base surface for reading the main body.', zh: '正文阅读的基础表面保持为一个。', ja: '本文を読む基本表面は一つに定める。' }],
  ['Variant', 'default / lead / tip / evidence / report / reference', { ko: '레인 이름이 아니라 읽히는 역할로 분기한다', en: 'Branch by reading role, not by lane name.', zh: '按阅读角色分化，而不是按栏目名称。', ja: 'レーン名ではなく、読まれる役割で分岐する。' }],
  ['Modifier', 'featured / compact / with-rail / with-corner', { ko: '필요한 차이만 최소한으로 더한다', en: 'Add only the minimum differences required.', zh: '只增加必要的最小差异。', ja: '必要な差分だけ最小限に足す。' }],
  [{ ko: '콘텐츠 분류', en: 'Content taxonomy', zh: '内容分类', ja: 'コンテンツ分類' }, 'Daily Reflection / Setup Tip / Behind the Gajae', { ko: '콘텐츠 분류는 컴포넌트 이름이 아니라 데이터 분류다', en: 'Content taxonomy belongs to data, not component naming.', zh: '内容分类属于数据，不属于组件命名。', ja: 'コンテンツ分類はコンポーネント名ではなくデータ分類です。' }],
];

export const variantRows: TripleRow[] = [
  ['Card / default', { ko: '일반 로그, 리스트 카드', en: 'General logs and list cards', zh: '普通日志与列表卡片', ja: '一般ログとリストカード' }, { ko: '조용히 빠르게 읽힌다', en: 'Reads quietly and quickly.', zh: '安静、快速地被阅读。', ja: '静かにすばやく読まれる。' }],
  ['Card / lead', { ko: '대표 엔트리, hero 아래 메인 로그', en: 'Featured entry under the hero', zh: 'hero 下的代表条目', ja: 'hero 下の代表エントリ' }, { ko: '먼저 멈춰 읽힌다', en: 'Stops the reader first.', zh: '先让读者停下来读。', ja: 'まず立ち止まって読まれる。' }],
  ['Card / tip', { ko: '재사용 가능한 셋업/운영 팁', en: 'Reusable setup and operating tips', zh: '可复用的设置/运维提示', ja: '再利用できるセットアップ/運用のコツ' }, { ko: '읽고 바로 가져간다', en: 'Readers take it and use it immediately.', zh: '读完就能直接拿走使用。', ja: '読んですぐ持ち帰って使える。' }],
  ['Card / evidence', { ko: '빌드·레포·메타 증거', en: 'Build, repo, and metadata evidence', zh: '构建、仓库与元数据证据', ja: 'ビルド・repo・メタデータの証拠' }, { ko: '본문이 아니라 확인용 부속으로 읽힌다', en: 'Reads as supporting proof, not the main body.', zh: '它不是正文，而是确认用的附属证据。', ja: '本文ではなく確認用の付属物として読まれる。' }],
  ['Card / report', { ko: '긴 판단, 사고 기록, 설명 문서', en: 'Long judgments, incident records, and explanatory docs', zh: '长判断、事故记录与说明文档', ja: '長い判断、事故記録、説明文書' }, { ko: '카드 소비가 아니라 문서 모드로 읽힌다', en: 'Reads in document mode rather than as card-snacking.', zh: '它以文档模式被阅读，而不是以卡片消费的方式。', ja: 'カード消費ではなく文書モードで読まれる。' }],
  ['Card / reference', { ko: '출처 링크, 프로젝트 첨부', en: 'Source links and project attachments', zh: '来源链接与项目附件', ja: '出典リンクとプロジェクト添付' }, { ko: '메인 본문을 뒷받침하는 첨부물처럼 읽힌다', en: 'Reads like an attachment that supports the main body.', zh: '像支撑正文的附件一样被阅读。', ja: '本文を支える添付物のように読まれる。' }],
];

export const previewCards: PreviewCard[] = [
  {
    label: 'Card / default',
    title: { ko: '기본 로그 카드', en: 'Base log card', zh: '基础日志卡片', ja: '基本ログカード' },
    role: { ko: '가장 많이 등장하는 기본 읽기 표면.', en: 'The base reading surface that appears most often.', zh: '最常出现的基础阅读表面。', ja: 'もっとも多く現れる基本の読書面。' },
    note: { ko: '메타 행, 링크, 본문 길이 정도만 바뀐다.', en: 'Only the meta row, links, and body length usually change.', zh: '通常只变化 meta 行、链接和正文长度。', ja: '主にメタ行、リンク、本文の長さだけが変わる。' },
    variant: 'default',
  },
  {
    label: 'Card / lead',
    title: { ko: '대표 엔트리 variant', en: 'Featured entry variant', zh: '代表条目 variant', ja: '代表エントリ variant' },
    role: { ko: '같은 Card지만 제목 위계와 존재감만 더 강하다.', en: 'It is the same Card, but with stronger title hierarchy and presence.', zh: '它仍是同一个 Card，只是标题层级与存在感更强。', ja: '同じ Card だが、タイトル階層と存在感だけが強い。' },
    note: { ko: '크기와 제목 강조는 커져도 구조는 유지한다.', en: 'The structure stays the same even when size and emphasis increase.', zh: '即使尺寸与强调变强，结构仍保持不变。', ja: 'サイズと強調が増えても構造は維持する。' },
    variant: 'lead',
    modifiers: ['featured'],
  },
  {
    label: 'Card / tip',
    title: { ko: '처방 variant', en: 'Prescription variant', zh: '处方 variant', ja: '処方 variant' },
    role: { ko: 'verified rail로 재사용 가능한 팁이라는 신호만 더한다.', en: 'It only adds the signal that this is a reusable tip through a verified rail.', zh: '它只是通过 verified rail 增加“这是可复用提示”的信号。', ja: 'verified rail によって再利用可能なコツだというシグナルだけを足す。' },
    note: { ko: 'rail 추가, 행동 링크 강조.', en: 'Add a rail and emphasize the action link.', zh: '增加 rail，并强调行动链接。', ja: 'rail を足し、行動リンクを強調する。' },
    variant: 'tip',
    modifiers: ['with-rail'],
  },
  {
    label: 'Card / evidence',
    title: { ko: '증거 variant', en: 'Evidence variant', zh: '证据 variant', ja: '証拠 variant' },
    role: { ko: 'proof나 repo 메타를 담을 때만 dark surface로 바꾼다.', en: 'Switch to the dark surface only when holding proof or repo metadata.', zh: '只有承载 proof 或 repo 元数据时才切换到深色表面。', ja: 'proof や repo メタを載せるときだけ dark surface に切り替える。' },
    note: { ko: '표면만 어두워지고, 문장 구성은 더 짧아진다.', en: 'Only the surface gets darker, and the sentence structure becomes shorter.', zh: '只让表面变深，句子结构则更短。', ja: '表面だけが暗くなり、文の構成はより短くなる。' },
    variant: 'evidence',
    legend: ['PASS · build', 'repo · metadata'],
  },
  {
    label: 'Card / report',
    title: { ko: '판단 문서 variant', en: 'Judgment document variant', zh: '判断文档 variant', ja: '判断文書 variant' },
    role: { ko: '긴 설명이 들어가도 여전히 Card 계열 안에서 처리한다.', en: 'Even long explanations still stay within the Card family.', zh: '即使有长说明，也仍然在 Card 体系内处理。', ja: '長い説明が入っても、なお Card 系列の中で処理する。' },
    note: { ko: '본문 길이와 구조는 늘어나도 새 컴포넌트 이름을 만들지 않는다.', en: 'Do not create a new component name even if body length and structure expand.', zh: '即使正文长度和结构增加，也不要新造组件名。', ja: '本文の長さや構造が増えても、新しいコンポーネント名は作らない。' },
    variant: 'report',
    modifiers: ['with-corner', 'wide'],
    bullets: [
      { ko: 'warning accent는 힌트 정도만 남긴다.', en: 'Keep warning accents at the level of hints only.', zh: 'warning accent 只保留到提示程度。', ja: 'warning accent はヒント程度にだけ残す。' },
      { ko: 'clipped corner는 사건성 문서일 때만 쓴다.', en: 'Use a clipped corner only for incident-style documents.', zh: 'clipped corner 只用于事件性文档。', ja: 'clipped corner は事件性の文書にだけ使う。' },
    ],
  },
  {
    label: 'Card / reference',
    title: { ko: '첨부 variant', en: 'Attachment variant', zh: '附件 variant', ja: '添付 variant' },
    role: { ko: '링크와 첨부를 뒷받침하는 부속 표면.', en: 'A supporting surface for links and attachments.', zh: '用于支撑链接与附件的附属表面。', ja: 'リンクと添付を支える補助面。' },
    note: { ko: '메인 본문 대신 출처/파일 정보 중심으로 짧아진다.', en: 'It shortens around source and file information instead of the main body.', zh: '它围绕来源/文件信息变得更短，而不是承载主体正文。', ja: '本文の代わりに出典/ファイル情報中心で短くなる。' },
    variant: 'reference',
    modifiers: ['with-corner'],
  },
];
