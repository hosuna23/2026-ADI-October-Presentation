/* ---------- Design data ----------
   region: "EMEA" or "NA" (anything not marked EMEA is North America)
   type:   "refresh" shows Before / After, "new" shows a single design      */
const DESIGNS = [
  {
    id: "radionix", section: "brand", type: "refresh", region: "NA",
    title: "Bosch Intrusion → Radionix",
    desc: "Bosch Intrusion is now Radionix. The page keeps the proven structure but moves to the new brand and leads with proof points.",
    changes: [
      "New Radionix identity with a navy and red palette",
      "Four value tiles: detection, false alarms, testing, install time",
      "“Superior by Design” testing story and a red promo strip",
      "Documentation cards and a full video playlist"
    ],
    old: "images/bosch-old.webp", new: "images/radionix-new.webp"
  },
  {
    id: "digital-watchdog", section: "brand", type: "refresh", region: "NA",
    title: "Digital Watchdog",
    desc: "Refreshed around DW’s cloud story, with DW Spectrum Enterprise as the main feature.",
    changes: [
      "Split hero for cloud-enabled video security",
      "“What is DW Spectrum Enterprise?” feature block",
      "MEGApix cloudcam promo banner",
      "Video playlist replaces the single carousel"
    ],
    old: "images/dw-old.webp", new: "images/dw-new.webp"
  },
  {
    id: "eaton", section: "brand", type: "new", region: "NA",
    title: "Eaton Brand Hub",
    desc: "One hub for Eaton Tripp Lite power and connectivity plus Eaton Life Safety Notification, with a category grid for each line.",
    img: "images/eaton.webp"
  },
  {
    id: "dahua", section: "brand", type: "new", region: "EMEA",
    title: "Dahua Technology",
    desc: "Leads with TiOC, WizSeek and AI. Includes the camera + monitor promo, a 2026 product guide download and the partner app.",
    img: "images/dahua.webp"
  },
  {
    id: "doorbird", section: "brand", type: "new", region: "EMEA",
    title: "DoorBird",
    desc: "Premium IP door stations. Shop by category and by series (D11, D21, D31, Indoor) with a brand video gallery.",
    img: "images/doorbird.webp"
  },
  {
    id: "hochiki", section: "brand", type: "new", region: "EMEA",
    title: "Hochiki",
    desc: "Fire detection built on compliance and heritage. Shop by product line, the ESP protocol story, and training resources.",
    img: "images/hochiki.webp"
  },
  {
    id: "sony-1", section: "banners", type: "new",
    title: "Sony BRAVIA 7 II · Version A",
    desc: "Sponsored home page banner. Abstract light-field creative with the product as the hero.",
    spec: "2160 × 494", img: "images/banner-sony-1.webp", ratio: 4.37
  },
  {
    id: "sony-2", section: "banners", type: "new",
    title: "Sony BRAVIA 7 II · Version B",
    desc: "Alternate creative. The chameleon breaks out of the screen to sell True RGB color.",
    spec: "2160 × 494", img: "images/banner-sony-2.webp", ratio: 4.37
  },
  {
    id: "lg-email", section: "email", type: "new",
    title: "LG Professional · Score Big and Save More",
    desc: "Football-season email for LG commercial displays. Project pricing through an SPA number, four featured products, offer ends Nov 30.",
    spec: "Email · 600px layout", img: "images/email-lg.webp"
  },
  {
    id: "ring", section: "signage", type: "new",
    title: "Ring Elite 4K 180",
    desc: "In-branch screen for the three-camera Ring Elite, with a QR code that takes customers straight to the product.",
    spec: "1920 × 1080", img: "images/signage-ring.webp", ratio: 1.78
  }
];

/* ---------- Render ---------- */
const $ = (s, el = document) => el.querySelector(s);
const thumb = (src) => src.replace(".webp", "-thumb.webp");

function regionTag(d) {
  if (!d.region) return "";
  return d.region === "EMEA"
    ? `<span class="tag emea">EMEA</span>`
    : `<span class="tag na">North America</span>`;
}

function shotButton(d, src, view, label) {
  const ratio = d.ratio ? `style="--ratio:${d.ratio}"` : "";
  return `<button class="shot" data-id="${d.id}" data-view="${view}" ${ratio} aria-label="Open ${d.title}${label ? " – " + label : ""}">
    ${label ? `<span class="label tag ${view}">${label}</span>` : ""}
    <img src="${thumb(src)}" alt="${d.title}${label ? " – " + label : ""}" loading="lazy">
    <span class="hint">Click to view</span>
  </button>`;
}

function renderEntry(d) {
  if (d.type === "refresh") {
    return `<article class="entry refresh">
      <div class="entry-meta">
        <div class="tags"><span class="tag refresh">Refresh</span>${regionTag(d)}</div>
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
        <ul class="changes">${d.changes.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="pair">
        ${shotButton(d, d.old, "old", "Before")}
        ${shotButton(d, d.new, "new", "After")}
      </div>
    </article>`;
  }
  return `<article class="entry">
    ${shotButton(d, d.img, "single", "")}
    <div class="entry-meta">
      <div class="tags">${d.section === "brand" ? `<span class="tag refresh">New page</span>` : ""}${regionTag(d)}</div>
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
      ${d.spec ? `<span class="spec">${d.spec}</span>` : ""}
    </div>
  </article>`;
}

