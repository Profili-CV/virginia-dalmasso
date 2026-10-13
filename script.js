(function () {
  var root = document.documentElement;
  var lang = 'it';

  // Italian is the page's own markup, English lives in data-en
  var textNodes = document.querySelectorAll('[data-en]');
  textNodes.forEach(function (el) { el.dataset.it = el.innerHTML; });
  var altNodes = document.querySelectorAll('[data-en-alt]');
  altNodes.forEach(function (el) { el.dataset.itAlt = el.getAttribute('alt'); });
  var labelNodes = document.querySelectorAll('[data-en-label]');
  labelNodes.forEach(function (el) { el.dataset.itLabel = el.getAttribute('aria-label'); });

  var btn = document.getElementById('lang');

  function setLang(next) {
    lang = next;
    root.lang = next;
    textNodes.forEach(function (el) {
      if (next === 'en') el.textContent = el.dataset.en;
      else el.innerHTML = el.dataset.it;
    });
    altNodes.forEach(function (el) { el.setAttribute('alt', next === 'en' ? el.dataset.enAlt : el.dataset.itAlt); });
    labelNodes.forEach(function (el) { el.setAttribute('aria-label', next === 'en' ? el.dataset.enLabel : el.dataset.itLabel); });
    btn.textContent = next === 'en' ? 'IT' : 'EN';
    btn.setAttribute('aria-label', next === 'en' ? 'Passa all\'italiano' : 'Switch to English');
    try { localStorage.setItem('lang', next); } catch (e) {}
  }

  btn.addEventListener('click', function () { setLang(lang === 'it' ? 'en' : 'it'); });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (saved === 'en') setLang('en');
})();

// Video teaser in a modal dialog
(function () {
  var modal = document.getElementById('video-modal');
  var video = document.getElementById('fluid-video');
  var open = document.querySelector('[data-video-open]');
  var close = document.querySelector('[data-video-close]');
  if (!modal || !video || !open) return;
  open.addEventListener('click', function () {
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
    try { video.play(); } catch (e) {}
  });
  function stop() { video.pause(); }
  close.addEventListener('click', function () { modal.close(); });
  modal.addEventListener('close', stop);
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
})();

// Lightbox for zoomable images
(function () {
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var count = document.getElementById('lightbox-count');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-zoom]'));
  if (!box || !items.length) return;
  var i = 0;
  function show(n) {
    i = (n + items.length) % items.length;
    var it = items[i];
    img.src = it.getAttribute('data-zoom');
    img.alt = it.querySelector('img').alt;
    count.textContent = (i + 1) + ' / ' + items.length;
  }
  items.forEach(function (it, n) {
    it.addEventListener('click', function () { show(n); if (box.showModal) box.showModal(); else box.setAttribute('open', ''); });
  });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lb]');
    if (b) { var a = b.getAttribute('data-lb'); if (a === 'close') box.close(); if (a === 'prev') show(i - 1); if (a === 'next') show(i + 1); return; }
    if (e.target === box) box.close();
  });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
