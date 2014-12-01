(function(exports) {
  'use strict';

  function Spinner(opts) {
    var defaults = {
      color: '#fff',
      ang: 0,
      magnitude: 150,
      radius: 150,
      offset: 0,
      speed: 1,
    };

    var key;
    for (key in opts) {
      defaults[key] = opts[key];
    }
    for (key in defaults) {
      this[key] = defaults[key];
    }
  }

  Spinner.prototype.draw = function(ctx, phase) {
    ctx.fillStyle = this.color;

    var t = ((phase * this.speed) + this.offset) % 1.0;
    t = Math.cos(Math.PI * 2 * t);
    var x = Math.cos(this.ang) * this.magnitude * t;
    var y = Math.sin(this.ang) * this.magnitude * t;

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  exports.RainbowFlower = function(canvas, debug) {
    this.canvas = canvas;
    this.debug = !!debug;

    var count = 7;
    var a = 3 / count;

    this.lines = util.range(count)
    .map(function(n) {
      var c = util.hsla(n / count * 360, 100, 50, a);
      return new Spinner({
        ang: Math.PI / count * 2 * n,
        color: c,
        magnitude: canvas.width / 4,
        radius: canvas.width / 4,
        speed: 2,
      });
    });

    this.ctx = canvas.getContext('2d');
  };

  exports.RainbowFlower.prototype.tick = function(phase) {
    this.ctx.save();
    {
      this.ctx.globalCompositeOperation = 'lighter';
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.rotate(phase * Math.PI * 2);
      for (var i = 0; i < this.lines.length; i++) {
        this.lines[i].draw(this.ctx, phase);
      }
    }
    this.ctx.restore();

  };
})(window.animations = window.animations || {});
