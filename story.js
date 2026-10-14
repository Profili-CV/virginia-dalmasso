// "Il mio percorso": a vertical path; each point lights up as it enters the screen,
// and the purple line fills as you scroll down.
(function () {
  var sec = document.querySelector('.vt');
  if (!sec) return;
  var pts = sec.querySelectorAll('.hz-pt'), fill = sec.querySelector('.hz-fill'), track = sec.querySelector('.hz-track');
  if (!('IntersectionObserver' in window)) { pts.forEach(function (p) { p.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { rootMargin: '0px 0px -25% 0px' });
  pts.forEach(function (p) { io.observe(p); });
  function update() {
    var r = track.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / r.height));
    fill.style.height = (p * 100) + '%';
  }
  var t = false;
  window.addEventListener('scroll', function () { if (t) return; t = true; requestAnimationFrame(function () { update(); t = false; }); }, { passive: true });
  window.addEventListener('resize', update); update();
})();
