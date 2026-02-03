const scrollPosStore = JSON.parse(window.sessionStorage.getItem("scroll-pos") || "{}") as Record<string, number>;
const loadPos = () => {
  if (scrollPosStore[window.location.pathname]) {
    window.scrollTo(0, scrollPosStore[window.location.pathname]);
  } else {
    window.scrollTo(0, 0);
  }
};
export const savePos = () => {
  scrollPosStore[window.location.pathname] = window.scrollY;
  window.sessionStorage.setItem("scroll-pos", JSON.stringify(scrollPosStore));
};
document.addEventListener("nav:page-load", loadPos);
