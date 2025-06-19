import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['4d0f-2401-4900-8811-a1fe-2923-adf0-5b05-9c2f.ngrok-free.app'],
    host:true
  }
})
