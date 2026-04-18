let updateCompact = () => {};
export const updateHeader = (document: Document, scrollY: number) => {
  const header = document.getElementById("project-header");
  const collapse = document.getElementById("project-header-collapse");
  const title = header?.querySelector("h1");
  const subtitle = header?.querySelector("p");
  if (header && collapse && title && subtitle) {
    const isCompact = scrollY > 50;
    collapse.style.gridTemplateRows = isCompact ? "0fr" : "1fr";
    for (const chip of document.querySelectorAll("[data-chip-award], [data-chip-skill]") as NodeListOf<HTMLElement>) {
      chip.style.opacity = isCompact ? "0" : "1";
    }
    collapse.classList.toggle("mt-2", !isCompact);
    header.classList.toggle("mb-8", isCompact);
    title.classList.toggle("text-2xl", isCompact);
    title.classList.toggle("text-4xl", !isCompact);
    subtitle.classList.toggle("text-sm", isCompact);
    subtitle.classList.toggle("text-base", !isCompact);
  }
};
export const registerStickyHeader = (document: Document) => {
  if (updateCompact) document.removeEventListener("scroll", updateCompact);
  if (!document.querySelector("main") || document.querySelector("main")?.getAttribute("data-shr")) return;
  document.querySelector("main")?.setAttribute("data-shr", "true");
  const header = document.getElementById("project-header");
  const collapse = document.getElementById("project-header-collapse");
  const title = header?.querySelector("h1");
  const subtitle = header?.querySelector("p");
  if (header && collapse && title && subtitle) {
    updateCompact = () => {
      const isCompact = window.scrollY > 50;
      collapse.style.gridTemplateRows = isCompact ? "0fr" : "1fr";
      for (const chip of document.querySelectorAll("[data-chip-award], [data-chip-skill]") as NodeListOf<HTMLElement>) {
        chip.style.opacity = isCompact ? "0" : "1";
      }
      collapse.classList.toggle("mt-2", !isCompact);
      header.classList.toggle("mb-8", isCompact);
      title.classList.toggle("text-2xl", isCompact);
      title.classList.toggle("text-4xl", !isCompact);
      subtitle.classList.toggle("text-sm", isCompact);
      subtitle.classList.toggle("text-base", !isCompact);
    };

    updateCompact();
    document.addEventListener("scroll", updateCompact);
  }
};
registerStickyHeader(document);
