/* ═══════════════════════════════════════════════════════
   SHOLD GAMING — PORTFOLIO JAVASCRIPT
   Pure Vanilla JS, no frameworks
   Author: Claude for Shold Gaming
═══════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────
   DOM HELPERS
─────────────────────────────────────────────────────── */
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ───────────────────────────────────────────────────────
   1. SCROLL PROGRESS BAR
─────────────────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / max) * 100}%`;
  }, { passive: true });
}

/* ───────────────────────────────────────────────────────
   2. STICKY NAV — add .scrolled class on scroll
─────────────────────────────────────────────────────── */
function initNavbar() {
  const nav = $('#navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ───────────────────────────────────────────────────────
   3. MOBILE HAMBURGER MENU
─────────────────────────────────────────────────────── */
function initMobileMenu() {
  const btn   = $('#menu-toggle');
  const menu  = $('#mobile-menu');
  const links = $$('#mobile-menu .nav-link');
  if (!btn || !menu) return;

  function closeMenu() {
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

  // Close on link click
  links.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!$('#navbar').contains(e.target)) closeMenu();
  });
}

/* ───────────────────────────────────────────────────────
   4. SMOOTH SCROLL — all anchor links
─────────────────────────────────────────────────────── */
function initSmoothScroll() {
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
  ) || 70;

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ───────────────────────────────────────────────────────
   5. TYPING ANIMATION
─────────────────────────────────────────────────────── */
function initTyping() {
  const el = $('#typed-text');
  if (!el) return;

  const phrases = [
    'Telegram Bot Developer',
    'Go & Python Enthusiast',
    'Web Learner 🌐',
    'Open Source Builder',
    'Automation Geek 🤖',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pausing   = false;

  const PAUSE_END   = 1800; // ms pause after full phrase
  const PAUSE_START = 500;  // ms pause before typing next
  const TYPE_SPEED  = 70;
  const DEL_SPEED   = 35;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (pausing) return; // setTimeout will call resume

    if (!deleting) {
      // Typing
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        // Pause at end
        pausing = true;
        setTimeout(() => { pausing = false; deleting = true; tick(); }, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // Deleting
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        // Pause before next
        pausing = true;
        setTimeout(() => { pausing = false; tick(); }, PAUSE_START);
        return;
      }
      setTimeout(tick, DEL_SPEED);
    }
  }

  tick();
}

/* ───────────────────────────────────────────────────────
   6. FADE-IN ON SCROLL (IntersectionObserver)
─────────────────────────────────────────────────────── */
function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.fade-in').forEach(el => observer.observe(el));
}

/* ───────────────────────────────────────────────────────
   7. SKILL BARS ANIMATION
─────────────────────────────────────────────────────── */
function initSkillBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute('data-width');
          // Small delay for visual delight
          setTimeout(() => {
            fill.style.width = `${targetWidth}%`;
          }, 200);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  $$('.skill-bar-fill').forEach(bar => observer.observe(bar));
}

/* ───────────────────────────────────────────────────────
   8. ANIMATED COUNTERS
─────────────────────────────────────────────────────── */
function initCounters() {
  const DURATION = 1800; // ms
  const EASE = (t) => 1 - Math.pow(1 - t, 3); // ease-out-cubic

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const start  = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased    = EASE(progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target; // ensure exact final value
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  $$('.stat-number[data-target]').forEach(el => observer.observe(el));
}

/* ───────────────────────────────────────────────────────
   9. ROADMAP — localStorage persistence
─────────────────────────────────────────────────────── */
function initRoadmap() {
  const STORAGE_KEY = 'sg_roadmap_progress';
  const checkboxes  = $$('.roadmap-check input[type="checkbox"]');
  const pctLabel    = $('#roadmap-pct');
  const progressBar = $('#roadmap-progress-fill');

  if (!checkboxes.length) return;

  // Load saved state
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  checkboxes.forEach(cb => {
    const id = cb.getAttribute('data-id');
    if (saved[id]) cb.checked = true;
  });

  // Update overall progress display
  function updateProgress() {
    const total   = checkboxes.length;
    const checked = checkboxes.filter(cb => cb.checked).length;
    const pct     = Math.round((checked / total) * 100);

    if (pctLabel) pctLabel.textContent = `${pct}%`;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }

  updateProgress();

  // Save on change
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const state = {};
      checkboxes.forEach(c => { state[c.getAttribute('data-id')] = c.checked; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateProgress();
    });
  });
}

/* ───────────────────────────────────────────────────────
   10. DARK / LIGHT MODE TOGGLE
─────────────────────────────────────────────────────── */
function initThemeToggle() {
  const STORAGE_KEY = 'sg_theme';
  const btn  = $('#theme-toggle');
  const icon = btn?.querySelector('.theme-icon');
  const html = document.documentElement;

  if (!btn) return;

  // Icons for each mode
  const ICONS = { dark: '☀', light: '🌙' };

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) icon.textContent = ICONS[theme];
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Load saved or default
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(savedTheme);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* ───────────────────────────────────────────────────────
   11. BACK-TO-TOP BUTTON
─────────────────────────────────────────────────────── */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ───────────────────────────────────────────────────────
   12. ACTIVE NAV LINK ON SCROLL
─────────────────────────────────────────────────────── */
function initActiveNavLink() {
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ───────────────────────────────────────────────────────
   13. PROJECT CARD TILT EFFECT (subtle)
─────────────────────────────────────────────────────── */
function initCardTilt() {
  $$('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rx     =  dy * -6; // rotate around X axis
      const ry     =  dx *  6; // rotate around Y axis
      card.style.transform = `translateY(-8px) scale(1.01) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ───────────────────────────────────────────────────────
   INIT — run everything when DOM is ready
─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();       // Theme must go first (avoids flash)
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
  initActiveNavLink();
  initCardTilt();

  console.log(
    '%c🚀 Shold Gaming Portfolio %c v1.0',
    'background:#38bdf8;color:#0f172a;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px;',
    'background:#1e293b;color:#38bdf8;padding:4px 8px;border-radius:0 4px 4px 0;'
  );
});

/* ───────────────────────────────────────────────────────
   HANDLE REDUCED MOTION (accessibility)
─────────────────────────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Make all fade-in elements immediately visible
  document.addEventListener('DOMContentLoaded', () => {
    $$('.fade-in, .reveal-up').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  });
}