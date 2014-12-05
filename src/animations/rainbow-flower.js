import {range, hsla, OptLoader} from '../util.js';

export class RainbowFlower {
  constructor(canvas) {
    this.canvas = canvas;

    var count = 7;
    var a = 3 / count;

    this.lines = range(count)
    .map(function(n) {
      var c = hsla(n / count * 360, 100, 50, a);
      return new Spinner({
        ang: Math.PI / count * 2 * n,
        color: c,
        magnitude: canvas.width / 4,
        radius: canvas.width / 4,
        speed: 2,
      });
    });

    this.ctx = canvas.getContext('2d');
  }

  tick(phase) {
    this.ctx.save();
    {
      this.ctx.globalCompositeOperation = 'lighter';
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.rotate(phase * Math.PI * 2);
      for (var line of this.lines) {
        line.draw(this.ctx, phase);
      }
    }
    this.ctx.restore();
  }
}

class Spinner extends OptLoader {
  constructor(opts) {
    super(opts, {
      color: '#fff',
      ang: 0,
      magnitude: 150,
      radius: 150,
      offset: 0,
      speed: 1,
    });
  }

  draw(ctx, phase) {
    ctx.fillStyle = this.color;

    var t = ((phase * this.speed) + this.offset) % 1.0;
    t = Math.cos(Math.PI * 2 * t);
    var x = Math.cos(this.ang) * this.magnitude * t;
    var y = Math.sin(this.ang) * this.magnitude * t;

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
