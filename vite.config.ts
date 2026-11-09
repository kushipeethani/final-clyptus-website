import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteApiServerPlugin } from './server/viteApiPlugin'

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
        cloud: resolve(import.meta.dirname, 'cloud/index.html'),
        security: resolve(import.meta.dirname, 'security/index.html'),
        crm: resolve(import.meta.dirname, 'crm/index.html'),
        salesforce: resolve(import.meta.dirname, 'salesforce/index.html'),
        dataEngineering: resolve(import.meta.dirname, 'data-engineering/index.html'),
        services: resolve(import.meta.dirname, 'services/index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        careers: resolve(import.meta.dirname, 'careers/index.html'),
        industries: resolve(import.meta.dirname, 'industries/index.html'),
        blogs: resolve(import.meta.dirname, 'blogs/index.html'),
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

