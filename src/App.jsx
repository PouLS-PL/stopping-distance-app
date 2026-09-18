import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [incline, setIncline] = useState(0);
  const [speed, setSpeed] = useState(40);
  const [isFocusedSpeed, setIsFocusedSpeed] = useState(false);
  const [isFocusedIncline, setIsFocusedIncline] = useState(false);
  
  const buttonOptions = [-15, -10, -7, 0, 6, 8, 15]

  const queryBackend = () => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  return (
    <div className="main">
      <h1>Aplikacja mierząca drogę hamowania</h1>
      <button onClick={() => queryBackend()}>Zmierz</button>
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
        {buttonOptions.map((num) =>
        (<button onClick={() => setIncline(num)}>
          {num}%
        </button>))}
      </div>
    </div>
  );
}

export default App;
