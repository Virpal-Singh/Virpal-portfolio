import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure environment variables are available at build time
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL || 'https://virpal-portfolio.onrender.com/api'),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})