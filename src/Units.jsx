import { useState } from "react";
import { DEFAULT_UNITS } from "./unitSettings";

const UNIT_OPTIONS = {
  speed: ["km/h", "mph", "m/s"],
  stoppingDistance: ["m", "sv", "cars"],
  incline: ["%", "°"],
  deceleration: ["m/s²", "g"],
  reactionTime: ["s"],
  brakingForce: ["N", "kgf", "lbf"],
  mass: ["kg", "t", "lb"],
};

const UNIT_LABELS = {
  en: {
    speed: "Speed",
    stoppingDistance: "Stopping distance",
    incline: "Incline",
    deceleration: "Deceleration",
    reactionTime: "Reaction time",
    brakingForce: "Braking force",
    mass: "Vehicle mass",
  },
  pl: {
    speed: "Prędkość",
    stoppingDistance: "Droga zatrzymania",
    incline: "Nachylenie",
    deceleration: "Opóźnienie",
    reactionTime: "Czas reakcji",
    brakingForce: "Siła hamowania",
    mass: "Masa pojazdu",
  },
};

export default function Units({ initialUnits, lang, t, onSaveAndBack }) {
  const [units, setUnits] = useState(() => {
    const savedUnits = { ...DEFAULT_UNITS, ...initialUnits };
    return Object.fromEntries(
      Object.entries(UNIT_OPTIONS).map(([element, options]) => [
        element,
        options.includes(savedUnits[element])
          ? savedUnits[element]
          : DEFAULT_UNITS[element],
      ]),
    );
  });
  const labels = UNIT_LABELS[lang] || UNIT_LABELS.en;

  const handleUnitChange = (element, newUnit) => {
    const oldUnit = units[element];
    if (newUnit === oldUnit) {
      return;
    }

    console.log("Unit changed:", element, oldUnit, newUnit);
    setUnits((currentUnits) => ({ ...currentUnits, [element]: newUnit }));
  };

  return (
    <section className="settings">
      <h2>{t.unitsTitle}</h2>
      {Object.entries(UNIT_OPTIONS).map(([element, options]) => (
        <p key={element}>
          <label htmlFor={`unit-${element}`}>{labels[element]} </label>
          <select
            id={`unit-${element}`}
            value={units[element]}
            onChange={(event) => handleUnitChange(element, event.target.value)}
          >
            {options.map((unit) => (
              <option key={unit} value={unit}>
                {t.unitNames?.[element]?.[unit] ?? unit}
              </option>
            ))}
          </select>
        </p>
      ))}
      <p>
        <button onClick={() => onSaveAndBack(units)}>{t.back}</button>
      </p>
    </section>
  );
}
