export class OptLoader {
  constructor(opts, defaults={}) {
    var key;
    for (key in opts) {
      defaults[key] = opts[key];
    }
    for (key in defaults) {
      this[key] = defaults[key];
    }
  }
}

export class Animation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }
}

export class GridAnimation extends Animation {
  constructor(canvas, count) {
    super(canvas);

    this.gridPoints = [];
    for (var y = 0; y < this.count; y++) {
      for (var x = 0; x < this.count; x++) {
        this.gridPoints.push({x, y});
      }
    }

    this.items = [];
    for (var gp of this.gridPoints) {
      let item = this.makeItem(gp);
      if (item instanceof Array) {
        this.items = this.items.concat(item);
      } else {
        this.items.push(item);
      }
    }
  }

  get count() {
    return 4;
  }

  get stride() {
    return this.canvas.width / this.count;
  }

  makeItem() {
    return {draw: function(){}};
  }

  tick(phase) {
    for (var item of this.items) {
      item.draw(phase);
    }
  }
}
