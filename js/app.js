(function() {
  'use strict';

  var canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  document.body.appendChild(canvas);

  var phase = 0;
  var animation = new animations.RainbowFlower(canvas);

  function tick() {
    phase = phase + 0.001;
    while (phase > 1.0) {
      phase -= 1.0;
    }
    animation.tick(phase);
    requestAnimationFrame(tick);
  }
  tick();

  // document.addEventListener('mousemove', function(ev) {
  //   phase = ev.clientX / window.innerWidth;
  //   requestAnimationFrame(animation.tick.bind(animation, phase));
  // });
})();
