(function(exports) {
  'use strict';

  exports.Pulse = function(canvas) {
    this.canvas = canvas;

    var count = 16;

    var gridPoints = [];
    for (var y = 0; y < count; y++) {
      for (var x = 0; x < count; x++) {
        gridPoints.push({x: x, y: y});
      }
    }

    var margin = canvas.width / count / 8;
    var stride = (canvas.width - margin) / count;
    var size = stride - margin;
    var a = 1.0;

    this.boxes = gridPoints.map(function(point) {
      return new Box({
        color: util.rgba(255, 255, 255, a),
        size: size,
        speed: Math.floor(Math.random() * 3 + 1),
        x: margin + stride * point.x,
        y: margin + stride * point.y,
        offset: Math.random(),
      });
    });

    this.ctx = canvas.getContext('2d');
  };

  exports.Pulse.prototype.tick = function(phase) {
    for (var i = 0; i < this.boxes.length; i++) {
      this.boxes[i].draw(this.ctx, phase);
    }
  };

  function Box(opts) {
    var defaults = {
      color: '#fff',
      size: 150,
      offset: 0,
      speed: 1,
      x: 0,
      y: 0,
    };

    var key;
    for (key in opts) {
      defaults[key] = opts[key];
    }
    for (key in defaults) {
      this[key] = defaults[key];
    }
  }

  Box.prototype.draw = function(ctx, phase) {
    var x = this.x + this.size / 2;
    var y = this.y + this.size / 2;

    phase = cycles.phaseMod(phase, this.speed, this.offset);
    var s = cycles.cosNorm(phase) * 0.7 + 0.3;

    ctx.save();
    {
      ctx.fillStyle = this.color;
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.scale(this.size, this.size);
      ctx.fillRect(-0.5, -0.5, 1, 1);
    }
    ctx.restore();
  };

})(window.animations = window.animations || {});
