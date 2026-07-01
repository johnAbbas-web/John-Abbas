/* ─────────────────────────────────────────────────────────
   main.js  —  John Abbas Portfolio (Light Mode Only)
   ───────────────────────────────────────────────────────── */

const qs  = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => [...r.querySelectorAll(s)];

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile       = () => matchMedia("(max-width: 720px)").matches;
const hasGsap        = () => typeof gsap !== "undefined";

/* ── PAGE LOADER ───────────────────────────────────────── */
function initPageLoader() {
  const loader = qs(".page-loader");
  if (!loader) return;

  const hide = () => loader.classList.add("is-hidden");

  if (prefersReduced) { hide(); return; }

  window.addEventListener("load", () => setTimeout(hide, 500));
  setTimeout(hide, 2400);
}

/* ── FLOATING PARTICLES ────────────────────────────────── */
function initParticles() {
  if (prefersReduced) return;

  const container = qs("#particles");
  if (!container) return;

  const colors = [
    "rgba(37,99,235,0.25)",
    "rgba(124,58,237,0.20)",
    "rgba(96,165,250,0.22)",
    "rgba(37,99,235,0.15)",
    "rgba(167,139,250,0.18)",
  ];

  const count = isMobile() ? 14 : 26;

  for (let i = 0; i < count; i++) {
    const p   = document.createElement("div");
    p.className = "particle";

    const size  = Math.random() * 10 + 4;          // 4–14 px
    const left  = Math.random() * 100;              // 0–100%
    const delay = Math.random() * 12;               // 0–12s
    const dur   = Math.random() * 14 + 10;          // 10–24s
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(p.style, {
      width:                   `${size}px`,
      height:                  `${size}px`,
      left:                    `${left}%`,
      background:               color,
      animationDuration:       `${dur}s`,
      animationDelay:          `${delay}s`,
      filter:                  `blur(${size > 10 ? 2 : 1}px)`,
    });

    container.appendChild(p);
  }
}

/* ── MOBILE NAV ────────────────────────────────────────── */
function initMobileNav() {
  const toggle = qs(".nav-toggle");
  const nav    = qs(".nav");
  if (!toggle || !nav) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  });

  qsa(".nav a").forEach((link) => link.addEventListener("click", close));
  addEventListener("resize", () => { if (innerWidth > 720) close(); });
}

