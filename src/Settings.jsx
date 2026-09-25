import React from 'react';

function Settings({ onBack }) {
  return (
    <div className="settings" style={{ padding: "20px", background: "#f0f0f0", color: "#000" }}>
      <h2>Ustawienia aplikacji</h2>
      <p>a</p>
      
      <button onClick={onBack}>Powrót</button>
    </div>
  );
}

export default Settings;
