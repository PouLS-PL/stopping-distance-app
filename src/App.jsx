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
                          Opóźnienie: Opóźnienie pojazdu na drodze poziomej o nawierzchni twardej, suchej i czystej.<br/>
                          <br />

                          0,4g ≈ 3,92 m/s/s - minimalna wartość dla maksymalnie obciążonego pojazdu samochodowego w Polsce<br />
                          <br />0,58g ≈ 5,68 m/s/s - minimalna wartość dla maksymalnie obciążonego pojazdu kat. M1 (osobówka) zarejestrowanego po 2010 r. w Polsce
                          <br />8 m/s/s ≈ 0,81g - nowoczesny samochód
                          <br />9 m/s/s ≈ 0,91g - samochód sportowy
                        
                          
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
                          <br />Czas reakcji: Suma czasu reakcji kierującego na bodziec, czasu potrzebny na aktywowanie hamulca i czas reakcji układu hamulcowego.
                          <br />
                          <br />Czas reakcji trzeźwego kierującego to około 0,6—0,85 s
                          <br />Reakcja układu hamulcowego to około 0,2—0,5 s
                          <br />Zalecana wartość: 1,35 s
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
                                  Nachylenie: Nachylenie podłużne w procentach (dodatnie wartości: spadek; ujemne wartości: wzniesienie).<br/>
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
              className={`condition-button ${condition === "Dry" ? "active" : ""}`} 
              style={{ border: condition === "Dry" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Dry")}
            >
                          <img src="public/weather_symbols_sunny.png" height="50%"/>
                      </button>
            <button 
              className={`condition-button ${condition === "Sand" ? "active" : ""}`} 
              style={{ border: condition === "Sand" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Sand")}
            >
                          <img src="public/heap-of-sand.png" height="50%" />
            </button>
            <button
              className={`condition-button ${condition === "Wet" ? "active" : ""}`} 
              style={{ border: condition === "Wet" ? "2px solid black" : "1px solid gray" }}
                          onClick={() => setCondition("Wet")}
            >
                          <img src="public/weather_symbols_rain.png" height="50%" />
            </button>
            
            <button 
              className={`condition-button ${condition === "Snow" ? "active" : ""}`} 
              style={{ border: condition === "Snow" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Snow")}
            >
                          <img src="public/weather_symbols_snow.png" height="50%" />
            </button>
            <button 
              className={`condition-button ${condition === "Ice" ? "active" : ""}`} 
              style={{ border: condition === "Ice" ? "2px solid black" : "1px solid gray" }}
              onClick={() => setCondition("Ice")}
            >
                          <img src="public/A-32.png" height="50%" />
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
