# 컴포넌트 인벤토리

## System hierarchy
가재 블로그는 일반적인 디자인 시스템 계층을 따라 정리한다.

1. **Foundations / Tokens**
   - color, typography, spacing, radius, shadow
2. **Primitives**
   - Card, Button, Badge, Reading Meta, Section Header, Localized Text
3. **Components**
   - Post Card, Lane Card, Project Card, Proof Panel, Nav Bar, Footer Bar
4. **Patterns**
   - Hero, Archive List, Post Detail, Project Detail
5. **Templates / Pages**
   - Home, Archive, Lane Index, Post, Project

페이지는 맨 아래 레이어다.
새 요구가 생기면 먼저 primitive나 component로 흡수 가능한지 본다.

## Shadcn-style file layout
shadcn/ui처럼 기본 reusable UI는 `src/components/ui/` 아래에 둔다.

- `src/components/ui/card.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/reading-meta.tsx`
- `src/components/ui/section-header.tsx`
- `src/components/ui/text.tsx`
- `src/lib/utils.ts`

조합된 블로그 전용 컴포넌트와 패턴은 한 단계 위에 둔다.

- `src/components/blog-cards.tsx`
- `src/components/blog-shell.tsx`
- `src/components/blog-patterns.tsx`

## Naming contract
- **Tokens**: lowercase kebab-case (`paper-sheet`, `ink-strong`)
- **Primitive file names**: shadcn-style lowercase singular (`card.tsx`, `button.tsx`, `badge.tsx`)
- **Primitive exports**: `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`, `ButtonLink`, `Badge`
- **Component names**: 역할 이름 (`PostCard`, `ProjectCard`, `ProofPanel`)
- **레인 이름**(`Daily Reflection`, `Setup Tip`)은 콘텐츠 taxonomy로만 쓰고, 공유 컴포넌트 이름으로 승격하지 않는다.

## Primitives
### Card (`src/components/ui/card.tsx`)
주가 되는 기본 UI primitive.

exports:
- `Card`
- `CardHeader`
- `CardContent`
- `CardFooter`
- `CardTitle`
- `CardDescription`

variants:
- `default`
- `strong`
- `evidence`

책임:
- background
- border
- radius
- shadow
- padding wrapper

### Button (`src/components/ui/button.tsx`)
행동을 여는 기본 primitive.

exports:
- `ButtonLink`

variants:
- `primary`
- `secondary`
- `subtle`

### Badge (`src/components/ui/badge.tsx`)
짧은 상태/레인/검증 마커.

exports:
- `Badge`

variants:
- `lane`
- `neutral`
- `verified`

### Reading Meta (`src/components/ui/reading-meta.tsx`)
날짜 / 레인 / 보조 메타를 한 줄로 묶는 primitive.

### Section Header (`src/components/ui/section-header.tsx`)
섹션 제목 + 설명 + 선택 행동을 묶는 primitive.

### Localized Text (`src/components/ui/text.tsx`)
다국어 문구와 텍스트 선택을 담당하는 primitive.

## Components
### Post Card (`src/components/blog-cards.tsx`)
`Card + ReadingMeta + LocalizedText + optional proof signals`

### Lane Card (`src/components/blog-cards.tsx`)
`Card + ReadingMeta + LocalizedText`

### Project Card (`src/components/blog-cards.tsx`)
`Card(evidence) + ReadingMeta + LocalizedText`

### Proof Panel (`src/components/blog-patterns.tsx`)
`Card(evidence) + ReadingMeta + Badge + Text`

### Nav Bar (`src/components/blog-shell.tsx`)
링크 그룹 + 테마 토글 + 언어 토글.

### Footer Bar (`src/components/blog-shell.tsx`)
보조 링크와 제작 서명.

## Patterns
### Hero (`src/components/blog-patterns.tsx`)
브랜드 메시지 + 대표 CTA + 대표 비주얼.

### Archive List (`src/components/blog-patterns.tsx`)
연도 헤더 + 카드 목록.

### Post Detail (`src/components/blog-patterns.tsx`)
header + aside proof panel + prose + related + prev/next.

### Project Detail (`src/components/blog-patterns.tsx`)
header + hero media + prose.
