import React from 'react';
import { Game } from './features/game/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shogi</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;
