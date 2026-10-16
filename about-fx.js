// About page: service cards lean toward the pointer and open on tap; numbers count up in view.
(function () {
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.svc').forEach(function (li) {
    if (fine && !reduce) {
      li.addEventListener('pointermove', function (e) {
        var r = li.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        li.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        li.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
      });
      li.addEventListener('pointerleave', function () { li.style.setProperty('--rx', '0deg'); li.style.setProperty('--ry', '0deg'); });
    }
    li.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      var open = !li.classList.contains('open');
      document.querySelectorAll('.svc.open').forEach(function (o) { o.classList.remove('open'); });
      li.classList.toggle('open', open);
    });
    li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); } });
  });

  var nums = [].slice.call(document.querySelectorAll('.nums .num'));
  if (!nums.length) return;
  function paint(el, k) {
    el.querySelector('.num-n').textContent = k;
    el.querySelectorAll('.num-viz i').forEach(function (i, n) { i.classList.toggle('lit', n < k); });
  }
  function run(el) {
    if (el._t) clearInterval(el._t);
    var to = +el.getAttribute('data-to'), k = 0;
    el.classList.remove('done');
    if (reduce) { paint(el, to); el.classList.add('done'); return; }
    paint(el, 0);
    el._t = setInterval(function () {
      k++; paint(el, k);
      if (k >= to) { clearInterval(el._t); el.classList.add('done'); }
    }, Math.max(140, 520 / to));
  }
  nums.forEach(function (el) { paint(el, +el.getAttribute('data-to')); el.classList.add('done'); });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); run(e.target); } });
  }, { threshold: 0.6 });
  nums.forEach(function (el) {
    io.observe(el);
    if (fine) el.addEventListener('pointerenter', function () { run(el); });
    else el.addEventListener('click', function () { run(el); });
  });
})();
