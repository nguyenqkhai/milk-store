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
  },
    resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@assets': '/src/assets',
      '@utils': '/src/utils'
    }
  }
}
