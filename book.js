// B-Wood book: a flip-through book in a dialog.
// The PDF was exported as spreads (01 = full cover wrap, 02..66 = inner spreads),
// so each view is a pair of half pages, and turning a page flips a "leaf" in 3D.
// On narrow screens the book shows one page at a time.
(function () {
  var opener = document.querySelector('[data-book-open]');
  if (!opener) return;
  var N = 66;
  function src(n) { return 'img/bwood/' + (n < 10 ? '0' + n : n) + '.jpg'; }
  var COVER = { s: src(1), h: 'r' }, BACK = { s: src(1), h: 'l' };
  var spreads = [{ l: null, r: COVER }];
  for (var i = 2; i <= N; i++) spreads.push({ l: { s: src(i), h: 'l' }, r: { s: src(i), h: 'r' } });
  spreads.push({ l: BACK, r: null });
  var singles = [];
  spreads.forEach(function (v) { if (v.l) singles.push(v.l); if (v.r) singles.push(v.r); });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrowMq = window.matchMedia('(max-width: 700px), (orientation: portrait) and (max-width: 900px)');

  var box = document.createElement('dialog');
  box.className = 'bookbox';
  box.innerHTML =
    '<div class="bk-top"><p class="bk-title">B-Wood · <span data-bk-t>Sistema d\'identità</span></p><p class="bk-count" aria-live="polite"></p>' +
    '<button class="bk-btn bk-close" type="button" data-bk="close"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button></div>' +
    '<div class="bk-stage"><div class="bk-book">' +
    '<div class="bk-page bk-l"></div><div class="bk-page bk-r"></div>' +
    '<div class="bk-leaf"><div class="bk-face bk-front"></div><div class="bk-face bk-back"></div></div>' +
    '</div></div>' +
    '<div class="bk-nav"><button class="bk-btn" type="button" data-bk="prev"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
    '<p class="bk-hint"></p>' +
    '<button class="bk-btn" type="button" data-bk="next"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>';
  document.body.appendChild(box);

  var book = box.querySelector('.bk-book');
  var L = box.querySelector('.bk-l'), R = box.querySelector('.bk-r');
  var leaf = box.querySelector('.bk-leaf'), front = box.querySelector('.bk-front'), back = box.querySelector('.bk-back');
  var count = box.querySelector('.bk-count'), hint = box.querySelector('.bk-hint');
  var prevB = box.querySelector('[data-bk="prev"]'), nextB = box.querySelector('[data-bk="next"]');
  var single = false, i = 0, busy = false;

  function en() { return document.documentElement.lang === 'en'; }
  function views() { return single ? singles : spreads; }
  function paint(el, p) {
    if (!p) { el.style.backgroundImage = ''; el.classList.add('is-empty'); return; }
    el.classList.remove('is-empty');
    el.style.backgroundImage = 'url(' + p.s + ')';
    el.style.backgroundPosition = p.h === 'l' ? '0 0' : '100% 0';
  }
  var cache = {};
  function preload(k) {
    var v = views()[k]; if (!v) return;
    [single ? v : v.l, single ? null : v.r].forEach(function (p) {
      if (p && !cache[p.s]) { var im = new Image(); im.src = p.s; cache[p.s] = im; }
    });
  }
  function render() {
    var v = views()[i];
    if (single) { paint(R, v); L.style.display = 'none'; book.classList.remove('only-r', 'only-l'); }
    else {
      L.style.display = '';
      paint(L, v.l); paint(R, v.r);
      book.classList.toggle('only-r', !v.l); book.classList.toggle('only-l', !v.r);
    }
    var total = views().length;
    count.textContent = (i + 1) + ' / ' + total;
    prevB.disabled = i === 0; nextB.disabled = i === total - 1;
    prevB.setAttribute('aria-label', en() ? 'Previous page' : 'Pagina precedente');
    nextB.setAttribute('aria-label', en() ? 'Next page' : 'Pagina successiva');
    box.querySelector('[data-bk="close"]').setAttribute('aria-label', en() ? 'Close the book' : 'Chiudi il libro');
    box.setAttribute('aria-label', en() ? 'B-Wood book' : 'Libro B-Wood');
    box.querySelector('[data-bk-t]').textContent = en() ? 'Identity system' : 'Sistema d\'identità';
    hint.textContent = en() ? 'Click the pages or use the arrows' : 'Clicca le pagine o usa le frecce';
    preload(i + 1); preload(i + 2); preload(i - 1);
  }
  function turn(dir) {
    var vs = views(), j = i + dir;
    if (busy || j < 0 || j >= vs.length) return;
    var cur = vs[i], nxt = vs[j];
    if (reduce) { i = j; render(); return; }
    busy = true;
    if (single) {
      // one page: the current page lifts away like a sheet
      paint(front, cur); back.style.backgroundImage = ''; back.classList.add('is-empty');
      leaf.className = 'bk-leaf bk-leaf-single ' + (dir > 0 ? 'to-left' : 'to-right');
      paint(R, nxt);
    } else if (dir > 0) {
      paint(front, cur.r); paint(back, nxt.l);
      paint(R, nxt.r);
      leaf.className = 'bk-leaf on-right';
      book.classList.toggle('only-l', !nxt.r); book.classList.remove('only-r');
    } else {
      paint(front, cur.l); paint(back, nxt.r);
      paint(L, nxt.l);
      leaf.className = 'bk-leaf on-left';
      book.classList.toggle('only-r', !nxt.l); book.classList.remove('only-l');
    }
    void leaf.offsetWidth;
    leaf.classList.add('go');
    setTimeout(function () { i = j; leaf.className = 'bk-leaf'; busy = false; render(); }, 720);
  }
  function setMode() {
    var was = single, wasPage;
    single = narrowMq.matches;
    if (was === single) return;
    // keep roughly the same place in the book when switching layout
    if (single) { wasPage = i === 0 ? 0 : Math.min(singles.length - 1, i * 2 - 1); }
    else { wasPage = Math.ceil(i / 2); }
    i = wasPage;
    book.classList.toggle('is-single', single);
  }
  function open() {
    setMode(); book.classList.toggle('is-single', single); render();
    if (box.showModal) box.showModal(); else box.setAttribute('open', '');
  }
  opener.addEventListener('click', open);
  narrowMq.addEventListener && narrowMq.addEventListener('change', function () { if (box.open) { setMode(); render(); } });

  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-bk]');
    if (b) { var a = b.getAttribute('data-bk'); if (a === 'close') box.close(); if (a === 'prev') turn(-1); if (a === 'next') turn(1); return; }
    if (e.target.closest('.bk-page, .bk-leaf')) {
      var r = book.getBoundingClientRect();
      turn(e.clientX > r.left + r.width / 2 || single && e.clientX > r.left + r.width * 0.35 ? 1 : -1);
      return;
    }
    if (e.target === box) box.close();
  });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); turn(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); turn(-1); }
  });
  var sx = null;
  book.addEventListener('pointerdown', function (e) { sx = e.clientX; });
  book.addEventListener('pointerup', function (e) {
    if (sx === null) return; var dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { e.stopPropagation(); turn(dx < 0 ? 1 : -1); book.dataset.swiped = '1'; setTimeout(function () { delete book.dataset.swiped; }, 50); }
  });
  book.addEventListener('click', function (e) { if (book.dataset.swiped) e.stopPropagation(); }, true);
  document.addEventListener('langchange', function () { if (box.open) render(); });
})();

