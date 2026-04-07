import { animate, stagger } from "animejs";

const disableAnimation = () => {
  document.body.classList.remove("anime-fadein");
};
setTimeout(disableAnimation, 1000);
document.addEventListener("nav:page-load", disableAnimation);

animate("main > *", {
  opacity: [0, 1],
  delay: stagger(50),
  duration: 300,
});
