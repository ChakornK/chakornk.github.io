// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import yaml from "@rollup/plugin-yaml";

export default defineConfig({
  integrations: [preact(), icon()],

  vite: {
    plugins: [tailwindcss(), yaml()],
  },
});
