import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',

  plugins: [
    react(),
    // VitePWA plugin DISABLED — this fixes the white screen
  ],

  build: {
    chunkSizeWarningLimit: 3000,
    sourcemap: false,
  }
})
