import Lenis from "lenis";
import "lenis/dist/lenis.css";

import {
  AnimatePresence,
  motion,
  stagger,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import "./page.css";
import { projects } from "../projectsData";
import { ImgCarousel } from "../components/imgcarousel";
import { ArrowDown, CheckCircle2, Globe, X } from "lucide-react";
import { createContext } from "preact";
import {
  SiCodepen,
  SiDiscord,
  SiGithub,
  SiInstagram,
} from "@icons-pack/react-simple-icons";
import { CdnImg } from "../components/cdnimg";

const StateProvider = createContext(null);

const pgNums = 4.5; // length of page in vh
let lenis;
export default () => {
  const [notTop, setNotTop] = useState(false);
  const mainRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    container: mainRef,
  });

  useEffect(() => {
    if (scrollYProgress.get() > 0.2 / pgNums) setNotTop(true);

    lenis = new Lenis({
      autoRaf: true,
      wrapper: mainRef.current,
      prevent: (n) => n.classList.contains("scroll-block"),
    });
  }, []);

  const scrollProgress = useMotionTemplate`${useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100]
  )}vw`;

  return (
    <StateProvider.Provider value={{ scrollYProgress, scrollY }}>
      <motion.main ref={mainRef}>
        <Cover instantLoad={notTop} />
        <Works />
        <Socials />
      </motion.main>
      <motion.div
        className="bottom-0 left-1/2 z-20 fixed bg-white h-0.5 -translate-x-1/2"
        style={{ width: scrollProgress }}
      />
    </StateProvider.Provider>
  );
};

