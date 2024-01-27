import './App.css';
import React from 'react';
import test from './test.js';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Codehoot!</h1>
      <div className="probStatement">Click start whenever everyone is ready. Who doth comeout triumphant over their peers?</div>

      <div className='container'>
        <input
          type="text"
          className="username-input"
          placeholder="username"
        />
        <button className='startButton'>Let's Code!</button>
      </div>
    </div>
  );
}

export default App;
