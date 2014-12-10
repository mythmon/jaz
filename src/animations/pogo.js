import {hsla, range, phaseMod, sinNorm} from '../utils.js';
import {OptLoader} from '../bases.js';

export class PogoStick {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    var count = 7;
    var margin = canvas.width / 6;
    var stride = (canvas.width - margin * 2) / (count - 1);
    this.ground = canvas.width * 0.85;

    this.hoppers = range(count)
    .map((n) => {
      return new Hopper({
        x: margin + stride * n,
        ground: this.ground,
        jump: canvas.height * 0.55,
        height: canvas.height * 0.15,
        width: canvas.width / (count * 2.5),
        offset: 0.03 * n,
        ctx: this.ctx,
        color: hsla(360 * n / count, 100, 50),
      });
    });
  }

  tick(phase) {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, this.ground, this.canvas.width, this.canvas.height - this.ground);

    for (var hopper of this.hoppers) {
      hopper.draw(phase);
    }
  }
}

class Hopper extends OptLoader {
  constructor(opts) {
    super(opts, {
      color: '#000',
      x: 0,
      ground: 100,
      width: 30,
      height: 100,
      jump: 300,
      speed: 3,
      offset: 0,
    });
  }

  get stages() {
    return [
      {stage: this._idle, length: 0.3},
      {stage: this._squash, length: 0.05},
      {stage: this._liftoff, length: 0.05},
      {stage: this._rise, length: 0.25},
      {stage: this._fall, length: 0.25},
      {stage: this._land, length: 0.05},
      {stage: this._recover, length: 0.05},
    ].map((spec) => {
      spec.stage = spec.stage.bind(this);
      return spec;
    });
  }

  draw(phase) {
    phase = phaseMod(phase, this.speed, this.offset);

    var phaseCount = 0;
    for (var {stage, length} of this.stages) {
      if (phaseCount + length > phase) {
        break;
      } else {
        phaseCount += length;
      }
    }

    var scaledPhase = (phase - phaseCount) / length;
    stage(scaledPhase, phase);

    return;
  }

  _drawMe(x, y, squish=1.0) {
    var w = this.width * squish;
    var h = this.height / squish;

    this.ctx.save();
    this.ctx.translate(this.x, this.ground);
    this.ctx.scale(1, -1);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x - w / 2, y, w, h);
    this.ctx.restore();
  }

  _idle(phase, realPhase) {
    this._drawMe(0, 0);
  }

  _squash(phase, realPhase) {
    var squish = phase * 0.2 + 1.0;
    this._drawMe(0, 0, squish);
  }

  _liftoff(phase, realPhase) {
    var squish = phase * -0.2 + 1.2;
    this._drawMe(0, 0, squish);
  }

  _rise(phase, realPhase) {
    var y = this.jump * (-Math.pow(phase, 2) + 2 * phase);
    var squish = phase * 0.4 + 0.9;
    this._drawMe(0, y, squish);
  }

  _fall(phase, realPhase) {
    var y = this.jump * (-Math.pow(phase, 2) + 1);
    var squish = phase * -0.2 + 1.3;
    this._drawMe(0, y, squish);
  }

  _land(phase) {
    var squish = phase * 0.2 + 1.1
    this._drawMe(0, 0, squish);
  }

  _recover(phase) {
    var squish = phase * -0.3 + 1.3;
    this._drawMe(0, 0, squish);
  }
}
