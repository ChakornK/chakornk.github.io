import fs from "node:fs";
import type { RenderFunctionInput } from "astro-opengraph-images";
import { twj } from "tw-to-css";

import { safeParseFrontmatter } from "../node_modules/astro/dist/content/utils";
import sharp from "sharp";

export async function ogImage({ title, description, pathname }: RenderFunctionInput) {
  if (pathname.match(/^projects\/[a-z0-9\-]+\/$/i)) {
    const projectId = pathname.split("/")[1];
    const file = fs.readFileSync(`./content/projects/${projectId}.md`, "utf-8");
    const data = safeParseFrontmatter(file).frontmatter;
    const imgRaw = fs.readFileSync(`./public/${data.thumbnail.replace(/^\//, "")}`);
    let img = "data:image/png;base64,";
    if (data.thumbnail.split(".").pop() === "png") {
      img += imgRaw.toString("base64");
    } else {
      img += (await sharp(Buffer.from(imgRaw)).png().toBuffer()).toString("base64");
    }

    return Promise.resolve(
      <div style={twj("h-full w-full flex items-center justify-center bg-gray-50")}>
        <img src={img} alt={data.title} style={twj("object-cover object-center h-full w-full")} />
      </div>,
    );
  }
  return Promise.resolve(
    <div style={twj("h-full w-full flex items-center justify-center bg-gray-50 text-center leading-relaxed")}>
      <div style={twj("flex items-center justify-center h-full flex-col gap-2 p-24")}>
        <h1 style={twj("text-7xl")}>{title}</h1>
        <div style={twj("text-4xl")}>{description}</div>
      </div>
    </div>,
  );
}
