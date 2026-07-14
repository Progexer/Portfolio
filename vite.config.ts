import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'


// https://vite.dev/config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split the animation library so the main bundle stays lean.
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', '@studio-freight/lenis'],
        },
      },
    },
  },
})


