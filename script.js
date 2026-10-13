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
