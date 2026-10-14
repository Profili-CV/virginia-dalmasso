// Sketchbook sheets: drag them around; a click without dragging opens the lightbox.
(function () {
  var box = document.querySelector('.sheets');
  if (!box) return;
  var z = 10;
  box.querySelectorAll('.sheet-p').forEach(function (f) {
    var dx = 0, dy = 0, sx, sy, moved = false, down = false;
    f.addEventListener('pointerdown', function (e) {
      down = true; moved = false; sx = e.clientX - dx; sy = e.clientY - dy;
      f.style.zIndex = ++z; f.classList.add('is-held'); f._pid = e.pointerId;
    });
    f.addEventListener('pointermove', function (e) {
      if (!down) return;
      var nx = e.clientX - sx, ny = e.clientY - sy;
      if (!moved && Math.abs(e.clientX - sx - dx) + Math.abs(e.clientY - sy - dy) > 4) { moved = true; try { f.setPointerCapture(f._pid); } catch (er) {} }
      if (!moved) return;
      dx = nx; dy = ny;
      f.style.setProperty('--dx', dx + 'px'); f.style.setProperty('--dy', dy + 'px');
    });
    function end() { down = false; f.classList.remove('is-held'); }
    f.addEventListener('pointerup', end); f.addEventListener('pointercancel', end);
    f.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  });
})();
