// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import { imageOptimizer } from "./build/imageOptimizer.js";

import tailwindcss from "@tailwindcss/vite";
import yaml from "@rollup/plugin-yaml";

import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  integrations: [
    icon(),
    imageOptimizer({
      width: 1344,
      height: 768,
      quality: 50,
    }),
  ],
  vite: {
    plugins: [tailwindcss(), yaml()],
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
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
});