const Cover = ({ instantLoad }) => {
  const { scrollYProgress, scrollY } = useContext(StateProvider);
  const scale = useTransform(
    scrollYProgress,
    [0.2 / pgNums, 1 / pgNums],
    [1, 0.8]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.4 / pgNums, 1 / pgNums],
    [1, 0]
  );

  const [canInteract, setCanInteract] = useState(false);
  useMotionValueEvent(opacity, "change", (v) => {
    if (v === 0) {
      setCanInteract(false);
    } else {
      setCanInteract(true);
    }
  });
  useEffect(() => {
    if (opacity.get() === 0) {
      setCanInteract(false);
    } else {
      setCanInteract(true);
    }
  }, []);

  const scrollPromptOpacity = useTransform(scrollY, [0, 40, 60], [1, 1, 0]);

  return (
    <motion.div
      className="justify-center page"
      style={{ opacity, pointerEvents: canInteract ? "auto" : "none" }}
    >
      <motion.svg
        viewBox="-16 -16 493 104.4"
        className="opacity-0 -m-4 px-4 max-w-screen h-25"
        style={{ scale }}
        animate={{ opacity: 1 }}
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
          <SiGithub size={32} />
        </a>
      </motion.div>

      <motion.div
        style={{ opacity: scrollPromptOpacity }}
        className="bottom-4 left-1/2 fixed flex flex-col items-center -translate-x-1/2 pointer-events-none"
      >
        <ArrowDown />
        Scroll down
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  const { scrollYProgress } = useContext(StateProvider);

  const opacity = useTransform(
    scrollYProgress,
    [0.9 / pgNums, 0.95 / pgNums, 4 / pgNums, 4.1 / pgNums],
    [0, 1, 1, 0]
  );
  const cardIndexMotion = useTransform(
    scrollYProgress,
    [
      1.34 / pgNums,
      ...projects.map((_, i) => ((2.6 / projects.length) * i + 1.35) / pgNums),
    ],
    [-1, ...projects.map((_, i) => i)],
    {
      ease: Math.round,
    }
  );
  const [cardIndex, setCardIndex] = useState(-1);
  useMotionValueEvent(cardIndexMotion, "change", (v) => {
    setCardIndex(v);
  });

  const [expandedCard, setExpandedCard] = useState(null);

  const [canInteract, setCanInteract] = useState(false);
  useMotionValueEvent(opacity, "change", (v) => {
    if (v === 0) {
      setCanInteract(false);
    } else {
      setCanInteract(true);
    }
  });
  useEffect(() => {
    if (opacity.get() === 0) {
      setCanInteract(false);
    } else {
      setCanInteract(true);
    }
  }, []);

  return (
    <motion.div
      className="page"
      style={{
        opacity,
        height: "300vh",
        pointerEvents: canInteract ? "auto" : "none",
      }}
    >
      <div className="top-0 sticky flex flex-col items-center w-screen h-screen">
        <h2 className="mt-16 -mb-4 font-semibold text-6xl">Works</h2>

        <div className="relative bg-white grow">
          <AnimatePresence>
            {projects.map(
              (p, i) =>
                cardIndex >= i && (
                  <ProjectCard
                    key={p.title}
                    index={i}
                    isTop={cardIndex === i}
                    expanded={expandedCard === i}
                    onOpen={() => setExpandedCard(i)}
                    onClose={() => setExpandedCard(null)}
                    {...p}
                  />
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const variationFreq = { r: 2.3, x: 2, y: 1.8 };
/** @type {import("motion").Variants} */
const projectCardAnimation = {
  hidden: (i) => {
    const r = Math.sin(i * variationFreq.r);
    const x = Math.sin(i * variationFreq.x);
    const y = Math.sin(i * variationFreq.y);
    return {
      opacity: 0,
      bottom: "-100%",
      translate: "-50% 0%",
      transform: `translate(${x * 20}px, ${y * 20}px) rotate(${r * 20}deg)`,
    };
  },
  visible: (i) => {
    const r = Math.sin(i * variationFreq.r);
    const x = Math.sin(i * variationFreq.x);
    const y = Math.sin(i * variationFreq.y);
    return {
      opacity: 1,
      bottom: "50%",
      translate: "-50% 50%",
      transform: `translate(${x * 10}px, ${y * 10}px) rotate(${r * 2}deg)`,
      transition: { duration: 0.5, ease: [0, 1, 0.3, 1] },
    };
  },
  exit: (i) => {
    const r = Math.sin(i * variationFreq.r);
    const y = Math.sin(i * variationFreq.y);
    return {
      opacity: 0,
      bottom: "50%",
      transform: `translate(${r * 300}px, ${y * 10}px) rotate(${r * 10}deg)`,
      transition: { duration: 0.3, ease: "easeOut" },
    };
  },
};
const ProjectCard = ({
  title,
  id,
  brief,
  features,
  imgsNum,
  imgs,
  links,
  expanded,
  onOpen,
  onClose,
  isTop,
  index,
}) => {
  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            key={`overlay-${title}`}
            className="scroll-block overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              key={`expanded-card-${title}`}
              className="card lg"
              initial={{ transform: "translate(0, 25px) scale(0.9)" }}
              animate={{ transform: "translate(0, 0) scale(1)" }}
              exit={{ transform: "translate(0, 25px) scale(0.9)" }}
              transition={{ duration: 0.3, ease: [0, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="top-2 right-2 z-50 absolute overlay-button"
                onClick={onClose}
              >
                <X size={20} />
              </button>
              <div className="w-full h-1/2">
                <ImgCarousel
                  images={
                    imgs
                      ? imgs.map((img) => `img/${img}.webp`)
                      : Array(imgsNum)
                          .fill(0)
                          .map((_, i) => `img/${id}${i}.webp`)
                  }
                />
              </div>
              <div className="card-lg-details-container">
                <div className="card-lg-description">
                  <h2 className="card-lg-title">{title}</h2>
                  <div className="card-lg-prose">
                    <p>{brief}</p>
                    <ul>
                      {features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {Object.entries(links).length !== 0 && (
                  <div className="card-lg-links">
                    <p className="font-semibold text-white text-lg">Links</p>
                    {Object.entries(links).map(([name, url]) => (
                      <ProjectLink key={url} name={name} url={url} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="card sm"
        variants={projectCardAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={index}
        onClick={() => !expanded && isTop && onOpen()}
        style={{
          cursor: isTop ? "pointer" : "default",
        }}
      >
        <CdnImg
          src={`img/${id}cover.webp`}
          alt={title}
          draggable={false}
          className="card-img"
        />
        <p className="font-medium text-xl">{title}</p>
        <p className="text-neutral-400 text-sm">{brief}</p>
      </motion.button>
    </>
  );
};
const ProjectLink = ({ name, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="flex items-center gap-1.5 hover:underline"
    >
      <LinkIcon name={name} />
      {name}
    </a>
  );
};
const LinkIcon = ({ name }) => {
  switch (name.toLowerCase()) {
    case "github":
      return <SiGithub size={"1.25rem"} />;
    case "codepen":
      return <SiCodepen size={"1.25rem"} />;
    default:
      return <Globe size={"1.25rem"} />;
  }
};

const socialLinks = {
  Github: "https://github.com/chakornk",
  Instagram: "https://instagram.com/chakorn.07",
  Discord: "chakorn.7",
};
const Socials = () => {
  const { scrollYProgress } = useContext(StateProvider);

  const opacity = useTransform(
    scrollYProgress,
    [4 / pgNums, 4.1 / pgNums],
    [0, 1]
  );

  const [copiedAlertVisible, setCopiedAlertVisible] = useState(false);
  const [copiedAlertId, setCopiedAlertId] = useState(null);
  const copyText = useCallback(async (text) => {
    await navigator.clipboard.writeText(text);
    setCopiedAlertVisible(true);
    try {
      clearTimeout(copiedAlertId);
    } catch {}
    setCopiedAlertId(
      setTimeout(() => {
        setCopiedAlertVisible(false);
      }, 1000)
    );
  });

  return (
    <motion.div className="page" style={{ opacity, height: "50vh" }}>
      <h2 className="font-semibold text-6xl">Socials</h2>
      <motion.div
        className="flex items-center gap-4"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
            transition: {
              delayChildren: stagger(0.2, { startDelay: 0.2, from: "first" }),
            },
          },
        }}
        initial="initial"
        whileInView="animate"
      >
        {Object.entries(socialLinks).map(([name, url]) => (
          <motion.a
            key={url}
            className="cursor-pointer"
            href={name !== "Discord" && url}
            onClick={
              name === "Discord"
                ? () => {
                    copyText(url);
                  }
                : null
            }
            target="_blank"
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
            }}
          >
            <SocialIcon name={name} />
          </motion.a>
        ))}
      </motion.div>
      <AnimatePresence>
        {copiedAlertVisible && (
          <motion.div
            key={copiedAlertId}
            className="top-2 left-1/2 fixed flex items-center gap-2 bg-emerald-900 px-4 py-2 border border-emerald-400 rounded-full text-emerald-400 -translate-x-1/2"
            initial={{
              y: -30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -30,
              opacity: 0,
            }}
          >
            <CheckCircle2 size={"1.25rem"} />
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const SocialIcon = ({ name }) => {
  switch (name.toLowerCase()) {
    case "github":
      return <SiGithub size={"2rem"} />;
    case "instagram":
      return <SiInstagram size={"2rem"} />;
    case "discord":
      return <SiDiscord size={"2rem"} />;
    default:
      return null;
  }
};
