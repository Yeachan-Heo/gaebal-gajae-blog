import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Language',
      description: 'Story locale',
      defaultValue: 'ko',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어' },
          { value: 'en', title: 'English' },
          { value: 'zh', title: '中文' },
          { value: 'ja', title: '日本語' },
        ],
      },
    },
    theme: {
      name: 'Editorial Logbook theme',
      description: 'Local Editorial Logbook preview theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light Editorial Logbook' },
          { value: 'dark', title: 'Dark Editorial Logbook' },
        ],
      },
    },
  },
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Primitives', 'Components', 'Patterns'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const locale = String(context.globals.locale || 'ko')
      const theme = String(context.globals.theme || 'light') === 'dark' ? 'dark' : 'light'
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale
        document.documentElement.dataset.theme = theme
        document.documentElement.style.colorScheme = theme;
      }

      const wrapperClass =
        context.viewMode === 'docs'
          ? 'min-h-screen bg-[var(--bg)] px-6 py-8 text-[var(--ink-strong)]'
          : 'min-h-screen bg-[var(--bg)] px-6 py-8 text-[var(--ink-strong)]'

      return (
        <div key={`${locale}:${theme}`} className={wrapperClass}>
          <Story />
        </div>
      )
    },
  ],
}

export default preview
