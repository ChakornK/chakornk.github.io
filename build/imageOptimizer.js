import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const extMatcher = /\.(png|jpg|jpeg|gif|webp)$/;

sharp.cache(false);

const humanReadable = (bytes, decimals = 2) => {
  if (bytes === 0) return "0B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

/**
 * @typedef {Object} Config
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [quality]
 */
/**
 * @type {(config: Config) => import('astro').AstroIntegration}
 */
export const imageOptimizer = ({ width, height, quality = 50 }) => ({
  name: "image-optimizer",
  hooks: {
    "astro:build:generated": async ({ dir, logger }) => {
      const p = fileURLToPath(dir);
      const traverse = async (dir) => {
        for (const child of fs.readdirSync(dir)) {
          const childPath = path.join(dir, child);
          if (fs.statSync(childPath).isDirectory()) {
            await traverse(childPath);
          } else if (child.match(extMatcher)) {
            const b = Buffer.from(fs.readFileSync(childPath));
            const img = sharp(b);
            const { size } = await new Promise((resolve) => {
              img.metadata((err, metadata) => {
                if (err) {
                  logger.error(err);
                  return resolve({});
                }
                resolve(metadata);
              });
            });
            img.resize({ width, height, fit: "inside" }).webp({ quality, effort: 6 });
            await new Promise((resolve) => {
              img.toBuffer().then((buffer) => {
                fs.rmSync(childPath);
                fs.writeFileSync(childPath.replace(extMatcher, ".webp"), buffer);
                logger.info(
                  `${childPath.replace(extMatcher, ".webp").replace(p, "").replaceAll("\\", "/")}: ${humanReadable(size)} -> ${humanReadable(buffer.length)}`
                );
                resolve();
              });
            });
          } else if (child.endsWith(".html")) {
            let html = fs.readFileSync(childPath, "utf-8");
            const matches = html.matchAll(/(?<=<img src=")[^:]*?(?=")/g);
            for (const match of matches) {
              const [matchedText] = match;
              html = html.replaceAll(matchedText, matchedText.replace(extMatcher, ".webp"));
            }
            fs.writeFileSync(childPath, html);
          }
        }
      };
      await traverse(p);
    },
  },
});
