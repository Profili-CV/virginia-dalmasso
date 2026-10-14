// Hero photo: peel it off by the tape (it sticks back when released) and draw on it with the mouse or a finger.
(function () {
  var box = document.getElementById('pin-photo');
  if (!box) return;
  var tape = box.querySelector('.pin-tape');
  var cv = box.querySelector('.pin-draw');
  var ctx = cv.getContext('2d');
  var clear = document.querySelector('.pin-clear');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function size() {
    var r = box.getBoundingClientRect();
    var old = cv.width ? ctx.getImageData(0, 0, cv.width, cv.height) : null;
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (old) ctx.putImageData(old, 0, 0);
  }
  size(); window.addEventListener('resize', size);

  // drawing
  var drawing = false, last = null, drew = false;
  function pos(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * (cv.width / dpr) / r.width, y: (e.clientY - r.top) * (cv.height / dpr) / r.height }; }
  cv.addEventListener('pointerdown', function (e) { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); e.preventDefault(); });
  cv.addEventListener('pointermove', function (e) {
    if (!drawing) return;
    var p = pos(e);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6A2C9E';
    ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last = p;
    if (!drew) { drew = true; box.parentNode.classList.add('has-drawing'); }
  });
  function stop() { drawing = false; }
  cv.addEventListener('pointerup', stop); cv.addEventListener('pointercancel', stop);
  if (clear) clear.addEventListener('click', function () { ctx.clearRect(0, 0, cv.width, cv.height); drew = false; box.parentNode.classList.remove('has-drawing'); });

  // peel off by the tape, stick back on release
  var dx = 0, dy = 0, sx, sy, held = false;
  tape.addEventListener('pointerdown', function (e) { held = true; sx = e.clientX; sy = e.clientY; box.classList.add('is-held'); tape.setPointerCapture(e.pointerId); e.preventDefault(); });
  tape.addEventListener('pointermove', function (e) {
    if (!held) return;
    dx = e.clientX - sx; dy = e.clientY - sy;
    box.style.setProperty('--dx', dx + 'px'); box.style.setProperty('--dy', dy + 'px');
    box.style.setProperty('--rot', Math.max(-14, Math.min(14, dx / 18)) + 'deg');
  });
  function drop() {
    if (!held) return; held = false;
    box.classList.remove('is-held');
    box.style.setProperty('--dx', '0px'); box.style.setProperty('--dy', '0px'); box.style.setProperty('--rot', '0deg');
    if (!reduce) { box.classList.remove('stick'); void box.offsetWidth; box.classList.add('stick'); }
  }
  tape.addEventListener('pointerup', drop); tape.addEventListener('pointercancel', drop);
})();