/* ── SCROLL EFFECTS ────────────────────────────────────── */
function initScrollEffects() {
  const progress  = qs(".scroll-progress");
  const topButton = qs(".back-to-top");
  const header    = qs(".site-header");
  let lastY = scrollY;

  const update = () => {
    const max     = document.documentElement.scrollHeight - innerHeight;
    const percent = max > 0 ? (scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;

    topButton?.classList.toggle("is-visible",  scrollY > 500);
    header?.classList.toggle("is-scrolled",    scrollY > 24);

    if (!prefersReduced && header && scrollY > 120 && !isMobile()) {
      const down = scrollY > lastY + 6;
      const up   = scrollY < lastY - 6;
      if (down) header.classList.add("is-hidden");
      if (up)   header.classList.remove("is-hidden");
    } else {
      header?.classList.remove("is-hidden");
    }

    lastY = scrollY;
  };

  addEventListener("scroll", update, { passive: true });
  update();
  topButton?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

/* ── ACTIVE NAV LINKS ──────────────────────────────────── */
function initNavActive() {
  const links    = qsa(".nav a");
  const sections = links
    .map((link) => qs(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ── GSAP EXTRAS (micro-interactions only) ─────────────── */
function initGsapAnimations() {
  if (!hasGsap() || prefersReduced) return;
  if (typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  /* Floating project screenshots */
  if (!isMobile()) {
    qsa(".shot-frame--floating").forEach((frame) => {
      gsap.to(frame, { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
  }

  /* Stat counter animation (GSAP-powered number tick) */
  qsa(".stat-card strong").forEach((el) => {
    const raw = el.textContent.trim();
    const num = parseFloat(raw);
    if (isNaN(num)) return;

    const suffix = raw.replace(String(num), "");
    el.textContent = "0" + suffix;

    ScrollTrigger.create({
      trigger: el,
      start: "top 95%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: num,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = (num % 1 === 0
              ? Math.round(this.targets()[0].val)
              : this.targets()[0].val.toFixed(1)) + suffix;
          },
        });
      },
    });
  });
}

/* ── SCROLL REVEALS (IntersectionObserver — always works) ─ */
function initRevealsFallback() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  // Observe both .reveal and .stagger-group elements
  qsa(".reveal, .stagger-group").forEach((el) => observer.observe(el));
}

/* ── MAGNETIC BUTTONS ──────────────────────────────────── */
function initMagneticButtons() {
  if (prefersReduced || isMobile()) return;

  qsa(".magnetic").forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x    = (e.clientX - rect.left - rect.width  / 2) * 0.22;
      const y    = (e.clientY - rect.top  - rect.height / 2) * 0.22;
      hasGsap()
        ? gsap.to(item, { x, y, duration: 0.35, ease: "power2.out" })
        : (item.style.transform = `translate(${x}px, ${y}px)`);
    });

    item.addEventListener("mouseleave", () => {
      hasGsap()
        ? gsap.to(item, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" })
        : (item.style.transform = "");
    });
  });
}

/* ── TILT CARDS ────────────────────────────────────────── */
function initTiltCards() {
  if (prefersReduced || isMobile()) return;

  qsa(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;

      hasGsap()
        ? gsap.to(card, {
            rotateX: -y * 6, rotateY: x * 8, y: -4,
            duration: 0.4, ease: "power2.out", transformPerspective: 900,
          })
        : (card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-4px)`);
    });

    card.addEventListener("mouseleave", () => {
      hasGsap()
        ? gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.55, ease: "power2.out" })
        : (card.style.transform = "");
    });
  });
}

/* ── CONTACT FORM ──────────────────────────────────────── */
function initContactForm() {
  const form = qs(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button  = qs("button[type='submit']", form);
    const oldText = button.textContent;

    button.textContent = "Thanks — I'll be in touch ✓";
    button.disabled    = true;

    if (hasGsap() && !prefersReduced) {
      gsap.fromTo(button, { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1 });
    }

    setTimeout(() => {
      button.textContent = oldText;
      button.disabled    = false;
      form.reset();
    }, 2500);
  });
}

/* ── INIT ALL ──────────────────────────────────────────── */
initPageLoader();
initParticles();
initMobileNav();
initScrollEffects();
initNavActive();
initGsapAnimations();
initRevealsFallback();
initMagneticButtons();
initTiltCards();
initContactForm();
initTypewriter();
initLiveCounter();

/* ── TYPEWRITER CYCLING ROLE ───────────────────────────── */
function initTypewriter() {
  const el = qs('#typewriter-text');
  if (!el || prefersReduced) return;

  const phrases = [
    'Full Stack Applications',
    'Angular & React UIs',
    'Oracle DB Systems',
    'FinTech Dashboards',
    'Real-Time Analytics',
    'Scalable APIs',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  const SPEED_TYPE = 70;
  const SPEED_DEL  = 38;
  const PAUSE_END  = 1800;
  const PAUSE_START = 350;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting     = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
    }

    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }

  setTimeout(tick, 900);
}

/* ── LIVE TRANSACTION COUNTER ──────────────────────────── */
function initLiveCounter() {
  const el = qs('#live-tx-count');
  if (!el) return;

  function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatNum(n) {
    return n.toLocaleString();
  }

  function pulse() {
    const newVal = randBetween(980, 1480);
    el.textContent = formatNum(newVal);

    // animate chart bars with fresh random heights
    qsa('.live-chart-bar').forEach(bar => {
      const h = randBetween(25, 95);
      bar.style.height = `${h}%`;
    });

    setTimeout(pulse, randBetween(1200, 2200));
  }

  setTimeout(pulse, 1500);
}
