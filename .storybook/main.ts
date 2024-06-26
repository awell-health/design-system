import type { StorybookConfig } from '@storybook/react-vite';


const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  typescript: {
    // Enables the `react-docgen-typescript` parser.
    // See https://storybook.js.org/docs/api/main-config-typescript for more information about this option.
    reactDocgen: 'react-docgen-typescript',
  },
  stories: [
    '../src/**/*.mdx', 
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  async viteFinal(config, options) {
    // Add your configuration here
    return config;
  },
  addons: ['@storybook/addon-essentials', '@storybook/addon-designs'],
};

export default config;