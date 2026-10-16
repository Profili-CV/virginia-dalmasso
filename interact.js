// Small interactions: logos open on a click anywhere in their tile; on touch screens the Momento
// skull lights up when the image is centred (there is no hover on a phone).
(function () {
  document.querySelectorAll('.logos-mini .lm').forEach(function (lm) {
    lm.addEventListener('click', function (e) {
      var img = lm.querySelector('img');
      if (img && e.target !== img) img.click();
    });
  });
  var mo = document.querySelector('.mo-media');
  if (mo && !matchMedia('(hover: hover) and (pointer: fine)').matches && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { mo.classList.toggle('mo-on', e.intersectionRatio > 0.75); });
    }, { threshold: [0, 0.75, 1] }).observe(mo);
  }
})();
