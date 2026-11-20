import { describe, expect, it } from "vitest";
import {
  STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
  STANDARD_CAR_LENGTH_METERS,
  convertBrakingForce,
  convertDeceleration,
  convertIncline,
  convertReactionTime,
  convertSpeed,
  convertStoppingDistance,
  convertVehicleMass,
  g_to_ms2,
  kmh_to_ms,
  ms2_to_g,
  ms_to_kmh,
} from "../src/unitConversion.js";

describe("unit conversions", () => {
  describe("speed", () => {
    it("converts between km/h, mph, and m/s", () => {
      // Arrange
      const speed = 100;

      // Act
      const metersPerSecond = convertSpeed(speed, "km/h", "m/s");
      const milesPerHour = convertSpeed(speed, "km/h", "mph");

      // Assert
      expect(metersPerSecond).toBeCloseTo(27.7777778);
      expect(milesPerHour).toBeCloseTo(62.1371192);
    });

    it("converts using the km/h and m/s helper functions", () => {
      // Arrange
      const speed = 72;

      // Act
      const metersPerSecond = kmh_to_ms(speed);
      const kilometersPerHour = ms_to_kmh(metersPerSecond);

      // Assert
      expect(metersPerSecond).toBe(20);
      expect(kilometersPerHour).toBe(speed);
    });
  });

  describe("stopping distance", () => {
    it("converts between meters and standard car lengths", () => {
      // Arrange
      const carLength = 1;

      // Act
      const meters = convertStoppingDistance(carLength, "car", "m");
      const carLengths = convertStoppingDistance(meters, "m", "car");

      // Assert
      expect(STANDARD_CAR_LENGTH_METERS).toBe(4);
      expect(meters).toBe(4);
      expect(carLengths).toBe(carLength);
    });

    it("converts between distance and seconds at the current speed", () => {
      // Arrange
      const speedMetersPerSecond = 20;
      const seconds = 2;

      // Act
      const meters = convertStoppingDistance(
        seconds,
        "s",
        "m",
        speedMetersPerSecond,
      );
      const carLengths = convertStoppingDistance(
        seconds,
        "s",
        "car",
        speedMetersPerSecond,
      );
      const convertedSeconds = convertStoppingDistance(
        meters,
        "m",
        "s",
        speedMetersPerSecond,
      );

      // Assert
      expect(meters).toBe(40);
      expect(carLengths).toBe(10);
      expect(convertedSeconds).toBe(seconds);
      expect(convertStoppingDistance(seconds, "s", "s")).toBe(seconds);
    });

    it("requires a positive finite speed when converting seconds", () => {
      // Arrange
      const invalidSpeeds = [undefined, 0, -1, Infinity, NaN];

      // Act
      const conversions = invalidSpeeds.map(
        (speed) => () => convertStoppingDistance(2, "s", "m", speed),
      );

      // Assert
      conversions.forEach((conversion) =>
        expect(conversion).toThrow(RangeError),
      );
    });
  });

  describe("incline", () => {
    it("converts between percent slope and degrees", () => {
      // Arrange
      const incline = 100;

      // Act
      const degrees = convertIncline(incline, "%", "°");
      const percent = convertIncline(degrees, "°", "%");

      // Assert
      expect(degrees).toBeCloseTo(45);
      expect(percent).toBeCloseTo(incline);
    });
  });

  describe("deceleration", () => {
    it("converts between standard gravity and meters per second squared", () => {
      // Arrange
      const gravity = 1;

      // Act
      const metersPerSecondSquared = convertDeceleration(gravity, "g", "m/s²");

      // Assert
      expect(STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED).toBe(9.80665);
      expect(metersPerSecondSquared).toBe(9.80665);
      expect(g_to_ms2(gravity)).toBe(9.80665);
      expect(ms2_to_g(metersPerSecondSquared)).toBe(gravity);
    });
  });

  describe("reaction time", () => {
    it("converts between seconds and milliseconds", () => {
      // Arrange
      const seconds = 1.25;

      // Act
      const milliseconds = convertReactionTime(seconds, "s", "ms");
      const convertedSeconds = convertReactionTime(milliseconds, "ms", "s");

      // Assert
      expect(milliseconds).toBe(1250);
      expect(convertedSeconds).toBe(seconds);
    });
  });

  describe("braking force", () => {
    it("converts between newtons, kilogram-force, kilonewtons, and pounds-force", () => {
      // Arrange
      const forceInKilogramForce = 2;

      // Act
      const newtons = convertBrakingForce(forceInKilogramForce, "kgf", "N");
      const poundsForce = convertBrakingForce(newtons, "N", "lbf");
      const kilonewtons = convertBrakingForce(2000, "N", "kN");

      // Assert
      expect(newtons).toBeCloseTo(
        forceInKilogramForce * STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
      );
      expect(poundsForce).toBeCloseTo(4.40925, 4);
      expect(kilonewtons).toBe(2);
    });
  });

  describe("vehicle mass", () => {
    it("converts between kilograms, tonnes, and pounds", () => {
      // Arrange
      const tonnes = 1.5;

      // Act
      const kilograms = convertVehicleMass(tonnes, "t", "kg");
      const convertedTonnes = convertVehicleMass(kilograms, "kg", "t");
      const pounds = convertVehicleMass(kilograms, "kg", "lb");

      // Assert
      expect(kilograms).toBe(1500);
      expect(convertedTonnes).toBe(tonnes);
      expect(pounds).toBeCloseTo(3306.934, 2);
    });
  });

  describe("unsupported units", () => {
    it.each([
      ["speed", () => convertSpeed(1, "km/h", "knots")],
      ["stopping distance", () => convertStoppingDistance(1, "km", "m")],
      ["incline", () => convertIncline(1, "radians", "%")],
      ["deceleration", () => convertDeceleration(1, "g", "ft/s²")],
      ["reaction time", () => convertReactionTime(1, "minutes", "s")],
      ["braking force", () => convertBrakingForce(1, "N", "stone")],
      ["vehicle mass", () => convertVehicleMass(1, "stone", "kg")],
    ])("rejects an unsupported %s unit", (_section, convert) => {
      // Arrange
      const conversion = convert;

      // Act
      const attemptConversion = () => conversion();

      // Assert
      expect(attemptConversion).toThrow(RangeError);
    });
  });
});
