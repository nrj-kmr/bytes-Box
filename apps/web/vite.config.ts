import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Manual chunks configuration for better code splitting
        manualChunks: {
          // Split React framework code into a separate chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split editor-related code
          'editor': ['@monaco-editor/react'],
          // Split terminal-related code
          'terminal': ['@xterm/xterm', '@xterm/addon-fit'],
          // Split state management code
          'state': ['recoil'],
          // Split UI libraries (icons, etc)
          'ui': ['lucide-react', '@repo/ui']
        }
      }
    },
    // Split CSS into separate files
    cssCodeSplit: true,
    // Increase the warning limit if you still get warnings after the optimization
    chunkSizeWarningLimit: 600
  }
})
