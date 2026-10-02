import { useState, useEffect } from "react";
import { calculateMeasure } from "./stoppingDistance";
import SpeedTracker from "./SpeedMeasurement";

// ==========================================
// WSPÓLNE STYLES DLA ZNAKÓW ZAPYTANIA I TOOLTIPÓW
// ==========================================
const questionMarkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  backgroundColor: "#ccc",
  color: "#333",
  fontSize: "12px",
  fontWeight: "bold",
  cursor: "help",
  marginLeft: "8px",
  position: "relative" // Służy jako kotwica pozycjonowania dla duszka
};

const tooltipStyle = {
  position: "absolute",
  bottom: "125%", // Nad znakiem zapytania
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#333",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: "4px",
  fontSize: "12px",
  whiteSpace: "nowrap",
  zIndex: 10,
  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  fontWeight: "normal"
};

// ==========================================
// KOMPONENT: SETTINGS (USTAWIENIA)
// ==========================================
function Settings({ initialDeceleration, initialReactionTime, onSaveAndBack }) {
  const [localDeceleration, setLocalDeceleration] = useState(initialDeceleration);
  const [localReactionTime, setLocalReactionTime] = useState(initialReactionTime);

  // NOWE STANY: Dla każdego znaku zapytania w ustawieniach osobny stan hoveru
  const [hoverDecelerationInfo, setHoverDecelerationInfo] = useState(false);
  const [hoverReactionTimeInfo, setHoverReactionTimeInfo] = useState(false);

  const handleSaveAndBack = () => {
    onSaveAndBack(localDeceleration, localReactionTime);
  };

  return (
    <div className="settings" style={{ padding: "20px", background: "#f0f0f0", color: "#000" }}>
      <h2>Ustawienia aplikacji</h2>
      
      <p>
        <label htmlFor="deceleration">Opóźnienie (m/s^2) </label>
        <input 
          type="number" 
          id="deceleration" 
          value={localDeceleration} 
          onChange={(e) => setLocalDeceleration(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA DLA OPÓŹNIENIA */}
        <span 
          style={questionMarkStyle}
          onMouseEnter={() => setHoverDecelerationInfo(true)}
          onMouseLeave={() => setHoverDecelerationInfo(false)}
        >
          ?
          {hoverDecelerationInfo && (
            <div style={tooltipStyle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, esse.
            </div>
          )}
        </span>
      </p>
      
      <p>
        <label htmlFor="reactionTime">Czas reakcji (s) </label>
        <input 
          type="number" 
          id="reactionTime" 
          value={localReactionTime} 
          onChange={(e) => setLocalReactionTime(Number(e.target.value))}
        />
        {/* ZNAK ZAPYTANIA DLA CZASU REAKCJI */}
        <span 
          style={questionMarkStyle}
          onMouseEnter={() => setHoverReactionTimeInfo(true)}
          onMouseLeave={() => setHoverReactionTimeInfo(false)}
        >
          ?
          {hoverReactionTimeInfo && (
            <div style={tooltipStyle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, expedita!
            </div>
          )}
        </span>
      </p>

      <p><button onClick={handleSaveAndBack}>Powrót</button></p>
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
  const [isFocusedSpeed, setIsFocusedSpeed] = useState(false);
  const [isFocusedIncline, setIsFocusedIncline] = useState(false);

  const [hoverSpeedInfo, setHoverSpeedInfo] = useState(false);
  const [hoverInclineInfo, setHoverInclineInfo] = useState(false);

  const buttonOptions = [-15, -10, -7, 0, 6, 8, 15];

  useEffect(() => {handleMeasure();}, [speed, incline, deceleration, reactionTime, condition]);

  const handleMeasure = () => {
    const result = calculateMeasure({
      speed,
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
      <h1>Aplikacja mierząca drogę hamowania</h1>
      
      {page === 1 ? (
        <>
          <button onClick={handleMeasure}>Zmierz</button>
          <button onClick={() => setPage(2)}>Ustawienia</button>
          
          <p>
            Odpowiedź: <strong>{message || "Click the button"}</strong>
          </p>
          
          <div className="incline">
            <span>Prędkość: </span>
            <input
              type="range"
              min="0"
              max="200"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
            <input
              type={isFocusedSpeed ? "number" : "text"}
              value={isFocusedSpeed ? speed : `${speed} km/h`}
              onFocus={() => setIsFocusedSpeed(true)}
              onBlur={() => setIsFocusedSpeed(false)}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />

            <span 
              style={questionMarkStyle}
              onMouseEnter={() => setHoverSpeedInfo(true)}
              onMouseLeave={() => setHoverSpeedInfo(false)}
            >
              ?
              {hoverSpeedInfo && (
                <div style={tooltipStyle}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam?
                </div>
              )}
            </span>
          </div>
          
          <div className="incline">
            <span>Nachylenie: </span>
            <input
              type="range"
              min="-30"
              max="30"
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
              style={questionMarkStyle}
              onMouseEnter={() => setHoverInclineInfo(true)}
              onMouseLeave={() => setHoverInclineInfo(false)}
            >
              ?
              {hoverInclineInfo && (
                <div style={tooltipStyle}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, modi.
                </div>
              )}
            </span>
          </div>
          
          <div className="inclineQuickButtons">
            {buttonOptions.map((num) => (
              <button key={num} onClick={() => setIncline(num)}>
                {num}%
              </button>
            ))}
          </div>
          <div className="Conditions">
            <button 
              className={`condition-button ${condition === "Sun" ? "active" : ""}`} 
              style={{ border: condition === "Sun" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Sun")}
            >
              Słońce
            </button>
            <button
              className={`condition-button ${condition === "Rain" ? "active" : ""}`} 
              style={{ border: condition === "Rain" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Rain")}
            >
              Deszcz
            </button>
            <button 
              className={`condition-button ${condition === "Sand" ? "active" : ""}`} 
              style={{ border: condition === "Sand" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Sand")}
            >
              Piasek
            </button>
            <button 
              className={`condition-button ${condition === "Snow" ? "active" : ""}`} 
              style={{ border: condition === "Snow" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Snow")}
            >
              Śnieg
            </button>
            <button 
              className={`condition-button ${condition === "Ice" ? "active" : ""}`} 
              style={{ border: condition === "Ice" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Ice")}
            >
              Lód
            </button>
          </div>
          <SpeedTracker />
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
