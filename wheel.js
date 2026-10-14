// Wheel of fortune, just for fun: nothing real to win.
(function () {
  var wrap = document.querySelector('.wof');
  if (!wrap) return;
  var svg = wrap.querySelector('.wof-wheel'), btn = wrap.querySelector('.wof-spin');
  var out = wrap.querySelector('.wof-result'), cv = wrap.querySelector('.wof-confetti');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var S = [
    { it: 'Caffè', en: 'Coffee', rit: 'Hai vinto un caffè virtuale. Lo zucchero lo porti tu.', ren: 'You won a virtual coffee. Bring your own sugar.' },
    { it: 'Pantone', en: 'Pantone', rit: 'Puoi scegliere il Pantone che vuoi. Tanto sarà viola.', ren: 'You can pick any Pantone you like. It will be purple anyway.' },
    { it: 'Revisione', en: 'Revision', rit: 'Esce: «revisione 27, quella finale-finale-definitiva».', ren: 'You got: “revision 27, the final-final-definitive one”.' },
    { it: 'Comic Sans', en: 'Comic Sans', rit: 'Ti tocca il Comic Sans. Scherzo: si può fare di meglio.', ren: 'You got Comic Sans. Kidding: we can do better.' },
    { it: 'THINK BIG', en: 'THINK BIG', win: true, rit: 'JACKPOT! Hai vinto un\'idea gigante: think big!', ren: 'JACKPOT! You won a giant idea: think big!' },
    { it: 'Gatto', en: 'Cat', rit: 'Un gatto è passato sulla tastiera. Ora il layout è arte.', ren: 'A cat walked on the keyboard. The layout is art now.' },
    { it: 'Deadline', en: 'Deadline', rit: 'Deadline: ieri. Un classico.', ren: 'Deadline: yesterday. A classic.' },
    { it: 'Ctrl+Z', en: 'Ctrl+Z', rit: 'Hai vinto Ctrl+Z illimitati. Usali con saggezza.', ren: 'You won unlimited Ctrl+Z. Use them wisely.' }
  ];
  var n = S.length, step = 360 / n;
  var cols = ['#26202A', '#EEEAF4', '#4A3B57', '#D9CCEB', null, '#26202A', '#EEEAF4', '#4A3B57'];
  var ns = 'http://www.w3.org/2000/svg', html = '';
  function pt(a, r) { var t = (a - 90) * Math.PI / 180; return [Math.cos(t) * r, Math.sin(t) * r]; }
  S.forEach(function (s, i) {
    var a0 = i * step, a1 = a0 + step, p0 = pt(a0, 96), p1 = pt(a1, 96);
    var fill = s.win ? 'var(--accent)' : cols[i];
    var dark = s.win || ['#26202A', '#4A3B57'].indexOf(cols[i]) > -1;
    html += '<path d="M0 0 L' + p0[0].toFixed(2) + ' ' + p0[1].toFixed(2) + ' A96 96 0 0 1 ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2) + ' Z" fill="' + fill + '"/>';
    html += '<text class="wof-lbl" data-i="' + i + '" transform="rotate(' + (a0 + step / 2 - 90) + ') translate(58 0)' + (a0 + step / 2 > 180 ? ' rotate(180)' : '') + '" fill="' + (dark ? '#fff' : '#26202A') + '" text-anchor="middle" dominant-baseline="middle">' + s.it + '</text>';
  });
  html += '<circle r="96" fill="none" stroke="var(--ink)" stroke-width="3"/>';
  for (var k = 0; k < n; k++) { var d = pt(k * step, 96); html += '<circle cx="' + d[0].toFixed(1) + '" cy="' + d[1].toFixed(1) + '" r="2.6" fill="#FFE14D"/>'; }
  svg.innerHTML = html;
  function en() { return document.documentElement.lang === 'en'; }
  function labels() { svg.querySelectorAll('.wof-lbl').forEach(function (t) { var s = S[+t.dataset.i]; t.textContent = en() ? s.en : s.it; }); }
  document.addEventListener('langchange', function () { labels(); if (last != null) show(last); });

  var rot = 0, busy = false, last = null;
  function show(i) {
    var s = S[i];
    out.textContent = en() ? s.ren : s.rit;
    out.classList.toggle('is-win', !!s.win);
  }
  btn.addEventListener('click', function () {
    if (busy) return; busy = true;
    var i = Math.floor(Math.random() * n);
    // the pin is at the top: bring the middle of slice i under it
    var target = 360 - (i * step + step / 2) + (Math.random() - 0.5) * step * 0.6;
    rot = rot - (rot % 360) + 360 * (reduce ? 1 : 5) + target;
    svg.style.transition = reduce ? 'none' : 'transform 4.2s cubic-bezier(.12,.75,.1,1)';
    svg.style.transform = 'rotate(' + rot + 'deg)';
    out.classList.remove('is-win'); out.textContent = '…';
    setTimeout(function () { busy = false; last = i; show(i); if (S[i].win) confetti(); }, reduce ? 50 : 4300);
  });

  function confetti() {
    if (reduce) return;
    var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cv.classList.add('on');
    var b = wrap.querySelector('.wof-box').getBoundingClientRect();
    var cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    var palette = ['#6A2C9E', '#B98CF0', '#FFE14D', '#FF5FA2', '#ffffff', '#3FD1C4'];
    var P = [];
    for (var k = 0; k < 160; k++) {
      var a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
      P.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: palette[k % palette.length] });
    }
    var t0 = performance.now();
    (function frame(t) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      P.forEach(function (p) {
        p.vy += 0.28; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      });
      if (t - t0 < 3200) requestAnimationFrame(frame); else { ctx.clearRect(0, 0, innerWidth, innerHeight); cv.classList.remove('on'); }
    })(t0);
  }
})();
