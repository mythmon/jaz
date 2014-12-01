(function() {
  'use strict';

  var canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var phase = 0;
  // var animation = new animations.RainbowFlower(canvas);
  var animation = new animations.Pulse(canvas);

  function tick() {
    ctx.fillStyle = '#000';
    ctx.strokeStyle = 'none';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    phase = phase + 0.002;
    while (phase > 1.0) {
      phase -= 1.0;
    }
    animation.tick(phase);

    var debug = false;
    if (debug) {
      ctx.fillStyle = '#fff';
      ctx.font = '16px sans-serfif';
      ctx.fillText(phase.toFixed(2), 0, canvas.height);
    }

    requestAnimationFrame(tick);
  }
  tick();
})();
