import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import million from 'million/compiler'
import generouted from '@generouted/react-router/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000, // Set the port from VITE_PORT or fallback to 3000

    /** @see src/data/clients/nodeflair.api.ts */
    // proxy: {
    //   '/api': {
    //     target: 'https://nodeflair.com/api',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  plugins: [million.vite({ auto: true }), react(), generouted()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './public'),
    },
  },
})
