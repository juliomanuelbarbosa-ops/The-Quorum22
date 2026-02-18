import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',  // Required for Vercel/Netlify root deployment

  plugins: [
    react()
    // VitePWA disabled to eliminate white screen & loading issues
    // Re-enable later with: VitePWA({ devOptions: { enabled: false }, workbox: { cleanupOutdatedCaches: true, skipWaiting: true } })
  ],

  server: {
    host: true,  // Important for Replit / mobile previews
    port: 5173
  },

  build: {
    chunkSizeWarningLimit: 4000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
})
