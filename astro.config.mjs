// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.techwemate.com',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/go/superfiliate': 'https://superfiliate.com/votre-lien-affilie',
    '/go/outil-2': 'https://partnerstack.com/g/votre-lien-unique',
  },
 fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
    },
  ],
});
