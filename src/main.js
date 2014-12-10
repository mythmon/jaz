import {RainbowFlower} from './animations/rainbow-flower.js';
import {Pulse} from './animations/pulse.js';
import {Forever} from './animations/forever.js';
import {Zoom} from './animations/zoom.js';
import {PogoStick} from './animations/pogo.js';
import {March} from './animations/march.js';

var animations = [RainbowFlower, Pulse, Forever, Zoom, PogoStick, March];
var animSets;

/* Calculate how big to make cells so that when they are tiled in a grid
 * across the entire screen, they fill the screen in roughly the same
 * aspect ratio as the screen.
 */
function calculateCellSize(numCells, margin=50) {
  var screenWidth = document.body.clientWidth - margin;
  var screenHeight = document.body.clientHeight - margin;

  var screenArea = screenWidth * screenHeight;
  var multiplier = Math.sqrt(numCells / screenArea);

  var cellsNumWide = Math.ceil(screenWidth * multiplier);
  var cellsNumTall = Math.ceil(screenHeight * multiplier);

  var cellWidth = screenWidth / cellsNumWide;
  var cellHeight = screenHeight / cellsNumTall;

  return Math.min(cellWidth, cellHeight) * 0.8;
}

function init() {
  animSets = [];
  var container = document.querySelector('.container');
  if (container) {
    document.body.removeChild(container);
  }

  container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  var desiredSize = calculateCellSize(animations.length);
  var c;
  for (var animation of animations) {
    c = document.createElement('canvas');
    c.width = desiredSize;
    c.height = desiredSize;
    c.style['flex-basis'] = desiredSize;
    container.appendChild(c);
    animSets.push({
      animationClass: animation,
      canvas: c,
      ctx: c.getContext('2d'),
      animation: new animation(c),
    });
  }
}

init();

var resizeDebounce = null;
window.addEventListener('resize', function() {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(init, 100);
});

var phase = 0;
var phasePerMs = 9e-5
var lastTick = +new Date();

function tick() {
  var now = +new Date();
  var dt = now - lastTick;
  lastTick = now;

  phase = phase + dt * phasePerMs;
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
