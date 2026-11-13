import { useState, useEffect } from "react";
import { calculateMeasure } from "./stoppingDistance";
import { SpeedTracker, useSpeedTracker } from "./SpeedMeasurement";
import { SaveSettingsToFile, LoadSettingsFromFile } from "./SettingsStorage";
import Units from "./Units";
import { DEFAULT_UNITS } from "./unitSettings";
import { translations } from "./translations.jsx";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// const translations = {
//     en: {
//         test: "English text",
//         settingsTitle: "Settings",

//     },
//     pl: {
//         test: "polski tekst",
//         settingsTitle: "Ustawienia",
//     }
// };
// ==========================================
// KOMPONENT: MODAL (OKNO INFORMACYJNE)
// ==========================================
function Modal({ onClose, children }) {
  return (
    <section
      className="modal-backdrop"
      onClick={onClose} // Zamknięcie po kliknięciu w tło
    >
      <section
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Zatrzymanie zamykania przy kliknięciu w treść
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </section>
    </section>
  );
}

// ==========================================
// KOMPONENT: SETTINGS (USTAWIENIA)
// ==========================================
function Settings({
  initialDeceleration,
  initialReactionTime,
  initialBrakingForce,
  initialMass,
  initialUseBrakingForce,
  onSaveAndBack,
  onOpenUnits,
  t,
}) {
  const [localDeceleration, setLocalDeceleration] =
    useState(initialDeceleration);
  const [localReactionTime, setLocalReactionTime] =
    useState(initialReactionTime);
  const [localBrakingForce, setLocalBrakingForce] =
    useState(initialBrakingForce);
  const [localMass, setLocalMass] = useState(initialMass);
  const [localUseBrakingForce, setLocalUseBrakingForce] = useState(
    initialUseBrakingForce,
  );

  // Stan przechowujący informację, który modal ma być otwarty
  const [activeModal, setActiveModal] = useState(null);

  const handleSaveAndBack = () => {
    onSaveAndBack(
      localDeceleration,
      localReactionTime,
      localBrakingForce,
      localMass,
      localUseBrakingForce,
    );
  };

  const handleOpenUnits = () => {
    onOpenUnits(
      localDeceleration,
      localReactionTime,
      localBrakingForce,
      localMass,
      localUseBrakingForce,
    );
  };

  return (
    <section className="settings">
      <h2>{t.appSettings}</h2>
      {/* <h2>{t.test}</h2> */}

      <p>
        <label htmlFor="deceleration">{t.deceleration} </label>
        <input
          type="number"
          id="deceleration"
          value={localDeceleration}
          onChange={(e) => setLocalDeceleration(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA DLA OPÓŹNIENIA */}
        <span
          className="info-icon"
          onClick={() => setActiveModal("deceleration")}
        >
          ?
        </span>
      </p>

      <p>
        <label htmlFor="reactionTime">{t.reactionTime}</label>
        <input
          type="number"
          id="reactionTime"
          value={localReactionTime}
          onChange={(e) => setLocalReactionTime(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA DLA CZASU REAKCJI */}
        <span
          className="info-icon"
          onClick={() => setActiveModal("reactionTime")}
        >
          ?
        </span>
      </p>
      <p>
        <input
          type="checkbox"
          id="useBrakingForce"
          checked={localUseBrakingForce}
          onChange={(e) => setLocalUseBrakingForce(e.target.checked)}
        />
        <label htmlFor="useBrakingForce">{t.altCalcMethod}</label>{" "}
      </p>
      <p>
        <label htmlFor="brakingForce">{t.brakingForce}</label>
        <input
          type="number"
          id="brakingForce"
          value={localBrakingForce}
          onChange={(e) => setLocalBrakingForce(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA */}
        <span
          className="info-icon"
          onClick={() => setActiveModal("brakingForce")}
        >
          ?
        </span>{" "}
      </p>

      <p>
        <label htmlFor="mass">{t.mass}</label>
        <input
          type="number"
          id="mass"
          value={localMass}
          onChange={(e) => setLocalMass(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA */}
        <span className="info-icon" onClick={() => setActiveModal("mass")}>
          ?
        </span>{" "}
      </p>

      <p>
        <button onClick={handleOpenUnits}>{t.unitsTitle}</button>
      </p>

      <p>
        <button onClick={handleSaveAndBack}>{t.back}</button>
      </p>

      {/* RENDEROWANIE MODALI */}
      {activeModal === "deceleration" && (
        <Modal onClose={() => setActiveModal(null)}>
          {t.decelerationModal}
        </Modal>
      )}

      {activeModal === "reactionTime" && (
        <Modal onClose={() => setActiveModal(null)}>
          {t.reactionTimeModal}
        </Modal>
      )}

      {activeModal === "brakingForce" && (
        <Modal onClose={() => setActiveModal(null)}>
          {t.brakingForceModal}
        </Modal>
      )}

      {activeModal === "mass" && (
        <Modal onClose={() => setActiveModal(null)}>{t.massModal}</Modal>
      )}
    </section>
  );
}

// ==========================================
// KOMPONENT: APP (GŁÓWNY)
// ==========================================
function App() {
  // Use your existing hook to remember the choice (defaults to "pl")
  const [lang, setLang] = useLocalStorage("appLang", "pl");
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === "pl" ? "en" : "pl");
  };
  const [page, setPage] = useState(1);
  const [condition, setCondition] = useState("Dry");
  const [deceleration, setDeceleration] = useState(8.0);
  const [reactionTime, setReactionTime] = useState(1.35);
  const [brakingForce, setBrakingForce] = useState(0.0);
  const [mass, setMass] = useState(0.0);
  const [message, setMessage] = useState("");
  const [incline, setIncline] = useState(0);
  const [speed, setSpeed] = useState(40);
  const [speedFromGPS, setSpeedFromGPS] = useState(true);
  const [isFocusedSpeed, setIsFocusedSpeed] = useState(false);
  const [isFocusedIncline, setIsFocusedIncline] = useState(false);
  const [useBrakingForce, setUseBrakingForce] = useState(false);
  const [units, setUnits] = useState(DEFAULT_UNITS);

  const { speedGPS, status } = useSpeedTracker();

  useEffect(() => {
    async function fetchSettings() {
      const savedSettings = await LoadSettingsFromFile();

      if (savedSettings) {
        if (savedSettings.deceleration !== undefined) {
          setDeceleration(savedSettings.deceleration);
        }
        if (savedSettings.reactionTime !== undefined) {
          setReactionTime(savedSettings.reactionTime);
        }
        if (savedSettings.brakingForce !== undefined) {
          setBrakingForce(savedSettings.brakingForce);
        }
        if (savedSettings.mass !== undefined) {
          setMass(savedSettings.mass);
        }
        if (savedSettings.useBrakingForce !== undefined) {
          setUseBrakingForce(savedSettings.useBrakingForce);
        }
        if (savedSettings.units) {
          setUnits({ ...DEFAULT_UNITS, ...savedSettings.units });
        }
      }
    }

    fetchSettings();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Stan przechowujący informację o otwartym oknie informacyjnym na głównej stronie
  const [activeModal, setActiveModal] = useState(null);

  const buttonOptions = [-15, -10, -7, 0, 6, 8, 15];

  const activeSpeed = speedFromGPS
    ? typeof speedGPS === "number"
      ? speedGPS
      : speed
    : speed;

  useEffect(() => {
    handleMeasure();
  }, [
    speed,
    speedGPS,
    speedFromGPS,
    incline,
    deceleration,
    reactionTime,
    condition,
    brakingForce,
    mass,
    useBrakingForce,
  ]);

  useEffect(() => {
    if (speedFromGPS && page === 1) {
      if (typeof speedGPS === "number") {
        setSpeed(speedGPS);
      }
    }
  }, [speedGPS, speedFromGPS, page]);

  const handleMeasure = () => {
    const currentSpeed = speedFromGPS
      ? typeof speedGPS === "number"
        ? speedGPS
        : speed
      : speed;
    const result = calculateMeasure({
      speed: currentSpeed,
      incline,
      deceleration,
      reactionTime,
      condition,
      brakingForce,
      mass,
      useBrakingForce,
    });
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(result.message);
    }
  };

  useEffect(() => {
    handleMeasure();
  }, [
    speed,
    speedGPS,
    speedFromGPS,
    incline,
    deceleration,
    reactionTime,
    condition,
  ]);

  useEffect(() => {
    if (speedFromGPS && page === 1) {
      if (typeof speedGPS === "number") {
        setSpeed(speedGPS);
      }
    }
  }, [speedGPS, speedFromGPS, page]);

  return (
    <section className="main">
      {page === 1 ? (
        <>
          {/* Language Toggle Button */}
          <button onClick={toggleLanguage} className="lang-toggle-btn">
            {lang === "pl" ? "EN" : "PL"}
          </button>
          <button
            onClick={() => {
              const nextGPS = !speedFromGPS;
              setSpeedFromGPS(nextGPS);
              if (nextGPS && typeof speedGPS === "number") {
                setSpeed(speedGPS);
              }
            }}
          >
            {speedFromGPS ? "GPS ✓" : "GPS ✗"}
          </button>
          <button onClick={() => setPage(2)}>{t.settingsTitle}</button>

          <h1>
            <strong>{message || "Click the button"}</strong>
          </h1>
          <SpeedTracker />

          <section className="incline">
            <span>Prędkość: </span>
            <input
              type="range"
              min="0"
              max="160"
              value={speedFromGPS ? Math.round(activeSpeed) : speed}
              onChange={(e) => {
                setSpeed(Number(e.target.value));
                setSpeedFromGPS(false);
              }}
            />
            <input
              type={isFocusedSpeed ? "number" : "text"}
              value={
                isFocusedSpeed
                  ? speedFromGPS
                    ? Math.round(activeSpeed)
                    : speed
                  : `${speedFromGPS ? (typeof activeSpeed === "number" ? activeSpeed.toFixed(1) : activeSpeed) : speed} km/h`
              }
              onFocus={() => setIsFocusedSpeed(true)}
              onBlur={() => setIsFocusedSpeed(false)}
              onChange={(e) => {
                setSpeed(Number(e.target.value));
                setSpeedFromGPS(false);
              }}
            />
          </section>

          <section className="incline">
            <span>{t.incline}</span>
            <input
              type="range"
              min="-15"
              max="15"
              value={incline}
              onChange={(e) => setIncline(e.target.value)}
            />
            <input
              type={isFocusedIncline ? "number" : "text"}
              value={isFocusedIncline ? incline : `${incline}%`}
              onFocus={() => setIsFocusedIncline(true)}
              onBlur={() => setIsFocusedIncline(false)}
              onChange={(e) => setIncline(Number(e.target.value))}
            />

            <span
              className="info-icon"
              onClick={() => setActiveModal("incline")}
            >
              ?
            </span>
          </section>

          <section className="inclineQuickButtons">
            {buttonOptions.map((num) => (
              <button
                key={num}
                onClick={() => setIncline(num)}
                className={`InclineButton_${incline === num ? "active" : ""}`}
              >
                {num}%
              </button>
            ))}
          </section>
          <section className="road-signs">
            <img src="/A-22.png" />
            <img src="/A-23.png" />
          </section>
          <section className="Conditions">
            {/* Tooltip Icon Container */}
            <section className="conditions-tooltip-row">
              <span
                className="info-icon conditions-info-icon"
                onClick={() => setActiveModal("condition")}
              >
                ?
              </span>
            </section>

            {/* Buttons Container */}
            <section className="conditions-buttons">
              <button
                className={`condition-button ${condition === "Dry" ? "active" : ""}`}
                onClick={() => setCondition("Dry")}
              >
                <img
                  className="condition-icon"
                  src="/weather_symbols_sunny.png"
                />
              </button>

              <button
                className={`condition-button ${condition === "Sand" ? "active" : ""}`}
                onClick={() => setCondition("Sand")}
              >
                <img
                  className="condition-icon condition-icon-sand"
                  src="/heap-of-sand.png"
                />
              </button>

              <button
                className={`condition-button ${condition === "Wet" ? "active" : ""}`}
                onClick={() => setCondition("Wet")}
              >
                <img
                  className="condition-icon"
                  src="/weather_symbols_rain.png"
                />
              </button>

              <button
                className={`condition-button ${condition === "Snow" ? "active" : ""}`}
                onClick={() => setCondition("Snow")}
              >
                <img
                  className="condition-icon"
                  src="/weather_symbols_snow.png"
                />
              </button>

              <button
                className={`condition-button ${condition === "Ice" ? "active" : ""}`}
                onClick={() => setCondition("Ice")}
              >
                <img className="condition-icon" src="/A-32.png" />
              </button>
            </section>
          </section>

          {/* RENDEROWANIE MODALI */}
          {activeModal === "incline" && (
            <Modal onClose={() => setActiveModal(null)}>{t.inclineModal}</Modal>
          )}

          {activeModal === "condition" && (
            <Modal onClose={() => setActiveModal(null)}>{t.surfaceModal}</Modal>
          )}
        </>
      ) : page === 2 ? (
        <Settings
          lang={lang}
          t={t}
          initialDeceleration={deceleration}
          initialReactionTime={reactionTime}
          initialBrakingForce={brakingForce}
          initialMass={mass}
          initialUseBrakingForce={useBrakingForce}
          onOpenUnits={(
            newDeceleration,
            newReactionTime,
            newBrakingForce,
            newMass,
            newUseBrakingForce,
          ) => {
            setDeceleration(newDeceleration);
            setReactionTime(newReactionTime);
            setBrakingForce(newBrakingForce);
            setMass(newMass);
            setUseBrakingForce(newUseBrakingForce);
            setPage(3);
          }}
          onSaveAndBack={(...args) => {
            const [
              newDeceleration,
              newReactionTime,
              newBrakingForce,
              newMass,
              newUseBrakingForce,
            ] = args;

            setDeceleration(newDeceleration);
            setReactionTime(newReactionTime);
            setBrakingForce(newBrakingForce);
            setMass(newMass);
            setUseBrakingForce(newUseBrakingForce);

            SaveSettingsToFile({
              deceleration: newDeceleration,
              reactionTime: newReactionTime,
              brakingForce: newBrakingForce,
              mass: newMass,
              useBrakingForce: newUseBrakingForce,
              units,
            });

            setPage(1);
          }}
        />
      ) : (
        <Units
          initialUnits={units}
          lang={lang}
          t={t}
          onSaveAndBack={(newUnits) => {
            setUnits(newUnits);
            SaveSettingsToFile({
              deceleration,
              reactionTime,
              brakingForce,
              mass,
              useBrakingForce,
              units: newUnits,
            });
            setPage(2);
          }}
        />
      )}
    </section>
  );
}

export default App;
