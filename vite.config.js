import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwind from "@tailwindcss/vite";

import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: ["/404"],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: "/404",
      },
    }),
    tailwind(),
  ],
  build: {
    cssMinify: "lightningcss",
    minify: "terser",
    terserOptions: {
      ecma: 2020,
    },
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browserslist("last 2 versions")),
    },
  },
});
