(function(){
  const THEME_KEY = 'pref-theme';
  const root = document.documentElement;

  function getSystemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
    const thumb = document.querySelector('.theme-toggle .thumb');
    if (thumb) thumb.setAttribute('aria-label', `Theme thumb: ${theme}`);
  }

  // Initialize theme
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (_) {}
  applyTheme(saved || getSystemPref());

  // Toggle handler
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('tabindex', '0');
    const setPressed = () => toggle.setAttribute('aria-checked', (root.getAttribute('data-theme') === 'light').toString());
    setPressed();
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next); setPressed();
    });
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
    });
  }

  // Mobile menu
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav.primary-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }

  // Active nav link based on pathname
  const current = location.pathname.split('/').pop() || 'PortfolioWebsite.html';
  document.querySelectorAll('nav.primary-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((current === 'PortfolioWebsite.html' && href === 'PortfolioWebsite.html') || href === current) {
      a.classList.add('active');
    }
  });
})();

