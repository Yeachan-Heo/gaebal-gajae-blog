# 금지 패턴

앞으로 AI가 이 블로그 프론트를 만들 때 아래 패턴을 금지한다.

## Tokens
- Do not invent colors outside tokens.
- Do not bypass typography / spacing tokens with page-local one-off values.
- Do not reintroduce the previous shell palette as the default look.

## Visual style
- Do not use generic SaaS gradients.
- Do not make every card look like the same rounded shadcn-style box.
- Do not treat terminal green as decoration.
- Do not bury the blue-crab / red-claw pair under muddy neutral filler.
- Do not make the page feel like a corporate dashboard.

## Components
- Do not create a new card component name for every content lane.
- Do not promote a small visual difference into a separate reusable component.
- Do not use `Card`, `Slab`, `Slip`, `Stamp`, `Badge` interchangeably.
- Do not solve hierarchy only by adding bigger shadows.
- Do not turn every metadata area into an evidence slab.
- Do not use clipped corners on every component.
- Do not mix multiple accent colors on the same card without semantic reason.

## Process
- Do not style pages first and invent tokens later.
- Do not add page-specific colors before checking whether `Card` + variant + modifier can solve it.
- Do not ship a new front-end section without previewing it in `style-foundry-preview.html`.
