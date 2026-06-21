import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
// output: 'static' → SSG (Static Site Generation).
// El build requiere que el backend esté corriendo para compilar.
// Las páginas se generan de forma estática en tiempo de build.
export default defineConfig({
  integrations: [react()],
  output: 'static',
  server: {
    port: 4321,
    host: true
  }
});