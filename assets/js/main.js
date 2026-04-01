/* ══════════════════════════════════
   PAGE LOADER
══════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    l.classList.add('done');
    setTimeout(() => l.remove(), 600);
  }, 600);
});

/* ══════════════════════════════════
   PARTICLES
══════════════════════════════════ */
(function () {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.5 + 0.15
    };
  }

  for (let i = 0; i < 70; i++) particles.push(makeParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const color = isDark() ? '255,255,255' : '30,50,120';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${p.o})`;
      ctx.fill();

      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    // Draw faint lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color},${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════
   TYPING EFFECT
══════════════════════════════════ */
(function () {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const phrases = ['PHP | Laravel Developer', 'Full Stack Developer', 'Vue.js Enthusiast', 'AI Integration Expert'];
  let pi = 0, ci = 0, deleting = false;
  el.style.cssText = 'font-size:.92rem;color:var(--a1);font-family:"DM Mono",monospace;font-weight:500;letter-spacing:.03em;display:inline-block;min-height:1.4em';

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 85);
  }
  // add cursor via CSS class
  el.classList.add('typed-text');
  setTimeout(type, 1800);
})();

/* ══════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════ */
function animateCounter(el, target, duration = 1200) {
  let start = 0, startTime = null;
  const suffix = el.querySelector('sup') ? el.querySelector('sup').outerHTML : '';
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.innerHTML = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════
   THEME
══════════════════════════════════ */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const d = t === 'dark';
  const ic = d ? '☀' : '🌙', lb = d ? 'Light Mode' : 'Dark Mode';
  ['ti', 'tmob'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ic; });
  const tl = document.getElementById('tl'); if (tl) tl.textContent = lb;

  // Switch LinkedIn badge
  const light = document.getElementById('li-badge-light');
  const dark = document.getElementById('li-badge-dark');
  if (light) light.style.display = d ? 'none' : 'block';
  if (dark) dark.style.display = d ? 'block' : 'none';
}
function toggleTheme() {
  const nxt = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nxt); localStorage.setItem('ng-theme', nxt);
}
(function () { applyTheme(localStorage.getItem('ng-theme') || 'dark'); })();

/* ══════════════════════════════════
   MOBILE DRAWER
══════════════════════════════════ */
function toggleDrawer() {
  const d = document.getElementById('mob-drawer'), b = document.getElementById('burger'), s = document.getElementById('sidebar');
  const o = d.classList.toggle('open');
  b.classList.toggle('open', o); s.classList.toggle('open', o);
}
function closeDrawer() {
  document.getElementById('mob-drawer').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
  document.getElementById('sidebar').classList.remove('open');
}
document.querySelectorAll('#sidebar a, #mob-drawer a').forEach(link => {
  link.addEventListener('click', () => {
    closeDrawer();
  });
});
/* ══════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════ */
const stt = document.getElementById('stt');
window.addEventListener('scroll', () => stt.classList.toggle('show', window.scrollY > 300));

/* ══════════════════════════════════
   ACTIVE NAV
══════════════════════════════════ */
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('#nav-list a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      nls.forEach(l => l.classList.remove('active'));
      const m = document.querySelector(`#nav-list a[href="#${e.target.id}"]`);
      if (m) m.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
secs.forEach(s => navObs.observe(s));

/* ══════════════════════════════════
   SCROLL REVEAL (fade-up + sec-bar + counters + stagger)
══════════════════════════════════ */
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 60);
      fadeObs.unobserve(e.target);
      if (e.target.classList.contains('stagger-children')) {
        e.target.classList.add('vis');
      }
      e.target.querySelectorAll('.st-n[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up, .stagger-children').forEach(el => fadeObs.observe(el));

// Fix: hero stats are visible on load, observer never fires — run counters directly after loader
setTimeout(() => {
  document.querySelectorAll('.st-n[data-count]').forEach(el => {
    animateCounter(el, parseInt(el.dataset.count));
  });
}, 1800); // wait for loader + hero animations to settle

// sec-bar animate
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); barObs.unobserve(e.target); }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sec-bar').forEach(b => barObs.observe(b));
