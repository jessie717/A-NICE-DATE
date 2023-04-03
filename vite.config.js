import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          console.log('assetInfo', assetInfo)
          const ext = path.extname(assetInfo.name)
          const images = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
          let dir = ''
          if (ext === '.css') {
            dir = 'css'
          } else if (images.includes(ext)) {
            dir = 'images'
          }
          return `assets/${dir}/[name]-[hash].[ext]`
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
