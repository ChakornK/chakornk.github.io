history.scrollRestoration = "manual";

let scrollPosStore: Record<string, number>;
try {
  scrollPosStore = JSON.parse(window.sessionStorage.getItem("scroll-pos") || "{}");
} catch {
  scrollPosStore = {};
}

export const savePos = (pathname?: string) => {
  const path = pathname ?? window.location.pathname;
  scrollPosStore[path] = window.scrollY;
  window.sessionStorage.setItem("scroll-pos", JSON.stringify(scrollPosStore));
};

export const getSavedPos = (pathname?: string) => scrollPosStore[pathname ?? window.location.pathname];
export const restorePos = (pathname?: string) => {
  window.scrollTo(0, getSavedPos(pathname) ?? 0);
};
