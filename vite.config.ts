import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Critical for Vercel root deployment
  base: '/',

  plugins: [
    react(),

    VitePWA({
      // Only enable PWA in production builds
      devOptions: {
        enabled: false,           // Prevents SW interference in local dev
      },

      registerType: 'autoUpdate',

      // Aggressive cache cleanup + immediate takeover
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,png,ico,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10 } }
          }
        ]
      },

      manifest: {
        name: 'THE QUORUM v9.0',
        short_name: 'Quorum',
        description: 'Cyberpunk Sovereign Command OS',
        theme_color: '#00f3ff',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],

  // Production optimizations
  build: {
    chunkSizeWarningLimit: 3000,        // Increase for three.js + large deps
    sourcemap: false,                   // Disable sourcemaps in prod (reduces size & loading issues)
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true }  // Remove console.log in prod
    },
    rollupOptions: {
      output: {
        // Manual chunk splitting to avoid empty chunks
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          vendor: ['react', 'react-dom', 'framer-motion'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  },

  // Help Vite resolve heavy deps faster
  optimizeDeps: {
    include: ['three', 'react', 'react-dom', 'framer-motion']
  }
})
