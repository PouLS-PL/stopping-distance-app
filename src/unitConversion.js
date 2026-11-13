// ==========================================
// CONSTANTS AND CONVERSION HELPERS
// ==========================================

export const STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED = 9.80665;
export const STANDARD_CAR_LENGTH_METERS = 4;

function getConversion(value, conversions, fromUnit, toUnit, section) {
  const from = conversions[fromUnit];
  const to = conversions[toUnit];

  if (!from || !to) {
    throw new RangeError(
      `Unsupported ${section} unit conversion: ${fromUnit} to ${toUnit}`,
    );
  }

  return to.fromBase(from.toBase(value));
}

// ==========================================
// SPEED CONVERSIONS
// ==========================================

// Speed conversions use kilometers per hour as the base unit.
// Convert any supported speed unit to kilometers per hour, then to the target unit.
const SPEED_CONVERSIONS = {
  "km/h": {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  mph: {
    toBase: (value) => value * 1.609344,
    fromBase: (value) => value / 1.609344,
  },
  "m/s": {
    toBase: (value) => value * 3.6,
    fromBase: (value) => value / 3.6,
  },
};

export function convertSpeed(value, fromUnit, toUnit) {
  return getConversion(value, SPEED_CONVERSIONS, fromUnit, toUnit, "speed");
}

export function kmh_to_ms(value) {
  return convertSpeed(value, "km/h", "m/s");
}

export function ms_to_kmh(value) {
  return convertSpeed(value, "m/s", "km/h");
}

// ==========================================
// STOPPING DISTANCE CONVERSIONS
// ==========================================

// Stopping distance conversions use meters as the base unit.
const STOPPING_DISTANCE_CONVERSIONS = {
  m: {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  car: {
    toBase: (value) => value * STANDARD_CAR_LENGTH_METERS,
    fromBase: (value) => value / STANDARD_CAR_LENGTH_METERS,
  },
};

export function convertStoppingDistance(
  value,
  fromUnit,
  toUnit,
  speedMetersPerSecond,
) {
  const supportedUnits = ["m", "s", "car"];
  if (!supportedUnits.includes(fromUnit) || !supportedUnits.includes(toUnit)) {
    return getConversion(
      value,
      STOPPING_DISTANCE_CONVERSIONS,
      fromUnit,
      toUnit,
      "stopping distance",
    );
  }

  if (fromUnit === toUnit) {
    return value;
  }

  if (fromUnit === "s" || toUnit === "s") {
    if (!Number.isFinite(speedMetersPerSecond) || speedMetersPerSecond <= 0) {
      throw new RangeError(
        "A positive finite speed in meters per second is required to convert stopping distance seconds",
      );
    }

    return getConversion(
      value,
      {
        ...STOPPING_DISTANCE_CONVERSIONS,
        s: {
          toBase: (seconds) => seconds * speedMetersPerSecond,
          fromBase: (meters) => meters / speedMetersPerSecond,
        },
      },
      fromUnit,
      toUnit,
      "stopping distance",
    );
  }

  return getConversion(
    value,
    STOPPING_DISTANCE_CONVERSIONS,
    fromUnit,
    toUnit,
    "stopping distance",
  );
}

// ==========================================
// INCLINE CONVERSIONS
// ==========================================

// Incline conversions use percent slope as the base unit.
// Degrees are converted to percent slope using tan(angle) * 100.
const INCLINE_CONVERSIONS = {
  "%": {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  "°": {
    toBase: (value) => Math.tan((value * Math.PI) / 180) * 100,
    fromBase: (value) => (Math.atan(value / 100) * 180) / Math.PI,
  },
};

// Converts between percent slope and degrees of incline.
export function convertIncline(value, fromUnit, toUnit) {
  return getConversion(value, INCLINE_CONVERSIONS, fromUnit, toUnit, "incline");
}

// ==========================================
// DECELERATION CONVERSIONS
// ==========================================

// Deceleration conversions use meters per second squared as the base unit.
// Standard gravity is defined as 9.80665 meters per second squared.
const DECELERATION_CONVERSIONS = {
  "m/s²": {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  g: {
    toBase: (value) => value * STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
    fromBase: (value) => value / STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
  },
};

// Converts between meters per second squared and standard gravity.
export function convertDeceleration(value, fromUnit, toUnit) {
  return getConversion(
    value,
    DECELERATION_CONVERSIONS,
    fromUnit,
    toUnit,
    "deceleration",
  );
}

// Converts standard gravity to meters per second squared.
export function g_to_ms2(value) {
  return convertDeceleration(value, "g", "m/s²");
}

// Converts meters per second squared to standard gravity.
export function ms2_to_g(value) {
  return convertDeceleration(value, "m/s²", "g");
}

// ==========================================
// REACTION TIME CONVERSIONS
// ==========================================

// Reaction time conversions use seconds as the base unit.
const REACTION_TIME_CONVERSIONS = {
  s: {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  ms: {
    toBase: (value) => value / 1000,
    fromBase: (value) => value * 1000,
  },
};

// Converts between seconds and milliseconds.
export function convertReactionTime(value, fromUnit, toUnit) {
  return getConversion(
    value,
    REACTION_TIME_CONVERSIONS,
    fromUnit,
    toUnit,
    "reaction time",
  );
}

// ==========================================
// BRAKING FORCE CONVERSIONS
// ==========================================

// Braking force conversions use newtons as the base unit.
const BRAKING_FORCE_CONVERSIONS = {
  N: {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  kN: {
    toBase: (value) => value * 1000,
    fromBase: (value) => value / 1000,
  },
  kgf: {
    toBase: (value) => value * STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
    fromBase: (value) => value / STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
  },
  lbf: {
    toBase: (value) => value * 4.4482216152605,
    fromBase: (value) => value / 4.4482216152605,
  },
};

// Converts between newtons, kilonewtons, kilogram-force, and pounds-force.
export function convertBrakingForce(value, fromUnit, toUnit) {
  return getConversion(
    value,
    BRAKING_FORCE_CONVERSIONS,
    fromUnit,
    toUnit,
    "braking force",
  );
}

// ==========================================
// VEHICLE MASS CONVERSIONS
// ==========================================

// Vehicle mass conversions use kilograms as the base unit.
const VEHICLE_MASS_CONVERSIONS = {
  kg: {
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  t: {
    toBase: (value) => value * 1000,
    fromBase: (value) => value / 1000,
  },
  lb: {
    toBase: (value) => value * 0.45359237,
    fromBase: (value) => value / 0.45359237,
  },
};

//  Converts between kilograms and pounds.
export function convertVehicleMass(value, fromUnit, toUnit) {
  return getConversion(
    value,
    VEHICLE_MASS_CONVERSIONS,
    fromUnit,
    toUnit,
    "vehicle mass",
  );
}
