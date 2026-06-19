import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mundial-2026/',
  // El "server.proxy" ya no es necesario porque hablas con tu propio backend en Vercel
})