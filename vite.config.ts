import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'components/index.ts'),
      name: 'design-system',
      // the proper extensions will be added
      fileName: 'design-system',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@/components",
        replacement: resolve(__dirname, "./components"),
      },
      {
        find: "@/lib",
        replacement: resolve(__dirname, "./lib"),
      },
    ],
  },
})