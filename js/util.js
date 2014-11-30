(function(exports) {
  exports.range = function(a, b) {
    if (b === undefined) {
      b = a;
      a = 0;
    }
    var acc = [];
    for (var i = a; i < b; i++) {
      acc.push(i);
    }
    return acc;
  };

  exports.rgba = function(r, g, b, a) {
    a = a || 1.0;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  };

  exports.hsla = function(h, s, l, a) {
    a = a || 1.0;
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  };
})(window.util = {});
