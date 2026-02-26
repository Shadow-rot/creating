/* ═══════════════════════════════════════════════════════════
   SHADWO PORTFOLIO — script.js
   Includes: 3D Triangle Background (SCSS → Vanilla JS port),
   Typing animation, Scroll effects, Counters, Roadmap, Theme
   Author: Claude for Shadwo / Shadow-rot
═══════════════════════════════════════════════════════════ */

/* ─── HELPERS ─────────────────────────────────────────── */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ─────────────────────────────────────────────────────────
   1. 3D TRIANGLE BACKGROUND
   Ports the original SCSS @for loop to pure JavaScript.
   Generates 200 colorful triangles that fly from deep z
   toward the viewer in an infinite loop.
───────────────────────────────────────────────────────── */
function initTriangleBackground() {
  const wrap  = $('#tri-wrap');
  if (!wrap) return;

  const TOTAL    = 200;  // number of triangles
  const DURATION = 10;   // seconds per cycle

  // Utility: random int between 1 and max (inclusive)
  const rnd = max => Math.floor(Math.random() * max) + 1;

  for (let i = 1; i <= TOTAL; i++) {
    const size    = rnd(50);           // 1–50px  (matches $size: random(50)*1px)
    const hue     = rnd(360);          // 0–360 hue
    const rotateZ = rnd(360);          // initial Z rotation
    const tx      = rnd(1000);         // translate X (0–1000px) in keyframe
    const ty      = rnd(1000);         // translate Y (0–1000px) in keyframe
    const delay   = i * -(DURATION / TOTAL); // negative delay staggers them

    const div = document.createElement('div');
    div.className = 'tri';

    // Equilateral-ish CSS triangle via border trick
    div.style.cssText = `
      border-top:   ${size}px solid hsl(${hue}, 100%, 55%);
      border-right: ${size}px solid transparent;
      border-left:  ${size}px solid transparent;
      margin-left:  -${size / 2}px;
      margin-top:   -${size / 2}px;
      filter: grayscale(0.5) brightness(0.85);
      animation: triAnim${i} ${DURATION}s ${delay}s infinite linear;
      opacity: 0;
    `;

    // Inject a unique keyframe for this triangle
    // Mirrors: 0% { opacity:1; transform: rotate($r*1.5) translate3d(rx,ry,1000px) scale(1); }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes triAnim${i} {
        0% {
          opacity: 0.9;
          transform: rotate(${rotateZ * 1.5}deg) translate3d(${tx}px, ${ty}px, 1000px) scale(1);
        }
        100% {
          opacity: 0;
          transform: rotate(${rotateZ}deg) translate3d(0, 0, -1500px) scale(0);
        }
      }
    `;
    document.head.appendChild(style);
    wrap.appendChild(div);
  }
}

/* ─────────────────────────────────────────────────────────
   2. SCROLL PROGRESS BAR
───────────────────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(window.scrollY / max) * 100}%`;
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   3. STICKY NAVBAR
───────────────────────────────────────────────────────── */
function initNavbar() {
  const nav = $('#navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   4. MOBILE HAMBURGER
───────────────────────────────────────────────────────── */
function initMobileMenu() {
  const btn   = $('#menu-toggle');
  const menu  = $('#mobile-menu');
  const links = $$('#mobile-menu .nav-link');
  if (!btn || !menu) return;

  function close() {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    links.forEach(l => l.setAttribute('tabindex', '-1'));
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.classList.toggle('open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    links.forEach(l => l.setAttribute('tabindex', isOpen ? '0' : '-1'));
  });

  links.forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (!$('#navbar').contains(e.target)) close();
  });
}

/* ─────────────────────────────────────────────────────────
   5. SMOOTH SCROLL
───────────────────────────────────────────────────────── */
function initSmoothScroll() {
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
  ) || 70;

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth'
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────
   6. TYPING ANIMATION
───────────────────────────────────────────────────────── */
function initTyping() {
  const el = $('#typed-text');
  if (!el) return;

  const phrases = [
    'Automation Artist ⚡',
    'Founder of Siya Bots 💠',
    'Python Bot Developer 🐍',
    'Building the Future 🚀',
    'Code. Automate. Create.',
    'Shadow Dev Team Core Dev',
  ];

  let pi = 0, ci = 0, del = false, pausing = false;
  const TYPE = 70, DEL = 35, PAUSE_END = 1800, PAUSE_START = 450;

  function tick() {
    if (pausing) return;
    const phrase = phrases[pi];
    if (!del) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        pausing = true;
        setTimeout(() => { pausing = false; del = true; tick(); }, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        del = false;
        pi  = (pi + 1) % phrases.length;
        pausing = true;
        setTimeout(() => { pausing = false; tick(); }, PAUSE_START);
        return;
      }
      setTimeout(tick, DEL);
    }
  }
  tick();
}

