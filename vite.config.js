/* eslint-disable */
/// <reference types="vitest" />
/// <reference types='@testing-library/jest-dom/vitest' />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'design-system',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    react(),
    dts({
      exclude: ['**/*.stories.*']
    })
  ],
  resolve: {
    alias: [
      {
        find: '@/components',
        replacement: resolve(__dirname, './src/components')
      },
      {
        find: '@/lib',
        replacement: resolve(__dirname, './src/lib')
      }
    ]
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setupTests.ts',
    coverage: {
      include: ['src/components/**/*']
    }
  }
});
