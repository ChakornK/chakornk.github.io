const addSwipeNav = () => {
  const el = document.querySelector("main") as HTMLDivElement | null;
  if (!el) return;

  let startX = 0;
  let startY = 0;
  let dx = 0;
  let locked: "x" | "y" | null = null;

  const prev = document.querySelector("a:has(+ p[data-path])") as HTMLLinkElement | null;
  const next = document.querySelector("a:where(p[data-path] + a:not([target='_blank']))") as HTMLLinkElement | null;

  el.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    locked = null;
    el.style.transition = "none";
  });

  el.addEventListener(
    "touchmove",
    (e) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const deltaX = x - startX;
      const deltaY = y - startY;
      if (!locked) {
        locked = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
      }
      if (locked === "x" && (deltaX > 0 ? prev : next)) {
        e.preventDefault();
        dx = deltaX;
        el.style.transform = `translateX(${dx}px)`;
        el.style.opacity = `${(240 - Math.abs(dx)) / 240}`;
      }
    },
    { passive: false },
  );

  el.addEventListener("touchend", () => {
    const dest = dx > 0 ? prev : next;
    if (locked === "x" && Math.abs(dx) > 60 && dest) {
      el.style.transition = "transform 0.2s, opacity 0.5s";
      el.style.transform = `translateX(${dx > 0 ? "100vw" : "-100vw"})`;
      el.style.opacity = "0";
      setTimeout(() => {
        dest.click();
      }, 200);
    } else {
      el.style.transition = "transform 0.2s, opacity 0.2s";
      el.style.transform = "translateX(0)";
      el.style.opacity = "1";
    }
    dx = 0;
    locked = null;
  });
};
document.addEventListener("nav:page-load", addSwipeNav);
