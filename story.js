// "Il mio percorso": while you scroll down, the timeline slides to the right.
(function () {
  var sec = document.querySelector('.hz');
  if (!sec) return;
  var track = sec.querySelector('.hz-track'), vp = sec.querySelector('.hz-viewport');
  var fill = sec.querySelector('.hz-fill'), pts = sec.querySelectorAll('.hz-pt');
  var mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
  var dist = 0;
  function layout() {
    if (!mq.matches) { sec.classList.remove('is-pinned'); sec.style.height = ''; track.style.transform = ''; pts.forEach(function (p) { p.classList.add('on'); }); fill.style.width = '100%'; return; }
    sec.classList.add('is-pinned');
    dist = Math.max(0, track.scrollWidth - vp.clientWidth);
    sec.style.height = (window.innerHeight + dist) + 'px';
    update();
  }
  function update() {
    if (!mq.matches) return;
    var r = sec.getBoundingClientRect();
    var p = Math.max(0, Math.min(1, -r.top / Math.max(1, dist)));
    track.style.transform = 'translate3d(' + (-p * dist) + 'px,0,0)';
    fill.style.width = (p * 100) + '%';
    var edge = vp.getBoundingClientRect().left + vp.clientWidth * 0.78;
    pts.forEach(function (pt) { pt.classList.toggle('on', pt.getBoundingClientRect().left < edge); });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  mq.addEventListener && mq.addEventListener('change', layout);
  layout();
})();
