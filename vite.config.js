import { defineConfig } from 'vite';

export default defineConfig({
  base: '/fenix-restaurant-inn/',
  server: {
    port: 8080,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
