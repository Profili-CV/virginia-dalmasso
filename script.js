(function () {
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
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
    btn.innerHTML = '<span class="lang-opt' + (next === 'it' ? ' is-on' : '') + '">IT</span><span class="lang-opt' + (next === 'en' ? ' is-on' : '') + '">EN</span>';
    btn.setAttribute('aria-label', next === 'en' ? 'Passa all\'italiano' : 'Switch to English');
    document.dispatchEvent(new Event('langchange'));
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




// Scroll effects: sections appear as you reach them, and the "about" statement
// fills in word by word while you scroll past it.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal on scroll
  var targets = document.querySelectorAll('.section h2, .work, .gallery > figure, .timeline li, .about-grid > div > *, .contact h2, .contact-mail');
  if (!reduce && 'IntersectionObserver' in window) {
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(sib, 5) * 70 + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // 2. Word-by-word colour fill
  var words = [];
  var scrub = document.querySelector('.scrub');
  function split() {
    if (!scrub) return;
    var text = scrub.textContent.trim();
    scrub.textContent = '';
    words = text.split(/\s+/).map(function (w, i, all) {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = w + (i < all.length - 1 ? ' ' : '');
      scrub.appendChild(s);
      return s;
    });
    update();
  }
  function update() {
    if (!scrub || !words.length) return;
    if (reduce) { words.forEach(function (w) { w.classList.add('lit'); }); return; }
    var r = scrub.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.85, end = vh * 0.35;
    var p = (start - r.top) / (start - end + r.height * 0.6);
    p = Math.max(0, Math.min(1, p));
    var n = Math.round(p * words.length);
    words.forEach(function (w, i) { w.classList.toggle('lit', i < n); });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
  document.addEventListener('langchange', split);
  split();
})();

// Soundtrack: an original early-2000s style loop, played only when the visitor asks for it.
(function () {
  var audio = document.getElementById('soundtrack');
  var btn = document.getElementById('sound-btn');
  if (!audio || !btn) return;
  var fade;
  function label() {
    var en = document.documentElement.lang === 'en';
    var on = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-label', on ? (en ? 'Pause the soundtrack' : 'Metti in pausa la colonna sonora') : (en ? 'Play the soundtrack' : 'Fai partire la colonna sonora'));
  }
  function ramp(to, done) {
    clearInterval(fade);
    fade = setInterval(function () {
      var v = audio.volume + (to > audio.volume ? 0.05 : -0.05);
      if ((to > audio.volume && v >= to) || (to <= audio.volume && v <= to)) { audio.volume = Math.max(0, Math.min(1, to)); clearInterval(fade); if (done) done(); return; }
      audio.volume = Math.max(0, Math.min(1, v));
    }, 40);
  }
  function play() {
    audio.volume = 0;
    var p = audio.play();
    if (p && p.catch) p.catch(function () { set(false); });
    set(true); ramp(0.55);
  }
  function pause() { set(false); ramp(0, function () { audio.pause(); }); }
  function set(on) { btn.setAttribute('aria-pressed', on ? 'true' : 'false'); label(); }
  btn.addEventListener('click', function () { if (btn.getAttribute('aria-pressed') === 'true') pause(); else play(); });
  document.addEventListener('langchange', label);
  // the FLUID* teaser has its own sound: pause the music while it plays
  var video = document.getElementById('fluid-video');
  if (video) video.addEventListener('play', function () { if (btn.getAttribute('aria-pressed') === 'true') pause(); });
  label();
})();
