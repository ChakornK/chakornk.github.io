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
  },
});
