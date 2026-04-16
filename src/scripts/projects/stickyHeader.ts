const register = () => {
  const header = document.getElementById("project-header");
  const collapse = document.getElementById("project-header-collapse");
  const title = header?.querySelector("h1");
  const subtitle = header?.querySelector("p");
  if (header && collapse && title && subtitle) {
    const updateCompact = () => {
      const isCompact = window.scrollY > 50;
      collapse.style.gridTemplateRows = isCompact ? "0fr" : "1fr";
      collapse.style.opacity = isCompact ? "0" : "1";
      collapse.classList.toggle("mt-2", !isCompact);
      header.classList.toggle("mb-8", isCompact);
      title.classList.toggle("text-2xl", isCompact);
      title.classList.toggle("text-4xl", !isCompact);
      subtitle.classList.toggle("text-sm", isCompact);
      subtitle.classList.toggle("text-base", !isCompact);
    };

    updateCompact();
    window.addEventListener("scroll", updateCompact, { passive: true });
  }
};
register();
document.addEventListener("nav:page-load", () => setTimeout(register, 100));
