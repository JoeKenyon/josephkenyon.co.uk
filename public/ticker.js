function ticker(el, { speed = 80, reverse = false, pauseOnHover = true, gap = 0 } = {}) {
  const src = el.innerHTML;
  el.innerHTML = "";
  // force a full-width block box, so centering/inline-block/shrink-to-fit rules can't offset the track
  Object.assign(el.style, {
    display: "block", width: "100%", maxWidth: "100%", minWidth: "0",
    boxSizing: "border-box", overflow: "hidden", whiteSpace: "nowrap",
    left: "0", right: "auto", transform: "none", textAlign: "left"
  });
 
  const track = document.createElement("div");
  track.style.cssText = "display:flex;width:max-content;will-change:transform";
  el.appendChild(track);
 
  const unit = () => {
    const d = document.createElement("div");
    d.style.cssText = `display:flex;flex:none;align-items:center;gap:${gap}px;padding-right:${gap}px`;
    d.innerHTML = src;
    return d;
  };
 
  let anim;
  function build() {
    if (anim) anim.cancel();
    track.innerHTML = "";
    const first = unit();
    track.appendChild(first);
    const w = first.getBoundingClientRect().width;
    if (!w) return;
    // cover the widest the container could be, then shift by exactly one copy
    const cover = Math.max(el.clientWidth, window.innerWidth);
    for (let i = Math.ceil(cover / w); i > 0; i--) track.appendChild(unit());
    const [a, b] = reverse ? [-w, 0] : [0, -w];
    anim = track.animate(
      [{ transform: `translateX(${a}px)` }, { transform: `translateX(${b}px)` }],
      { duration: (w / speed) * 1000, iterations: Infinity, easing: "linear" }
    );
  }
 
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  window.addEventListener("load", build);
  let t;
  window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(build, 150); });
 
  if (pauseOnHover) {
    el.addEventListener("mouseenter", () => anim && anim.pause());
    el.addEventListener("mouseleave", () => anim && anim.play());
  }
}