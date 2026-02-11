import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const THREADS = os.cpus().length || 4;
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
      const traverse = async (dir, fn) => {
        for (const child of fs.readdirSync(dir)) {
          const childPath = path.join(dir, child);
          if (fs.statSync(childPath).isDirectory()) {
            await traverse(childPath, fn);
          } else {
            await fn({ child, childPath });
          }
        }
      };

      const dimens = {};

      logger.info(`Using ${THREADS} threads`);
      const threads = Array.from({ length: THREADS }, () => []);
      let t = 0;
      await traverse(p, async ({ child, childPath }) => {
        if (child.match(extMatcher)) {
          threads[(t = (t + 1) % THREADS)].push(async () => {
            const b = Buffer.from(fs.readFileSync(childPath));
            const img = sharp(b);
            const { size: originalSize } = await new Promise((resolve) => {
              img.metadata((err, metadata) => {
                if (err) {
                  logger.error(err);
                  return resolve({});
                }
                resolve(metadata);
              });
            });
            img.resize({ width, height, fit: "inside" }).webp({ quality, effort: 6, smartDeblock: true, smartSubsample: true });
            await new Promise((resolve) => {
              img.toBuffer({ resolveWithObject: true }).then(({ data: buffer, info: { width, height, size } }) => {
                fs.rmSync(childPath);
                fs.writeFileSync(childPath.replace(extMatcher, ".webp"), buffer);
                dimens[childPath.replace(p, "").replaceAll("\\", "/")] = { width, height };
                logger.info(
                  `${childPath.replace(extMatcher, ".webp").replace(p, "").replaceAll("\\", "/")}: ${humanReadable(originalSize)} -> ${humanReadable(size)}`,
                );
                resolve();
              });
            });
          });
        }
      });
      await Promise.all(
        threads.map(async (thread) => {
          for (const job of thread) {
            await job();
          }
        }),
      );

      await traverse(p, async ({ child, childPath }) => {
        if (child.endsWith(".html")) {
          let html = fs.readFileSync(childPath, "utf-8");
          const matches = html.matchAll(/(?<=<img src="\/)[^:]*?(?=")/g);
          for (const match of matches) {
            const [matchedText] = match;
            if (!dimens[matchedText]) {
              html = html.replaceAll(matchedText, matchedText.replace(extMatcher, ".webp"));
            } else {
              const { width, height } = dimens[matchedText];
              html = html.replaceAll(`${matchedText}"`, `${matchedText.replace(extMatcher, ".webp")}" width="${width / 2}" height="${height / 2}"`);
            }
          }
          const matches2 = html.matchAll(/(?<=style="background-image: ?url\(\/)[^:]*?(?=\))/g);
          for (const match of matches2) {
            const [matchedText] = match;
            html = html.replaceAll(matchedText, matchedText.replace(extMatcher, ".webp"));
          }
          fs.writeFileSync(childPath, html);
        }
      });
    },
  },
});
