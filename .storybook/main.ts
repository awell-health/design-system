import { join, dirname, resolve } from "path";
import { StorybookConfig } from '@storybook/react-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    // @ts-expect-error TODO: figure out how to get the framework name type
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../styles'],
  viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@/components",
            replacement: resolve(__dirname, "../components"),
          },
          {
            find: "@/lib",
            replacement: resolve(__dirname, "../lib"),
          },
        ],
      },
    };
  },
};

export default config;