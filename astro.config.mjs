import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const CHURCH_ID = process.env.CHURCH_ID || 'rosario';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.CHURCH_ID': JSON.stringify(CHURCH_ID),
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
