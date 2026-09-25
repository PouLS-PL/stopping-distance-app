import { useEffect, useState } from "react";

function Settings({ initialDeceleration, initialReactionTime, onSaveAndBack }) {
  const [localDeceleration, setLocalDeceleration] = useState(initialDeceleration);
  const [localReactionTime, setLocalReactionTime] = useState(initialReactionTime);

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
      </p>
      
      <p>
        <label htmlFor="reactionTime">Czas reakcji (s) </label>
        <input 
          type="number" 
          id="reactionTime" 
          value={localReactionTime} 
          onChange={(e) => setLocalReactionTime(Number(e.target.value))}
        />
      </p>

      <p><button onClick={handleSaveAndBack}>Powrót</button></p>
    </div>
  );
}

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

  const buttonOptions = [-15, -10, -7, 0, 6, 8, 15];

  const queryBackend = () => {
    fetch("/api/measure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        speed: speed,
        incline: incline,
        deceleration: deceleration,
        reactionTime: reactionTime,
        condition: condition
      }),
    })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! ${res}`);
      return res.json();
    })
    .then((data) => setMessage(data.message))
    .catch((err) => console.error(err));
  };

  return (
    <div className="main">
      <h1>Aplikacja mierząca drogę hamowania</h1>
      
      {page === 1 ? (
        <>
          <button onClick={() => queryBackend()}>Zmierz</button>
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
