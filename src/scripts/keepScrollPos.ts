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

export const restorePos = (pathname?: string) => {
  const savedPos = scrollPosStore[pathname ?? window.location.pathname];
  if (savedPos !== undefined) {
    window.scrollTo(0, savedPos);
  } else {
    window.scrollTo(0, 0);
  }
};
