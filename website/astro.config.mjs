// @ts-check
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["de", "en", "fr", "it"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true
    }
  },
  site: 'https://arsenal-app.ch',
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en', // All urls that don't contain `es` or `fr` after `https://example.com/` will be treated as default locale, i.e. `en`
        locales: {
          en: 'en-US', // The `defaultLocale` value must present in `locales` keys
          de: 'de-DE',
          fr: 'fr-FR',
          it: 'it-IT'
        },
      },
    }),
  ]
});