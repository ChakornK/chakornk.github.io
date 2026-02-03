const c = () => document.querySelector(`[data-path="${window.location.pathname.replace(/(?<=[^\^])\/$/, "")}"]`);
let pid: string | null;
document.addEventListener("nav:before-nav", () => {
  const p = c();
  if (!p) {
    pid = null;
  } else {
    pid = p.getAttribute("data-path");
  }
});
const calc = () => {
  const el = document.getElementById("nav-highlight");
  const elc = document.getElementById("nav-highlight-container");
  if (!el || !elc) return;
  const n = c();
  if (!n) {
    el.style.opacity = "0";
    return;
  } else {
    el.style.opacity = "1";
  }
  const nb = n.getBoundingClientRect();
  const ncb = elc.getBoundingClientRect();
  if (pid) {
    const pb = document.querySelector(`[data-path="${pid}"]`)?.getBoundingClientRect();
    if (pb) {
      el.style.transition = `opacity .15s linear, ${nb.left < pb.left ? "left .1s ease-out, width .1s ease-in-out .025s" : "width .1s ease-out, left .1s ease-in-out .025s"}`;
    }
  } else {
    el.style.transition = "";
  }
  el.style.left = `${nb.left - ncb.left}px`;
  el.style.width = `${nb.right - nb.left}px`;
};
document.addEventListener("nav:page-load", calc);
document.fonts.addEventListener("loadingdone", calc);
