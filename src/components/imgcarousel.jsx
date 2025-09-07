import { AnimatePresence, motion, wrap } from "motion/react";
import { useState } from "preact/hooks";
import "./imgcarousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionCdnImg } from "./cdnimg";

const bgVariants = {
  hidden: {
    opacity: 0,
    zIndex: 1,
  },
  visible: {
    opacity: 1,
    zIndex: 1,
  },
  exit: {
    opacity: 0.99,
    zIndex: 0,
  },
};
const variants = {
  enter: (d) => {
    return {
      x: d > 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (d) => {
    return {
      zIndex: 0,
      x: d < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const ImgCarousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="carousel">
      <AnimatePresence initial={false} custom={direction}>
        <div className="carousel-bg-container">
          <AnimatePresence>
            <MotionCdnImg
              key={`bg-${images[imageIndex]}`}
              className="carousel-bg"
              src={images[imageIndex]}
              variants={bgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.8,
              }}
            />
          </AnimatePresence>
        </div>
        <MotionCdnImg
          key={`${images[imageIndex]}-${Date.now()}`}
          className="carousel-img"
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <button
        className="left-2 carousel-button overlay-button bg"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="right-2 carousel-button overlay-button bg"
        onClick={() => paginate(1)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
