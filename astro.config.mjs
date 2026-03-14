import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import { SITE_URL } from "./src/constants.mjs";

// biome-ignore lint/style/noDefaultExport: required for Astro config
export default defineConfig({
  site: SITE_URL,
  srcDir: "./src",
  output: "static",
  compressHTML: true,
  trailingSlash: "never",
  experimental: {
    rustCompiler: true,
  },
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
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  integrations: [
    sitemap(),
    mdx({
      optimize: true,
      syntaxHighlight: "shiki",
    }),
  ],
});
