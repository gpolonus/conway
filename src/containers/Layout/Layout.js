
import React from 'react';
import GameOfLife from '../GameOfLife/GameOfLife';
import './Layout.css';

export default () => (
  <div className="Layout">
    <h1>React Project: Conway's Game of Life</h1>
    <GameOfLife size={50} />
  </div>
);