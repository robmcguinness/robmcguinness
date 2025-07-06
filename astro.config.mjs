import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { SITE_URL } from "./src/constants.mjs";

// biome-ignore lint/style/noDefaultExport: required for Astro config
export default defineConfig({
  site: SITE_URL,
  srcDir: "./src",
  output: "static",
  trailingSlash: "never",
  vite: {
    plugins: [
      tailwindcss({
        applyBaseStyles: true,
      }),
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "aurora-x",
    },
  },
  integrations: [
    sitemap(),
    react(),
    mdx({
      optimize: true,
      syntaxHighlight: "shiki",
    }),
  ],
});
