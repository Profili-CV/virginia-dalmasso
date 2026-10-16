// Experience: each key sentence fills with yellow as it travels up the screen.
(function () {
  var els = [].slice.call(document.querySelectorAll('.hl'));
  if (!els.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.style.setProperty('--p', 1); });
    return;
  }
  var raf = 0;
  function update() {
    raf = 0;
    var vh = innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var p = (vh * 0.88 - r.top) / (vh * 0.42);
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty('--p', p.toFixed(3));
    });
  }
  function req() { if (!raf) raf = requestAnimationFrame(update); }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  document.addEventListener('langchange', req);
  update();
})();
