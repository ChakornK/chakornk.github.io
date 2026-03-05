import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const THREADS = os.cpus().length || 4;
const extMatcher = /\.(png|jpg|jpeg|gif|webp)$/;
const CACHE_DIR = ".image-cache";
const REMOTE_CACHE_PATH = "_image-cache";

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

const fetchFromRemote = async (hash, siteUrl) => {
  try {
    const url = `${siteUrl}/${REMOTE_CACHE_PATH}/${hash}.webp`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
};

/**
 * @typedef {Object} Config
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [quality]
 * @property {string} [siteUrl]
 */
/**
 * @type {(config: Config) => import('astro').AstroIntegration}
 */
export const imageOptimizer = ({ width, height, quality = 50, siteUrl }) => ({
  name: "image-optimizer",
  hooks: {
    "astro:build:generated": async ({ dir, logger }) => {
      const p = fileURLToPath(dir);

      ensureCacheDir();

      if (siteUrl) {
        logger.info(`Remote cache: ${siteUrl}/${REMOTE_CACHE_PATH}/`);
      }

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
      let localHits = 0;
      let remoteHits = 0;
      let cacheMisses = 0;

      logger.info(`Using ${THREADS} threads`);
      const threads = Array.from({ length: THREADS }, () => []);
      let t = 0;
      await traverse(p, async ({ child, childPath }) => {
        if (child.match(extMatcher)) {
          threads[(t = (t + 1) % THREADS)].push(async () => {
            const hash = hashFile(childPath);
            const outputPath = childPath.replace(extMatcher, ".webp");
            const relPath = outputPath.replace(p, "").replaceAll("\\", "/");

            let buffer = readFromCache(hash);
            if (buffer) {
              localHits++;
              logger.info(`${relPath}: local cache hit (${humanReadable(buffer.length)})`);
            }

            if (!buffer && siteUrl) {
              buffer = await fetchFromRemote(hash, siteUrl);
              if (buffer) {
                writeToCache(hash, buffer);
                remoteHits++;
                logger.info(`${relPath}: remote cache hit (${humanReadable(buffer.length)})`);
              }
            }

            if (buffer) {
              const info = await sharp(buffer).metadata();
              dimens[childPath.replace(p, "").replaceAll("\\", "/")] = {
                width: info.width,
                height: info.height,
              };
              fs.rmSync(childPath);
              fs.writeFileSync(outputPath, buffer);
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

      logger.info(`Cache summary: ${localHits} local hits, ${remoteHits} remote hits, ${cacheMisses} misses`);

      const remoteCacheOutputDir = path.join(p, REMOTE_CACHE_PATH);
      fs.mkdirSync(remoteCacheOutputDir, { recursive: true });
      for (const file of fs.readdirSync(CACHE_DIR)) {
        fs.copyFileSync(path.join(CACHE_DIR, file), path.join(remoteCacheOutputDir, file));
      }
      logger.info(`Published ${fs.readdirSync(remoteCacheOutputDir).length} files to /${REMOTE_CACHE_PATH}/`);

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
