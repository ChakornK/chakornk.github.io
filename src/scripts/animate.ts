const children = document.querySelectorAll("main > *") as NodeListOf<HTMLElement>;

children.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transition = `opacity 300ms ease ${i * 50}ms`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = "1";
    });
  });
});

const disableAnimation = () => {
  document.body.classList.remove("intro-fadein");
  children.forEach((el) => {
    el.style.transition = "";
  });
};

setTimeout(disableAnimation, 1000);
document.addEventListener("nav:page-load", disableAnimation);
