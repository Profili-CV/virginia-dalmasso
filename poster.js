// Punk poster: closed → open → back, by clicking the poster or the buttons.
(function () {
  var stage = document.querySelector('.pp-stage');
  if (!stage) return;
  var btns = document.querySelectorAll('[data-pp]');
  var order = ['closed', 'open', 'back'];
  function set(s) {
    stage.setAttribute('data-state', s);
    btns.forEach(function (b) { var on = b.getAttribute('data-pp') === s; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-pp')); }); });
  stage.addEventListener('click', function () {
    var i = order.indexOf(stage.getAttribute('data-state'));
    set(order[(i + 1) % order.length]);
  });
  set('closed');
  // open it by itself once it is on screen
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { io.disconnect(); setTimeout(function () { if (stage.getAttribute('data-state') === 'closed') set('open'); }, 1200); }
    }, { threshold: 0.6 });
    io.observe(stage);
  }
})();
