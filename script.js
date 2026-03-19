// ─── Mark JS as loaded so reveal animations activate ───
document.body.classList.add('js-loaded');

// ─── NAV: scroll class + active links ───
const nav = document.getElementById('main-nav');
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => revealObserver.observe(el));

// Run once on load for above-fold elements
function checkReveals() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) el.classList.add('visible');
  });
}
window.addEventListener('load', checkReveals);
checkReveals();

// ─── FORM SUBMIT (Netlify) ───
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'none';
      form.style.display = 'flex';
      form.reset();
    }, 6000);
  })
  .catch(() => {
    // Fallback if not on Netlify (e.g. local preview)
    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'none';
      form.style.display = 'flex';
      form.reset();
    }, 6000);
  });
}
