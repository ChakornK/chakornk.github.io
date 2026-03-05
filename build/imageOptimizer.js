import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const THREADS = os.cpus().length || 4;
const extMatcher = /\.(png|jpg|jpeg|gif|webp)$/;

// Vercel build cache is mounted at /vercel/cache
const LOCAL_CACHE_DIR = ".image-cache";
const VERCEL_CACHE_DIR = "/vercel/cache/image-optimizer";
const IS_VERCEL = !!process.env.VERCEL;
const CACHE_DIR = IS_VERCEL ? VERCEL_CACHE_DIR : LOCAL_CACHE_DIR;

sharp.cache(false);

const humanReadable = (bytes, decimals = 2) => {
  if (bytes === 0) return "0B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

const hashFile = (filePath) => {
  const contents = fs.readFileSync(filePath);
  return crypto.createHash("sha1").update(contents).digest("hex");
};

const ensureCacheDir = () => {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
};

const getCachedPath = (hash) => path.join(CACHE_DIR, `${hash}.webp`);

const readFromCache = (hash) => {
  const cachedPath = getCachedPath(hash);
  if (fs.existsSync(cachedPath)) {
    return fs.readFileSync(cachedPath);
  }
  return null;
};

const writeToCache = (hash, buffer) => {
  fs.writeFileSync(getCachedPath(hash), buffer);
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

      ensureCacheDir();
      logger.info(`Image cache: ${IS_VERCEL ? "Vercel" : "local"} (${CACHE_DIR})`);

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
      let cacheHits = 0;
      let cacheMisses = 0;

      logger.info(`Using ${THREADS} threads`);
      const threads = Array.from({ length: THREADS }, () => []);
      let t = 0;
      await traverse(p, async ({ child, childPath }) => {
        if (child.match(extMatcher)) {
          threads[(t = (t + 1) % THREADS)].push(async () => {
            const hash = hashFile(childPath);
            const cached = readFromCache(hash);
            const outputPath = childPath.replace(extMatcher, ".webp");
            const relPath = outputPath.replace(p, "").replaceAll("\\", "/");

            if (cached) {
              const info = await sharp(cached).metadata();
              dimens[childPath.replace(p, "").replaceAll("\\", "/")] = {
                width: info.width,
                height: info.height,
              };
              fs.rmSync(childPath);
              fs.writeFileSync(outputPath, cached);
              cacheHits++;
              logger.info(`${relPath}: cache hit (${humanReadable(cached.length)})`);
              return;
            }

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
                writeToCache(hash, buffer);
                fs.rmSync(childPath);
                fs.writeFileSync(outputPath, buffer);
                dimens[childPath.replace(p, "").replaceAll("\\", "/")] = { width, height };
                cacheMisses++;
                logger.info(`${relPath}: ${humanReadable(originalSize)} -> ${humanReadable(size)}`);
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

      logger.info(`Cache summary: ${cacheHits} hits, ${cacheMisses} misses`);

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
