# 토큰 계획

## Color families
### `paper-*`
- `paper-canvas`: 전체 작업대 바탕
- `paper-sheet`: 일반 읽기 면
- `paper-sheet-raised`: 강조된 읽기 면
- `paper-sheet-soft`, `paper-sheet-muted`: 보조 면

### `surface-*`
- `surface-panel`, `surface-panel-strong`, `surface-panel-soft`: 작업대 패널
- `surface-terminal`, `surface-terminal-soft`: evidence slab
- `surface-accent`: 강조 면

### `ink-*`
- `ink-strong`: 제목
- `ink-default`: 본문
- `ink-soft`: 보조 본문
- `ink-faint`: 메타 / 캡션
- `ink-terminal`, `ink-terminal-soft`: evidence slab 위 텍스트

### `muted-*`
경계선, 금속성 보더, 스크림, 조용한 구획선.

### `accent-*`
브랜드 서명과 primary action.
blue-crab theme는 blue 위주, red-claw theme는 red 위주로 명확히 갈린다.

### `verified-*`
검증 완료, 적용 완료, setup 처방 성공.

### `warning-*`
incident, 주의, 방향 전환.
main accent보다 더 뜨거운 ember 계열.

## Typography tokens
- `font-body`, `font-display`, `font-mono`
- `type-label`, `type-meta`, `type-body`, `type-lead`, `type-title`, `type-display`
- `tracking-tight`, `tracking-normal`, `tracking-stamp`
- `leading-compact`, `leading-body`, `leading-relaxed`

## Spacing tokens
4px 기반 간격 스케일을 유지하되,
섹션/카드/리포트 셸에서 더 큰 간격을 쓸 수 있게 `space-1`부터 `space-10`까지 둔다.

## Radius tokens
이번 시스템은 round-heavy가 아니다.
- 작은 입력과 배지: `radius-sm`, `radius-md`
- 카드: `radius-lg`, `radius-xl`
- stamp가 아니라 pill일 때만 `radius-pill`
- incident slip용 `notch-size`

## Shadow / elevation
- `shadow-card`: 종이 면의 아주 얕은 부상
- `shadow-lift`: hover 시 한 단계 상승
- `shadow-focus`: 접근성 포커스
- `shadow-inset-paper`: 얇은 종이 눌림

## Alias policy
컴포넌트는 raw 색값을 직접 쓰지 않는다.
가능한 한 아래 semantic alias를 통해 소비한다.
- `card-bg`
- `card-border`
- `button-primary-bg`
- `terminal-evidence-bg`
- `status-verified-bg`
- `status-warning-bg`

## Theme policy
blue-crab과 red-claw는 같은 semantic 이름을 공유하되,
화면 인상은 서로 섞지 않고 각 theme family가 따로 주도한다.
