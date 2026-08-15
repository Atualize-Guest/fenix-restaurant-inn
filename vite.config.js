import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base relativa: o mesmo build funciona no domínio próprio (raiz) e em
  // subpasta (GitHub Pages / preview do Lovable), sem quebrar os assets.
  base: './',
  server: {
    port: 8080,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
