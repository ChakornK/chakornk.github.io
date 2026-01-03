import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @type {() => import('astro').AstroIntegration}
 */
export const cleanUp = () => ({
  name: "clean-up",
  hooks: {
    "astro:build:done": ({ dir, logger }) => {
      const p = fileURLToPath(dir);
      const chunks = fs.readdirSync(path.resolve(p, "_astro"));
      let unused = [];
      for (const chunk of chunks) {
        const content = fs.readFileSync(path.resolve(p, "_astro", chunk), "utf-8");
        if (content.trim().match(/^import".\/app\.[a-z0-9]{8}\.js";$/i)) {
          unused.push(chunk);
          logger.info(`Removing ${chunk}`);
          fs.rmSync(path.resolve(p, "_astro", chunk));
        }
      }

      const traverse = (dir, fn) => {
        for (const child of fs.readdirSync(dir)) {
          const childPath = path.join(dir, child);
          if (fs.statSync(childPath).isDirectory()) {
            traverse(childPath, fn);
          } else {
            fn({ child, childPath });
          }
        }
      };
      traverse(p, ({ child, childPath }) => {
        if (child.endsWith(".html")) {
          let content = fs.readFileSync(childPath, "utf-8");
          for (const chunk of unused) {
            content = content.replaceAll(`<script type="module" src="/_astro/${chunk}"></script>`, "");
          }
          fs.writeFileSync(childPath, content);
        }
      });
    },
  },
});
