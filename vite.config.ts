import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteApiServerPlugin } from './backend/viteApiPlugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const serverEnvKeys = [
    'RESEND_API_KEY',
    'CONTACT_TO_EMAIL',
    'CONTACT_RECEIVER_EMAIL',
    'CONTACT_FROM_EMAIL',
    'CONTACT_WEBHOOK_URL',
  ]
  for (const key of serverEnvKeys) {
    if (process.env[key] === undefined && env[key] !== undefined) {
      process.env[key] = env[key]
    }
  }

  return {
    root: resolve(import.meta.dirname, 'frontend'),
    plugins: [react(), tailwindcss(), viteApiServerPlugin()],
    build: {
      outDir: resolve(import.meta.dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'frontend/index.html'),
          sap: resolve(import.meta.dirname, 'frontend/sap/index.html'),
          ai: resolve(import.meta.dirname, 'frontend/ai/index.html'),
          recruiting: resolve(import.meta.dirname, 'frontend/recruiting/index.html'),
          contact: resolve(import.meta.dirname, 'frontend/contact/index.html'),
          cloud: resolve(import.meta.dirname, 'frontend/cloud/index.html'),
          security: resolve(import.meta.dirname, 'frontend/security/index.html'),
          crm: resolve(import.meta.dirname, 'frontend/crm/index.html'),
          salesforce: resolve(import.meta.dirname, 'frontend/salesforce/index.html'),
          dataEngineering: resolve(import.meta.dirname, 'frontend/data-engineering/index.html'),
          services: resolve(import.meta.dirname, 'frontend/services/index.html'),
          about: resolve(import.meta.dirname, 'frontend/about/index.html'),
          careers: resolve(import.meta.dirname, 'frontend/careers/index.html'),
          industries: resolve(import.meta.dirname, 'frontend/industries/index.html'),
          blogs: resolve(import.meta.dirname, 'frontend/blogs/index.html'),
        },
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
      strictPort: false,
      allowedHosts: true,
    },
  }
})
