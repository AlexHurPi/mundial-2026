import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/mundial-2026/', //Asi es para desplegar en github
  base: '/', //Asi es para desplegar en cloudflare
  // El "server.proxy" ya no es necesario porque hablas con tu propio backend en Vercel
  
  //---------------------------------------------------
  server: {
    proxy: {
      // Cada vez que hagamos fetch a '/api-futbol', Vite lo redirigirá a la URL real
      '/api-futbol': {
        target: 'https://corsproxy.io/?https://api.football-data.org/v4/competitions/WC/matches',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-futbol/, '')
            }
        }
    }
  //---------------------------------------------------

})