const disableAnimation = () => {
  document.body.classList.remove("anime-fadein");
};
setTimeout(disableAnimation, 1000);
document.addEventListener("nav:page-load", disableAnimation);
