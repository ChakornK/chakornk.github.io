import { motion } from "motion/react";

export const CdnImg = (props) => (
  <img
    src={
      location?.protocol === "http:"
        ? props.src
        : `https://cdn.jsdelivr.net/gh/chakornk/chakornk.github.io@main/public/${props.src}`
    }
    {...props}
  />
);
export const MotionCdnImg = (props) => (
  <motion.img
    src={
      location?.protocol === "http:"
        ? props.src
        : `https://cdn.jsdelivr.net/gh/chakornk/chakornk.github.io@main/public/${props.src}`
    }
    {...props}
  />
);
