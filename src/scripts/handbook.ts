// Small client-side behaviours: view switch, full-screen viewer, copy buttons, active nav link.
// Each preview <section> holds its current view in data-img / data-label / data-narrow.

/* Full-screen viewer */
const lb = document.getElementById("lb") as HTMLElement;
const lbImg = document.getElementById("lb-img") as HTMLImageElement;
const lbScroll = document.getElementById("lb-scroll") as HTMLElement;
const lbTitle = document.getElementById("lb-title") as HTMLElement;
const lbClose = document.getElementById("lb-close") as HTMLButtonElement;
let lastFocus: Element | null = null;

function openViewer(section: HTMLElement) {
  const { img = "", name = "", label, narrow } = section.dataset;
  lastFocus = document.activeElement;
  lbImg.src = img;
  lbImg.alt = `Σχέδιο σελίδας: ${name}`;
  lbScroll.classList.toggle("narrow", narrow === "true");
  lbScroll.scrollTop = 0;
  lbTitle.textContent = name + (label ? ` · ${label}` : "");
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  lbClose.focus();
}
function closeViewer() {
  if (lb.hidden) return;
  lb.hidden = true;
  document.body.style.overflow = "";
  (lastFocus as HTMLElement | null)?.focus();
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const viewBtn = target.closest<HTMLButtonElement>("[data-src]");
  if (viewBtn) {
    const section = viewBtn.closest("section") as HTMLElement;
    const narrow = viewBtn.dataset.narrow === "true";
    viewBtn.parentElement!.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === viewBtn)));
    section.dataset.img = viewBtn.dataset.src;
    section.dataset.label = viewBtn.dataset.label ?? "";
    if (narrow) section.dataset.narrow = "true"; else delete section.dataset.narrow;
    const frame = section.querySelector(".frame") as HTMLElement;
    frame.classList.toggle("mobile", narrow);
    frame.querySelector("img")!.src = viewBtn.dataset.src ?? "";
    frame.scrollTop = 0;
    return;
  }
  const opener = target.closest("[data-open]");
  if (opener) openViewer(opener.closest("section") as HTMLElement);
});
lbClose.addEventListener("click", closeViewer);
lb.addEventListener("click", (e) => { if (e.target === lb) closeViewer(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeViewer();
  const t = e.target as HTMLElement;
  if ((e.key === "Enter" || e.key === " ") && t.classList?.contains("frame")) {
    e.preventDefault();
    openViewer(t.closest("section") as HTMLElement);
  }
});

/* Copy logo SVG / colour code */
const toast = document.getElementById("toast") as HTMLElement;
let toastTimer: number | undefined;
function say(msg: string) {
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toast.hidden = true), 1600);
}
async function copyText(text: string, msg: string) {
  try { await navigator.clipboard.writeText(text); say(msg); }
  catch { say("Το πρόγραμμα περιήγησης δεν επέτρεψε την αντιγραφή"); }
}
document.querySelectorAll<HTMLButtonElement>("[data-svg]").forEach((b) =>
  b.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      const svg = await fetch(b.dataset.svg!).then((r) => r.text());
      await copyText(svg, "Το SVG αντιγράφηκε");
    } catch { say("Δεν φορτώθηκε το αρχείο του λογοτύπου"); }
  }),
);
document.querySelectorAll<HTMLButtonElement>("[data-hex]").forEach((b) =>
  b.addEventListener("click", () => copyText(b.dataset.hex!, `Αντιγράφηκε: ${b.dataset.hex}`)),
);

/* Sidebar groups open and close */
const nav = document.querySelector(".side nav") as HTMLElement;
function setOpen(title: HTMLButtonElement, open: boolean) {
  title.setAttribute("aria-expanded", String(open));
}
function keepInView(a: HTMLElement) {
  const n = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
  if (r.top < n.top + 8) nav.scrollTop -= n.top + 8 - r.top;
  else if (r.bottom > n.bottom - 8) nav.scrollTop += r.bottom - n.bottom + 8;
}
nav.querySelectorAll<HTMLButtonElement>(".group-title").forEach((t) =>
  t.addEventListener("click", () => setOpen(t, t.getAttribute("aria-expanded") !== "true")),
);

/* Highlight the section in view */
const links = [...document.querySelectorAll<HTMLAnchorElement>(".side nav a")];
const byId = new Map(links.map((a) => [a.getAttribute("href")!.slice(1), a]));
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => a.classList.remove("on"));
    const a = byId.get(en.target.id);
    if (a) {
      a.classList.add("on");
      if (innerWidth <= 900) a.scrollIntoView({ block: "nearest", inline: "center" });
      else {
        const title = a.closest(".group")?.querySelector<HTMLButtonElement>(".group-title");
        if (title?.getAttribute("aria-expanded") === "false") setOpen(title, true);
        keepInView(a);
      }
    }
  }),
  { rootMargin: "-25% 0px -70% 0px" },
);
byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
