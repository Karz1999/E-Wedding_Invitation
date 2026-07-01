const weddingConfig = {
  title: "Aarav & Meera",
  date: "2026-12-18T18:00:00",
  venue: "The Royal Garden Hall, Bengaluru",
  mapsUrl: "https://www.google.com/maps",
  phone: "+91 98765 43210",
  whatsapp: "https://wa.me/919876543210",
  music: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAI2AAABAA=",
  theme: "luxury",
  gallery: [
    "assets/images/royal-hero.svg",
    "assets/images/temple-hero.svg",
    "assets/images/royal-hero.svg",
    "assets/images/temple-hero.svg",
    "assets/images/royal-hero.svg",
    "assets/images/temple-hero.svg"
  ],
  events: [
    { title: "Haldi", date: "18 Dec • 09:00", place: "Garden Courtyard" },
    { title: "Mehendi", date: "19 Dec • 14:00", place: "Poolside Pavilion" },
    { title: "Sangeet", date: "20 Dec • 19:00", place: "Grand Ballroom" },
    { title: "Reception", date: "21 Dec • 20:00", place: "Riverside Banquet" }
  ],
  timeline: [
    { year: "2018", title: "First meeting", text: "A chance encounter at a rooftop concert that changed everything." },
    { year: "2020", title: "The proposal", text: "Under lanterns and starlight, a promise was made." },
    { year: "2026", title: "Wedding day", text: "A celebration of love, family, and timeless joy." }
  ]
};

const state = {
  countdownTimer: null,
  audio: null,
  muted: false
};

function initSharedExperience() {
  createScrollProgress();
  createRevealEffects();
  initThemeToggle();
  initLoader();
  initCountdown();
  initMusicPlayer();
  initScrollToTop();
  initFormSubmission();
  initAnimatedCursor();
}

function createScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.prepend(bar);
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const progress = height > 0 ? scrollTop / height : 0;
    bar.style.transform = `scaleX(${progress})`;
  });
}

function createRevealEffects() {
  document.querySelectorAll(".reveal, .reveal-left, .reveal-zoom").forEach((el, index) => {
    setTimeout(() => el.classList.add("is-visible"), index * 120);
  });
}

function initThemeToggle() {
  const toggleButton = document.querySelector(".theme-toggle");
  if (!toggleButton) return;
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
  });
}

function initLoader() {
  const loader = document.querySelector(".loader");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-hidden"), 600);
  });
}

function initCountdown() {
  const nodes = document.querySelectorAll("[data-countdown]");
  if (!nodes.length) return;
  const targetDate = new Date(weddingConfig.date).getTime();
  const update = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) {
      nodes.forEach((node) => { node.textContent = "00"; });
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    nodes[0].textContent = String(days).padStart(2, "0");
    nodes[1].textContent = String(hours).padStart(2, "0");
    nodes[2].textContent = String(minutes).padStart(2, "0");
    nodes[3].textContent = String(seconds).padStart(2, "0");
  };
  update();
  state.countdownTimer = window.setInterval(update, 1000);
}

function initMusicPlayer() {
  const button = document.querySelector(".floating-player");
  if (!button) return;
  const audio = new Audio(weddingConfig.music);
  audio.loop = true;
  audio.preload = "auto";
  state.audio = audio;
  const toggle = () => {
    if (!state.muted) {
      audio.play().catch(() => {});
      button.textContent = "♫";
      state.muted = true;
    } else {
      audio.pause();
      button.textContent = "♩";
      state.muted = false;
    }
  };
  button.addEventListener("click", toggle);
  document.addEventListener("click", () => {
    if (!state.muted) {
      audio.play().catch(() => {});
      button.textContent = "♫";
      state.muted = true;
    }
  }, { once: true });
}

function initScrollToTop() {
  const button = document.querySelector(".scroll-to-top");
  if (!button) return;
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    button.classList.toggle("is-visible", window.scrollY > 600);
  });
}

function initFormSubmission() {
  const form = document.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("input[name='name']").value.trim();
    if (!name) {
      alert("Please share your name to confirm your presence.");
      return;
    }
    form.reset();
    createConfetti();
    alert(`Thank you, ${name}! We look forward to celebrating with you.`);
  });
}

function createConfetti() {
  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9998";
  document.body.appendChild(container);
  for (let index = 0; index < 80; index += 1) {
    const piece = document.createElement("span");
    piece.style.position = "absolute";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = "-12px";
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${10 + Math.random() * 8}px`;
    piece.style.background = ["#d4af37", "#ff8ab3", "#7a4d47", "#fff"][Math.floor(Math.random() * 4)];
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
    piece.animate([
      { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate3d(${(Math.random() - 0.5) * 220}px, 110vh, 0) rotate(720deg)`, opacity: 0 }
    ], {
      duration: 1800 + Math.random() * 900,
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      fill: "forwards"
    });
  }
  setTimeout(() => container.remove(), 2800);
}

function initAnimatedCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const cursor = document.createElement("div");
  cursor.className = "animated-cursor";
  Object.assign(cursor.style, {
    position: "fixed",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "rgba(212, 175, 55, 0.8)",
    pointerEvents: "none",
    zIndex: "9999",
    transform: "translate(-50%, -50%)",
    mixBlendMode: "difference"
  });
  document.body.appendChild(cursor);
  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSharedExperience);
} else {
  initSharedExperience();
}
