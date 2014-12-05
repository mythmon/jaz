import {rgba, hsla} from '../util.js';
import {phaseMod} from '../cycles.js';

export class Zoom {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  tick(phase) {
    var x = this.canvas.width / 2;
    var y = this.canvas.height / 2;
    var s = this.canvas.height / 2;

    this.ctx.save();
    this.ctx.fillStyle = '#fff';
    this.ctx.translate(x, y);
    this.ctx.rotate(Math.PI * phase / 2);

    var a = 0.2;
    var colors = [rgba(0, 0, 0, a), hsla(360 * phase, 100, 25, a), 'none'];
    var colorIndex = 0;
    var phaseOffset = 3 * phase % 0.3;
    var top = 2.0 + phaseOffset;

    for (var mult = top; mult > 0; mult -= 0.1) {
      this.ctx.save();
      this.ctx.rotate(mult);
      this.ctx.fillStyle = colors[colorIndex];
      this.ctx.fillRect(-s * mult, -s * mult, s * 2 * mult, s * 2 * mult);
      this.ctx.restore();
      colorIndex = (colorIndex + 1) % colors.length;
    }

    this.ctx.restore();
  }
}
