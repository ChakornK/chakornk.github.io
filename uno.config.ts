import { defineConfig, presetTypography, presetWind3, transformerDirectives, type Preset } from "unocss";
import type { Theme } from "unocss/preset-wind3";

export default defineConfig({
  presets: [
    presetWind3({
      preflight: "on-demand",
    }),
    presetTypography(),
  ] as Preset<Theme>[],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      sans: `"Space Grotesk", sans-serif`,
    },
    colors: {
      background: "#fafaf4",
      surface: "#d6d3d133",
      text: "#133336",
      highlight: "#38bdf816",
    },
  },
});
