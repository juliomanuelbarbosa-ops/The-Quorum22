import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',  // Explicitly root — Vercel likes this (safe even if you remove it)

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false  // Prevents service worker in dev (common white-screen cause)
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'THE QUORUM v9.0',
        short_name: 'Quorum',
        description: 'Cyberpunk Sovereign Command OS',
        theme_color: '#00f3ff',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],

  // Optional: Helps with large deps like three.js
  build: {
    chunkSizeWarningLimit: 2000, // Increase if you get warnings
    sourcemap: false,           // Disable in prod to reduce size (optional)
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['react', 'react-dom', 'framer-motion']
        }
      }
    }
  },

  // Prevent empty chunks issue
  optimizeDeps: {
    include: ['three', 'react', 'react-dom']
  }
})
