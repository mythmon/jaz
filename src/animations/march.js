import {phaseMod, squareWalk, squareWalkInv} from '../utils.js';
import {OptLoader, GridAnimation} from '../bases.js';

export class March extends GridAnimation{
  get count() {
    return 16;
  }

  makeItem({x, y}) {
    return [0, 0.5]
    .map((offset) => {
      return new Box({
        ctx: this.ctx,
        x: this.stride * x,
        y: this.stride * y,
        stride: this.stride,
        speed: (x + y) % 2 === 0 ? 1 : -1,
        offset: squareWalkInv(x, y) + offset,
      });
    });
  }
}

class Box extends OptLoader {
  constructor(opts) {
    super(opts, {
      ctx: null,
      x: 0,
      y: 0,
      stride: 10,
      offset: 0.0,
      speed: 1,
      color: '#fff',
    });
  }

  draw(phase) {
    var p = phaseMod(phase, this.speed, this.offset);
    var s = this.stride / 2;

    var [x, y] = squareWalk(p, s);
    x += this.x;
    y += this.y;

    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.translate(x, y);
    this.ctx.fillRect(0, 0, s, s);
    this.ctx.restore();
  }
}
