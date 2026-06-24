// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
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
  ],
  vite: {
    esbuild: {
      tsconfigRaw: {}
    },
  },
  env: {
    schema: {
      ANTHROPIC_API_KEY: { context: "server", access: "secret", type: "string" },
      APPSTORE_ISSUER_ID: { context: "server", access: "secret", type: "string" },
      APPSTORE_CONNECT_ID: { context: "server", access: "secret", type: "string" },
      APPSTORE_PRIVATE_KEY: { context: "server", access: "secret", type: "string" },
    },
  },
});