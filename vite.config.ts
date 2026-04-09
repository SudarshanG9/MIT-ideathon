import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5175
    ,
    strictPort: true,
    cors: {
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    // 2. Add specific headers to help with iframe/frame loading
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "frame-ancestors 'self' *",
    },
    // 3. Ensure HMR (Hot Module Replacement) connects correctly
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    // 4. Allow the local host
    allowedHosts: ['localhost', '127.0.0.1'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})