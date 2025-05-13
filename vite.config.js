import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://milkstore-grbpfnduezbpgvgc.eastasia-01.azurewebsites.net',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
