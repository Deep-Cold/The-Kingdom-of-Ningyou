const characters = {
  faye: {
    name: "菲·苏普雷玛",
    role: "人偶君王 · 新月家族",
    tags: "圣明 · 愿意付出 · 与民同乐 · 坚定",
    image: "assets/faye.webp",
    text: "新人偶帝国的第一任君王。她以音乐为中心重塑国家体制，也让戏剧逐渐向音乐剧倾斜。她渴望让所有人偶成为真正的人类，并坚信这是国家唯一的未来。",
    quote: "“一个值得托付性命的君主。” —— 多斯卡·托尼特鲁斯"
  },
  ignotus: {
    name: "伊格诺图斯",
    role: "预言家 · 家族未知",
    tags: "神秘 · 预见 · 身份成谜",
    image: "assets/ignotus.webp",
    text: "只有君王见过的预言家。他以奇怪的假面遮脸，不借助道具便能准确说出将要发生的事。预言违背奥德教教义，但他的存在始终没有被宫廷发现。",
    quote: "他是否与地下的塞利教有关？又为何主动接近君王？"
  },
  ming: {
    name: "明·鲁门·因佩里",
    role: "宫廷宰相 · 日轮家族",
    tags: "公正 · 细致 · 权力",
    image: "assets/ming.webp",
    text: "帝国的二把手。政务、君王起居与宫廷大小事务皆由他统筹。铁面作风树敌不少，但超强的能力与正派作风，让反对者难以撼动他。",
    quote: "“无论遇到什么事情，都能安排得井井有条。” —— 詹姆斯"
  },
  dosca: {
    name: "多斯卡·托尼特鲁斯",
    role: "骑士队长 · 古树家族",
    tags: "热衷武技 · 自由不羁 · 强大",
    image: "assets/dosca.webp",
    text: "武力高强的骑士队长，与军队领导者关系不睦。据传他曾因军中意见分歧被调往宫廷。他从不谈过去，只专注于精进武艺与城堡守备。",
    quote: "“有这样的卫兵队长，城堡将会坚不可摧。” —— 菲·苏普雷玛"
  },
  frigus: {
    name: "弗里格斯·阿斯特里",
    role: "宫廷祭祀 · 翼百合家族",
    tags: "随性 · 谜语 · 隐秘",
    image: "assets/frigus.webp",
    text: "奥德教的最高首领，长期留在祈祷室。各地教团管理者都会与他单独会面，内容无人知晓。人们会怀疑他的作为，却无人怀疑他对龙之巫女的虔诚。",
    quote: "“从容背后的城府，始终让人看不透。” —— 菲·苏普雷玛"
  },
  kotori: {
    name: "琴鸟·马吉斯特·科克鲁姆",
    role: "宫廷厨师长 · 新月家族",
    tags: "努力 · 技艺高超 · 真性情",
    image: "assets/kotori.webp",
    text: "出生于资源匮乏的马尔吉内斯，凭借对味道的超强感知与不懈努力被君王选中。身世一度招致宫廷怀疑，最终以技艺折服众人。",
    quote: "“他的饭菜每次都能带来新的惊喜。” —— 弗里格斯"
  },
  james: {
    name: "詹姆斯·佩尔索纳·苏普雷玛",
    role: "首席戏剧表演家 · 日轮家族",
    tags: "旅行者 · 技艺高超 · 为人圆滑",
    image: "assets/james.webp",
    text: "足迹遍及人偶世界的表演家，也是升华仪式剧目的设计者。仪式前，他住进舞台准备室，反复推演剧本，并频繁与宫廷要员会面。",
    quote: "在看似圆满的剧本之下，又隐藏着怎样的结局？"
  }
};

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));
document.addEventListener("click", event => {
  if (!event.target.closest(".site-header")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("pending");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: "0px 0px 80px" });
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".reveal").forEach(item => {
    if (item.getBoundingClientRect().top > innerHeight) item.classList.add("pending");
    revealObserver.observe(item);
  });
}

const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href")));
let scrollQueued = false;
function updateNavigation() {
  const offset = document.querySelector(".site-header").offsetHeight + 100;
  let active = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= offset) active = section.id;
  }
  navLinks.forEach(link => {
    const current = link.hash === `#${active}`;
    link.classList.toggle("active", current);
    if (current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollQueued = false;
}
addEventListener("scroll", () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
addEventListener("resize", updateNavigation);
updateNavigation();

const dialog = document.querySelector("#character-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogName = document.querySelector("#dialog-name");
const dialogRole = document.querySelector("#dialog-role");
const dialogTags = document.querySelector("#dialog-tags");
const dialogText = document.querySelector("#dialog-text");
const dialogQuote = document.querySelector("#dialog-quote");
let opener;
let savedScroll = 0;
let closeTimer;
let closing = false;

function closeDialog() {
  if (!dialog.open || closing) return;
  closing = true;
  dialog.classList.remove("is-visible");
  closeTimer = setTimeout(() => dialog.close(), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
}

document.querySelectorAll("[data-character]").forEach(card => {
  card.addEventListener("click", () => {
    const item = characters[card.dataset.character];
    dialogImage.src = item.image;
    dialogImage.alt = `${item.name}立绘`;
    dialogName.textContent = item.name;
    dialogRole.textContent = item.role;
    dialogTags.textContent = item.tags;
    dialogText.textContent = item.text;
    dialogQuote.textContent = item.quote;
    opener = card;
    savedScroll = window.scrollY;
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add("modal-open");
    closing = false;
    clearTimeout(closeTimer);
    dialog.showModal();
    dialog.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (dialog.open && !closing) dialog.classList.add("is-visible");
    }));
  });
});

document.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("cancel", event => { event.preventDefault(); closeDialog(); });
let backdropPointer = false;
function outsideDialog(event) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}
dialog.addEventListener("pointerdown", event => { backdropPointer = outsideDialog(event); });
dialog.addEventListener("pointerup", event => {
  if (backdropPointer && outsideDialog(event)) closeDialog();
  backdropPointer = false;
});
dialog.addEventListener("close", () => {
  clearTimeout(closeTimer);
  dialog.classList.remove("is-visible");
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  opener?.focus({ preventScroll: true });
  closing = false;
});

const canInspect = matchMedia("(hover: hover) and (pointer: fine)").matches
  && !matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canInspect) {
  const inspectSelector = [
    ".celestial-card",
    ".phenomenon-card",
    ".term-strip article",
    ".place-feature",
    ".place-card",
    ".remote-place",
    ".character-card",
    ".faction",
    ".house-card"
  ].join(",");

  function resetInspect(card) {
    card.classList.remove("is-inspecting");
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
  }

  document.querySelectorAll(inspectSelector).forEach(card => {
    card.classList.add("inspectable");
    let frame = 0;
    card.addEventListener("pointermove", event => {
      if (event.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const limit = 3.6;
        card.classList.add("is-inspecting");
        card.style.setProperty("--rx", `${((x - 0.5) * 2 * limit).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${((0.5 - y) * 2 * limit).toFixed(2)}deg`);
      });
    });
    card.addEventListener("pointerleave", () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      resetInspect(card);
    });
    card.addEventListener("blur", () => resetInspect(card));
  });

  dialog.addEventListener("close", () => {
    document.querySelectorAll(".is-inspecting").forEach(resetInspect);
  });
}
