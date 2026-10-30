import React from 'react';

function Settings({ onBack }) {
  return (
    <section className="settings" style={{ padding: "20px", background: "#f0f0f0", color: "#000" }}>
      <h2>Ustawienia aplikacji</h2>
      
      <button onClick={onBack}>Powrót</button>
    </section>
  );
}

export default Settings;
