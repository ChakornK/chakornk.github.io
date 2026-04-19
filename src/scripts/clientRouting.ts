import { savePos as saveScrollPos, restorePos, getSavedPos } from "./keepScrollPos";
import { registerStickyHeader, updateHeader } from "./projects/stickyHeader";

const cache = new Map<string, string>();
const supportsVT = !!document.startViewTransition;

const PROJECT_TRANSITION_ATTRIBUTES = [
  "data-project-bg",
  "data-project-img",
  "data-project-title",
  "data-project-desc",
  "data-project-links",
  "data-project-chips",
] as const;

const getProjectIdFromUrl = (url: string): string | null => {
  const path = new URL(url, location.origin).pathname;
  const match = path.match(/^\/projects\/([^/]+)/);
  return match ? match[1] : null;
};

const applyTransitionNames = (projectId: string): void => {
  for (const attr of PROJECT_TRANSITION_ATTRIBUTES) {
    const element = document.querySelector(`[${attr}="${projectId}"]`);
    if (!element) continue;
    const transitionName = attr.replace(/^data-/, "");
    (element as HTMLElement).style.viewTransitionName = transitionName;
  }

  const awardChips = document.querySelectorAll(`[data-chip-award^="${projectId}-"]`);
  awardChips.forEach((el, index) => {
    (el as HTMLElement).style.viewTransitionName = `chip-award-${index}`;
  });

  const skillChips = document.querySelectorAll(`[data-chip-skill^="${projectId}-"]`);
  skillChips.forEach((el, index) => {
    (el as HTMLElement).style.viewTransitionName = `chip-skill-${index}`;
  });
};

const clearTransitionNames = (): void => {
  for (const attr of PROJECT_TRANSITION_ATTRIBUTES) {
    const elements = document.querySelectorAll(`[${attr}]`);
    elements.forEach((el) => {
      (el as HTMLElement).style.viewTransitionName = "";
    });
  }

  const allChips = document.querySelectorAll("[data-chip-award], [data-chip-skill]");
  allChips.forEach((el) => {
    (el as HTMLElement).style.viewTransitionName = "";
  });
};

const fetchDoc = async (url: string): Promise<string> => {
  if (cache.has(url)) return cache.get(url)!;

  const response = await fetch(url);
  const html = await response.text();

  cache.set(url, html);
  return html;
};

let previousUrl = location.href;
let isNavigating = false;
const swap = async (url: string, push = true): Promise<void> => {
  if (isNavigating) return;
  isNavigating = true;
  document.dispatchEvent(new Event("nav:before-nav"));
  saveScrollPos(new URL(previousUrl, location.origin).pathname);

  const currentProjectId = getProjectIdFromUrl(previousUrl);
  const targetProjectId = getProjectIdFromUrl(url);
  const isProjectNavigation = currentProjectId !== null || targetProjectId !== null;

  const html = await fetchDoc(url);
  const doc = new DOMParser().parseFromString(html, "text/html");

  const targetPathname = new URL(url, location.origin).pathname;

  const doSwap = (): void => {
    document.title = doc.title;
    const oldMain = document.querySelector("main");
    const newMain = doc.querySelector("main");
    if (!oldMain || !newMain) {
      location.href = url;
      return;
    }
    updateHeader(doc, getSavedPos(targetPathname));
    oldMain.replaceWith(newMain);

    const oldNav = document.getElementById("nav-items");
    const newNav = doc.getElementById("nav-items");
    if (oldNav && newNav) oldNav.replaceWith(newNav);

    history[push ? "pushState" : "replaceState"]({}, "", url);
  };

  if (!supportsVT || !isProjectNavigation) {
    doSwap();
    restorePos();
    clearTransitionNames();
    document.dispatchEvent(new Event("nav:page-load"));
    isNavigating = false;
    return;
  }

  const activeProjectId = targetProjectId ?? (doc.querySelector(`[data-project-bg="${currentProjectId}"]`) && currentProjectId);
  if (activeProjectId) applyTransitionNames(activeProjectId);

  const vt = document.startViewTransition(() => {
    doSwap();
    restorePos(targetPathname);
    if (activeProjectId) {
      applyTransitionNames(activeProjectId);
      registerStickyHeader(document);
    }
  });
  vt.ready.then(() => {
    if (targetProjectId) {
      document.getElementById("project-content")?.classList.add("fade-in");
    }
  });
  vt.finished.then(() => {
    clearTransitionNames();
    document.dispatchEvent(new Event("nav:page-load"));
    isNavigating = false;
  });
};

document.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest("a");
  if (!a || a.target || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  swap(url.href);
  previousUrl = url.href;
});

window.addEventListener("popstate", () => {
  swap(location.href, false);
  previousUrl = location.href;
});

const prefetchHandler = (e: MouseEvent | TouchEvent) => {
  const a = (e.target as HTMLElement).closest("a");
  if (a && !a.target && a.href && a.origin === location.origin) fetchDoc(a.href);
};
document.addEventListener("mouseover", prefetchHandler);
document.addEventListener("touchstart", prefetchHandler);
