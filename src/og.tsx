import type { RenderFunctionInput } from "astro-opengraph-images";
import { twj } from "tw-to-css";

export async function ogImage({ title, description }: RenderFunctionInput) {
  return Promise.resolve(
    <div style={twj("h-full w-full flex items-center justify-center bg-gray-50 text-center leading-relaxed")}>
      <div style={twj("flex items-center justify-center h-full flex-col gap-2 p-24")}>
        <h1 style={twj("text-7xl")}>{title}</h1>
        <div style={twj("text-4xl")}>{description}</div>
      </div>
    </div>
  );
}
