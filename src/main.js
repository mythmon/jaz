import {RainbowFlower} from './animations/rainbow-flower.js';
import {Pulse} from './animations/pulse.js';
import {Forever} from './animations/forever.js';

var animations = [RainbowFlower, Pulse, Forever];
var animSets;

function init() {
  animSets = [];
  var container = document.querySelector('.container');
  if (container) {
    document.body.removeChild(container);
  }

  container = document.createElement('div');
  container.classList.add('container');
  container.style['align-items'] = 'stretch';
  document.body.appendChild(container);

  var c;
  for (var key in animations) {
    c = document.createElement('canvas');
    container.appendChild(c);
    animSets.push({
      animationClass: animations[key],
      canvas: c,
      ctx: c.getContext('2d'),
    });
  }

  var desiredSize = document.body.clientWidth / animSets.length;
  if (desiredSize > document.body.clientHeight) {
    desiredSize = document.body.clientHeight;
  }
  desiredSize -= 50;

  animSets.forEach(function(set) {
    set.canvas.width = desiredSize;
    set.canvas.height = desiredSize;
    set.animation = new set.animationClass(set.canvas);
  });

  container.style['align-items'] = 'center';
}

init();

var resizeDebounce = null;
window.addEventListener('resize', function() {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(init, 100);
});

var phase = 0;

function tick() {
  phase = phase + 0.002;
  while (phase > 1.0) {
    phase -= 1.0;
  }

  for (var set of animSets) {
    set.ctx.fillStyle = '#000';
    set.ctx.strokeStyle = 'none';
    set.ctx.fillRect(0, 0, set.canvas.width, set.canvas.height);
    set.animation.tick(phase);
  }

  requestAnimationFrame(tick);
}
tick();
