// Standard gravity in m/s^2
export const g = 9.80665;

export function calculateMeasure({ speed, incline = 0, deceleration, reactionTime, condition }) {
  const k = FRICTION_COEFFICIENTS[condition] ?? FRICTION_COEFFICIENTS.Dry;

  const numericSpeed = parseFloat(speed);
  const numericIncline = parseFloat(incline) || 0;
  const a = parseFloat(deceleration);
  const t = parseFloat(reactionTime);

  if (isNaN(numericSpeed)) {
    return { error: 'Invalid speed value provided' };
  }

  const v = kmh_to_ms(numericSpeed);;
  const distance = display_stopping_distance(v, a, t, k, numericIncline);

  console.log(`v = ${v}`);
  console.log(`a = ${a}`);
  console.log(`t = ${t}`);
  console.log(`incline = ${incline}`)

  return {
    distance,
    message: `Droga zatzymania: ${display_stopping_distance(v, a, t, k, numericIncline)} m`,
  };
}

// Friction coefficients based on surface conditions
export const FRICTION_COEFFICIENTS = {
  Dry: 0.9,
  Sun: 0.9,
  Sand: 0.55,
  Wet: 0.45,
  Rain: 0.45,
  Snow: 0.25,
  Ice: 0.1,
};

// Converts km/h to m/s
export function kmh_to_ms(v) {
  return (1000 * v) / 3600;
}

// Converts m/s to km/h
export function ms_to_kmh(v) {
  return v * 1000 * 3600;
}

// Converts fraction of g to m/s^2
export function g_to_ms2(ag) {
  return ag * g;
}

// Converts m/s^2 to fraction of g
export function ms2_to_g(a) {
  return a / g;
}

// v - speed in m/s
// a - deceleration in m/s^2 (do not use negative values)
export function braking_distance(v, a) {
  return (v * v) / (2 * a);
}

// v - speed in m/s
// t - total reaction time in seconds
// returns reaction distance in meters
export function reaction_distance(v, t) {
  return v * t;
}

// v - speed in m/s
// a - deceleration in m/s^2 (do not use negative values)
// t - total reaction time in seconds
export function stopping_distance(v, a, t) {
  return reaction_distance(v, t) + braking_distance(v, a);
}

// F - total braking force in Newtons
// m - total mass in kg
// returns deceleration in m/s^2
export function calculate_deceleration(F, m) {
  return F / m;
}

// v - speed in m/s
// a - deceleration in m/s^2 on a level road with dry surface
// t - total reaction time in seconds
// k - friction coefficient (default 0.9 for dry surface)
// incline - incline in slope % (positive = car goes up)
// returns stopping distance rounded up
export function display_stopping_distance(v, a, t, k = 0.9, incline = 0.0) {
  a = a / 0.9;
  a = a * k;
  a = a + g * Math.sin(Math.atan(incline / 100));
  console.log(`after deceleration calculation: a = ${a}`);
  console.log(`reaction distance = ${reaction_distance(v, t)}`);
  console.log(`braking distance = ${braking_distance(v, a)}`);

  return Math.ceil(stopping_distance(v, a, t));
}