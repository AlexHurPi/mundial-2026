import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Cada vez que hagamos fetch a '/api-futbol', Vite lo redirigirá a la URL real
      '/api-futbol': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-futbol/, '')
      }
    }
  }
})