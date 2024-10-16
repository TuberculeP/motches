import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
  path: [path.resolve(__dirname, '../.env.local'), path.resolve(__dirname, '../.env')]
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      shared: path.resolve(__dirname, '../shared')
    }
  },
  // change port
  server: {
    port: +(process.env.VITE_PORT || 5173)
  }
})
