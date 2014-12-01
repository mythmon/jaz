// A bunch of things that cycle over [0.0, 1.0)
(function(exports) {
  exports.cos = function(phase) {
    return Math.cos(phase * Math.PI * 2);
  };

  exports.cosNorm = function(phase) {
    return (Math.cos(phase * Math.PI * 2) + 1) / 2;
  };

  exports.phaseMod = function(phase, speed, offset) {
    return ((phase + offset) * speed) % 1.0;
  };
})(window.cycles = {});
