/* eslint-disable */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/extended.ts'),
      name: 'design-system-extended',
      fileName: (format) => `extended.${format}.js`
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
    emptyOutDir: false
  },
  plugins: [
    react(),
    dts({
      exclude: ['**/*.stories.*', 'tests']
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
  }
}); 