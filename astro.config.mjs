import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://uwcourt.com',
  output: 'static',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/apply-thanks'),
    }),
  ],

  adapter: cloudflare()
});