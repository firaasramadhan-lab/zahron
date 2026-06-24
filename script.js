// ===================================================================
// PT. FIRZA JAYA TEKNIK — script.js
// ===================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Tahun otomatis di footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu navigasi mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tutup menu saat salah satu link diklik (khusus mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header: bayangan saat discroll ---------- */
  var header = document.getElementById('siteHeader');
  function handleHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.45)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', handleHeaderShadow, { passive: true });
  handleHeaderShadow();

  /* ---------- Counter animasi pada bagian statistik ---------- */
  var statNumbers = document.querySelectorAll('.stat-num');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1200; // ms
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(function (el) { statObserver.observe(el); });
  } else {
    // Fallback browser lama: tampilkan angka langsung
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute('data-count');
    });
  }

  /* ---------- Filter Portofolio ---------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      portfolioCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
    });
  });

});
