export function range(a, b) {
  if (b === undefined) {
    b = a;
    a = 0;
  }
  var acc = [];
  for (var i = a; i < b; i++) {
    acc.push(i);
  }
  return acc;
}

export function rgba(r, g, b, a) {
  a = a || 1.0;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

export function hsla(h, s, l, a) {
  a = a || 1.0;
  return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
}

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
  if (speed < 0) {
    speed = -speed;
    phase = 1 - phase;
  }
  phase = (phase * speed) % 1.0 + offset;
  // This is sort of like %, but different when phase is negative.
  while (phase < 0) {
    phase += 1;
  }
  while (phase > 1) {
    phase -= 1;
  }
  return phase;
}

// Given a phase, "wrap" that around a square, and give the x/y coordinates of the result.
export function squareWalk(phase, mult=1) {
  if (phase < 0.25) {
    // top edge
    return [mult * phase * 4, 0];
  } else if (phase < 0.5) {
    // right edge
    return [mult, mult * (phase - 0.25) * 4];
  } else if (phase < 0.75) {
    // bottom edge
    return [mult * (0.75 - phase) * 4, mult];
  } else {
    // left edge
    return [0, mult * (1 - phase) * 4];
  }
}

/* Given an x/y coordinate, give the phase around a square that would
 * make that x/y pair. Consider a square. numbered like such.
 *
 *   1--2
 *   |  |
 *   4--3
 *
 * Now imagine this squares tile the plain like
 *
 *   1--2--1--2--1--2
 *   |  |  |  |  |  |
 *   4--3--4--3--4--3
 *   |  |  |  |  |  |
 *   1--2--1--2--1--2
 *   |  |  |  |  |  |
 *   4--3--4--3--4--3
 *
 * where the top left corner is (0, 0), the x axis grows to the right, and
 * the y axis grows down.
 *
 * The formula
 *
 *     f(x, y) = (y % 2) * 2 + (x % 2) ^ (y % 2)
 *
 * gives the numbers at the grid points, where ^ is the xor operator.. This
 * is related to grey codes, hamiltonian cycles of squares (and hypercubes),
 * and I figured it out with * kmaps.
 *
 * Dividing this by 4 gives [0, 0.25, 0.5, 0.75], which makes the offsets
 * to get the squares to move around like I wanted.
 */
export function squareWalkInv(x, y) {
  return ((y % 2) * 2 + (x % 2) ^ (y % 2)) / 4;
}
