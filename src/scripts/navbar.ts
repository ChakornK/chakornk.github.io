const c = () => document.querySelector(`[data-path="${window.location.pathname.replace(/(?<=[^\^])\/$/, "")}"]`);

let pid: string | null;

document.addEventListener("nav:before-nav", () => {
  const p = c();
  pid = p ? p.getAttribute("data-path") : null;
});

const calc = () => {
  const el = document.getElementById("nav-highlight");
  const elc = document.getElementById("nav-highlight-container");
  const clone = document.getElementById("nav-items-clone");
  if (!el || !elc || !clone) return;

  const n = c();
  if (!n) {
    el.style.opacity = "0";
    clone.style.maskSize = "0px 100%";
    return;
  }

  el.style.opacity = "1";

  const nb = n.getBoundingClientRect();
  const ncb = elc.getBoundingClientRect();
  const left = nb.left - ncb.left;
  const width = nb.right - nb.left;

  let transition = "opacity .15s linear";
  if (pid) {
    const pb = document.querySelector(`[data-path="${pid}"]`)?.getBoundingClientRect();
    if (pb) {
      const dir = nb.left < pb.left ? "left .1s ease-out, width .1s ease-in-out .025s" : "width .1s ease-out, left .1s ease-in-out .025s";
      transition += `, ${dir}`;
    }
  }

  el.style.transition = transition;
  el.style.left = `${left}px`;
  el.style.width = `${width}px`;

  clone.style.maskImage = "linear-gradient(black, black)";
  clone.style.maskPosition = `${left}px 0`;
  clone.style.maskSize = `${width}px 100%`;
  clone.style.transition = transition.replaceAll("left", "mask-position").replaceAll("width", "mask-size");
};

document.addEventListener("nav:page-load", calc);
document.fonts.addEventListener("loadingdone", calc);
