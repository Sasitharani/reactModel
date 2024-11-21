import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <h1 className="text-center text-2xl font-bold">API Message</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;