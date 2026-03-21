import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // <--- ESTA LÍNEA MÁGICA HACE QUE SE ABRA SOLO
  }
})