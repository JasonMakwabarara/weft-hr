import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 3010,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 3010,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
