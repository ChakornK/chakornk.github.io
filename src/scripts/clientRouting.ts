const cache = new Map();
const supportsVT = !!document.startViewTransition;

const fetchDoc = async (url: string) => {
  if (cache.has(url)) return cache.get(url);
  const r = await fetch(url);
  const t = await r.text();
  cache.set(url, t);
  return t;
};

const swap = async (url: string, push = true) => {
  document.dispatchEvent(new Event("nav:before-nav"));
  const html = await fetchDoc(url);
  const doc = new DOMParser().parseFromString(html, "text/html");
  const doSwap = () => {
    document.title = doc.title;
    document.querySelector("main")!.replaceWith(doc.querySelector("main")!);
    document.getElementById("nav-items")!.replaceWith(doc.getElementById("nav-items")!);
    history[push ? "pushState" : "replaceState"]({}, "", url);
    document.dispatchEvent(new Event("nav:page-load"));
  };
  supportsVT ? document.startViewTransition(doSwap) : doSwap();
};

document.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest("a");
  if (!a || a.target || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  swap(url.href);
});

window.addEventListener("popstate", () => swap(location.href, false));

const prefetchHandler = (e: MouseEvent | TouchEvent) => {
  const a = (e.target as HTMLElement).closest("a");
  if (a && a.href && a.origin === location.origin) fetchDoc(a.href);
};
document.addEventListener("mouseover", prefetchHandler);
document.addEventListener("touchstart", prefetchHandler);
