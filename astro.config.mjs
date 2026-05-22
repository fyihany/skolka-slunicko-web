// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://fyihany.github.io',
  base: isProd ? '/skolka-slunicko-web' : '/',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), icon()]
});