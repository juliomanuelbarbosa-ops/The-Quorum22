import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'   // ← COMMENTED OUT to isolate white screen issue

export default defineConfig({
  // Explicit root base — Vercel requires this for correct asset paths
  base: '/',

  plugins: [
    react(),

    // Temporarily disabled to test if PWA/service worker is causing white screen
    // Re-enable later after confirming the app loads
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: { enabled: false },
    //   workbox: {
    //     cleanupOutdatedCaches: true,
    //     skipWaiting: true,
    //     clientsClaim: true,
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    //   },
    //   manifest: {
    //     name: 'THE QUORUM v9.0',
    //     short_name: 'Quorum',
    //     description: 'Cyberpunk Sovereign Command OS',
    //     theme_color: '#00f3ff',
    //     background_color: '#0a0a0a',
    //     display: 'standalone',
    //     icons: [
    //       { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    //       { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
    //     ]
    //   }
    // })
  ],

  // Production optimizations (helps avoid empty chunk issues)
  build: {
    chunkSizeWarningLimit: 3000,
    sourcemap: false,                    // Disable sourcemaps in prod (reduces size & loading issues)
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true }   // Remove console.log in production
    },
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          vendor: ['react', 'react-dom', 'framer-motion'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  },

  // Faster dep resolution for heavy libraries
  optimizeDeps: {
    include: ['three', 'react', 'react-dom', 'framer-motion']
  }
})
