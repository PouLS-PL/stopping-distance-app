import { describe, expect, it } from "vitest";
import {
  STANDARD_GRAVITY_METERS_PER_SECOND_SQUARED,
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
    it("converts between meters, kilometers, feet, and miles", () => {
      // Arrange
      const distance = 1;

      // Act
      const metersFromKilometer = convertStoppingDistance(distance, "km", "m");
      const metersFromFoot = convertStoppingDistance(distance, "ft", "m");
      const kilometersFromMile = convertStoppingDistance(distance, "mi", "km");

      // Assert
      expect(metersFromKilometer).toBe(1000);
      expect(metersFromFoot).toBeCloseTo(0.3048);
      expect(kilometersFromMile).toBeCloseTo(1.609344);
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
    it("converts between newtons, kilonewtons, and pounds-force", () => {
      // Arrange
      const forceInKilonewtons = 2;

      // Act
      const newtons = convertBrakingForce(forceInKilonewtons, "kN", "N");
      const poundsForce = convertBrakingForce(newtons, "N", "lbf");

      // Assert
      expect(newtons).toBe(2000);
      expect(poundsForce).toBeCloseTo(449.6179, 3);
    });
  });

  describe("vehicle mass", () => {
    it("converts between kilograms and pounds", () => {
      // Arrange
      const pounds = 100;

      // Act
      const kilograms = convertVehicleMass(pounds, "lb", "kg");

      // Assert
      expect(kilograms).toBeCloseTo(45.359237);
    });
  });

  describe("unsupported units", () => {
    it.each([
      ["speed", () => convertSpeed(1, "km/h", "knots")],
      ["stopping distance", () => convertStoppingDistance(1, "yd", "m")],
      ["incline", () => convertIncline(1, "radians", "%")],
      ["deceleration", () => convertDeceleration(1, "g", "ft/s²")],
      ["reaction time", () => convertReactionTime(1, "minutes", "s")],
      ["braking force", () => convertBrakingForce(1, "N", "kgf")],
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
