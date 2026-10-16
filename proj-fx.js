// Every project gets its own little flying thing, driven by scroll (like a sticker that comes to life):
// FLUID → glossy liquid drops in the festival's purples; B-Wood → a longboard rolling along the book;
// Kasabian → music notes rising from the CD; Punk → safety pins and a spiky sticker; Olivetti → bread, cheese, olives and salame from the shop;
// F.T.S. → extruded profiles sliding out; C_Stations → sparkles of "clean"; Momento → falling sand;
// Logos → bezier anchor points. Some pass behind the image, some in front. Decorative only (aria-hidden).
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) document.documentElement.classList.add('pfx-still');
  var S = {
    drop: function (c) { return '<span class="pfx-drop" style="--dc:' + c + '"></span>'; },
    board: '<svg viewBox="0 0 120 34"><path d="M6 14c0-5 4-7 9-7h90c5 0 9 2 9 7s-4 6-9 6H15c-5 0-9-1-9-6z" fill="#C98A4B"/><path d="M14 10h92" stroke="#A86C33" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><rect x="24" y="19" width="14" height="4" rx="1.5" fill="#3A3A3A"/><rect x="82" y="19" width="14" height="4" rx="1.5" fill="#3A3A3A"/><g class="pfx-wheel"><circle cx="31" cy="27" r="5.5" fill="#F2D24B"/><path d="M31 22.5v9M26.5 27h9" stroke="#C9A62B" stroke-width="1.4"/></g><g class="pfx-wheel"><circle cx="89" cy="27" r="5.5" fill="#F2D24B"/><path d="M89 22.5v9M84.5 27h9" stroke="#C9A62B" stroke-width="1.4"/></g></svg>',
    note1: '<svg viewBox="0 0 24 32"><path d="M9 4l12-3v19.5a4.5 4.5 0 1 1-2-3.7V6.2l-8 2v15.3a4.5 4.5 0 1 1-2-3.7z" fill="currentColor"/></svg>',
    note2: '<svg viewBox="0 0 20 32"><path d="M10 2c3 4 8 5 8 10-2-2-4-3-6-3v15a5 5 0 1 1-2-4z" fill="currentColor"/></svg>',
    pin: '<svg viewBox="0 0 80 24"><path d="M8 12h58" stroke="#C9CCD2" stroke-width="3" stroke-linecap="round"/><path d="M8 12c-6 0-6-8 0-8h62" stroke="#E6E8EC" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="62" y="2" width="14" height="14" rx="3" fill="#B9BCC4"/></svg>',
    star: '<svg viewBox="0 0 100 100"><path d="M50 2l9 22 22-12-6 24 24 4-20 15 16 18-24-1 2 25-18-17-12 22-6-24-23 9 11-22-21-12 24-6-8-23 22 11z" fill="#FF2E88" stroke="#141414" stroke-width="4" stroke-linejoin="round"/><text x="50" y="58" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="900" font-size="20" fill="#141414">PUNK</text></svg>',
    bread: '<svg viewBox="0 0 64 28"><path d="M4 16C4 8 14 3 32 3s28 5 28 13-10 10-28 10S4 24 4 16z" fill="#D9A05B" stroke="#8A5A24" stroke-width="2"/><path d="M18 9l6 9M30 7l6 10M42 8l6 9" stroke="#A8702F" stroke-width="2.4" stroke-linecap="round"/><path d="M10 13c3-4 8-6 14-6.5" stroke="#F1C98E" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
    cheese: '<svg viewBox="0 0 52 38"><path d="M3 30L40 4c6 4 9 10 9 18v12H3z" fill="#F4C542" stroke="#9C7413" stroke-width="2" stroke-linejoin="round"/><path d="M3 30h46" stroke="#9C7413" stroke-width="2"/><circle cx="34" cy="20" r="3.4" fill="#D9A21E"/><circle cx="22" cy="26" r="2.4" fill="#D9A21E"/><circle cx="42" cy="28" r="2" fill="#D9A21E"/></svg>',
    olive: '<svg viewBox="0 0 56 44"><path d="M4 40C18 30 30 20 52 4" stroke="#5B6B2E" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M20 29c-8-1-12 3-14 7 8 1 12-2 14-7zM32 20c2-8-1-13-5-15-2 8 0 12 5 15zM40 14c8 1 12-3 13-8-8-1-12 3-13 8z" fill="#7D8F45" stroke="#4D5A22" stroke-width="1.4"/><ellipse cx="27" cy="31" rx="5" ry="6.5" transform="rotate(-30 27 31)" fill="#3E4A1E"/><ellipse cx="25.5" cy="29" rx="1.4" ry="2" transform="rotate(-30 25.5 29)" fill="#8B9A5A"/><ellipse cx="44" cy="22" rx="4.4" ry="5.8" transform="rotate(-30 44 22)" fill="#4A5726"/></svg>',
    salame: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#B23A3A" stroke="#6E1F1F" stroke-width="2.6"/><g fill="#F2D0C4"><circle cx="13" cy="14" r="2.4"/><circle cx="24" cy="11" r="1.8"/><circle cx="27" cy="22" r="2.6"/><circle cx="15" cy="26" r="2"/><circle cx="20" cy="19" r="1.4"/><circle cx="29" cy="30" r="1.6"/></g></svg>',
    tomato: '<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="15" fill="#E2483B" stroke="#9C2A21" stroke-width="2"/><path d="M20 9l-5-4 1 6-7 1 7 3-2 5 6-4 6 4-2-5 7-3-7-1 1-6z" fill="#4E8A3A" stroke="#2F5A22" stroke-width="1.2" stroke-linejoin="round"/><path d="M11 20c1-3 3-5 6-6" stroke="#F4877D" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
    like: function (n) { return '<span class="pfx-like"><svg viewBox="0 0 24 22"><path d="M12 21s-9-5.6-9-12A5 5 0 0 1 12 6a5 5 0 0 1 9 3c0 6.4-9 12-9 12z" fill="#ED4956"/></svg><b>' + n + '</b></span>'; },
    prof: function (d) { return '<svg viewBox="0 0 40 40"><path d="' + d + '" fill="#30323A" stroke="#16171C" stroke-width="2" stroke-linejoin="round"/></svg>'; },
    spark: '<svg viewBox="0 0 40 40"><path d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20C12 18 18 12 20 0z" fill="currentColor"/></svg>',
    bubble: '<span class="pfx-bubble"></span>',
    sand: '<span class="pfx-sand"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>',
    anchor: '<svg viewBox="0 0 70 30"><path d="M8 22 C 24 2, 46 2, 62 22" fill="none" stroke="#6A2C9E" stroke-width="1.6"/><path d="M8 22 L 22 6 M62 22 L 48 6" stroke="#6A2C9E" stroke-width="1"/><rect x="4" y="18" width="8" height="8" fill="#fff" stroke="#6A2C9E" stroke-width="1.6"/><rect x="58" y="18" width="8" height="8" fill="#fff" stroke="#6A2C9E" stroke-width="1.6"/><circle cx="22" cy="6" r="3" fill="#6A2C9E"/><circle cx="48" cy="6" r="3" fill="#6A2C9E"/></svg>'
  };
  var U = 'M4 6h8v20h16V6h8v28H4z', L = 'M6 4h9v23h19v9H6z', T = 'M3 5h34v9H25v22h-10V14H3z';
  // x, y: position in % of the box; w: size; z: 'b' behind the image / 'f' in front; at: scroll point it appears; sp: parallax
  var CFG = {
    fluid: [
      { h: S.drop('#AC00BE'), x: -3, y: 6, w: 'clamp(46px,6vw,84px)', z: 'b', at: .12, sp: 70 },
      { h: S.drop('#FF3BD4'), x: 53, y: -5, w: 'clamp(26px,3vw,40px)', z: 'f', at: .18, sp: -60 },
      { h: S.drop('#7312B0'), x: 50, y: 66, w: 'clamp(38px,4.5vw,62px)', z: 'b', at: .24, sp: 90 },
      { h: S.drop('#FF3BD4'), x: 2, y: 84, w: 'clamp(20px,2.2vw,30px)', z: 'f', at: .3, sp: -90 },
      { h: S.drop('#53007A'), x: 30, y: -7, w: 'clamp(16px,1.8vw,24px)', z: 'f', at: .36, sp: -40 }
    ],
    'fluid-page': [
      { h: S.drop('#AC00BE'), x: -4, y: 10, w: 'clamp(50px,7vw,96px)', z: 'b', at: .05, sp: 80 },
      { h: S.drop('#FF3BD4'), x: 94, y: -6, w: 'clamp(28px,3.4vw,46px)', z: 'f', at: .1, sp: -70 },
      { h: S.drop('#7312B0'), x: 90, y: 70, w: 'clamp(40px,5vw,70px)', z: 'b', at: .15, sp: 100 },
      { h: S.drop('#FF3BD4'), x: 8, y: 90, w: 'clamp(22px,2.4vw,32px)', z: 'f', at: .2, sp: -90 },
      { h: S.drop('#53007A'), x: 46, y: -5, w: 'clamp(16px,2vw,26px)', z: 'f', at: .25, sp: -50 }
    ],
    bwood: [{ h: S.board, cls: 'pfx-board', x: 0, y: -7, w: 'clamp(76px,8vw,104px)', z: 'f', at: 0, roll: true }],
    kasabian: [
      { h: S.note1, cls: 'pfx-note', x: 70, y: 18, w: 'clamp(18px,1.8vw,24px)', z: 'f', at: .2, sp: -120 },
      { h: S.note2, cls: 'pfx-note', x: 82, y: 40, w: 'clamp(14px,1.4vw,19px)', z: 'f', at: .3, sp: -160 },
      { h: S.note1, cls: 'pfx-note', x: 90, y: 12, w: 'clamp(12px,1.2vw,16px)', z: 'b', at: .38, sp: -90 }
    ],
    punk: [
      { h: S.star, cls: 'pfx-star', x: 78, y: -9, w: 'clamp(54px,5.6vw,74px)', z: 'f', at: .2, sp: -30 },
      { h: S.pin, cls: 'pfx-pin', x: -4, y: 12, w: 'clamp(50px,5vw,66px)', z: 'f', at: .26, sp: 20, r: -28 },
      { h: S.pin, cls: 'pfx-pin', x: 6, y: 86, w: 'clamp(40px,4vw,54px)', z: 'b', at: .32, sp: 40, r: 18 }
    ],
    olivetti: [
      { h: S.bread, cls: 'pfx-food', x: 60, y: 64, w: 'clamp(54px,5.6vw,74px)', z: 'f', at: .2, sp: -110, r: -12 },
      { h: S.olive, cls: 'pfx-food', x: 4, y: 46, w: 'clamp(44px,4.6vw,60px)', z: 'f', at: .28, sp: -150, r: 8 },
      { h: S.cheese, cls: 'pfx-food', x: 74, y: 14, w: 'clamp(38px,4vw,52px)', z: 'f', at: .34, sp: -80, r: 10 },
      { h: S.salame, cls: 'pfx-food', x: 30, y: -6, w: 'clamp(26px,2.8vw,36px)', z: 'b', at: .4, sp: -60 },
      { h: S.tomato, cls: 'pfx-food', x: 88, y: 78, w: 'clamp(26px,2.8vw,36px)', z: 'b', at: .46, sp: -130 }
    ],
    fts: [
      { h: S.prof(U), cls: 'pfx-prof', x: 86, y: 14, w: 'clamp(26px,2.6vw,34px)', z: 'b', at: .15, slide: 1 },
      { h: S.prof(L), cls: 'pfx-prof', x: 86, y: 42, w: 'clamp(22px,2.2vw,30px)', z: 'b', at: .22, slide: 1.4 },
      { h: S.prof(T), cls: 'pfx-prof', x: 86, y: 68, w: 'clamp(24px,2.4vw,32px)', z: 'b', at: .29, slide: 1.8 }
    ],
    cstations: [
      { h: S.spark, cls: 'pfx-spark', x: 8, y: 10, w: 'clamp(18px,2vw,26px)', z: 'f', at: .2, sp: -40 },
      { h: S.spark, cls: 'pfx-spark pfx-spark-b', x: 84, y: 30, w: 'clamp(12px,1.4vw,18px)', z: 'f', at: .28, sp: -70 },
      { h: S.bubble, x: 90, y: 74, w: 'clamp(22px,2.4vw,32px)', z: 'f', at: .34, sp: -120 },
      { h: S.bubble, x: 4, y: 64, w: 'clamp(14px,1.6vw,20px)', z: 'b', at: .4, sp: -150 }
    ],
    momento: [{ h: S.sand, cls: 'pfx-sandbox', x: 0, y: 0, w: '100%', z: 'f', at: .2 }],
    loghi: [
      { h: S.anchor, cls: 'pfx-anchor', x: 70, y: -8, w: 'clamp(54px,5.4vw,70px)', z: 'f', at: .22, sp: -30 },
      { h: S.anchor, cls: 'pfx-anchor', x: -3, y: 78, w: 'clamp(44px,4.4vw,58px)', z: 'f', at: .32, sp: 30, r: 180 }
    ]
  };
  var boxes = [];
  document.querySelectorAll('[data-fx]').forEach(function (box) {
    var cfg = CFG[box.getAttribute('data-fx')]; if (!cfg) return;
    box.classList.add('pfx-box');
    // positions are relative to the project's image, not to the whole card
    var media = box.matches('figure') ? box : (box.querySelector('.cw-media') || box.querySelector('.ph-cover') || box.querySelector('.fl-cover') || box);
    var layer = document.createElement('span'); layer.className = 'pfx-layer'; layer.setAttribute('aria-hidden', 'true'); box.appendChild(layer);
    function fit() { layer.style.left = media.offsetLeft + 'px'; layer.style.top = media.offsetTop + 'px'; layer.style.width = media.offsetWidth + 'px'; layer.style.height = media.offsetHeight + 'px'; }
    fit(); window.addEventListener('resize', fit); window.addEventListener('load', fit);
    var items = cfg.map(function (c) {
      var e = document.createElement('span');
      e.className = 'pfx ' + (c.cls || '') + (c.z === 'b' ? ' pfx-back' : ' pfx-front');
      e.setAttribute('aria-hidden', 'true'); e.innerHTML = c.h;
      e.style.left = c.x + '%'; e.style.top = c.y + '%'; e.style.width = c.w;
      if (c.r) e.style.setProperty('--r', c.r + 'deg');
      e.style.setProperty('--d', (Math.random() * 2).toFixed(2) + 's');
      if (c.cls && c.cls.indexOf('pfx-sandbox') > -1) { var m = box.querySelector('.cw-media'); if (m) { m.appendChild(e); e.style.zIndex = 3; return { el: e, c: c }; } }
      layer.appendChild(e); return { el: e, c: c };
    });
    boxes.push({ box: box, items: items, on: false });
  });
  if (!boxes.length) return;
  function prog(el) { var r = el.getBoundingClientRect(), vh = window.innerHeight; return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height))); }
  function update() {
    ticking = false;
    boxes.forEach(function (b) {
      if (!b.on) return;
      var p = prog(b.box);
      b.items.forEach(function (it) {
        var c = it.c, shown = reduce || (p > c.at && p < 0.97);
        it.el.classList.toggle('on', shown);
        if (reduce) return;
        var y = c.sp ? (p - 0.5) * c.sp : 0, x = 0, extra = '';
        if (c.roll) { var w = it.el.parentNode.clientWidth, run = Math.max(0, Math.min(1, (p - 0.1) / 0.6)); x = run * (w - it.el.offsetWidth); it.el.style.setProperty('--spin', (run * 900).toFixed(0) + 'deg'); }
        if (c.slide) { var s = Math.max(0, Math.min(1, (p - c.at) / 0.35)); x = s * it.el.offsetWidth * c.slide; }
        it.el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
      });
    });
  }
  var ticking = false;
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { boxes.forEach(function (b) { if (b.box === e.target) b.on = e.isIntersecting; }); }); req(); }, { rootMargin: '10% 0px' });
  boxes.forEach(function (b) { io.observe(b.box); });
  window.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', req);
})();
