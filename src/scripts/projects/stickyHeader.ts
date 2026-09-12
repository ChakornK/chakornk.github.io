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
    title.style.fontSize = isCompact ? "var(--type-title-compact)" : "var(--type-title)";
    subtitle.style.fontSize = isCompact ? "var(--type-label)" : "var(--type-body)";
  }
};

let scrollListener: null | (() => void) = null;

export const registerStickyHeader = (document: Document) => {
  if (document.getElementById("project-header")) {
    if (scrollListener != null) return;

    const main = document.querySelector("main");
    if (!main || main.getAttribute("data-shr")) return;
    main.setAttribute("data-shr", "true");

    scrollListener = () => updateHeader(document, window.scrollY);
    // updateHeader(document, window.scrollY);
    document.addEventListener("scroll", scrollListener);
  } else {
    if (scrollListener == null) return;
    try {
      document.removeEventListener("scroll", scrollListener);
    } catch {}
    scrollListener = null;
  }
};

registerStickyHeader(document);
