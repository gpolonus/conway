
import React from 'react';
import './Cell.css';

export default ({populated, i, j, width, clickHandler}) => {
  let styles = {
    position: 'relative',
    width: width + '%',
    height: width + '%',
    // left: (width * (j)) + '%',
    // top: (width * (i)) + '%',
  };

  if(i < 0) {
    styles = {
      ...styles,
      top: (-1 * width * (i + 1) + '%')
    };
  }

  if(j < 0) {
    styles = {
      ...styles,
      left: (-1 * width * (j + 1) + '%')
    };
  }

  return (
    <span
      onMouseDown={() => clickHandler(i,j)}
      className={'Cell ' + (populated ? 'populated' : 'unpopulated')}
      style={styles}
    ></span>
  );
}