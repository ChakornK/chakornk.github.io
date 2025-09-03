import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "preact/hooks";
import "./page.css";
import { GithubIcon } from "../components/icons";

const pgNums = 2;
export default () => {
  const [canScroll, setCanScroll] = useState(false);
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: mainRef,
  });

  useEffect(() => {
    if (scrollYProgress.get() > 0.5 / pgNums) setCanScroll(true);
    setTimeout(() => setCanScroll(true), 2140);

    new Lenis({
      autoRaf: true,
      wrapper: mainRef.current,
    });
  }, []);

  return (
    <motion.main
      style={{ overflowY: canScroll ? "auto" : "hidden" }}
      ref={mainRef}
    >
      <Cover scrollYProgress={scrollYProgress} instantLoad={canScroll} />
      <Works />
    </motion.main>
  );
};

const Cover = ({ scrollYProgress, instantLoad }) => {
  const scale = useTransform(
    scrollYProgress,
    [0.5 / pgNums, 1 / pgNums],
    [1, 0.8]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.5 / pgNums, 1 / pgNums],
    [1, 0]
  );

  return (
    <motion.div className="justify-center page" style={{ opacity }}>
      <motion.svg
        viewBox="-16 -16 493 104.4"
        className="opacity-0 -m-4 h-25"
        style={{ scale }}
      >
        {[
          "M62.6 22.5c-1.4-9.3-6.5-16.1-14.9-19.8-9.2-4.2-24.2-3.5-32.4 2C4.4 11.4 0 23.3 0 36.4c0 13 4.2 24.8 15.1 31.5 5 3 11.2 4.5 18.5 4.5 14.2.3 27.9-7.7 30.1-22.4H51c-3 11.8-20.8 13.5-29.2 7.3-11.9-8.4-12.2-33.6-.3-42.2 5.3-4.5 17.6-4.7 23.3-.6 2.9 1.9 4.8 4.6 5.7 8h12.1Z",
          "M85.2 71.6s0-25.6 0-25.6c0-7.8 3.5-17.2 12.8-16.9 9.3-.3 11.3 8 11.3 15.6V71.6h12.2s0-29 0-29c-.1-8.2-1.4-16.2-7.8-21.2-7.6-5.6-22.4-4-28.5 4.3V.9H73V71.6H85.2Z",
          "M166 50.5c.1 7.4-6.8 12.1-13.9 11.9-2.8 0-5.8-1-7.6-3.1-1.6-1.7-1.7-5.9-.1-7.6.8-.9 1.8-1.6 3.1-2 2.7-.9 6-.9 9-.9h9.6v1.7ZM155.7 40.2c-8.1.3-17.8.6-22.5 8-2.5 3.7-2.8 11.2-.5 15.3 2.1 4.1 5.8 6.6 10.1 7.9 7.9 2.2 18.8 1.1 23.8-6.5l.3 6.8h10.8V43.3c0-7.9-1.8-14.1-5.3-18.5-4.3-6.3-16.1-8-24.4-5.7-7.4 1.7-13.9 6.8-15.1 14.7h12.5c2-5.8 11.7-6.4 16.1-3.7 3.4 2.2 4.5 5.9 4.5 10.1H155.7Z",
          "M201.5 71.6V50.7h8.3l14.1 20.9h14.2L219.6 44l17.1-25.1H223L209.1 40h-7.6V.9H189.3V71.6h12.2Z",
          "M267.9 61.1c-12.9.6-16.3-13.9-12.6-23.7 2.1-5.3 6.5-8.1 12.6-8.1 6.2-.1 10.4 2.8 12.5 8.2 3.7 9.8.3 24.2-12.5 23.7Zm.1 11.2c16.2.2 26-11 25.8-26.8 0-5.5-1-10.3-3.1-14.4-4.4-8.6-12.7-12.9-22.7-12.9-10.1-.1-18.3 4.2-22.9 12.8-2.1 4-3.2 8.8-3.2 14.3-.2 15.9 10 27.3 26.1 27Z",
          "M315.8 71.6s0-25 0-25c-.2-10.2 5.6-17 16-16.8H335V18.2c-7.3-.6-15.4.9-19.6 7.6l-.7-6.9H303.6V71.6h12.2Z",
          "M354.4 71.6s0-25.3 0-25.3c-.2-8.3 4.1-17.4 13.3-17.2 9-.3 10.9 8.1 10.8 15.4V71.6h12.2s0-29.1 0-29.1c-.1-8.1-1.4-16.2-7.9-21.1-7.6-5.5-22.5-4.1-28.5 4.2l-.7-6.7H342.2V71.6h12.2Z",
          "M416.7 71.6V42.7h10.7l19.1 28.9H461L437.4 35.5 461 .9H446.8l-20 30.4H416.7V.9H404.2V71.6h12.5Z",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            animate={
              instantLoad
                ? {
                    opacity: 1,
                    pathLength: 1,
                    fillOpacity: 1,
                  }
                : {
                    opacity: [1],
                    pathLength: [0, 0.5, 1, null, null],
                    fillOpacity: [0, null, null, 1, null],
                    filter: [
                      "drop-shadow(0 0 0px currentColor)",
                      null,
                      null,
                      "drop-shadow(0 0 8px currentColor)",
                      "drop-shadow(0 0 0px currentColor)",
                    ],
                  }
            }
            transition={
              instantLoad
                ? { duration: 0 }
                : {
                    duration: 1.5,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </motion.svg>
      <motion.div
        className="flex items-center gap-2 opacity-0 mt-4 text-neutral-400"
        style={{ scale }}
        animate={instantLoad ? { opacity: 1 } : { opacity: [0, 1] }}
        transition={
          instantLoad
            ? { duration: 0 }
            : { delay: 2, duration: 1, ease: "easeOut" }
        }
      >
        <a href="https://github.com/ChakornK" target="_blank" rel="noreferrer">
          <GithubIcon width={32} height={32} />
        </a>
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <div className="page">
      <h2 className="font-semibold text-6xl">Works</h2>
    </div>
  );
};
