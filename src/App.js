import React from 'react';
import './App.css';
import Weather from './Weather';

function App() {
  return (
    <div className="weather">
      <div className = "search-bar">
        <input type = "text" placeholder='Search'></input>
        <img src = "" alt = ""></img>
      </div>
    </div>
  );
}

export default App;
