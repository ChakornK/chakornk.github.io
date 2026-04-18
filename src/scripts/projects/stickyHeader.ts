const SCROLL_THRESHOLD = 48;

export const updateHeader = (document: Document, scrollY: number) => {
  const header = document.getElementById("project-header-visible");
  const collapse = document.getElementById("project-header-collapse");
  const collapseBg = document.getElementById("project-header-collapse-bg");
  const title = header?.querySelector("h1");
  const subtitle = header?.querySelector("p");

  if (header && collapse && collapseBg && title && subtitle) {
    const isCompact = scrollY > SCROLL_THRESHOLD;
    collapse.style.opacity = isCompact ? "0" : "1";
    collapseBg.style.height = isCompact ? "0" : "100%";
    title.style.fontSize = isCompact ? "1.5rem" : "2.25rem";
    subtitle.style.fontSize = isCompact ? "0.875rem" : "1rem";
  }
};

let scrollListener: () => void = () => {};

export const registerStickyHeader = (document: Document) => {
  document.removeEventListener("scroll", scrollListener);

  const main = document.querySelector("main");
  if (!main || main.getAttribute("data-shr")) return;
  main.setAttribute("data-shr", "true");

  scrollListener = () => updateHeader(document, window.scrollY);
  updateHeader(document, window.scrollY);
  document.addEventListener("scroll", scrollListener);
};

registerStickyHeader(document);
