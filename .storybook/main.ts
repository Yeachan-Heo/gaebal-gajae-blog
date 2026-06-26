import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/nextjs'

const rootDir = dirname(fileURLToPath(import.meta.url))
const getAbsolutePath = (packageName: string) => dirname(fileURLToPath(import.meta.resolve(join(packageName, 'package.json'))))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: [{ from: join(rootDir, '../assets'), to: '/assets' }],
}

export default config
