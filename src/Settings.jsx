import React from "react";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export default function Settings({ onBack }) {
  return (
    <section
      className="settings"
      style={{ padding: "20px", background: "#f0f0f0", color: "#000" }}
    >
      <h2>Ustawienia aplikacji</h2>

      <button onClick={onBack}>Powrót</button>
    </section>
  );
}

export async function SaveSettingsToFile(
  newDeceleration,
  newReactionTime,
  newBrakingForce,
  newMass,
  newUseBrakingForce,
) {
  // Early return if we are not on a mobile device
  if (!Capacitor.isNativePlatform()) {
    console.log("Not on a mobile device; skipping file save.");
    return;
  }

  const settingsData = {
    deceleration: newDeceleration,
    reactionTime: newReactionTime,
    brakingForce: newBrakingForce,
    mass: newMass,
    useBrakingForce: newUseBrakingForce,
    updatedAt: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(settingsData, null, 2);

  try {
    // 2. Save using Capacitor Filesystem
    await Filesystem.writeFile({
      path: "settings.json",
      data: jsonString,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    console.log("Settings successfully saved to file!");
  } catch (error) {
    console.error("Failed to save settings file:", error);
  }
}

export async function LoadSettingsFromFile() {
  // Early return if we are not on a native mobile device
  if (!Capacitor.isNativePlatform()) {
    console.log("Not on a mobile device; returning empty settings.");
    return [];
  }

  try {
    // Read the file contents
    const fileResult = await Filesystem.readFile({
      path: "settings.json",
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    // Parse the JSON string back into an object
    const settings = JSON.parse(fileResult.data);

    // Return them as an array in the exact order you saved them
    return [
      settings.deceleration,
      settings.reactionTime,
      settings.brakingForce,
      settings.mass,
      settings.useBrakingForce,
    ];
  } catch (error) {
    // This will typically trigger if the file hasn't been created yet (first launch)
    console.warn("Could not load settings file (may not exist yet):", error);
    return [];
  }
}
