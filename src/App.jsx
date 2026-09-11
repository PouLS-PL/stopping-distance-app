import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
  }, []);

  return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>React + Express Integration</h1>
        <p>Backend response: <strong>{message || 'Loading...'}</strong></p>
      </div>
  );
}

export default App;