// Kasabian CD: clicking the case opens the album images in the lightbox.
(function () {
  var b = document.querySelector('[data-cd-open]');
  var first = document.querySelector('.cd-gallery img');
  if (!b || !first) return;
  b.addEventListener('click', function () { first.click(); });
})();

// "Si può fareee!": an interactive headline and a pitch box that opens an e-mail draft.
(function () {
  var spf = document.getElementById('spf');
  if (!spf) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chars = spf.querySelectorAll('.ch');
  var extra = spf.querySelector('.spf-extra');
  spf.addEventListener('click', function () {
    spf.classList.remove('zap'); void spf.offsetWidth; spf.classList.add('zap');
    if (reduce) return;
    chars.forEach(function (c, k) {
      var x = (Math.random() - 0.5) * 60, y = -30 - Math.random() * 70, r = (Math.random() - 0.5) * 70;
      c.animate([
        { transform: 'translate(0,0) rotate(0)' },
        { transform: 'translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg)', offset: 0.35 },
        { transform: 'translate(0,0) rotate(0)' }
      ], { duration: 900 + k * 25, easing: 'cubic-bezier(.2,1.6,.4,1)' });
    });
  });
  var ta = document.getElementById('pitch-text');
  var nm = document.getElementById('pitch-name');
  function grow() {
    // one more E every 12 characters, up to 12 more
    var n = Math.min(12, Math.floor(ta.value.length / 12));
    if (extra.childNodes.length !== n) {
      extra.textContent = '';
      for (var k = 0; k < n; k++) { var e = document.createElement('span'); e.className = 'ch ch-new'; e.textContent = 'E'; extra.appendChild(e); }
      spf.classList.toggle('is-big', n > 6);
      spf.style.setProperty('--len', 14 + n);
    }
  }
  ta.addEventListener('input', grow);
  function placeholders() {
    var en = document.documentElement.lang === 'en';
    [ta, nm].forEach(function (el) {
      if (!el.dataset.itPh) el.dataset.itPh = el.placeholder;
      el.placeholder = en ? el.getAttribute('data-en-placeholder') : el.dataset.itPh;
    });
  }
  placeholders(); document.addEventListener('langchange', placeholders);
  document.getElementById('pitch').addEventListener('submit', function (e) {
    e.preventDefault();
    var en = document.documentElement.lang === 'en';
    var text = ta.value.trim();
    if (!text) { ta.focus(); ta.classList.add('shake'); setTimeout(function () { ta.classList.remove('shake'); }, 500); return; }
    var who = nm.value.trim();
    var subject = (en ? 'A project for you' : 'Un progetto per te') + (who ? ' · ' + who : '');
    var body = text + '\n\n' + (who ? '— ' + who : '');
    spf.click();
    window.location.href = 'mailto:virginia.dalmasso15@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