/* ─────────────────────────────────────────────────────────
   7. FADE-IN ON SCROLL (IntersectionObserver)
───────────────────────────────────────────────────────── */
function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.fade-in').forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────────────────────
   8. SKILL BARS
───────────────────────────────────────────────────────── */
function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => { fill.style.width = `${fill.dataset.width}%`; }, 200);
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  $$('.skill-bar-fill').forEach(b => obs.observe(b));
}

/* ─────────────────────────────────────────────────────────
   9. ANIMATED COUNTERS
───────────────────────────────────────────────────────── */
function initCounters() {
  const DURATION = 1800;
  const ease     = t => 1 - Math.pow(1 - t, 3); // ease-out-cubic

  function animate(el) {
    const target = parseInt(el.dataset.target, 10);
    const start  = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / DURATION, 1);
      el.textContent = Math.round(ease(p) * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    })(start);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $$('.stat-number[data-target]').forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────────────────────
   10. ROADMAP — localStorage persistence
───────────────────────────────────────────────────────── */
function initRoadmap() {
  const KEY  = 'shadwo_roadmap';
  const cbs  = $$('.roadmap-check input[type="checkbox"]');
  const pct  = $('#roadmap-pct');
  const fill = $('#roadmap-progress-fill');
  if (!cbs.length) return;

  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  cbs.forEach(cb => { if (saved[cb.dataset.id]) cb.checked = true; });

  function update() {
    const checked = cbs.filter(c => c.checked).length;
    const p = Math.round((checked / cbs.length) * 100);
    if (pct)  pct.textContent  = `${p}%`;
    if (fill) fill.style.width = `${p}%`;
  }

  update();

  cbs.forEach(cb => cb.addEventListener('change', () => {
    const state = {};
    cbs.forEach(c => { state[c.dataset.id] = c.checked; });
    localStorage.setItem(KEY, JSON.stringify(state));
    update();
  }));
}

/* ─────────────────────────────────────────────────────────
   11. DARK / LIGHT MODE
───────────────────────────────────────────────────────── */
function initTheme() {
  const KEY  = 'shadwo_theme';
  const btn  = $('#theme-toggle');
  const icon = btn?.querySelector('.theme-icon');
  const html = document.documentElement;
  if (!btn) return;

  const ICONS = { dark:'☀', light:'🌙' };

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) icon.textContent = ICONS[theme];
    btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }

  apply(localStorage.getItem(KEY) || 'dark');

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(KEY, next);
  });
}

/* ─────────────────────────────────────────────────────────
   12. BACK TO TOP
───────────────────────────────────────────────────────── */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ─────────────────────────────────────────────────────────
   13. ACTIVE NAV HIGHLIGHT ON SCROLL
───────────────────────────────────────────────────────── */
function initActiveNav() {
  const sections = $$('section[id]');
  const links    = $$('.nav-link');
  if (!sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle(
          'active', l.getAttribute('href') === `#${entry.target.id}`
        ));
      }
    });
  }, { rootMargin:'-40% 0px -40% 0px', threshold:0 });

  sections.forEach(s => obs.observe(s));
}

/* ─────────────────────────────────────────────────────────
   14. PROJECT CARD TILT EFFECT
───────────────────────────────────────────────────────── */
function initCardTilt() {
  $$('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
      card.style.transform =
        `translateY(-8px) scale(1.01) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ─────────────────────────────────────────────────────────
   INIT — Run everything on DOMContentLoaded
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Theme first to avoid flash
  initTheme();

  // Background (can take a moment to inject 200 keyframes)
  initTriangleBackground();

  // UI
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initTyping();
  initFadeIn();
  initSkillBars();
  initCounters();
  initRoadmap();
  initBackToTop();
  initActiveNav();
  initCardTilt();

  // Dev console watermark
  console.log(
    '%c💠 Shadwo%c Portfolio v2.0 — shadow-rot.github.io ',
    'background:#00f5ff;color:#000;font-weight:900;padding:5px 10px;border-radius:4px 0 0 4px;font-family:monospace;',
    'background:#0a141e;color:#00f5ff;padding:5px 10px;border-radius:0 4px 4px 0;font-family:monospace;'
  );
});

/* ─────────────────────────────────────────────────────────
   ACCESSIBILITY — Reduced Motion
───────────────────────────────────────────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    // Hide triangle background entirely
    const bg = $('#tri-bg');
    if (bg) bg.style.display = 'none';

    // Instantly show animated elements
    $$('.fade-in, .reveal-up').forEach(el => {
      el.style.opacity    = '1';
      el.style.transform  = 'none';
      el.style.animation  = 'none';
      el.style.transition = 'none';
    });
  });
}
