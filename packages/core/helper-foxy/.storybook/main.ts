import type { StorybookConfig } from '@storybook/react-vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dirname, join } from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../*.stories.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  typescript: {
    check: false,
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  docs: {
    autodocs: true,
  },

  async viteFinal(config) {

    // Merge custom configuration into the default config
    return mergeConfig(config, {

      plugins: [nodeResolve()],
    });
  },
};

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

export default config;
