import { motion } from "motion/react";

const cdnUrl =
  "https://cdn.jsdelivr.net/gh/chakornk/chakornk.github.io@main/public/";

export const CdnImg = (props) => (
  <img
    src={location?.protocol === "http:" ? props.src : `${cdnUrl}${props.src}`}
    draggable={false}
    {...props}
  />
);
export const MotionCdnImg = (props) => (
  <motion.img
    src={location?.protocol === "http:" ? props.src : `${cdnUrl}${props.src}`}
    draggable={false}
    {...props}
  />
);

export const CdnImgPreloader = ({ images }) => (
  <span class="w-0 h-0 overflow-hidden pointer-events-none select-none">
    {(typeof images.length === "number" ? images : [images]).map((url) => (
      <img
        key={url}
        src={location?.protocol === "http:" ? url : `${cdnUrl}${url}`}
      />
    ))}
  </span>
);
