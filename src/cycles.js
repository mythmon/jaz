// A bunch of things that cycle over [0.0, 1.0)

export function cos(phase) {
  return Math.cos(phase * Math.PI * 2);
}

export function sin(phase) {
  return Math.sin(phase * Math.PI * 2);
}

export function cosNorm(phase) {
  return (Math.cos(phase * Math.PI * 2) + 1) / 2;
}

export function sinNorm(phase) {
  return (Math.sin(phase * Math.PI * 2) + 1) / 2;
}

export function phaseMod(phase, speed, offset=0) {
  return ((phase + offset) * speed) % 1.0;
}
