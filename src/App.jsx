import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [incline, setIncline] = useState(0);

  useEffect(() => {
    fetch('/api/hello')
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
  }, []);

  return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>React + Express Integration</h1>
        <p>Backend response: <strong>{message || 'Loading...'}</strong></p>
        <div className='incline'>
          <span>Nachylenie: </span>
        <input type="range" min="-30" max="30" value={incline} onChange={(e) => setIncline(e.target.value)}/>
        <input type='number' min="-30" max="30" value={incline} onChange={(e) => setIncline(e.target.value)}/>
      </div>
      </div>
  );
}

export default App;