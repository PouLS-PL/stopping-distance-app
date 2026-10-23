import { useState, useEffect } from "react";
import { calculateMeasure } from "./stoppingDistance";
import { SpeedTracker, useSpeedTracker } from "./SpeedMeasurement";

// ==========================================
// KOMPONENT: MODAL (OKNO INFORMACYJNE)
// ==========================================
function Modal({ onClose, children }) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose} // Zamknięcie po kliknięciu w tło
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Zatrzymanie zamykania przy kliknięciu w treść
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// KOMPONENT: SETTINGS (USTAWIENIA)
// ==========================================
function Settings({ initialDeceleration, initialReactionTime, onSaveAndBack }) {
  const [localDeceleration, setLocalDeceleration] = useState(initialDeceleration);
  const [localReactionTime, setLocalReactionTime] = useState(initialReactionTime);

  // Stan przechowujący informację, który modal ma być otwarty
  const [activeModal, setActiveModal] = useState(null);

  const handleSaveAndBack = () => {
    onSaveAndBack(localDeceleration, localReactionTime);
  };

  return (
    <div className="settings">
      <h2>Ustawienia aplikacji</h2>

      <p>
        <label htmlFor="deceleration">Opóźnienie [m/s<sup>2</sup>] </label>
        <input
          type="number"
          id="deceleration"
          value={localDeceleration}
          onChange={(e) => setLocalDeceleration(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA DLA OPÓŹNIENIA */}
        <span className="info-icon" onClick={() => setActiveModal("deceleration")}>
          ?
        </span>
      </p>

      <p>
        <label htmlFor="reactionTime">Czas reakcji [s] </label>
        <input
          type="number"
          id="reactionTime"
          value={localReactionTime}
          onChange={(e) => setLocalReactionTime(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA DLA CZASU REAKCJI */}
        <span className="info-icon" onClick={() => setActiveModal("reactionTime")}>
          ?
        </span>
      </p>

      <p><button onClick={handleSaveAndBack}>Powrót</button></p>

      {/* RENDEROWANIE MODALI */}
      {activeModal === "deceleration" && (
        <Modal onClose={() => setActiveModal(null)}>
           Opóźnienie: Opóźnienie pojazdu na drodze poziomej o nawierzchni twardej, suchej i czystej.<br/>
          <br />
          0,4g ≈ 3,92 m/s/s - minimalna wartość dla maksymalnie obciążonego pojazdu samochodowego w Polsce<br />
          <br />0,58g ≈ 5,68 m/s/s - minimalna wartość dla maksymalnie obciążonego pojazdu kat. M1 (osobówka) zarejestrowanego po 2010 r. w Polsce
          <br />8 m/s/s ≈ 0,81g - nowoczesny samochód
          <br />9 m/s/s ≈ 0,91g - samochód sportowy
        </Modal>
      )}

      {activeModal === "reactionTime" && (
        <Modal onClose={() => setActiveModal(null)}>
          Czas reakcji: Suma czasu reakcji kierującego na bodziec, czasu potrzebny na aktywowanie hamulca i czas reakcji układu hamulcowego.
          <br />
          <br />Czas reakcji trzeźwego kierującego to około 0,6—0,85 s
          <br />Reakcja układu hamulcowego to około 0,2—0,5 s
          <br />Zalecana wartość: 1,35 s
        </Modal>
      )}
    </div>
  );
}

// ==========================================
// KOMPONENT: APP (GŁÓWNY)
// ==========================================
function App() {
  const [page, setPage] = useState(1);
  const [condition, setCondition] = useState("Dry");
  const [deceleration, setDeceleration] = useState(8.0);
  const [reactionTime, setReactionTime] = useState(1.35);
  const [message, setMessage] = useState("");
  const [incline, setIncline] = useState(0);
  const [speed, setSpeed] = useState(40);
  const [speedFromGPS, setSpeedFromGPS] = useState(true);
  const [isFocusedSpeed, setIsFocusedSpeed] = useState(false);
  const [isFocusedIncline, setIsFocusedIncline] = useState(false);

  const { speedGPS, status } = useSpeedTracker();

  // Stan przechowujący informację o otwartym oknie informacyjnym na głównej stronie
  const [activeModal, setActiveModal] = useState(null);

  const buttonOptions = [-15, -10, -7, 0, 6, 8, 15];

  const activeSpeed = speedFromGPS ? (typeof speedGPS === "number" ? speedGPS : speed) : speed;

  useEffect(() => {
    handleMeasure();
  }, [speed, speedGPS, speedFromGPS, incline, deceleration, reactionTime, condition]);

  useEffect(() => {
    if (speedFromGPS && page === 1) {
      if (typeof speedGPS === "number") {
        setSpeed(speedGPS);
      }
    }
  }, [speedGPS, speedFromGPS, page]);

  const handleMeasure = () => {
    const currentSpeed = speedFromGPS ? (typeof speedGPS === "number" ? speedGPS : speed) : speed;
    const result = calculateMeasure({
      speed: currentSpeed,
      incline,
      deceleration,
      reactionTime,
      condition,
    });
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="main">
      {page === 1 ? (
        <>
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
          <button onClick={() => setPage(2)}>Ustawienia</button>

          <h1>
            <strong>{message || "Click the button"}</strong>
          </h1>
          <SpeedTracker />

          <div className="incline">
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
                  ? (speedFromGPS ? Math.round(activeSpeed) : speed)
                  : `${speedFromGPS ? (typeof activeSpeed === 'number' ? activeSpeed.toFixed(1) : activeSpeed) : speed} km/h`
              }
              onFocus={() => setIsFocusedSpeed(true)}
              onBlur={() => setIsFocusedSpeed(false)}
              onChange={(e) => {
                setSpeed(Number(e.target.value));
                setSpeedFromGPS(false);
              }}
            />
          </div>

          <div className="incline">
            <span>Nachylenie: </span>
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

            <span className="info-icon" onClick={() => setActiveModal("incline")}>
              ?
            </span>

          </div>

          <div className="inclineQuickButtons">
            {buttonOptions.map((num) => (
              <button key={num} onClick={() => setIncline(num)}>
                {num}%
              </button>
            ))}
          </div>
          <div className="road-signs">
            <img src="/A-22.png" />
            <img src="/A-23.png" />
                      </div>
          <div className="Conditions">
            {/* Tooltip Icon Container */}
            <div className="conditions-tooltip-row">
              <span
                className="info-icon conditions-info-icon"
                onClick={() => setActiveModal("condition")}
              >
                ?
              </span>
            </div>

            {/* Buttons Container */}
            <div className="conditions-buttons">
              <button
                className={`condition-button ${condition === "Dry" ? "active" : ""}`}
                onClick={() => setCondition("Dry")}
              >
                <img className="condition-icon" src="/weather_symbols_sunny.png" />
              </button>

              <button
                className={`condition-button ${condition === "Sand" ? "active" : ""}`}
                onClick={() => setCondition("Sand")}
              >
                <img className="condition-icon condition-icon-sand" src="/heap-of-sand.png" />
              </button>

              <button
                className={`condition-button ${condition === "Wet" ? "active" : ""}`}
                onClick={() => setCondition("Wet")}
              >
                <img className="condition-icon" src="/weather_symbols_rain.png" />
              </button>

              <button
                className={`condition-button ${condition === "Snow" ? "active" : ""}`}
                onClick={() => setCondition("Snow")}
              >
                <img className="condition-icon" src="/weather_symbols_snow.png" />
              </button>

              <button
                className={`condition-button ${condition === "Ice" ? "active" : ""}`}
                onClick={() => setCondition("Ice")}
              >
                <img className="condition-icon" src="/A-32.png" />
              </button>
            </div>
          </div>

          {/* RENDEROWANIE MODALI */}
          {activeModal === "incline" && (
            <Modal onClose={() => setActiveModal(null)}>
               Nachylenie: Nachylenie podłużne w procentach (dodatnie wartości: wzniesienie; ujemne wartości: spadek).<br/>
              <br />
              -37,45%: najbardziej stromy zjazd na świecie<br />
              -10%: minimalny spadek w terenie górzystym do umieszczenia znaku A-22 w Polsce<br />
              -7%: minimalny spadek poza terenem górzystym do umieszczenia znaku A-22 w Polsce<br />
              0%: droga pozioma<br />
              ±3%: jeśli wartość nachylenia jest większa, na szlaku rowerowym umieszcza się tabliczkę informującą o nachyleniu (w Polsce)<br />
              6%: minimalne wzniesienie poza terenem górzystym do umieszczenia znaku A-23 w Polsce<br />
              8%: minimalne wzniesienie w terenie górzystym do umieszczenia znaku A-23 w Polsce<br />
              5,5° ≈ 9,6%: maksymalne wzniesienie na egzaminie w Polsce<br />
              12%: zespół pojazdów składający się z samochodu osobowego i przyczepy, obciążonych do wartości maksymalnych mas całkowitych, powinien ruszyć z miejsca co najmniej 5 razy w czasie 5 minut pod wzniesienie o tym nachyleniu (w Polsce)<br />
              ±28%: najbardziej stromy podjazd/zjazd w Polsce<br />
              35%: najbardziej stromy podjazd na świecie<br />
            </Modal>
          )}

          {activeModal === "condition" && (
            <Modal onClose={() => setActiveModal(null)}>
               <b>Stan nawierzchni</b> (μ — współczynnik tarcia)<br/>
              <img className="modal-condition-icon" src="/weather_symbols_sunny.png" /> suchy i szorstki asfalt (μ = 0,9)<br />
              <img className="modal-condition-icon" src="/heap-of-sand.png" /> zabrudzony piachem asfalt (μ = 0,55)<br />
              <img className="modal-condition-icon" src="/weather_symbols_rain.png" /> mokry asfalt (μ = 0,45)<br />
              <img className="modal-condition-icon" src="/weather_symbols_snow.png" /> pokryty śniegiem asfalt (μ = 0,25)<br />
              <img className="modal-condition-icon" src="/A-32.png" /> bardzo śliski asfalt, oblodzony asfalt, gołoledź (μ = 0,1)<br />

            </Modal>
          )}
        </>
      ) : (
        <Settings
          initialDeceleration={deceleration}
          initialReactionTime={reactionTime}
          onSaveAndBack={(newDeceleration, newReactionTime) => {
            setDeceleration(newDeceleration);
            setReactionTime(newReactionTime);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}

export default App;