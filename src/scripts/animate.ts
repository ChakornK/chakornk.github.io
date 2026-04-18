const children = document.querySelectorAll("main > *") as NodeListOf<HTMLElement>;

children.forEach((el, i) => {
  el.style.transitionDelay = `${i * 50}ms`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = "1";
    });
  });
});

const disableAnimation = () => {
  document.body.classList.remove("intro-fadein");
};

setTimeout(disableAnimation, 1000);
document.addEventListener("nav:page-load", disableAnimation);
