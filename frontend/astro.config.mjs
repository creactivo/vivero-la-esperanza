import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'hybrid',
  adapter: vercel(),
  server: {
    port: 4321,
    host: true
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro:transitions/client']
    }
  }
});
