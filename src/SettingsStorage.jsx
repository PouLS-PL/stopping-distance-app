import { Capacitor } from "@capacitor/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export async function SaveSettingsToFile(settings) {
  if (!Capacitor.isNativePlatform()) {
    console.log("Not on a mobile device; skipping file save.");
    return;
  }

  const settingsData = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  try {
    await Filesystem.writeFile({
      path: "settings.json",
      data: JSON.stringify(settingsData, null, 2),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    console.log("Settings successfully saved to file!");
  } catch (error) {
    console.error("Failed to save settings file:", error);
  }
}

export async function LoadSettingsFromFile() {
  if (!Capacitor.isNativePlatform()) {
    console.log("Not on a mobile device; returning empty settings.");
    return null;
  }

  try {
    const fileResult = await Filesystem.readFile({
      path: "settings.json",
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    return JSON.parse(fileResult.data);
  } catch (error) {
    console.warn("Could not load settings file (may not exist yet):", error);
    return null;
  }
}
