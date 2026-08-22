import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/Optivis-Tax/',  // Changed for GitHub Pages
  server: {
    port: 3000,
    open: true
  }
})