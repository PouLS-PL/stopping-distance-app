import { describe, expect, it } from "vitest";
import { calculateMeasure } from "../src/stoppingDistance.js";

function calculateIn(unit, speed = 50) {
  return calculateMeasure({
    speed,
    deceleration: 8,
    reactionTime: 1.35,
    condition: "Dry",
    brakingForce: 0,
    mass: 1500,
    stoppingDistanceUnit: unit,
  });
}

describe("stopping-distance result units", () => {
  it("converts the displayed distance to the selected unit", () => {
    expect(calculateIn("m").message).toBe("31 m");
    expect(calculateIn("ft").message).toBe("101.71 ft");
    expect(calculateIn("cars").message).toBe("7.75 cars");
    expect(calculateIn("s").message).toBe("2.23 s");
  });

  it("reports an error when seconds are selected at zero speed", () => {
    expect(calculateIn("s", 0).error).toBe(
      "Cannot convert stopping distance to seconds at zero speed",
    );
  });
});
