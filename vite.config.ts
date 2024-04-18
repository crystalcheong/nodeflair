import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import million from 'million/compiler'
import generouted from '@generouted/react-router/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000, // Set the port from VITE_PORT or fallback to 3000

    proxy: {
      '/api': {
        target: 'https://nodeflair.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },

    // proxy: {
    //   '/api': {
    //     target: 'https://nodeflair.com',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //     // configure: (proxy, options) => {
    //     //   proxy.on('proxyReq', function (proxyReq, req, res, options) {
    //     //     // Remove or change the Referer header
    //     //     proxyReq.setHeader('Referer', 'https://nodeflair.com')
    //     //     proxyReq.setHeader('Origin', 'https://nodeflair.com')
    //     //     // Optionally remove other problematic headers
    //     //     proxyReq.removeHeader('sec-fetch-dest')
    //     //     proxyReq.removeHeader('sec-fetch-mode')
    //     //     proxyReq.removeHeader('sec-fetch-site')
    //     //   })
    //     // }
    //   }
    // }
  },
  plugins: [million.vite({ auto: true }), react(), generouted()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './public'),
    },
  },
})
