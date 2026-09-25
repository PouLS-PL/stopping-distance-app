import { useEffect, useState } from "react";

function Settings({ initialDelay, initialReactionTime, onSaveAndBack }) {
  const [localDelay, setLocalDelay] = useState(initialDelay);
  const [localReactionTime, setLocalReactionTime] = useState(initialReactionTime);

  const handleSaveAndBack = () => {
    onSaveAndBack(localDelay, localReactionTime);
  };

  return (
    <div className="settings" style={{ padding: "20px", background: "#f0f0f0", color: "#000" }}>
      <h2>Ustawienia aplikacji</h2>
      
      <p>
        <label htmlFor="delay">Opóźnienie (m/s^2) </label>
        <input 
          type="number" 
          id="delay" 
          value={localDelay} 
          onChange={(e) => setLocalDelay(Number(e.target.value))}
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
  const [delay, setDelay] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
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
        delay: delay,
        reactionTime: reactionTime
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
            <button className="condition-button">Słońce</button>
            <button className="condition-button">Deszcz</button>
            <button className="condition-button">Piasek</button>
            <button className="condition-button">Śnieg</button>
            <button className="condition-button">Lód</button>
          </div>
        </>
      ) : (
        <Settings 
          initialDelay={delay} 
          initialReactionTime={reactionTime} 
          onSaveAndBack={(newDelay, newReactionTime) => {
            setDelay(newDelay);
            setReactionTime(newReactionTime);
            setPage(1);
          }} 
        />
      )}
    </div>
  );
}

export default App;
