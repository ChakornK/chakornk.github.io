// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";
import yaml from "@rollup/plugin-yaml";

import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  integrations: [preact(), icon()],
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
    defaultStrategy: "load",
    prefetchAll: true,
  },
});
