import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../wwwroot',     // build direttamente nella wwwroot di ASP.NET
    emptyOutDir: true,     // pulisce prima della build
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:5001', // o http://localhost:5000
        changeOrigin: true,
        secure: false
      }
    }
  }
})