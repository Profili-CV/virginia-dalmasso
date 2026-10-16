// Kasabian card: slide the disc out when the card is on screen (touch screens have no hover),
// and open a Spotify player on request. While the album plays, the disc spins.
(function () {
  var stage = document.querySelector('.cd-stage');
  var box = document.querySelector('[data-listen]');
  if (stage && !matchMedia('(hover: hover) and (pointer: fine)').matches && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { stage.classList.toggle('cd-out', e.intersectionRatio > 0.55); });
    }, { threshold: [0, 0.55, 1] }).observe(stage);
  }
  if (!box) return;
  var btn = box.querySelector('.listen-btn'), player = box.querySelector('.listen-player');
  var id = box.getAttribute('data-listen'), loaded = false;

  function fallback() {
    player.innerHTML = '<iframe title="Spotify: Kasabian, 48:13" src="https://open.spotify.com/embed/album/' + id +
      '?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
  }
  function load() {
    loaded = true;
    var slot = document.createElement('div'); player.appendChild(slot);
    var timer = setTimeout(function () { if (!player.querySelector('iframe')) { player.innerHTML = ''; fallback(); } }, 4000);
    window.onSpotifyIframeApiReady = function (API) {
      API.createController(slot, { uri: 'spotify:album:' + id, width: '100%', height: 152 }, function (ctrl) {
        clearTimeout(timer);
        ctrl.addListener('playback_update', function (e) {
          if (stage) stage.classList.toggle('spinning', !!(e && e.data && !e.data.isPaused));
        });
      });
    };
    var s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1'; s.async = true;
    s.onerror = function () { clearTimeout(timer); player.innerHTML = ''; fallback(); };
    document.body.appendChild(s);
  }
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open);
    player.hidden = !open;
    if (open && !loaded) load();
    if (!open) { player.innerHTML = ''; loaded = false; if (stage) stage.classList.remove('spinning'); }
  });
})();
