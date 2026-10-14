// A black cat scratches its way from the name to the photo while you scroll past the header.
(function () {
  var run = document.querySelector('.cat-run');
  var hero = document.querySelector('.hero');
  if (!run || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { run.remove(); return; }
  var cat = run.querySelector('.cat');
  var marksBox = run.querySelector('.cat-marks');
  var name = hero.querySelector('h1');
  var photo = hero.querySelector('.hero-photo');
  var N = 9, marks = [];
  var svg = '<svg viewBox="0 0 40 46" aria-hidden="true"><path d="M6 2 C10 16 10 30 4 44 M18 0 C22 16 22 30 16 46 M30 2 C34 16 34 30 28 44"/></svg>';
  for (var k = 0; k < N; k++) {
    var m = document.createElement('span'); m.className = 'cat-mark'; m.innerHTML = svg;
    marksBox.appendChild(m); marks.push(m);
  }
  var geo = null;
  function measure() {
    var h = hero.getBoundingClientRect(), n = name.getBoundingClientRect(), ph = photo.getBoundingClientRect();
    var w = cat.offsetWidth || 180;
    geo = {
      x0: n.left - h.left - w * 0.15,
      x1: ph.right - h.left - w * 0.85,
      y0: n.top - h.top + n.height * 0.35,
      y1: ph.top - h.top + ph.height * 0.45,
      w: w, hh: h.height
    };
    geo.span = h.height * 0.6;
    marks.forEach(function (m, k) {
      var t = (k + 1) / (N + 1);
      var x = geo.x0 + (geo.x1 - geo.x0) * t + geo.w * 0.05;
      var y = geo.y0 + (geo.y1 - geo.y0) * t + Math.sin(t * 9) * 16 + t * geo.span * 0.55 + geo.w * 0.18;
      m.style.left = x + 'px'; m.style.top = y + 'px';
      m.style.transform = 'rotate(' + (-70 + Math.sin(k * 2.1) * 12) + 'deg)';
      m.dataset.t = t;
    });
  }
  function update() {
    if (!geo) measure();
    var r = hero.getBoundingClientRect();
    var p = Math.max(0, Math.min(1, -r.top / geo.span));
    var x = geo.x0 + (geo.x1 - geo.x0) * p;
    var y = geo.y0 + (geo.y1 - geo.y0) * p + Math.sin(p * 9) * 16 + p * geo.span * 0.55;
    var tilt = Math.cos(p * 9) * 10;
    run.classList.toggle('is-on', p > 0.005 && p < 0.999);
    cat.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) rotate(' + tilt + 'deg)';
    marks.forEach(function (m) { m.classList.toggle('on', p > +m.dataset.t + 0.04); });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', function () { geo = null; update(); });
  window.addEventListener('load', function () { geo = null; update(); });
  update();
})();
