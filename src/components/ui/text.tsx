import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type LangMap = Record<string, string>

type LocalizedTextProps<T extends ElementType> = {
  as?: T
  map?: LangMap | null
  className?: string
  lang?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function textFor(map?: LangMap | null, lang?: string) {
  if (!map) return ''
  const resolvedLang = lang ?? (typeof document !== 'undefined' ? document.documentElement.lang || 'ko' : 'ko')
  return map[resolvedLang] ?? map.ko ?? map.en ?? ''
}

function localizedAttr(map?: LangMap | null) {
  return map ? JSON.stringify(map) : undefined
}

export function LocalizedText<T extends ElementType = 'span'>({ as, map, className, lang, ...props }: LocalizedTextProps<T>) {
  const Component = (as || 'span') as ElementType
  const resolvedLang = lang ?? (typeof document !== 'undefined' ? document.documentElement.lang || 'ko' : 'ko')
  return (
    <Component data-slot="localized-text" className={className} data-i18n-text={localizedAttr(map)} suppressHydrationWarning {...props}>
      {textFor(map, resolvedLang)}
    </Component>
  )
}
