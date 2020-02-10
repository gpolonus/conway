
import React from 'react';
import './Grid.css';
import Cell from './Cell/Cell';

export default ({toggle, cells}) => {
  const width = '500px';
  return (
    <div>
      <div className="Grid" style={{width: width, height: width}}>
        {
          cells.map((cell, i, j) => {
            return <Cell key={i + '-' + j} populated={cell} i={i} j={j} clickHandler={toggle} width={100 / cells.count()} />
          }).values()
        }
      </div>
    </div>
  );
}

