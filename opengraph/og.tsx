import fs from "node:fs";
import type { RenderFunctionInput } from "astro-opengraph-images";
import { twj } from "tw-to-css";

import { safeParseFrontmatter } from "../node_modules/astro/dist/content/utils";
import sharp from "sharp";

export async function ogImage({ title, description, pathname }: RenderFunctionInput) {
  const defaultImage = (
    <div style={twj("h-full w-full flex items-center justify-center bg-[#fcfcf7] text-[#003943] text-center leading-relaxed")}>
      <div style={twj("flex items-center justify-center h-full flex-col p-24")}>
        <h1 style={twj("text-8xl")}>{title}</h1>
        <div style={twj("text-6xl")}>{description}</div>
      </div>
    </div>
  );

  if (pathname.match(/^projects\/[a-z0-9\-]+\/$/i)) {
    const projectId = pathname.split("/")[1];
    let fileName;
    try {
      const project = fs.readdirSync("./content/projects").find((f) => f.split(".")[0].split("-").slice(1).join("-") === projectId);
      if (project) fileName = `projects/${project}`;
      else
        fileName = `projects-hackathon/${fs.readdirSync("./content/projects-hackathon").find((f) => f.split(".")[0].split("-").slice(1).join("-") === projectId)}`;
    } catch (e) {
      console.error(e);
      return Promise.resolve(defaultImage);
    }
    const file = fs.readFileSync(`content/${fileName}`, "utf-8");
    const data = safeParseFrontmatter(file).frontmatter;
    const imgRaw = fs.readFileSync(`./public/${data.thumbnail.replace(/^\//, "")}`);
    let img = "data:image/png;base64,";
    if (data.thumbnail.split(".").pop() === "png") {
      img += imgRaw.toString("base64");
    } else {
      img += (await sharp(Buffer.from(imgRaw)).png().toBuffer()).toString("base64");
    }

    return Promise.resolve(
      <div style={twj("h-full w-full flex items-center justify-center bg-[#fcfcf7]")}>
        <img
          src={img}
          alt={data.title}
          style={{
            ...twj("object-cover h-full w-full"),
            objectPosition: data.thumbnailPosition || "center",
          }}
        />
      </div>,
    );
  }
  return Promise.resolve(defaultImage);
}
