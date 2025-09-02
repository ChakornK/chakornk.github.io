import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "preact/hooks";
import "./page.css";

const pgNums = 2;
export default () => {
  const [canScroll, setCanScroll] = useState(false);
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: mainRef,
  });

  useEffect(() => {
    if (scrollYProgress.get() > 0) setCanScroll(true);
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
      <Cover scrollYProgress={scrollYProgress} />
      <Works />
    </motion.main>
  );
};

const Cover = ({ scrollYProgress }) => {
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
    <div className="page">
      <motion.svg
        viewBox="-16 -16 493 104.4"
        className="-m-4 h-25"
        style={{ scale, opacity }}
      >
        {[
          "M62.6,22.5c-1.4-9.3-6.5-16.1-14.9-19.8C38.5-1.5,23.5-.8,15.3,4.7,4.4,11.4,0,23.3,0,36.4c0,13,4.2,24.8,15.1,31.5,5,3,11.2,4.5,18.5,4.5,14.2.3,27.9-7.7,30.1-22.4h-12.7c-3,11.8-20.8,13.5-29.2,7.3-11.9-8.4-12.2-33.6-.3-42.2,5.3-4.5,17.6-4.7,23.3-.6,2.9,1.9,4.8,4.6,5.7,8h12.1Z",
          "M85.2,71.6h-12.2V.9h12.2v24.8c6.1-8.3,20.9-9.9,28.5-4.3,6.4,5,7.7,13,7.8,21.2,0,0,0,29,0,29h-12.2v-26.9c0-7.6-2-15.9-11.3-15.6-9.3-.3-12.8,9.1-12.8,16.9,0,0,0,25.6,0,25.6Z",
          "M155.7,40.2h10.3c0-4.2-1.1-7.9-4.5-10.1-4.4-2.7-14.1-2.1-16.1,3.7h-12.5c1.2-7.9,7.7-13,15.1-14.7,8.3-2.3,20.1-.6,24.4,5.7,3.5,4.4,5.3,10.6,5.3,18.5v28.4h-10.8l-.3-6.8c-5,7.6-15.9,8.7-23.8,6.5-4.3-1.3-8-3.8-10.1-7.9-2.3-4.1-2-11.6.5-15.3,4.7-7.4,14.4-7.7,22.5-8ZM166.1,50.5v-1.7h-9.6c-3,0-6.3,0-9,.9-1.3.4-2.3,1.1-3.1,2-1.6,1.7-1.5,5.9.1,7.6,1.8,2.1,4.8,3.1,7.6,3.1,7.1.2,14-4.5,13.9-11.9Z",
          "M201.5,71.6h-12.2V.9h12.2v39.1h7.6l13.9-21.1h13.7l-17.1,25.1,18.5,27.6h-14.2l-14.1-20.9h-8.3v20.9Z",
          "M268,72.3c-16.1.3-26.3-11.1-26.1-27,0-5.5,1.1-10.3,3.2-14.3,4.6-8.6,12.8-12.9,22.9-12.8,10,0,18.3,4.3,22.7,12.9,2.1,4.1,3.1,8.9,3.1,14.4.2,15.8-9.6,27-25.8,26.8ZM267.9,61.2c12.8.5,16.2-13.9,12.5-23.7-2.1-5.4-6.3-8.3-12.5-8.2-6.1,0-10.5,2.8-12.6,8.1-3.7,9.8-.3,24.3,12.6,23.7Z",
          "M315.8,71.6h-12.2V18.9h11.1l.7,6.9c4.2-6.7,12.3-8.2,19.6-7.6v11.6h-3.2c-10.4-.2-16.2,6.6-16,16.8,0,0,0,25,0,25Z",
          "M354.4,71.6h-12.2V18.9h11.4l.7,6.7c6-8.3,20.9-9.7,28.5-4.2,6.5,4.9,7.8,13,7.9,21.1,0,0,0,29.1,0,29.1h-12.2v-27.1c.1-7.3-1.8-15.7-10.8-15.4-9.2-.2-13.5,8.9-13.3,17.2,0,0,0,25.3,0,25.3Z",
          "M416.7,71.6h-12.5V.9h12.5v30.4h10.1L446.8.9h14.2l-23.6,34.6,23.6,36.1h-14.5l-19.1-28.9h-10.7v28.9Z",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            animate={{
              pathLength: [0, 0.5, 1, null, null],
              fillOpacity: [0, null, null, 1, null],
              filter: [
                "drop-shadow(0 0 0px currentColor)",
                null,
                null,
                "drop-shadow(0 0 8px currentColor)",
                "drop-shadow(0 0 0px currentColor)",
              ],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
};

const Works = () => {
  return (
    <div className="page">
      <h2 className="font-semibold text-6xl">Works</h2>
    </div>
  );
};