const bySection = (s) => DESIGNS.filter(d => d.section === s);
$("#refresh-grid").innerHTML = DESIGNS.filter(d => d.type === "refresh").map(renderEntry).join("");
$("#new-grid").innerHTML = bySection("brand").filter(d => d.type === "new").map(renderEntry).join("");
$("#banners-grid").innerHTML = bySection("banners").map(renderEntry).join("");
$("#email-grid").innerHTML = bySection("email").map(renderEntry).join("");
$("#signage-grid").innerHTML = bySection("signage").map(renderEntry).join("");

/* ---------- Sticky nav: highlight the section in view ---------- */
const links = [...document.querySelectorAll(".nav a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
function setActive() {
  const y = window.scrollY + 120;
  let current = 0;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
  links.forEach((a, i) => a.classList.toggle("active", i === current && window.scrollY > 80));
}
window.addEventListener("scroll", setActive, { passive: true });
setActive();

/* ---------- Viewer ---------- */
const viewer = $("#viewer");
const scroller = $("#viewer-scroll");
const stage = $("#stage");
const seg = $("#seg");
const bar = $("#progress");
const note = $("#viewer-note");
let index = 0, view = "new", lastFocus = null, autoTimer = null;

function frame(src, alt, label, cls) {
  return `<figure class="frame" style="margin:0">
    ${label ? `<div class="frame-label"><span class="tag ${cls}">${label}</span></div>` : ""}
    <img src="${src}" alt="${alt}">
  </figure>`;
}

function renderViewer() {
  const d = DESIGNS[index];
  $("#viewer-name").textContent = d.title;
  $("#viewer-region").innerHTML = regionTag(d);
  $("#viewer-pos").textContent = `${index + 1} / ${DESIGNS.length}`;
  seg.hidden = d.type !== "refresh";
  stage.className = "stage";

  if (d.type === "refresh") {
    seg.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.view === view));
    if (view === "split") {
      stage.classList.add("split");
      stage.innerHTML = frame(d.old, d.title + " before", "Before", "old") + frame(d.new, d.title + " after", "After", "new");
    } else {
      stage.innerHTML = view === "old"
        ? frame(d.old, d.title + " before", "Before", "old")
        : frame(d.new, d.title + " after", "After", "new");
    }
  } else {
    if (d.ratio) stage.classList.add("short");
    stage.innerHTML = frame(d.img, d.title, "", "");
  }
  scroller.scrollTop = 0;
  updateProgress();
}

function openViewer(id, v) {
  index = DESIGNS.findIndex(d => d.id === id);
  view = v === "single" ? "new" : v;
  lastFocus = document.activeElement;
  viewer.hidden = false;
  document.body.classList.add("viewer-open");
  renderViewer();
  $("#close").focus();
  note.style.opacity = 1;
  setTimeout(() => (note.style.opacity = 0), 3500);
}

function closeViewer() {
  stopAuto();
  viewer.hidden = true;
  document.body.classList.remove("viewer-open");
  if (lastFocus) lastFocus.focus();
}

function go(step) {
  stopAuto();
  index = (index + step + DESIGNS.length) % DESIGNS.length;
  if (DESIGNS[index].type === "refresh" && view === "single") view = "new";
  renderViewer();
}

function updateProgress() {
  const max = scroller.scrollHeight - scroller.clientHeight;
  bar.style.width = max > 0 ? (scroller.scrollTop / max) * 100 + "%" : "100%";
}

/* Slow auto-scroll for presenting hands-free */
function toggleAuto() {
  if (autoTimer) return stopAuto();
  $("#auto").setAttribute("aria-pressed", "true");
  let last = performance.now();
  const step = (t) => {
    const dt = t - last; last = t;
    scroller.scrollTop += dt * 0.12; // ~120px per second
    if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1) return stopAuto();
    autoTimer = requestAnimationFrame(step);
  };
  autoTimer = requestAnimationFrame(step);
}
function stopAuto() {
  if (autoTimer) cancelAnimationFrame(autoTimer);
  autoTimer = null;
  $("#auto").setAttribute("aria-pressed", "false");
}

document.addEventListener("click", (e) => {
  const shot = e.target.closest(".shot");
  if (shot) openViewer(shot.dataset.id, shot.dataset.view);
});
// Click anywhere outside the design to close
scroller.addEventListener("click", (e) => { if (!e.target.closest(".frame img")) closeViewer(); });
scroller.addEventListener("scroll", updateProgress, { passive: true });
scroller.addEventListener("wheel", stopAuto, { passive: true });
scroller.addEventListener("touchstart", stopAuto, { passive: true });

$("#close").addEventListener("click", closeViewer);
$("#prev").addEventListener("click", () => go(-1));
$("#next").addEventListener("click", () => go(1));
$("#auto").addEventListener("click", toggleAuto);
$("#top").addEventListener("click", () => { stopAuto(); scroller.scrollTo({ top: 0, behavior: "smooth" }); });
seg.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const keep = scroller.scrollTop / Math.max(1, scroller.scrollHeight);
  view = b.dataset.view;
  renderViewer();
  // keep roughly the same spot when flipping Before / After
  requestAnimationFrame(() => (scroller.scrollTop = keep * scroller.scrollHeight));
});

document.addEventListener("keydown", (e) => {
  if (viewer.hidden) return;
  if (e.key === "Escape") closeViewer();
  else if (e.key === "ArrowRight") go(1);
  else if (e.key === "ArrowLeft") go(-1);
  else if (e.key.toLowerCase() === "a") toggleAuto();
  else if (DESIGNS[index].type === "refresh" && ["1", "2", "3"].includes(e.key)) {
    view = { 1: "old", 2: "new", 3: "split" }[e.key];
    renderViewer();
  }
});
