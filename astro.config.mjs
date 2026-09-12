import fs from "node:fs";

// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { imageOptimizer } from "./build/imageOptimizer.js";
import { cleanUp } from "./build/cleanUp.js";
import opengraphImages from "astro-opengraph-images";
import { ogImage } from "./opengraph/og.tsx";
import UnoCSS from "unocss/astro";

import yaml from "@rollup/plugin-yaml";

import rehypeExternalLinks from "rehype-external-links";
import { unified } from "@astrojs/markdown-remark";
import remarkGithubUser from "@/plugins/remark-github-user.ts";

export default defineConfig({
  site: "https://chakornk.dev",
  fonts: [
    {
      name: "Vollkorn",
      cssVariable: "--font-display",
      provider: fontProviders.fontsource(),
      fallbacks: ["Georgia", "serif"],
      subsets: ["latin"],
      styles: ["normal"],
      weights: ["400 500"],
    },
    {
      name: "Manrope",
      cssVariable: "--font-sans",
      provider: fontProviders.fontsource(),
      fallbacks: ["Arial", "sans-serif"],
      subsets: ["latin"],
      styles: ["normal"],
      weights: ["400 700"],
    },
  ],
  integrations: [
    sitemap({
      serialize: (item) => {
        item.url = item.url.replace(/\/$/, "");
        return item;
      },
    }),
    icon(),
    imageOptimizer({
      width: 1344,
      height: 768,
      quality: 50,
      siteUrl: "https://chakornk.dev",
    }),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Vollkorn",
            weight: 500,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/vollkorn/files/vollkorn-latin-500-normal.woff",
            ),
          },
        ],
      },
      render: ogImage,
    }),
    cleanUp(),
    UnoCSS(),
  ],
  vite: {
    plugins: [yaml()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("astro:") || id.includes("node_modules")) {
              return "app";
            }
          },
          entryFileNames: "_astro/app.[hash].js",
        },
      },
    },
  },
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        ],
      ],
      remarkPlugins: [[remarkGithubUser]],
    }),
  },
});
