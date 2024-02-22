import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null); // Reset error state
      if (!searchText.trim()) {
        throw new Error('Please enter text to translate');
      }
      setLoading(true);
      const response = await fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: searchText })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setTranslatedText(json.translation);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setError(null);
    setTranslatedText(null)
    setSearchText(e.target.value)
  };

  return (
    <div className="App">
      <h1>Translation App</h1>
      <h6>Translate English to French effortlessly with our translator!</h6>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Enter text to translate"
        />
        <button onClick={handleSearch}>Translate</button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {translatedText && (
        <div className="translated-text">
          <p>Translated Text:</p>
          <h4>{translatedText}</h4>
        </div>
      )}
    </div>
  );
}

export default App;