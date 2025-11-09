import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from "@dhiwise/component-tagger";

// DOCKER CONFIG
// Use this when running all services in Docker (docker-compose up)

export default defineConfig({
  plugins: [react(), tagger()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@pages': path.resolve('./src/pages'),
      '@assets': path.resolve('./src/assets'),
      '@constants': path.resolve('./src/constants'),
      '@styles': path.resolve('./src/styles'),
    },
  },
  server: {
    port: "4028",
    host: '0.0.0.0',  // Allow access from Docker network
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://backend:3000',  // Backend in Docker network
        changeOrigin: true,
      },
    },
  }
});
