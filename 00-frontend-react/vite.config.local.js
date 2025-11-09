import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from "@dhiwise/component-tagger";

// LOCAL DEVELOPMENT CONFIG
// Use this when running frontend on localhost (npm run dev)

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
    host: 'localhost',
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Backend on localhost
        changeOrigin: true,
      },
    },
  }
});
