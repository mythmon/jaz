import {OptLoader} from '../util.js';
import {phaseMod, sinNorm} from '../cycles.js';

export class Forever {
  constructor(canvas) {
    this.canvas = canvas;

    var count = 16;

    var gridPoints = [];
    for (var y = 0; y < count; y++) {
      for (var x = 0; x < count; x++) {
        gridPoints.push({x, y});
      }
    }

    var size = canvas.width / count;

    this.lines = gridPoints.map(function({x, y}) {
      return new Line({
        x: size * x,
        y: size * y,
        size: size,
        speed: (x + y) % 2 === 0 ? 1 : -1,
        offset: x / size / 2,
      });
    });

    this.ctx = canvas.getContext('2d');
  }

  tick(phase) {
    for (var line of this.lines) {
      line.draw(this.ctx, phase);
    }
  }
}

class Line extends OptLoader {
  constructor(opts) {
    super(opts, {
      x: 0,
      y: 0,
      offset: 0.0,
      size: 10,
      speed: 1,
    });
  }

  draw(ctx, phase) {
    phase = phaseMod(phase, this.speed, this.offset);
    var s = this.size / 2;
    var x = this.x + s;
    var y = this.y + s;

    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;

    ctx.translate(x, y);
    ctx.rotate(sinNorm(phase) * Math.PI);

    ctx.beginPath();
    ctx.moveTo(-s, -s);
    ctx.lineTo(s, s);
    ctx.stroke();
    ctx.restore();
  }
}
