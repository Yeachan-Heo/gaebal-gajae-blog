# 디자인 원칙

## 1. System layers come before page skins
일반적인 디자인 시스템은 페이지 이름별 컴포넌트 모음이 아니라, 보통 아래 레이어 순서로 관리한다.
- Foundations / Tokens
- Primitives
- Components
- Patterns
- Templates / Pages

가재 블로그도 이 순서를 따른다.
페이지를 먼저 예쁘게 고치고 나중에 시스템 이름을 붙이지 않는다.

## 2. Shadcn-style primitive ownership
shadcn/ui처럼, 가장 자주 재사용되는 기본 UI는 `src/components/ui/` 아래에 두는 편이 맞다.
이 레이어의 주가 되는 기본 primitive는 `Card`다.

단, `Card`가 유일한 primitive라는 뜻은 아니다.
함께 있어야 하는 기본 primitive는 아래다.
- `Card`
- `Button`
- `Badge`
- `Reading Meta`
- `Section Header`
- `Localized Text`

## 3. Card is the canonical base UI primitive
가재 블로그에서 가장 자주 조립되는 기본 UI primitive는 `Card`다.
shadcn/ui처럼 `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` 같은 기본 구조를 중심에 둔다.

`Post Card`, `Project Card`, `Proof Panel` 같은 것은 이 `Card` 계열 primitive를 조합한 component다.

## 4. Paper first
전체 화면은 종이 기반이어야 한다.
사용자는 먼저 읽어야 하고, 그다음 탐색해야 한다.

## 5. Proof is concentrated
proof / repo / translation / status 정보만 어두운 slab에 모은다.
모든 박스를 어둡게 만들지 않는다.

## 6. Components are semantic compositions
`작업 증거 Card`를 primitive 계층으로 두기보다,
`Card + ReadingMeta + Badge + Text` 조합이 증거용 역할을 맡는다고 보는 편이 맞다.
즉, 증거/처방/대표 엔트리는 primitive보다 한 단계 위의 component 또는 pattern이다.

## 7. Variants should stay narrow
variant는 primitive나 component 안에서 좁게 유지한다.
- `Card`: default / strong / evidence
- `Button`: primary / secondary / subtle
- `Badge`: lane / neutral / verified

페이지 taxonomy를 variant 이름에 직접 섞지 않는다.

## 8. Accent is authorship, not decoration
blue-crab theme에서는 blue 계열이 작업대 전체 인상을 주도해야 한다.
red-claw theme에서는 red 계열이 작업대 전체 인상을 주도해야 한다.
red-claw는 bright red 판때기보다 **burgundy base + cream ink + copper signal** 조합으로 읽혀야 하고,
차가운 blue-gray filler를 끼워 넣지 않는다.

## 9. Typography does the heavy lifting
카드 배경보다 먼저 제목/본문/메타의 위계가 읽혀야 한다.
강한 타이포가 필요한 자리는 제목뿐이다.

## 10. Navigation should feel indexed
상단 내비게이션은 앱 탭이 아니라 바인더의 인덱스처럼 느껴져야 한다.

## 11. Terminal green is never confetti
verified 색은 상태를 나타낼 때만 쓴다.
예쁘게 보이기 위한 장식색으로 쓰지 않는다.

## 12. Incident accents are sparse
사건감은 warning rail, stamp, clipped corner 정도로 제한한다.
모든 영역에 사건 문법을 주입하지 않는다.

## 13. Naming follows system layers
토큰은 lowercase kebab-case로, CSS hook은 kebab-case로 적는다.
primitive는 `Card`, `Button`, `Badge`처럼 일반 이름을 쓰고,
component는 `PostCard`, `ProjectCard`, `ProofPanel`처럼 역할 이름을 쓴다.
모양이 조금 달라졌다고 바로 새 컴포넌트 이름을 만들지 않는다.
