import fs from "node:fs";

// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { imageOptimizer } from "./build/imageOptimizer.js";
import { cleanUp } from "./build/cleanUp.js";
import opengraphImages from "astro-opengraph-images";
import { ogImage } from "./src/og.tsx";
import UnoCSS from "unocss/astro";

import yaml from "@rollup/plugin-yaml";

import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://chakornk.dev",
  integrations: [
    sitemap(),
    icon(),
    imageOptimizer({
      width: 1344,
      height: 768,
      quality: 50,
    }),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Space Grotesk",
            weight: 400,
            style: "normal",
            data: fs.readFileSync("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff"),
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
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
    ],
  },
});
