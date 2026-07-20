import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('react-router-dom')) return 'vendor'
        },
      },
    },
  },
})
