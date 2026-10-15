import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteApiServerPlugin } from './server/viteApiPlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteApiServerPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        sap: resolve(import.meta.dirname, 'sap/index.html'),
        ai: resolve(import.meta.dirname, 'ai/index.html'),
        recruiting: resolve(import.meta.dirname, 'recruiting/index.html'),
        contact: resolve(import.meta.dirname, 'contact/index.html'),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    allowedHosts: true,
  },
})

