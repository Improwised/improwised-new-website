// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.improwised.com',

  redirects: {
    "/sitemap.xml": "/sitemap-index.xml"
  },

  // Subdirectory path
  base: '/improwised-new-website/newapp',

  // Default output directory
  outDir: 'dist',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte(), mdx(), sitemap()],

  // server: {
  //   host: true,
  //   port: 4321
  // }
});
